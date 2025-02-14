import { useState, useEffect, ChangeEvent } from "react";
import { Link, Route, Routes } from "react-router";
import { Settings } from "./components/Settings";
import { Menu } from "./components/Menu";
import { SettingIcon } from "./components/SettingIcon";
import { HomeIcon } from "./components/HomeIcon";

export function App() {
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
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleWorkTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) * 60;
    setWorkTime(value);
    if (!isBreak) setTime(value);
  };

  const handleBreakTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) * 60;
    setBreakTime(value);
    if (isBreak) setTime(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <nav className="mb-4 flex space-x-4">
        <Link to="/" className="mr-4">
          <HomeIcon size={8} color="gray" />
        </Link>
        <Link to="/settings">
          <SettingIcon color="gray" />
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-4xl font-bold mb-4">
                {isBreak ? "Break Time" : "Work Time"}
              </h1>
              <div className="text-6xl font-mono mb-8">{formatTime(time)}</div>
              <Menu
                isActive={isActive}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
              />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              workTime={workTime}
              breakTime={breakTime}
              onWorkTimeChange={handleWorkTimeChange}
              onBreakTimeChange={handleBreakTimeChange}
            />
          }
        />
      </Routes>
    </div>
  );
}
