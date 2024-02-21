import { useState } from 'react';
import loginimage from '../assets/loginimage.png';

export default function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  return (
    <div className='h-screen bg-white overflow-hidden'>
      <div className='grid lg:grid-cols-2 h-full place-items-center'>
        <div className=''>
          <div className='max-w-screen-sm mx-auto h-full my-20 space-y-5 p-4'>
            <div className='flex flex-col items-center space-y-3'>
              <h1 className='lg:text-4xl font-semibold'>Verification Code</h1>
              <p className='text-center max-w-lg'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum, lacus</p>
            </div>
            <div className='pt-16'>
              <div className='space-y-28'>
                <div className='space-y-2'>
                  <div className="flex justify-between space-x-2">
                    {code.map((data, index) => {
                      return (
                        <input
                          className="w-[69px] h-[69px] outline-none text-center form-control rounded-xl border border-green-150"
                          type="number"
                          key={index}
                          value={data}
                          maxLength="1"
                          minLength='1'
                          onChange={e => handleChange(e.target, index)}
                          onFocus={e => e.target.select()}
                        />
                      );
                    })}
                  </div>
                  <p className='text-green-150 text-right'>Resend Code?</p>
                </div>
                <div className='space-y-3'>
                  <p className='text-green-150 font-medium text-center'>Change Phone Number </p>
                  <button className='w-full rounded-full text-xl font-semibold text-white bg-green-150 py-4'>Continue</button>
                </div>
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
