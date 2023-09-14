import React from 'react';
import { motion } from 'framer-motion';
import Rocket from '../public/images/rocket.svg';

interface RocketMovementProps {
  gameState: string;
  multiplier: number;
}

const RocketMovement: React.FC<RocketMovementProps> = ({ gameState, multiplier }) => {
  return (
    <div className="relative w-64 h-64 bg-gray-500 rounded-lg overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{ y: multiplier * -10, zIndex: 10 }} // Add a z-index here
        animate={gameState === "crashed" ? "explode" : "fly"}
        variants={{
          fly: { opacity: 1, scale: 1 },
          explode: { opacity: 0, scale: 2 },
        }}
      >
        <Rocket />
      </motion.div>
    </div>
  );
};

export default RocketMovement;

