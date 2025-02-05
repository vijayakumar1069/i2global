"use client";

import React from "react";
import { Button } from "../ui/button";

const EditButton = ({ onEdit }) => {
  return (
    <Button 
      onClick={onEdit}
      className="border  rounded text-blue-600 border-blue-600 bg-blue-50 hover:bg-blue-200 transition-all font-medium shadow-sm hover:shadow-md transform hover:scale-105"
    >
      Edit
    </Button>
  );
};

export default EditButton;
