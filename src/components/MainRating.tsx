import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useTheme } from "@/components/theme-provider";
import "react-circular-progressbar/dist/styles.css";

const MainRating = ({ score }: { score: number }) => {
  const GREEN = "#41be7d";
  const YELLOW = "#f2ac42";
  const RED = "#be4141";
  const BLACK = "#f4f4f5";
  const WHITE = "#18181b";
  const theme = useTheme().theme;
  const PRIMARY = theme === "light" ? BLACK : WHITE;

  let color = GREEN;

  if (score < 50) {
    color = RED;
  } else if (score < 80) {
    color = YELLOW;
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className=' text-center text-2xl font-light tracking-wide drop-shadow-2xl'>
        Overall Score:
      </h1>
      <div className='size-64 rounded-full shadow-2xl dark:shadow-zinc-900'>
        <CircularProgressbarWithChildren
          value={score}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",

            // Text size
            textSize: "29px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 1,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            trailColor: `${PRIMARY}`,
            textColor: `${PRIMARY}`,
            pathColor: `${color}`,
          })}
        >
          <p className='text-7xl font-extralight'>{`${score}%`}</p>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default MainRating;
