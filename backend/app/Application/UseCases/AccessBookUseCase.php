<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\BookRepositoryInterface;
use App\Domain\Repositories\SubscriptionRepositoryInterface;
use App\Domain\Exceptions\SubscriptionInactiveException;
use App\Domain\Exceptions\BookNotFoundException;

class AccessBookUseCase
{
    private BookRepositoryInterface $bookRepository;
    private SubscriptionRepositoryInterface $subscriptionRepository;

    public function __construct(
        BookRepositoryInterface $bookRepository,
        SubscriptionRepositoryInterface $subscriptionRepository
    ) {
        $this->bookRepository = $bookRepository;
        $this->subscriptionRepository = $subscriptionRepository;
    }

  public function execute(string $userId, string $bookId): string
{
    $book = $this->bookRepository->findById($bookId);

    if (!$book) {
        throw new BookNotFoundException();
    }

    $subscription = $this->subscriptionRepository
        ->findActiveByUserId($userId);

    if (!$subscription) {
        throw new SubscriptionInactiveException();
    }

    return $book->getContentUrl();
}
}