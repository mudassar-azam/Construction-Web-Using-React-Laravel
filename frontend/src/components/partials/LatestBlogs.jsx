import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl } from '../partials/http';

export default function LatestBlogs() {
    const [blogs, setBlogs] = useState([])

    const fetchLatestBlogs = async () => {
        const res = await fetch(apiUrl + 'get-latest-blogs?limit=4', {
            'method': 'GET'
        });

        const result = await res.json();
        setBlogs(result.data)
    }

    useEffect(() => {
        fetchLatestBlogs();
    }, [])

    return (
        <>
            <section className="section-3 bg-light py-4">
                <div className="container-fluid py-5">
                    <div className="section-header text-center">
                        <span>Blog & News</span>
                        <h2>Articles & blog posts</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-4">
                        {
                            blogs && blogs.map(blog => {
                                return (
                                    <div className="col-md-3 col-lg-3" key={blog.id}>
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
                                                    <a href="#" className='btn btn-primary'>Read More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
