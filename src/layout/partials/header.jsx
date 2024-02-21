import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi'
import { BsCalendar2Event, BsCalendar4Event, BsPersonVcard } from 'react-icons/bs';
import { MdArrowDropDown } from "react-icons/md";
import { RiCloseFill, RiGroupLine } from 'react-icons/ri';
import { SlHome } from 'react-icons/sl';
import { Link, NavLink } from 'react-router-dom';
import welcome from '../../assets/welcome.svg'
import { useAuth } from '../../contexts/AuthContext';
import { IoArrowBack } from 'react-icons/io5';

export default function Header({ header, link, arrow }) {
  const [drop, setDrop] = useState(false);
  const [showMenue, setShowMenue] = useState(false);
  const { logout } = useAuth();
  return (
    <div>
      <div className='bg-white m-1 dark:text-white' >
        <nav className="">
          <div className=" flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-4">
            <div className="flex items-center drop-shadow-lg">
              {header ?
                <Link to={link}>
                  <div className='flex items-center gap-1'>
                    {arrow &&
                      <IoArrowBack className='w-5 h-5' />
                    }
                    <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap capitalize ">{header}</span>
                  </div>
                </Link>
                :
                <div className='flex items-center gap-4 '>
                  <img src={welcome} alt='welcome' />
                  <div>
                    <h2 className='text-lg font-bold'>Welcome <span className='text-green-150 uppercase'>jhon</span></h2>
                    <p className='text-[10px] '>Hello, here you can manage your dashboard</p>
                  </div>
                </div>
              }
            </div>
            <div className="relative xl:max-w-2xl xl:w-full" id="navbar-default">
              <div className='flex items-center justify-end gap-2.5 w-full'>
                {/* <div className="relative max-w-52 w-full hidden lg:block">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full px-4 py-2.5 ps-10 text-xs text-gray-900 outline-none rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-150 focus:border-blue-500 dark:bg-white dark:bg-opacity-10  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                </div> */}
                <div onClick={e => setShowMenue(true)} className='rounded-full drop-shadow-lg  flex justify-center items-center w-9 h-9'>
                  <BiBell className='w-5 h-5' />
                </div>
                <button type="button" className="flex text-sm rounded-full md:mr-0" onClick={e => setDrop(!drop)} >
                  <div className='flex items-center text-sm drop-shadow-lg'>
                    <img className='rounded-full drop sm:mr-2 w-9 h-9 object-cover' src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=1600" alt='profile' />
                    <span className='hidden sm:block'>Jane doe </span>
                    <MdArrowDropDown />
                  </div>
                </button>
              </div>
              {/* <div className="absolute items-center z-20"> */}
              <div className={`z-50 ${drop ? null : 'hidden'} absolute right-0 max-w-xs w-full px-4 my-4 text-gray-950 font-medium list-none bg-white backdrop-blur-md bg-opacity-10 divide-y divide-gray-100 rounded-lg shadow dark:text-white`}>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-250 hover:text-white hover:rounded-md ">Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="block px-4 py-2 w-full text-left text-sm hover:bg-gray-250 hover:text-white hover:rounded-md">Log Out</button>
                  </li>
                </ul>
              </div>
              {/* </div> */}
            </div>
          </div>
          {/* <Notifications /> */}
        </nav>
      </div>

      <aside className={`fixed top-0 right-0 z-40 w-96 text-black bg-gradient-to-b from-gray-50 to-gray-100 h-screen ${showMenue ? 'block' : `hidden`}`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto space-y-3">
          {showMenue &&
            <button className='float-right text-xl text-black' onClick={e => setShowMenue(false)}>
              <RiCloseFill />
            </button>
          }
          <div className='pt-5'>
            <div className='rounded-md border px-4 py-1.5 space-y-1 bg-white shadow-md'>
              <h1 className='font-semibold'>Title</h1>
              <p className='text-xs font-medium text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, eligendi.</p>
            </div>
          </div>

        </div>
      </aside>
    </div>
  )
}
