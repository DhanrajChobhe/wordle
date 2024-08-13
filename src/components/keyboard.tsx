import React from "react";

interface KeyboardProps {
  onKeyPress: any;
  Present: Set<string>;
  Absent: Set<string>;
}

const Keyboard = ({ onKeyPress, Present, Absent }: KeyboardProps) => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];
  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      {keys.map((row, index) => (
        <div key={index} className="flex">
          {row.map((key, keyIndex) => {
            let color = "bg-gray-700";

            if (Present.has(key)) {
              color = "bg-green-800";
            } else if (Absent.has(key)) {
              color = "bg-gray-900";
            }

            return (
              <button
                key={`${index}-${keyIndex}`}
                className={`flex  items-center justify-center min-w-10 h-12 p-1 mr-1 rounded-md border border-zinc-900 ${color} text-white`}
                onClick={() => onKeyPress(key.toLowerCase())}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
