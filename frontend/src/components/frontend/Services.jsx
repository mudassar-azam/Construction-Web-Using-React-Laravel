import React, { useEffect, useState } from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import Hero from '../partials/Hero'
import { apiUrl, fileUrl } from '../partials/http';

export default function Services() {

    const [services, setServices] = useState([])

    const fetchAlltServices = async () => {
        const res = await fetch(apiUrl + 'get-services', {
            'method': 'GET'
        });

        const result = await res.json();
        setServices(result.data)
    }

    useEffect(() => {
        fetchAlltServices();
    }, [])

    return (
        <>
            <Header />
            <Hero heading="Services" />

            {/* Services    */}
            <section className="section-3 bg-light py-4">
                <div className="container py-5">
                    <div className="section-header text-center">
                        <span>our services</span>
                        <h2>Our construction services</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row pt-4">
                        {
                            services && services.map(service => {
                                return (
                                    <div className="col-md-4 col-lg-4" key={service.id}>
                                    <div className="item">
                                        <div className="service-image">
                                            <img src={`${fileUrl}uploads/services/small/${service.image}`} className='w-100' />
                                        </div>
                                        <div className="service-body">
                                            <div className="service-title">
                                                <h3>{service.title}</h3>
                                            </div>
                                            <div className="service-content">
                                                <p>{service.short_des}</p>
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

            <Footer />
        </>
    )
}
