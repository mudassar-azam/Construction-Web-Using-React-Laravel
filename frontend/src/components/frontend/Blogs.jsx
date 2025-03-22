import React from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Hero from '../partials/Hero';
import blogImg from '../../assets/images/construction3.jpg';

export default function Blogs() {
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
                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-img-top">
                                    <img src={blogImg} className='w-100' />
                                </div>
                                <div className="card-body p-4">
                                    <div className='title mb-3'>
                                        <a href="#">Dummy Tile</a>
                                    </div>
                                    <a href="#" className="btn btn-primary small">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-img-top">
                                    <img src={blogImg} className='w-100' />
                                </div>
                                <div className="card-body p-4">
                                    <div className='title mb-3'>
                                        <a href="#">Dummy Tile</a>
                                    </div>
                                    <a href="#" className="btn btn-primary small">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow border-0">
                                <div className="card-img-top">
                                    <img src={blogImg} className='w-100' />
                                </div>
                                <div className="card-body p-4">
                                    <div className='title mb-3'>
                                        <a href="#">Dummy Tile</a>
                                    </div>
                                    <a href="#" className="btn btn-primary small">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
