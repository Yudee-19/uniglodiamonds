"use client";

import * as React from "react";
import { Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UsersDropdown } from "@/components/ui/users-dropdown";
import { extendHoldDiamond } from "@/services/holdServices";
import { toast } from "sonner";

interface AdminHoldDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    stockRef: string;
}

const DURATION_OPTIONS = [
    { value: "24", label: "24 Hours", hours: 24 },
    { value: "48", label: "2 Days", hours: 48 },
    { value: "72", label: "3 Days", hours: 72 },
    // { value: "96", label: "4 Days", hours: 96 },
    { value: "120", label: "5 Days", hours: 120 },
    // { value: "144", label: "6 Days", hours: 144 },
    { value: "168", label: "7 Days", hours: 168 },
    // { value: "192", label: "8 Days", hours: 192 },
    // { value: "216", label: "9 Days", hours: 216 },
    { value: "240", label: "10 Days", hours: 240 },
];

export function AdminHoldDialog({
    open,
    onOpenChange,
    stockRef,
}: AdminHoldDialogProps) {
    const [selectedUserId, setSelectedUserId] = React.useState("");
    const [selectedDuration, setSelectedDuration] = React.useState("24");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        if (!selectedUserId) {
            toast.error("Please select a user");
            return;
        }

        if (!selectedDuration) {
            toast.error("Please select a duration");
            return;
        }

        const hours = parseInt(selectedDuration);

        try {
            setLoading(true);
            const response = await extendHoldDiamond({
                userId: selectedUserId,
                stockRef: stockRef,
                hours: hours,
            });

            toast.success(
                response.message ||
                    `Diamond held for ${hours} hours successfully`,
            );
            onOpenChange(false);
            // Reset form
            setSelectedUserId("");
            setSelectedDuration("24");
        } catch (error: any) {
            toast.error(error.message || "Failed to hold diamond");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <DialogTitle>Hold Diamond for User</DialogTitle>
                    </div>
                    <DialogDescription>
                        Select a user and duration to hold this diamond. Stock
                        Ref: <span className="font-semibold">{stockRef}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* User Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="user-select">Select User</Label>
                        <UsersDropdown
                            value={selectedUserId}
                            onValueChange={setSelectedUserId}
                        />
                    </div>

                    {/* Duration Selection */}
                    <div className="space-y-3">
                        <Label>Hold Duration</Label>
                        <RadioGroup
                            value={selectedDuration}
                            onValueChange={setSelectedDuration}
                            className="grid grid-cols-2 gap-3"
                        >
                            {DURATION_OPTIONS.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`duration-${option.value}`}
                                    />
                                    <Label
                                        htmlFor={`duration-${option.value}`}
                                        className="font-normal cursor-pointer"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false);
                            setSelectedUserId("");
                            setSelectedDuration("24");
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !selectedUserId}
                        className="rounded-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Holding...
                            </>
                        ) : (
                            "Hold Diamond"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
