import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function PaymentPending() {
  return (
    <div>
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
                pending balance
              </th>
              <th className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              [...Array(4)].map((x, index) => (
                <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black border-r dark:text-white dark:border-gray-550">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 border-r">
                    <div className="flex items-center justify-center gap-1.5">
                      <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                      <p>Andrew Fergeson</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r text-green-150">
                    -$100.00
                  </td>
                  <td className="px-6 py-4 ">
                    <Link to={'/payments/view'}>
                      <span className='text-xs font-semibold px-5 py-1 rounded-full border border-blue-400 border-opacity-30 bg-blue-500 bg-opacity-5 text-blue-900'>View</span>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
