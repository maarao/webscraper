import { Progress } from "./ui/progress";

const SubRatings = () => {
  // return elements with categories in the left column and scores in the right
  return (
    <div className='grid grid-rows-8 grid-cols-1 gap-y-2 w-48 place-items-center text-xl font-light tracking-wider'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='font-semibold'>Bias:</h2>
        <p>87</p>
      </div>
      <Progress
        value={87}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-green-400 to-green-300'
      />
      <div className='flex items-center justify-between w-full'>
        <h2 className='font-semibold'>Sentiment:</h2>
        <p>.5</p>
      </div>
      <Progress
        value={50}
        className='col-span-2 bg-gradient-to-r from-sky-400 to-yellow-400'
      />
      <div className='flex items-center justify-between w-full'>
        <h2 className='font-semibold'>Common:</h2>
        <p>3</p>
      </div>
      <Progress
        value={32}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-rose-600 to-rose-400'
      />
      <div className='flex items-center justify-between w-full'>
        <h2 className='font-semibold'>Factuality:</h2>
        <p>62</p>
      </div>
      <Progress
        value={62}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-yellow-500 to-yellow-300'
      />
    </div>
  );
};

export default SubRatings;
