import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './UI/Button'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user } = useAuth()

  return (
    <>
      <header className='flex flex-row bg-slate-200 item-center justify-between py-2'>
        <h2 className='text-3xl font-extrabold ml-8 my-2'>Task <span className="text-indigo-500">Manager</span></h2>
        <nav>
          { !user ?
            <nav>
              <NavLink to="/">
                <Button label="Home" className="mr-5 text-white border-indigo-500 hover:bg-white hover:border-2 hover:text-indigo-500"/>
              </NavLink>
              <NavLink to="/about">
                <Button label="About" className="mr-5 text-white border-indigo-500 hover:bg-white hover:border-2 hover:text-indigo-500"/>
              </NavLink>
              <NavLink to="/login">
                <Button label="Login" className="mr-5 text-white border-indigo-500 hover:bg-white hover:border-2 hover:text-indigo-500"/>
              </NavLink>
            </nav>
            :
            <NavLink to="/app/profile">
              <Button label="Profile" className="mr-8 text-white border-indigo-500 hover:bg-white hover:border-2 hover:text-indigo-500"/>
            </NavLink>
          }  
        </nav>
      </header>
    </>
  )
}

export default Header