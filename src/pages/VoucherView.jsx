import React from 'react'
import Header from '../layout/partials/header'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'

export default function VoucherView() {
  return (
    <div>
      <Header header={'voucher details'} link={'/vouchers'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto p-4 xl:px-8 space-y-4 mb-8'>
        <div className='flex flex-wrap justify-between gap-y-4'>
          <div className='basis-full xl:basis-[74%]'>
            <div className='bg-white w-full px-6'>
              <div className='flex items-center justify-between border-b py-3'>
                <h4 className='text-2xl font-semibold'>Voucher Details</h4>
                {/* <button className='capitalize px-6 py-2 text-white bg-green-150 rounded-md text-sm'>Edit class</button> */}
              </div>
              <div className='space-y-4 py-4'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h5 className='text-2xl font-semibold'>Physical Training</h5>
                    <p className='w-full '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
                  </div>
                  <p className='px-5 py-1.5 bg-green-500 bg-opacity-5 text-green-500 rounded-md'>Approved</p>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Date</p>
                    <p className='font-semibold'>Monday, December 23, 2023</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Time</p>
                    <p className='font-semibold'>9:00 AM - 10:00 AM</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Location</p>
                    <p className='font-semibold'>Street 3, Florida</p>
                  </div>
                </div>
                <hr />
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Class Types</p>
                    <p className='font-semibold'>Group Class</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Number of Students</p>
                    <p className='font-semibold'>12 Students</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Price per Student</p>
                    <p className='font-semibold'>$120.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-full xl:basis-[25%] bg-white'>
            <div className='bg-white py-3.5 px-4 border-b'>
              <h3 className='text-2xl font-semibold'>Student Details</h3>
            </div>
            <div className='bg-white px-4 py-3.5 space-y-5'>
              <img className='w-24 h-24 rounded-2xl mx-auto object-cover' src='https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600' />
              <div className='text-center space-y-3.5'>
                <div className='space-y-1'>
                  <p className='font-semibold'>Melissa Thomas</p>
                  <p className='text-xs text-gray-500'>melisathomas232@gmail.com</p>
                </div>
                <Link to={'/students/view'}>
                  <button className='w-full max-w-64 text-sm bg-green-150 text-white rounded-md font-medium py-2'>View Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto my-4">
          <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400 bg-white overflow-x-auto">
            <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
              <tr className="font-medium text-center">
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  STUDENT NAME
                </th>
                <th className="px-6 py-3">
                  AMOUNT
                </th>
                <th className="px-6 py-3">
                  status
                </th>
                <th className="px-6 py-3">
                  method
                </th>
                <th className="px-6 py-3">
                  PURCHASE DATE
                </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                [...Array(1)].map((x, index) => (
                  <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                    <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black border-r dark:text-white dark:border-gray-550">

                      {index + 1}
                    </th>
                    <td className="px-6 py-4 border-r dark:border-gray-550">
                      <div className="flex items-center gap-1.5">
                        <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                        <p>Andrew Fergeson</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r dark:border-gray-550">
                      $100.00
                    </td>
                    <td className="px-6 py-4 ">
                      <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">Paid</span>
                    </td>
                    <td className="px-6 py-4 ">
                      <p className="text-blue-600 font-bold">stripe</p>
                    </td>
                    <td className="px-6 py-4 ">
                      Oct 23, 2023
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
