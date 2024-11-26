import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Toast from '../components/Toast';
import Spinner from '../components/Spinner';

import Navbar from '../components/Navbar';

const MainLayout = () => {
  const loading = useSelector((state) => state.loading.loading);
  return (
    <>
      <Navbar />
      {loading ? <Spinner loading={loading} /> : <Outlet />}
      <Toast />
    </>
  );
};
export default MainLayout;
