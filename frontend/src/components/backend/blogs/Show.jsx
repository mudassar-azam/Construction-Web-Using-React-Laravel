import React, { useEffect, useState } from 'react'
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { apiUrl, token } from '../../partials/http';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Show() {
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const res = await fetch(apiUrl + 'blogs', {
            'method': 'GET',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
        });

        const result = await res.json();
        setBlogs(result.data);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        if (confirm("Are you sure that you want to delete this blog ?")) {
            const res = await fetch(apiUrl + 'blogs/' + id, {
                'method': 'DELETE',
                'headers': {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                },
            });

            const result = await res.json();
            if (result.status == true) {
                const filteredBlogs = blogs.filter(blog => blog.id != id)
                setBlogs(filteredBlogs)
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className='col-md-3'>
                            {/* sidebar  */}
                            <Sidebar />
                        </div>
                        <div className='col-md-9 '>
                            {/* dashboard  */}
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className='h5'>Blogs</h4>
                                        <Link to="/admin/blogs/create" className='btn btn-primary'>CREATE</Link>
                                    </div>
                                    <hr />
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Slug</th>
                                                <th>Author</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                blogs && blogs.map(blog => {
                                                    return (
                                                        <tr key={`blog-${blog.id}`}>
                                                            <td>{blog.id}</td>
                                                            <td>{blog.title}</td>
                                                            <td>{blog.slug}</td>
                                                            <td>{blog.author}</td>
                                                            <td>
                                                                {
                                                                    (blog.status == 1) ? 'Active' : 'Block'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/blogs/edit/${blog.id}`} className="btn btn-primary">Edit</Link>
                                                                <Link onClick={() => deleteBlog(blog.id)} className="btn btn-secondary ms-2">Delete</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
