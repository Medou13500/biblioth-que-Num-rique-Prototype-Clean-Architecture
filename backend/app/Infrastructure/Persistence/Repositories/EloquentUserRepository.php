<?php

namespace App\Infrastructure\Persistence\Repositories;

use App\Domain\Entities\User as DomainUser;
use App\Domain\Repositories\UserRepositoryInterface;
use App\Models\User as EloquentUser;
use Illuminate\Support\Str;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): ?DomainUser
    {
        $model = EloquentUser::where('email', $email)->first();

        if (!$model) {
            return null;
        }

        return new DomainUser(
            $model->id,
            $model->email,
            $model->password,
            $model->role
        );
    }

    public function save(DomainUser $user): DomainUser
    {
        $model = new EloquentUser();
        $model->id = Str::uuid();
        $model->email = $user->getEmail();
        $model->password = $user->getPasswordHash();
        $model->role = $user->getRole();
        $model->save();

        return new DomainUser(
            $model->id,
            $model->email,
            $model->password,
            $model->role
        );
    }


    public function hasActiveSubscription(string $userId): bool
    {
        $subscription = \App\Models\Subscription::where('user_id', $userId)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();

        return $subscription !== null;
    }
}