import React from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Hero from '../partials/Hero';
import serviceImage1 from '../../assets/images/construction1.jpg';

export default function Projects() {
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
                        <div className="col-md-3 col-lg-3">
                            <div className="item">
                                <div className="service-image">
                                    <img src={serviceImage1} className='w-100' />
                                </div>
                                <div className="service-body">
                                    <div className="service-title">
                                        <h3>Civil Construction</h3>
                                    </div>
                                    <div className="service-content">
                                        <p>Civil construction is a core sector within the construction industry that focuses on the design, development, and maintenance of infrastructure that supports modern society.</p>
                                        <a href="#" className='btn btn-primary'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3">
                            <div className="item">
                                <div className="service-image">
                                    <img src={serviceImage1} className='w-100' />
                                </div>
                                <div className="service-body">
                                    <div className="service-title">
                                        <h3>Civil Construction</h3>
                                    </div>
                                    <div className="service-content">
                                        <p>Civil construction is a core sector within the construction industry that focuses on the design, development, and maintenance of infrastructure that supports modern society.</p>
                                        <a href="#" className='btn btn-primary'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3">
                            <div className="item">
                                <div className="service-image">
                                    <img src={serviceImage1} className='w-100' />
                                </div>
                                <div className="service-body">
                                    <div className="service-title">
                                        <h3>Civil Construction</h3>
                                    </div>
                                    <div className="service-content">
                                        <p>Civil construction is a core sector within the construction industry that focuses on the design, development, and maintenance of infrastructure that supports modern society.</p>
                                        <a href="#" className='btn btn-primary'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3">
                            <div className="item">
                                <div className="service-image">
                                    <img src={serviceImage1} className='w-100' />
                                </div>
                                <div className="service-body">
                                    <div className="service-title">
                                        <h3>Civil Construction</h3>
                                    </div>
                                    <div className="service-content">
                                        <p>Civil construction is a core sector within the construction industry that focuses on the design, development, and maintenance of infrastructure that supports modern society.</p>
                                        <a href="#" className='btn btn-primary'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
