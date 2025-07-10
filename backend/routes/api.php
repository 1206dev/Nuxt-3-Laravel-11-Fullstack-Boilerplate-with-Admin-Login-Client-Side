<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SampleController;
use Illuminate\Support\Facades\Route;

Route::post('/oauth/login', [AdminController::class, 'login']);
Route::post('/oauth/refresh', [AdminController::class, 'refresh'])->middleware('auth:sanctum');
Route::post('/oauth/logout', [AdminController::class, 'logout'])->middleware('auth:sanctum');

// Public routes
Route::get('/samples', [SampleController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/samples', [SampleController::class, 'store']);
    Route::put('/samples/{sample}', [SampleController::class, 'update']);
    Route::delete('/samples/{sample}', [SampleController::class, 'destroy']);
});
