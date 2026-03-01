<?php

namespace App\Infrastructure\Persistence\Repositories;

use App\Domain\Repositories\SubscriptionRepositoryInterface;
use App\Domain\Entities\Subscription;
use App\Models\Subscription as EloquentSubscription;
use DateTimeImmutable;

class EloquentSubscriptionRepository implements SubscriptionRepositoryInterface
{
    public function findByUserId(string $userId): array
    {
        $models = EloquentSubscription::where('user_id', $userId)->get();

        return $models->map(function ($model) {
            return new Subscription(
                $model->id,
                $model->user_id,
                $model->type,
                new DateTimeImmutable($model->start_date),
                new DateTimeImmutable($model->end_date)
            );
        })->toArray();
    }

 public function findActiveByUserId(string $userId): ?Subscription
{
    $model = EloquentSubscription::where('user_id', $userId)
        ->where('end_date', '>=', now())
        ->orderByDesc('end_date')
        ->first();

    if (!$model) {
        return null;
    }

    return new Subscription(
        $model->id,
        $model->user_id,
        $model->type,
        $model->start_date,
        $model->end_date
    );
}
}