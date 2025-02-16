import { useMedia } from 'react-use';
import { useNavigate } from 'react-router-dom';
import {
  FullBodyMuscleView,
  ToggleableMuscleView,
} from '../../components/muscleviews';
import PageTitle from '../../components/PageTitle';

export const ExercisePage = () => {
  const navigate = useNavigate();

  const isMdOrLarger = useMedia('(min-width: 768px)');

  const handleMuscleClick = (id) => {
    if (id) navigate(`/exercises/${id}`);
  };

  return (
    <div>
      <PageTitle title='Exercises' />
      {isMdOrLarger ? (
        <FullBodyMuscleView handleMuscleClick={handleMuscleClick} />
      ) : (
        <ToggleableMuscleView handleMuscleClick={handleMuscleClick} />
      )}
    </div>
  );
};
