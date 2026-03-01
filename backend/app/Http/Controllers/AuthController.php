<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Application\UseCases\LoginUserUseCase;
use App\Application\UseCases\RegisterUserUseCase;
use App\Application\UseCases\Admin\AdminLoginUseCase;

use App\Domain\Exceptions\InvalidCredentialsException;
use App\Domain\Exceptions\EmailAlreadyUsedException;
use App\Domain\Exceptions\AccessDeniedException;

class AuthController extends Controller
{
    /* =========================
       LOGIN USER
    ==========================*/
    public function login(Request $request)
    {
        try {

            $loginUseCase = app(LoginUserUseCase::class);

            $user = $loginUseCase->execute(
                $request->input('email'),
                $request->input('password')
            );

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole(),
                ]
            ]);

        } catch (InvalidCredentialsException $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 401);

        } catch (AccessDeniedException $e) {

            // 👉 ADMIN qui tente login user
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 403);
        }
    }

    /* =========================
       REGISTER USER
    ==========================*/
    public function register(Request $request)
    {
        try {

            $registerUseCase = app(RegisterUserUseCase::class);

            $user = $registerUseCase->execute(
                $request->input('email'),
                $request->input('password')
            );

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole(),
                ]
            ], 201);

        } catch (EmailAlreadyUsedException $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 409);
        }
    }

    /* =========================
       LOGIN ADMIN
    ==========================*/
    public function adminLogin(Request $request)
    {
        try {

            $adminLoginUseCase = app(AdminLoginUseCase::class);

            $user = $adminLoginUseCase->execute(
                $request->input('email'),
                $request->input('password')
            );

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole(),
                ]
            ]);

        } catch (InvalidCredentialsException $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 401);

        } catch (AccessDeniedException $e) {

            // 👉 USER qui tente login admin
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 403);
        }
    }
}