import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';

// Pages
import {
  ExercisePage,
  HomePage,
  LoginPage,
  ManagePage,
  MuscleGroupExercisePage,
  NotFoundPage,
  ProfileSettingsPage,
  RegistrationPage,
  YourProfilePage,
} from '../pages';

// Route Guards
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />

      <Route element={<PublicRoute />}>
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/exercises' element={<ExercisePage />} />
        <Route path='/exercises/:id' element={<MuscleGroupExercisePage />} />
        <Route path='/manage' element={<ManagePage />} />
        <Route path='/profile' element={<YourProfilePage />} />
        <Route path='/settings' element={<ProfileSettingsPage />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);
