<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Infrastructure\Persistence\Repositories\EloquentUserRepository;

use App\Domain\Repositories\BookRepositoryInterface;
use App\Infrastructure\Persistence\Repositories\EloquentBookRepository;

use App\Domain\Repositories\SubscriptionRepositoryInterface;
use App\Infrastructure\Persistence\Repositories\EloquentSubscriptionRepository;

use App\Infrastructure\Security\PasswordHasherInterface;
use App\Infrastructure\Security\LaravelPasswordHasher;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            UserRepositoryInterface::class,
            EloquentUserRepository::class
        );

        $this->app->bind(
            BookRepositoryInterface::class,
            EloquentBookRepository::class
        );

        $this->app->bind(
            SubscriptionRepositoryInterface::class,
            EloquentSubscriptionRepository::class
        );

        $this->app->bind(
            PasswordHasherInterface::class,
            LaravelPasswordHasher::class
        );
    }

    public function boot(): void
    {
        //
    }
}