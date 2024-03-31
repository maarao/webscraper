const SubRatings = () => {
  // return elements with categories in the left column and scores in the right
  return (
    <div className='grid grid-rows-3 grid-cols-2 gap-x-3 gap-y-1 place-items-center text-xl font-light tracking-wider'>
      <div className='font-semibold justify-self-start'>Bias:</div>
      <div>Score 1</div>
      <div className='font-semibold justify-self-start'>Sentiment:</div>
      <div>Score 2</div>
      <div className='font-semibold justify-self-start'>Common:</div>
      <div>Score 3</div>
    </div>
  );
};

export default SubRatings;
