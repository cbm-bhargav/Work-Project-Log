import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './UI/Button'

const Header = () => {
  const token = localStorage.getItem("Token")
  let verifiedToken
  if(!token || token === undefined || token === null){
    verifiedToken = ""
  }else{
    verifiedToken = token
  }
  return (
    <>
      <header className='flex flex-row bg-slate-200 item-center justify-between py-2'>
        <h2 className='text-3xl font-extrabold ml-8 my-2'>Task <span className="text-indigo-500">Manager</span></h2>
        <nav>
          { verifiedToken === "" ?
            <nav>
              <NavLink to="/">
                <Button label="Home" className="mr-5 text-white hover:bg-white hover:border-2 hover:text-black"/>
              </NavLink>
              <NavLink to="/about">
                <Button label="About" className="mr-5 text-white hover:bg-white hover:border-2 hover:text-black"/>
              </NavLink>
              <NavLink to="/login">
                <Button label="Login" className="mr-5 text-white hover:bg-white hover:border-2 hover:text-black"/>
              </NavLink>
            </nav>
            :
            <NavLink to="/app/profile">
              <Button label="Profile" className="mr-8 text-white hover:bg-white hover:border-2 hover:text-black"/>
            </NavLink>
          }  
        </nav>
      </header>
    </>
  )
}

export default Header