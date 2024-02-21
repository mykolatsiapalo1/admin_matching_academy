import React from 'react'
import Header from '../layout/partials/header'
import { Link } from 'react-router-dom'
import { IoArrowBack, IoCheckmark } from 'react-icons/io5'
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { HiOutlinePlus } from 'react-icons/hi';

const people = [
  { id: 1, name: 'Cash' },
  { id: 2, name: 'Cash' },
]

export default function PaymentPendingView() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
  return (
    <div>
      <Header header={'Payments'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8 space-y-2.5'>
        <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
          <Link to='/classes'>
            <div className='flex items-center gap-1'>
              <IoArrowBack className='w-5 h-5' />
              <h1 className='text-xl font-semibold'>Payment Details</h1>
            </div>
          </Link>
        </div>
        <div className='flex flex-wrap gap-y-5 justify-between'>
          <div className='basis-full md:basis-1/3 '>
            <div className='bg-white'>
              <div className='flex items-center justify-center py-10'>
                <div className='space-y-6'>
                  <img className='w-40 h-40 rounded-full' src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600' />
                  <h1 className='text-2xl font-semibold'>Steve Taylor</h1>
                </div>
              </div>
            </div>

          </div>
          <div className='basis-full md:basis-[66%]'>
            <div className='bg-white px-6 py-3'>
              <div className='space-y-3'>
                <h4 className='text-2xl font-semibold'>Payment Method</h4>
                <div className='space-y-4'>
                  <div className='flex flex-wrap gap-y-3 items-center justify-between'>
                    <div className='w-full max-w-xs'>
                      <Combobox id="Select Service" value={selected} onChange={setSelected}>
                        <div className="relative">
                          <div className="relative w-full cursor-default overflow-hidden rounded border  border-green-350 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                              className="w-full border-none py-2 pl-3 outline-none border pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                              displayValue={(person) => person.name}
                              onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <HiOutlineChevronUpDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                          >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                  Nothing found.
                                </div>
                              ) : (
                                filteredPeople.map((person) => (
                                  <Combobox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                      }`
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                          {person.name}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                              }`}
                                          >
                                            <IoCheckmark className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))
                              )}
                            </Combobox.Options>
                          </Transition>
                        </div>
                      </Combobox>
                    </div>
                    <div>
                      <button className='px-10 py-2.5 bg-green-150 border-2 border-green-150 border-opacity-30 bg-opacity-5 text-green-150 rounded-md'>Marked as Paid</button>
                    </div>
                  </div>
                  <div className='flex flex-wrap items-center justify-between border-b py-3'>
                    <div>
                      <p className='text-sm font-medium text-gray-450'>TYPE OF PAYMENT</p>
                      <h5 className='text-lg font-medium'>Voucher Payment</h5>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-450'>AMOUNT</p>
                      <h5 className='text-lg font-medium'>$100.00</h5>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-450'>DATE & TIME</p>
                      <h5 className='text-lg font-medium'>Thu, Dec 5, 2023  11:12 AM</h5>
                    </div>
                  </div>
                  <div className='space-y-2.5'>
                    <h4 className='text-xl font-semibold'>Classes</h4>
                    <div className='flex items-center justify-between flex-wrap gap-y-4 font-semibold'>
                      <p className=''>Physical Training</p>
                      <p className='text-green-150'>- $100.00</p>
                    </div>
                    <div className='flex items-center justify-between flex-wrap gap-y-4 font-semibold'>
                      <p className=''>Physical Training</p>
                      <p className='text-green-150'>- $100.00</p>
                    </div>
                    <div className='flex items-center justify-between flex-wrap gap-y-4 font-semibold'>
                      <p className=''>Physical Training</p>
                      <p className='text-green-150'>- $100.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
