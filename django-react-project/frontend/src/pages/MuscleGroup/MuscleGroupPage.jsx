import { useParams } from 'react-router-dom';

export const MuscleGroupPage = () => {
  const { id } = useParams('id');

  return (
    <div className='flex w-full items-center justify-center h-full'>
      <h1 className='font-bold text-2xl'>{id.toUpperCase()}</h1>
    </div>
  );
};
