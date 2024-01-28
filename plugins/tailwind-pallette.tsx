import React from "react";
// All tailwind color variants, need to be defined like this so your project picks them up
const colorVariants = {
  red: [
    "bg-red-50",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
  ],
  orange: [
    "bg-orange-50",
    "bg-orange-100",
    "bg-orange-200",
    "bg-orange-300",
    "bg-orange-400",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-orange-800",
    "bg-orange-900",
  ],
  amber: [
    "bg-amber-50",
    "bg-amber-100",
    "bg-amber-200",
    "bg-amber-300",
    "bg-amber-400",
    "bg-amber-500",
    "bg-amber-600",
    "bg-amber-700",
    "bg-amber-800",
    "bg-amber-900",
  ],
  yellow: [
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
  ],
  lime: [
    "bg-lime-50",
    "bg-lime-100",
    "bg-lime-200",
    "bg-lime-300",
    "bg-lime-400",
    "bg-lime-500",
    "bg-lime-600",
    "bg-lime-700",
    "bg-lime-800",
    "bg-lime-900",
  ],
  green: [
    "bg-green-50",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ],
  emerald: [
    "bg-emerald-50",
    "bg-emerald-100",
    "bg-emerald-200",
    "bg-emerald-300",
    "bg-emerald-400",
    "bg-emerald-500",
    "bg-emerald-600",
    "bg-emerald-700",
    "bg-emerald-800",
    "bg-emerald-900",
  ],
  teal: [
    "bg-teal-50",
    "bg-teal-100",
    "bg-teal-200",
    "bg-teal-300",
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
    "bg-teal-700",
    "bg-teal-800",
    "bg-teal-900",
  ],
  cyan: [
    "bg-cyan-50",
    "bg-cyan-100",
    "bg-cyan-200",
    "bg-cyan-300",
    "bg-cyan-400",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-cyan-700",
    "bg-cyan-800",
    "bg-cyan-900",
  ],
  blue: [
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
  ],
  indigo: [
    "bg-indigo-50",
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    "bg-indigo-700",
    "bg-indigo-800",
    "bg-indigo-900",
  ],
  violet: [
    "bg-violet-50",
    "bg-violet-100",
    "bg-violet-200",
    "bg-violet-300",
    "bg-violet-400",
    "bg-violet-500",
    "bg-violet-600",
    "bg-violet-700",
    "bg-violet-800",
    "bg-violet-900",
  ],
  purple: [
    "bg-purple-50",
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-purple-800",
    "bg-purple-900",
  ],
  fuchsia: [
    "bg-fuchsia-50",
    "bg-fuchsia-100",
    "bg-fuchsia-200",
    "bg-fuchsia-300",
    "bg-fuchsia-400",
    "bg-fuchsia-500",
    "bg-fuchsia-600",
    "bg-fuchsia-700",
    "bg-fuchsia-800",
    "bg-fuchsia-900",
  ],
  pink: [
    "bg-pink-50",
    "bg-pink-100",
    "bg-pink-200",
    "bg-pink-300",
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
    "bg-pink-700",
    "bg-pink-800",
    "bg-pink-900",
  ],
  rose: [
    "bg-rose-50",
    "bg-rose-100",
    "bg-rose-200",
    "bg-rose-300",
    "bg-rose-400",
    "bg-rose-500",
    "bg-rose-600",
    "bg-rose-700",
    "bg-rose-800",
    "bg-rose-900",
  ],
  gray: [
    "bg-gray-50",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
  ],
} as const;

// Color groups
const colors = Object.keys(colorVariants) as (keyof typeof colorVariants)[];

const TailwindColorPallette = () => {
  return (
    <div className="font-display flex flex-col p-4 md:p-8">
      <div className="flex justify-between overflow-auto">
        {colors.map((color) => {
          return (
            <div className="flex flex-col items-center gap-2" key={color}>
              <h6>{color}</h6>
              <div>
                {colorVariants[color].map((variant: string) => (
                  <div
                    key={variant}
                    onClick={() => navigator.clipboard.writeText(variant)}
                    className={`h-12 w-12 cursor-pointer ${variant}`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const tailwindPallettePlugin = () => ({
  // Adds pallette icon, you can change
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  // Name of the tab
  name: "Color Pallette",
  // id of the tab, must be unique
  id: "pallette",
  requiresForge: false,
  hideTimeline: false,
  component: <TailwindColorPallette />,
});
