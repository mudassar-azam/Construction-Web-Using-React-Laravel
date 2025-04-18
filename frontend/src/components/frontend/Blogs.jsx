import React, { useEffect, useState } from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Hero from '../partials/Hero';
import { apiUrl, fileUrl } from '../partials/http';
import { Link } from 'react-router-dom';

export default function Blogs() {

    const [blogs, setBlogs] = useState([])

    const fetchAlltBlogs = async () => {
        const res = await fetch(apiUrl + 'get-blogs', {
            'method': 'GET'
        });

        const result = await res.json();
        setBlogs(result.data)
    }

    useEffect(() => {
        fetchAlltBlogs();
    }, [])

    return (
        <>
            <Header />
            <Hero heading="Blogs" />
            {/* blog section  */}
            <div className="section-6 py-5 bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <span>Blog & News</span>
                        <h2>Articles & blog posts</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-3">
                        {
                            blogs && blogs.map(blog => {
                                return (
                                    <div className="col-md-4 col-lg-4" key={blog.id}>
                                        <div className="item">
                                            <div className="service-image">
                                                <img src={`${fileUrl}uploads/blogs/small/${blog.image}`} className='w-100' />
                                            </div>
                                            <div className="service-body">
                                                <div className="service-title">
                                                    <h3>{blog.title}</h3>
                                                </div>
                                                <div className="service-content">
                                                    <p>{blog.short_des}</p>
                                                    <Link to={`/blog/${blog.id}`} className='btn btn-primary'>Read More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
