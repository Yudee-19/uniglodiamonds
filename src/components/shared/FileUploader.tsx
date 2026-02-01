"use client";

import React, { useRef, useState } from "react";
import { Upload, X, FileIcon } from "lucide-react";

interface FileUploaderProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
    accept?: string;
    maxFiles?: number;
    label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    files,
    onFilesChange,
    accept = "image/*,application/pdf",
    maxFiles = 10,
    label = "Please Upload Photos And/or Certificates",
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = [...files, ...newFiles].slice(0, maxFiles);
            onFilesChange(totalFiles);
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const totalFiles = [...files, ...droppedFiles].slice(0, maxFiles);
        onFilesChange(totalFiles);
    };

    const removeFile = (indexToRemove: number) => {
        const updatedFiles = files.filter(
            (_, index) => index !== indexToRemove,
        );
        onFilesChange(updatedFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            {/* Upload Area */}
            <div
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    bg-primary/80 border-dashed border-2 rounded-md 
                    text-white font-lora px-8 py-8 text-lg 
                    cursor-pointer flex flex-col items-center justify-center
                    transition-all duration-300 hover:bg-primary
                    ${
                        isDragging
                            ? "border-primary-yellow-1 bg-primary scale-105"
                            : "border-primary-purple-dark"
                    }
                `}
            >
                <Upload
                    className={`mb-3 transition-transform duration-300 ${
                        isDragging ? "scale-110" : ""
                    }`}
                    size={40}
                />
                <p className="text-center mb-2">{label}</p>
                <p className="text-sm text-slate-300 text-center">
                    {isDragging
                        ? "Drop files here"
                        : "Click to browse or drag and drop"}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                    Supports images and PDF files (Max {maxFiles} files)
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept={accept}
                />
            </div>

            {/* File Preview Section */}
            {files.length > 0 && (
                <div className="mt-6">
                    <label className="block font-lora text-primary mb-3 font-semibold">
                        Selected Files ({files.length})
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="relative group bg-white/10 rounded-lg overflow-hidden border border-slate-600 hover:border-primary transition-colors"
                            >
                                {/* Preview */}
                                {file.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-24 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-24 flex items-center justify-center bg-slate-700">
                                        <FileIcon
                                            className="text-white"
                                            size={32}
                                        />
                                    </div>
                                )}

                                {/* File Name */}
                                <div className="p-2 bg-black/50">
                                    <p
                                        className="text-white text-xs truncate"
                                        title={file.name}
                                    >
                                        {file.name}
                                    </p>
                                    <p className="text-slate-400 text-xs">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Remove file"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
