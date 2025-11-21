import React from 'react'
import Hero from '../components/Hero/Hero.jsx'
import About from '../components/Aboute/About'
import FeaturedCars from '../components/Features/FeaturedCars'
import Banner from '../components/Banner/Banner'
import Testimonals from '../components/Testimonals/Testimonals'

export default function Home() {
  return (
  <>
  <Hero />
  <About />
  <FeaturedCars />
  <Banner />
  <Testimonals />
  </>
  )
}
