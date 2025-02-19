import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToggleableMuscleView } from '../../components/muscleviews';
import { fetchExercises } from './helpersMuscleGroupExercisePage';
import Spinner from '../../components/Spinner';
import PageTitle from '../../components/PageTitle';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();
  const [selectedMuscleId, setSelectedMuscleId] = useState(id);
  const [exercisesData, setExercisesData] = useState(null);
  const [muscleGroupName, setMuscleGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  console.log({ exercisesData });
  const handleMuscleClick = (svgId) => {
    if (selectedMuscleId !== svgId) {
      setSelectedMuscleId(svgId);
      navigate(`/exercises/${svgId}`);
    }
  };
  return (
    <>
      <PageTitle title={muscleGroupName} />
      <div className='flex flex-col p-4 lg:flex-row'>
        <div className='flex w-full flex-col lg:w-[75%]'>
          <div className='mb-4 flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold md:text-3xl'>
              {muscleGroupName} Exercises
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              {exercisesData?.length} exercises available
            </p>
          </div>

          {isLoading ? (
            <Spinner loading={{ isLoading }} />
          ) : (
            <div className='max-h-[650px] overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
              <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
                {exercisesData?.map((exercise) => (
                  <div
                    key={exercise.id}
                    className='group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
                  >
                    <div className='p-4 pb-2'>
                      <h2 className='flex justify-center text-lg font-semibold text-gray-800 dark:text-white'>
                        {exercise.title}
                      </h2>
                    </div>
                    <div className='aspect-video overflow-hidden'>
                      <video
                        src={exercise.gif_link_front}
                        className='h-full w-full object-cover'
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 opacity-0 transition-opacity group-hover:opacity-100' />
                  </div>
                ))}
              </div>
            </div>
          )}
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
