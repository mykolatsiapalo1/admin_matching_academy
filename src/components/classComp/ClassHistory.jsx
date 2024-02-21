import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

export default function ClassHistory() {
  const [classHistory, setClassHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchComments = async () => {
    setIsLoading(true)
    try {
      // Create a query to filter comments based on the classId
      const q = query(collection(db, 'recurringClass'), where('classId', '==', id));
      const querySnapshot = await getDocs(q);

      // Extract comments data from the query snapshot
      const commentsData = querySnapshot.docs.map(doc => doc.data());

      // Update the state with the fetched comments
      setClassHistory(commentsData);
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
    <div>
      <div className="relative overflow-x-auto my-5">
        <table className="w-full text-sm text-left rtl:text-right bg-white dark:text-gray-400 overflow-x-auto">
          <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
            <tr className="font-medium">
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
                recurring
              </th>
              <th className="px-6 py-3">
                status
              </th>

            </tr>
          </thead>
          <tbody>
            {
              !isLoading ? (
                classHistory?.length > 0 ? (
                  classHistory.map((x, index) => (
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
                      <th colSpan='8' scope='row' className='px-6 py-4 whitespace-nowrap'>
                        No Class History Found!!
                      </th>
                    </tr>
                  )
              )
                :
                <>
                  {[...Array(10)].map((x, index) => (
                    <tr key={index} className='bg-white border-b text-xs'>
                      <td colSpan='8' className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
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
