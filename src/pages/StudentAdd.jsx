import React, { useState } from 'react'
import Header from '../layout/partials/header'
import StudentDrop from '../components/studentComp/StudentDrop'
import randomstring from 'crypto-random-string';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { FieldValue, collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';

const people = [
  { name: 'Active' },
  { name: 'Inactive' }
]

export default function StudentAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(people[0])
  const [addStudent, setAddStudent] = useState({
    firstName: null,
    lastName: null,
    // displayName: null,
    email: null,
    phoneNumber: null,
    status: selected.name
  });

  const handleChange = (e) => {
    setAddStudent({ ...addStudent, [e.target.name]: e.target.value })
  }

  const auth = getAuth();

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();
    const options = {
      length: 12, // Adjust the length as needed
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*', // Include the characters you want
    };

    // Generate the random password
    const password = randomstring(options);
    const data = {
      // address: '',
      // dateOfbirth: '',
      // deviceToken: '',
      // gender: '',
      isAuthAsStudent: true,
      pendingPayment: 0.0,
      // profileImage: '',
      // onBoardingInfoId: '',
      createdAt: serverTimestamp(),
      // services: '',
      isStudentCompleteOnBoardFlow: false,
      ...addStudent
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        addStudent.email,
        password // You need to define 'password' in your state or as part of the student data
      );

      // Get the UID from the userCredential
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
      const studentDocRef = doc(studentsCollectionRef, uid);
      batch.set(studentDocRef, updatedData);

      // Commit the batch to Firestore
      await batch.commit();

      // Send email to the student
      emailjs.send('service_rmlxblp', 'template_6t6739w', { firstName: addStudent.firstName, email: addStudent.email, password, lastName: addStudent.lastName }, '6_YQpkbQoojcaSFjN')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

      // Success: Student added to Firebase Authentication, Storage, and Firestore
      console.log("Student added successfully!");

      setMessage("Student Added Successfully!")
      toast.success("Student added successfully!")
      setIsLoading(false)
    } catch (error) {
      // Handle any errors here
      console.error("Error adding student:", error.message);
      setError(error.message)
      toast.error(error.message)
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header header={'add student'} link={'/students'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto p-4 xl:px-8 space-y-4 mb-8'>
        <div>
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
          <form onSubmit={handleSubmit}>
            <div className='bg-white px-5 py-8 space-y-5'>
              {/* <div className="flex items-center w-full">
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
            </div> */}

              <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-7'>
                <div>
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">First name</label>
                  <input
                    type="text"
                    id="first_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Martin"
                    name='firstName'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">last name</label>
                  <input
                    type="text"
                    id="last_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Thomas"
                    name='lastName'
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div>
                  <label htmlFor="display_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">display name</label>
                  <input
                    type="text"
                    id="display_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Martin Thomas"
                    name='displayName'
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">email address</label>
                  <input
                    type="email"
                    id="email"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Martintho23@gmail.com"
                    name='email'
                    autoComplete='none'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNo" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">phone number</label>
                  <input
                    type="number"
                    id="phoneNo"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+7575676587"
                    name='phoneNumber'
                    autoComplete='none'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <p className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">status</p>
                  <StudentDrop selected={selected} setSelected={setSelected} people={people} />
                </div>
              </div>
              {isLoading ?
                <p className='flex items-center gap-8'>
                  Submiting
                  <span className="loader"></span>
                </p>
                :
                <div className='flex flex-wrap gap-4 items-center'>
                  <button type='submit' className='font-medium bg-green-150 px-9 rounded py-2.5 text-white'>Submit</button>
                  <button type='reset' className='font-medium px-9 rounded py-2.5 border'>Cancel</button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
