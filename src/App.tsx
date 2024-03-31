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
import { BotIcon } from "lucide-react";

function App() {
  const [score, setScore] = useState(0);

  const fetchData = () => {
    getCurrentTab();
    setScore(85);
  };

  return (
    <main className='grid place-items-center py-8 w-[350px] h-[600px] gap-4 animate-slide-from-top-with-fade'>
      <div className='grid grid-cols-3 place-items-center gap-20 -mt-6'>
        <BotIcon />
        <h1 className='text-4xl'>Title</h1>
        <ThemeToggle />
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='text-2xl tracking-wider shadow-xl dark:shadow-zinc-800'
                size='lg'
                onClick={fetchData}
              >
                Check Authenticity
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Press to get the analyze the article contents!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <MainRating score={score} />
      </div>
      <div>
        <SubRatings />
      </div>
    </main>
  );
}

export default App;
