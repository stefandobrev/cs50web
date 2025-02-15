import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FullBodyMuscleView,
  ToggleableMuscleView,
} from '../../components/muscleviews';

export const ExercisePage = () => {
  const navigate = useNavigate();

  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  const handleMuscleClick = (id) => {
    if (id) navigate(`/exercises/${id}`);
  };

  useState(() => {
    const checkScreenSize = () => {
      setIsMdOrLarger(window.innerWidth >= 768);
    };

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMdOrLarger ? (
        <FullBodyMuscleView handleMuscleClick={handleMuscleClick} />
      ) : (
        <ToggleableMuscleView handleMuscleClick={handleMuscleClick} />
      )}
    </>
  );
};
