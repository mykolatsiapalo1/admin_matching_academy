import React, { useEffect, useMemo, useState } from 'react'
import Header from '../layout/partials/header'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RxDownload } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import StudentDropdown from '../components/StudentDropdown'

import { db } from '../firebase';
import { batch } from 'react-dom';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import ExportExcel from '../components/ExportExcel'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Students() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalStudents, setTotalStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState(0);

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const usersCollectionRef = collection(db, "users");

      // Create a query to filter users with isAuthAsStudent equal to true
      const q = query(usersCollectionRef, where("isAuthAsStudent", "==", true));

      // Execute the query and get the documents
      const querySnapshot = await getDocs(q);

      // Iterate through the documents and process them
      const users = [];
      for (const doc of querySnapshot.docs) {
        const userData = { id: doc.id, ...doc.data() };
        const paymentsCollectionRef = collection(db, "payments");
        const vouchersCollectionRef = collection(db, "vouchers");

        const paymentsQuery = query(paymentsCollectionRef, where("userId", "==", userData.id));
        const vouchersQuery = query(vouchersCollectionRef, where("userId", "==", userData.id));

        const paymentsSnapshot = await getDocs(paymentsQuery);
        const vouchersSnapshot = await getDocs(vouchersQuery);

        userData.pendingAmount = paymentsSnapshot.docs.map(doc => doc.data()).reduce((acc, curr) => acc + curr.amount, 0);
        userData.activeVouchers = vouchersSnapshot.docs.map(doc => doc.data());

        users.push(userData);
      }

      setTotalStudents(users);
      setIsLoading(false);
    } catch (e) {
      console.error('Error getting services: ', e);
      setError(e.message);
      setIsLoading(false);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const debouncedSearchInput = useMemo(() => {
    return searchInput;
  }, [searchInput]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllServices();
    }, 500);

    return () => clearTimeout(timerId);
  }, [debouncedSearchInput, render]);

  const filteredStudents = useMemo(() => {
    return totalStudents.filter((service) =>
      service.firstName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [totalStudents, searchInput]);

  // console.log(totalStudents[4].createdAt.toDate().toLocaleString({ timeZone: 'UTC' }))

  return (
    <div>
      <Header header={'students'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8'>
        <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block max-w-md w-full outline-none px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search teacher..."
              required
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <ExportExcel apiData={totalStudents} fileName={'Students'} />
            <Link to='/students/add'>
              <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Students</button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto my-5">
          <table className="w-full text-sm text-center rtl:text-right bg-white dark:text-gray-400 overflow-x-auto">
            <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
              <tr className="font-medium">
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  full name
                </th>
                <th className="px-6 py-3">
                  phone number
                </th>
                <th className="px-6 py-3">
                  email address
                </th>
                <th className="px-6 py-3">
                  Act.Vouchers
                </th>
                <th className="px-6 py-3">
                  Pending
                </th>
                <th className="px-6 py-3">
                  registered on
                </th>
                <th className="px-6 py-3">
                  status
                </th>
                <th className="px-6 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                filteredStudents.length > 0 ? (
                  filteredStudents.map((service, index) => (
                    <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                      <th scope="row" className="px-6 py-4  text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <img className='w-6 h-6 rounded-full object-cover' src={service.profileImage || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'} alt="verify" />
                          <p>{service.firstName} {service.lastName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {service.phoneNumber}
                      </td>
                      <td className="px-6 py-4">
                        {service.email}
                      </td>
                      <td className="px-6 py-4">
                        {service?.activeVouchers.length}
                      </td>
                      <td className="px-6 py-4">
                        {service.pendingAmount}
                      </td>
                      <td className="px-6 py-4 ">
                        {service?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' }) || '12/12/212'}
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">{service.status}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        <StudentDropdown studentId={service.id} />
                      </td>
                    </tr>
                  ))
                ) :
                  (
                    <tr className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
                      <th colSpan='9' scope='row' className='px-6 py-4 bg-gray-100 whitespace-nowrap'>
                        No students Found
                      </th>
                    </tr>
                  )
              )
                :
                <>
                  {[...Array(10)].map((x, index) => (
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
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
