import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCurrentTab } from "./functions.js";
import ThemeToggle from "./components/ThemeToggle.js";
import { useState } from "react";
import MainRating from "./components/MainRating.js";
import SubRatings from "./components/SubRatings.js";
import { Skeleton } from "./components/ui/skeleton.js";
import { Loader2 } from "lucide-react";

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getCurrentTab();
    setTimeout(() => {
      setData(JSON.parse(localStorage.getItem("data")));
      setScore(Math.trunc(data.score * 100));
      setLoading(false);
    }, Math.random() * 400 + 800);
  };

  return (
    <main className='flex flex-col items-center justify-between py-4 w-[350px] h-[600px] border border-red-500 animate-slide-from-top-with-fade'>
      <div className='flex justify-between w-full items-center px-4'>
        <h1 className='text-4xl font-light tracking-wide'>Title</h1>
        <ThemeToggle />
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {loading ? (
                <Button disabled className='w-64 h-10'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button
                  className='text-2xl font-light tracking-wider shadow-xl dark:shadow-zinc-800'
                  size='lg'
                  onClick={fetchData}
                >
                  Check Authenticity
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Press to get the analyze the article contents!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        {loading ? (
          <Skeleton className='size-64 rounded-full' />
        ) : (
          <MainRating score={score} />
        )}
      </div>
      <div>
        {loading ? (
          <div className='grid grid-rows-3 grid-cols-2 gap-x-3 gap-y-2 place-items-center'>
            <Skeleton className='h-8 w-32' />
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-32' />
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-32' />
            <Skeleton className='h-8 w-24' />
          </div>
        ) : (
          <SubRatings />
        )}
      </div>
    </main>
  );
}

export default App;
