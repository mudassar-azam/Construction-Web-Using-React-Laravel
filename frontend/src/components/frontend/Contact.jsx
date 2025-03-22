import React from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Hero from '../partials/Hero';

export default function Contact() {
    return (
        <>
            <Header />
            <Hero heading="Contact Us" />
            <section className="section-9 py-4">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Contact Us</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className='contact-a'>
                                        <h3>Call Us</h3>
                                        <a href="#">03025184597</a>
                                    </div>

                                    <div className="mt-3 contact-a">
                                        <h3>Send Us Email</h3>
                                        <a href="#">mudassarazam13@gmail.com</a>
                                    </div>

                                    <div className="mt-3">
                                        <h3>Address</h3>
                                        <p>Khushab,Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow border-0 mb-3">
                                <div className="card-body p-5">
                                    <form action="">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="" className='form-label'>Name</label>
                                                <input type="text" className='form-control form-control-lg' placeholder='Enter Name' />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="" className='form-label'>Email</label>
                                                <input type="email" className='form-control form-control-lg' placeholder='Enter Email' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="" className='form-label'>Number</label>
                                                <input type="text" className='form-control form-control-lg' placeholder='Phone Number' />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="" className='form-label'>Email</label>
                                                <input type="text" className='form-control form-control-lg' placeholder='Subject' />
                                            </div>
                                        </div>
                                        <div>
                                        <label htmlFor="" className='form-label'>Message</label>
                                        <textarea name="message" placeholder='Message' rows={5} className='form-control form-control-lg'></textarea>
                                        </div>
                                        <button className="btn btn-primary mt-3">Submit</button>
                                    </form>
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
