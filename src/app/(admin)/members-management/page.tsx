"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/ui/table";
import {
    getPendingUsers,
    approveCustomerData,
    rejectCustomerData,
    PendingUser,
} from "@/services/adminServices";
import { getPendingUserColumns } from "@/components/columns/PendingUserColumns";
import { toast } from "sonner";
import { Loader2, Users } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";

export default function MembersManagementPage() {
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const response = await getPendingUsers();
            setPendingUsers(response.data);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to fetch pending users",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (user: PendingUser) => {
        try {
            setActionLoading(user._id);
            const response = await approveCustomerData(user._id);
            toast.success(response.message || "User approved successfully");
            await fetchPendingUsers();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to approve user",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (user: PendingUser) => {
        try {
            setActionLoading(user._id);
            const response = await rejectCustomerData(user._id);
            toast.success(response.message || "User rejected successfully");
            await fetchPendingUsers();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reject user",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const columns = getPendingUserColumns(handleApprove, handleReject);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-purple" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Members Management
                        </h1>
                        <p className="text-sm text-gray-500">
                            Review and approve pending user registrations
                        </p>
                    </div>
                </div>
                {!loading && (
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">
                            {pendingUsers.length}
                        </span>{" "}
                        pending {pendingUsers.length === 1 ? "user" : "users"}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {loading ? (
                    <div className="p-4">
                        <ShimmerTable
                            rowCount={10}
                            columnCount={10}
                            enableSelection={false}
                        />
                    </div>
                ) : pendingUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            No pending users
                        </h3>
                        <p className="text-sm text-gray-500">
                            All user registrations have been reviewed
                        </p>
                    </div>
                ) : (
                    <DataTable
                        data={pendingUsers as any}
                        columns={columns as any}
                        enableSelection={false}
                    />
                )}
            </div>

            {actionLoading && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-primary-purple" />
                        <span className="text-sm text-gray-700">
                            Processing...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
