"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { getUrl } from "@/utils/getUrl";
import useFetch from "@/customehooks/useFetch";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userReset } from "@/utils/slice";

const UserNavbar = () => {
  const { fetchData } = useFetch();
  const route = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const backendUrl = getUrl(); // Backend URL e.g., http://localhost:5000
      const endpoint = `${backendUrl}/api/v1/user-auth/logout`;

      // Call the logout endpoint
      const responseData = await fetchData(endpoint, "POST"); // No body passed
    

      if (responseData && responseData.statusCode === 200) {
        dispatch(userReset()); // Reset user state (Redux)
        route.push("/signIn"); // Redirect to login page
      }
    } catch (err) {
      console.error("Logout Error:", err);
      alert(err.message || "Logout failed. Please try again.");
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg z-20">
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-tight text-white cursor-pointer hover:opacity-90 transition-opacity duration-300">
              KEEP NOTES
            </h1>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="flex items-center">
          <Button
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300"
            onClick={() => handleLogout()} // Add actual logout functionality here
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
