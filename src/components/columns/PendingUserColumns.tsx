import { PendingUser } from "@/services/adminServices";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export interface Column<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: PendingUser) => React.ReactNode;
    cellClassName?: (row: PendingUser) => string;
}

export const getPendingUserColumns = (
    onApprove: (user: PendingUser) => void,
    onReject: (user: PendingUser) => void,
): Column<PendingUser>[] => [
    {
        key: "username",
        header: "Username",
        cellClassName: () => "font-semibold text-gray-900",
    },
    { key: "email", header: "Email" },
    {
        key: "contactName",
        header: "Contact Name",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData.firstName} {row.customerData.lastName}
            </span>
        ),
    },
    {
        key: "companyName",
        header: "Company",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData.businessInfo.companyName || row.companyName}
            </span>
        ),
    },
    {
        key: "phoneNumber",
        header: "Phone",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData.countryCode} {row.customerData.phoneNumber}
            </span>
        ),
    },
    {
        key: "businessType",
        header: "Business Type",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData.businessInfo.businessType || "N/A"}
            </span>
        ),
    },
    {
        key: "location",
        header: "Location",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData.address.city},{" "}
                {row.customerData.address.country}
            </span>
        ),
    },
    {
        key: "submittedAt",
        header: "Submitted",
        render: (row: PendingUser) => (
            <span className="text-gray-700">
                {new Date(row.customerData.submittedAt).toLocaleDateString()}
            </span>
        ),
    },
    {
        key: "status",
        header: "Status",
        render: (row: PendingUser) => (
            <Badge className="bg-yellow-100 text-yellow-700 text-xs rounded-[2] px-2 py-1">
                {row.status}
            </Badge>
        ),
    },
    {
        key: "actions",
        header: "Actions",
        render: (row: PendingUser) => (
            <div className="flex gap-2">
                <ActionButtonWithTooltip
                    icon={<Check className="w-4 h-4" />}
                    tooltip="Approve"
                    onClick={() => onApprove(row)}
                    colorClass="text-green-600 hover:text-green-700"
                />
                <ActionButtonWithTooltip
                    icon={<X className="w-4 h-4" />}
                    tooltip="Reject"
                    onClick={() => onReject(row)}
                    colorClass="text-red-600 hover:text-red-700"
                />
            </div>
        ),
    },
];
