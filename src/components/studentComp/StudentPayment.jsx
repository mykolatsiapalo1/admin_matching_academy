import React from 'react'

export default function StudentPayment() {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right bg-white overflow-x-auto">
          <thead className="text-sm text-[#4A4A4A] uppercase border-b">
            <tr className="font-semibold text-center">
              <th className="px-6 py-3">
                ID
              </th>
              <th className="px-6 py-3">
                service
              </th>
              <th className="px-6 py-3">
                date
              </th>
              <th className="px-6 py-3">
                teacher
              </th>
              <th className="px-6 py-3">
                location
              </th>
              <th className="px-6 py-3">
                price
              </th>
              <th className="px-6 py-3">
                status
              </th>
              <th className="px-6 py-3">
                pending balance
              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              [...Array(3)].map((x, index) => (
                <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                    {/* <div className="flex items-center gap-1.5">
                              <img src={verify} alt="verify" />
                              <p>Integration Set up</p>
                            </div> */}
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    Tennis Training
                  </td>
                  <td className="px-6 py-4">
                    {/* <span className="font-medium text-[10px] px-5 py-1 bg-green-500 text-green-150 bg-opacity-5 rounded-full">closed</span> */}
                    May 27, 2023
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center gap-1.5">
                      <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                      <p>Andrew Fergeson</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 ">
                    Street 2, Florida
                  </td>
                  <td className="px-6 py-4 text-center">
                    $200
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">Approved</span>
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="font-medium text-xs text-green-150 ">-$200</span>
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
