import loginimage from '../assets/loginimage.png';
import google from '../assets/google.svg'
import { IoCheckmark } from 'react-icons/io5';

export default function TwoStepVerification() {
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
                <p className='text-green-150 text-xs lg:text-sm'>Create Account</p>
              </div>
              <hr className='border-b-2 basis-[10%]' />
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-green-150 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-green-150 text-xs lg:text-sm'>2 step Verification</p>
              </div>
              <hr className=' border-b-2 basis-[10%]' />
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-gray-400 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-gray-400 text-xs lg:text-sm'>Profile Completion</p>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='text-4xl lg:text-3xl xl:text-4xl font-semibold'>Enable two-step verification</h1>
              <p className='text-center max-w-lg text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            <div className=''>
              <div className='space-y-5'>
                <div className='space-y-1.5'>
                  <h2 className='text-[22px] font-semibold'>Security & Policy</h2>
                  <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
                  <p className='text-base font-medium'>We’ll send you a security PIN number to your phone when you sign in.</p>
                </div>
                <div className='lg:pb-5 2xl:pb-10'>
                  <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Phone Number</label>
                  <input type="number" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="+594736" required />
                </div>
                {/* <div>
                  <label for="password" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="email" id="password" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="John" required />
                </div>
                <p className='text-green-150 font-medium text-sm text-right'>Forget password?</p> */}
                {/* <div className="flex items-center mb-4">
                  <input id="default-checkbox4" type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-white border-green-150 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full focus:ring-0 before:bg-green-150 before:opacity-0 before:transition-opacity checked:border-green-150 checked:bg-green-150 checked:before:bg-green-150 hover:before:opacity-10" />
                  <label for="default-checkbox4" className="ms-2 text-sm font-medium text-black dark:text-gray-300">Remember me</label>
                </div> */}
                <button className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4'>Next Step</button>
                <p className='text-lg text-center font-medium text-green-150'>Skip</p>
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
