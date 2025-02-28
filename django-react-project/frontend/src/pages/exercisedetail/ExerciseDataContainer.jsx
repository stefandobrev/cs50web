const VideoItems = ({ src }) => (
  <video
    src={src}
    autoPlay
    loop
    className='rounded-lg object-cover lg:w-[50%]'
  />
);

const ExerciseDataContainer = ({ exerciseData }) => {
  return (
    <div className='m-2 flex flex-col justify-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:max-h-[650px] lg:overflow-y-auto'>
      <div className='flex flex-col gap-6 lg:flex-row'>
        <VideoItems src={exerciseData.gif_link_front} />
        <VideoItems src={exerciseData.gif_link_side} />
      </div>
      {exerciseData.steps?.length > 0 && (
        <ol className='list-decimal space-y-4 text-lg text-gray-800 lg:pl-4'>
          {exerciseData.steps.map((step, index) => (
            <li key={index} className='flex items-center'>
              <div className='mr-3 flex-shrink-0'>
                <span className='text-md flex h-8 w-8 items-center justify-center rounded-full bg-white font-medium text-gray-800 ring-2 ring-gray-800'>
                  {index + 1}
                </span>
              </div>
              <span className='text-gray-700'>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
export default ExerciseDataContainer;
