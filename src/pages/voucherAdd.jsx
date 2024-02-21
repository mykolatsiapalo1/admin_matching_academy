import React, { useEffect } from 'react'
import Header from '../layout/partials/header'
import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { IoArrowBack, IoCheckmark, IoClose } from 'react-icons/io5';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import { collection, where, query, getDocs, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

const people = [
  { id: 1, name: 'Physical Training' },
  { id: 2, name: 'Tennis Training' },
  { id: 3, name: 'Service Name' },
  { id: 4, name: 'Service Name 1' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

export default function VoucherAdd() {
  const [selected, setSelected] = useState();
  const [totalServices, setTotalServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [isQuery, setIsQuery] = useState('');
  const [addVoucher, setAddVoucher] = useState(
    {
      isActive: true,
      numberOfClasses: null,
      discount: null,
      service: null
    }
  )

  const filteredPeople =
    isQuery === ''
      ? totalServices
      : totalServices.filter((person) =>
        person.serviceName
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(isQuery.toLowerCase().replace(/\s+/g, ''))
      )

  const handleChange = (e) => {
    setAddVoucher({ ...addVoucher, [e.target.name]: e.target.value })
  }

  const getAllServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollectionRef = collection(db, 'services');
      const q = query(servicesCollectionRef, where("status", "==", "active"));

      const querySnapshot = await getDocs(q);

      let services = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt.toDate() });
      });
      setSelected(services[0])
      setTotalServices(services);
      setIsLoading(false);
    } catch (e) {
      console.error('Error getting services: ', e);
      setError(e.message);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      createdAt: serverTimestamp(),
      ...addVoucher
    }
    console.log(data)
    try {
      const batch = writeBatch(db);

      // Step 1: Create a reference for a new service document
      const serviceRef = doc(collection(db, "vouchersRule"));

      // Step 2: Set the initial data on this document reference
      batch.set(serviceRef, data);

      // Step 3: Update the document with its own ID
      batch.update(serviceRef, {
        docId: serviceRef.id
      });

      // Step 4: Commit the batch
      await batch.commit();

      setMessage("Voucher Rule added.");
      setError('')
      toast.info('Voucher Rule added successfuly!!');
      setIsLoading(false);
      console.log("Service added with ID: ", serviceRef.id);
    } catch (e) {
      setError(e.message);
      setIsLoading(false)
      setMessage('')
      console.error("Error adding service: ", e);
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllServices();
    }, 500);

    return () => clearTimeout(timerId);
  }, []);


  return (
    <div>
      <Header header={'create voucher'} link={'/vouchers'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto p-4 xl:px-8'>
        <div>
          {error &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
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
            <div className='bg-white px-5 py-8 space-y-9'>
              <div className='grid md:grid-cols-2 gap-4 xl:gap-7'>
                <div>
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">Service Name</label>
                  <Combobox id="Select Service" value={selected} onChange={e => { setSelected(e.serviceName); setAddVoucher({ ...addVoucher, service: e.id }); }}>
                    <div className="relative">
                      <div className="relative w-full cursor-default overflow-hidden rounded border border-green-350 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 outline-none border pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={selected}
                          onChange={(event) => setIsQuery(event.target.value)}
                          placeholder='Select Service'
                          required
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
                        afterLeave={() => setIsQuery('')}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {filteredPeople.length === 0 && isQuery !== '' ? (
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
                                      {person.serviceName}
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
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">Discount*</label>
                  <input
                    type="text"
                    id="first_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Thomas"
                    name='discount'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">How many classes</label>
                  <input
                    type="number"
                    min={1}
                    id="first_name"
                    className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Martin Thomas "
                    name='numberOfClasses'
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">email address</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Martintho23@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">phone number</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+75756765875678"
                  required
                />
              </div>
              <div>
                <label htmlFor="first_name" className="block mb-2 font-semibold text-gray-950 dark:text-white capitalize">status</label>
                <input
                  type="text"
                  id="first_name"
                  className=" border text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="On Duty"
                  required
                />
              </div> */}
              </div>
              <div>
                {!isLoading ?
                  <button type='submit' className='bg-green-150 text-white font-semibold py-2.5 px-9 rounded-md'>Submit</button>
                  :
                  <button disabled className='bg-green-150 text-white font-semibold py-2.5 px-9 rounded-md disabled:bg-green-150/30 disabled:animate-pulse'>Loading...</button>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
