import React from 'react'

const Button = ({ label, className, type = "Button", onClickFunction }) => {
  return (
    <button 
        type={type} 
        className={`m-2 px-3 py-1 text-xl border-2 rounded-full bg-indigo-500 cursor-pointer ${className} `}
        onClick={onClickFunction}
    >
        {label ? label : "button"}
    </button>
  )
}

export default Button