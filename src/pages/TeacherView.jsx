import { IoArrowBack } from 'react-icons/io5'
import Header from '../layout/partials/header'
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import userAvatar from '../assets/userAvatar.png'
import TeacherEdit from '../components/teacherComp/TeacherEdit';
import TeacherDelete from '../components/teacherComp/TeacherDelete';
import TeacherServiceEdit from '../components/teacherComp/TeacherServiceEdit';

export default function TeacherView() {
  const [isEditTeacher, setIsEditTeacher] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isService, setIsService] = useState(false);
  const [activeTab, setActiveTAb] = useState(1);
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [services, setServices] = useState([]);
  const [classes, setClasses] = useState([]);
  const [render, setRender] = useState(0);

  // console.log(id);

  const fetchTeacher = async (db, id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      setTeacher(null);
    }
  };

  const fetchServices = async (db, services) => {
    const q = query(collection(db, "services"), where("docId", "in", services));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  };

  const fetchClassesForTeacher = async (db, id) => {
    const q = query(collection(db, "classes"), where("teacherId", "==", id));
    const querySnapshot = await getDocs(q);
    const classesWithServices = await Promise.all(querySnapshot.docs.map(async (classdoc) => {
      const classData = classdoc.data();
      const serviceRef = doc(db, "services", classData.serviceId);
      const serviceSnap = await getDoc(serviceRef);

      return {
        ...classData,
        serviceName: serviceSnap.exists() ? serviceSnap.data().serviceName : null
      };
    }));

    return classesWithServices;
  };


  const fetchData = async () => {
    const teacherData = await fetchTeacher(db, id);
    setTeacher(teacherData);

    if (teacherData && teacherData.services?.length > 0) {
      const servicesData = await fetchServices(db, teacherData.services);
      setServices(servicesData);
    }

    const classesData = await fetchClassesForTeacher(db, id);
    setClasses(classesData);
  };

  useEffect(() => {
    fetchData();
  }, [id, render]);

  // console.log(teacher, services, classes)

  return (
    <>
      <Header header={"Teacher Details"} link={'/teachers'} arrow={true} />
      <div className='px-6 py-2 space-y-4 max-w-screen-2xl mx-auto'>
        <div className='bg-white px-5'>
          <div className='flex flex-wrap items-center gap-4 xl:gap-8 text-lg text-gray-450'>
            <button className={`${activeTab === 1 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(1)}>Teacher profile</button>
            <button className={`${activeTab === 2 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(2)}>services</button>
            <button className={`${activeTab === 3 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(3)}>classes</button>
            {/* <button className={`${activeTab === 4 && 'text-green-150 border-b-2 border-green-150 py-4'} hover:border-b-2 border-green-150 hover:py-4 capitalize`} onClick={e => setActiveTAb(4)}>students</button> */}
          </div>
        </div>
        {activeTab === 1 &&
          <div>
            <div className='bg-white px-5 py-3 border-b flex flex-wrap items-center justify-between'>
              <h2 className='uppercase text-xl font-semibold'>GENERAL INFORMATION</h2>
              <di className='space-x-2'>
                <button className=' text-sm font-semibold px-7 py-2 bg-green-150 bg-opacity-10 text-green-150 rounded-md border border-green-150 border-opacity-30' onClick={e => setIsDelete(!isDelete)}>Delete</button>
                <button className='text-sm font-semibold px-7 py-2 bg-green-400 bg-opacity-10 text-green-500 rounded-md border border-green-500 border-opacity-30' onClick={e => setIsEditTeacher(!isEditTeacher)}>Edit</button>
              </di>
            </div>
            <div className='bg-white px-5 py-8 space-y-5'>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between w-full">
                <div className='flex flex-wrap gap-4'>
                  <div className=''>
                    <img className='w-24 h-24 rounded-md object-cover' src={teacher?.profileImage || userAvatar} />
                  </div>
                  <div className='space-y-1.5'>
                    <div>
                      <h5 className='text-3xl font-semibold'>{teacher?.firstName} {teacher?.lastName}</h5>
                      <p className='text-sm text-gray-600 '>{teacher?.email}</p>
                    </div>
                    <p>{teacher?.phoneNumber}</p>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex sm:justify-end'>
                    <p className='px-5 py-1.5 bg-green-500 bg-opacity-5 text-green-500 rounded-md font-medium uppercase'>{teacher?.status}</p>
                  </div>
                  <div className=' text-sm text-[#434343]'>
                    <p>Member Since {teacher?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* {activeTab === 1 &&
          <div>
            <div className='bg-white px-5 py-3 border-b flex flex-wrap justify-between items-center gap-y-3'>
              <h2 className='uppercase text-xl font-semibold'>Certificates</h2>
              <button className='text-sm font-semibold px-7 py-2 bg-green-400 bg-opacity-10 text-green-500 rounded-md border border-green-500 border-opacity-30'>Edit</button>
            </div>
            <div className='bg-white px-5 py-8 space-y-9'>
              <div className='grid xl:grid-cols-3 gap-4 max-w-screen-xl mx-auto'>
                {[...Array(3)].map((i, index) => (
                  <div key={index} className='bg-white drop-shadow-md px-2 py-2.5 rounded-md'>
                    <div className='flex items-start gap-1.5 '>
                      <div className='w-24 h-24'>
                        <img className='w-full h-full rounded-md object-cover' src='https://images.unsplash.com/photo-1584445584400-1a7cc5de77ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2VydGlmaWNhdGV8ZW58MHx8MHx8fDA%3D' />
                      </div>
                      <div className='truncate w-full space-y-1'>
                        <h6 className='text-sm font-semibold'>Tennis Expert</h6>
                        <div className='flex flex-col items-start text-xs gap-1'>
                          <button className='px-2.5 rounded border py-0.5'>View</button>
                          <button className='px-2.5 rounded border py-0.5'>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        } */}
        {activeTab === 2 &&
          <div className='py-3'>
            <div className='border-b px-5 bg-white flex items-center justify-between py-3'>
              <h2 className='uppercase text-xl font-semibold'>OFFERED SERVICES</h2>
              <div>
                <button onClick={e => setIsService(!isService)} className='px-5 py-2 font-semibold bg-green-150 text-sm text-white rounded-md'>Update Services</button>
              </div>
            </div>
            <div className='bg-white px-5 py-5 space-y-4'>
              <div className='space-y-2.5'>
                {
                  services.length > 0 ?
                    services.map((service) => (
                      <div className="flex items-center py-4 px-5 rounded-md border space-x-5">
                        <label htmlFor="default-checkbox2" className="ms-2 font-semibold">{service?.serviceName}</label>
                      </div>
                    ))
                    :
                    <div className="flex items-center py-4 px-5 rounded-md border space-x-5">
                      <label htmlFor="default-checkbox2" className="ms-2 font-semibold">No services found!</label>
                    </div>
                }
              </div>
            </div>
          </div>
        }
        {
          activeTab === 3 &&
          <div className=''>
            <div className='border-b px-5 bg-white flex items-center justify-between py-3'>
              <h2 className='uppercase text-xl font-semibold'>Classes List</h2>
            </div>
            <div className='border-b bg-white flex items-center justify-between py-3'>
              <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left rtl:text-right bg-white dark:text-gray-400 overflow-x-auto">
                  <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
                    <tr className="font-medium">
                      <th className="px-6 py-3">
                        ID
                      </th>
                      <th className="px-6 py-3">
                        Service
                      </th>
                      <th className="px-6 py-3">
                        Date
                      </th>
                      <th className="px-6 py-3">
                        Teacher
                      </th>
                      <th className="px-6 py-3">
                        type
                      </th>
                      <th className="px-6 py-3">
                        students
                      </th>
                      <th className="px-6 py-3">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      classes.length > 0 ?
                        classes.map((x, index) => (
                          <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                            <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                              {index + 1}
                            </th>
                            <td className="px-6 py-4">
                              {x?.serviceName}
                            </td>
                            <td className="px-6 py-4">
                              {x?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' })}
                            </td>
                            <td className="px-6 py-4 ">
                              <div className="flex items-center gap-1.5">
                                <img className='w-6 h-6 rounded-full object-cover' src={teacher?.profileImage || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'} alt="verify" />
                                <p>{teacher?.firstName} {teacher?.lastName}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 ">
                              {x?.type}
                            </td>
                            <td className="px-6 py-4 ">
                              {x?.students?.length}
                            </td>
                            <td className="px-6 py-4 ">
                              <Link to={'/classes/view'}>
                                <span className='text-blue-500 bg-blue-500 bg-opacity-5 border border-blue-500 rounded-full px-4 py-1'>View</span>
                              </Link>
                            </td>
                          </tr>
                        ))
                        :
                        <tr>
                          <td scope='row'>No class found!</td>
                        </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
        {/* {
          activeTab === 4 &&
          <div className=''>
            <div className='border-b px-5 bg-white flex items-center justify-between py-3'>
              <h2 className='uppercase text-xl font-semibold'>Students List</h2>
            </div>
            <div className='border-b bg-white flex items-center justify-between py-3'>
              <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left rtl:text-right bg-white dark:text-gray-400 overflow-x-auto">
                  <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
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
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [...Array(3)].map((x, index) => (
                        <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                          <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                              <p>Andrew Fergeson</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            andrewfer34@gmail.com
                          </td>
                          <td className="px-6 py-4 ">
                            +1 (546) 4654555 5
                          </td>
                          <td className="px-6 py-4 ">
                            <Link to={'/students/view'}>
                              <span className='text-blue-500 bg-blue-500 bg-opacity-5 border border-blue-500 rounded-full px-4 py-1'>View</span>
                            </Link>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        } */}
      </div>
      <TeacherEdit isOpen={isEditTeacher} setIsOpen={setIsEditTeacher} teacherData={teacher} teacherId={id} setRender={setRender} />
      <TeacherDelete isOpen={isDelete} setIsOpen={setIsDelete} />
      <TeacherServiceEdit isOpen={isService} setIsOpen={setIsService} teacherData={teacher} setTeacherData={setTeacher} teacherServices={services} setTeacherServices={setServices} teacherId={id} setRender={setRender} />
    </>
  )
}
