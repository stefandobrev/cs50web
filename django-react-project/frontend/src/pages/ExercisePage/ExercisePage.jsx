import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

export const ExercisePage = () => {
  const navigate = useNavigate();
  const [hoveredMuscle, setHoveredMuscle] = useState('');

  const handleMuscleClick = (id, name) => {
    if (id) navigate(`/exercises/${id}`);
  };

  const handleMuscleHover = (name) => {
    setHoveredMuscle(name);
  };

  return (
    <div className='flex items-center justify-center flex-col md:flex-row'>
      <div className='lg:w-1/3 h-[calc(100vh-104px)]'>
        <FrontAnatomy
          onMuscleClick={handleMuscleClick}
          onMuscleHover={handleMuscleHover}
        />
      </div>
      <div className='lg:w-1/3 h-[calc(100vh-104px)]'>
        <BackAnatomy
          onMuscleClick={handleMuscleClick}
          onMuscleHover={handleMuscleHover}
        />
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
