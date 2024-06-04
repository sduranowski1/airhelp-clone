import React from 'react';
import { Link } from '@inertiajs/react';

const BlogPostItem = ({ post }) => {
    return (
        <li className="shadow rounded p-4 hover:bg-gray-100">
            <Link href={`/blog/${post.id}`}>
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt || post.content.slice(0, 100) + '...'}</p>
        </li>
    );
};

export default BlogPostItem;
