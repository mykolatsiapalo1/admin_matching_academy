import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RxDownload } from 'react-icons/rx'
import { Link } from 'react-router-dom'

export default function VoucherHIstory() {
  return (
    <div>
      <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block outline-none max-w-md w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search teacher..." required />
        </div>
        <div className='flex items-center gap-3'>
          <button className='px-4 py-3 border text-xs rounded flex items-center gap-1'><RxDownload />
            Download.csv</button>
          <Link to={'/vouchers/add'}>
            <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Voucher</button>
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-[#4A4A4A] uppercase border-b bg-white dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
            <tr className="font-medium text-center">
              <th className="px-6 py-3">
                ID
              </th>
              <th className="px-6 py-3">
                Classes
              </th>
              <th className="px-6 py-3">
                Student names
              </th>
              <th className="px-6 py-3">
                type
              </th>
              <th className="px-6 py-3">
                price
              </th>
              <th className="px-6 py-3">
                price per student
              </th>
              <th className="px-6 py-3">
                student
              </th>
              <th className="px-6 py-3">
                Date/time
              </th>
              <th className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              [...Array(4)].map((x, index) => (
                <tr key={index} className="bg-white border-b text-xs">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 ">
                    04
                  </td>
                  <td className="px-6 py-4 ">
                    10 students
                  </td>
                  <td className="px-6 py-4 ">
                    Group Class
                  </td>
                  <td className="px-6 py-4 ">
                    $200.00
                  </td>
                  <td className="px-6 py-4 ">
                    $200.00
                  </td>
                  <td className="px-6 py-4 ">
                    <span className='uppercase rounded-md bg-green-450 bg-opacity-5 text-blue-600 px-4 py-1 font-semibold'>EXPIRED</span>
                  </td>
                  <td className="px-6 py-4 ">
                    Group Class
                  </td>
                  <td className="px-6 py-4 ">
                    <Link to={'/vouchers/view'}>
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
