import { BiDotsHorizontalRounded } from 'react-icons/bi'
import React, { useEffect, useState, useMemo } from 'react';
import { RxDownload } from 'react-icons/rx';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { batch } from 'react-dom';
import ExportExcel from '../ExportExcel';
import { db } from '../../firebase';

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((index) => (
      <tr key={index} className='bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550'>
        <td colSpan='7' className='px-6 py-4 bg-black/20 animate-pulse border-r whitespace-nowrap'></td>
      </tr>
    ))}
  </>
);

export default function VoucherRules() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalServices, setTotalServices] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [render, setRender] = useState(0);

  const getAllVouchersRules = async () => {
    setIsLoading(true);
    try {
      const servicesCollectionRef = collection(db, 'vouchersRule');
      const querySnapshot = await getDocs(servicesCollectionRef);

      let services = [];
      for (const document of querySnapshot.docs) {
        const voucherData = { id: document.id, ...document.data(), createdAt: document.data().createdAt.toDate() };

        // Fetch the corresponding service name
        const serviceRef = doc(db, 'services', voucherData.service);
        const serviceSnapshot = await getDoc(serviceRef);
        if (serviceSnapshot.exists()) {
          // Assuming the service name is stored in the 'name' field
          voucherData.serviceName = serviceSnapshot.data();
        } else {
          voucherData.serviceName = 'Unknown Service';
        }

        services.push(voucherData);
      };

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
      getAllVouchersRules();
    }, 500);

    return () => clearTimeout(timerId);
  }, [debouncedSearchInput, render]);

  const filteredServices = useMemo(() => {
    return totalServices.filter((service) =>
      service?.serviceName?.serviceName.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [totalServices, searchInput]);

  return (
    <div className=''>
      <div>
        {error &&
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-green-150/30" role="alert">
            <span className="font-medium">Error alert!</span> {error}
          </div>
        }
        <div className='bg-white px-4 py-2.5 flex justify-between items-center mt-2'>
          <div>
            {/* <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block outline-none max-w-md w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Voucher Rules"
              required
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div> */}
          </div>
          <div className='flex items-center gap-3'>
            <ExportExcel apiData={totalServices} fileName={'VoucherRules'} />
            <Link to={'/vouchers/add'}>
              <button className='px-4 py-3 bg-green-150 text-white text-xs font-semibold rounded'>+ New Voucher</button>
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 overflow-x-auto">
            <thead className="text-xs text-[#4A4A4A] uppercase border-b bg-white dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
              <tr className="font-medium text-center">
                <th className="px-6 py-3">
                  ID
                </th>
                <th className="px-6 py-3">
                  service name
                </th>
                <th className="px-6 py-3">
                  number of classes
                </th>
                <th className="px-6 py-3">
                  Discount
                </th>
                <th className="px-6 py-3">
                  created at
                </th>
                <th className="px-6 py-3">
                  status
                </th>
                <th className="px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {!isLoading ? (
                filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                      <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black  dark:text-white dark:border-gray-550">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {service.serviceName.serviceName}
                      </td>
                      <td className="px-6 py-4">
                        {service.numberOfClasses}
                      </td>
                      <td className="px-6 py-4 ">
                        {service?.discount}
                      </td>
                      <td className="px-6 py-4 ">
                        {service?.createdAt?.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md"> {service.isActive && 'Active'}</span>
                      </td>
                      <td className="px-6 py-4 ">
                        <BiDotsHorizontalRounded />
                      </td>
                    </tr>
                  ))
                ) :
                  (
                    <tr className='bg-white border-b text-xs'>
                      <th scope='row' className='px-6 py-4 whitespace-nowrap'>
                        No Voucher Rules Found
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
    </div>
  )
}
