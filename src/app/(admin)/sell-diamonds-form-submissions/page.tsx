"use client";

import { useState, useEffect } from "react";
import { Eye, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllFormSubmissions, FormSubmission } from "@/services/formServices";
import { toast } from "sonner";
import FormSubmissionDetails from "@/components/admin/FormSubmissionDetails";

export default function SellDiamondsFormSubmissionsPage() {
    const [groupedSubmissions, setGroupedSubmissions] = useState<
        Record<string, FormSubmission[]>
    >({});
    const [expandedEmails, setExpandedEmails] = useState<Set<string>>(
        new Set(),
    );
    const [selectedSubmission, setSelectedSubmission] =
        useState<FormSubmission | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubmissions = async () => {
        try {
            setIsLoading(true);
            const response = await getAllFormSubmissions(1, 100);

            // Group submissions by email
            const grouped = response.data.reduce(
                (acc, submission) => {
                    if (!acc[submission.email]) {
                        acc[submission.email] = [];
                    }
                    acc[submission.email].push(submission);
                    return acc;
                },
                {} as Record<string, FormSubmission[]>,
            );

            setGroupedSubmissions(grouped);
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch form submissions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const toggleEmail = (email: string) => {
        const newExpanded = new Set(expandedEmails);
        if (newExpanded.has(email)) {
            newExpanded.delete(email);
        } else {
            newExpanded.add(email);
        }
        setExpandedEmails(newExpanded);
    };

    const getLastSubmittedDate = (submissions: FormSubmission[]) => {
        const latest = submissions.reduce((prev, current) =>
            new Date(current.createdAt) > new Date(prev.createdAt)
                ? current
                : prev,
        );
        return new Date(latest.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-cormorantGaramond">
                        Buy Form Submissions
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage customer diamond buy requests
                    </p>
                </div>
                <Button
                    onClick={fetchSubmissions}
                    className="flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Refresh
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-900 text-white">
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Sr
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Submissions
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Last Submitted
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(groupedSubmissions).map(
                            ([email, submissions], index) => (
                                <>
                                    {/* Main Row */}
                                    <tr
                                        key={email}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {submissions.length} submission
                                                {submissions.length > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {getLastSubmittedDate(submissions)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    toggleEmail(email)
                                                }
                                                className="flex items-center gap-1"
                                            >
                                                View
                                                {expandedEmails.has(email) ? (
                                                    <ChevronUp size={14} />
                                                ) : (
                                                    <ChevronDown size={14} />
                                                )}
                                            </Button>
                                        </td>
                                    </tr>

                                    {/* Expanded Submissions */}
                                    {expandedEmails.has(email) && (
                                        <tr key={`${email}-expanded`}>
                                            <td
                                                colSpan={5}
                                                className="bg-slate-900 p-0"
                                            >
                                                <div className="p-6">
                                                    <h3 className="text-white font-semibold mb-4">
                                                        Submissions from {email}
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {submissions.map(
                                                            (submission) => (
                                                                <div
                                                                    key={
                                                                        submission._id
                                                                    }
                                                                    className="bg-white rounded-lg p-4"
                                                                >
                                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                                        <div>
                                                                            <p className="text-xs text-gray-500 mb-1">
                                                                                Name
                                                                            </p>
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                {
                                                                                    submission.name
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-xs text-gray-500 mb-1">
                                                                                Phone
                                                                            </p>
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                {
                                                                                    submission.countryCode
                                                                                }{" "}
                                                                                {
                                                                                    submission.phoneNumber
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-xs text-gray-500 mb-1">
                                                                                Carat
                                                                                /
                                                                                Material
                                                                            </p>
                                                                            <p className="text-sm font-medium text-gray-900">
                                                                                {
                                                                                    submission.material
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-xs text-gray-500 mb-1">
                                                                                Status
                                                                            </p>
                                                                            <span
                                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                                                                                    submission.status ===
                                                                                    "PENDING"
                                                                                        ? "bg-yellow-100 text-yellow-800"
                                                                                        : submission.status ===
                                                                                            "APPROVED"
                                                                                          ? "bg-green-100 text-green-800"
                                                                                          : "bg-red-100 text-red-800"
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    submission.status
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-4 flex items-center justify-between">
                                                                        <p className="text-xs text-gray-500">
                                                                            Submitted:{" "}
                                                                            {new Date(
                                                                                submission.createdAt,
                                                                            ).toLocaleString(
                                                                                "en-US",
                                                                                {
                                                                                    month: "short",
                                                                                    day: "numeric",
                                                                                    year: "numeric",
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                },
                                                                            )}
                                                                        </p>
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                setSelectedSubmission(
                                                                                    submission,
                                                                                )
                                                                            }
                                                                            className="flex items-center gap-1"
                                                                        >
                                                                            <Eye
                                                                                size={
                                                                                    14
                                                                                }
                                                                            />
                                                                            View
                                                                            Details
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ),
                        )}
                    </tbody>
                </table>

                {Object.keys(groupedSubmissions).length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No submissions found</p>
                    </div>
                )}
            </div>

            {/* Details Dialog */}
            {selectedSubmission && (
                <FormSubmissionDetails
                    submission={selectedSubmission}
                    open={!!selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                    onUpdate={fetchSubmissions}
                />
            )}
        </div>
    );
}
