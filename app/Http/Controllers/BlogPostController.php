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

    public function create()
    {
        return Inertia::render('Admin/CreateBlogPost');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048', // Validate the image
        ]);

        $imageFileName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('media/blog'), $imageFileName);
        }

        BlogPost::create([
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'content' => $request->input('content'),
            'image' => $imageFileName,
        ]);

        return redirect('/blog')->with('success', 'Blog post created successfully!');
    }

    public function show(BlogPost $post)
    {
        // Fetch a specific post by ID from the route parameter
        return Inertia::render('BlogPost/Show', [
            'post' => $post,
        ]);
    }

    // Additional methods for creating and managing posts (optional)

    public function edit(BlogPost $post)
    {
        return Inertia::render('Admin/EditBlogPost', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, BlogPost $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imageFileName = $post->image;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageFileName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('media/blog'), $imageFileName);
        }

        $post->update([
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'content' => $request->input('content'),
            'image' => $imageFileName,
        ]);

        return redirect('/blog')->with('success', 'Blog post updated successfully!');
    }

    public function destroy(BlogPost $post)
    {
        if ($post->image) {
            unlink(public_path('media/blog') . '/' . $post->image);
        }

        $post->delete();

        return redirect('/blog')->with('success', 'Blog post deleted successfully!');
    }
}
