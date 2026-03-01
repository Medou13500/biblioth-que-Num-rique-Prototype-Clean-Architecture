<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Application\UseCases\AccessBookUseCase;
use App\Domain\Exceptions\SubscriptionInactiveException;
use App\Domain\Exceptions\BookNotFoundException;

class BookController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Book::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'status' => 'required|in:disponible,indisponible'
        ]);

        $book = Book::create($validated);

        return response()->json([
            'status' => 'success',
            'data' => $book
        ], 201);
    }

    public function destroy($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Livre supprimé'
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'status' => 'required|in:disponible,indisponible'
        ]);

        $book = Book::findOrFail($id);
        $book->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $book
        ]);
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $book
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | ACCESS BOOK (SUBSCRIPTION REQUIRED)
    |--------------------------------------------------------------------------
    */

    public function access(Request $request, $id)
    {
        try {

            $userId = $request->header('x-user-id');

            if (!$userId) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Utilisateur non identifié'
                ], 401);
            }

            $useCase = app(AccessBookUseCase::class);

            $contentUrl = $useCase->execute($userId, $id);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'content_url' => $contentUrl
                ]
            ]);

        } catch (SubscriptionInactiveException $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Abonnement inactif'
            ], 403);

        } catch (BookNotFoundException $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Livre introuvable'
            ], 404);
        }
    }
}