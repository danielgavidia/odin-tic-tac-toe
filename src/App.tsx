import React, { useState, useEffect } from "react";
const combinations = require("combinations");

function App() {
  // initialize tic array
  const initialArray = new Array();
  for (let i = 0; i < 9; i++) {
    initialArray.push({ id: i, tic: "" });
  }

  // state
  const [tics, setTics] = useState(initialArray);
  const [currentTic, setCurrentTic] = useState("X");
  const [winner, setWinner] = useState("");

  // add tics function
  const addTics = (item: any) => {
    const ticToBeAdded = () => {
      if (currentTic === "O" && item.tic === "") {
        return "X";
      } else if (currentTic === "X" && item.tic === "") {
        return "O";
      } else {
        return currentTic;
      }
    };

    const newArray = tics.map((i) => {
      if (i.id === item.id && item.tic === "") {
        return { ...i, tic: currentTic };
      }
      return i;
    });

    if (winner === "") {
      setTics(newArray);
    }

    setCurrentTic(ticToBeAdded);
  };

  console.log(winner);

  // determine winner function
  const determineWinner = (ticType: string) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // isolate tics
    const isolated = tics.filter((item) => item.tic === ticType);
    // get tic ids, their locs
    const isolatedKeys = isolated.map((item) => item.id);
    // get all possible combinations of tic ids
    const isolatedKeysCombos = combinations(isolatedKeys);
    // get only combinations with length of 3
    const isolatedKeysCombosFiltered = isolatedKeysCombos.filter((item: any) => item.length === 3);

    const checkCombination = (winningCombos: any, combination: any) => {
      return JSON.stringify(winningCombos).includes(JSON.stringify(combination));
    };

    const result = () => {
      let arr = [];
      for (let i = 0; i < isolatedKeysCombosFiltered.length; i++) {
        arr.push(checkCombination(winningCombinations, isolatedKeysCombosFiltered[i]));
      }

      if (arr.includes(true)) {
        return true;
      } else {
        return false;
      }
    };

    return result();
  };

  // declare winner
  useEffect(() => {
    const winX = determineWinner("X");
    const winO = determineWinner("O");
    if (winX === true && winO === false) {
      setWinner("The winner is X!!!");
    } else if (winO === true && winX === false) {
      setWinner("The winner is O!!!");
    }
  }, [tics]);

  // render
  return (
    <>
      <div>Dan's Tic-Tac-Toe Game</div>
      <ul className="grid grid-cols-3">
        {tics.map((item) => (
          <li className="p-1" key={item.id}>
            <button
              onClick={() => {
                addTics(item);
              }}
              className="border-2 border-black w-[40px] h-[40px]"
            >
              {item.tic}
            </button>
          </li>
        ))}
      </ul>
      <div>{winner}</div>
    </>
  );
}

export default App;
