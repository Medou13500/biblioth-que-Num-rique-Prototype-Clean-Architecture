<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Exceptions\EmailAlreadyUsedException;
use App\Domain\Entities\User;
use App\Infrastructure\Security\PasswordHasherInterface;
use Illuminate\Support\Str;

class RegisterUserUseCase
{
    private UserRepositoryInterface $userRepository;
    private PasswordHasherInterface $passwordHasher;

    public function __construct(
        UserRepositoryInterface $userRepository,
        PasswordHasherInterface $passwordHasher
    ) {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    public function execute(string $email, string $plainPassword): User
    {
        $existingUser = $this->userRepository->findByEmail($email);

        if ($existingUser) {
            throw new EmailAlreadyUsedException();
        }

        $hashedPassword = $this->passwordHasher->hash($plainPassword);

        $user = new User(
            Str::uuid()->toString(),
            $email,
            $hashedPassword,
            'USER',
            true
        );

        return $this->userRepository->save($user);
    }
}