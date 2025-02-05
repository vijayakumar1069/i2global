"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as motion from "motion/react-client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Import Dialog components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

// Zod validation schema for form
const noteSchema = z.object({
  note_title: z.string().min(1, "Title is required"),
  note_content: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content is too long"),
  note_status: z.enum(["pending", "completed"]).optional().default("pending"),
});

// NoteForm Component
const NoteForm = ({ onSubmit, defaultValues = {}, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset, // Import reset from useForm
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues,
  });

  // Reset the form values every time defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues); // Update form with new default values
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data); // Call parent handler
    reset(); // Clear form
    onClose(); // Close modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} // Starts small and faded
      animate={{ opacity: 1, scale: 1 }} // Fully visible with default scale
      transition={{ duration: 0.4, ease: "easeOut" }} // Smooth animation
    >
      {/* Dialog Content */}
      <DialogContent className="sm:max-w-3xl bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg border border-gray-300">
        {/* Dialog Header */}
        <DialogHeader>
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <DialogTitle className="text-4xl font-extrabold text-blue-700">
              {defaultValues.note_title ? "Edit Note" : "Add Note"}
            </DialogTitle>
          </motion.div>
        </DialogHeader>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          {/* Title Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="note_title"
              className="text-lg font-medium text-gray-700 text-right"
            >
              Title
            </Label>
            <Input
              id="note_title"
              {...register("note_title")}
              className="col-span-3 text-base px-4 py-2 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter note title"
            />
            {errors.note_title && (
              <p className="col-span-4 text-red-500 text-sm font-semibold">
                {errors.note_title.message}
              </p>
            )}
          </div>

          {/* Content Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="note_content"
              className="text-lg font-medium text-gray-700 text-right"
            >
              Content
            </Label>
            <Textarea
              id="note_content"
              {...register("note_content")}
              rows={6}
              placeholder="Enter note details..."
              className="col-span-3 text-base px-4 py-2 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.note_content && (
              <p className="col-span-4 text-red-500 text-sm font-semibold">
                {errors.note_content.message}
              </p>
            )}
          </div>

          {/* Status Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="note_status"
              className="text-lg font-medium text-gray-700 text-right"
            >
              Status
            </Label>
            <select
              id="note_status"
              {...register("note_status")}
              className="col-span-3 text-base px-4 py-2 rounded-lg border border-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {errors.note_status && (
              <p className="col-span-4 text-red-500 text-sm font-semibold">
                {errors.note_status.message}
              </p>
            )}
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="flex justify-end space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="submit"
                className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                Save changes
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="px-6 py-3 text-lg font-bold text-gray-700 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all"
              >
                Cancel
              </Button>
            </motion.div>
          </DialogFooter>
        </motion.form>
      </DialogContent>
    </motion.div>
  </Dialog>
  );
};

export default NoteForm;
