import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoClose } from 'react-icons/io5'

export default function TeacherDelete({ isOpen, setIsOpen }) {
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
                  Delete Teacher
                  <div onClick={closeModal} className='w-7 h-7 cursor-pointer rounded-full bg-gray-100 flex items-center justify-center'>
                    <IoClose />
                  </div>
                </Dialog.Title>
                <div className="mt-6">
                  <div className='space-y-4'>
                    <p>This will block the teacher in the system. Are you share to block the user?</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-green-150 px-8 py-2 text-xs font-medium text-white hover:bg-green-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
