import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToggleButton } from '../../components/Buttons/EditButtons';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

const FRONT_MUSCLES = new Set([
  'abdominals',
  'quadriceps',
  'calves',
  'adductors',
  'obliques',
  'biceps',
  'neck',
  'forearms',
  'traps-upper',
  'deltoid-lateral',
  'deltoid-anterior',
  'pectoralis-upper',
  'pectoralis-middle-lower',
]);

const MuscleAnatomyView = ({ handleMuscleClick, selectedMuscle }) => {
  const [isFrontView, setIsFrontView] = useState(true);

  useEffect(() => {
    setIsFrontView(!selectedMuscle || FRONT_MUSCLES.has(selectedMuscle));
  }, [selectedMuscle]);

  const toggleIsFrontView = () => {
    setIsFrontView((prev) => !prev);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <ToggleButton onClick={toggleIsFrontView}>
        {isFrontView ? 'Show Back' : 'Show Front'}
      </ToggleButton>

      <AnimatePresence mode='wait'>
        {isFrontView ? (
          <motion.div
            key='front'
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full'
          >
            <FrontAnatomy
              onMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscle}
            />
          </motion.div>
        ) : (
          <motion.div
            key='back'
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='w-full'
          >
            <BackAnatomy
              onMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscle}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MuscleAnatomyView;
