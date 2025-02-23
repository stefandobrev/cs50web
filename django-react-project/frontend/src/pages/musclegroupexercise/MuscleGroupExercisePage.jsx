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
  const { muscleGroupId } = useParams();
  const [selectedMuscleId, setSelectedMuscleId] = useState(muscleGroupId);
  const [exercisesData, setExercisesData] = useState(null);
  const [muscleGroupName, setMuscleGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('exercises');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useTitle(muscleGroupName);

  useEffect(() => {
    setIsLoading(true);

    const loadExercisesData = async () => {
      const data = await fetchExercises({
        selectedMuscleId: selectedMuscleId,
        searchQuery: searchQuery,
      });
      setExercisesData(data.exercises);
      setMuscleGroupName(data.name);
      setIsLoading(false);
    };

    loadExercisesData();
  }, [selectedMuscleId, searchQuery]);

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
          className={`flex w-full flex-col gap-4 lg:w-[75%] ${
            activeTab !== 'exercises' ? 'hidden lg:flex' : ''
          }`}
        >
          <div className='sticky top-36 z-30 bg-white pb-2 lg:static lg:pb-0 dark:bg-gray-900'>
            <Heading
              muscleGroupName={muscleGroupName}
              exercisesData={exercisesData}
              valueSearch={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          {isLoading ? (
            <Spinner loading={isLoading} className='min-h-[70vh]' />
          ) : (
            <div className='flex-1'>
              <div className='h-auto pb-8 lg:overflow-y-auto lg:pb-4'>
                <MuscleGrid exercisesData={exercisesData} />
              </div>
            </div>
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
