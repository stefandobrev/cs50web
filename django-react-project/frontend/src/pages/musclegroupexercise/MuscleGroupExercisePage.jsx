import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToggleableMuscleView } from '../../components/muscleviews';
import { fetchExercises } from './helpersMuscleGroupExercisePage';
import Spinner from '../../components/Spinner';
import Heading from './Heading';
import MuscleGrid from './MuscleGrid';
import { useTitle } from '../../hooks/useTitle.hook';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();
  const [selectedMuscleId, setSelectedMuscleId] = useState(id);
  const [exercisesData, setExercisesData] = useState(null);
  const [muscleGroupName, setMuscleGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useTitle(muscleGroupName);

  useEffect(() => {
    setIsLoading(true);

    const loadExercisesData = async () => {
      const data = await fetchExercises(selectedMuscleId);
      setExercisesData(data.exercises);
      setMuscleGroupName(data.name);
      setIsLoading(false);
    };

    loadExercisesData();
  }, [selectedMuscleId]);

  const handleMuscleClick = (svgId) => {
    if (selectedMuscleId !== svgId) {
      setSelectedMuscleId(svgId);
      navigate(`/exercises/${svgId}`);
    }
  };
  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='flex w-full flex-col lg:w-[75%]'>
        {isLoading ? (
          <Spinner loading={{ isLoading }} />
        ) : (
          <>
            <Heading
              muscleGroupName={muscleGroupName}
              exercisesData={exercisesData}
            />
            <MuscleGrid exercisesData={exercisesData} />
          </>
        )}
      </div>

      <div className='w-full items-center lg:w-[25%]'>
        <ToggleableMuscleView
          handleMuscleClick={handleMuscleClick}
          selectedPrimaryMuscle={selectedMuscleId}
        />
      </div>
    </div>
  );
};
