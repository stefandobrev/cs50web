import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Outlet />
    </>
  );
};
export default MainLayout;
