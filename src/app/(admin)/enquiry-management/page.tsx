"use client";

import React, { useEffect, useState } from "react";
import { getAllCarts, type AdminCartData } from "@/services/adminServices";
import { getAllAdminQueries, replyToQuery } from "@/services/inquiryService";
import { Diamond } from "@/interface/diamondInterface";
import {
    ChevronDown,
    ChevronUp,
    CheckCircle,
    XCircle,
    Clock,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    FileStack,
    Send,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// --- Types ---
interface GroupedQuery {
    userId: string;
    userEmail: string;
    stockRef: string;
    diamondId: Diamond;
    query: string;
    status: "pending" | "answered" | "closed" | "replied";
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
    adminReply?: string;
    repliedAt?: string;
    repliedBy?: string;
}

interface AdminQueriesData {
    email: string;
    queries: GroupedQuery[];
}

// --- Components ---

const StatCard = ({
    title,
    count,
    desc,
    icon: Icon,
}: {
    title: string;
    count: string | number;
    desc: string;
    icon: any;
}) => (
    <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-2 text-gray-600">
            <Icon size={18} />
            <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div>
            <div className="text-3xl font-bold text-gray-900 mb-1 leading-none font-cormorantGaramond">
                {count}
            </div>
            <p className="text-xs text-gray-400">{desc}</p>
        </div>
    </div>
);

const InnerDiamondTable = ({
    items,
    isHold = false,
}: {
    items: { diamond: Diamond }[];
    isHold?: boolean;
}) => {
    if (!items || items.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500 italic">
                No items found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="py-2 px-3">Stock Ref</th>
                        <th className="py-2 px-3">Loc.</th>
                        <th className="py-2 px-3">Number</th>
                        <th className="py-2 px-3">Lab</th>
                        <th className="py-2 px-3">Shape</th>
                        <th className="py-2 px-3">Carat</th>
                        <th className="py-2 px-3">Color</th>
                        <th className="py-2 px-3">Clarity</th>
                        <th className="py-2 px-3">Cut</th>
                        <th className="py-2 px-3">Depth%</th>
                        <th className="py-2 px-3">Table%</th>
                        <th className="py-2 px-3">Price/Ct</th>
                        <th className="py-2 px-3 text-right">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item, idx) => {
                        const d = item.diamond;
                        const totalPrice = d.weight * d.pricePerCts;
                        return (
                            <tr key={d._id || idx} className="hover:bg-gray-50">
                                <td className="py-2 px-3 font-medium text-gray-700">
                                    <Link
                                        href={`/inventory?view=${d.certiNo}`}
                                        className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                    >
                                        {d.stockRef}
                                    </Link>
                                </td>
                                <td className="py-2 px-3 text-gray-500">
                                    {d.country
                                        ? d.country
                                              .substring(0, 2)
                                              .toUpperCase()
                                        : "-"}
                                </td>
                                <td className="py-2 px-3 text-gray-500">
                                    {d.certiNo}
                                </td>
                                <td className="py-2 px-3">{d.lab}</td>
                                <td className="py-2 px-3">{d.shape}</td>
                                <td className="py-2 px-3">{d.weight}</td>
                                <td className="py-2 px-3">{d.color}</td>
                                <td className="py-2 px-3">{d.clarity}</td>
                                <td className="py-2 px-3">{d.cutGrade}</td>
                                <td className="py-2 px-3">{d.depthPerc}%</td>
                                <td className="py-2 px-3">{d.tablePerc}%</td>
                                <td className="py-2 px-3">
                                    ${d.pricePerCts.toLocaleString()}
                                </td>
                                <td className="py-2 px-3 font-medium text-right">
                                    $
                                    {totalPrice.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const QueryItem = ({
    query,
    onReplySuccess,
}: {
    query: GroupedQuery;
    onReplySuccess: () => void;
}) => {
    const [replyText, setReplyText] = useState("");
    const [isReplying, setIsReplying] = useState(false);

    const handleSendReply = async () => {
        if (!replyText.trim()) {
            toast.error("Please enter a reply");
            return;
        }

        try {
            setIsReplying(true);
            await replyToQuery({
                queryId: query.id,
                reply: replyText,
            });
            toast.success("Reply sent successfully");
            setReplyText("");
            onReplySuccess();
        } catch (error: any) {
            toast.error(error || "Failed to send reply");
        } finally {
            setIsReplying(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                label: "Pending",
            },
            replied: {
                bg: "bg-green-100",
                text: "text-green-800",
                label: "Replied",
            },
            answered: {
                bg: "bg-blue-100",
                text: "text-blue-800",
                label: "Answered",
            },
            closed: {
                bg: "bg-gray-100",
                text: "text-gray-800",
                label: "Closed",
            },
        };
        const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.pending;
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
            >
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
            {/* Query Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                            Stone: {query.stockRef}
                        </span>
                        {getStatusBadge(query.status)}
                    </div>
                    <p className="text-xs text-gray-500">
                        {formatDate(query.createdAt)}
                    </p>
                </div>
            </div>

            {/* Diamond Details */}
            <div className="bg-gray-50 rounded p-3 mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Diamond Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                        <span className="text-gray-500">Shape:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.shape}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Carats:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.weight}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Color:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.color}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Clarity:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.clarity}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Cut:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.cutGrade}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Lab:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.lab}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Location:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.country
                                ?.substring(0, 2)
                                .toUpperCase() || "-"}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Net Value:</span>{" "}
                        <span className="font-medium">
                            $
                            {(
                                query.diamondId.weight *
                                query.diamondId.pricePerCts
                            ).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Customer Query */}
            <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Customer Query:
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-100">
                    {query.query}
                </div>
            </div>

            {/* Admin Reply (if exists) */}
            {query.adminReply && (
                <div className="mb-3">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Your Reply:
                    </h4>
                    <div className="bg-green-50 p-3 rounded text-sm text-gray-700 border border-green-100">
                        {query.adminReply}
                        {query.repliedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                                Replied on {formatDate(query.repliedAt)}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Reply Section */}
            {query.status !== "replied" && (
                <div>
                    <div className="flex gap-2">
                        <Textarea
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 text-sm min-h-20"
                            disabled={isReplying}
                        />
                    </div>
                    <div className="mt-2 flex justify-end">
                        <Button
                            onClick={handleSendReply}
                            disabled={isReplying || !replyText.trim()}
                            className="bg-[#26062b] hover:bg-[#26062b]/90 text-white"
                        >
                            {isReplying ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Reply
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EnquiryRow = ({
    data,
    index,
    currentPage,
    limit,
    queriesData,
    onReplySuccess,
}: {
    data: AdminCartData;
    index: number;
    currentPage: number;
    limit: number;
    queriesData?: AdminQueriesData;
    onReplySuccess: () => void;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user, cart } = data;
    const customer = user.customerData;
    const business = customer?.businessInfo;
    const address = customer?.address;

    const fullName = customer
        ? `${customer.firstName} ${customer.lastName}`
        : user.username || "N/A";

    const displayAddress = address
        ? `${address.street}, ${address.city}`
        : "N/A";

    const serialNumber = (currentPage - 1) * limit + (index + 1);

    // Get queries for this user
    const userQueries = queriesData?.queries || [];

    return (
        <React.Fragment>
            <tr
                className={`border-b border-gray-100 transition-colors ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50/50"}`}
            >
                <td className="px-4 py-4 text-sm text-gray-600">
                    {serialNumber}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {fullName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {user.username}
                </td>
                <td
                    className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate"
                    title={user.email}
                >
                    {user.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {customer?.phoneNumber || customer?.countryCode
                        ? `${customer?.countryCode || ""} ${customer?.phoneNumber || ""}`
                        : "N/A"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {user.companyName || business?.companyName || "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {business?.businessType || "Other"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {business?.vatNumber || "-"}
                </td>
                <td
                    className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate"
                    title={displayAddress}
                >
                    {displayAddress}
                </td>
                <td className="px-4 py-4 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-all"
                    >
                        {isExpanded ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td
                        colSpan={10}
                        className="px-6 py-4 bg-gray-50 border-b border-gray-100"
                    >
                        <div className="space-y-6">
                            {/* Cart Items Section */}
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                    Items in cart
                                </div>
                                <InnerDiamondTable items={cart.items} />
                            </div>

                            {/* Hold Items Section */}
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                    Holded Items
                                </div>
                                <InnerDiamondTable
                                    items={cart.holdItems}
                                    isHold={true}
                                />
                            </div>

                            {/* Enquiries Section */}
                            {userQueries.length > 0 && (
                                <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                        Enquiries ({userQueries.length})
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {userQueries.map((query) => (
                                            <QueryItem
                                                key={query.id}
                                                query={query}
                                                onReplySuccess={onReplySuccess}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default function EnquiryManagementPage() {
    const [carts, setCarts] = useState<AdminCartData[]>([]);
    const [queries, setQueries] = useState<AdminQueriesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [queriesLoading, setQueriesLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 10,
    });

    const fetchQueries = async () => {
        try {
            setQueriesLoading(true);
            const response = await getAllAdminQueries();
            if (response.success) {
                setQueries(response.data.groupedQueries);
            }
        } catch (error) {
            console.error("Failed to fetch queries:", error);
            toast.error("Failed to fetch enquiries");
        } finally {
            setQueriesLoading(false);
        }
    };

    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            const response = await getAllCarts({ page, limit: 10 });
            if (response.success) {
                setCarts(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch carts:", error);
            toast.error("Failed to fetch customer data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.currentPage);
        fetchQueries();
    }, [pagination.currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    const handleReplySuccess = () => {
        fetchQueries();
    };

    // Calculate stats
    const totalEnquiries = pagination.totalRecords;
    const activeHolds = carts.reduce(
        (acc, curr) => acc + (curr.cart.holdItems?.length || 0),
        0,
    );
    const activeCartItems = carts.reduce(
        (acc, curr) => acc + (curr.cart.items?.length || 0),
        0,
    );
    const totalQueries = queries.reduce(
        (acc, curr) => acc + curr.queries.length,
        0,
    );
    const pendingQueries = queries.reduce(
        (acc, curr) =>
            acc + curr.queries.filter((q) => q.status === "pending").length,
        0,
    );

    return (
        <div className="bg-gray-50/50 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                    <FileStack className="w-5 h-5 text-primary-purple" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Enquiry Management
                    </h1>
                    <p className="text-gray-500 font-lato text-sm mt-1">
                        Manage customer hold requests and diamond enquiries
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Customers"
                    count={
                        totalEnquiries < 10
                            ? `0${totalEnquiries}`
                            : totalEnquiries
                    }
                    desc="All customer queries received"
                    icon={HelpCircle}
                />
                <StatCard
                    title="Active Holds"
                    count={activeHolds < 10 ? `0${activeHolds}` : activeHolds}
                    desc="Diamonds currently on hold"
                    icon={Clock}
                />
                <StatCard
                    title="Total Enquiries"
                    count={
                        totalQueries < 10 ? `0${totalQueries}` : totalQueries
                    }
                    desc="All diamond enquiries"
                    icon={CheckCircle}
                />
                <StatCard
                    title="Pending Replies"
                    count={
                        pendingQueries < 10
                            ? `0${pendingQueries}`
                            : pendingQueries
                    }
                    desc="Awaiting your response"
                    icon={XCircle}
                />
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#26062b] text-white text-sm">
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Sr
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Name
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Username
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Email
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Phone
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Company
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Business Type
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    VAT Number
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Address
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap text-center">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading || queriesLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-6 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-32 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-40 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-28 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-36 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="h-6 w-6 mx-auto bg-gray-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : carts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        No enquiries found.
                                    </td>
                                </tr>
                            ) : (
                                carts.map((data, index) => {
                                    const userQueryData = queries.find(
                                        (q) => q.email === data.user.email,
                                    );
                                    return (
                                        <EnquiryRow
                                            key={data.cart._id}
                                            data={data}
                                            index={index}
                                            currentPage={pagination.currentPage}
                                            limit={pagination.recordsPerPage}
                                            queriesData={userQueryData}
                                            onReplySuccess={handleReplySuccess}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                        onClick={() =>
                            handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={pagination.currentPage === 1}
                        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from(
                            { length: Math.min(5, pagination.totalPages) },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
                                    pagination.currentPage === page
                                        ? "bg-gray-600 text-white"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() =>
                            handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={
                            pagination.currentPage === pagination.totalPages
                        }
                        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
