import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchExercise } from './helpersExerciseDetail';
import { ToggleableMuscleView } from '../../components/muscleviews';
import { useTitle } from '../../hooks/useTitle.hook';

export const ExerciseDetailPage = () => {
  const [exerciseData, setExerciseData] = useState(41);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slugMuscleGroup, slugTitle } = useParams();
  const [selectedMuscleId, setSelectedMuscleId] = useState(slugMuscleGroup);
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

  const handleMuscleClick = () => {
    console.log(exerciseData);
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <div className='flex w-full flex-col gap-4 lg:w-[75%]'>
          <p>{exerciseData?.title}</p>
        </div>
        <div className='w-full items-center lg:w-[25%]'>
          <ToggleableMuscleView
            handleMuscleClick={handleMuscleClick}
            selectedPrimaryMuscle={selectedMuscleId}
          />
        </div>
      </div>
    </>
  );
};
