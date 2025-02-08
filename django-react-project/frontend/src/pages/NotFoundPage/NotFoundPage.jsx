import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export const NotFoundPage = () => {
  return (
    <section className='text-center flex flex-col justify-center items-center h-96'>
      <ExclamationTriangleIcon className='text-yellow-400 h-24 w-24 mb-4' />
      <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
      <p className='text-xl mb-5'>This page does not exist</p>
      <Link
        to='/'
        className='bg-[rgba(195,42,42,1)] hover:bg-[rgba(170,30,30,1)] border-2 border-gray-800 hover:border-gray-600 text-white px-4 py-2 rounded-md shadow-md'
      >
        Go Back
      </Link>
    </section>
  );
};
