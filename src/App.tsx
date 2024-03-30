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
  const [overallScore, setOverallScore] = useState(87);

  return (
    <main className='grid place-items-center py-8 w-[350px] h-[600px] border border-red-500 gap-4'>
      <div className='grid grid-cols-3 place-items-center gap-16 -mt-8'>
        <BotIcon />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className='text-lg tracking-wide'
                variant='outline'
                onClick={getCurrentTab}
              >
                Check Authenticity
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Press to get the analyze the article contents!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle />
      </div>
      <div>
        <MainRating />
      </div>
      <div>
        <SubRatings />
      </div>
    </main>
  );
}

export default App;
