type Props = {
  size: keyof typeof iconSize;
  color: keyof typeof iconColor;
};

const iconColor = {
  gray: "text-gray-500",
  blue: "text-blue-500",
  red: "text-red-500",
};

const iconSize = {
  8: "h-8 w-8",
  10: "h-10 w-10",
  12: "h-12 w-12",
};

export function HomeIcon({ color, size }: Props) {
  return (
    <svg
      className={`${iconSize[size]} ${iconColor[color]}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {" "}
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />{" "}
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
