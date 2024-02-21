import loginimage from '../assets/loginimage.png';

export default function ForgetPassword() {
  return (
    <div className='h-screen bg-white overflow-hidden'>
      <div className='grid lg:grid-cols-2 h-full place-items-center'>
        <div className=''>
          <div className='max-w-screen-sm mx-auto h-full my-20 space-y-5 p-4'>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='lg:text-4xl font-semibold'>Forget Password</h1>
              <p className='text-center max-w-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            <div className='pt-16'>
              <div className='space-y-28'>
                <div>
                  <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Email Address</label>
                  <input type="email" id="first_name" className="bg-gray-50 border border-green-150 outline-none text-gray-900 text-sm rounded-full focus:ring-green-150 focus:border-green-150 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="John@mydevworld.com" required />
                </div>
                <button className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4'>Continue</button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full hidden lg:block'>
          <div className='relative h-full'>
            <img src={loginimage} alt='login image' className='w-full object-cover h-screen' />
            <div className='absolute bottom-10 rounded-[20px] bg-white text-white text-2xl font-medium leading-loose bg-opacity-40 backdrop-blur-md  px-10 py-11 left-10 right-10'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
