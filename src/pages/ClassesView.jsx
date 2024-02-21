import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ClassesView() {

  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [service, setService] = useState(null);

  const fetchClassData = async (db, classId) => {
    const docRef = doc(db, "classes", classId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null
    }
  };

  const fetchTeacherData = async (db, teacherId) => {
    const serviceRef = doc(db, "users", teacherId);
    const serviceSnap = await getDoc(serviceRef);

    if (serviceSnap.exists()) {
      return serviceSnap.data();
    } else {
      return null
    }
  };
  const fetchServiceData = async (db, serviceId) => {
    const serviceRef = doc(db, "services", serviceId);
    const serviceSnap = await getDoc(serviceRef);

    if (serviceSnap.exists()) {
      return serviceSnap.data();
    } else {
      return null
    }
  };

  const fetchData = async () => {
    const classInfo = await fetchClassData(db, id);
    setClassData(classInfo);

    if (classInfo && classInfo.teacherId) {
      const serviceInfo = await fetchTeacherData(db, classInfo.teacherId);
      setTeacher(serviceInfo);
    }

    if (classInfo && classInfo.serviceId) {
      const serviceInfo = await fetchServiceData(db, classInfo.serviceId);
      setService(serviceInfo);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // console.log(classData, teacher, service)

  return (
    <div className='flex flex-wrap justify-between gap-y-4'>
      <div className='basis-full xl:basis-[74%]'>
        <div className='bg-white w-full py-4 px-6'>
          <div className='flex items-center justify-between border-b py-3'>
            <h4 className='text-2xl font-semibold'>Class Details</h4>
            <button className='capitalize px-6 py-2 text-white bg-green-150 rounded-md text-sm'>Edit class</button>
          </div>
          <div className='space-y-4 py-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h5 className='text-2xl font-semibold'>{service?.serviceName}</h5>
                <p className='w-full '>{classData?.description}</p>
              </div>
              <p className='px-5 py-1.5 bg-green-500 bg-opacity-5 text-green-500 rounded-md uppercase text-sm'>{classData?.status}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-gray-500'>Date</p>
                <p className='font-semibold'>{classData?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' })}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Time</p>
                <p className='font-semibold'>{classData?.startTime} - {classData?.endTime}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Location</p>
                <p className='font-semibold'>{classData?.classLocation}</p>
              </div>
            </div>
            <hr />
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <p className='text-sm text-gray-500'>Class Types</p>
                <p className='font-semibold capitalize'>{classData?.classType}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Number of Students</p>
                <p className='font-semibold'>{classData?.studentIds?.length}</p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Price per Student</p>
                <p className='font-semibold'> ${classData?.pricePerPerson}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='basis-full xl:basis-[25%] bg-white'>
        <div className='bg-white py-3.5 px-4 border-b'>
          <h3 className='text-2xl font-semibold'>Teacher Details</h3>
        </div>
        <div className='bg-white px-4 py-3.5 space-y-5'>
          <img className='w-24 h-24 rounded-2xl mx-auto object-cover' src={teacher?.profileImage || 'https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600'} />
          <div className='text-center space-y-3.5'>
            <div className='space-y-1'>
              <p className='font-semibold'>{teacher?.firstName} {teacher?.lastName}</p>
              <p className='text-xs text-gray-500'>{teacher?.email}</p>
            </div>
            <div>
              <Link to={`/teachers/view/${teacher?.userId}`}>
                <button className='w-full max-w-64 text-sm bg-green-150 text-white rounded-md font-medium py-2'>View Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
