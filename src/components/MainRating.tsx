const MainRating = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-semibold text-center text-3xl'>Overeall Score:</h1>
      <div className='size-64 grid place-items-center border border-red-500'>
        <h1 className='text-6xl'>87%</h1>
      </div>
    </div>
  );
};

export default MainRating;
