import React, { useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RxDownload } from 'react-icons/rx'
import Header from '../layout/partials/header'
import VoucherRules from '../components/voucherComp/VoucherRules';
import VoucherHIstory from '../components/voucherComp/VoucherHIstory';

export default function Vouchers() {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Header header={'vouchers'} />
      <div className='max-w-screen-2xl mx-auto px-4 xl:px-8 space-y-4'>
        <div className='pt-6'>
          <div className='flex border-b items-center gap-4 '>
            <button onClick={e => setActive(0)} className={`text-lg font-semibold cursor-pointer ${active ? 'text-gray-400' : 'text-red-500 border-b-2 border-red-500'} py-2`}>Voucher Rules</button>
            <button onClick={e => setActive(1)} className={`text-lg font-semibold cursor-pointer ${!active ? 'text-gray-400' : 'text-red-500 border-b-2 border-red-500'} py-2`}>Vouchers History</button>
          </div>
        </div>
        {
          active ?
            <>
              <VoucherHIstory />
            </>
            :
            <VoucherRules />
        }
      </div>
    </div>
  )
}
