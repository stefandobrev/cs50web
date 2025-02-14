import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export const NotFoundPage = () => {
  return (
    <section className='flex h-96 flex-col items-center justify-center text-center'>
      <ExclamationTriangleIcon className='mb-4 h-24 w-24 text-yellow-400' />
      <h1 className='mb-4 text-6xl font-bold'>404 Not Found</h1>
      <p className='mb-5 text-xl'>This page does not exist</p>
      <Link
        to='/'
        className='rounded-md border-2 border-gray-800 bg-[rgba(195,42,42,1)] px-4 py-2 text-white shadow-md hover:border-gray-600 hover:bg-[rgba(170,30,30,1)]'
      >
        Go Back
      </Link>
    </section>
  );
};
