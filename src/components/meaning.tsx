import React, { useState, useEffect } from "react";

interface MeaningProps {
  word: string;
}

const Meaning = ({ word }: MeaningProps) => {
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    const fetchMeaning = async () => {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const data = await response.json();
        setMeaning(data[0]["meanings"][0]["definitions"][0]["definition"]);
      } catch (error) {
        console.error("Error fetching word meaning:", error);
        setMeaning("");
      }
    };

    fetchMeaning();
  }, [word]);

  return (
    <div className="text-white">
      <p>Word is : {word}</p>
      <p className="text-gray-300">
        {meaning !== "" ? "Meaning : " + meaning : meaning}
      </p>
    </div>
  );
};

export default Meaning;
