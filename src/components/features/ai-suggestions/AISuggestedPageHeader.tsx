"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AISuggestedPageHeaderProps {
  onBackClick: () => void;
  onCreateManually?: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function AISuggestedPageHeader({ onBackClick, onCreateManually, searchTerm, onSearchChange }: AISuggestedPageHeaderProps) {
  const router = useRouter();

  const handleCreateManually = () => {
    router.push('/create-bundle');
  };

  // Dummy bundles for export (replace with real data)
  const bundles = [
    { id: 1, name: 'Energy Boost Trio', status: 'Draft', date: '2025-06-22' },
    { id: 2, name: 'Quick Fuel Bundle', status: 'Active', date: '2025-06-23' },
    { id: 3, name: 'Complete Energy Boost', status: 'Expire', date: '2025-06-24' },
  ];

  const handleExport = () => {
    const csvRows = ["ID,Name,Status,Date", ...bundles.map(b => `${b.id},${b.name},${b.status},${b.date}`)];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai_suggested_bundles.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return null;
}
