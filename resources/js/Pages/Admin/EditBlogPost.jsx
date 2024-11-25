import React from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {t} from "i18next"; // Import ReactQuill CSS

const BlogPostEdit = ({ auth, post }) => {
    const { data, setData, post: inertiaPost, errors } = useForm({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('excerpt', data.excerpt);
        formData.append('content', data.content);
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('_method', 'PUT'); // Method override for Laravel

        inertiaPost(`/admin/blog/${post.id}`, {
            data: formData,
            onSuccess: () => {
                window.location.href = '/blog';
            }
        });
    };

    const handleContentChange = (content) => {
        setData('content', content);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Blog Post" />
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4">{t("table.Edit Blog Post")}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="p-3 flex flex-col space-y-3">
                        <div>
                            <label>{t("table.Tytuł")}</label>
                            <br />
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100"
                            />
                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                        </div>
                        <div>
                            <label>{t("table.Introtekst")}</label>
                            <br />
                            <textarea
                                value={data.excerpt}
                                onChange={e => setData('excerpt', e.target.value)}
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100"
                            ></textarea>
                            {errors.excerpt && <div className="text-red-500">{errors.excerpt}</div>}
                        </div>
                        <div>
                            <label>{t("table.Treść")}</label>
                            <br />
                            <ReactQuill
                                value={data.content}
                                onChange={handleContentChange}
                                modules={{
                                    toolbar: [
                                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['bold', 'italic', 'underline'],
                                        ['link', 'image'],
                                        [{ 'align': [] }],
                                        [{ 'color': [] }, { 'background': [] }],
                                        ['clean']
                                    ],
                                }}
                                formats={[
                                    'header', 'font', 'size',
                                    'bold', 'italic', 'underline',
                                    'list', 'bullet', 'align',
                                    'link', 'image', 'color', 'background'
                                ]}
                            />
                            {errors.content && <div className="text-red-500">{errors.content}</div>}
                        </div>
                        <div>
                            <label>{t("table.Obrazek przewodni")}</label>
                            <input type="file" onChange={e => setData('image', e.target.files[0])} />
                            {errors.image && <div className="text-red-500">{errors.image}</div>}
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary w-25" type="submit">{t("table.Update Post")}</button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default BlogPostEdit;
