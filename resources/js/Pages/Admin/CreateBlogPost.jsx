import React from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AdminDashboard from "@/Layouts/Sidebar.jsx";
import AdminNav from "@/Layouts/AdminNav.jsx";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function CreateBlogPost({ auth }) {
    const { data, setData, post } = useForm({
        title: '',
        excerpt: '',
        content: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Log the content before submission
        console.log("Submitting content:", data.content);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('excerpt', data.excerpt);
        formData.append('content', data.content);
        if (data.image) {
            formData.append('image', data.image);
        }

        // Log FormData content
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        post('/admin/blog', {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                window.location.href = '/blog';
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    const handleContentChange = (content) => {
        setData('content', content);
    };

    return (
        <AdminDashboard user={auth.user}>
            <Head title="Create Blog Post" />
            <AdminNav user={auth.user}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="p-3 flex flex-col space-y-3">
                                    <div>
                                        <label>Tytuł</label>
                                        <br/>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100"
                                        />
                                    </div>
                                    <div>
                                        <label>Introtekst</label>
                                        <br/>
                                        <textarea
                                            value={data.excerpt}
                                            onChange={e => setData('excerpt', e.target.value)}
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label>Treść</label>
                                        <br/>
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
                                    </div>
                                    <div>
                                        <label>Obrazek przewodni</label>
                                        <input type="file" onChange={e => setData('image', e.target.files[0])}/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary w-25" type="submit">Utwórz Post</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminNav>
        </AdminDashboard>
    );
}
