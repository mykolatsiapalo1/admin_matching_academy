import { Dialog, Transition } from '@headlessui/react'
import { doc, updateDoc } from 'firebase/firestore'
import { Fragment, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { db } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify'

export default function TeacherEdit({ isOpen, setIsOpen, teacherData, teacherId, setRender }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const [teacherUpdate, setTeacherUpdate] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null
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
      phoneNumber: teacherUpdate.phoneNumber || teacherData.phoneNumber
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

  // console.log(teacherUpdate)

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden bg-white p-6 md:px-9 md:py-7 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900 flex items-center justify-between "
                  >
                    Edit teacher
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
                      <div className='space-y-4'>
                        <div>
                          <label htmlFor="first_name" className="font-medium">First Name</label>
                          <input
                            type="text"
                            id="first_name"
                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={teacherData?.firstName}
                            onChange={e => setTeacherUpdate({ ...teacherUpdate, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="last_name" className="font-medium">Last Name</label>
                          <input
                            type="text"
                            id="last_name"
                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='Lorem Ipsum'
                            defaultValue={teacherData?.lastName}
                            onChange={e => setTeacherUpdate({ ...teacherUpdate, lastName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="reason" className="font-medium">Email</label>
                          <input
                            type="text"
                            id="reason"
                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='Lorem Ipsum'
                            defaultValue={teacherData?.email}
                            onChange={e => setTeacherUpdate({ ...teacherUpdate, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone_number" className="font-medium">Phone Number</label>
                          <input
                            type="text"
                            id="phone_number"
                            className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='Lorem Ipsum'
                            defaultValue={teacherData?.phoneNumber}
                            onChange={e => setTeacherUpdate({ ...teacherUpdate, phoneNumber: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-5">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-green-150 px-8 py-2 text-xs font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-gray-400 px-8 py-2 text-xs font-medium text-white hover:bg-green-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
