import React, { useEffect, useState } from 'react'
import StudentDropdown from '../StudentDropdown'
import StudentEditModel from './StudentEditModel'
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

export default function StudentProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [studentVouchers, setStudentVouchers] = useState([]);
  const [render, setRender] = useState(0);

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
  const fetchStudentVouchers = async (db, studentId) => {
    const vouchersRef = collection(db, "vouchers");
    const q = query(vouchersRef, where("studentId", "==", studentId));
    const querySnapshot = await getDocs(q);

    const vouchers = [];
    querySnapshot.forEach((doc) => {
      vouchers.push({ id: doc.id, ...doc.data() });
    });

    return vouchers;
  };

  const fetchData = async () => {
    const classInfo = await fetchStudentData(db, id);

    if (classInfo) {
      const vouchers = await fetchStudentVouchers(db, id);
      setStudentVouchers(vouchers)
      setStudentData(classInfo);
      console.log("Vouchers:", vouchers);
    } else {
      console.log("No student data found");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <div className='flex flex-wrap justify-between gap-y-4'>
        <div className='basis-full xl:basis-[74%] space-y-4'>
          <div className='bg-white w-full pb-4 px-6'>
            <div className='flex items-center justify-between border-b py-3'>
              <h4 className='text-2xl font-semibold'>Student Profile</h4>
              <button onClick={e => setIsOpen(!isOpen)} className='capitalize px-6 py-2 text-white bg-green-150 rounded-md text-sm'>Edit profile</button>
            </div>
            <div className='bg-white  py-3.5 space-y-5 '>
              <div className='flex items-center gap-4'>
                <div className=''>
                  <img className='w-24 h-24 rounded-2xl object-cover' src={studentData?.profileImage || 'https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600'} />
                </div>
                <div className='w-full space-y-1'>
                  <div className='flex justify-between w-full items-start'>
                    <div>
                      <h5 className='text-3xl font-semibold'>{studentData?.firstName} {studentData?.lastName}</h5>
                      <p className='text-sm text-gray-600 '>{studentData?.email}</p>
                    </div>
                    <p className='px-5 py-1.5 bg-green-500 bg-opacity-5 text-green-500 rounded-md'>{studentData?.status}</p>
                  </div>
                  <div className='flex items-center  justify-between w-full text-sm text-[#434343]'>
                    <p>{studentData?.phoneNumber}</p>
                    <p>Member Since {studentData?.createdAt.toDate().toLocaleString({ timeZone: 'UTC' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right bg-white overflow-x-auto">
              <thead className="text-sm text-[#4A4A4A] uppercase border-b">
                <tr className="font-semibold text-center">
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
              <tbody className='text-center'>
                {
                  [...Array(3)].map((x, index) => (
                    <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                      <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">

                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        Tennis Training
                      </td>
                      <td className="px-6 py-4">
                        May 27, 2023
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="flex items-center gap-1.5">
                          <img className='w-6 h-6 rounded-full object-cover' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt="verify" />
                          <p>Andrew Fergeson</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 ">
                        Street 2, Florida
                      </td>
                      <td className="px-6 py-4 text-center">
                        -
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">Approved</span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div> */}
        </div>
        <div className='basis-full xl:basis-[25%] space-y-5'>
          <div>
            <div className='bg-white py-3.5 px-4 border-b'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-semibold'>Pending Balance</h3>
                {/* <p className='text-xs text-green-150'>View all</p> */}
              </div>
            </div>
            <div className='bg-white px-4 py-5 space-y-5'>
              <div>
                <h3 className={`text-3xl leading-10 font-semibold ${studentData?.pendingPayment > 0 ? 'text-green-500' : 'text-green-150'} `}>$ {studentData?.pendingPayment}</h3>
                <p className='text-gray-450'>Balance Remaining</p>
              </div>
            </div>
          </div>
          <div>
            <div className='bg-white py-3.5 px-4 border-b'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-semibold'>Active Vouchers</h3>
                {/* <p className='text-xs text-green-150'>View all</p> */}
              </div>
            </div>
            <div className='bg-white px-4 py-5 space-y-5'>
              <div>
                <ol className="relative text-gray-450 border-s border-dashed border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  {studentVouchers?.length > 0 ?
                    studentVouchers.map((voucher, index) => {
                      <li className="mb-6 ms-6">
                        <div className='flex items-center'>
                          <span className="absolute flex items-center justify-center w-3 h-3 bg-green-150 rounded-full -start-1.5  ring-4 ring-white">
                          </span>
                          <div>
                            <h3 className="font-semibold text-lg leading-loose text-black">{voucher?.serviceId.serviceName}</h3>
                            <div className='flex items-center justify-between'>
                              <p className="text-xs">$ {studentVouchers.price}</p>
                              <p className="text-xs">{studentVouchers.remainingClasses}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    })
                    :
                    <li className="mb-6 ms-6">
                      <div className='flex items-center'>
                        <span className="absolute flex items-center justify-center w-3 h-3 bg-green-150 rounded-full -start-1.5  ring-4 ring-white">
                        </span>
                        <div >
                          <h3 className="font-semibold text-lg leading-loose text-black">No active vouchers</h3>
                        </div>
                      </div>
                    </li>
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StudentEditModel isOpen={isOpen} setIsOpen={setIsOpen} teacherData={studentData} teacherId={id} setRender={setRender} />
    </div>
  )
}
