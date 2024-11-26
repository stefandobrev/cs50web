import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import YourProfilePage from './pages/YourProfilePage';
import ExercisePage from './pages/ExercisePage';
import NotFoundPage from './pages/NotFoundPage';

//Other
import AuthWrapper from './components/AuthWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { store } from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/exercises' element={<ExercisePage />} />
        <Route path='/profile' element={<YourProfilePage />} />
        <Route path='/settings' element={<ProfileSettingsPage />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <RouterProvider router={router} />
      </AuthWrapper>
    </Provider>
  );
};

export default App;
