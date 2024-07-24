import React, {useEffect} from 'react';
import {Link, useForm} from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import Footer from '@/Layouts/Footer.jsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import "../../../css/styles.css"

const BlogPostShow = ({ auth, post }) => {
    const imageUrl = `/media/blog/${post.image}`;
    const updatedDate = format(new Date(post.updated_at), 'dd MMMM yyyy', { locale: pl });
    const { delete: destroy } = useForm();


    useEffect(() => {
        // Set the Disqus configuration
        window.disqus_config = function () {
            this.language = 'pl'; // Change 'fr' to the desired language code
        };
        // Dynamically load Disqus script
        const script = document.createElement('script');
        script.src = '//besmartair.disqus.com/embed.js';  // Use the provided Disqus script src
        script.setAttribute('data-timestamp', +new Date());
        script.async = true;
        document.body.appendChild(script);

        // Optionally load the count script for comment counts
        const countScript = document.createElement('script');
        countScript.id = 'dsq-count-scr';
        countScript.src = '//besmartair.disqus.com/count.js';
        countScript.async = true;
        document.body.appendChild(countScript);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(countScript);
        };
    }, []);

    const handleDelete = () => {
        destroy(`/admin/blog/${post.id}`, {
            onSuccess: () => {
                window.location.href = '/blog';
            }
        });
    };

    const content = (
        <div>
            <Head title={post.title} />
            <div className="container p-4" style={{ display: "block"}}>
                {post.image && (
                    <img src={imageUrl} alt={post.title} className="w-full h-96 object-cover mb-4 rounded"/>
                )}
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="pb-2">{updatedDate}</p>
                <div className="text-gray-700" dangerouslySetInnerHTML={{__html: post.content}}></div>
                <Link href="/blog" className="text-green-500 hover:text-green-700 mt-4 block">Wróć do Artykułów</Link>
                {auth.user && (
                    <>
                        <Link href={`/admin/blog/${post.id}/edit`} className="text-yellow-500 mt-4 block">Edycja</Link>
                        <button onClick={handleDelete} className="text-red-500 mt-4 block">Usuń</button>
                    </>
                )}
                <div id="disqus_thread" className="mt-8"></div>

            </div>
            <Footer/>
        </div>
    );

    return auth.user ? (
        <AuthenticatedLayout user={auth.user}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <Standard user={auth.user}>
            {content}
        </Standard>
    );
};

export default BlogPostShow;

