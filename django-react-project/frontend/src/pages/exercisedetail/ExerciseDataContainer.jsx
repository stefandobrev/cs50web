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
    <div className='m-2 flex justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:max-h-[650px] lg:overflow-y-auto'>
      <div className='flex flex-col gap-6 lg:flex-row'>
        <VideoItems src={exerciseData.gif_link_front} />
        <VideoItems src={exerciseData.gif_link_side} />
      </div>
    </div>
  );
};
export default ExerciseDataContainer;
