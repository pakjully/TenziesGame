import { nanoid } from 'nanoid';
import React from 'react';
import './App.css';
import Confetti from 'react-confetti';
import { Die } from './Die';

export function App() {
  // eslint-disable-next-line no-use-before-define
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  function generateNewDice() {
    const randomNum = Math.floor(Math.random() * 6 + 1);
    return {
      value: randomNum,
      id: nanoid(),
      isHeld: false,
    };
  }

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i += 1) {
      diceArray.push(generateNewDice());
    }
    return diceArray;
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);
    if (allSame && allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) => prevDice.map((die) => (die.isHeld === true ? die : generateNewDice())));
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) => prevDice.map((die) => (
      die.id === id ? { ...die, isHeld: !die.isHeld }
        : die)));
  }

  const dieElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      // eslint-disable-next-line react/jsx-no-bind
      handleClick={holdDice}
      id={die.id}
      isHeld={die.isHeld}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p className="text">
        Roll until all dice are the same. Click each die to
        freeze it at its current value between rolls.
      </p>
      <div className="container">
        <div className="dice-container">
          {dieElements}
        </div>
        <button type="button" className="roll-button" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      </div>
    </main>
  );
}
