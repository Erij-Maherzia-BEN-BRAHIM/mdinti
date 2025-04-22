import { Sidebar } from "@/components/admin/sidebar";
import type React from "react";

export const metadata = {
  title: "Admin Dashboard - mdinti",
  description: "Admin dashboard for mdinti organization",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
    </div>
  );
}
