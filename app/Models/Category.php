<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    // Define relationship with BlogPost model (optional)
    public function posts()
    {
        return $this->hasMany(BlogPost::class);
    }

    // ... other methods
}

