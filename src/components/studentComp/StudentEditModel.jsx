import { Dialog, Transition } from '@headlessui/react'
import { doc, updateDoc } from 'firebase/firestore';
import { Fragment, useState } from 'react'
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function StudentEditModel({ isOpen, setIsOpen, teacherData, teacherId, setRender }) {

  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const [teacherUpdate, setTeacherUpdate] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    displayName: null
  })

  function closeModal() {
    setIsOpen(false)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const data = {
      firstName: teacherUpdate.firstName || teacherData.firstName,
      lastName: teacherUpdate.lastName || teacherData.lastName,
      email: teacherUpdate.email || teacherData.email,
      phoneNumber: teacherUpdate.phoneNumber || teacherData.phoneNumber,
      displayName: teacherUpdate.displayName || teacherData.displayName
    }
    const docId = teacherId;

    if (!docId) {
      console.error("No document ID found for the student");
      setMessage("No document ID found for the student")
      return;
    }

    try {
      const docRef = doc(db, "users", docId); // Make sure 'db' is your Firestore instance
      await updateDoc(docRef, data);
      toast.success("Student details updated successfully")
      console.log("Student details updated successfully");
      setRender(pre => pre + 1)
      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating student details:", error);
      setError('Error updating student details:', error.message)
    }
  }

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleOnSubmit}>
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
                      <div className='bg-white px-5 py-8 space-y-5'>

                        <div className='grid md:grid-cols-2 gap-4 xl:gap-7'>
                          <div>
                            <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">First name</label>
                            <input
                              type="text"
                              id="first_name"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={teacherData?.firstName}
                              onChange={e => setTeacherUpdate({ ...teacherUpdate, firstName: e.target.value })}
                              placeholder="Martin"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="last_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">last name</label>
                            <input
                              type="text"
                              id="last_name"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={teacherData?.firstName}
                              onChange={e => setTeacherUpdate({ ...teacherUpdate, lastName: e.target.value })}
                              placeholder="Thomas"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="display_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">display name</label>
                            <input
                              type="text"
                              id="display_name"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={teacherData?.firstName}
                              onChange={e => setTeacherUpdate({ ...teacherUpdate, displayName: e.target.value })}
                              placeholder="Martin Thomas "
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">email address</label>
                            <input
                              type="text"
                              id="email"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={teacherData?.email}
                              onChange={e => setTeacherUpdate({ ...teacherUpdate, email: e.target.value })}
                              placeholder="Martintho23@gmail.com"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="phone_number" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">phone number</label>
                            <input
                              type="text"
                              id="phone_number"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              defaultValue={teacherData?.phoneNumber}
                              onChange={e => setTeacherUpdate({ ...teacherUpdate, phoneNumber: e.target.value })}
                              placeholder="+75756765875678"
                              required
                            />
                          </div>
                        </div>
                        <div className='mt-4 flex items-center gap-5'>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-green-150 px-8 py-2 text-base font-medium text-white hover:bg-green-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-gray-400 px-8 py-2 text-base font-medium text-white hover:bg-green-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer />
    </div>
  )
}
