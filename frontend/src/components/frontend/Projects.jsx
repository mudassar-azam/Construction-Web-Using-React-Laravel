import React, { useEffect, useState } from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Hero from '../partials/Hero';
import { apiUrl, fileUrl } from '../partials/http';
import { Link } from 'react-router-dom';

export default function Projects() {

    const [projects, setProjects] = useState([])

    const fetchAlltProjects = async () => {
        const res = await fetch(apiUrl + 'get-projects', {
            'method': 'GET'
        });

        const result = await res.json();
        setProjects(result.data)
    }

    useEffect(() => {
        fetchAlltProjects();
    }, [])

    return (
        <>
            <Header />
            <Hero heading="Projects" />
            {/* our Projects  */}
            <section className="section-3 bg-light py-4">
                <div className="container py-5">
                    <div className="section-header text-center">
                        <span>our projects</span>
                        <h2>Discover our diverse range of projects</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-4">
                        {
                            projects && projects.map(project => {
                                return (
                                    <div className="col-md-4 col-lg-4" key={project.id}>
                                        <div className="item">
                                            <div className="service-image">
                                                <img src={`${fileUrl}uploads/projects/small/${project.image}`} className='w-100' />
                                            </div>
                                            <div className="service-body">
                                                <div className="service-title">
                                                    <h3>{project.title}</h3>
                                                </div>
                                                <div className="service-content">
                                                    <p>{project.short_des}</p>
                                                    <Link to={`/project/${project.id}`} className='btn btn-primary'>Read More</Link>
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
            <Footer />
        </>
    )
}
