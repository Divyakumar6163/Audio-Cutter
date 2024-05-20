"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import AudioFile from "./audioFile";
import AudioCutter from "./audioCutter";
const Button = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const link = "#";
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <Link onClick={handleButtonClick} href={link} style={buttonStyle}>
        Select File
      </Link>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#9b59b6",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Button;
