import React, { useState } from 'react'
import Header from './partials/header'
import { Link, Outlet, useParams } from 'react-router-dom'

export default function StudentViewLayout() {
  const [activeTab, setActiveTAb] = useState(1);
  const { id } = useParams();

  return (
    <div>
      <Header header={'student details'} link={'/students'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8 space-y-4'>
        <div className='bg-white px-5'>
          <div className='flex flex-wrap items-center gap-4 xl:gap-8 text-lg text-gray-450'>
            <Link to={`/students/view/${id}`}>
              <button
                className={`${!window.location.href.includes('classes')
                  && !window.location.href.includes('payment')
                  && !window.location.href.includes('onboarding')
                  && !window.location.href.includes('comments')
                  && window.location.href.includes('view')
                  && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(1)}>student profile</button>
            </Link>
            <Link to={`/students/view/${id}/classes`}>
              <button className={`${window.location.href.includes('classes') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(2)}>class history</button>
            </Link>
            <Link to={`/students/view/${id}/payment`}>
              <button className={`${window.location.href.includes('payment') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(3)}>payment history</button>
            </Link>
            <Link to={`/students/view/${id}/onboarding`}>
              <button className={`${window.location.href.includes('onboarding') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(4)}>Onboarding</button>
            </Link>
            <Link to={`/students/view/${id}/comments`}>
              <button className={`${window.location.href.includes('comments') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(5)}>comments</button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
