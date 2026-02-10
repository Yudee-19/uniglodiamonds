"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-gradient flex items-center justify-center">
                <div className="text-primary-yellow-1 text-xl font-lato">
                    Loading...
                </div>
            </div>
        );
    }

    if (!user) return null;

    const defaultBillingAddress =
        user.billingAddress?.find((addr) => addr.isDefault === "Y") ||
        user.billingAddress?.[0];
    const defaultShippingAddress =
        user.shippingAddress?.find((addr) => addr.isDefault === "Y") ||
        user.shippingAddress?.[0];

    return (
        <div className="min-h-screen bg-brand-gradient py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-2">
                        Profile Information
                    </h1>
                    <p className="text-primary-yellow-2 font-lato">
                        Welcome back, {user.customerData?.firstName}{" "}
                        {user.customerData?.lastName}
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Account Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Account Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow label="Username" value={user.username} />
                            <InfoRow label="Email" value={user.email} />
                            <InfoRow label="Status" value={user.status} />
                            <InfoRow label="Role" value={user.role} />
                            <InfoRow
                                label="Member Since"
                                value={new Date(
                                    user.createdAt,
                                ).toLocaleDateString()}
                            />
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Company Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Company Name"
                                value={user.companyName}
                            />
                            <InfoRow
                                label="Contact Name"
                                value={user.contactName}
                            />
                            <InfoRow label="Currency" value={user.currency} />
                            <InfoRow
                                label="Company Group"
                                value={user.companyGroup}
                            />
                            <InfoRow
                                label="Firm Reg No"
                                value={user.firmRegNo}
                            />
                            <InfoRow
                                label="Default Terms"
                                value={user.defaultTerms}
                            />
                            <InfoRow
                                label="Credit Limit"
                                value={`${user.currency} ${user.creditLimit}`}
                            />
                            <InfoRow
                                label="Annual Target"
                                value={`${user.currency} ${user.annualTarget}`}
                            />
                            {user.remarks && (
                                <InfoRow label="Remarks" value={user.remarks} />
                            )}
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Personal Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Name"
                                value={`${user.customerData?.firstName} ${user.customerData?.lastName}`}
                            />
                            <InfoRow
                                label="Phone"
                                value={`${user.customerData?.countryCode} ${user.customerData?.phoneNumber}`}
                            />
                            <InfoRow
                                label="Landline"
                                value={user.customerData?.landlineNumber}
                            />
                            <InfoRow
                                label="Address"
                                value={`${user.customerData?.address?.street}, ${user.customerData?.address?.city}, ${user.customerData?.address?.state} ${user.customerData?.address?.postalCode}, ${user.customerData?.address?.country}`}
                            />
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Business Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Business Type"
                                value={
                                    user.customerData?.businessInfo
                                        ?.businessType
                                }
                            />
                            <InfoRow
                                label="VAT Number"
                                value={
                                    user.customerData?.businessInfo?.vatNumber
                                }
                            />
                            <InfoRow
                                label="Website"
                                value={
                                    user.customerData?.businessInfo?.websiteUrl
                                }
                                isLink
                            />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Contact Details
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Contact Name"
                                value={user.contactDetail?.contactName}
                            />
                            <InfoRow
                                label="Designation"
                                value={user.contactDetail?.designation}
                            />
                            <InfoRow
                                label="Business Tel 1"
                                value={user.contactDetail?.businessTel1}
                            />
                            <InfoRow
                                label="Business Tel 2"
                                value={user.contactDetail?.businessTel2}
                            />
                            <InfoRow
                                label="Business Fax"
                                value={user.contactDetail?.businessFax}
                            />
                            <InfoRow
                                label="Mobile"
                                value={user.contactDetail?.mobileNo}
                            />
                            <InfoRow
                                label="Personal"
                                value={user.contactDetail?.personalNo}
                            />
                            <InfoRow
                                label="Email"
                                value={user.contactDetail?.email}
                            />
                        </div>
                    </div>

                    {/* Billing Address */}
                    {defaultBillingAddress && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Billing Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                <InfoRow
                                    label="Print Name"
                                    value={defaultBillingAddress.printName}
                                />
                                <InfoRow
                                    label="Address"
                                    value={`${defaultBillingAddress.street}, ${defaultBillingAddress.city}, ${defaultBillingAddress.state} ${defaultBillingAddress.zipCode}, ${defaultBillingAddress.country}`}
                                />
                                <InfoRow
                                    label="VAT No"
                                    value={defaultBillingAddress.vat_No}
                                />
                                <InfoRow
                                    label="GSTN No"
                                    value={defaultBillingAddress.gstn_No}
                                />
                            </div>
                        </div>
                    )}

                    {/* Shipping Address */}
                    {defaultShippingAddress && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Shipping Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                <InfoRow
                                    label="Print Name"
                                    value={defaultShippingAddress.printName}
                                />
                                <InfoRow
                                    label="Address"
                                    value={`${defaultShippingAddress.street}, ${defaultShippingAddress.city}, ${defaultShippingAddress.state} ${defaultShippingAddress.zipCode}, ${defaultShippingAddress.country}`}
                                />
                                <InfoRow
                                    label="VAT No"
                                    value={defaultShippingAddress.vat_No}
                                />
                                <InfoRow
                                    label="GSTN No"
                                    value={defaultShippingAddress.gstn_No}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper Component
function InfoRow({
    label,
    value,
    isLink = false,
}: {
    label: string;
    value?: string;
    isLink?: boolean;
}) {
    if (!value) return null;

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-primary-yellow-2 font-medium">{label}:</span>
            {isLink ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-yellow-1 hover:text-primary-yellow-3 transition-colors underline"
                >
                    {value}
                </a>
            ) : (
                <span className="text-white">{value}</span>
            )}
        </div>
    );
}
