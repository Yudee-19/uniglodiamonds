"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/ui/table";
import {
    getPendingUsers,
    getAllUsers,
    approveCustomerData,
    rejectCustomerData,
    PendingUser,
} from "@/services/adminServices";
import { getPendingUserColumns } from "@/components/columns/PendingUserColumns";
import {
    getAllUsersColumns,
    UserDetailsRow,
} from "@/components/columns/AllUsersColumns";
import { toast } from "sonner";
import { Loader2, Users } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import TablePagination from "@/components/ui/tablePagination";

type TabType = "pending" | "all";

export default function MembersManagementPage() {
    const [activeTab, setActiveTab] = useState<TabType>("pending");
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [allUsers, setAllUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    // Pagination state for all users
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

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

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers({ page, limit });
            setAllUsers(response.data);
            setTotalRecords(response.pagination.totalRecords);
            setTotalPages(response.pagination.totalPages);
            setHasNextPage(response.pagination.hasNextPage);
            setHasPrevPage(response.pagination.hasPrevPage);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch all users",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "pending") {
            fetchPendingUsers();
        } else {
            fetchAllUsers();
        }
    }, [activeTab, page, limit]);

    const handleApprove = async (user: PendingUser) => {
        try {
            setActionLoading(user._id);
            const response = await approveCustomerData(user._id);
            toast.success(response.message || "User approved successfully");
            await fetchPendingUsers();
            if (activeTab === "all") {
                await fetchAllUsers();
            }
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
            if (activeTab === "all") {
                await fetchAllUsers();
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reject user",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggleExpand = (userId: string) => {
        setExpandedRows((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    const pendingColumns = getPendingUserColumns(handleApprove, handleReject);
    const allUsersColumns = getAllUsersColumns(
        expandedRows,
        handleToggleExpand,
    );
    const currentUsers = activeTab === "pending" ? pendingUsers : allUsers;

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
                            Review and manage user registrations
                        </p>
                    </div>
                </div>
                {!loading && (
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">
                            {activeTab === "pending"
                                ? pendingUsers.length
                                : totalRecords}
                        </span>{" "}
                        {activeTab === "pending" ? "pending" : "total"}{" "}
                        {currentUsers.length === 1 ? "user" : "users"}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    <button
                        onClick={() => {
                            setActiveTab("pending");
                            setPage(1);
                        }}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === "pending"
                                ? "border-primary-purple text-primary-purple"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Pending Users
                        {pendingUsers.length > 0 && (
                            <span className="ml-2 bg-primary-purple/10 text-primary-purple rounded-full px-2 py-0.5 text-xs font-semibold">
                                {pendingUsers.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("all");
                            setPage(1);
                        }}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === "all"
                                ? "border-primary-purple text-primary-purple"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        All Users
                        {totalRecords > 0 && activeTab === "all" && (
                            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                                {totalRecords}
                            </span>
                        )}
                    </button>
                </nav>
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
                ) : currentUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Users className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {activeTab === "pending"
                                ? "No pending users"
                                : "No users found"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {activeTab === "pending"
                                ? "All user registrations have been reviewed"
                                : "No users are registered in the system"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {(activeTab === "pending"
                                            ? pendingColumns
                                            : allUsersColumns
                                        ).map((column) => (
                                            <th
                                                key={String(column.key)}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentUsers.map((user) => (
                                        <React.Fragment key={user._id}>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                {(activeTab === "pending"
                                                    ? pendingColumns
                                                    : allUsersColumns
                                                ).map((column) => (
                                                    <td
                                                        key={String(column.key)}
                                                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                                                            column.cellClassName
                                                                ? column.cellClassName(
                                                                      user,
                                                                  )
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {column.render
                                                            ? column.render(
                                                                  user,
                                                              )
                                                            : (user[
                                                                  column.key as keyof PendingUser
                                                              ] as React.ReactNode)}
                                                    </td>
                                                ))}
                                            </tr>
                                            {activeTab === "all" &&
                                                expandedRows.has(user._id) && (
                                                    <tr>
                                                        <td
                                                            colSpan={
                                                                allUsersColumns.length
                                                            }
                                                            className="p-0"
                                                        >
                                                            <UserDetailsRow
                                                                user={user}
                                                            />
                                                        </td>
                                                    </tr>
                                                )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination for All Users */}
                        {activeTab === "all" && (
                            <div className="border-t p-4">
                                <TablePagination
                                    total={totalRecords}
                                    page={page}
                                    rowsPerPage={limit}
                                    totalPages={totalPages}
                                    hasNextPage={hasNextPage}
                                    hasPrevPage={hasPrevPage}
                                    onPageChange={setPage}
                                    onRowsPerPageChange={(newLimit) => {
                                        setLimit(newLimit);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        )}
                    </>
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
