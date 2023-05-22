import React, {useState, useEffect} from "react";
const combinations = require("combinations");

function App() {
     // formats
     const boxFormatDefault =
          "border-2 border-black border-dashed w-[100px] h-[100px] text-3xl p-3";
     const boxFormatXTic =
          "border-2 border-black border-dashed w-[100px] h-[100px] text-3xl bg-blue-100 p-3";
     const boxFormatOTic =
          "border-2 border-black border-dashed w-[100px] h-[100px] text-3xl bg-red-100 p-3";

     // initialize tic array
     const initialArray = new Array();
     for (let i = 0; i < 9; i++) {
          initialArray.push({
               id: i,
               tic: "",
               format: boxFormatDefault,
          });
     }

     // state
     const [tics, setTics] = useState(initialArray);
     const [currentTic, setCurrentTic] = useState({
          tic: "X",
          format: boxFormatXTic,
     });
     const [winner, setWinner] = useState("");
     const [count, setCount] = useState(0);

     // add tics function
     const addTics = (item: any) => {
          const ticToBeAdded = () => {
               if (currentTic.tic === "O" && item.tic === "") {
                    return {
                         tic: "X",
                         format: boxFormatXTic,
                    };
               } else if (currentTic.tic === "X" && item.tic === "") {
                    return {
                         tic: "O",
                         format: boxFormatOTic,
                    };
               } else {
                    return currentTic;
               }
          };

          setCurrentTic(ticToBeAdded);

          const newArray = tics.map((i) => {
               if (i.id === item.id && item.tic === "") {
                    return {
                         ...i,
                         tic: currentTic.tic,
                         format: currentTic.format,
                    };
               }
               return i;
          });

          if (winner === "") {
               setTics(newArray);
          }

          setCount(count + 1);
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
          const isolatedKeysCombosFiltered = isolatedKeysCombos.filter(
               (item: any) => item.length === 3
          );

          const checkCombination = (winningCombos: any, combination: any) => {
               return JSON.stringify(winningCombos).includes(
                    JSON.stringify(combination)
               );
          };

          const result = () => {
               let arr = [];
               for (let i = 0; i < isolatedKeysCombosFiltered.length; i++) {
                    arr.push(
                         checkCombination(
                              winningCombinations,
                              isolatedKeysCombosFiltered[i]
                         )
                    );
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
               setWinner("The winner is X !!!");
          } else if (winO === true && winX === false) {
               setWinner("The winner is O !!!");
          } else if (count === 9) {
               setWinner("It's a tie !!!");
          }
     }, [tics]);

     // restart game

     const restartGame = () => {
          setTics(initialArray);
          setCurrentTic({tic: "X", format: boxFormatXTic});
          setWinner("");
          setCount(0);
     };

     // render
     return (
          <>
               <div className="font-space">
                    <div className="flex justify-center p-10 text-4xl pb-20 font-bold">
                         Dan's Tic and Tac and Toe
                    </div>
                    <div className="flex justify-center p-3 pb-10">
                         <ul className="grid grid-cols-3">
                              {tics.map((item) => (
                                   <li className="p-3" key={item.id}>
                                        <button
                                             onClick={() => {
                                                  addTics(item);
                                             }}
                                             className={item.format}
                                        >
                                             {item.tic}
                                        </button>
                                   </li>
                              ))}
                         </ul>
                    </div>

                    <div className="flex justify-center p-3 pb-10">
                         <button
                              onClick={() => restartGame()}
                              className="
                              border-2 border-dashed border-black w-[200px] h-[50px] bg-purple-100 text-2xl
                              "
                         >
                              Restart
                         </button>
                    </div>
                    <div className="flex justify-center p-3 text-3xl">
                         {winner}
                    </div>
               </div>
          </>
     );
}

export default App;
