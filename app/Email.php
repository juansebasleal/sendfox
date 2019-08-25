<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    /**
     * 
     *
     * @var array
     */
    protected $fillable = [
        'subject', 'body', 'user_id'
    ];
}
