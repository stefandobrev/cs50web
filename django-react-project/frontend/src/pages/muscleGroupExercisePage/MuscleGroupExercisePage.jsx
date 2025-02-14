import { useParams } from 'react-router-dom';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();

  return (
    <div className='flex h-[calc(100vh-20px)] w-full items-center justify-center'>
      <h1 className='text-2xl font-bold'>{id.toUpperCase()}</h1>
    </div>
  );
};
