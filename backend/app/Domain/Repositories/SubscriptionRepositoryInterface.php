<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\Subscription;

interface SubscriptionRepositoryInterface
{
    public function findActiveByUserId(string $userId): ?Subscription;
}