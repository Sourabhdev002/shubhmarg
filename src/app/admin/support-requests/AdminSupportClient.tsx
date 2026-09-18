"use client";

import React, { useState } from "react";
import { SupportRequest, SupportStatus } from "@/types/support";
import { updateSupportStatus } from "./actions";
import { Loader2, Search, Mail, MessageSquare } from "lucide-react";

export default function AdminSupportClient({ initialRequests }: { initialRequests: SupportRequest[] }) {
  const [requests, setRequests] = useState<SupportRequest[]>(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredRequests = requests.filter(
    (req) =>
      req.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.reference_id && req.reference_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStatusChange = async (id: string, newStatus: SupportStatus) => {
    setUpdatingId(id);
    const res = await updateSupportStatus(id, newStatus);
    if (res.success) {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
    } else {
      alert(res.error || "Failed to update status");
    }
    setUpdatingId(null);
  };

  const getStatusBadgeClass = (status: SupportStatus) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Support Requests</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search name, email, or ref ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No support requests found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((req) => (
              <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col xl:flex-row gap-6">
                  {/* Left Column: Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{req.full_name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${req.email}`} className="hover:text-brand-maroon">{req.email}</a>
                        </div>
                      </div>
                      <div className="text-right">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as SupportStatus)}
                          disabled={updatingId === req.id}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusBadgeClass(
                            req.status
                          )} focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-maroon disabled:opacity-50 cursor-pointer`}
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        {updatingId === req.id && <Loader2 className="h-4 w-4 animate-spin mt-2 mx-auto text-gray-400" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500 font-medium">Date: </span>
                        <span className="text-gray-900">{new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(new Date(req.created_at))}</span>
                      </div>
                      {req.reference_id && (
                        <div>
                          <span className="text-gray-500 font-medium">Ref ID: </span>
                          <span className="text-gray-900 font-mono bg-gray-100 px-2 py-0.5 rounded">{req.reference_id}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Message */}
                  <div className="flex-1 xl:max-w-lg bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-brand-gold-dark" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{req.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
