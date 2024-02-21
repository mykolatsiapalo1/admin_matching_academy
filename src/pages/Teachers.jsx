import React, { useEffect, useMemo, useState } from 'react'
import Header from '../layout/partials/header'
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ExportExcel from '../components/ExportExcel';

export default function Teachers() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totatTeachers, setTotalTeachers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState(0);

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const usersCollectionRef = collection(db, "users");

      // Create a query to filter users with isAuthAsStudent equal to true
      const q = query(usersCollectionRef, where("isAuthAsStudent", "==", false));

      // Execute the query and get the documents
      const querySnapshot = await getDocs(q);

      // Iterate through the documents and process them
      const users = [];
      for (const doc of querySnapshot.docs) {
        const userData = { id: doc.id, ...doc.data() };
        users.push(userData);
      }

      setTotalTeachers(users);
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
    return totatTeachers.filter((service) =>
      service.firstName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [totatTeachers, searchInput]);

  return (
    <>
      <Header header={"teachers"} />
      <div className='px-6 py-2 max-w-screen-2xl mx-auto'>
        <div className='bg-white px-4 py-2.5 flex justify-between items-center'>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block max-w-md w-full outline-none px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search teacher..."
              required
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <ExportExcel apiData={totatTeachers} fileName={'Teachers'} />
            <Link to='/teachers/add'>
              <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Teacher</button>
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
                  email address
                </th>
                <th className="px-6 py-3">
                  phone number
                </th>
                <th className="px-6 py-3">
                  services
                </th>
                <th className="px-6 py-3">
                  status
                </th>
                <th className="px-6 py-3">
                  created at
                </th>
                <th className="px-6 py-3">
                  action
                </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {!isLoading ? (
                filteredStudents.length > 0 ? (
                  filteredStudents.map((service, index) => (
                    <tr key={index} className="bg-white border-b text-xs ">
                      <th scope="row" className="px-6 py-4  text-xs font-medium text-black">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <img className='w-6 h-6 rounded-full object-cover' src={service.profileImage || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'} alt="verify" />
                          <p>{service.firstName} {service.lastName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {service.email}
                      </td>
                      <td className="px-6 py-4">
                        {service.phoneNumber}
                      </td>
                      <td className="px-6 py-4">
                        {service?.services?.length}
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">{service.status}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        {service?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' }) || '12/12/212'}
                      </td>
                      <td className="px-6 py-4 ">
                        <Link to={`/teachers/view/${service.id}`}>
                          <span className='text-xs font-semibold px-5 py-1 rounded-full border border-blue-400 border-opacity-30 bg-blue-500 bg-opacity-5 text-blue-900'>View</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) :
                  (
                    <tr className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
                      <th scope='row' className='px-6 py-4 bg-gray-100 animate-pulse whitespace-nowrap'>
                        No services Found
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
        {/* <div className='grid grid-cols-4 gap-5 my-5'>
          {
            [...Array(6)].map((x, index) => (
              <div className='bg-white border-t-2 border-green-500 px-3 py-4'>
                <div className='flex items-center jub gap-4'>
                  <div>
                    <div className='w-16 h-16 rounded-lg overflow-hidden'>
                      <img className='rounded-lg object-cover' src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' />
                    </div>
                  </div>
                  <div className='flex justify-between w-full'>
                    <div className='space-y-1'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <h1 className='text-sm font-semibold'>Martin Thomas</h1>
                          <p className='text-[10px] text-gray-500'>martintho23@gmail.com</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <p className='text-[10px]'>+57657567666</p>
                        <button className='uppercase px-3 py-1 bg-green-500 bg-opacity-5 text-green-500 text-[8px]'>on duty</button>
                      </div>
                    </div>
                    <HiDotsVertical />
                    <TeacherCardDrop />
                  </div>
                </div>
                <div className='border-y py-2.5 flex items-center justify-evenly gap-4'>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>MON</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>TUE</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>WED</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>THU</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>FRI</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>SAT</p>
                  </div>
                  <div className='space-y-1.5 flex flex-col items-center'>
                    <div className='w-1 h-1 rounded-full bg-green-500'>
                    </div>
                    <p className='text-[8px]'>SUN</p>
                  </div>
                </div>
                <div className='flex justify-between items-center pt-4'>
                  <div>
                    <p className='text-[10px] text-gray-500'>TODAY</p>
                    <h4 className='text-xs font-medium'>09:00AM - 05:00PM</h4>
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500'>BOOKINGS</p>
                    <h4 className='text-xs font-medium'>02</h4>
                  </div>
                </div>
              </div>
            ))
          }
        </div> */}
      </div>
    </>
  )
}
