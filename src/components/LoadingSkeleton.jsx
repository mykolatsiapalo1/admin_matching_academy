import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div>
      {[...Array(10)].map((index) => (
        <tr key={index} className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
          <td className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
        </tr>
      ))}
    </div>
  )
}
