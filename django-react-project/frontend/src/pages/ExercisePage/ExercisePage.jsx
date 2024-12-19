import { useState } from 'react';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

export const ExercisePage = () => {
  const [hoveredMuscle, setHoveredMuscle] = useState('');

  return (
    <div className='anatomy-images'>
      <div className='lg:w-1/3'>
        <FrontAnatomy setHoveredMuscle={setHoveredMuscle} />
      </div>
      <div className='lg:w-1/3'>
        <BackAnatomy setHoveredMuscle={setHoveredMuscle} />
      </div>
      <div
        className={`p-4 absolute text-lg font-bold top-[20%] mx-auto z-10 duration-300 hidden ${
          hoveredMuscle ? 'md:block' : 'hidden'
        }`}
      >
        {hoveredMuscle}
      </div>
    </div>
  );
};
