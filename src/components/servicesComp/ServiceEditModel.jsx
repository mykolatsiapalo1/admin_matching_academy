import { Dialog, Transition } from '@headlessui/react'
import { doc, updateDoc } from 'firebase/firestore';
import { Fragment, useState } from 'react'
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';


export default function ServiceEditModel({ isOpen, setIsOpen, selectedService, setRender }) {
  const [serviceName, setServiceName] = useState(selectedService?.serviceName);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState(selectedService?.status);
  function closeModal() {
    setIsOpen(false)
  }
  const updateService = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      console.log(serviceName, serviceStatus)
      if (serviceName && serviceStatus) {
        const serviceRef = doc(db, "services", selectedService.id);

        await updateDoc(serviceRef, {
          serviceName: serviceName,
          status: serviceStatus
        });

        setRender(Math.floor(Math.random() * 10));
        toast.success("Service Updated Successfuly");
        setIsLoading(false);
        closeModal();
      } else {
        setMessage("Please fill all the required fields!");
        setIsLoading(false)
        console.log('in if clause')
      }
    } catch (e) {
      console.error("Error updating service: ", e);
    }
  };

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
                    Edit Service
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={updateService}>
                      <div className='bg-white py-5'>
                        {message &&
                          <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 border border-blue-500/30" role="alert">
                            <span className="font-medium">Info alert!</span> {message}
                          </div>
                        }
                        <div className='grid md:grid-cols-2 gap-4 xl:gap-7'>
                          <div>
                            <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">Service Name <span className='text-green-150'>*</span></label>
                            <input
                              type="text"
                              id="first_name"
                              className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              placeholder="Martin"
                              defaultValue={selectedService?.serviceName}
                              onChange={e => setServiceName(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status <span className='text-green-150'>*</span></label>
                            <select id="countries" onChange={e => console.log(e.target.value)} req className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                              <option value={''} >Select service status</option>
                              <option value={'Active'} >Active</option>
                              <option value={'Inactive'} >Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-4 items-center'>
                        {!isLoading ?
                          <button type='submit' className='font-medium bg-green-150 px-9 w-full rounded py-2.5 text-white'>Submit</button>
                          :
                          <button type='button' disabled className='font-medium bg-green-150 px-9 w-full rounded py-2.5 text-white animate-pulse disabled:bg-opacity-30'>Updating...</button>
                        }
                        <button type='reset' onClick={closeModal} className='font-medium bg-gray-350/30 px-9 w-full rounded py-2.5 text-white'>Close</button>
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
