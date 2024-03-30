import { getCurrentTab } from "./functions.js";

function App() {
  return (
    <main className='grid place-items-center w-[350px] h-[600px]'>
      <button className='p-2 bg-rose-500 rounded-lg' onClick={getCurrentTab}>
        Check authenticity
      </button>
    </main>
  );
}

export default App;
