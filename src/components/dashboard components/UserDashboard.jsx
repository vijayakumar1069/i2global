"use client";

import React, { useState } from "react";

import NoteForm from "./NoteForm"; // Form component for Create/Edit
import NotesCard from "./NotesCard"; // Updated NotesCard component

import { createNote, deleteNote, updateNote } from "@/customehooks/notesApi";
import { FaNotesMedical } from "react-icons/fa";
import { Button } from "../ui/button";

const UserDashboard = ({ notes: initialNotes }) => {
  const [notesState, setNotesState] = useState(initialNotes || []);
  const [selectedNote, setSelectedNote] = useState(null); // For editing
  const [showForm, setShowForm] = useState(false); // Control form visibility

  // Handle Create Note
  const handleCreate = async (noteData) => {
    try {
      const newNote = await createNote(noteData);

      setNotesState((prevNotes) => [...prevNotes, newNote.data]);
    } catch (error) {
      console.error("Error creating note:", error.message);
    } finally {
      setShowForm(false);
    }
  };

  // Handle Update Note
  const handleUpdate = async (noteId, noteData) => {
    try {
      const updatedNote = await updateNote(noteId, noteData);

      setNotesState((prevNotes) =>
        prevNotes.map((note) => (note._id === noteId ? updatedNote.data : note))
      );
    } catch (error) {
      console.error("Error updating note:", error.message);
    } finally {
      setSelectedNote(null);
      setShowForm(false);
    }
  };

  // Handle Delete Note
  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotesState((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteId)
      );
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Handle Edit Note
  const handleEdit = (noteId) => {
    const noteToEdit = notesState.find((note) => note._id === noteId);
    setSelectedNote(noteToEdit);
    setShowForm(true);
  };

  // Handle Form Open for New Note
  const handleNewNote = () => {
    setSelectedNote(null);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex ">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <Button
          onClick={handleNewNote}
          className="border fixed z-50 bottom-4 right-4 px-4 py-2 rounded text-black bg-yellow-400 hover:bg-yellow-600 hover:scale-110"
        >
          <FaNotesMedical size={60} className="text-3xl" />
        </Button>
      </div>

      <NotesCard
        notes={notesState}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Note Form */}
      <NoteForm
        isOpen={showForm}
        onClose={() => setShowForm(false)} // Close form
        onSubmit={(data) => {
          if (selectedNote) {
            handleUpdate(selectedNote._id, data); // Update note
          } else {
            handleCreate(data); // Create note
          }
        }}
        defaultValues={selectedNote || {}}
      />
    </div>
  );
};

export default UserDashboard;
