import { useParams } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';

export const MuscleGroupExercisePage = () => {
  const { id } = useParams();
  const formattedIdSlug = `${id.charAt(0).toUpperCase() + id.slice(1)}`;

  return (
    <>
      <PageTitle title={formattedIdSlug} />
      <div className='flex flex-col lg:flex-row'></div>
    </>
  );
};
