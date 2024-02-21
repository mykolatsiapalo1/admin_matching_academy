import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RxDownload } from 'react-icons/rx'
import Header from '../layout/partials/header'
import { BsThreeDots } from 'react-icons/bs';
import PaymentHistory from '../components/paymentComp/PaymentHistory';
import PaymentPending from '../components/paymentComp/PaymentPending';

export default function Payments() {
  const [activeTab, setActiveTAb] = useState(1);
  return (
    <div>
      <Header header={'Payments'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8'>
        <div className='space-y-3'>
          <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" className="block max-w-md w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search teacher..." required />
            </div>
            <div className='flex items-center gap-3'>
              <button className='px-4 py-3 border text-xs rounded flex items-center gap-1'><RxDownload />
                Download.csv</button>
              {/* <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Students</button> */}
            </div>
          </div>
          <div className='bg-white px-5'>
            <div className='flex flex-wrap items-center gap-4 xl:gap-8 text-lg text-gray-450'>
              <button className={`${activeTab === 1 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(1)}>Payments Received</button>
              <button className={`${activeTab === 2 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(2)}>Pending Payments</button>
            </div>
          </div>
          <div>
            {
              activeTab === 1 && <PaymentHistory />
            }
            {
              activeTab === 2 && <PaymentPending />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
