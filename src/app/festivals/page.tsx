import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Festivals & Calendar | ShubhMarg",
};

// /festivals redirects to the full calendar page
export default function FestivalsPage() {
  redirect("/shubh-calendar");
}