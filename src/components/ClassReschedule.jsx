import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoClose } from 'react-icons/io5'

export default function ClassReschedule({ isOpen, setIsOpen }) {

  function closeModal() {
    setIsOpen(false)
  }

  return (
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
                  Reschedule Class
                  <div onClick={closeModal} className='w-7 h-7 cursor-pointer rounded-full bg-gray-100 text-white flex items-center justify-center'>
                    <IoClose />
                  </div>
                </Dialog.Title>
                <div className="mt-6">
                  <div className='space-y-4'>
                    <div>
                      <label htmlFor="first_name" className="font-medium">Rescheduling Date & Time</label>
                      <input
                        type="date"
                        id="first_name"
                        className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={'2023-12-09'}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="font-medium">Location</label>
                      <input
                        type="text"
                        id="location"
                        className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Lorem Ipsum'
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="reason" className="font-medium">Reason of Scheduling</label>
                      <input
                        type="text"
                        id="reason"
                        className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Lorem Ipsum'
                        required
                      />
                    </div>

                  </div>
                </div>

                <div className="mt-4 flex items-center gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-200 px-8 py-2 text-xs font-medium text-gray-400 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-green-150 px-8 py-2 text-xs font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Reschedule
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
