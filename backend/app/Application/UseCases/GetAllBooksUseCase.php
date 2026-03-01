<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\BookRepositoryInterface;

class GetAllBooksUseCase
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function execute(): array
    {
        return $this->bookRepository->findAll();
    }
}