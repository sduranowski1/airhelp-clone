<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::all(); // Fetch all posts
        return Inertia::render('BlogPost/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(BlogPost $post)
    {
        // Fetch a specific post by ID from the route parameter
        return Inertia::render('BlogPost/Show', [
            'post' => $post,
        ]);
    }

    // Additional methods for creating and managing posts (optional)
}
