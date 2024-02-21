import React, { useState } from 'react'
import Header from '../layout/partials/header'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import StudentProfile from '../components/studentComp/StudentProfile';
import StudentClasses from '../components/studentComp/StudentClasses';
import StudentPayment from '../components/studentComp/StudentPayment';
import StudentOnboarding from '../components/studentComp/StudentOnboarding';
import StudentComments from '../components/studentComp/StudentComments';

export default function StudentView() {
  const [activeTab, setActiveTAb] = useState(1);
  return (
    <div>
      {/* <Header header={'student details'} link={'/students'} arrow={true} /> */}
      {/* <div className='max-w-screen-2xl mx-auto p-4 xl:px-8 space-y-4 mb-8'> */}
      {/* <div className='bg-white px-5'>
          <div className='flex flex-wrap items-center gap-4 xl:gap-8 text-lg text-gray-450'>
            <button className={`${activeTab === 1 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(1)}>student profile</button>
            <button className={`${activeTab === 2 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(2)}>class history</button>
            <button className={`${activeTab === 3 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(3)}>payment history</button>
            <button className={`${activeTab === 4 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(4)}>Onboarding</button>
            <button className={`${activeTab === 5 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4`} onClick={e => setActiveTAb(5)}>comments</button>
          </div>
        </div> */}
      {
        activeTab === 1 &&
        <StudentProfile />
      }
      {
        activeTab === 2 &&
        <StudentClasses />
      }
      {
        activeTab === 3 &&
        <StudentPayment />
      }
      {
        activeTab === 4 &&
        <StudentOnboarding />
      }
      {
        activeTab === 5 &&
        <StudentComments />
      }
      {/* </div> */}
    </div >
  )
}
