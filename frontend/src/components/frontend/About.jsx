import React from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { default as AboutNew } from '../partials/About';
import teamImg from '../../assets/images/pexels-sindre-fs-1040880.jpg';
import Hero from '../partials/Hero';
import LatestTestimonials from '../partials/LatestTestimonials';

export default function About() {
  return (
    <>
      <Header />

      {/* hero section  */}
      <Hero heading="About Us"/>

      {/* about  */}
      <AboutNew />

      {/* our team  */}
      <div className="section-8 py-5 bg-light">
        <div className="container">
          <div className="section-header text-center">
            <span>Blog & News</span>
            <h2>Articles & blog posts</h2>
            <p>We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
          </div>
          <div className="row pt-3">
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card shadow border-0">
                <div className="card-img-top">
                  <img src={teamImg} className='w-100' />
                </div>
                <div className="card-body p-4">
                  <div className='card-title'>
                    Ali
                  </div>
                  <div className='card-sub-title'>
                    Web Developer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card shadow border-0">
                <div className="card-img-top">
                  <img src={teamImg} className='w-100' />
                </div>
                <div className="card-body p-4">
                  <div className='card-title'>
                    Ali
                  </div>
                  <div className='card-sub-title'>
                    Web Developer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card shadow border-0">
                <div className="card-img-top">
                  <img src={teamImg} className='w-100' />
                </div>
                <div className="card-body p-4">
                  <div className='card-title'>
                    Ali
                  </div>
                  <div className='card-sub-title'>
                    Web Developer
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-3">
              <div className="card shadow border-0">
                <div className="card-img-top">
                  <img src={teamImg} className='w-100' />
                </div>
                <div className="card-body p-4">
                  <div className='card-title'>
                    Ali
                  </div>
                  <div className='card-sub-title'>
                    Web Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <LatestTestimonials/>
      
      <Footer />
    </>
  )
}
