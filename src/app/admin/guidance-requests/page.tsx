import React from "react";
import AdminDashboardClient from "./AdminDashboardClient";
import { getGuidanceRequests } from "./actions";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - Guidance Requests",
};

export default async function AdminGuidanceRequestsPage() {
  const { success, data, error } = await getGuidanceRequests();

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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

  return <AdminDashboardClient initialRequests={data || []} />;
}
