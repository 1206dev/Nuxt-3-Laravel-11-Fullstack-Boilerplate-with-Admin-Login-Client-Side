<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Models\Admin;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;
use DOMDocument;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'username' => ['Invalid credentials.'],
            ]);
        }

        // Delete old tokens
        $admin->tokens()->where('expires_at', '<', now())->delete();

        // Access Token expires in 60 minutes
        $accessTokenExpiresAt = Carbon::now()->addMinutes(60 * 24 * 365);

        // Refresh Token expires in 7 days
        $refreshTokenExpiresAt = Carbon::now()->addDays(7);

        // Create Access Token
        $accessToken = $admin->createToken('access_token', ['*'], $accessTokenExpiresAt)->plainTextToken;

        // Create Refresh Token
        $refreshToken = $admin->createToken('refresh_token', ['refresh'], $refreshTokenExpiresAt)->plainTextToken;

        return response()->json([
            'access_token' => $accessToken,
            'expires_in' => $accessTokenExpiresAt->timestamp,
            'refresh_token' => $refreshToken,
        ]);
    }

    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required|string',
        ]);

        $refreshTokenId = explode('|', $request->refresh_token)[0];

        $refreshToken = PersonalAccessToken::find($refreshTokenId);

        if (!$refreshToken || $refreshToken->name !== 'refresh_token') {
            return response()->json(['message' => 'Invalid refresh token.'], 401);
        }

        $admin = $refreshToken->tokenable;

        $admin->tokens()
            ->where('name', 'access_token')
            ->where('id', $refreshTokenId)
            ->delete();

        $accessTokenExpiresAt = Carbon::now()->addMinutes(60);
        $accessToken = $admin->createToken('access_token', ['*'], $accessTokenExpiresAt)->plainTextToken;

        return response()->json([
            'access_token' => $accessToken,
            'expires_in' => $accessTokenExpiresAt->timestamp,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }
}
