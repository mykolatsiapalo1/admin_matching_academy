import loginimage from '../assets/signup.png';
import google from '../assets/google.svg';
import { IoCheckmark } from "react-icons/io5";

export default function Signup() {
  return (
    <div className='max-h-screen bg-white overflow-auto'>
      <div className='grid lg:grid-cols-2  '>
        <div className='w-full h-full hidden lg:block'>
          <div className='relative h-full'>
            <img src={loginimage} alt='login image' className='w-full object-cover h-full 2xl:h-screen' />
            <div className='absolute bottom-10 rounded-[20px] bg-white text-white text-xl xl:text-2xl font-medium leading-loose bg-opacity-40 backdrop-blur-md  px-10 py-11 left-10 right-10'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
        <div className=' w-full '>
          <div className='max-w-screen-sm mx-auto 2xl:my-8 p-4'>
            <div className='flex items-center justify-between mb-10'>
              <div className='flex flex-col items-center'>
                <div className='rounded-full w-5 h-5 bg-green-150 text-white flex justify-center items-center'>
                  <IoCheckmark />
                </div>
                <p className='text-green-150 text-xs lg:text-sm'>Create Account</p>
              </div>
              <hr className='border-b-2 basis-1/3' />
              <div className='rounded-full w-5 h-5 bg-gray-150 text-white flex justify-center items-center'></div>
              <hr className=' border-b-2 basis-1/3' />
              <div className='rounded-full w-5 h-5 bg-gray-150 text-white flex justify-center items-center'></div>
            </div>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='text-4xl lg:text-3xl xl:text-4xl font-semibold'>Create Account</h1>
              <p className='text-center max-w-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            <div className='pt-7'>
              <div className='space-y-5'>
                <div>
                  <label for="first_name" className="block mb-2 text-sm xl:text-lg font-medium text-gray-900 dark:text-white">Full Name</label>
                  <input type="text" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="John Doe" required />
                </div>
                <div>
                  <label for="first_name" className="block mb-2 text-sm xl:text-lg font-medium text-gray-900 dark:text-white">Email Address</label>
                  <input type="email" id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="John@mywebworld" required />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm xl:text-lg font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" id="password" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="*******" required />
                </div>
                {/* <p className='text-green-150 font-medium text-sm text-right'>Forget password?</p> */}
                <div className="flex items-center mb-4">
                  <input id="default-checkbox4" type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-white border-green-150 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full focus:ring-0 before:bg-green-150 before:opacity-0 before:transition-opacity checked:border-green-150 checked:bg-green-150 checked:before:bg-green-150 hover:before:opacity-10" />
                  <label for="default-checkbox4" className="ms-2 text-sm font-medium text-black dark:text-gray-300">I accept all the terms & conditions</label>
                </div>
                <button className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4'>Sign up</button>
                <div className='flex items-center justify-between'>
                  <hr className='basis-[39%] border-b-2' />
                  <span className='text-gray-400'>or Sign up with</span>
                  <hr className='basis-[39%] border-b-2' />
                </div>
                <div className='border rounded-full flex items-center justify-center py-[18px] gap-x-4'>
                  <img src={google} alt='google' />
                  <button className='text-xl font-medium'>Sign in with Google</button>
                </div>
                <p className='text-sm  text-center'>Already have an Account? <span className='text-green-150 font-medium'>Login Now</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
