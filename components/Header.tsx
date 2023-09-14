import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import gamesImage from '../public/images/gamesImage.png'; // Use the relative path to the image

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto">
        <ul className="flex items-center space-x-4 justify-between">
          <li className="flex">
            {/* Only display the image without the "Games" text */}
            <motion.img src={gamesImage.src} alt="Games" 
             className="w-10 h-10"
             whileHover={{ rotateZ: 180 }} // Rotate 360 degrees on hover
              transition={{ duration: 0.3 }} // Animation duration
             />
          </li>
          <li>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Sign Up
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}


