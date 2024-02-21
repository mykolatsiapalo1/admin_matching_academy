import verify from '../assets/verify.png';
import graph from '../assets/graph.png';
import Header from "../layout/partials/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className='my-5 pl-4 pr-6 md:pr-9 lg:mr-[50px] pb-16 max-w-screen-2xl mx-auto'>
        <div className="space-y-6 overflow-x-auto">
          <div className='flex flex-wrap gap-2 w-full'>
            <div className='basis-full xl:basis-[74%] w-full'>
              <div className="space-y-3.5">
                <div className="flex items-center gap-4">
                  <div className="space-y-1 w-full">
                    <div className="bg-white px-4 py-2">
                      <h1 className="font-semibold">Total Revenue</h1>
                    </div>
                    <div className="bg-white flex justify-between items-end p-4 h-24">
                      <h1 className="text-3xl font-semibold">$ 23,000.00</h1>
                      <p className="text-[10px] rounded-full px-2.5 py-1 bg-green-500 bg-opacity-5 border border-green-500 text-green-500">View</p>
                    </div>
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="bg-white px-4 py-2">
                      <h1 className="font-semibold">Voucher Renewal</h1>
                    </div>
                    <div className="bg-white flex justify-between items-end p-4 h-24">
                      <h1 className="text-3xl font-semibold">$ 23,000.00</h1>
                      <p className="text-[10px] rounded-full px-2.5 py-1 bg-green-500 bg-opacity-5 border border-green-500 text-green-500">View</p>
                    </div>
                  </div>
                </div>
                <img src={graph} className="w-full object-contain" />
                <div className="relative overflow-x-auto ">
                  <div className="flex justify-between items-center bg-white p-5">
                    <h1 className="font-semibold">Pyments</h1>
                    <button className="text-sm text-gray-400 px-6 py-1.5 border rounded-md">View all {'>>'}</button>
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right  dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-[#4A4A4A] uppercase border-b-4 border-gray-850 bg-gray-[#F1F1F1] dark:bg-bkgdark dark:text-[#BCBCBC] dark:border-[#202020]">
                      <tr className="font-medium">
                        <th className="px-6 py-3">
                          ID
                        </th>
                        <th className="px-6 py-3">
                          BOOKING ID
                        </th>
                        <th className="px-6 py-3">
                          TOKEN
                        </th>
                        <th className="px-6 py-3">
                          CUSTOMER
                        </th>
                        <th className="px-6 py-3">
                          status
                        </th>
                        <th className="px-6 py-3">
                          method
                        </th>
                        <th className="px-6 py-3">
                          date/time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        [...Array(4)].map((x, index) => (
                          <tr key={index} className="bg-white border-b text-xs dark:bg-bkgdark dark:border-gray-550">
                            <th scope="row" className="px-6 py-4 whitespace-nowrap text-xs font-medium text-black border-r dark:text-white dark:border-gray-550">
                              {/* <div className="flex items-center gap-1.5">
                              <img src={verify} alt="verify" />
                              <p>Integration Set up</p>
                            </div> */}
                              {index + 1}
                            </th>
                            <td className="px-6 py-4 border-r dark:border-gray-550">
                              3464365
                            </td>
                            <td className="px-6 py-4 border-r dark:border-gray-550">
                              {/* <span className="font-medium text-[10px] px-5 py-1 bg-green-500 text-green-150 bg-opacity-5 rounded-full">closed</span> */}
                              #DF5464
                            </td>
                            <td className="px-6 py-4 border-r dark:border-gray-550">
                              <div className="flex items-center gap-1.5">
                                <img src={verify} alt="verify" />
                                <p>Andrew Fergeson</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 ">
                              <span className="font-medium text-[10px] uppercase px-5 py-1 bg-green-500 text-green-500 bg-opacity-5 rounded-md">Approved</span>
                            </td>
                            <td className="px-6 py-4 ">
                              <p className="text-blue-600 font-bold">stripe</p>
                            </td>
                            <td className="px-6 py-4 ">
                              Oct 23, 2023
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='basis-full xl:basis-1/4 space-y-4'>
              <div>
                <div className='flex items-center justify-between bg-white p-4 mb-1.5 dark:bg-bkgdark dark:text-white'>
                  <div>
                    <h4 className='font-semibold text-base'>
                      Live Class Tracker
                    </h4>
                  </div>
                  <button className="text-[12px] font-semibold p-1.5 rounded text-green-150">See all</button>
                </div>
                <div className="bg-white p-4 space-y-3 dark:bg-bkgdark dark:text-white">
                  <div className="space-y-3.5">
                    <div className="rounded-[10px] border p-4 space-y-2">
                      <div className="space-y-1 flex gap-4">
                        <div className="bg-red-600 rounded-lg text-white px-4 py-1.5">
                          <p className="text-sm font-bold">25</p>
                          <p className="text-[10px] font-bold">Jun</p>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Sports Lesson</h3>
                            <p className="bg-green-500 text-green-500 text-[8px] px-2.5 py-0.5 rounded-full bg-opacity-5">Active</p>
                          </div>
                          <div className="flex items-end gap-3">
                            <div>
                              <p className="text-[8px] m-0">08:00 - 11:00 AM</p>
                            </div>
                            <div>
                              <p className="text-[8px] m-0">Office 2, 2nd floor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[10px] border p-4 space-y-2">
                      <div className="space-y-1 flex gap-4">
                        <div className="bg-red-600 rounded-lg text-white px-4 py-1.5">
                          <p className="text-sm font-bold">25</p>
                          <p className="text-[10px] font-bold">Jun</p>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Sports Lesson</h3>
                            <p className="bg-green-500 text-green-500 text-[8px] px-2.5 py-0.5 rounded-full bg-opacity-5">Active</p>
                          </div>
                          <div className="flex items-end gap-3">
                            <div>
                              <p className="text-[8px] m-0">08:00 - 11:00 AM</p>
                            </div>
                            <div>
                              <p className="text-[8px] m-0">Office 2, 2nd floor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[10px] border p-4 space-y-2">
                      <div className="space-y-1 flex gap-4">
                        <div className="bg-red-600 rounded-lg text-white px-4 py-1.5">
                          <p className="text-sm font-bold">25</p>
                          <p className="text-[10px] font-bold">Jun</p>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Sports Lesson</h3>
                            <p className="bg-green-500 text-green-500 text-[8px] px-2.5 py-0.5 rounded-full bg-opacity-5">Active</p>
                          </div>
                          <div className="flex items-end gap-3">
                            <div>
                              <p className="text-[8px] m-0">08:00 - 11:00 AM</p>
                            </div>
                            <div>
                              <p className="text-[8px] m-0">Office 2, 2nd floor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[10px] border p-4 space-y-2">
                      <div className="space-y-1 flex gap-4">
                        <div className="bg-red-600 rounded-lg text-white px-4 py-1.5">
                          <p className="text-sm font-bold">25</p>
                          <p className="text-[10px] font-bold">Jun</p>
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Sports Lesson</h3>
                            <p className="bg-green-500 text-green-500 text-[8px] px-2.5 py-0.5 rounded-full bg-opacity-5">Active</p>
                          </div>
                          <div className="flex items-end gap-3">
                            <div>
                              <p className="text-[8px] m-0">08:00 - 11:00 AM</p>
                            </div>
                            <div>
                              <p className="text-[8px] m-0">Office 2, 2nd floor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="rounded-[10px] border p-4 space-y-2">
                  <div className="space-y-1">
                    <div className="text-[10px] flex justify-between">
                      <h5>Appointment date</h5>
                      <BsThreeDotsVertical />
                    </div>
                    <div className="flex items-center text-[9px] font-medium">
                      <IoMdTime />
                      <p>Wed Jun 20</p>
                      <LuDot />
                      <p>8:00-8:30 AM</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-1">
                      <img className="w-9 h-9 rounded-full object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                      <div>
                        <h5 className="text-xs font-semibold">Dr. Padma Jignesh</h5>
                        <p className="text-[10px] text-gray-500">Orthopedic</p>
                      </div>
                    </div>
                    <div>
                      <button className="uppercase text-[10px] font-medium px-4 py-0.5 bg-green-150 bg-opacity-5 text-green-150 rounded-full">upcoming</button>
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] border p-4 space-y-2">
                  <div className="space-y-1">
                    <div className="text-[10px] flex justify-between">
                      <h5>Appointment date</h5>
                      <BsThreeDotsVertical />
                    </div>
                    <div className="flex items-center text-[9px] font-medium">
                      <IoMdTime />
                      <p>Wed Jun 20</p>
                      <LuDot />
                      <p>8:00-8:30 AM</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-end justify-between">
                    <div className="flex items-center gap-1">
                      <img className="w-9 h-9 rounded-full object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                      <div>
                        <h5 className="text-xs font-semibold">Dr. Padma Jignesh</h5>
                        <p className="text-[10px] text-gray-500">Orthopedic</p>
                      </div>
                    </div>
                    <div>
                      <button className="uppercase text-[10px] font-medium px-4 py-0.5 bg-green-150 bg-opacity-5 text-green-150 rounded-full">upcoming</button>
                    </div>
                  </div>
                </div> */}
                  </div>
                  {/* <div className="flex items-center justify-center gap-1 text-xs mx-auto font-medium w-fit py-2.5 px-6 rounded-full border border-green-150 text-green-150">
                <button >Add appointment </button>
                <IoIosArrowRoundForward />
              </div> */}
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between bg-white p-4 mb-1.5 dark:bg-bkgdark dark:text-white'>
                  <div>
                    <h4 className='font-semibold text-base'>
                      Vouchers Renewal
                      {/* <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-[10px] font-semibold text-white bg-green-150 rounded-full">
                  2
                </span> */}
                    </h4>
                  </div>
                  <button className="text-[10px] font-medium p-1.5 rounded text-green-150">View all</button>
                </div>
                <div className="bg-white p-4 space-y-3 dark:bg-bkgdark dark:text-white">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="h-14 w-14 rounded-full overflow-hidden bg-red-500">
                            <img className=" object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Startup Voucher</h4>
                          <p className="text-[10px] text-gray-500">Jasmeen Taylor paid $200 for startup Voucher</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-green-500 text-green-500 text-[8px] uppercase px-2.5 py-0.5 rounded-full bg-opacity-5">Paid</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="h-14 w-14 rounded-full overflow-hidden bg-red-500">
                            <img className=" object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Startup Voucher</h4>
                          <p className="text-[10px] text-gray-500">Jasmeen Taylor paid $200 for startup Voucher</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-green-500 text-green-500 text-[8px] uppercase px-2.5 py-0.5 rounded-full bg-opacity-5">Paid</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="h-14 w-14 rounded-full overflow-hidden bg-red-500">
                            <img className=" object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Startup Voucher</h4>
                          <p className="text-[10px] text-gray-500">Jasmeen Taylor paid $200 for startup Voucher</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-green-500 text-green-500 text-[8px] uppercase px-2.5 py-0.5 rounded-full bg-opacity-5">Paid</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="h-14 w-14 rounded-full overflow-hidden bg-red-500">
                            <img className=" object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Startup Voucher</h4>
                          <p className="text-[10px] text-gray-500">Jasmeen Taylor paid $200 for startup Voucher</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-green-500 text-green-500 text-[8px] uppercase px-2.5 py-0.5 rounded-full bg-opacity-5">Paid</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div>
                          <div className="h-14 w-14 rounded-full overflow-hidden bg-red-500">
                            <img className=" object-cover" src="https://images.pexels.com/photos/12244376/pexels-photo-12244376.jpeg?auto=compress&cs=tinysrgb&w=600" alt="user" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Startup Voucher</h4>
                          <p className="text-[10px] text-gray-500">Jasmeen Taylor paid $200 for startup Voucher</p>
                        </div>
                      </div>
                      <div>
                        <p className="bg-green-500 text-green-500 text-[8px] uppercase px-2.5 py-0.5 rounded-full bg-opacity-5">Paid</p>
                      </div>
                    </div>
                    <hr />

                  </div>
                  {/* <div className="flex items-center justify-center gap-1 text-xs mx-auto font-medium w-fit py-2.5 px-6 rounded-full border border-green-150 text-green-150">
                <button >Add new messages </button>
                <IoIosArrowRoundForward />
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
