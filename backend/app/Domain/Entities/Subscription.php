<?php

namespace App\Domain\Entities;

class Subscription
{
    private string $id;
    private string $userId;
    private string $type;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;

    public function __construct(
        string $id,
        string $userId,
        string $type,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate
    ) {
        $this->id = $id;
        $this->userId = $userId;
        $this->type = $type;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    public function isActive(): bool
    {
        return $this->endDate >= new \DateTimeImmutable();
    }
}