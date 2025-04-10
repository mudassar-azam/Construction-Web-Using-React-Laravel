import React from 'react'
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import cardIcon1 from '../../assets/images/icon-1.svg';
import cardIcon2 from '../../assets/images/icon-2.svg';
import cardIcon3 from '../../assets/images/icon-3.svg';
import About from '../partials/About';
import LatestServices from '../partials/LatestServices';
import LatestProjects from '../partials/LatestProjects';
import LatestBlogs from '../partials/LatestBlogs';
import LatestTestimonials from '../partials/LatestTestimonials';

export default function Home() {

  return (
    <>
      <Header />
      <main>

        {/* hero section  */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome to PK Constructions</span>
                <h1>Crafting dreams with <br />
                  precision and excellence.</h1>
                <p>We excel at transforming visions into reality through outstanding craftsmanship and precise
                  attention <br /> to detail. With years of experience and a dedication to quality.</p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary ms-2 large">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>/

        {/* about section  */}
        <About />

        {/* our services  */}
        <LatestServices />

        {/* why choose us */}
        <section className="section-4 py-4">
          <div className="container py-4">
            <div className="section-header text-center">
              <span>why choose us</span>
              <h2>Discover our wide variety of projects.</h2>
              <p>Created in close partnership with our clients and collaborators, this approach merges industry expertise, <br />
                decades of experience, innovation, and flexibility to consistently deliver excellence.</p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon text-center">
                    <img src={cardIcon1} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon text-center">
                    <img src={cardIcon2} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon text-center">
                    <img src={cardIcon3} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>Small actions create big impacts. It all begins and ends with each employee committing to safer work practices daily, ensuring they return home safely.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* our Projects  */}
        <LatestProjects/>

        {/* testimonial  */}
        <LatestTestimonials/>

        {/* blog section  */}
        <LatestBlogs/>

      </main>
      <Footer />
    </>
  )
}
