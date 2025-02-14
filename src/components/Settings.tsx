import { ChangeEvent } from "react";

interface SettingsProps {
  workTime: number;
  breakTime: number;
  onWorkTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBreakTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Settings({
  workTime,
  breakTime,
  onWorkTimeChange,
  onBreakTimeChange,
}: SettingsProps) {
  return (
    <div className="flex flex-col space-x-4 mt-4">
      <div>
        <label className="block mb-2">
          Work Time (minutes):
          <input
            type="number"
            className="border p-2"
            value={workTime / 60}
            onChange={onWorkTimeChange}
          />
        </label>
      </div>
      <div>
        <label className="block mb-2">
          Break Time (minutes):
          <input
            type="number"
            className="border p-2"
            value={breakTime / 60}
            onChange={onBreakTimeChange}
          />
        </label>
      </div>
    </div>
  );
}
