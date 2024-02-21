import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';

export default function ClassStudents() {
  const [totalStudents, setTotalStudents] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { id } = useParams();

  // Your existing function to fetch class data
  const fetchClassData = async (db, classId) => {
    const docRef = doc(db, "classes", classId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };

  // New function to fetch student data
  const fetchStudentsData = async (db, studentIds) => {
    const students = [];
    // console.log(studentIds)
    for (const studentId of studentIds) {
      const studentRef = doc(db, "users", studentId.studentId);
      const studentSnap = await getDoc(studentRef);
      if (studentSnap.exists()) {
        students.push({ id: studentSnap.id, ...studentSnap.data() });
      }
    }

    return students;
  };

  const loadClassAndStudents = async () => {
    setIsLoading(true)
    const classData = await fetchClassData(db, id);
    // console.log(classData)
    if (classData && classData.students) {
      const studentsData = await fetchStudentsData(db, classData.students);
      setTotalStudents(studentsData)
      setIsLoading(false);
      // console.log("Students:", studentsData);
    } else {
      setIsLoading(false);
      console.log("No class data found or no students in class");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadClassAndStudents()
  }, [])

  return (
    <div>
      <div className='bg-white'>
        <div className="flex flex-wrap justify-between items-center bg-white p-5">
          <h1 className="font-semibold">Student Lists</h1>
        </div>
        <div className='relative overflow-auto'>
          <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 overflow-x-auto">
            <thead className="text-xs text-[#4A4A4A] uppercase border-b-4 border-gray-850 bg-gray-[#F1F1F1] dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
              <tr className="font-medium">
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  Student name
                </th>
                <th className="px-6 py-3">
                  email address
                </th>
                <th className="px-6 py-3">
                  phone number
                </th>
                <th className="px-6 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {
                !isLoading ? (
                  totalStudents?.length > 0 ? (
                    totalStudents.map((x, index) => (
                      <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                        <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black dark:text-white dark:border-gray-550">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4 dark:border-gray-550">
                          <div className="flex items-center gap-1.5">
                            <img className='w-5 h-5 rounded-full object-cover' src={x.profileImage || 'https://images.pexels.com/photos/4236828/pexels-photo-4236828.jpeg?auto=compress&cs=tinysrgb&w=600'} alt="verify" />
                            <p>{x.firstName} {x.lastName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {x.email}
                        </td>
                        <td className="px-6 py-4">
                          {x.phoneNumber}
                        </td>
                        <td className="px-6 py-4">
                          <span className='text-blue-500 bg-blue-500 bg-opacity-5 border border-blue-500 rounded-full px-4 py-1'>View</span>
                        </td>
                      </tr>
                    ))
                  )
                    :
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
    </div>
  )
}
