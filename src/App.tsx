import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from './components/Button';

export function App(){
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workTime, setWorkTime] = useState(1500); // 25分働く
  const [breakTime, setBreakTime] = useState(300); // 5分休憩

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsBreak(!isBreak);
      setTime(isBreak ? 1500 : 300); // 25 minutes or 5 minutes
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(isBreak ? 300 : 1500);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleWorkTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) * 60;
    setWorkTime(value);
    if(!isBreak) setTime(value);
  }

  const handleBreakTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) * 60;
    setBreakTime(value);
    if(isBreak) setTime(value);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{isBreak ? 'Break Time' : 'Work Time'}</h1>
      <div className="text-6xl font-mono mb-8">{formatTime(time)}</div>
      <div className="flex space-x-4">
        <Button variant='blue' onClick={toggleTimer}>
          {isActive ? 'Pause': 'Start'}
        </Button>
        <Button variant="red" onClick={resetTimer}>
          Reset
        </Button>
      </div>
      <div className='flex space-x-4'>
        <div>
          <label className='block mb-2'>Work Time (minutes): </label>
          <input type="number" className='border p-2' value={workTime/60} onChange={handleWorkTimeChange}/>
        </div>
        <div>
          <label className='block mb-2'>Break Time (minutes): </label>
          <input type="number" className='border p-2' value={breakTime/60} onChange={handleBreakTimeChange}/>
        </div>
      </div>
    </div>
  );
};

