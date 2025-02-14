import { useParams } from 'react-router-dom';

export const MuscleGroupPage = () => {
  const { id } = useParams();

  return (
    <div className='flex w-full h-[calc(100vh-20px)] justify-center items-center'>
      <h1 className='font-bold text-2xl'>{id.toUpperCase()}</h1>
    </div>
  );
};
