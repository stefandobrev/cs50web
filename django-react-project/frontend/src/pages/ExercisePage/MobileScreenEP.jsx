import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';
import { ToggleButton } from '../../components/Buttons/EditButtons';

export const MobileScreenEP = ({ handleMuscleClick }) => {
  const [isFrontView, setIsFrontView] = useState(true);

  const toggleIsFrontView = () => {
    setIsFrontView((prev) => !prev);
  };

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
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
              selectedPrimaryMuscle={null}
              selectedSecondaryMuscles={[]}
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
              selectedPrimaryMuscle={null}
              selectedSecondaryMuscles={[]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
