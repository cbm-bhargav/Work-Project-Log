import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

const NotFound = () => {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-700 selection:bg-orange-500/30">
    
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center space-y-6">
        <h1 className="text-7xl font-extrabold">
          404 <span className="text-indigo-500">Page Not Found...</span>
        </h1>
        <p className='text-2xl text-slate-700'>redirect back to home page</p>
        <Link to='/'>
          <Button label="Back To Home" className="text-white" />
        </Link>
      </section>
    </main>
  )
}

export default NotFound