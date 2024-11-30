import { useEffect } from 'react';

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | AlishFitness` : 'AlishFitness';
  }, [title]);
};
export default PageTitle;
