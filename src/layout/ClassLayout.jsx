import React, { useState } from 'react'
import Header from './partials/header'
import { Link, Outlet, useParams } from 'react-router-dom'

export default function ClassLayout() {
  const [activeTab, setActiveTAb] = useState(1);
  const { id } = useParams();

  return (
    <div>
      <Header header={'class details'} link={'/classes'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8 space-y-4'>
        <div className='bg-white px-5'>
          <div className='flex flex-wrap items-center gap-4 xl:gap-8 text-lg text-gray-450'>
            <Link to={`/classes/view/${id}`}>
              <button
                className={`${!window.location.href.includes('students')
                  && !window.location.href.includes('comment')
                  && !window.location.href.includes('history')
                  && window.location.href.includes('view')
                  && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(1)}>Class details</button>
            </Link>
            <Link to={`/classes/view/${id}/students`}>
              <button className={`${window.location.href.includes('students') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(2)}>student list</button>
            </Link>
            <Link to={`/classes/view/${id}/comment`}>
              <button className={`${window.location.href.includes('comment') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(3)}>Comment history</button>
            </Link>
            <Link to={`/classes/view/${id}/history`}>
              <button className={`${window.location.href.includes('history') && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(4)}>class history</button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
