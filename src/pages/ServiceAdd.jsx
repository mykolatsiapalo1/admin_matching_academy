import Header from '../layout/partials/header'
import ServiceStatusDrop from '../components/servicesComp/ServiceStatusDrop'
import { useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function ServiceAdd() {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([
    { name: 'active' },
    { name: 'inActive' }
  ]);
  const [selected, setSelected] = useState(people[0]);
  const [serviceName, setServiceName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const batch = writeBatch(db);

      // Step 1: Create a reference for a new service document
      const serviceRef = doc(collection(db, "services"));

      // Step 2: Set the initial data on this document reference
      batch.set(serviceRef, {
        serviceName: serviceName,
        status: selected.name,
        createdAt: new Date() // Optional: to store when the service was created
      });

      // Step 3: Update the document with its own ID
      batch.update(serviceRef, {
        docId: serviceRef.id
      });

      // Step 4: Commit the batch
      await batch.commit();

      setMessage("Service added.");
      toast.info('Service added successfuly!!');
      setLoading(false);
      console.log("Service added with ID: ", serviceRef.id);
    } catch (e) {
      setError(e.message);
      setLoading(false)
      console.error("Error adding service: ", e);
    }
  }

  return (
    <div>
      <Header header={'add new service'} link={'/services'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto p-4 py-4 xl:px-8 space-y-1.5'>
        <div>
          {error &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Error alert!</span> {error}
            </div>
          }
          {
            message &&
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span className="font-medium">Success alert!</span> {message}
            </div>
          }
          <div>
            <div className='bg-white px-5 py-3 border-b'>
              <h2 className=' text-xl font-semibold'>GENERAL INFORMATION</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='bg-white px-5 py-5 border-b space-y-4'>
                <div className='grid md:grid-cols-2 gap-x-4 gap-y-5'>
                  <div>
                    <label htmlFor="Select Service" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Service Name</label>
                    <input
                      type="text"
                      id="Select Service"
                      className=" border border-green-350 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      placeholder="Tennis Training"
                      onChange={e => setServiceName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Select Service" className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">Status</label>
                    <ServiceStatusDrop people={people} selected={selected} setSelected={setSelected} />
                  </div>
                </div>
                {!loading ?
                  <button type='submit' className='bg-green-150 text-white font-semibold py-2.5 px-9 rounded-md'>Submit</button>
                  :
                  <button disabled className='bg-green-150 text-white font-semibold py-2.5 px-9 rounded-md disabled:bg-green-150/30 disabled:animate-pulse'>Loading...</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
