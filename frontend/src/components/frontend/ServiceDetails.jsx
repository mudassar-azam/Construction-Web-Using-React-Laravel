import React, { useEffect, useState } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import Hero from '../partials/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../partials/http'
import LatestTestimonials from '../partials/LatestTestimonials'

export default function ServiceDetails() {

    const params = useParams();
    const [service, setService] = useState([]);
    const [services, setServices] = useState([]);

    const fetchService = async () => {
        const res = await fetch(`${apiUrl}get-service/${params.id}`, {
            method: 'GET'
        });

        const result = await res.json();
        setService(result.data);
    }

    const fetchAllService = async () => {
        const res = await fetch(`${apiUrl}get-services`, {
            method: 'GET'
        });

        const result = await res.json();
        setServices(result.data);
    }

    useEffect(() => {
        fetchService();
        fetchAllService();
    }, [params.id])

    return (
        <>
            <Header />

            <main>
                <Hero heading={`${service.title}`} />
            </main>
            <section className="section-10">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card shadow border-0 sidebar">
                                <div className="card-body px-4 py-4">
                                    <h3 className="mt-2 mb-3">
                                        Our Services
                                    </h3>
                                    <ul>
                                        {
                                            services && services.map(service => {
                                                return (
                                                    <li key={service.id}>
                                                        <Link to={`/service/${service.id}`}>{service.title}</Link>
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
                                <img className='w-100' src={`${fileUrl}uploads/services/large/${service.image}`} />
                            </div>
                            <h3 className='py-3'>{service.title}</h3>
                            <div>
                                {service.content}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <LatestTestimonials/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
