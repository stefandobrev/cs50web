import { useState, useEffect } from 'react';
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ExercisePage from './pages/ExercisePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('access_token') !== null
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <MainLayout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route
          path='/login'
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path='/exercises' element={<ExercisePage />} />
          <Route path='/exercises2' element={<ExercisePage />} />
          <Route path='/exercises3' element={<ExercisePage />} />
          <Route path='/exercises4' element={<ExercisePage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
