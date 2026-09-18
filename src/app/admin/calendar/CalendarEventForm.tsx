"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarEvent } from "@/types/calendar";
import { saveCalendarEvent } from "./actions";
import { Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface Props {
  initialData?: CalendarEvent;
  isEdit?: boolean;
}

export default function CalendarEventForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
    event_type: initialData?.event_type || "festival",
    description: initialData?.description || "",
    significance: initialData?.significance || "",
    puja_guidance: initialData?.puja_guidance || "",
    mantra: initialData?.mantra || "",
    dos: initialData?.dos || "",
    donts: initialData?.donts || "",
    image_url: initialData?.image_url || "",
    seo_title: initialData?.seo_title || "",
    seo_description: initialData?.seo_description || "",
    published: initialData?.published || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const result = await saveCalendarEvent(formData, !!isEdit);
      if (!result.success) {
        throw new Error(result.error);
      }
      
      router.push("/admin/calendar");
      router.refresh(); // Ensure the list page re-fetches
    } catch (err) {
      console.error("Error saving event:", err);
      if (err instanceof Error) {
        setError(err.message || "Failed to save event");
      } else {
        setError("Failed to save event");
      }
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold text-brand-maroon border-b pb-2">Basic Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Event Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Slug *</label>
          <input
            type="text"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Event Type *</label>
          <select
            name="event_type"
            required
            value={formData.event_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          >
            <option value="festival">Festival</option>
            <option value="ekadashi">Ekadashi</option>
            <option value="purnima">Purnima</option>
            <option value="amavasya">Amavasya</option>
            <option value="sankranti">Sankranti</option>
            <option value="vrat">Vrat</option>
          </select>
        </div>

        {/* Content */}
        <div className="space-y-4 md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold text-brand-maroon border-b pb-2">Content</h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-charcoal mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-charcoal mb-1">Significance</label>
          <textarea
            name="significance"
            rows={3}
            value={formData.significance || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-charcoal mb-1">Puja Guidance</label>
          <textarea
            name="puja_guidance"
            rows={3}
            value={formData.puja_guidance || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Mantra</label>
          <textarea
            name="mantra"
            rows={2}
            value={formData.mantra || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url || ""}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        {/* SEO & Status */}
        <div className="space-y-4 md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold text-brand-maroon border-b pb-2">SEO & Status</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO Title</label>
          <input
            type="text"
            name="seo_title"
            value={formData.seo_title || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">SEO Description</label>
          <textarea
            name="seo_description"
            rows={2}
            value={formData.seo_description || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gold/30 rounded-lg focus:ring-2 focus:ring-brand-maroon/20 focus:border-brand-maroon"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-5 h-5 text-brand-maroon border-brand-gold/40 rounded focus:ring-brand-maroon"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-900 cursor-pointer">
            Publish Event
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-brand-gold/10">
        <Link 
          href="/admin/calendar"
          className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-brand-maroon hover:bg-brand-maroon/90 disabled:bg-brand-maroon/50 text-white px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Event"}
        </button>
      </div>
    </form>
  );
}
