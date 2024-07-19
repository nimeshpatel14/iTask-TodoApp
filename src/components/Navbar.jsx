import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-14 sm:p-4 p-1  bg-cyan-950 text-cyan-400'>
        <div className='flex items-center px-2'>
            <img src='/logo.png' className='sm:w-10 w-8' />
            <span className='text-blue-300 font-bold mx-2 sm:text-lg text-base'>iTask</span>
        </div>
        <ul className='flex justify-center items-center sm:gap-4 gap-1 sm:text-lg font-medium text-sm text-gray-300'>
            <li className='cursor-pointer px-2'>Home</li>
            <li className='cursor-pointer px-2'>About</li>
            <li className='cursor-pointer px-2'>Contact Us</li>
        </ul>
    </div>
  )
}

export default Navbar