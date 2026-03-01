<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Récupère l'email envoyé depuis le frontend
        $email = $request->header('x-user-email');

        // Si aucun email envoyé → interdit
        if (!$email) {
            return response()->json([
                'message' => 'Unauthorized - No email header'
            ], 401);
        }

        // Recherche l'utilisateur
        $user = User::where('email', $email)->first();

        // Si user inexistant ou rôle différent de admin
        if (!$user || strtolower($user->role) !== 'admin') {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        // Autorisé
        return $next($request);
    }
}