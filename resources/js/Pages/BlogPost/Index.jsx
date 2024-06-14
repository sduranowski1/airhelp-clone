import React, { useState, useEffect } from 'react';
import BlogPostItem from './Thumbnail.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head } from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";

const BlogList = ({ posts }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">Blog</h1>
            <div className="container mx-auto">
            <ul className="list-none space-y-4">
                {posts.slice().reverse().map((post) => (
                    <BlogPostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
        </div>
    );
};

export default function Blog({ auth, posts }) {
    // const [posts, setPosts] = useState([]);
    //
    // useEffect(() => {
    //     // Fetch posts from an API or define them here
    //     // Example:
    //     const fetchedPosts = [
    //         { id: 1, title: "First Post", excerpt: "This is the first post." },
    //         { id: 2, title: "Second Post", excerpt: "This is the second post." },
    //         // Add more posts as needed
    //     ];
    //     setPosts(fetchedPosts);
    // }, []);

    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Blog" />
                    <BlogList posts={posts} />
                    <Footer />
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    <Head title="Blog" />
                    <BlogList posts={posts} />
                    <Footer />
                </Standard>
            )}
        </>
    );
}
