import { motion } from "framer-motion";

interface TileProps {
  value: string;
  color: string;
  isFlipping: boolean;
  duration: number;
}

export const Tile = ({ value, color, isFlipping, duration }: TileProps) => {
  const tileColor =
    color === "correct"
      ? "bg-green-500"
      : color === "wrong-position"
      ? "bg-yellow-500"
      : color === "incorrect"
      ? "bg-gray-500"
      : "bg-zinc-800";

  const motionColor =
    color === "correct"
      ? "#22c55e"
      : color === "wrong-position"
      ? "#eab308"
      : color === "incorrect"
      ? "#6b7280"
      : "#27272a";

  const tileVariants = {
    initial: { backgroundColor: "#27272a", rotateY: 0 },
    flipped: { backgroundColor: motionColor, rotateY: 180 },
  };

  return (
    <div className="relative w-10 h-10 ">
      <motion.div
        className={`absolute w-full h-full bg-gray-500 shadow-sm border border-gray-400`}
        variants={tileVariants}
        initial="initial"
        animate={
          //   color === "correct" || color === "wrong-position"
          isFlipping ? "flipped" : "initial"
        }
        transition={{
          type: "spring",
          stiffness: 50,
          delay: duration,
          duration: 1,
        }}
      />
      <div className="absolute flex items-center justify-center w-full h-full text-white font-bold">
        {value}
      </div>
    </div>
  );
};

export default Tile;
