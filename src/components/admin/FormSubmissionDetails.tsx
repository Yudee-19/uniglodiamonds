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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    FormSubmission,
    updateFormStatus,
    deleteFormSubmission,
} from "@/services/formServices";
import { toast } from "sonner";
import { Trash2, X, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleStatusUpdate = async (
        status: "PENDING" | "APPROVED" | "REJECTED",
    ) => {
        try {
            setIsUpdating(true);
            await updateFormStatus(submission._id, status);
            toast.success(`Status updated to ${status}`);
            onUpdate();
            onClose();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to update status";
            toast.error(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteFormSubmission(submission._id);
            toast.success("Submission deleted successfully");
            onUpdate();
            onClose();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to delete submission";
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader className="border-b border-gray-200 pb-4">
                        <DialogTitle className="text-3xl font-bold text-primary-purple font-cormorantGaramond">
                            Submission Details
                        </DialogTitle>
                        <DialogDescription className="font-lora text-gray-600">
                            Review and manage this form submission
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-6">
                        {/* Status Badge & Date */}
                        <div className="flex gap-4 items-center justify-between bg-linear-to-r from-primary-purple/5 to-transparent p-4 rounded-lg border-x-4 border-primary-yellow-1">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-500 font-lora uppercase tracking-wider">
                                    Status:
                                </span>
                                <span
                                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold font-lora uppercase tracking-wide ${
                                        submission.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                            : submission.status === "APPROVED"
                                              ? "bg-green-100 text-green-800 border border-green-300"
                                              : "bg-red-100 text-red-800 border border-red-300"
                                    }`}
                                >
                                    {submission.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-lora">
                                Submitted on{" "}
                                <span className="font-semibold text-primary-purple">
                                    {new Date(
                                        submission.createdAt,
                                    ).toLocaleString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </p>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-linear-to-r from-primary-purple/5 to-primary-yellow-1/5 rounded-lg p-6 border border-primary-yellow-1/20">
                            <h3 className="text-xl font-bold text-primary-purple mb-6 font-cormorantGaramond flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary-yellow-1 rounded-full"></div>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide">
                                        Name
                                    </p>
                                    <p className="font-semibold text-lg text-primary-purple font-cormorantGaramond">
                                        {submission.name}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide flex items-center gap-1">
                                        <Mail size={14} /> Email
                                    </p>
                                    <p className="font-medium text-gray-700 font-lora break-all">
                                        {submission.email}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide flex items-center gap-1">
                                        <Phone size={14} /> Phone
                                    </p>
                                    <p className="font-medium text-gray-700 font-lora">
                                        {submission.countryCode}{" "}
                                        {submission.phoneNumber}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide flex items-center gap-1">
                                        <MapPin size={14} /> Address
                                    </p>
                                    <p className="font-medium text-gray-700 font-lora">
                                        {submission.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Diamond Information */}
                        <div className="bg-linear-to-r from-primary-yellow-1/5 to-primary-purple/5 rounded-lg p-6 border border-primary-purple/20">
                            <h3 className="text-xl font-bold text-primary-purple mb-6 font-cormorantGaramond flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary-yellow-1 rounded-full"></div>
                                Diamond Information
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide">
                                        Material / Carat
                                    </p>
                                    <p className="font-semibold text-lg text-primary-purple font-cormorantGaramond">
                                        {submission.material}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-lora uppercase tracking-wide">
                                        Description
                                    </p>
                                    <p className="font-medium text-gray-700 font-lora leading-relaxed">
                                        {submission.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        {submission.images && submission.images.length > 0 && (
                            <div className="bg-white rounded-lg p-6 border-2 border-primary-yellow-1/30">
                                <h3 className="text-xl font-bold text-primary-purple mb-6 font-cormorantGaramond flex items-center gap-2">
                                    <div className="w-1 h-6 bg-primary-yellow-1 rounded-full"></div>
                                    Uploaded Images ({submission.images.length})
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {submission.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-primary-yellow-1 transition-all duration-300">
                                                <img
                                                    src={image.s3Url}
                                                    alt={image.fileName}
                                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <a
                                                href={image.s3Url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute inset-0 bg-primary-purple/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                            >
                                                <ExternalLink
                                                    className="text-primary-yellow-1"
                                                    size={32}
                                                />
                                            </a>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-xs text-gray-600 font-lora truncate">
                                                    {image.fileName}
                                                </p>
                                                <p className="text-xs text-gray-400 font-lora">
                                                    {(
                                                        image.fileSize /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-3 border-t border-gray-200 pt-6">
                        {/* Delete Button with Alert Dialog */}
                        <AlertDialog
                            open={showDeleteDialog}
                            onOpenChange={setShowDeleteDialog}
                        >
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={isDeleting || isUpdating}
                                    className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50 font-lora"
                                >
                                    <Trash2 size={16} />
                                    Delete Submission
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="font-cormorantGaramond text-xl text-primary-purple">
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="font-lora">
                                        This action cannot be undone. This will
                                        permanently delete the form submission
                                        from the database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="font-lora">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="bg-red-600 hover:bg-red-700 font-lora"
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <div className="flex-1" />

                        {/* Status Action Buttons */}
                        {/* {submission.status !== "REJECTED" && (
                            <Button
                                variant="outline"
                                onClick={() => handleStatusUpdate("REJECTED")}
                                disabled={isUpdating || isDeleting}
                                className="flex items-center gap-2 border-red-500 text-red-600 hover:bg-red-50 font-lora"
                            >
                                <X size={16} />
                                Reject
                            </Button>
                        )} */}

                        {submission.status === "REJECTED" && (
                            <Button
                                onClick={() => handleStatusUpdate("PENDING")}
                                disabled={isUpdating || isDeleting}
                                className="purple-reveal-btn font-lora uppercase"
                            >
                                <span>Reset to Pending</span>
                            </Button>
                        )}

                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="border-primary-purple text-primary-purple hover:bg-primary-purple/10 font-lora"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
