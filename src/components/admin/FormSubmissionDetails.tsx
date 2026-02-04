"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    FormSubmission,
    updateFormStatus,
    deleteFormSubmission,
} from "@/services/formServices";
import { toast } from "sonner";
import { Trash2, Check, X, ExternalLink } from "lucide-react";
import Image from "next/image";

interface FormSubmissionDetailsProps {
    submission: FormSubmission;
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export default function FormSubmissionDetails({
    submission,
    open,
    onClose,
    onUpdate,
}: FormSubmissionDetailsProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStatusUpdate = async (
        status: "PENDING" | "APPROVED" | "REJECTED",
    ) => {
        try {
            setIsUpdating(true);
            await updateFormStatus(submission._id, status);
            toast.success(`Status updated to ${status}`);
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this submission?")) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteFormSubmission(submission._id);
            toast.success("Submission deleted successfully");
            onUpdate();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete submission");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Submission Details
                    </DialogTitle>
                    <DialogDescription>
                        Review and manage this form submission
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                submission.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : submission.status === "APPROVED"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                        >
                            {submission.status}
                        </span>
                        <p className="text-sm text-gray-500">
                            Submitted on{" "}
                            {new Date(submission.createdAt).toLocaleString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                },
                            )}
                        </p>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{submission.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">
                                    {submission.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">
                                    {submission.countryCode}{" "}
                                    {submission.phoneNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">
                                    {submission.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Diamond Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Diamond Information
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Material
                                </p>
                                <p className="font-medium">
                                    {submission.material}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Description
                                </p>
                                <p className="font-medium">
                                    {submission.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    {submission.images && submission.images.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4">
                                Uploaded Images ({submission.images.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {submission.images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-200">
                                            <Image
                                                src={image.s3Url}
                                                alt={image.fileName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <a
                                            href={image.s3Url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                        >
                                            <ExternalLink className="text-white" />
                                        </a>
                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            {image.fileName}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {(
                                                image.fileSize /
                                                1024 /
                                                1024
                                            ).toFixed(2)}{" "}
                                            MB
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    {/* Delete Button */}
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting || isUpdating}
                        className="flex items-center gap-2"
                    >
                        <Trash2 size={16} />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>

                    <div className="flex-1" />

                    {/* Status Action Buttons */}
                    {submission.status !== "REJECTED" && (
                        <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate("REJECTED")}
                            disabled={isUpdating || isDeleting}
                            className="flex items-center gap-2"
                        >
                            <X size={16} />
                            Reject
                        </Button>
                    )}

                    {/* {submission.status !== "APPROVED" && (
                        <Button
                            onClick={() => handleStatusUpdate("APPROVED")}
                            disabled={isUpdating || isDeleting}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                        >
                            <Check size={16} />
                            Approve
                        </Button>
                    )}

                    {submission.status !== "PENDING" && (
                        <Button
                            variant="outline"
                            onClick={() => handleStatusUpdate("PENDING")}
                            disabled={isUpdating || isDeleting}
                            className="flex items-center gap-2"
                        >
                            Reset to Pending
                        </Button>
                    )} */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
