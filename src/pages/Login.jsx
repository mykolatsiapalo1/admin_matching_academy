import { useRef, useState } from 'react';
import loginimage from '../assets/loginimage.png';
import google from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
        .then((e) => {
          history("/");
        })
        .catch((e) => {
          setError(e.message);
          console.log(e)
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-screen bg-red overflow-hidden'>
      <div className='grid lg:grid-cols-2 h-screen '>
        <div className='h-full'>
          <div className='max-w-screen-sm mx-auto h-full my-20 space-y-5 p-4'>
            <div className='bg-blue-950 h-10 w-10 mx-auto rounded-full'>

              <img className='rounded-full h-10 w-10 object-cover mx-auto' src={google} />
            </div>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='lg:text-4xl font-semibold'>Login Now!</h1>
              <p className='text-center max-w-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            {error && <div className="p-4 mb-4 text-sm font-medium text-red-800 rounded-lg bg-red-200 bg-opacity-25" role="alert">
              {error}
            </div>
            }
            <div className='pt-16'>
              <form onSubmit={handleSubmit}>
                <div className='space-y-5'>
                  <div>
                    <label for="first_name" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Email Address</label>
                    <input type="email" ref={emailRef} id="first_name" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label for="password" className="block mb-2 text-sm lg:text-lg font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" ref={passwordRef} id="password" className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-150 dark:focus:border-green-150" placeholder="************" required />
                  </div>
                  {/* <p className='text-green-150 font-medium text-sm text-right'>Forget password?</p> */}
                  <div className="flex items-center mb-4">
                    <input id="default-checkbox4" type="checkbox" className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 bg-white border-green-150 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full focus:ring-0 before:bg-green-150 before:opacity-0 before:transition-opacity checked:border-green-150 checked:bg-green-150 checked:before:bg-green-150 hover:before:opacity-10" />
                    <label for="default-checkbox4" className="ms-2 text-sm font-medium text-black dark:text-gray-300">Remember me</label>
                  </div>
                  <div>
                    <button type='submit' className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4'>Login</button>
                  </div>
                  {/* <p className='text-sm text-center'>Not registered yet? <span className='text-green-150 font-medium'>Create an Account</span></p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='w-full h-full hidden bg-red-500 lg:block'>
          <div className='relative h-full'>
            <img src={loginimage} alt='login image' className='w-full object-cover h-screen' />
            <div className='absolute top-0 h-full w-full'>
              <div className='h-full w-full flex flex-col justify-end '>
                <div className='rounded-[20px] bg-white py-11 px-10 mb-10 mx-10 text-white font-medium text-2xl backdrop-blur-md bg-opacity-10'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
