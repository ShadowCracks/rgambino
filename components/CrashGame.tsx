// Import the necessary libraries
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Rocket from '../public/images/rocket.svg'; // Import the SVG image file
import RocketMovement from './RocketMovement';

// Define the types for Props
type Props = {};

// Main functional component
const CrashGame: React.FC<Props> = () => {
  // State variables
  const [gameState, setGameState] = useState("ready"); // Keeps track of the game state
  const [multiplier, setMultiplier] = useState(1); // Keeps track of the multiplier
  const [currentBet, setCurrentBet] = useState(0); // Keeps track of the current bet
  const [userBalance, setUserBalance] = useState(100); // Keeps track of the user balance
  const [userWon, setUserWon] = useState(false); // Keeps track of whether user won or lost

  // Function to start the game
  const startGame = () => {
    if (gameState === "ready") {
      setGameState("playing"); // Change the game state to "playing"
      setMultiplier(1); // Reset the multiplier
      setCurrentBet(Math.floor(Math.random() * userBalance) + 1); // Set the current bet
      setUserWon(false); // Reset the userWon state
    }
  };

  // Function to cash out
  const cashOut = () => {
    if (gameState === "playing") {
      setUserWon(true); // Set userWon to true
      setUserBalance((prevBalance) =>
        prevBalance + Math.min(currentBet * multiplier, userBalance)
      );
      setGameState("crashed"); // Change the game state to "crashed"
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setUserWon(false); // Reset userWon
    setCurrentBet(0); // Reset currentBet
    setMultiplier(1); // Reset multiplier
    setGameState("ready"); // Change the game state to "ready"
  };

  // useEffect hook for game logic
  useEffect(() => {
    let timerId: NodeJS.Timeout; // Initialize the timerId

    // Function to update the multiplier and timer
    const updateMultiplier = () => {
      if (gameState === "playing") {
        setMultiplier((prevMultiplier) => prevMultiplier + 0.01); // Increase the multiplier
        const randomNum = Math.random();

        // If the game should crash
        if (randomNum < 1 / (101 - multiplier) && multiplier > 1 && multiplier < 101) {
          clearTimeout(timerId); // Clear the timer
          setGameState("crashed"); // Change the game state to "crashed"
          setUserBalance((prevBalance) => prevBalance - currentBet); // Decrease the user balance by the current bet
        }
      }
    };

    // Set the interval for the game loop
    timerId = setInterval(updateMultiplier, 150);

    // Clear interval when the component unmounts
    return () => clearTimeout(timerId);
  }, [gameState, multiplier, currentBet]); // Run useEffect whenever these dependencies change

  // useEffect hook for resetting the game
  useEffect(() => {
    if (gameState === "crashed") {
      const restartTimer = setTimeout(() => {
        resetGame(); // Call the resetGame function after 10 seconds
      }, 10000); 

      // Clear timeout when the component unmounts
      return () => clearTimeout(restartTimer);
    }
  }, [gameState]); // Run useEffect whenever gameState changes

  // Function to handle bet change
  const handleBetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const betAmount = parseFloat(event.target.value);
    setCurrentBet(Math.min(betAmount, userBalance)); // Update currentBet with the minimum of betAmount and userBalance
  };

  // Render
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1>Crash Game</h1>
        <p>User Balance: {userBalance.toFixed(2)} Crypto</p>
        <input
          type="number"
          value={currentBet}
          onChange={handleBetChange}
          min={0}
          max={userBalance}
          step={0.01}
          disabled={gameState === "playing"}
          className="border border-blue-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-blue-500"
        />
        {gameState === "ready" && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={startGame}
          >
            Start Game
          </motion.button>
        )}
        {gameState === "playing" && (
          <>
            <p>Multiplier: {multiplier.toFixed(2)}</p>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={cashOut}
            >
              Cash Out
            </motion.button>
            <RocketMovement gameState={gameState} multiplier={multiplier} Rocket={Rocket} />
          </>
        )}
        {gameState === "crashed" && (
          <p>
            Game Crashed! {userWon ? "You won." : "You lost."}
          </p>
        )}
      </div>
    </div>
  );
};

// Export the CrashGame component
export default CrashGame;
