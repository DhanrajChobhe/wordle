import Image from "next/image";
import Keyboard from "@/components/keyboard";
import { WORDS } from "@/utils/words";
import Wordle from "@/components/wordle";

export default function Home() {
  return (
    <div className=" h-screen flex justify-center content-center bg-zinc-800">
      <div className="text-center pt-4  ">
        <h1 className="text-4xl font-bold mb-4 text-slate-300">WORDLE</h1>
        <Wordle />
      </div>
    </div>
  );
}
