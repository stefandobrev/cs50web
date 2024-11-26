import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const NotFoundPage = () => {
  return (
    <section className='text-center flex flex-col justify-center items-center h-96'>
      <ExclamationTriangleIcon className='text-yellow-400 h-24 w-24 mb-4' />
      <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
      <p className='text-xl mb-5'>This page does not exist</p>
      <Link
        to='/'
        className='text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4'
      >
        Go Back
      </Link>
    </section>
  );
};

export default NotFoundPage;