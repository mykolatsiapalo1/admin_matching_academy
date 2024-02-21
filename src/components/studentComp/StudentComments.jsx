import React from 'react'

export default function StudentComments() {
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
                Teacher Name
              </th>
              <th className="px-6 py-3">
                Teacher comments
              </th>
              <th className="px-6 py-3">
                Date & time
              </th>
              <th className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              [...Array(3)].map((x, index) => (
                <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                        <p>Andrew Fergeson</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur
                  </td>
                  <td className="px-6 py-4 ">
                    Thursday, June4, 2023  11:55 AM
                  </td>
                  <td className="px-6 py-4 ">
                    <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-450 text-green-450 border border-green-450 bg-opacity-5 rounded-full">View</span>
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
