import React from "react";

import { timeformat } from "@/utils/timeformat";

import * as motion from "motion/react-client"; // Import motion for animations

import EditButton from "./EditButton"; // Edit Button Component
import DeleteButton from "./DeleteButton"; // Delete Button Component

const NotesCard = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400 font-medium text-lg">
          No notes available to display.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6  bg-gray-50">
      {notes.map((note) => (
        <motion.div
          key={note._id || `${note.note_title}-${Math.random()}`} // Use _id if available, fallback to a unique key

          // Animation for card entry
          initial={{ opacity: 0, scale: 0.9 }} // Starts faded and slightly smaller
          animate={{ opacity: 1, scale: 1 }} // Fully visible and normal scale
          whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} // Slight hover pop-up effect
          whileTap={{ scale: 0.98 }} // Slightly shrink when tapped
          transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation

          className="bg-white border border-gray-200 shadow-md rounded-xl p-6 transition-all relative"
        >
          {/* Decorative Border */}
          <div className="absolute w-[100px] h-[100px] -top-6 -right-6 rotate-12 bg-pink-50 rounded-full blur-xl -z-10"></div>

          {/* Note Title */}
          <h2 className="font-bold text-lg text-gray-800 truncate">
            {note.note_title}
          </h2>

          {/* Note Content */}
          <p className="mt-4 text-gray-600 line-clamp-3 leading-relaxed text-sm">
            {note.note_content}
          </p>

          {/* Status Badge */}
          <span
            className={`mt-4 inline-block px-2 py-1 text-xs font-medium rounded-lg ${
              note.note_status === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {note.note_status}
          </span>

          {/* Last Updated Info */}
          <span className="block mt-4 text-xs text-gray-500">
            <strong>Last Updated:</strong> {timeformat(note.updatedAt)}
          </span>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <motion.div
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <EditButton onEdit={() => onEdit(note._id)} />
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <DeleteButton onDelete={() => onDelete(note._id)} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotesCard;
