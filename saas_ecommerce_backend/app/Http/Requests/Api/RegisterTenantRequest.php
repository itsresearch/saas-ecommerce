<?php

namespace App\Http\Requests\Api;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class RegisterTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $data = [];

        if ($this->has('email')) {
            $data['email'] = strtolower((string) $this->input('email'));
        }

        if ($this->has('subdomain')) {
            $data['subdomain'] = strtolower((string) $this->input('subdomain'));
        } elseif ($this->has('domain')) {
            $data['subdomain'] = strtolower((string) $this->input('domain'));
        }

        if (! $this->has('code') && $this->has('verification_code')) {
            $data['code'] = (string) $this->input('verification_code');
        }

        if ($data) {
            $this->merge($data);
        }
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'The given data was invalid.',
            'errors' => $validator->errors(),
        ], 422));
    }

    public function emailRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('tenants', 'email')],
        ];
    }

    public function verifyEmailRules(): array
    {
        return [
            'onboarding_token' => ['required', 'string'],
            'code' => ['required', 'digits:6'],
        ];
    }

    public function subdomainRules(): array
    {
        return [
            'onboarding_token' => ['required', 'string'],
            'subdomain' => ['required', 'string', 'min:3', 'max:63', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
        ];
    }

    public function personalDetailsRules(): array
    {
        return [
            'onboarding_token' => ['required', 'string'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
        ];
    }

    public function businessRegistrationRules(): array
    {
        return [
            'onboarding_token' => ['required', 'string'],
            'business_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'registration_number' => ['required', 'string', 'max:255', Rule::unique('tenants', 'registration_number')],
        ];
    }

    public function rules(): array
    {
        // Return empty rules; validation is done per-step in controller
        return [];
    }
}
