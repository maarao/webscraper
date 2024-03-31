import { getCurrentTab } from "./functions.js";
import ThemeToggle from "./components/ThemeToggle.js";
import { useState, useEffect } from "react";
import MainRating from "./components/MainRating.js";
import SubRatings from "./components/SubRatings.js";
import { Skeleton } from "./components/ui/skeleton.js";
import { Separator } from "@/components/ui/separator";

function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getCurrentTab();
    setTimeout(() => {
      setData(JSON.parse(localStorage.getItem("data")));
      setScore(Math.trunc(data.score * 100));
      setLoading(false);
    }, Math.random() * 200 + 1200);
  };

  return (
    <main className='border border-red-500 flex flex-col items-center py-4 max-h-[350px] w-[680px] p-4 gap-4 animate-slide-from-top-with-fade'>
      <div className='flex justify-between w-full items-center px-4'>
        <h1 className='text-4xl font-light tracking-wide'>Title</h1>
        <ThemeToggle />
      </div>
      <Separator className='-mt-2' />
      <div className='flex gap-8 items-center px-4'>
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
      </div>
    </main>
  );
}

export default App;
