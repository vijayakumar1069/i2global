"use client";

import React from "react";
import { Button } from "../ui/button";

const DeleteButton = ({ onDelete, noteId }) => {
  return (
    <Button
      onClick={() => onDelete(noteId)} // Call onDelete handler
      className="border bg-while px-4 py-2 rounded text-red-600 border-red-600 hover:bg-red-100 transition-all"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
