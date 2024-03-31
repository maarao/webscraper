import { Progress } from "./ui/progress";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const SubRatings = ({
  classification,
  relevance,
  polarity,
  factuality,
}: {
  classification: number;
  relevance: number;
  polarity: number;
  factuality: number;
}) => {
  // return elements with categories in the left column and scores in the right
  return (
    <div className='grid grid-rows-8 grid-cols-1 gap-y-1 scale-90 w-64 place-items-center text-xl font-light tracking-wider'>
      <div className='flex items-center justify-between w-full'>
        <HoverCard openDelay={300} closeDelay={0}>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Classification:</h2>
          </HoverCardTrigger>
          <HoverCardContent
            side='left'
            sideOffset={30}
            className='translate-y-10'
          >
            <p>
              Classification measures the difference between categorical
              variables across real and fake news sources as well as bias
              categories. Higher is better.
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>{classification}</p>
      </div>
      <Progress
        value={classification * 100}
        className='col-span-2'
        indicatorColor={`bg-gradient-to-r ${
          classification < 0.5
            ? "from-rose-600 to-red-400"
            : classification < 0.8
            ? "from-yellow-500 to-yellow-300"
            : "from-green-400 to-green-300"
        }`}
      />
      <div className='flex items-center justify-between w-full'>
        <HoverCard openDelay={300} closeDelay={0}>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Relevance:</h2>
          </HoverCardTrigger>
          <HoverCardContent side='left' sideOffset={30}>
            <p>
              Relevance looks for other sources with similar keywords in the
              title and increases the score with each find.
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>{relevance}</p>
      </div>
      <Progress
        value={relevance}
        className='col-span-2'
        indicatorColor='bg-gradient-to-r from-rose-600 to-rose-400'
      />
      <div className='flex items-center justify-between w-full left-'>
        <HoverCard openDelay={300} closeDelay={0}>
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
          className={`border border-black dark:border-white h-6 absolute left-1/2 bottom-[4.1rem] z-10`}
        />
        <p className='absolute left-[48.5%] text-base top-[8.6rem]'>0</p>
      </div>
      <Progress
        value={50}
        className='col-span-2 bg-gradient-to-r from-sky-400 to-yellow-400'
      />
      <div className='flex items-center justify-between w-full'>
        <HoverCard openDelay={300} closeDelay={0}>
          <HoverCardTrigger>
            <h2 className='font-semibold'>Factuality:</h2>
          </HoverCardTrigger>
          <HoverCardContent
            side='left'
            sideOffset={30}
            className='-translate-y-10'
          >
            <p>
              Factuality measures the subjectivity of the language by looking at
              the subjectivity of words and phrases, like "I liked the food".
            </p>
          </HoverCardContent>
        </HoverCard>
        <p>{factuality}</p>
      </div>
      <Progress
        value={factuality}
        className='col-span-2'
        indicatorColor={`bg-gradient-to-r ${
          factuality < 50
            ? "from-rose-600 to-red-400"
            : factuality < 80
            ? "from-yellow-500 to-yellow-300"
            : "from-green-400 to-green-300"
        }`}
      />
    </div>
  );
};

export default SubRatings;
