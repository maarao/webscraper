import { getCurrentTab } from "./functions.js";
import ThemeToggle from "./components/ThemeToggle.js";
import { useState, useEffect } from "react";
import MainRating from "./components/MainRating.js";
import SubRatings from "./components/SubRatings.js";
import { Skeleton } from "./components/ui/skeleton.js";
import { Separator } from "@/components/ui/separator";
import { Button } from "./components/ui/button.js";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [classification, setClassification] = useState(0);
  const [relevance, setRelevance] = useState(0);
  const [polarity, setPolarity] = useState(0);
  const [factuality, setFactuality] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("data");
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getCurrentTab();
    setTimeout(() => {
      setData(JSON.parse(localStorage.getItem("data")));
      setScore(Math.trunc(data.score * 100));
      setClassification(data.bias);
      setRelevance(data.fact_check);
      setPolarity(Math.round(data.polarity * 100) / 100);
      setFactuality(Math.trunc(data.subjectivity * 100));
      setLoading(false);
    }, Math.random() * 200 + 1200);
  };

  return (
    <main className='flex flex-col items-center py-4 max-h-[350px] w-[680px] p-4 gap-4 animate-slide-from-top-with-fade origin-top-left'>
      <div className='flex justify-between w-full items-center px-4'>
        <div className='flex gap-2 items-center'>
          <img src='/fclogo.png' alt='FactCheck Logo' className='w-12 h-12' />
          <h1 className='text-4xl font-light tracking-wide'>FactCheck</h1>
        </div>
        <div className='flex item-center gap-2'>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Button variant='outline'>?</Button>
            </HoverCardTrigger>
            <HoverCardContent
              side='left'
              sideOffset={30}
              className='translate-y-4'
            >
              <p className='text-lg'>
                Hover over a category for more information.
              </p>
            </HoverCardContent>
          </HoverCard>
          <ThemeToggle />
        </div>
      </div>
      <Separator className='-mt-2' />
      <div className='flex gap-8 items-center px-4'>
        <div>
          {loading ? (
            // <Skeleton className='size-64 rounded-full' />
            <MainRating score={score} />
          ) : (
            <MainRating score={score} />
          )}
        </div>
        <div>
          {loading ? (
            <div className='grid grid-rows-8 grid-cols-1 gap-y-1 scale-90 w-64'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-6 w-full' />
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-6 w-full' />
              <Skeleton className='h-6 w-[6.5rem]' />
              <Skeleton className='h-6 w-full' />
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-6 w-full' />
            </div>
          ) : (
            <SubRatings
              classification={classification}
              relevance={relevance}
              polarity={polarity}
              factuality={factuality}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
