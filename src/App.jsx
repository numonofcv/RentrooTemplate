import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Importing components
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
// Importing pages
import Home from './pages/Home.jsx';
import Listing from './pages/Listing.jsx';
import CarDetails from './pages/CarDetails.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import MyBookings from './pages/MyBookings.jsx';
export default function App() {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/listing' element={<Listing/>}/>  
        <Route path='/listing/:id' element={<CarDetails/>}/>
        <Route path='/blog' element={<Blog/>}/> 
        <Route path='/contact' element={<Contact/>}/> 
        <Route path='/my-bookings' element={<MyBookings/>}/>
        {/* <Route path='*' element={<h1>404 Not Found</h1>}/>   */}
      </Routes>
      <Footer/>
    </main>
  )
}
