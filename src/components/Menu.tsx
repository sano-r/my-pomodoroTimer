import { Button } from "./Button";

interface MenuProps {
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  toggleSettings: () => void;
}

export function Menu({
  isActive,
  toggleTimer,
  resetTimer,
  toggleSettings,
}: MenuProps) {
  return (
    <div className="flex space-x-4">
      <Button variant="blue" onClick={toggleTimer}>
        {isActive ? "Pause" : "Start"}
      </Button>
      <Button variant="red" onClick={resetTimer}>
        Reset
      </Button>
      <Button variant="green" onClick={toggleSettings}>
        Settings
      </Button>
    </div>
  );
}
