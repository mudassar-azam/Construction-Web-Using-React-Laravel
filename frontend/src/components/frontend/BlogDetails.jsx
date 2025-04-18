import React, { useEffect, useState } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import Hero from '../partials/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../partials/http'
import LatestTestimonials from '../partials/LatestTestimonials'

export default function BlogDetails() {

    const params = useParams();
    const [blog, setBlog] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const fetchBlog = async () => {
        const res = await fetch(`${apiUrl}get-blog/${params.id}`, {
            method: 'GET'
        });

        const result = await res.json();
        setBlog(result.data);
    }

    const fetchAllBlog = async () => {
        const res = await fetch(`${apiUrl}get-blogs`, {
            method: 'GET'
        });

        const result = await res.json();
        setBlogs(result.data);
    }

    useEffect(() => {
        fetchBlog();
        fetchAllBlog();
    }, [params.id])

    return (
        <>
            <Header />

            <main>
                <Hero heading={`${blog.title}`} />
            </main>
            <section className="section-10">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card shadow border-0 sidebar">
                                <div className="card-body px-4 py-4">
                                    <h3 className="mt-2 mb-3">
                                        Our Blogs
                                    </h3>
                                    <ul>
                                        {
                                            blogs && blogs.map(blog => {
                                                return (
                                                    <li key={blog.id}>
                                                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div>
                                <img className='w-100' src={`${fileUrl}uploads/blogs/large/${blog.image}`} />
                            </div>
                            <h3 className='py-3'>{blog.title}</h3>
                            <div>
                                {blog.content}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <LatestTestimonials />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
