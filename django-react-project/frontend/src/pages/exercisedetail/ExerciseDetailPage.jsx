import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchExercise } from './helpersExerciseDetail';
import { useTitle } from '../../hooks/useTitle.hook';

export const ExerciseDetailPage = () => {
  const [exerciseData, setExerciseData] = useState(null);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slugMuscleGroup, slugTitle } = useParams();
  const navigate = useNavigate();

  useTitle(exerciseTitle);

  useEffect(() => {
    setIsLoading(true);

    const loadExerciseData = async () => {
      const data = await fetchExercise({ slugMuscleGroup, slugTitle });

      // data.error should handle 404 only. Rest is handled by helpers.
      if (data.error) {
        navigate('/404', { replace: true });
      }

      setExerciseData(data);
      setExerciseTitle(data.title);
      setIsLoading(false);
    };

    loadExerciseData();
  }, [slugTitle]);

  return <p>{slugTitle}</p>;
};
