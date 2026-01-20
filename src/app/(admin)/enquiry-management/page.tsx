"use client";

import React, { useEffect, useState } from "react";
import {
    getAllCarts,
    // type GetAllCartsResponse,
    type AdminCartData,
} from "@/services/adminServices";
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
} from "lucide-react";
import Link from "next/link";

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

const EnquiryRow = ({
    data,
    index,
    currentPage,
    limit,
}: {
    data: AdminCartData;
    index: number;
    currentPage: number;
    limit: number;
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

                            {/* Enquiry Message Placeholder */}
                            {/* <div className="bg-white p-4 rounded-md border border-gray-200">
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                                    Enquiry
                                </h4>
                                <div className="bg-gray-50 p-3 rounded text-sm text-gray-400 italic border border-gray-100">
                                    Message from user
                                    <div className="mt-2 text-xs">
                                        <button
                                            className="px-2 py-1 bg-white border border-gray-200 rounded shadow-sm text-gray-500 hover:text-gray-700"
                                            disabled
                                        >
                                            ↩ Reply
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default function EnquiryManagementPage() {
    const [carts, setCarts] = useState<AdminCartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 10,
    });

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.currentPage);
    }, [pagination.currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    // Calculate placeholder stats based on loaded data (or simply from totalRecords)
    // In a real scenario, you'd want a separate API for aggregate stats.
    const totalEnquiries = pagination.totalRecords;

    // Derived stats for demo purposes
    // Note: Since we only have paginated data, these numbers are just illustrative based on visible data
    const activeHolds = carts.reduce(
        (acc, curr) => acc + (curr.cart.holdItems?.length || 0),
        0,
    );
    const activeCartItems = carts.reduce(
        (acc, curr) => acc + (curr.cart.items?.length || 0),
        0,
    );

    return (
        <div className=" bg-gray-50/50 p-6 space-y-6">
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
                </div>{" "}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    title="In Cart"
                    count={
                        activeCartItems < 10
                            ? `0${activeCartItems}`
                            : activeCartItems
                    }
                    desc="Items currently in users' carts"
                    icon={CheckCircle} // Using CheckCircle as generic active icon
                />
                <StatCard
                    title="Pending Actions"
                    count="00" /* Placeholder as API doesn't provide this specific status yet */
                    desc="Requests waiting for review"
                    icon={XCircle} // Using XCircle as generic pending/alert icon
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
                            {loading ? (
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
                                carts.map((data, index) => (
                                    <EnquiryRow
                                        key={data.cart._id}
                                        data={data}
                                        index={index}
                                        currentPage={pagination.currentPage}
                                        limit={pagination.recordsPerPage}
                                    />
                                ))
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
