<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RegisterTenantRequest;
use App\Models\Tenant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Stancl\Tenancy\Database\Models\Domain;

class BusinessOnboardingController extends Controller
{
    private const CACHE_PREFIX = 'business_onboarding:';

    private const TTL_MINUTES = 30;

    public function startEmailVerification(RegisterTenantRequest $request): JsonResponse
    {
        $validated = $request->validate($request->emailRules());

        $email = strtolower($validated['email']);
        $token = (string) Str::uuid();
        $code = (string) random_int(100000, 999999);

        $state = [
            'email' => $email,
            'email_verified' => false,
            'verification_code' => $code,
            'subdomain' => null,
            'personal' => [],
            'business' => [],
        ];

        Cache::put($this->cacheKey($token), $state, now()->addMinutes(self::TTL_MINUTES));

        Mail::raw("Your verification code is: {$code}", function ($message) use ($email): void {
            $message->to($email)->subject('Business Registration Email Verification');
        });

        $response = [
            'message' => 'Verification code sent to email.',
            'onboarding_token' => $token,
            'expires_in_minutes' => self::TTL_MINUTES,
        ];

        if ((bool) config('app.debug')) {
            $response['verification_code'] = $code;
        }

        return response()->json($response, 201);
    }

    public function verifyEmail(RegisterTenantRequest $request): JsonResponse
    {
        $validated = $request->validate($request->verifyEmailRules());

        $state = $this->getState($validated['onboarding_token']);

        if ($state === null) {
            return response()->json([
                'message' => 'Onboarding session expired. Please start again.',
            ], 422);
        }

        if ((string) $state['verification_code'] !== (string) $validated['code']) {
            return response()->json([
                'message' => 'Invalid verification code.',
                'errors' => [
                    'code' => ['The verification code is invalid.'],
                ],
            ], 422);
        }

        $state['email_verified'] = true;
        $state['verification_code'] = null;
        $this->saveState($validated['onboarding_token'], $state);

        return response()->json([
            'message' => 'Email verified successfully.',
        ]);
    }

    public function setSubdomain(RegisterTenantRequest $request): JsonResponse
    {
        $validated = $request->validate($request->subdomainRules());

        $state = $this->getState($validated['onboarding_token']);

        if ($state === null) {
            return response()->json([
                'message' => 'Onboarding session expired. Please start again.',
            ], 422);
        }

        if (! ($state['email_verified'] ?? false)) {
            return response()->json([
                'message' => 'Verify email before selecting subdomain.',
            ], 422);
        }

        $fullDomain = $this->buildTenantDomain($validated['subdomain']);

        if (Domain::query()->where('domain', $fullDomain)->exists()) {
            return response()->json([
                'message' => 'The selected subdomain is already taken.',
                'errors' => [
                    'subdomain' => ['The selected subdomain is already taken.'],
                ],
            ], 422);
        }

        $state['subdomain'] = strtolower($validated['subdomain']);
        $this->saveState($validated['onboarding_token'], $state);

        return response()->json([
            'message' => 'Subdomain reserved successfully.',
            'subdomain' => $state['subdomain'],
            'full_domain' => $fullDomain,
        ]);
    }

    public function setPersonalDetails(RegisterTenantRequest $request): JsonResponse
    {
        $validated = $request->validate($request->personalDetailsRules());

        $state = $this->getState($validated['onboarding_token']);

        if ($state === null) {
            return response()->json([
                'message' => 'Onboarding session expired. Please start again.',
            ], 422);
        }

        if (! ($state['email_verified'] ?? false) || empty($state['subdomain'])) {
            return response()->json([
                'message' => 'Complete email verification and subdomain step first.',
            ], 422);
        }

        $state['personal'] = [
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
        ];

        $this->saveState($validated['onboarding_token'], $state);

        return response()->json([
            'message' => 'Personal details saved.',
        ]);
    }

    public function completeBusinessRegistration(RegisterTenantRequest $request): JsonResponse
    {
        $validated = $request->validate($request->businessRegistrationRules());

        $state = $this->getState($validated['onboarding_token']);

        if ($state === null) {
            return response()->json([
                'message' => 'Onboarding session expired. Please start again.',
            ], 422);
        }

        if (! ($state['email_verified'] ?? false) || empty($state['subdomain']) || empty($state['personal']['password'])) {
            return response()->json([
                'message' => 'Complete all previous onboarding steps first.',
            ], 422);
        }

        $fullDomain = $this->buildTenantDomain((string) $state['subdomain']);

        if (Domain::query()->where('domain', $fullDomain)->exists()) {
            return response()->json([
                'message' => 'The selected subdomain is already taken.',
                'errors' => [
                    'subdomain' => ['The selected subdomain is already taken.'],
                ],
            ], 422);
        }

        $tenant = Tenant::create([
            'name' => $validated['business_name'],
            'address' => $validated['address'],
            'email' => $state['email'],
            'phone' => $state['personal']['phone'] ?? null,
            'registration_number' => $validated['registration_number'],
            'password' => $state['personal']['password'],
            'owner_first_name' => $state['personal']['first_name'],
            'owner_last_name' => $state['personal']['last_name'],
        ]);

        $domain = $tenant->createDomain($fullDomain);

        Cache::forget($this->cacheKey($validated['onboarding_token']));

        $tenantUrl = $this->tenantUrl($domain->domain);

        return response()->json([
            'message' => 'Business registered successfully.',
            'tenant' => $tenant->load('domains'),
            'primary_domain' => $domain->domain,
            'tenant_url' => $tenantUrl,
            'redirect_url' => rtrim($tenantUrl, '/').'/admin',
        ], 201);
    }

    private function cacheKey(string $token): string
    {
        return self::CACHE_PREFIX.$token;
    }

    private function getState(string $token): ?array
    {
        $state = Cache::get($this->cacheKey($token));

        return is_array($state) ? $state : null;
    }

    private function saveState(string $token, array $state): void
    {
        Cache::put($this->cacheKey($token), $state, now()->addMinutes(self::TTL_MINUTES));
    }

    private function buildTenantDomain(string $subdomain): string
    {
        $centralDomain = trim((string) config('app.central_domain', 'localhost'));

        return strtolower($subdomain).'.'.$centralDomain;
    }

    private function tenantUrl(string $domain): string
    {
        $scheme = (string) (parse_url((string) config('app.url', 'http://localhost'), PHP_URL_SCHEME) ?: 'http');

        return $scheme.'://'.$domain;
    }
}
