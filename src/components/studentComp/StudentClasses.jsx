import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useParams } from 'react-router-dom';

export default function StudentClasses() {
  const [totalClasses, setTotalClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // Function to fetch all classes for a specific student
  const fetchClassesForStudent = async (db, studentId) => {
    const classesRef = collection(db, "classes");
    const q = query(classesRef, where("studentIds", "array-contains", studentId));
    const querySnapshot = await getDocs(q);

    const classesData = [];
    for (const classDoc of querySnapshot.docs) {
      classes.push({ id: doc.id, ...doc.data() });
      const classData = classDoc.data();
      const serviceRef = doc(db, "services", classData.serviceId);
      const serviceSnap = await getDoc(serviceRef);
      const serviceData = serviceSnap.exists() ? serviceSnap.data() : null;

      classesData.push({
        ...classData,
        service: serviceData
      });
    };

    return classesData;
  };

  const loadClassesForStudent = async () => {
    setIsLoading(true);
    const classes = await fetchClassesForStudent(db, id);
    setTotalClasses(classes);
    console.log("Classes for the student:", classes);
    setIsLoading(false);
  };

  useEffect(() => {
    loadClassesForStudent();
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
              <th className="px-6 py-3">
                students
              </th>
              <th className="px-6 py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              totalClasses.length > 0 ? (
                totalClasses.map((service, index) => (
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

                    </td>
                  </tr>
                ))
              ) :
                (
                  <tr className='bg-white border-b text-xs'>
                    <th scope='row' className='px-6 py-4 bg-gray-100 whitespace-nowrap'>
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
  )
}
