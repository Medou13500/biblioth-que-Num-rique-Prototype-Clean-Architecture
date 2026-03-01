<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';

    protected $fillable = [
        'id',
        'user_id',
        'type',
        'start_date',
        'end_date'
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}