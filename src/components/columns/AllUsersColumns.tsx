import { PendingUser } from "@/services/adminServices";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";

export interface Column<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: PendingUser) => React.ReactNode;
    cellClassName?: (row: PendingUser) => string;
}

const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { bg: string; text: string }> = {
        SUPER_ADMIN: { bg: "bg-primary-purple", text: "text-white" },
        ADMIN: { bg: "bg-primary-purple", text: "text-white" },
        USER: { bg: "bg-primary-yellow-1", text: "text-white" },
    };

    const config = roleConfig[role] || roleConfig.USER;
    return (
        <Badge
            className={`${config.bg} ${config.text} rounded-sm text-xs px-2 py-1`}
        >
            {role.replace("_", " ")}
        </Badge>
    );
};

const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
        APPROVED: { bg: "bg-green-100", text: "text-green-700" },
        PENDING: { bg: "bg-yellow-100", text: "text-yellow-700" },
        REJECTED: { bg: "bg-red-100", text: "text-red-700" },
        DEFAULT: { bg: "bg-gray-100", text: "text-gray-700" },
    };

    const config = statusConfig[status] || statusConfig.DEFAULT;
    return (
        <Badge
            className={`${config.bg} ${config.text} text-xs rounded-sm px-2 py-1`}
        >
            {status}
        </Badge>
    );
};

export const getAllUsersColumns = (
    expandedRows: Set<string>,
    onToggleExpand: (userId: string) => void,
): Column<PendingUser>[] => [
    {
        key: "expand",
        header: "",
        render: (row: PendingUser) => (
            <button
                onClick={() => onToggleExpand(row._id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
                {expandedRows.has(row._id) ? (
                    <ChevronDown className="w-4 h-4" />
                ) : (
                    <ChevronRight className="w-4 h-4" />
                )}
            </button>
        ),
    },
    {
        key: "username",
        header: "Username",
        cellClassName: () => "font-semibold text-gray-900",
    },
    { key: "email", header: "Email" },
    {
        key: "role",
        header: "Role",
        render: (row: PendingUser) => getRoleBadge(row.role),
    },
    {
        key: "status",
        header: "Status",
        render: (row: PendingUser) => getStatusBadge(row.status),
    },
    {
        key: "companyName",
        header: "Company",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.businessInfo?.companyName ||
                    row.companyName ||
                    "N/A"}
            </span>
        ),
    },
    {
        key: "contactName",
        header: "Contact Name",
        render: (row: PendingUser) => {
            if (row.customerData) {
                return (
                    <span className="text-gray-800">
                        {row.customerData.firstName} {row.customerData.lastName}
                    </span>
                );
            }
            return <span className="text-gray-500">N/A</span>;
        },
    },
    {
        key: "entityKey",
        header: "Entity Key",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {(row as any).entityKey || "N/A"}
            </span>
        ),
    },
    {
        key: "createdAt",
        header: "Registered",
        render: (row: PendingUser) => (
            <span className="text-gray-700">
                {new Date(row.createdAt).toLocaleDateString()}
            </span>
        ),
    },
];

export const UserDetailsRow = ({ user }: { user: PendingUser }) => {
    return (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Personal Information */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Personal Information
                    </h3>
                    <div className="space-y-2">
                        <DetailItem
                            label="Full Name"
                            value={
                                user.customerData
                                    ? `${user.customerData.firstName} ${user.customerData.lastName}`
                                    : "N/A"
                            }
                        />
                        <DetailItem label="Username" value={user.username} />
                        <DetailItem label="Email" value={user.email} />
                        <DetailItem
                            label="Phone"
                            value={
                                user.customerData
                                    ? `${user.customerData.countryCode} ${user.customerData.phoneNumber}`
                                    : "N/A"
                            }
                        />
                        <DetailItem
                            label="Landline"
                            value={user.customerData?.landlineNumber || "N/A"}
                        />
                    </div>
                </div>

                {/* Business Information */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Business Information
                    </h3>
                    <div className="space-y-2">
                        <DetailItem
                            label="Company Name"
                            value={
                                user.customerData?.businessInfo?.companyName ||
                                user.companyName ||
                                "N/A"
                            }
                        />
                        <DetailItem
                            label="Business Type"
                            value={
                                user.customerData?.businessInfo?.businessType ||
                                "N/A"
                            }
                        />
                        <DetailItem
                            label="VAT Number"
                            value={
                                user.customerData?.businessInfo?.vatNumber ||
                                "N/A"
                            }
                        />
                        <DetailItem
                            label="Website"
                            value={
                                user.customerData?.businessInfo?.websiteUrl ? (
                                    <a
                                        href={
                                            user.customerData.businessInfo
                                                .websiteUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {
                                            user.customerData.businessInfo
                                                .websiteUrl
                                        }
                                    </a>
                                ) : (
                                    "N/A"
                                )
                            }
                        />
                        <DetailItem
                            label="Entity Key"
                            value={(user as any).entityKey || "N/A"}
                        />
                    </div>
                </div>

                {/* Address Information */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Address Information
                    </h3>
                    <div className="space-y-2">
                        <DetailItem
                            label="Street"
                            value={user.customerData?.address?.street || "N/A"}
                        />
                        <DetailItem
                            label="City"
                            value={user.customerData?.address?.city || "N/A"}
                        />
                        <DetailItem
                            label="State"
                            value={user.customerData?.address?.state || "N/A"}
                        />
                        <DetailItem
                            label="Postal Code"
                            value={
                                user.customerData?.address?.postalCode || "N/A"
                            }
                        />
                        <DetailItem
                            label="Country"
                            value={user.customerData?.address?.country || "N/A"}
                        />
                    </div>
                </div>

                {/* Account Information */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Account Information
                    </h3>
                    <div className="space-y-2">
                        <DetailItem
                            label="Role"
                            value={
                                <Badge className="bg-primary-yellow-1 rounded-sm text-white text-xs px-2 py-1">
                                    {user.role.replace("_", " ")}
                                </Badge>
                            }
                        />
                        <DetailItem
                            label="Status"
                            value={
                                <Badge
                                    className={`text-xs px-2 py-1 ${
                                        user.status === "APPROVED"
                                            ? "bg-green-100 text-green-700"
                                            : user.status === "PENDING"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {user.status}
                                </Badge>
                            }
                        />
                        <DetailItem
                            label="Created At"
                            value={new Date(user.createdAt).toLocaleString()}
                        />
                    </div>
                </div>

                {/* Statistics */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Statistics
                    </h3>
                    <div className="space-y-2">
                        <DetailItem
                            label="Total Quotations"
                            value={user.quotations?.length || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <div>
        <span className="text-xs font-medium text-gray-500">{label}:</span>
        <div className="text-sm text-gray-900 mt-0.5">{value || "N/A"}</div>
    </div>
);
