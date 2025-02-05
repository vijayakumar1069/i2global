import UserDashboard from "@/components/dashboard components/UserDashboard";
import React, { Suspense } from "react";
import axios from "axios";

import { getUrl } from "@/utils/getUrl";

import { getCookie } from "@/utils/getCookie";
import Greeting from "@/components/dashboard components/Greeting";

async function fetchNotesServerSide() {
  const t = await getCookie();
 

  try {
    const backendUrl = getUrl();

    // Call API to fetch notes
    const response = await axios.get(`${backendUrl}/api/v1/get-all-notes`, {
      headers: {
        Authorization: `Bearer ${t}`, // Add token in Authorization
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include cookies with request
    });

    return response.data.data; // Extract the notes data
  } catch (error) {
    console.error(
      "Error fetching notes:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch notes.");
  }
}

const dashboard = async () => {
  let notes = [];

  try {
    notes = await fetchNotesServerSide(); // Fetch notes with redirection handled inside
  } catch (error) {
    console.error("Error in dashboard:", error.message);
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Greeting />
        <UserDashboard notes={notes} />
      </Suspense>
    </div>
  );
};

export default dashboard;
