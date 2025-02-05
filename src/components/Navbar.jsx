"use client";

import * as motion from "motion/react-client"; // Motion as requested
import React, { use, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { navbarValues } from "@/utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { userReset } from "@/utils/slice";
import { getUrl } from "@/utils/getUrl";
import useFetch from "@/customehooks/useFetch";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = useSelector((state) => state.user.username);
  const route = useRouter();
  const dispatch = useDispatch();
  const { fetchData } = useFetch();

  // Animation configurations
  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } }, // 0.2s delay between children
  };

  const staggerItem = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

 

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-blue-600">KEEP NOTES</h1>
          </Link>
        </div>

        {/* Large Screen Navigation */}
        <motion.ul
          variants={staggerContainer} // Parent animation for large screen navbar
          initial="initial"
          animate="animate"
          className="hidden md:flex space-x-8 text-lg"
        >
          {navbarValues.map((item) => (
            <motion.li
              key={item.id}
              variants={staggerItem} // Apply animation to each navbar item
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="list-none"
            >
              <Link
                href={item.url}
                className="text-gray-800 hover:text-blue-600"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden flex items-center text-xl text-gray-800">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-gray-100 shadow-md z-10"
        >
          <motion.ul
            variants={staggerContainer} // Parent animation for staggered items
            initial="initial"
            animate="animate"
            exit="initial"
            className="flex flex-col items-center px-4 py-6 space-y-4 text-lg"
          >
            {navbarValues.map((item) => (
              <motion.li
                key={item.id}
                variants={staggerItem} // Animation for each mobile menu item
                className="list-none"
              >
                <Link
                  href={item.url}
                  className="text-gray-800 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)} // Close menu on mobile item click
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
