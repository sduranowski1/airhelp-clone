import React from 'react';
import { Link } from '@inertiajs/react';

const BlogPostItem = ({ post }) => {
    const imageUrl = `/media/blog/${post.image}`;

    return (
        <li className="shadow rounded p-4 hover:bg-gray-100">
            <Link href={`/blog/${post.id}`} style={{textDecoration: "none"}}>
                {post.image && (
                    <img src={imageUrl} alt={post.title} className="w-full h-48 object-cover mb-4 rounded" />
                )}
                <h2 className="text-xl font-bold mb-2 text-green-600 hover:text-green-700">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt || post.content.slice(0, 100) + '...'}</p>
        </li>
    );
};

export default BlogPostItem;
