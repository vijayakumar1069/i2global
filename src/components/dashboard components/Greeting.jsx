"use client";

import { getTiming } from "@/utils/getTiming"; // Utility function for greeting timing
import React from "react";
import { useSelector } from "react-redux";
import * as motion from "motion/react-client"; // Importing motion animations

const Greeting = () => {
  const username = useSelector((state) => state.user.username); // Get username from Redux state
  const greet = getTiming(); // Get the appropriate greeting (e.g., Good Morning, etc.)

  return (
    <div className="flex flex-col items-start justify-start  w-fit p-2">
      {/* The animated greeting card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below the screen
        animate={{ opacity: 1, y: 0 }} // Fade in and slide to original position
        transition={{ duration: 1, easing: "ease-in-out" }} // Smooth animation
        className="text-center flex justify-center items-center gap-4  rounded-lg shadow-lg p-2 px-5 max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hello, <span className="text-blue-600">{username || "Guest"}</span>
        </h1>
        <p className="text-lg text-gray-700">
          Have a <span className="text-indigo-500">{greet}</span>!
        </p>
      </motion.div>
    </div>
  );
};

export default Greeting;
