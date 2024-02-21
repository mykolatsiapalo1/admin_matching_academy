import { Dialog, Transition } from '@headlessui/react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Fragment, useEffect, useState } from 'react'
import { IoCheckmark, IoClose, IoCloseOutline } from 'react-icons/io5'
import { db } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify';
import { Listbox } from '@headlessui/react'
import { HiOutlineChevronUpDown } from 'react-icons/hi2'

export default function TeacherServiceEdit({ isOpen, setIsOpen, teacherData, setTeacherData, teacherServices, setTeacherServices, teacherId, setRender }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const [totalServices, setTotalServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null)
  const [teacherUpdate, setTeacherUpdate] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null
  })

  function closeModal() {
    setIsOpen(false)
  }

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

  useEffect(() => {
    getAllServices();
  }, [])

  const handleChange = (e) => {
    console.log(e.serviceName);
    setSelected(e.serviceName);
    setTeacherServices(prevServices => {
      // Check if the service already exists based on docId
      const exists = prevServices.some(service => service.docId === e.docId);

      // If it doesn't exist, add it to the state
      if (!exists) {
        return [...prevServices, e];
      }

      // If it exists, just return the previous state
      return prevServices;
    })



  }

  const removeService = (serviceObject) => {
    setTeacherServices(prevServices => prevServices.filter(service => service.docId !== serviceObject.docId));
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const serviceIds = teacherServices.map(service => service.docId);
    setTeacherData({ ...teacherData, services: serviceIds });
    const data = {
      services: serviceIds
    }
    const docId = teacherId;

    if (!docId) {
      console.error("No document ID found for the teacher");
      setMessage("No document ID found for the teacher")
      return;
    }

    try {
      const docRef = doc(db, "users", docId); // Make sure 'db' is your Firestore instance
      await updateDoc(docRef, data);
      toast.success("Teacher details updated successfully")
      console.log("Teacher details updated successfully");
      setRender(pre => pre + 1)
      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating teacher details:", error);
      setError('Error updating teacher details:', error.message)
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto bg-white p-6 md:px-9 md:py-7 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 flex items-center justify-between "
                  >
                    Update Teacher Services
                    <div onClick={closeModal} className='w-7 h-7 cursor-pointer rounded-full bg-gray-100 flex items-center justify-center'>
                      <IoClose />
                    </div>
                  </Dialog.Title>
                  <form onSubmit={handleOnSubmit}>
                    <div className="mt-6">
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

                      <div className='my-5'>

                        {/* some have duty coding */}
                        <Listbox value={selected} onChange={e => handleChange(e)}>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">{selected ? selected : 'Select Service'}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiOutlineChevronUpDown
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 z-50 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {
                                  !isLoading ?
                                    totalServices.length > 0 ?
                                      (
                                        totalServices.map((person, personIdx) => (
                                          <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                              }`
                                            }
                                            value={person}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                  {person.serviceName}
                                                </span>
                                                {selected ? (
                                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <IoCheckmark className="h-5 w-5" aria-hidden="true" />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))
                                      )
                                      :
                                      <option >No service found!</option>
                                    :
                                    <option>Loading...</option>
                                }
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                        {/* end of haeavy duty coding */}
                        {/* <select onChange={handleChange} className="border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                          {
                            !isLoading ?
                              totalServices.length > 0 ?
                                (
                                  totalServices.map((service, index) => (
                                    <option key={index} value={service.id} selected>{service.serviceName}</option>
                                  ))
                                )
                                :
                                <option >No service found!</option>
                              :
                              <option>Loading...</option>
                          }
                        </select> */}
                      </div>

                      <div className='space-y-4'>
                        {teacherServices && teacherServices.map((service, index) => (
                          <div key={index} className="flex items-center justify-between py-2 px-5 rounded-md border space-x-5">
                            <label htmlFor="default-checkbox2" className="ms-2 font-semibold">{service.serviceName}</label>
                            <button className='rounded-full bg-gray-100 p-0.5' onClick={e => removeService(service)}><IoCloseOutline className='h-5 w-5 ' /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-5">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-green-150 px-8 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-gray-400 px-8 py-2 text-sm font-medium text-white hover:bg-green-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer />
    </>
  )
}
