import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar/Navbar';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const MainLayout = () => {
  const isLoading = useSelector((state) => state.loading.loading);
  const currentYear = new Date().getFullYear();

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='bg-gray-800'>{/* Your header content */}</header>
      <nav className='sticky top-0 z-50 h-20 bg-gray-800 shadow-lg'>
        <Navbar />
      </nav>
      <main className='flex-grow'>
        {isLoading ? (
          <Spinner loading={isLoading} className={'fixed inset-0'} />
        ) : (
          <Outlet />
        )}
      </main>
      <footer className='h-7 bg-gray-800'>
        <div className='container mx-auto flex h-full items-center justify-center px-4'>
          <p className='text-gray-300'>
            © {currentYear} AlishFitness. All rights reserved.
          </p>
        </div>
      </footer>
      <Toast />
    </div>
  );
};

export default MainLayout;
