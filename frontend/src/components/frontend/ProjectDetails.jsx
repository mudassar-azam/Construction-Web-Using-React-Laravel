import React, { useEffect, useState } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import Hero from '../partials/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../partials/http'
import LatestTestimonials from '../partials/LatestTestimonials'

export default function ProjectDetails() {

    const params = useParams();
    const [project, setProject] = useState([]);
    const [projects, setProjects] = useState([]);

    const fetchProject = async () => {
        const res = await fetch(`${apiUrl}get-project/${params.id}`, {
            method: 'GET'
        });

        const result = await res.json();
        setProject(result.data);
    }

    const fetchAllProject = async () => {
        const res = await fetch(`${apiUrl}get-projects`, {
            method: 'GET'
        });

        const result = await res.json();
        setProjects(result.data);
    }

    useEffect(() => {
        fetchProject();
        fetchAllProject();
    }, [params.id])

    return (
        <>
            <Header />

            <main>
                <Hero heading={`${project.title}`} />
            </main>
            <section className="section-10">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card shadow border-0 sidebar">
                                <div className="card-body px-4 py-4">
                                    <h3 className="mt-2 mb-3">
                                        Our Projects
                                    </h3>
                                    <ul>
                                        {
                                            projects && projects.map(project => {
                                                return (
                                                    <li key={project.id}>
                                                        <Link to={`/project/${project.id}`}>{project.title}</Link>
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
                                <img className='w-100' src={`${fileUrl}uploads/projects/large/${project.image}`} />
                            </div>
                            <h3 className='py-3'>{project.title}</h3>
                            <div>
                                {project.content}
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
