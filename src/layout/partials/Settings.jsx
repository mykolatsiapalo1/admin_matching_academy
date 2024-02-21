import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";

export default function Settings({ setDataTheme }) {
  const [showMenue, setShowMenue] = useState(false);

  return (
    <>
      <div className='bg-gray-350'>
        <button type="button" onClick={e => setShowMenue(true)} className="absolute right-0 top-[30%] items-center border-0 text-sm text-gray-650 rounded-lg hover:bg-gray-100">
          <span className="sr-only">Open sidebar</span>
          <div className='bg-white dark:bg-bkgdark px-1.5 md:px-2 lg:px-4 py-1.5 md:py-2 lg:py-3'>
            <IoMdSettings className=' md:w-5 md:h-5 text-[#686868] dark:text-white' />
          </div>
        </button>
      </div>
      <aside className={`fixed top-0 right-0 z-50 w-64 bg-white dark:bg-bkgdark dark:text-white delay-200 ease-in h-screen transition-transform   ${showMenue ? 'translate-x-0' : `translate-x-full`} `} aria-label="Sidebar">
        <div className="relative w-full h-full px-3 py-4">
          {showMenue &&
            <div className='absolute delay-200 ease-in transition-transform -left-[56px] top-[30%] bg-white p-4 dark:bg-bkgdark' onClick={e => setShowMenue(false)}>
              <button className='float-right text-xl text-black dark:text-white'>
                <RxCross1 className='w-6 h-6' />
              </button>
            </div>
          }
          <div className='px-5 py-6 space-y-5'>
            <div>
              <h3 className='font-semibold'>App Settings</h3>
            </div>
            <div className='flex flex-wrap gap-4 '>
              <div className='w-8 h-8 rounded-full bg-[#00AC6F]'></div>
              <div className='w-8 h-8 rounded-full bg-[#DD2025]'></div>
              <div className='w-8 h-8 rounded-full bg-[#4285F4]'></div>
              <div className='w-8 h-8 rounded-full bg-[#DC5D5D]'></div>
              <div className='w-8 h-8 rounded-full bg-[#63D36E]'></div>
              <div className='w-8 h-8 rounded-full bg-[#F5C451]'></div>
              <div className='w-8 h-8 rounded-full bg-[#FFD3D3]'></div>
              <div className='w-8 h-8 rounded-full bg-[#DF38C4]'></div>
              <div className='w-8 h-8 rounded-full bg-[#E89B54]'></div>
              <div className='w-8 h-8 rounded-full bg-[#17CABF]'></div>
            </div>
            <div>
              <hr />
            </div>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-semibold'>Dark Mode</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={e => { setDataTheme(e.target.checked); e.target.checked ? document.body.style.backgroundColor = '#202020' : document.body.style.backgroundColor = '#F9F9F9' }}

                />
                <div className="w-11 h-6 bg-[#6F6F76] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className='text-[10px] text-gray-400'>Adjust the appearance to reduce glare and give your eyes on break</p>
          </div>


        </div>
      </aside>
    </>
  )
}
