import React from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { default as AboutNew } from '../partials/About';
import Hero from '../partials/Hero';
import LatestTestimonials from '../partials/LatestTestimonials';
import TeamMembers from '../partials/TeamMembers';

export default function About() {
  return (
    <>
      <Header />

      {/* hero section  */}
      <Hero heading="About Us"/>

      {/* about  */}
      <AboutNew />

      {/* our team  */}
      <TeamMembers/>

      <LatestTestimonials/>
      
      <Footer />
    </>
  )
}
