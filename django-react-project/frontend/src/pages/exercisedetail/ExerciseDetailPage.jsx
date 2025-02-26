import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchExercise } from './helpersExerciseDetail';
import { ToggleableMuscleView } from '../../components/muscleviews';
import TabButton from '../../components/buttons/TabButton';
import Spinner from '../../components/Spinner';
import { useTitle } from '../../hooks/useTitle.hook';

export const ExerciseDetailPage = () => {
  const [exerciseData, setExerciseData] = useState(41);
  const [isLoading, setIsLoading] = useState(false);
  const { slugMuscleGroup, slugTitle } = useParams();
  const [activeTab, setActiveTab] = useState('exercise');
  const navigate = useNavigate();

  useTitle(exerciseData?.title);

  useEffect(() => {
    setIsLoading(true);

    const loadExerciseData = async () => {
      const data = await fetchExercise({ slugMuscleGroup, slugTitle });

      // data.error should handle 404 only. Rest is handled by helpers.
      if (data.error) {
        navigate('/404', { replace: true });
      }
      setExerciseData(data);
      setIsLoading(false);
    };

    loadExerciseData();
  }, [slugTitle]);

  const handleMuscleClick = (svgId) => {
    navigate(`/exercises/${svgId}`);
  };

  return (
    <>
      <div className='sticky top-20 z-40 flex h-16 justify-around border-t border-gray-800 bg-gray-600 p-2 lg:hidden'>
        <TabButton
          label='Exercise'
          isActive={activeTab === 'exercise'}
          onClick={() => setActiveTab('exercise')}
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
            activeTab !== 'exercise' ? 'hidden lg:flex' : ''
          }`}
        >
          {isLoading ? (
            <Spinner className='min-h-[70vh]' />
          ) : (
            <div className='flex flex-col items-center space-y-4'>
              <h1 className='p-4 text-2xl font-bold md:text-3xl'>
                {exerciseData.title}
              </h1>

              <div className='flex w-[90%] flex-col justify-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row'>
                <div className='h-full w-full'>
                  <video
                    src={exerciseData.gif_link_front}
                    autoPlay
                    loop
                    className='rounded-lg object-cover'
                  />
                </div>
                <div className='h-full w-full'>
                  <video
                    src={exerciseData.gif_link_side}
                    autoPlay
                    loop
                    className='rounded-lg object-cover'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`w-full lg:w-[25%] ${
            activeTab !== 'anatomy' ? 'hidden lg:block' : ''
          }`}
        >
          <div className='px-6'>
            <ToggleableMuscleView
              handleMuscleClick={handleMuscleClick}
              selectedPrimaryMuscle={slugMuscleGroup}
              selectedSecondaryMuscles={exerciseData?.secondary_groups}
            />
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex flex-row justify-center gap-4'>
              <div className='flex items-center gap-2'>
                <span className='h-4 w-4 rounded bg-red-500'></span>
                <span>Primary</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='h-4 w-4 rounded bg-amber-300'></span>
                <span>Secondary</span>
              </div>
            </div>
            <div className='flex justify-center p-2'>
              <p className='text-gray-500 italic'>
                * Click to select another group
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
