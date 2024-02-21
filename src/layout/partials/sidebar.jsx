import { SlHome } from 'react-icons/sl'
import { BsCalendar2Event, BsCalendar4Event, BsPersonVcard, BsTrophy } from 'react-icons/bs'
import { LuGalleryThumbnails } from "react-icons/lu";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { RiCloseFill, RiCoupon3Line, RiGroupLine } from 'react-icons/ri'
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import logo from '../../assets/logo.png'
import dashboard from '../../assets/dashboard.svg'
import teacher from '../../assets/teacher.svg'
import calendar from '../../assets/calendar.svg'
// import { CiLocationOn } from 'react-icons/ci'

export default function Sidebar() {
  const [showMenue, setShowMenue] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  // console.log(dropDown)
  // const [test, settest] = useState(false);
  return (
    <>
      <div className='bg-white'>
        <button type="button" onClick={e => setShowMenue(true)} className="flex items-center p-2 ml-3 border-0 text-sm rounded-lg lg:hidden hover:bg-gray-100">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6  h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </div>

      <aside className={`fixed top-0 left-0 z-40 w-64 bg-bkg dark:bg-bkgdark h-screen ${showMenue ? null : `hidden`} lg:block`} aria-label="Sidebar">
        <div className="h-full px-9 py-4 overflow-y-auto space-y-3">
          {showMenue &&
            <button className='float-right text-xl text-white' onClick={e => setShowMenue(false)}>
              <RiCloseFill />
            </button>
          }
          <ul className="space-y-3 font-medium text-sm">
            <li className='py-3'>
              <Link to='/' className="flex items-center justify-center py-2 px-5 rounded-lg">
                <img src={logo} alt='....' className=' object-cover drop-shadow-lg' />
                {/* <h1 className='text-white text-2xl font-semibold'>Mydev World</h1> */}
              </Link>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                    :
                    "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                }
              >

                <img src={dashboard} alt='dashboard' />
                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </NavLink>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to='/teachers'
                className={({ isActive, isPending }) => {
                  // setDropDown(isActive)
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <img src={teacher} alt='dashboard' />
                <span className="flex-1 ml-3 whitespace-nowrap">Teacher</span>
              </NavLink>
            </li>
            {/* <div className={`${dropDown ? 'block' : 'hidden'} space-y-2`}>
              <NavLink
                to='/songwriter/incomplete'
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <AiOutlineUser />
                <span className="flex-1 ml-3 whitespace-nowrap">Incomplete Registrations</span>
              </NavLink>
              <NavLink
                to='/songwriter/reports'
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <TbReportAnalytics />
                <span className="flex-1 ml-3 whitespace-nowrap">Abuse Reports</span>
              </NavLink>
            </div> */}
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to='/calendar'
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <img src={calendar} alt='dashboard' />
                <span className="flex-1 ml-3 whitespace-nowrap">Calendar</span>
              </NavLink>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to="/classes"
                className={({ isActive, isPending }) =>
                  isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                    :
                    "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6667 5.68016V2.6535C14.6667 1.7135 14.24 1.3335 13.18 1.3335H10.4867C9.42667 1.3335 9 1.7135 9 2.6535V5.6735C9 6.62016 9.42667 6.9935 10.4867 6.9935H13.18C14.24 7.00016 14.6667 6.62016 14.6667 5.68016Z" fill="white" />
                  <path d="M14.6667 13.18V10.4867C14.6667 9.42667 14.24 9 13.18 9H10.4867C9.42667 9 9 9.42667 9 10.4867V13.18C9 14.24 9.42667 14.6667 10.4867 14.6667H13.18C14.24 14.6667 14.6667 14.24 14.6667 13.18Z" fill="white" />
                  <path d="M6.99967 5.68016V2.6535C6.99967 1.7135 6.57301 1.3335 5.51301 1.3335H2.81967C1.75967 1.3335 1.33301 1.7135 1.33301 2.6535V5.6735C1.33301 6.62016 1.75967 6.9935 2.81967 6.9935H5.51301C6.57301 7.00016 6.99967 6.62016 6.99967 5.68016Z" fill="white" />
                  <path d="M6.99967 13.18V10.4867C6.99967 9.42667 6.57301 9 5.51301 9H2.81967C1.75967 9 1.33301 9.42667 1.33301 10.4867V13.18C1.33301 14.24 1.75967 14.6667 2.81967 14.6667H5.51301C6.57301 14.6667 6.99967 14.24 6.99967 13.18Z" fill="white" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Classes</span>
              </NavLink>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to='/students'
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5627 11.5375C11.8892 10.6341 10.9277 9.98698 9.83667 9.70299L9.80267 9.69566L9.01667 11.0213C9.01614 11.1978 8.94573 11.3669 8.82082 11.4917C8.69591 11.6165 8.52665 11.6869 8.35 11.6874C7.98333 11.6874 7.68333 11.3877 7.33333 10.5057V10.4844C7.33333 10.2635 7.24554 10.0517 7.08926 9.89558C6.93298 9.73942 6.72101 9.65169 6.5 9.65169C6.27899 9.65169 6.06702 9.73942 5.91074 9.89558C5.75446 10.0517 5.66667 10.2635 5.66667 10.4844V10.5063V10.505C5.29333 11.3877 4.99067 11.6867 4.62467 11.6867C4.44802 11.6862 4.27876 11.6159 4.15385 11.4911C4.02894 11.3662 3.95853 11.1971 3.958 11.0206L3.19667 9.69233C2.09816 9.97151 1.12783 10.6168 0.446 11.5215L0.436667 11.5342C0.1664 11.9759 0.0159055 12.4803 0 12.9977V13.0024C0.00333333 13.1023 0 13.2189 0 13.3354V14.6677C0 15.0211 0.140476 15.3599 0.390524 15.6098C0.640573 15.8596 0.979711 16 1.33333 16H11.6667C12.0203 16 12.3594 15.8596 12.6095 15.6098C12.8595 15.3599 13 15.0211 13 14.6677V13.3354C13 13.2195 12.9967 13.1023 13 13.0024C12.9832 12.479 12.8302 11.9691 12.556 11.5229L12.5633 11.5362L12.5627 11.5375ZM2.99933 3.54053C2.99933 5.48566 4.21267 8.3434 6.49933 8.3434C8.746 8.3434 9.99933 5.48566 9.99933 3.54053V3.49723C9.99933 3.03797 9.9088 2.5832 9.73291 2.1589C9.55702 1.7346 9.29921 1.34906 8.97421 1.02432C8.6492 0.699567 8.26336 0.441963 7.83873 0.266211C7.41409 0.0904585 6.95896 0 6.49933 0C6.03971 0 5.58458 0.0904585 5.15994 0.266211C4.7353 0.441963 4.34946 0.699567 4.02446 1.02432C3.69945 1.34906 3.44165 1.7346 3.26576 2.1589C3.08986 2.5832 2.99933 3.03797 2.99933 3.49723V3.54253V3.54053Z" fill="white" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Students</span>
              </NavLink>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to="/services"
                className={({ isActive, isPending }) =>
                  isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                    :
                    "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                }
              >
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.77002 3.54004C2.74757 3.54004 3.54004 2.74757 3.54004 1.77002C3.54004 0.792464 2.74757 0 1.77002 0C0.792464 0 0 0.792464 0 1.77002C0 2.74757 0.792464 3.54004 1.77002 3.54004Z" fill="white" />
                  <path d="M1.77002 14.7131C2.74757 14.7131 3.54004 13.9207 3.54004 12.9431C3.54004 11.9656 2.74757 11.1731 1.77002 11.1731C0.792464 11.1731 0 11.9656 0 12.9431C0 13.9207 0.792464 14.7131 1.77002 14.7131Z" fill="white" />
                  <path d="M1.77002 9.12671C2.74757 9.12671 3.54004 8.33424 3.54004 7.35669C3.54004 6.37913 2.74757 5.58667 1.77002 5.58667C0.792464 5.58667 0 6.37913 0 7.35669C0 8.33424 0.792464 9.12671 1.77002 9.12671Z" fill="white" />
                  <path d="M15.1832 0H5.3799C4.9288 0 4.56311 0.36569 4.56311 0.816791V2.72325C4.56311 3.17435 4.9288 3.54004 5.3799 3.54004H15.1832C15.6343 3.54004 16 3.17435 16 2.72325V0.816791C16 0.36569 15.6343 0 15.1832 0Z" fill="white" />
                  <path d="M15.1832 11.1731H5.3799C4.9288 11.1731 4.56311 11.5388 4.56311 11.9899V13.8963C4.56311 14.3474 4.9288 14.7131 5.3799 14.7131H15.1832C15.6343 14.7131 16 14.3474 16 13.8963V11.9899C16 11.5388 15.6343 11.1731 15.1832 11.1731Z" fill="white" />
                  <path d="M15.1832 5.58667H5.3799C4.9288 5.58667 4.56311 5.95236 4.56311 6.40346V8.30992C4.56311 8.76102 4.9288 9.12671 5.3799 9.12671H15.1832C15.6343 9.12671 16 8.76102 16 8.30992V6.40346C16 5.95236 15.6343 5.58667 15.1832 5.58667Z" fill="white" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Services</span>
              </NavLink>
            </li>
          </ul>
          <div className='text-[#BABABA]'>
            <h4 className='uppercase text-sm'>Resources</h4>
          </div>
          <ul className="space-y-2 font-normal text-sm">
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to="/payments"
                className={({ isActive, isPending }) =>
                  isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                    :
                    "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                }
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.75 0C2.02065 0 1.32118 0.289731 0.805456 0.805456C0.289731 1.32118 0 2.02065 0 2.75V4H16V2.75C16 2.02065 15.7103 1.32118 15.1945 0.805456C14.6788 0.289731 13.9793 0 13.25 0H2.75ZM16 5H0V9.25C0 9.97935 0.289731 10.6788 0.805456 11.1945C1.32118 11.7103 2.02065 12 2.75 12H13.25C13.9793 12 14.6788 11.7103 15.1945 11.1945C15.7103 10.6788 16 9.97935 16 9.25V5ZM11.5 9H13.5C13.6326 9 13.7598 9.05268 13.8536 9.14645C13.9473 9.24021 14 9.36739 14 9.5C14 9.63261 13.9473 9.75979 13.8536 9.85355C13.7598 9.94732 13.6326 10 13.5 10H11.5C11.3674 10 11.2402 9.94732 11.1464 9.85355C11.0527 9.75979 11 9.63261 11 9.5C11 9.36739 11.0527 9.24021 11.1464 9.14645C11.2402 9.05268 11.3674 9 11.5 9Z" fill="white" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Payments</span>
              </NavLink>
            </li>
            <li onClick={e => setShowMenue(pre => false)}>
              <NavLink
                to='/vouchers'
                className={({ isActive, isPending }) => {
                  // setDropDown(isActive)
                  return (
                    isActive ? "flex items-center py-2 px-5 rounded-lg bg-green-150 drop-shadow text-white font-semibold"
                      :
                      "flex items-center py-2 px-5 text-white rounded-lg hover:bg-white/20 drop-shadow hover:text-white hover:font-medium"
                  )
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6667 3.80666V10.1933C14.6667 12.0333 13.1733 13.5267 11.3333 13.5267H4.66667C4.36001 13.5267 4.06667 13.4867 3.78001 13.4067C3.36667 13.2933 3.23334 12.7667 3.54001 12.46L10.6267 5.37333C10.7733 5.22666 10.9933 5.19333 11.2 5.23333C11.4133 5.27333 11.6467 5.21333 11.8133 5.05333L13.5267 3.33333C14.1533 2.70666 14.6667 2.91333 14.6667 3.80666Z" fill="white" />
                  <path d="M9.76004 4.90668L2.78004 11.8867C2.46004 12.2067 1.92671 12.1267 1.71337 11.7267C1.46671 11.2733 1.33337 10.7467 1.33337 10.1933V3.80668C1.33337 2.91335 1.84671 2.70668 2.47337 3.33335L4.19337 5.06001C4.45337 5.31335 4.88004 5.31335 5.14004 5.06001L7.52671 2.66668C7.78671 2.40668 8.21337 2.40668 8.47337 2.66668L9.76671 3.96001C10.02 4.22001 10.02 4.64668 9.76004 4.90668Z" fill="white" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Vouchers</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

    </>
  )
}
