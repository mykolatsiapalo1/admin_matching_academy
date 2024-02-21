import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function ClassesDrop({ setIsOpen, linkId }) {
  return (
    <div>
      <Menu as="div" className="relative inline-block w-full sm:w-auto text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm text-gray-950 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BsThreeDots className=' text-gray-250 xl:w-5 xl:h-5' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link to={`/classes/view/${linkId}`}>
                    <button
                      className={`${active ? 'bg-green-150 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      view
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to='/classes'>
                    <button
                      className={`${active ? 'bg-green-150 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (

                  <button
                    onClick={e => setIsOpen(true)}
                    className={`${active ? 'bg-green-150 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Reschedule
                  </button>
                )}
              </Menu.Item>
            </div>
            {/* <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-150 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={e => setIsOpen(true)}
                  >
                    Disable Account
                  </button>
                )}
              </Menu.Item>
            </div> */}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
