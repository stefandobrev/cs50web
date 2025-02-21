import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToggleableMuscleView } from '../../components/muscleviews';
import { fetchExercises } from './helpersMuscleGroupExercisePage';
import Spinner from '../../components/Spinner';
import TabButton from '../../components/buttons/TabButton';
import Heading from './Heading';
import MuscleGrid from './MuscleGrid';
import { useTitle } from '../../hooks/useTitle.hook';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();
  const [selectedMuscleId, setSelectedMuscleId] = useState(id);
  const [exercisesData, setExercisesData] = useState(null);
  const [muscleGroupName, setMuscleGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('exercises');
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
      setActiveTab('exercises');
      navigate(`/exercises/${svgId}`);
    }
  };
  return (
    <>
      <div className='sticky top-20 z-40 flex h-16 justify-around border-t border-gray-800 bg-gray-600 p-2 lg:hidden'>
        <TabButton
          label='Exercises'
          isActive={activeTab === 'exercises'}
          onClick={() => setActiveTab('exercises')}
        />
        <TabButton
          label='Anatomy'
          isActive={activeTab === 'anatomy'}
          onClick={() => setActiveTab('anatomy')}
        />
      </div>

      <div className='flex flex-col lg:flex-row'>
        <div
          className={`flex w-full flex-col lg:w-[75%] ${
            activeTab !== 'exercises' ? 'hidden lg:flex' : ''
          }`}
        >
          {isLoading ? (
            <Spinner loading={isLoading} className='min-h-[70vh]' />
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

        <div
          className={`w-full items-center lg:w-[25%] ${
            activeTab !== 'anatomy' ? 'hidden lg:block' : ''
          }`}
        >
          <ToggleableMuscleView
            handleMuscleClick={handleMuscleClick}
            selectedPrimaryMuscle={selectedMuscleId}
          />
        </div>
      </div>
    </>
  );
};
