import { useParams } from 'react-router-dom';

export const ExerciseDetailPage = () => {
  const { slugTitle } = useParams();
  return <p>{slugTitle}</p>;
};
