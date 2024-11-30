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
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-800'>{/* Your header content */}</header>
      <nav className='bg-gray-800 shadow-lg sticky top-0 h-20 z-50'>
        <Navbar />
      </nav>
      <main className='flex-grow'>
        {isLoading ? <Spinner loading={isLoading} /> : <Outlet />}
      </main>
      <footer className='bg-gray-800 h-20'>
        <div className='container mx-auto px-4 h-full flex items-center justify-center'>
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
