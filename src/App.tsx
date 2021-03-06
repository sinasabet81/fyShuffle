import React, { useState } from "react";
import styled from "styled-components/macro";

export const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [shuffled, setShuffled] = useState([] as string[]);

  return (
    <div>
      <header>
        <h1>Fisher-Yates Shuffle</h1>
      </header>
      <div>
        <Textarea onChange={e => setInput(e.target.value)} value={input} />
      </div>
      <div>
        <button
          onClick={() => setShuffled(fyShuffle(parseItems(input)))}
          type="button"
        >
          Shuffle
        </button>
      </div>
      <div>
        <Textarea readOnly value={shuffled.join("\n")} />
      </div>
    </div>
  );
};

const parseItems = (input: string) =>
  input
    .trim()
    .split("\n")
    .flatMap(item => item.split(","))
    .map(item => item.trim());

const Textarea = styled.textarea`
  height: 100px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

// Fisher-Yates shuffle, in-place
// see https://bost.ocks.org/mike/shuffle/ for inspiration
const fyShuffle = (items: string[]) => {
  const shuffled = [];
  while (items.length) {
    const randomIndex = rngInt(0, items.length);
    shuffled.push(items[randomIndex]);
    const popped = items.pop() as string;
    if (randomIndex !== items.length) {
      items[randomIndex] = popped;
    }
  }
  return shuffled;
};

// Generates a random number between 0 and 1; [0,1)
const rng = () => {
  const randomBuffer = new Uint32Array(1);
  // get 32 bits of randomness
  window.crypto.getRandomValues(randomBuffer);
  // convert to randomness between 0 and 1
  const randomNumber = randomBuffer[0] / (0xffffffff + 1);
  return randomNumber;
};

// Generates a random number between min and max -- [min,max)
// min is "inclusive", max is "exclusive"
const rngInt = (min: number, max: number) =>
  Math.floor(rng() * (max - min) + min);
