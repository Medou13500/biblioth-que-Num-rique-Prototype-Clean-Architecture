<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $userId = $request->header('x-user-id');

        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non identifié'
            ], 401);
        }

        $subscription = Subscription::create([
            'id' => (string) Str::uuid(),
            'user_id' => $userId,
            'type' => $validated['type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $subscription
        ], 201);
    }

    public function me(Request $request)
    {
        $userId = $request->header('x-user-id');

        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non identifié'
            ], 401);
        }

        $subscription = Subscription::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => $subscription
        ]);
    }
}