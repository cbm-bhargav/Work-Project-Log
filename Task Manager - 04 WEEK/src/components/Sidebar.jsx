import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './UI/Button'

const Sidebar = () => {
  return (
    <aside className='flex flex-col h-[90vh] justify-between'>
        <nav className='flex flex-col text-2xl px-2'>
            <NavLink to="/app/dashboard" className="text-2xl my-2 p-1 pl-3 hover:bg-slate-500 hover:text-white rounded-xl">
                Dashboard
            </NavLink>
            <NavLink to="/app/profile" className="text-2xl my-2 p-1 pl-3 hover:bg-slate-500 hover:text-white rounded-xl">
                Profile
            </NavLink>
            <NavLink to="/app/user" className="text- my-2 p-1 pl-3 hover:bg-slate-500 hover:text-white rounded-xl">
                Users
            </NavLink>
            <NavLink to="/app/task" className="text-2xl my-2 p-1 pl-3 hover:bg-slate-500 hover:text-white rounded-xl">
                Task
            </NavLink>
        </nav>
        <div className="w-full border-t-2 border-black flex justify-center">
            <Button label="Logout" className="min-w-fit text-white w-52 rounded-xl hover:bg-white hover:text-black"/>
        </div>
    </aside>
  )
}

export default Sidebar