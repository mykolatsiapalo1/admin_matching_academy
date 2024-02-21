import { useState } from 'react';
import loginimage from '../assets/loginimage.png';
import { IoCheckmark } from 'react-icons/io5';
import { FaUser } from "react-icons/fa6";

export default function CompleteProfile() {
  const [profile, setProfile] = useState({
    address: '',
    dateOfBirth: '',
    gender: 'Male',
    insurance: 'None',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className='h-screen bg-white '>
      <div className='grid lg:grid-cols-2 h-full'>
        <div className='h-full '>
          <div className='max-w-screen-sm mx-auto  my-20 space-y-3 p-4'>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-green-150 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-green-150 text-[9px] sm:text-xs lg:text-sm'>Create Account</p>
              </div>
              <hr className='border-b-2 basis-[10%] xl:basis-[18%]' />
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-green-150 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-green-150 text-[9px] sm:text-xs lg:text-sm'>2 step Verification</p>
              </div>
              <hr className=' border-b-2 basis-[10%] xl:basis-[18%]' />
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-green-150 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-green-150 text-[9px] sm:text-xs lg:text-sm'>Profile Completion</p>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='text-4xl lg:text-3xl xl:text-4xl font-semibold'>Complete your Profile</h1>
              <p className='text-center max-w-lg text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            <div className=''>
              <div className='space-y-8'>
                <div className="flex items-center justify-center w-full">
                  <label for="dropzone-file" className='flex flex-col items-center space-y-2.5'>
                    <div className="flex flex-col items-center justify-center h-20 w-20 rounded-full bg-[#F6F6F6]">
                      <FaUser className='w-8 h-8 text-[#7B7B7B]' />
                    </div>
                    <p>Add Profile Picture</p>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                <div className='space-y-5'>
                  <div className='flex flex-wrap gap-4'>
                    <div className='basis-full sm:basis-[49%]'>
                      <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Your Address</label>
                      <input type="text" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="+594736" required />
                    </div>
                    <div className='basis-full sm:basis-[48%]'>
                      <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Date of Birth</label>
                      <input type="date" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="+594736" required />
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-4'>
                    <div className='basis-full sm:basis-[49%]'>
                      <label for="countries" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Gender</label>
                      <select id="countries" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150">
                        <option selected value="US">Male</option>
                        <option value="CA">Female</option>
                        <option value="FR">Other</option>
                      </select>
                    </div>
                    <div className='basis-full sm:basis-[48%]'>
                      <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Insurance</label>
                      <input type="date" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="+594736" required />
                    </div>
                  </div>
                </div>
                <div className='xl:pt-10'>
                  <button className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4 '>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full hidden lg:block'>
          <div className='relative h-full'>
            <img src={loginimage} alt='login image' className='w-full object-cover h-full xl:h-screen' />
            <div className='absolute bottom-10 rounded-[20px] bg-white text-white text-2xl font-medium leading-loose bg-opacity-40 backdrop-blur-md  px-10 py-11 left-10 right-10'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
