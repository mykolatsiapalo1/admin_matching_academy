import React, { useEffect, useRef } from 'react';
import Header from '../layout/partials/header';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoCheckmark, IoClose } from 'react-icons/io5';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import { Fragment, useState } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { HiOutlinePlus } from 'react-icons/hi';
import Services from '../components/classComp/Services';
import Teachers from '../components/classComp/Teachers';
import Status from '../components/classComp/Status';
import Students from '../components/classComp/Students';
import { collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

// const people = [
//   { id: 1, name: 'Physical Training' },
//   { id: 2, name: 'Tennis Training' },
//   { id: 3, name: 'Service Name' },
//   { id: 4, name: 'Service Name 1' },
//   { id: 5, name: 'Tanya Fox' },
//   { id: 6, name: 'Hellen Schmidt' },
// ]

const libraries = ["places"];

export default function ClassesAdd() {
  // const [selected, setSelected] = useState(people[0]);
  const [totalServices, setTotalServices] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentError, setSelectedStudentError] = useState('');
  const [selectedDaysError, setSelectedDaysError] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedStudentsTotal, setSelectedStudentsTotal] = useState([]);
  const [selectedStudentsTotalIds, setSelectedStudentsTotalIds] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQrxRuqHO7pOjalVnHR7Q27iiPr8tQHoI", // Replace with your API key
    libraries,
  });

  const [classData, setClassData] = useState({
    date: null,
    endDate: null,
    startTime: null,
    endTime: null,
    description: null,
    price: null,
    type: null,
  });

  const [selectedDay, setSelectedDay] = useState([]);

  const day = new Date();

  const handleButtonSubmit = (e) => {
    if (selectedStudent) {
      const isStudentExist = selectedStudentsTotal.some(student => student.id === studentId.id);

      // If the student doesn't exist, add it to the array
      if (!isStudentExist) {

        // Update the state with the new student
        setSelectedStudentsTotal([...selectedStudentsTotal, studentId]);

        setSelectedStudentsTotalIds([...selectedStudentsTotalIds, studentId.id])
        // Clear input fields after adding the student
        setSelectedStudent('');
        setSelectedStudentError('')
      } else {
        // If the student already exists, display an alert or handle it as needed
        setSelectedStudentError('Student already exists!');
      }
    } else {
      setSelectedStudentError('Please select student!!!')
    }
  }

  const handleButtonRemove = (e, x) => {
    console.log(x)
    setSelectedStudentsTotal(selectedStudentsTotal.filter(pre => pre.id !== x.id));
    setSelectedStudentsTotalIds(selectedStudentsTotalIds.filter(pre => pre !== x.id))
    setSelectedStudent(0);
  }

  const handleButtonClick = (day) => {
    // Check if the day is already in the array
    if (selectedDay.includes(day)) {
      // If it exists, remove it from the array
      setSelectedDay(selectedDay.filter((d) => d !== day));
    } else {
      // If it doesn't exist, add it to the array
      setSelectedDay([...selectedDay, day]);
    }
  };

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollectionRef = collection(db, 'services');
      const querySnapshot = await getDocs(servicesCollectionRef);

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

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const usersCollectionRef = collection(db, "users");

      // Execute the query and get the documents
      const querySnapshot = await getDocs(usersCollectionRef);

      // Iterate through the documents and process them
      const users = [];
      for (const doc of querySnapshot.docs) {
        const userData = { id: doc.id, ...doc.data() };
        users.push(userData);
      }

      const teachersData = users.filter((user) => !user.isAuthAsStudent);
      const studentsData = users.filter((user) => user.isAuthAsStudent);


      setTotalTeachers(teachersData);
      setTotalStudents(studentsData);
      setIsLoading(false);
    } catch (e) {
      console.error('Error getting services: ', e);
      setError(e.message);
      setIsLoading(false);
    }
  };

  const [Studentquery, setStudentQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudentsTotalIds.length > 0) {
      if (classData.type === 'single' || classData.type === 'recurring' && selectedDay.length > 0) {
        const priceperstudent = classData.price / selectedStudentsTotalIds.length
        const data = {
          ...classData,
          studentIds: selectedStudentsTotalIds,
          teacherId: teacherId,
          serviceId: serviceId,
          isActive: selectedStatus,
          status: 'upComing',
          classDays: selectedDay.join(", "),
          pricePerPerson: priceperstudent,
          location: {
            latitude: lat,
            longitude: long
          },
          classLocation: places[0].name,
          resechedulling: [],
          recurringClass: '',
          reasonCancellation: '',
          classType: classData.type === 'single' ? 'single' : 'group',
          createdAt: serverTimestamp()
        }
        console.log(data);
        try {
          const batch = writeBatch(db);

          // Step 1: Create a reference for a new service document
          const serviceRef = doc(collection(db, "classes"));

          // Step 2: Set the initial data on this document reference
          batch.set(serviceRef, data);

          // Step 3: Update the document with its own ID
          batch.update(serviceRef, {
            docId: serviceRef.id
          });

          // Step 4: Commit the batch
          await batch.commit();

          setMessage("Class added.");
          toast.info('Class added successfuly!!');
          setError('')
          setSelectedDaysError('')
          setIsLoading(false);
          console.log("Class added with ID: ", serviceRef.id);
        } catch (e) {
          setError(e.message);
          setIsLoading(false)
          console.error("Error adding service: ", e);
        }
      }
      else {
        setSelectedDaysError('Select days!!')
      }
    } else {
      setError('Select Students!')
    }
  }

  useEffect(() => {
    getAllServices();
    getAllUsers();
  }, [])

  // console.log(selectedStudentsTotal, selectedStudentsTotalIds)

  const [places, setPlaces] = useState([]);
  const searchBoxRef = useRef(null);

  const onPlacesChanged = () => {
    const searchedPlaces = searchBoxRef.current.getPlaces();
    setPlaces(searchedPlaces);

    // Extract lat/lng of the first result and log it
    if (searchedPlaces.length > 0) {
      const { lat, lng } = searchedPlaces[0].geometry.location;
      setLat(lat);
      setLong(lng);
      console.log("Latitude:", lat(), "Longitude:", lng());
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Header header={'new class'} link={'/classes'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto p-4 xl:px-8 space-y-1 mb-8'>
        {/* <div className='bg-white px-5 py-4'>
          <Link to='/classes'>
            <div className='flex items-center gap-1'>
              <IoArrowBack className='w-5 h-5' />
              <h1 className='text-xl font-semibold'>New Class</h1>
            </div>
          </Link>
        </div> */}
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
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div>
              <div className='bg-white px-5 py-3 border-b'>
                <h2 className=' text-xl font-semibold'>Basic Information</h2>
              </div>
              <div className='bg-white px-5 py-5 border-b space-y-3'>
                <div className='grid grid-cols-3 gap-x-4 gap-y-5'>
                  <Services people={totalServices} selectedService={selectedService} setSelectedService={setSelectedService} setServiceId={setServiceId} />
                  <Teachers people={totalTeachers} selected={selectedTeacher} setSelected={setSelectedTeacher} setTeacherId={setTeacherId} />
                  <Status selected={selectedStatus} setSelected={setSelectedStatus} />
                  <div>
                    <label htmlFor="date" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Date</label>
                    <input
                      type="date"
                      id="date"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="John"
                      onChange={e => setClassData({ ...classData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="startTime" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="John"
                      onChange={e => setClassData({ ...classData, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="John"
                      onChange={e => setClassData({ ...classData, endTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className=''>
                    <label htmlFor="description" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Class Description</label>
                    <textarea
                      rows={1}
                      type="text"
                      id="description"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="Lorem ipsum Dolor"
                      onChange={e => setClassData({ ...classData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="location" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Location</label>
                      <StandaloneSearchBox
                        onLoad={ref => searchBoxRef.current = ref}
                        onPlacesChanged={onPlacesChanged}
                      >
                        <input
                          type="text"
                          id="location"
                          placeholder="Search places..."
                          className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                          required
                        />
                      </StandaloneSearchBox>
                    </div>
                  </div>
                  {/* <div className=''>
                    <label htmlFor="location" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Location</label>
                    <input
                      type="text"
                      id="location"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="Street 2, Florida, USA"
                      onChange={e => setClassData({ ...classData, location: e.target.value })}
                      required
                    />
                  </div> */}
                  <div className=''>
                    <label htmlFor="price" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Price of The Class</label>
                    <input
                      type="number"
                      id="price"
                      onChange={e => setClassData({ ...classData, price: e.target.value })}
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="$200.00"
                      required
                    />
                  </div>
                  <div className=''>
                    <label htmlFor="type" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Class Type</label>
                    <select
                      required
                      id="type"
                      className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={e => setClassData({ ...classData, type: e.target.value })}
                    >
                      <option value=''>Select Class Type</option>
                      <option value="single">Single</option>
                      <option value="recurring">Recurring</option>
                    </select>
                  </div>
                </div>
                {classData.type === 'recurring' &&
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <p>Repeat on</p>
                      <div className='text-xs flex flex-wrap gap-3'>
                        <div className={`${selectedDay.includes('SU') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('SU')}>
                          <button type='button'>S</button>
                        </div>
                        <div className={`${selectedDay.includes('MO') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('MO')}>
                          <button type='button'>M</button>
                        </div>
                        <div className={`${selectedDay.includes('TU') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('TU')}>
                          <button type='button'>T</button>
                        </div>
                        <div className={`${selectedDay.includes('WE') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('WE')}>
                          <button type='button'>W</button>
                        </div>
                        <div className={`${selectedDay.includes('TH') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('TH')}>
                          <button type='button'>T</button>
                        </div>
                        <div className={`${selectedDay.includes('FR') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('FR')}>
                          <button type='button'>F</button>
                        </div>
                        <div className={`${selectedDay.includes('SA') ? 'bg-green-450 text-white' : 'bg-gray-100 text-gray-600'} w-7 h-7 flex items-center justify-center rounded-full font-medium`} onClick={e => handleButtonClick('SA')}>
                          <button type='button'>S</button>
                        </div>
                      </div>
                    </div>
                    <p className='text-xs text-red-500 font-medium'>{selectedDaysError}</p>
                    <div className='space-y-2'>
                      <p>Ends</p>
                      <div>
                        <label htmlFor="endDate" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Date</label>
                        <input onChange={e => setClassData({ ...classData, endDate: e.target.value })} type="date" id="endDate" className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="John" required />
                      </div>
                    </div>
                  </div>
                }

              </div>
            </div>
            <div className='flex justify-between items-center px-5'>
              <div>
                <h1 className='text-xl font-semibold'>Students</h1>
              </div>
              <div className='flex items-start gap-3.5'>
                <div>
                  <Students selected={selectedStudent} setSelected={setSelectedStudent} people={totalStudents} query={Studentquery} setQuery={setStudentQuery} setStudentId={setStudentId} />
                  <p className='text-xs text-red-500 font-medium'>{selectedStudentError}</p>
                </div>
                <div>
                  <button type='button' onClick={handleButtonSubmit} className='rounded bg-green-450 text-white p-2.5'>
                    <HiOutlinePlus className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
            <div className='bg-white p-5'>
              {selectedStudentsTotal.length > 0 ?
                selectedStudentsTotal.map((x, index) => (
                  <div key={index} className='flex items-center justify-between border-b py-4'>
                    <div className='flex items-center gap-4'>
                      <img className='w-8 h-8 rounded-full object-cover' src={x.profileImage || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D'} alt='user' />
                      <h2 className='font-semibold'>{x.firstName} {x.lastName}</h2>
                    </div>
                    <button type='button' onClick={e => handleButtonRemove(e, x)} className='text-gray-400'>
                      <IoClose />
                    </button>
                  </div>
                ))
                :
                <>
                  <div>
                    <h2 className='font-semibold'>No Students Selected</h2>
                  </div>
                </>
              }
            </div>
            <div className='flex justify-between items-center px-5'>
              <div>
                <h1 className='text-xl font-semibold'>Price Breakdown</h1>
              </div>
            </div>
            <div className='bg-white p-5 space-y-3'>
              <div className='flex items-center justify-between text-gray-400'>
                <p>Total Price</p>
                <p>{classData.price || 0}</p>
              </div>
              <div className='border-b border-dashed'></div>
              <div className='flex items-center justify-between '>
                <p>Price Division (Number of Students) </p>
                <p>{classData.price && classData.price / selectedStudentsTotal.length}</p>
              </div>
              {/* <div>
                <button type='button' className='px-4 md:px-5 py-2.5 bg-green-150 text-white font-semibold rounded'>Calculate Price Breakdown</button>
              </div> */}
            </div>
            <div>
              <button type='submit' className='px-4 md:px-10 py-2.5 bg-green-150 text-white font-semibold rounded'>Create Class</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
