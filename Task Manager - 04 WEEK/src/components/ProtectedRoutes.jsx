import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
    const token = localStorage.getItem("Token")
    
    if(!token || token === "undefined" || token === "null"){
        return <Navigate to="/login" replace/>
    }
  return <Outlet/>
}

export default ProtectedRoutes