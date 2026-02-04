"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { extendHoldDiamond } from "@/services/holdServices";
import { toast } from "sonner";
import { Clock, Loader2 } from "lucide-react";

interface ExtendHoldDialogProps {
    open: boolean;
    onClose: () => void;
    stockRef: string;
    userId: string;
    onSuccess: () => void;
}

const HOLD_PERIODS = [
    { label: "24 Hours", hours: 24 },
    { label: "48 Hours", hours: 48 },
    { label: "3 Days", hours: 72 },
    { label: "5 Days", hours: 120 },
    { label: "7 Days", hours: 168 },
    { label: "10 Days", hours: 240 },
];

export default function ExtendHoldDialog({
    open,
    onClose,
    stockRef,
    userId,
    onSuccess,
}: ExtendHoldDialogProps) {
    const [selectedHours, setSelectedHours] = useState<number | null>(null);
    const [isExtending, setIsExtending] = useState(false);

    const handleExtendHold = async () => {
        if (!selectedHours) {
            toast.error("Please select a hold period");
            return;
        }

        try {
            setIsExtending(true);
            await extendHoldDiamond({
                userId,
                stockRef,
                hours: selectedHours,
            });
            toast.success(
                `Hold extended for ${selectedHours / 24} day(s) successfully`,
            );
            onSuccess();
            onClose();
            setSelectedHours(null);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to extend hold";
            toast.error(errorMessage);
        } finally {
            setIsExtending(false);
        }
    };

    const handleClose = () => {
        if (!isExtending) {
            setSelectedHours(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader className="border-b border-gray-200 pb-4">
                    <DialogTitle className="text-2xl font-bold text-primary-purple font-cormorantGaramond flex items-center gap-2">
                        <Clock className="w-6 h-6 text-primary-yellow-1" />
                        Extend Hold Period
                    </DialogTitle>
                    <DialogDescription className="font-lora text-gray-600">
                        Select how long you want to extend the hold for{" "}
                        <span className="font-semibold text-primary-purple">
                            {stockRef}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-3">
                    {HOLD_PERIODS.map((period) => (
                        <button
                            key={period.hours}
                            onClick={() => setSelectedHours(period.hours)}
                            disabled={isExtending}
                            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 font-lora text-left ${
                                selectedHours === period.hours
                                    ? "border-primary-purple bg-primary-purple/5 shadow-md"
                                    : "border-gray-200 hover:border-primary-yellow-1 hover:bg-gray-50"
                            } ${isExtending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {period.label}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {period.hours} hours
                                    </div>
                                </div>
                                {selectedHours === period.hours && (
                                    <div className="w-5 h-5 rounded-full bg-primary-purple flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary-yellow-1" />
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 border-t border-gray-200 pt-4">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isExtending}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 font-lora"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleExtendHold}
                        disabled={!selectedHours || isExtending}
                        className="purple-reveal-btn font-lora uppercase"
                    >
                        {isExtending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                <span>Extending...</span>
                            </>
                        ) : (
                            <span>Confirm Extension</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
