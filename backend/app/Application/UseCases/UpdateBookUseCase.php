<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\BookRepositoryInterface;
use App\Domain\Entities\Book;

class UpdateBookUseCase
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function execute(
        string $id,
        string $title,
        string $author,
        string $status
    ): Book {

        $book = new Book(
            $id,
            $title,
            $author,
            $status
        );

        return $this->bookRepository->update($book);
    }
}