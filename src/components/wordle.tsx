"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Tile from "./tile";
import { getRandomWord, WORDS } from "@/utils/words";
import { Letter } from "@/types/letter";
import { changeKeyColor, changeTileColor } from "@/utils/colour";
import Keyboard from "./keyboard";
import { loseMessage, winMessage } from "@/utils/messages";
import Meaning from "./meaning";

export default function Wordle() {
  let initialBoard = Array(30).fill({
    value: "",
    color: "default",
    isFlipping: false,
  });

  const [reqdWord, setReqdWord] = useState(getRandomWord());
  const [guessedWord, setGuessedWord] = useState("");
  const [board, setBoard] = useState(initialBoard);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [present, setPresent] = useState(new Set<string>());
  const [absent, setAbsent] = useState(new Set<string>());
  const [showOverlay, setShowOverlay] = useState(false);
  const [result, setResult] = useState("");

  const handlePlayAgain = () => {
    setReqdWord(getRandomWord());
    setGuessedWord("");
    setBoard(initialBoard);
    setCurrentGuess(0);
    setCurrentTile(0);
    setGameOver(false);
    setGameWon(false);
    setPresent(new Set<string>());
    setAbsent(new Set<string>());
    setShowOverlay(false);
    setResult("");
  };
  console.log(reqdWord);

  const handleKeyPress = (event: KeyboardEvent | string) => {
    let key = "";
    if (event instanceof KeyboardEvent) {
      key = event.key.toLowerCase();
    } else {
      key = event;
    }
    if (gameOver || gameWon) return;

    let lowerBound = currentGuess * 5;
    let upperBound = lowerBound + 5;
    if (currentGuess <= 5) {
      if (/^[a-z]$/.test(key) && currentTile < upperBound) {
        setGuessedWord(guessedWord + key);
        const newBoard = [...board];
        newBoard[currentTile] = {
          value: key.toUpperCase(),
          color: "default",
        };
        setBoard(newBoard);
        setCurrentTile(currentTile + 1);
      } else if (key === "backspace" && currentTile > lowerBound) {
        const newBoard = [...board];
        newBoard[currentTile - 1] = {
          value: "",
          color: "default",
        };
        setGuessedWord(guessedWord.slice(0, -1));
        setBoard(newBoard);
        setCurrentTile(currentTile - 1);
      } else if (key === "enter" && currentTile === upperBound) {
        console.log(
          `guessed word is : ${guessedWord} and required word is : ${reqdWord}`
        );
        if (WORDS.includes(guessedWord)) {
          //word in word list
          if (guessedWord === reqdWord) {
            //word found                                                               // win
            setBoard(changeTileColor(board, lowerBound, upperBound, reqdWord));
            const [newPresent, newAbsent] = changeKeyColor(
              board,
              lowerBound,
              upperBound,
              reqdWord,
              present,
              absent
            );
            setPresent(newPresent);
            setAbsent(newAbsent);
            setGameOver(true);
            setGameWon(true);
            const delay = new Promise((resolve) =>
              setTimeout(() => {
                setShowOverlay(true);
                setResult("win");
              }, 2500)
            );
          } else {
            //word not found
            if (currentGuess === 5) {
              //last try                                                              // Lose
              setBoard(
                changeTileColor(board, lowerBound, upperBound, reqdWord)
              );
              setGameOver(true);
              const delay = new Promise((resolve) =>
                setTimeout(() => {
                  setShowOverlay(true);
                  setResult("lose");
                }, 2500)
              );
            } else {
              //not last try
              const updatedBoard = changeTileColor(
                board,
                lowerBound,
                upperBound,
                reqdWord
              );
              setBoard(updatedBoard);

              const [newPresent, newAbsent] = changeKeyColor(
                board,
                lowerBound,
                upperBound,
                reqdWord,
                present,
                absent
              );
              setPresent(newPresent);
              setAbsent(newAbsent);
              setGuessedWord("");
              setCurrentGuess(currentGuess + 1);
            }
          }
        } else {
          //word not present in word list
          setGuessedWord("");
          const newBoard = [...board];
          for (let i = currentTile - 1; i >= lowerBound; i--) {
            let letter: Letter = {
              value: "",
              color: "default",
              isFlipping: false,
              duration: 0,
            };
            newBoard[i] = letter;
          }
          setBoard(newBoard);
          setCurrentTile(lowerBound);
        }
      } else {
        console.log(
          "something went wrong",
          lowerBound,
          upperBound,
          currentGuess,
          currentTile,
          board
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [board]);

  return (
    <div className="flex-col ">
      <div className="flex justify-center relative">
        <div className="grid grid-cols-5 place-content-center gap-1">
          {board.map((letter, index) => (
            <Tile
              key={index}
              value={letter.value}
              color={letter.color}
              isFlipping={letter.isFlipping}
              duration={letter.duration}
            />
          ))}
        </div>
        {showOverlay && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm flex items-center justify-center"
            initial={{ visibility: "hidden" }}
            animate={
              showOverlay ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            {result === "win" && (
              <div>
                <h2 className="text-green-400 text-2xl">
                  {winMessage[Math.floor(Math.random() * winMessage.length)]}
                </h2>
                <Meaning word={reqdWord} />
              </div>
            )}
            {result === "lose" && (
              <div>
                <h2 className="text-red-500 text-2xl">
                  {loseMessage[Math.floor(Math.random() * loseMessage.length)]}
                </h2>
                <Meaning word={reqdWord} />
              </div>
            )}
            <button
              onClick={handlePlayAgain}
              className="bg-blue-500 hover:bg-blue-700 p-4 m-4 text-white rounded"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
      <Keyboard onKeyPress={handleKeyPress} Present={present} Absent={absent} />
    </div>
  );
}
