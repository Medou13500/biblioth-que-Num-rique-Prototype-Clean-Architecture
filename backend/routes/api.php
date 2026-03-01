<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SubscriptionController;
/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

/*
|--------------------------------------------------------------------------
| BOOKS - PUBLIC
|--------------------------------------------------------------------------
*/

// Liste des livres (visible côté user)
Route::get('/books', [BookController::class, 'index']);

// Détail d’un livre
Route::get('/books/{id}', [BookController::class, 'show']);

// Accès au contenu
Route::get('/books/{id}/access', [BookController::class, 'access']);
   // Suppression
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| BOOKS - ADMIN ONLY
|--------------------------------------------------------------------------
*/
    // Création
    Route::post('/books', [BookController::class, 'store']);
// Suppression
    Route::delete('/books/{id}', [BookController::class, 'destroy']);
      // Modification
    Route::put('/books/{id}', [BookController::class, 'update']);


Route::post('/subscriptions', [SubscriptionController::class, 'store']);
Route::get('/subscriptions/me', [SubscriptionController::class, 'me']);

Route::middleware(['admin'])->group(function () {});
