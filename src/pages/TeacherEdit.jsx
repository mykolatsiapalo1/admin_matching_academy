import { IoArrowBack } from 'react-icons/io5'
import Header from '../layout/partials/header'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'

export default function TeacherEdit() {
  return (
    <>
      <Header header={"teachers"} />
      <div className='px-6 py-2 space-y-4 max-w-screen-2xl mx-auto'>
        <div className='bg-white px-5 py-4'>
          <Link to='/teachers'>
            <div className='flex items-center gap-1'>
              <IoArrowBack className='w-5 h-5' />
              <h1 className='text-xl font-semibold'>Edit Teacher</h1>
            </div>
          </Link>
        </div>
        <div>
          <div className='bg-white px-5 py-3 border-b'>
            <h2 className='uppercase text-xl font-semibold'>GENERAL INFORMATION</h2>
          </div>
          <div className='bg-white px-5 py-8 space-y-9'>
            <div className="flex items-center w-full">
              <label for="dropzone-file" className="flex items-center w-full px-6 py-4 border-2 border-green-150 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-wrap items-center gap-5 ">
                  <div>
                    <div className='w-12 h-12 rounded-full bg-green-150 text-white flex items-center justify-center'>
                      <FaPlus className='w-5 h-5' />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Upload Image </p>
                    <p className="text-xs text-green-150 font-medium"><span className='text-gray-400 font-normal'>Drag or Drop a file or </span>Browse</p>
                  </div>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-7'>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">First name</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martin"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">last name</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Thomas"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">display name</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martin Thomas "
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">email address</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martintho23@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">phone number</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+75756765875678"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">status</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="On Duty"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className='px-5 py-3 bg-white space-y-7'>
          <div className='border-b flex items-center justify-between py-3'>
            <h2 className='uppercase text-xl font-semibold'>OFFERED SERVICES</h2>
            <div className="flex items-center">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 border border-gray-400 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">Select All</label>
            </div>
          </div>
          <div className=''>
            <div className='space-y-2.5'>
              <div className="flex items-center py-4 px-5 rounded-md border border-green-150 bg-green-150 bg-opacity-5 space-x-5">
                <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 text-green-150 border accent-green-150 bg-green-150 bg-opacity-5 rounded-lg " />
                <label for="default-checkbox2" className="ms-2 font-semibold">Pedal Classes</label>
              </div>
              <div className="flex items-center py-4 px-5 rounded-md border space-x-5">
                <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 text-green-150 border accent-green-150 bg-green-150 bg-opacity-5 rounded-lg " />
                <label for="default-checkbox2" className="ms-2 font-semibold">Tennis Classes</label>
              </div>
              <div className="flex items-center py-4 px-5 rounded-md border space-x-5">
                <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 text-green-150 border accent-green-150 bg-green-150 bg-opacity-5 rounded-lg " />
                <label for="default-checkbox2" className="ms-2 font-semibold">personal Training</label>
              </div>
              <div className="flex items-center py-4 px-5 rounded-md border space-x-5">
                <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 text-green-150 border accent-green-150 bg-green-150 bg-opacity-5 rounded-lg " />
                <label for="default-checkbox2" className="ms-2 font-semibold">Pilates</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className='px-5 py-2.5 font-semibold bg-green-150 text-white rounded-md'>Update Information</button>
        </div>
      </div>
    </>
  )
}
