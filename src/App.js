import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  const [pelaaja, setPelaaja] = useState("X");
  const [headerMsg, setHeaderMsg] = useState("Vuorossa pelaaja " + pelaaja);
  const [boardArray, setBoardArray] = useState([null, null, null,
                                                null, null, null,
                                                null, null, null]);

  const squareClick = (squareNo) => {
    if (boardArray[squareNo] === null) {
      var tempArray = [].concat(boardArray);
      tempArray[squareNo] = pelaaja;
      setBoardArray(tempArray);
      if (isWinningMove()) {
        setHeaderMsg(pelaaja + " VOITTAA!")
      } else if (!tempArray.includes(null)) {
        setHeaderMsg("TASAPELI");
      } else {
        switchPlayers();
      }
    }
  }

  const isWinningMove = () => {
    //winningarrays on array of arrays kaikista mahdollisista voittajakombinaatioista
    var winningArrays = [[boardArray[0], boardArray[1], boardArray[2]], [boardArray[3], boardArray[4], boardArray[5]], [boardArray[6], boardArray[7], boardArray[8]],
                         [boardArray[0], boardArray[3], boardArray[6]], [boardArray[1], boardArray[4], boardArray[7]], [boardArray[2], boardArray[5], boardArray[8]],
                         [boardArray[0], boardArray[4], boardArray[8]], [boardArray[2], boardArray[4], boardArray[6]]]
    for (var i = 0; i < winningArrays.length; i++) {
      if (winningArrays[i][0] === winningArrays[i][1] && winningArrays[i][1] === winningArrays[i][2] && winningArrays[i][0] != null) {
        return true; // jos kaikki voittajakombinaatioarrayn jäsenet ovat samat, voittaja löytyi
      }
    }
    return false;
  }

  const switchPlayers = () => {
    if (pelaaja === "X") {
      setPelaaja("O");
      setHeaderMsg("Vuorossa pelaaja O");
    } else {         
      setPelaaja("X");
      setHeaderMsg("Vuorossa pelaaja X");
    }
  }

  const reset = () => {
    setHeaderMsg("Vuorossa pelaaja X");
    setPelaaja("X");
    setBoardArray([null, null, null,
                   null, null, null,
                   null, null, null]);
  }

  return (
    <div>
      <div class="ticTacToeHeader">{headerMsg}</div>
      <div class="ticTacToe">
        <div class="column">
          <span class="square" onClick={() => squareClick(0)}>{boardArray[0]}</span>
          <span class="square" onClick={() => squareClick(1)}>{boardArray[1]}</span>
          <span class="square" onClick={() => squareClick(2)}>{boardArray[2]}</span>
        </div>
        <div class="column">
          <span class="square" onClick={() => squareClick(3)}>{boardArray[3]}</span>
          <span class="square" onClick={() => squareClick(4)}>{boardArray[4]}</span>
          <span class="square" onClick={() => squareClick(5)}>{boardArray[5]}</span>
        </div>
        <div class="column">
          <span class="square" onClick={() => squareClick(6)}>{boardArray[6]}</span>
          <span class="square" onClick={() => squareClick(7)}>{boardArray[7]}</span>
          <span class="square" onClick={() => squareClick(8)}>{boardArray[8]}</span>
        </div>
      </div>
      <button class="resetButton" onClick={() => reset()}>Uusi peli</button>
    </div>
  );
}
export default App;