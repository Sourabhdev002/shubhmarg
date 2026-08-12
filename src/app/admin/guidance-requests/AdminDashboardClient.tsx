"use client";

import React, { useState, useMemo } from "react";
import { GuidanceRequest, RequestStatus, PaymentStatus } from "@/types/admin";
import { updateGuidanceRequestStatus, updatePaymentStatus } from "./actions";
import { 
  Loader2, 
  Search, 
  Filter, 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Banknote
} from "lucide-react";

interface Props {
  initialRequests: GuidanceRequest[];
}

export default function AdminDashboardClient({ initialRequests }: Props) {
  const [requests, setRequests] = useState<GuidanceRequest[]>(initialRequests);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<GuidanceRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [verificationNote, setVerificationNote] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus = statusFilter === "all" || req.status === statusFilter;
      const matchesPayment = paymentFilter === "all" || req.payment_status === paymentFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        req.full_name.toLowerCase().includes(searchLower) ||
        req.reference_id.toLowerCase().includes(searchLower) ||
        req.concern.toLowerCase().includes(searchLower) ||
        req.service.toLowerCase().includes(searchLower) ||
        (req.payment_utr && req.payment_utr.toLowerCase().includes(searchLower));
      return matchesStatus && matchesPayment && matchesSearch;
    });
  }, [requests, statusFilter, paymentFilter, searchQuery]);

  const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
    setIsUpdating(true);
    setError(null);
    
    const res = await updateGuidanceRequestStatus(id, newStatus);
    
    if (res.success) {
      setRequests((prev) => 
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }
    } else {
      setError(res.error || "Failed to update status");
      setTimeout(() => setError(null), 3000);
    }
    
    setIsUpdating(false);
  };
  
  const handlePaymentStatusChange = async (id: string, newStatus: PaymentStatus) => {
    setIsUpdating(true);
    setError(null);
    
    const res = await updatePaymentStatus(id, newStatus, verificationNote);
    
    if (res.success) {
      setRequests((prev) => 
        prev.map((r) => (r.id === id ? { ...r, payment_status: newStatus, paid_at: res.paid_at || r.paid_at, payment_verification_note: verificationNote } : r))
      );
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ 
          ...selectedRequest, 
          payment_status: newStatus, 
          paid_at: res.paid_at || selectedRequest.paid_at,
          payment_verification_note: verificationNote
        });
      }
    } else {
      setError(res.error || "Failed to update payment status");
      setTimeout(() => setError(null), 3000);
    }
    
    setIsUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-teal-100 text-teal-800 border-teal-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "unpaid": return "bg-gray-100 text-gray-800 border-gray-200";
      case "payment_verification": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "payment_failed": return "bg-red-100 text-red-800 border-red-200";
      case "refunded": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const openRequestDetails = (req: GuidanceRequest) => {
    setSelectedRequest(req);
    setVerificationNote(req.payment_verification_note || "");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Guidance Requests</h1>
            <p className="text-gray-500 mt-1">Manage and review incoming customer requests.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by name, ID, UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RequestStatus | "all")}
                className="pl-9 pr-8 py-2 w-full md:w-48 appearance-none border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer"
              >
                <option value="all">All Request Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="completed">Completed</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | "all")}
                className="pl-9 pr-8 py-2 w-full md:w-48 appearance-none border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all cursor-pointer"
              >
                <option value="all">All Payment Statuses</option>
                <option value="unpaid">Unpaid</option>
                <option value="payment_verification">Payment Verification</option>
                <option value="paid">Paid</option>
                <option value="payment_failed">Payment Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Error Toast */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Reference ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Req Status</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No requests found matching your filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr 
                      key={req.id} 
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      onClick={() => openRequestDetails(req)}
                    >
                      <td className="px-6 py-4 font-mono text-gray-600">{req.reference_id}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {req.created_at.split('T')[0]}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{req.full_name}</td>
                      <td className="px-6 py-4 text-gray-600 capitalize">
                        {req.service.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize flex w-fit items-center gap-1 ${getPaymentStatusColor(req.payment_status || 'unpaid')}`}>
                          {req.payment_status === "payment_verification" && <Loader2 className="w-3 h-3 animate-spin" />}
                          {(req.payment_status || 'unpaid').replace('_', ' ')}
                        </span>
                        {req.payment_utr && <div className="text-xs text-gray-500 mt-1 font-mono">UTR: {req.payment_utr}</div>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details &rarr;
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Detail View Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedRequest(null)}
          />
          
          {/* Slide-over panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
                <p className="text-sm text-gray-500 font-mono mt-1">{selectedRequest.reference_id}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Payment Status Management */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <label className="block text-sm font-medium text-green-900 mb-2 flex items-center justify-between">
                  <span>Update Payment Status</span>
                  <span className={`px-2 py-0.5 rounded text-xs capitalize ${getPaymentStatusColor(selectedRequest.payment_status || 'unpaid')}`}>
                    {(selectedRequest.payment_status || 'unpaid').replace('_', ' ')}
                  </span>
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <select
                      value={selectedRequest.payment_status || 'unpaid'}
                      onChange={(e) => handlePaymentStatusChange(selectedRequest.id, e.target.value as PaymentStatus)}
                      disabled={isUpdating}
                      className="flex-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="payment_verification">Payment Verification</option>
                      <option value="paid">Paid</option>
                      <option value="payment_failed">Payment Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    {isUpdating && <Loader2 className="h-5 w-5 animate-spin text-green-500 my-auto" />}
                  </div>
                  
                  <div className="text-sm text-green-800 bg-white/60 p-2 rounded border border-green-100">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">Amount:</span>
                      <span>{selectedRequest.payment_amount ? `₹${selectedRequest.payment_amount}` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">UTR:</span>
                      <span className="font-mono">{selectedRequest.payment_utr || 'Not submitted'}</span>
                    </div>
                    {selectedRequest.paid_at && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Paid At:</span>
                        <span>{new Date(selectedRequest.paid_at).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Add an internal payment note (optional)"
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                      className="w-full text-sm py-1.5 px-3 border border-green-200 rounded focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Request Status Management */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Request Status</label>
                <p className="text-xs text-gray-500 mb-3 font-medium">Note: Completed = guidance prepared. Delivered = guidance manually sent to customer.</p>
                <div className="flex gap-2">
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as RequestStatus)}
                    disabled={isUpdating}
                    className="flex-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md border"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="completed">Completed (Prepared)</option>
                    <option value="delivered">Delivered (Sent)</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {isUpdating && <Loader2 className="h-5 w-5 animate-spin text-orange-500 my-auto" />}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Customer Information</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-medium">{selectedRequest.full_name}</dd>
                  </div>
                  <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-medium">{selectedRequest.email || <span className="text-gray-400 italic">Not provided</span>}</dd>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> DOB</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.date_of_birth}</dd>
                    </div>
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.time_of_birth || 'Not provided'}</dd>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Birth Place</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.birth_place}</dd>
                    </div>
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Current City</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.current_city}</dd>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                    <dt className="text-sm font-medium text-gray-500">Language</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedRequest.preferred_language}</dd>
                  </div>
                </dl>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Request Details</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500">Service</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{selectedRequest.service.replace('-', ' ')}</dd>
                    </div>
                    <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
                      <dt className="text-sm font-medium text-gray-500">Concern Area</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedRequest.concern}</dd>
                    </div>
                  </div>

                  <div className="bg-orange-50/50 p-4 border border-orange-100 rounded-lg">
                    <dt className="text-sm font-medium text-orange-900 flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4" /> 
                      User&apos;s Question
                    </dt>
                    <dd className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {selectedRequest.question}
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Done Reviewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
