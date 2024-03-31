import { Progress } from "./ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SubRatings = ({ polarity }: { polarity: number }) => {
  // return elements with categories in the left column and scores in the right
  return (
    <div className='grid grid-rows-8 grid-cols-1 gap-y-1 scale-90 w-64 place-items-center text-xl font-light tracking-wider'>
      <div className='flex items-center justify-between w-full'>
        <HoverCard>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Bias:</h2>
          </HoverCardTrigger>
          <HoverCardContent side='left' className='translate-y-10'>
            <p>
              Bias accumulates different types of biases and adds them together.
              Higher means less bias.{" "}
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>87</p>
      </div>
      <Progress
        value={87}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-green-400 to-green-300'
      />
      <div className='flex items-center justify-between w-full'>
        <HoverCard>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Consistency:</h2>
          </HoverCardTrigger>
          <HoverCardContent side='left' sideOffset={30}>
            <p>
              Consistency looks for other sources with similar keywords in the
              title and increases the score with each find.
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>3</p>
      </div>
      <Progress
        value={32}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-rose-600 to-rose-400'
      />
      <div className='flex items-center justify-between w-full'>
        <HoverCard>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Polarity:</h2>
          </HoverCardTrigger>
          <HoverCardContent side='left' sideOffset={30}>
            <p>
              Polarity is a scale from [-1,1] which analyzes article content for
              emotional words, -1 being most negative and 1 being most positive.
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>{polarity}</p>
        <div
          className={`border border-white h-6 absolute left-[${
            (polarity + 0.5) * 100
          }%] bottom-[4.10rem] z-10`}
        />
      </div>
      <Progress
        value={50}
        className='col-span-2 bg-gradient-to-r from-sky-400 to-yellow-400'
      />
      <div className='flex items-center justify-between w-full'>
        <HoverCard>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Factuality:</h2>
          </HoverCardTrigger>
          <HoverCardContent side='left' className='-translate-y-10'>
            <p>
              Factuality measures the subjectivity of the language by looking at
              the subjectivity of words and phrases, like "I liked the food".
            </p>
          </HoverCardContent>
        </HoverCard>
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
