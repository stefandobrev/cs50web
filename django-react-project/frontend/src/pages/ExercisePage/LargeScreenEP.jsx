import { useState } from 'react';

import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

export const LargeScreenEP = ({ handleMuscleClick }) => {
  const [hoveredMuscle, setHoveredMuscle] = useState('');

  const handleMuscleHover = (name) => {
    setHoveredMuscle(name);
  };

  return (
    <div className='flex items-center justify-center flex-row'>
      <div className='w-[35%] h-[calc(100vh-108px)] flex items-center justify-center'>
        <FrontAnatomy
          onMuscleClick={handleMuscleClick}
          onMuscleHover={handleMuscleHover}
          selectedPrimaryMuscle={null}
          selectedSecondaryMuscles={[]}
        />
      </div>
      <div className='w-[35%] h-[calc(100vh-108px)] flex items-center justify-center'>
        <BackAnatomy
          onMuscleClick={handleMuscleClick}
          onMuscleHover={handleMuscleHover}
          selectedPrimaryMuscle={null}
          selectedSecondaryMuscles={[]}
        />
      </div>
      <div
        className={`p-4 absolute text-lg font-bold top-[20%] mx-auto z-10 duration-300 ${
          hoveredMuscle ? 'block' : 'hidden'
        }`}
      >
        {hoveredMuscle}
      </div>
    </div>
  );
};
