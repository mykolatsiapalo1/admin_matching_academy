import React, { useEffect, useState } from 'react'
import Header from '../layout/partials/header'
import { collection, doc, getDocs, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import randomstring from 'crypto-random-string';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function TeacherAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [totalServices, setTotalServices] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [addTeacher, setAddTeacher] = useState({
    firstName: null,
    lastName: null,
    // displayName: null,
    email: null,
    phoneNumber: null,
    status: null
  });

  const handleChange = (e) => {
    setAddTeacher({ ...addTeacher, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices(prevSelectedServices => {
      if (prevSelectedServices.includes(serviceId)) {
        // Remove the service ID if it's already in the array
        return prevSelectedServices.filter(id => id !== serviceId);
      } else {
        // Add the service ID to the array
        return [...prevSelectedServices, serviceId];
      }
    });
  };

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollectionRef = collection(db, 'services');
      const q = query(servicesCollectionRef, where("status", "==", "active"));

      const querySnapshot = await getDocs(q);

      let services = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate() });
      });

      setTotalServices(services);
      setIsLoading(false);
    } catch (e) {
      console.error('Error getting services: ', e);
      setError(e.message);
      setIsLoading(false);
    }
  };

  const auth = getAuth();

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();
    if (addTeacher.status) {
      if (selectedServices.length > 0) {
        const options = {
          length: 20, // Adjust the length as needed
          characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*', // Include the characters you want
        };

        // Generate the random password
        const password = randomstring(options);
        const data = {
          // address: '',
          // dateOfbirth: '',
          // deviceToken: '',
          // gender: '',
          isAuthAsStudent: false,
          // profileImage: '',
          // onBoardingInfo: '',
          createdAt: serverTimestamp(),
          services: selectedServices,
          ...addTeacher
        }
        console.log(data)
        setError('')
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            addTeacher.email,
            password // You need to define 'password' in your state or as part of the student data
          );

          const uid = userCredential.user.uid;

          // Update your data object to include the UID
          const updatedData = {
            ...data,
            docId: uid  // Add the UID as 'docId' or any field name you prefer
          };

          // Step 3: Create a batch for Firestore operations
          const batch = writeBatch(db);

          // Add the user's data to Firestore
          const studentsCollectionRef = collection(db, "users");
          const studentDocRef = doc(studentsCollectionRef, userCredential.user.uid);
          batch.set(studentDocRef, updatedData);

          // Commit the batch to Firestore
          await batch.commit();

          // Send email to the student
          emailjs.send('service_rmlxblp', 'template_6t6739w', { firstName: addTeacher.firstName, email: addTeacher.email, password, lastName: addTeacher.lastName }, '6_YQpkbQoojcaSFjN')
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });

          // Success: Student added to Firebase Authentication, Storage, and Firestore
          console.log("Teacher added successfully!");

          setMessage("Teacher Added Successfully!")
          toast.success("Student added successfully!")
          setIsLoading(false)
        } catch (error) {
          // Handle any errors here
          console.error("Error adding student:", error.message);
          setError(error.message)
          toast.error(error.message)
          setIsLoading(false);
        }

      } else {
        setError("Please select services!")
        setIsLoading(false);
      }
    } else {
      setError('Please Select Status!');
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllServices();
    }, 500);

    return () => clearTimeout(timerId);
  }, []);

  // console.log(services)
  return (
    <>
      <Header header={"add teacher"} link={'/teachers'} arrow={true} />
      <form onSubmit={handleSubmit}>
        <div className='px-6 space-y-4 max-w-screen-2xl mx-auto'>
          <div className='mt-4'>
            {error &&
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-green-150/30" role="alert">
                <span className="font-medium">Error alert!</span> {error}
              </div>
            }
            {
              message &&
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Success alert!</span> {message}
              </div>
            }
            <div className='bg-white px-5 py-3 border-b'>
              <h2 className='uppercase text-xl font-semibold'>GENERAL INFORMATION</h2>
            </div>
            <div className='bg-white px-5 py-8 space-y-9'>
              {/* <div className='space-y-3'>
              <h3 className='font-semibold'>Upload Profile Image</h3>
              <div className="flex items-center w-full">
                <label for="dropzone-file" className="flex items-center w-full px-6 py-4 border-2 border-green-150 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-wrap items-center gap-5 ">
                    <div>
                      <div className='w-12 h-12 rounded-full bg-green-150 text-white flex items-center justify-center'>
                        <FaPlus className='w-5 h-5' />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Upload Image </p>
                      <p className="text-xs text-green-150 font-medium"><span className='text-gray-400 font-normal'>Drag or Drop a file or </span>Browse</p>
                    </div>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" />
                </label>
              </div>
            </div> */}
              <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-7'>
                <div>
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">First name</label>
                  <input
                    type="text"
                    id="first_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Martin"
                    required
                    name='firstName'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">last name</label>
                  <input
                    type="text"
                    id="last_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Thomas"
                    required
                    name='lastName'
                    onChange={handleChange}
                  />
                </div>
                {/* <div>
                  <label htmlFor="display_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">display name</label>
                  <input
                    type="text"
                    id="display_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Martin Thomas "
                    required
                    name='displayName'
                    onChange={handleChange}
                  />
                </div> */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">email address</label>
                  <input
                    type="email"
                    id="email"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Martintho23@gmail.com"
                    required
                    name='email'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone_number" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">phone number</label>
                  <input
                    type="number"
                    id="phone_number"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="+75756765875678"
                    name='phoneNumber'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">status</label>
                  <select
                    onChange={e => setAddTeacher({ ...addTeacher, status: e.target.value })}
                    id="status"
                    className="border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  >
                    <option value=''>Choose a status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              {/* <div className='space-y-3'>
              <h3 className='font-semibold'>Add Certificate</h3>
              <div className="flex items-center w-full">
                <label for="dropzone-file" className="flex items-center w-full px-6 py-4 border-2 border-green-150 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-wrap items-center gap-5 ">
                    <div>
                      <div className='w-12 h-12 rounded-full bg-green-150 text-white flex items-center justify-center'>
                        <FaPlus className='w-5 h-5' />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Upload Image </p>
                      <p className="text-xs text-green-150 font-medium"><span className='text-gray-400 font-normal'>Drag or Drop a file or </span>Browse</p>
                    </div>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div> */}
            </div>
          </div>
          <div className='px-5 py-3 bg-white space-y-7'>
            <div className='border-b flex items-center justify-between py-3'>
              <h2 className='uppercase text-xl font-semibold'>OFFERED SERVICES</h2>
              {/* <div className="flex items-center">
                <input onChange={e => setIsChecked(!isChecked)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 border border-gray-400 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">Select All</label>
              </div> */}
            </div>
            <div className=''>
              <div className='space-y-2.5'>
                {!isLoading ?
                  totalServices && totalServices.length > 0 ?
                    totalServices.map((service) => (
                      <div key={service.id} className="flex items-center py-4 px-5 rounded-md border space-x-5">
                        <input
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleCheckboxChange(service.id)}
                          type="checkbox"
                          className="w-4 h-4 text-green-150 border accent-green-150 bg-green-150 bg-opacity-5 rounded-lg"
                        />
                        <label htmlFor="default-checkbox2" className="ms-2 font-semibold">{service.serviceName}</label>
                      </div>
                    ))
                    :
                    <p>No Services found</p>
                  :
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className='flex items-center gap-4'>
                      <div className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                }
              </div>
            </div>
          </div>
          <div>
            <button className='px-5 py-2.5 font-semibold bg-green-150 text-white rounded-md'>Add Teacher</button>
          </div>
        </div >
      </form>
      <ToastContainer />
    </>
  )
}
