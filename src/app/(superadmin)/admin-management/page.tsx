"use client";

import React, { useEffect, useState } from "react";
import {
    getAdminsList,
    deleteAdmin,
    createAdmin,
    AdminUser,
    CreateAdminRequest,
} from "@/services/superAdminServices";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, Shield, AlertTriangle } from "lucide-react";

export default function AdminManagementPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState<{
        id: string;
        username: string;
    } | null>(null);
    const [formData, setFormData] = useState<CreateAdminRequest>({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "ADMIN",
    });

    // Check if all form fields are filled
    const isFormValid = () => {
        return (
            formData.username.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.phoneNumber.trim() !== ""
        );
    };

    // Fetch admins list
    const fetchAdmins = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await getAdminsList(page, 10);
            setAdmins(response.data);
            setCurrentPage(response.pagination.currentPage);
            setTotalPages(response.pagination.totalPages);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch admins",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    // Handle delete admin - open confirmation dialog
    const handleDeleteClick = (adminId: string, username: string) => {
        setAdminToDelete({ id: adminId, username });
        setDeleteDialogOpen(true);
    };

    // Confirm delete admin
    const confirmDelete = async () => {
        if (!adminToDelete) return;

        try {
            await deleteAdmin(adminToDelete.id);
            toast.success("Admin deleted successfully");
            fetchAdmins(currentPage);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete admin",
            );
        } finally {
            setDeleteDialogOpen(false);
            setAdminToDelete(null);
        }
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle create admin
    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setIsSubmitting(true);
            await createAdmin(formData);
            toast.success("Admin created successfully");
            setIsDialogOpen(false);
            setFormData({
                username: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                role: "ADMIN",
            });
            fetchAdmins(currentPage);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create admin",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary-purple" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Admin Management
                        </h1>
                        <p className="text-gray-500 font-lato text-sm mt-1">
                            View and track your admins
                        </p>
                    </div>
                </div>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="gold-reveal-btn font-cormorantGaramond uppercase flex items-center gap-2"
                >
                    <span className="flex gap-1 items-center justify-between">
                        <Plus size={20} />
                        Create Admin
                    </span>
                </Button>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2
                        className="animate-spin text-primary-yellow-1"
                        size={48}
                    />
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary-purple2 font-lora">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {admins.map((admin) => (
                                    <tr
                                        key={admin._id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {admin.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {admin.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    admin.status === "APPROVED"
                                                        ? "bg-green-100 text-green-800"
                                                        : admin.status ===
                                                            "PENDING"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {admin.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {admin.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(
                                                admin.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        admin._id,
                                                        admin.username,
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-900 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                onClick={() => fetchAdmins(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="gold-reveal-btn"
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-4 text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                onClick={() => fetchAdmins(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="gold-reveal-btn"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Alert Dialog */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                            <AlertTriangle size={24} />
                        </div>
                        <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete admin{" "}
                            <strong className="text-gray-900">
                                "{adminToDelete?.username}"
                            </strong>
                            ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setAdminToDelete(null)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Create Admin Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-cormorantGaramond text-primary-yellow-1">
                            Create New Admin
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new admin user.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateAdmin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username *
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-yellow-1"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                onClick={() => setIsDialogOpen(false)}
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="gold-reveal-btn font-cormorantGaramond uppercase"
                                disabled={!isFormValid() || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2
                                            className="animate-spin"
                                            size={16}
                                        />
                                        Creating...
                                    </span>
                                ) : (
                                    <span>Create Admin</span>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
