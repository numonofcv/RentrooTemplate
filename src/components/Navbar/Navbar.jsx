import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar({setMenuOpened, containerStyled}) {
  const navLinks =[
    {path: '/', title: 'Home'},
    {path:'/listing', title: 'Listings'},
     {path:'/blog', title: 'Blog'},
     {path:'/contact', title: 'Contact'},
  ]
  return (
    <nav className={containerStyled}>
    {navLinks.map((link, index) => (
      <NavLink onClick={()=>{setMenuOpened(false); scrollTo(0,0)}} key={index} to={link.path} className={({isActive})=>`${isActive ? 'active-link' : ''} font-bold px-3 py-2 rounded-full uppercase text-sm hover: transition-all`}>
        {link.title}
      </NavLink>
    ))}
    </nav>
  )
}
