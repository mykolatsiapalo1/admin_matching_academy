import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RxDownload } from 'react-icons/rx'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

export default function ClassComments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchComments = async () => {
    setIsLoading(true)
    try {
      // Create a query to filter comments based on the classId
      const q = query(collection(db, 'comments'), where('classId', '==', id));
      const querySnapshot = await getDocs(q);

      // Extract comments data from the query snapshot
      const commentsData = querySnapshot.docs.map(doc => doc.data());

      // Update the state with the fetched comments
      setComments(commentsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id])
  return (
    <div className='bg-white'>
      <div className="flex flex-wrap justify-between items-center bg-white p-5">
        <h1 className="font-semibold">Comments History </h1>
        <div className='flex items-center justify-end gap-4 w-full max-w-lg'>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full px-4 py-3 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Teacher name..."
              required
            />
          </div>
          <button className='px-4 py-3 border text-xs rounded flex items-center gap-1'>
            <RxDownload />
            Download.csv
          </button>
        </div>
      </div>
      <div className='relative overflow-auto'>
        <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-[#4A4A4A] uppercase border-b-4 border-gray-850 bg-gray-[#F1F1F1] dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
            <tr className="font-medium">
              <th className="px-6 py-3">
                ID
              </th>
              <th className="px-6 py-3">
                Teacher name
              </th>
              <th className="px-6 py-3">
                comment type
              </th>
              <th className="px-6 py-3">
                TEACHER COMMENTS
              </th>
              <th className="px-6 py-3">
                date & time
              </th>
              <th className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {
              !isLoading ? (
                comments?.length > 0 ? (
                  comments.map((x, index) => (
                    <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                      <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black dark:text-white dark:border-gray-550">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 dark:border-gray-550">
                        <div className="flex items-center gap-1.5">
                          <img className='w-5 h-5 rounded-full object-cover' src={'https://images.pexels.com/photos/4236828/pexels-photo-4236828.jpeg?auto=compress&cs=tinysrgb&w=600'} alt="verify" />
                          <p>Andrew Fergeson</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        Global
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                      </td>
                      <td className="px-6 py-4">
                        4/06/23 11:55 AM
                      </td>
                      <td className="px-6 py-4">
                        <span className='text-blue-500 bg-blue-500 bg-opacity-5 border border-blue-500 rounded-full px-4 py-1'>View</span>
                      </td>
                    </tr>
                  )))
                  :
                  (
                    <tr className='bg-white border-b text-xs'>
                      <th colSpan='6' scope='row' className='px-6 py-4 whitespace-nowrap'>
                        No comments found!
                      </th>
                    </tr>
                  )
              )
                :
                <>
                  {[...Array(10)].map((x, index) => (
                    <tr key={index} className='bg-white border-b text-xs'>
                      <td colSpan='6' className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
                    </tr>
                  ))}
                </>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
