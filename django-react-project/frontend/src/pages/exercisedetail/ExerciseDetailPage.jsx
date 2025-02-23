import { useParams } from 'react-router-dom';

export const ExerciseDetailPage = () => {
  const { exerciseId } = useParams();
  return <p>{exerciseId}</p>;
};
