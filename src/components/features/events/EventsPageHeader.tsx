"use client";

import React, { useState } from "react";
import PageHeader from "@/components/ui/page-header";
import CreateEventDialog from "./CreateEventDialog";
import { useRouter } from 'next/navigation';

export default function EventsPageHeader() {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  return (
    <>
      <PageHeader
        searchPlaceholder="Search event, date"
        primaryButtonText="Create New Event"
        secondaryButtonText="Export Report"
        onPrimaryClick={() => setIsCreateDialogOpen(true)}
        onSecondaryClick={() => {
          // Export report action
          console.log("Export report clicked");
        }}
        showSearch={true}
        showPrimaryButton={true}
        showSecondaryButton={true}
      />
      
      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
}
