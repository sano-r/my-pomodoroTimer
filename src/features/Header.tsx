import { Link } from "react-router";
import { HomeIcon } from "../components/HomeIcon";
import { SettingIcon } from "../components/SettingIcon";

export function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Pomodoro Timer</div>
        <nav className="space-x-4 flex">
          <Link to="/" className="mr-4">
            <HomeIcon size={8} color="gray" />
          </Link>
          <Link to="/settings">
            <SettingIcon color="gray" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
