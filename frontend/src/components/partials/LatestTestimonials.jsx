import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl } from '../partials/http';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'

export default function LatestTestimonials() {

    const [testimonials, setTestimonials] = useState([])

    const fetchLatestTestimonials = async () => {
        const res = await fetch(apiUrl + 'get-latest-testimonials?limit=4', {
            'method': 'GET'
        });

        const result = await res.json();
        setTestimonials(result.data)
    }

    useEffect(() => {
        fetchLatestTestimonials();
    }, [])

    return (
        <>
            <section className="section-5 py-5">
                <div className='container'>
                    <div className="section-header text-center">
                        <span>Testimonials</span>
                        <h2>What people are saying about us</h2>
                        <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
                    </div>
                    <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={3} pagination={{ clickable: true }} breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        }
                    }}>
                        {
                            testimonials && testimonials.map(testimonial => {
                                return (
                                    <SwiperSlide key={testimonial.id}>
                                        <div className="testimonial-card card shadow border-0 w-100">
                                            <div className="card-body d-flex flex-column justify-content-between p-4 h-100">
                                                <div>
                                                    <div className="rating text-center mb-3">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <div className="content pt-4 pb-3" style={{ minHeight: '120px' }}>
                                                        <p className="mb-0">{testimonial.testimonial}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr />
                                                    <div className="d-flex align-items-center">
                                                        <div className='meta'>
                                                            <img src={`${fileUrl}uploads/testimonials/small/${testimonial.image}`} width={50} />
                                                        </div>
                                                        <div className='ps-3'>
                                                            <div className='name'>{testimonial.commented_by}</div>
                                                            <div>CEO</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>


                                )
                            })
                        }
                    </Swiper>
                </div>
            </section>
        </>
    )
}
