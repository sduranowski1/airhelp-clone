<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author_id',
        'excerpt',
        'category_id',
        'featured_image',
    ];

    // Relationships (optional):
    public function author()
    {
        return $this->belongsTo(User::class); // Assuming a User model for authors
    }

    public function category()
    {
        return $this->belongsTo(Category::class); // Assuming a Category model
    }

    // ... other methods
}

