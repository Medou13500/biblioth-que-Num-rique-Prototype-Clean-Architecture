<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\SubscriptionRepositoryInterface;

class GetUserSubscriptionUseCase
{
    private SubscriptionRepositoryInterface $subscriptionRepository;

    public function __construct(
        SubscriptionRepositoryInterface $subscriptionRepository
    ) {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    public function execute(string $userId)
    {
        return $this->subscriptionRepository->findActiveByUserId($userId);
    }
}