import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToggleableMuscleView } from '../../components/muscleviews';
import { fetchExercises } from './helpersMuscleGroupExercisePage';
import PageTitle from '../../components/PageTitle';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(id);
  const navigate = useNavigate();

  const formattedIdSlug = `${selectedId.charAt(0).toUpperCase() + selectedId.slice(1)}`;

  useEffect(() => {
    // const loadExerciseData = (muscleId) => {
    //   fetchExercises(muscleId);
    // };

    // loadExerciseData(selectedId);
    console.log({ selectedId });
  }, [selectedId]);

  const handleMuscleClick = (svgId) => {
    if (selectedId !== svgId) {
      setSelectedId(svgId);
      navigate(`/exercises/${svgId}`);
    }
  };
  return (
    <>
      <PageTitle title={formattedIdSlug} />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-[75%]'></div>
        <div className='w-full p-4 md:w-[25%]'>
          <ToggleableMuscleView
            handleMuscleClick={handleMuscleClick}
            selectedPrimaryMuscle={selectedId}
          />
        </div>
      </div>
    </>
  );
};
