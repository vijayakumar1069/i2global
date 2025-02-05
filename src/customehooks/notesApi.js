import { getUrl } from "@/utils/getUrl";
import axios from "axios";

const backendUrl = getUrl();

// Base configuration for the API
const axiosInstance = axios.create({
  baseURL: `${backendUrl}/api/v1`, // Update with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent
});

// Fetch all notes
export const fetchAllNotes = async () => {
  try {
    const response = await axiosInstance.get("/get-all-notes");
    return response.data; // Successfully return data
  } catch (error) {
    console.error(
      "Error fetching notes:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch notes.");
  }
};

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await axiosInstance.post("/create-note", note);
    return response.data; // Return the created note
  } catch (error) {
    console.error(
      "Error creating note:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create note.");
  }
};

// Update an existing note
export const updateNote = async (noteId, note) => {
  try {
    // Correctly construct the URL without a colon (`:`)
    const response = await axiosInstance.put(`/edit-note/${noteId}`, note);

    return response.data; // Return the updated note
  } catch (error) {
    console.error(
      "Error updating note:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to update note.");
  }
};

// Delete a note by ID
export const deleteNote = async (noteId) => {
  try {
    // Correctly construct the URL without a colon (`:`)
    const response = await axiosInstance.delete(`/delete-note/${noteId}`);
    return response.data; // Return the result of deletion
  } catch (error) {
    console.error(
      "Error deleting note:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to delete note.");
  }
};
