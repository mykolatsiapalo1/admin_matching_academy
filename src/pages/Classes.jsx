import React, { useEffect, useMemo, useState } from 'react'
import Header from '../layout/partials/header'
import { RxDownload } from "react-icons/rx";
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import ClassesDrop from '../components/ClassesDrop';
import ClassReschedule from '../components/ClassReschedule';
import { Link } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ExportExcel from '../components/ExportExcel';


export default function Classes() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalStudents, setTotalStudents] = useState([]);
  const [totalClasses, setTotalClasses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState(0);

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const usersCollectionRef = collection(db, "classes");

      // Execute the query and get the documents
      const querySnapshot = await getDocs(usersCollectionRef);

      // Iterate through the documents and process them
      const classesData = [];
      for (const classDoc of querySnapshot.docs) {
        const classData = classDoc.data();
        // console.log(classData)
        // Fetch service data
        const serviceRef = doc(db, "services", classData.serviceId);
        const serviceSnap = await getDoc(serviceRef);
        const serviceData = serviceSnap.exists() ? serviceSnap.data() : null;

        // Fetch teacher data
        const teacherRef = doc(db, "users", classData.teacherId);
        const teacherSnap = await getDoc(teacherRef);
        const teacherData = teacherSnap.exists() ? teacherSnap.data() : null;

        // // Combine class, service, and teacher data
        classesData.push({
          ...classData,
          service: serviceData,
          teacher: teacherData
        });
      }

      // console.log(classesData)

      setTotalClasses(classesData);
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
    return totalClasses.filter((classdata) =>
      classdata.service?.serviceName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [totalClasses, searchInput]);

  // console.log(totalClasses)

  return (
    <div>
      <Header header={'classes'} />
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
              className="block outline-none max-w-md w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by service"
              required
              defaultValue={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <ExportExcel apiData={totalClasses} fileName={'Classes'} />
            <Link to={'/classes/add'}>
              <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Class</button>
            </Link>
          </div>
        </div>
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
                <th className="px-6 py-3">
                  students
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
                        {service.service.serviceName}
                      </td>
                      <td className="px-6 py-4">
                        {service?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' }) || '12/12/212'}
                      </td>
                      <td className="px-6 py-4">
                        {service.teacher.firstName} {service.teacher.lastName}
                      </td>
                      <td className="px-6 py-4">
                        {service.classLocation}
                      </td>
                      <td className="px-6 py-4">
                        {service.type}
                      </td>
                      <td className="px-6 py-4 uppercase">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">{service.status}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        {service.students?.length}
                      </td>
                      <td className="px-6 py-4 ">
                        <ClassesDrop setIsOpen={setIsOpen} linkId={service.docId} classData={service} />
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
      </div>
      <ClassReschedule isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
