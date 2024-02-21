import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useParams } from 'react-router-dom';

export default function StudentOnboarding() {
  const [studentData, setStudentData] = useState(null);
  const [studentInterests, setStudentInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const fetchStudentData = async (db, classId) => {
    const docRef = doc(db, "users", classId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null
    }
  };

  // Function to fetch a student's vouchers
  const fetchStudentInterests = async (db, studentId) => {
    const q = query(collection(db, "services"), where("id", "in", studentId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  };

  const fetchData = async () => {
    setIsLoading(true)
    const classInfo = await fetchStudentData(db, id);
    setStudentData(classInfo)
    if (classInfo && classInfo.interests) {
      const servicesData = await fetchStudentInterests(db, classInfo.interests);
      setStudentInterests(servicesData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className='space-y-4'>
      <div className='space-y-2.5'>
        <h3 className='text-xl font-semibold'>Basic Information</h3>
        <div className='space-y-2.5'>
          <div className='bg-white py-4 px-5'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-lg'>Student First Name?</h4>
              <p className='text-sm font-medium text-gray-450'>{studentData?.firstName}</p>
            </div>
          </div>
          <div className='bg-white py-4 px-5'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-lg'>Students Last Name?</h4>
              <p className='text-sm font-medium text-gray-450'>{studentData?.lastName}</p>
            </div>
          </div>
          <div className='bg-white py-4 px-5'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-lg'>Students Date of Birth?</h4>
              <p className='text-sm font-medium text-gray-450'>{studentData?.dateOfBirth}</p>
            </div>
          </div>
          <div className='bg-white py-4 px-5'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-lg'>Student Phone Number?</h4>
              <p className='text-sm font-medium text-gray-450'>{studentData?.phoneNumber}</p>
            </div>
          </div>
          <div className='bg-white py-4 px-5'>
            <div className='flex items-center justify-between'>
              <h4 className='font-semibold text-lg'>Student Address?</h4>
              <p className='text-sm font-medium text-gray-450'>{studentData?.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='space-y-2.5'>
        <h3 className='text-xl font-semibold'>Interests</h3>
        <div className='bg-white py-4 px-5'>
          {
            !isLoading ?
              studentInterests.length > 0 ?
                studentInterests.map((interest, index) => (
                  <div key={index} className='border border-gray-50 shadow rounded px-4 py-1 leading-loose'>
                    <h4 className='font-semibold text-lg'>{interest}</h4>
                  </div>
                ))
                :
                (
                  <div className='border border-gray-50 shadow rounded px-4 py-1 leading-loose'>
                    <h4 className='font-semibold text-lg'>No Interests Found!</h4>
                  </div>
                )
              :
              (
                <div className='border border-gray-50  shadow rounded px-4 py-1 leading-loose'>
                  <h4 className='font-semibold text-lg bg-gray-300 animate-pulse duration-150 max-w-xs w-full h-5'></h4>
                </div>
              )
          }
        </div>
      </div>
      <div className='space-y-2.5'>
        <h3 className='text-xl font-semibold'>Questions</h3>
        <div className='bg-white py-4 px-5'>
          <div className='flex items-center justify-between'>
            <h4 className='font-semibold text-lg'>Student First Name?</h4>
            <p className='text-sm font-medium text-gray-450'>Kevin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
