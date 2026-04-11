<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BusinessOnboardingController;
use Illuminate\Support\Facades\Route;

Route::prefix('business/onboarding')->group(function () {
    Route::post('email', [BusinessOnboardingController::class, 'startEmailVerification'])
        ->middleware('throttle:10,1');
    Route::post('email/verify', [BusinessOnboardingController::class, 'verifyEmail'])
        ->middleware('throttle:20,1');
    Route::post('subdomain', [BusinessOnboardingController::class, 'setSubdomain'])
        ->middleware('throttle:20,1');
    Route::post('personal', [BusinessOnboardingController::class, 'setPersonalDetails'])
        ->middleware('throttle:20,1');
    Route::post('complete', [BusinessOnboardingController::class, 'completeBusinessRegistration'])
        ->middleware('throttle:10,1');
});

Route::prefix('auth')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware(['auth:sanctum'])->get('dashboard', function () {
    return response()->json([
        'message' => 'Dashboard access granted.',
    ]);
});
