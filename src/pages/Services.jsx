import React, { useEffect, useState, useMemo } from 'react';
import Header from '../layout/partials/header';
import { RxDownload } from 'react-icons/rx';
import { collection, getDocs } from 'firebase/firestore';
import ServiceAddModule from '../components/ServiceAddModule';
import { Link } from 'react-router-dom';
import ServicesDrop from '../components/servicesComp/ServicesDrop';
import ServiceEditModel from '../components/servicesComp/ServiceEditModel';
import ServiceViewModel from '../components/servicesComp/ServiceViewModel';
import { db } from '../firebase';
import { batch } from 'react-dom';
import ExportExcel from '../components/ExportExcel';

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((index) => (
      <tr key={index} className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
        <td colSpan='5' className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
      </tr>
    ))}
  </>
);

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [totalServices, setTotalServices] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState(0);

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const debouncedSearchInput = useMemo(() => {
    return searchInput;
  }, [searchInput]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      getAllServices();
    }, 500);

    return () => clearTimeout(timerId);
  }, [debouncedSearchInput, render]);

  const filteredServices = useMemo(() => {
    return totalServices.filter((service) =>
      service.serviceName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [totalServices, searchInput]);

  // const handleServicesDrop = (updatedService) => {
  //   batch(() => {
  //     setRender((prevRender) => prevRender + 1);
  //     setIsEditOpen(false);
  //     setSelectedService(updatedService);
  //     setIsViewOpen(true);
  //   });
  // };

  return (
    <div>
      <Header header={'services'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8'>
        <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='block outline-none max-w-md w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search service...'
              required
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className='flex items-center gap-3'>
            <ExportExcel apiData={totalServices} fileName={'Services'} />
            <Link to={'/services/add'}>
              <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Services</button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto my-5">
          <table className="w-full text-sm text-center rtl:text-right bg-white dark:text-gray-400 overflow-x-auto">
            <thead className="text-xs text-[#4A4A4A] uppercase border-b dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
              <tr className="font-medium">
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  service name
                </th>
                <th className="px-6 py-3">
                  created at
                </th>
                <th className="px-6 py-3">
                  status
                </th>
                <th className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                      <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {service.serviceName}
                      </td>
                      <td className="px-6 py-4 ">
                        {service?.createdAt?.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md"> {service.status}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        <ServicesDrop setIsViewOpen={setIsViewOpen} setIsEditOpen={setIsEditOpen} service={service} setSelectedService={setSelectedService} />
                      </td>
                    </tr>
                  ))
                ) :
                  (
                    <tr className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
                      <th scope='row' className='px-6 py-4 bg-gray-100 animate-pulse whitespace-nowrap'>
                        No services Found
                      </th>
                    </tr>
                  )
              )
                :
                <LoadingSkeleton />
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* <ServiceAddModule isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <ServiceEditModel isOpen={isEditOpen} setIsOpen={setIsEditOpen} selectedService={selectedService} setRender={setRender} />
      {/* <ServiceViewModel isOpen={isViewOpen} setIsOpen={setIsViewOpen} /> */}
    </div>
  )
}
