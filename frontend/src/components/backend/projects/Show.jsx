import React, { useEffect, useState } from 'react'
import Footer from '../../partials/Footer';
import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { apiUrl, token } from '../../partials/http';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Show() {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const res = await fetch(apiUrl + 'projects', {
            'method': 'GET',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
        });

        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id) => {
        if (confirm("Are you sure that you want to delete this project ?")) {
            const res = await fetch(apiUrl + 'projects/' + id, {
                'method': 'DELETE',
                'headers': {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token()}`
                },
            });

            const result = await res.json();
            if (result.status == true) {
                const filteredProjects = projects.filter(project => project.id != id)
                setProjects(filteredProjects)
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
                                        <h4 className='h5'>Projects</h4>
                                        <Link to="/admin/projects/create" className='btn btn-primary'>CREATE</Link>
                                    </div>
                                    <hr />
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Slug</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                projects && projects.map(project => {
                                                    return (
                                                        <tr key={`project-${project.id}`}>
                                                            <td>{project.id}</td>
                                                            <td>{project.title}</td>
                                                            <td>{project.slug}</td>
                                                            <td>{project.location}</td>
                                                            <td>
                                                                {
                                                                    (project.status == 1) ? 'Active' : 'Block'
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-primary">Edit</Link>
                                                                <Link onClick={() => deleteProject(project.id)} className="btn btn-secondary ms-2">Delete</Link>
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
