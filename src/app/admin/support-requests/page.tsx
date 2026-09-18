import React from "react";
import AdminSupportClient from "./AdminSupportClient";
import { getSupportRequests } from "./actions";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - Support Requests",
};

export default async function AdminSupportRequestsPage() {
  const { success, data, error } = await getSupportRequests();

  if (!success) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center space-y-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Failed to load data</h2>
          <p className="text-gray-500">{error || "An unknown error occurred while fetching requests."}</p>
        </div>
      </div>
    );
  }

  return <AdminSupportClient initialRequests={data || []} />;
}
