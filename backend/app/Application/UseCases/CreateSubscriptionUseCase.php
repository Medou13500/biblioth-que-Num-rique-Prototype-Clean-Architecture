<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\SubscriptionRepositoryInterface;
use App\Domain\Entities\Subscription;
use Carbon\Carbon;

class CreateSubscriptionUseCase
{
    private SubscriptionRepositoryInterface $subscriptionRepository;

    public function __construct(
        SubscriptionRepositoryInterface $subscriptionRepository
    ) {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    public function execute(string $userId, string $type): Subscription
    {
        $startDate = Carbon::now();
        $endDate = Carbon::now()->addDays(30);

        $subscription = new Subscription(
            null,
            $userId,
            $type,
            $startDate,
            $endDate
        );

        return $this->subscriptionRepository->save($subscription);
    }
}