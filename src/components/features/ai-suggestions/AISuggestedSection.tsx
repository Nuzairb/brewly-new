"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBundles } from "@/app/api/bundles/getBundles";
import { acceptBundle } from "@/app/api/bundles/acceptBundle";
import AIDeleteDialog from "@/components/ui/ai-delete-dialog";
import { bundleService } from "@/lib/api/services";
import { deleteBundle } from '@/app/api/bundles/deleteBundle';
import { buildImageUrl } from "@/lib/utils";

// Helper function to validate image URL
const isValidImageUrl = (url: string | undefined | null): boolean => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === "string" ||
    trimmed === "undefined" ||
    trimmed === "null"
  )
    return false;
  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  );
};

// Types
interface AISuggestedBundle {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Draft" | "Pending";
  images: string[];
  collaborators?: Array<{
    id: number;
    name: string;
    avatar?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
  bundle_type?: string;
}

type TabType =
  | "All"
  | "AI Suggested"
  | "Manual"
  | "Active"
  | "Draft"
  | "Events"
  | "Expire";
type MenuAction =
  | "edit"
  | "archive"
  | "delete"
  | "goLive"
  | "removeCollaborator";

interface AISuggestedSectionProps {
  bundles?: AISuggestedBundle[];
  onEdit?: (bundleId: number) => void;
  onArchive?: (bundleId: number) => void;
  onDelete?: (bundleId: number) => void;
  onGoLive?: (bundleId: number) => void;
  onRemoveCollaborator?: (bundleId: number, collaboratorId: number) => void;
  onTabChange?: (tab: TabType) => void;
  onFilter?: () => void;
  isLoading?: boolean;
  searchTerm?: string;
}

export default function AISuggestedSection(props: AISuggestedSectionProps) {
  const {
    bundles,
    onEdit,
    onArchive,
    onDelete,
    onGoLive,
    onRemoveCollaborator,
    onTabChange,
    onFilter,
    isLoading = false,
    searchTerm = "",
  } = props;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("AI Suggested");
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [pendingBundles, setPendingBundles] = useState<AISuggestedBundle[]>([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterOptions: TabType[] = [
    "All",
    "AI Suggested",
    "Manual",
    "Active",
    "Draft",
    "Events",
    "Expire",
  ];
  const [loading, setLoading] = useState<boolean>(true);
  const fallbackImage =
    process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || buildImageUrl(undefined);
  const [visibleBundles, setVisibleBundles] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Fetch bundles from API
  const fetchBundles = async (tab?: TabType) => {
    setLoading(true);
    setVisibleBundles([]);
    try {
      let data;

      if (tab === "Manual") {
        data = await getBundles({ is_manual: "true" });
      } else if (tab === "Active") {
        // prefer accepted-bundles route for full accepted list
        try {
          const resp = await fetch(`/api/accepted-bundles`);
          if (!resp.ok) throw new Error('failed');
          data = await resp.json();
          // accepted_bundles rows may contain only acceptance metadata
          // (e.g. generated_bundle_id) so merge with generated bundles
          // so we can display bundle name and image correctly.
          try {
            if (Array.isArray(data) && data.length > 0) {
              // fetch generated bundles and map by id
              const generated = await getBundles();
              const genMap = new Map<number, any>(
                (generated || []).map((g: any) => [g.id, g])
              );

              // transform accepted rows to include generated bundle fields
              data = data.map((a: any) => {
                const gen = genMap.get(a.generated_bundle_id) || {};
                return {
                  // use generated bundle id as the primary id so lazy reveal works
                  id: a.generated_bundle_id ?? a.id,
                  generated_bundle_id: a.generated_bundle_id ?? a.id,
                  accepted_at: a.accepted_at,
                  is_active: a.is_active,
                  // propagate fields expected by the later mapping
                  bundle_name: gen.bundle_name ?? gen.name,
                  name: gen.name ?? gen.bundle_name,
                  image_url: gen.image_url ?? gen.image,
                  description: gen.description ?? gen.bundle_strategy ?? "",
                  bundle_type: gen.bundle_type ?? a.bundle_type,
                  status: gen.status ?? "accepted",
                };
              });
            }
          } catch (err) {
            // if merging fails, keep raw accepted rows so at least status is shown
            console.warn('Failed to merge accepted bundles with generated data', err);
          }
        } catch (_) {
          data = await getBundles({ status: "accepted" });
        }
      } else if (tab === "Events") {
        data = await getBundles({ bundle_type: "event" });
      } else if (tab === "Expire") {
        data = await getBundles({ bundle_type: "expiry_standard" });
      } else if (tab === "AI Suggested" || !tab) {
        data = await getBundles({ status: "pending", is_manual: "false" });
      } else if (tab === "Draft" || !tab) {
        data = await getBundles({ status: "draft" });
      } else if (tab === "All") {
        // Merge generated + accepted so All shows everything
        try {
          const generated = await getBundles();
          let accepted: any[] = [];
          try {
            const resp = await fetch(`/api/accepted-bundles`);
            if (resp.ok) accepted = await resp.json();
          } catch (_) {
            accepted = [];
          }

          const acceptedGenIds = new Set(accepted.map((a: any) => a.generated_bundle_id));

          data = (generated || []).map((g: any) => ({ ...g, _accepted: acceptedGenIds.has(g.id) }));
          for (const a of accepted) {
            if (!data.find((d: any) => d.id === a.generated_bundle_id)) {
              data.push({ id: a.generated_bundle_id, generated_bundle_id: a.generated_bundle_id, accepted_at: a.accepted_at, is_active: a.is_active });
            }
          }
        } catch (err) {
          data = await getBundles();
        }
      } else {
        data = await getBundles();
      }

      const mapped = data.map((bundle: any) => {
        let status: AISuggestedBundle["status"] = "Draft";
        // If this record comes from accepted-bundles, or was marked _accepted
        if (bundle.accepted_at || bundle._accepted) {
          status = "Active";
        } else if (bundle.status === "pending") {
          status = "Pending";
        } else if (bundle.status === "active" || bundle.status === "accepted") {
          status = "Active";
        }

        const imageUrl = buildImageUrl(
          // prefer image from generated bundle (image_url/image)
          bundle.image_url || bundle.image || bundle.images?.[0],
          fallbackImage
        );

        return {
          id: bundle.id,
          name: bundle.bundle_name || bundle.name || "Untitled",
          description:
            bundle.event_name && bundle.bundle_strategy
              ? `${bundle.event_name} - ${bundle.bundle_strategy}`
              : bundle.bundle_strategy || bundle.description || "",
          status,
          images: [imageUrl || fallbackImage],
          bundle_type: bundle.bundle_type,
          createdAt: bundle.created_at,
          updatedAt: bundle.valid_until,
        };
      });
      setPendingBundles(mapped);

      // For most tabs, show all fetched cards immediately so the UI matches
      // the backend response (keep lazy reveal only for AI Suggested tab).
      if (tab !== "AI Suggested") {
        try {
          setVisibleBundles(mapped.map((b: any) => b.id));
        } catch (_) {
          setVisibleBundles([]);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching bundles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBundles("AI Suggested");
  }, []);

  const tabs: TabType[] = [
    "All",
    "AI Suggested",
    "Manual",
    "Active",
    "Draft",
    "Events",
    "Expire",
  ];
  const tabsRef = React.useRef<HTMLDivElement | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState<number>(0);
  const [indicatorWidth, setIndicatorWidth] = useState<number>(0);

  const updateIndicator = () => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(
      `[data-tab="${activeTab}"]`
    ) as HTMLElement | null;
    if (!activeBtn) return;
    const textEl =
      (activeBtn.querySelector("[data-tab-text]") as HTMLElement) || activeBtn;
    const containerRect = container.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();
    setIndicatorLeft(textRect.left - containerRect.left + container.scrollLeft);
    setIndicatorWidth(textRect.width);
  };

  useEffect(() => {
    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, pendingBundles]);

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bundleId = parseInt(
              entry.target.getAttribute("data-bundle-id") || "0"
            );
            if (bundleId && !visibleBundles.includes(bundleId)) {
              setVisibleBundles((prev) => [...prev, bundleId]);
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [visibleBundles]);

  // Observe cards as they mount
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    cardRefs.current.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [pendingBundles]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
    fetchBundles(tab);
  };

  const handleMenuAction = async (
    action: MenuAction,
    bundleId: number,
    collaboratorId?: number
  ) => {
    setShowMenu(null);
    switch (action) {
      case "edit":
        onEdit?.(bundleId);
        break;
      case "archive":
        onArchive?.(bundleId);
        fetchBundles(activeTab);
        break;
      case "delete":
        const bundle = pendingBundles.find((b) => b.id === bundleId);
        setBundleToDelete({ id: bundleId, name: bundle?.name || "Bundle" });
        setDeleteDialogOpen(true);
        break;
      case "goLive": {
        try {
          await acceptBundle(bundleId);
          // After accepting, switch to the Active tab so the accepted bundle is visible
          setActiveTab("Active");
          fetchBundles("Active");
        } catch (e) {
          // If backend returned an error but the operation may have completed
          // (some backends return 500 after side-effect), poll the accepted
          // bundles list a few times to verify state and update the UI.
          console.error("Go Live error, will poll for acceptance", e);

          const pollForAcceptance = async (
            id: number,
            attempts = 6,
            delayMs = 1500
          ) => {
            for (let i = 0; i < attempts; i++) {
              try {
                const accepted = await getBundles({ status: "accepted" as any });
                if (Array.isArray(accepted) && accepted.find((b) => b.id === id)) {
                  return true;
                }
              } catch (err) {
                // ignore transient fetch errors and retry
              }
              // wait
              await new Promise((res) => setTimeout(res, delayMs));
            }
            return false;
          };

          const found = await pollForAcceptance(bundleId, 6, 1500);
          if (found) {
            try {
              alert("Bundle accepted (confirmed) — showing Active bundles.");
            } catch (_) {}
            setActiveTab("Active");
            fetchBundles("Active");
          } else {
            // If still not confirmed, try to switch to Active to let user check,
            // but show an error so they know manual refresh may help.
            console.error("Go Live failed and acceptance not confirmed", e);
            try {
              alert("Failed to Go Live (server error). Refresh the page to verify.");
            } catch (_) {}
            // still attempt to refresh accepted list so UI is up-to-date
            setActiveTab("Active");
            fetchBundles("Active");
          }
        }
        break;
      }
      case "removeCollaborator":
        if (collaboratorId) {
          onRemoveCollaborator?.(bundleId, collaboratorId);
          fetchBundles(activeTab);
        }
        break;
    }
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<{
    id: number;
    name?: string;
  } | null>(null);

  const confirmDelete = async (reason: string) => {
    if (!bundleToDelete) return;
    setDeleteDialogOpen(false);
    try {
      await new Promise((res) => setTimeout(res, 300));
      await deleteBundle(String(bundleToDelete.id));
      setBundleToDelete(null);
      fetchBundles(activeTab);
    } catch (err) {
      console.error("Failed to delete bundle", err);
      setBundleToDelete(null);
      fetchBundles(activeTab);
    }
  };

  const filteredBundles = pendingBundles
    .filter((bundle) => {
      if (activeTab === "All") return true;
      if (activeTab === "Events") return bundle.bundle_type === "event";
      if (activeTab === "Expire")
        return (
          bundle.bundle_type === "expiry_standard" ||
          bundle.bundle_type === "expire"
        );
      if (activeTab === "Draft")
        return bundle.status === "Draft" || bundle.status === "Pending";
      if (activeTab === "Active") return bundle.status === "Active";
      return true;
    })
    .filter((bundle) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      return (
        bundle.name.toLowerCase().includes(term) ||
        bundle.description.toLowerCase().includes(term)
      );
    });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-lato font-normal text-[32px] leading-none text-[#1E1E1E] m-0">
          AI Suggested Bundles
        </h1>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end opacity-100">
          <Button
            variant="aiFilter"
            size="pageHeader"
            className="w-[141px]"
            onClick={() => {
              // use existing pendingBundles to export
              const csvRows = ["ID,Name,Status,Date", ...pendingBundles.map(b => `${b.id},"${(b.name||'').replace(/"/g,'""')}",${b.status},${b.createdAt || ''}`)];
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
            }}
          >
            Export Report
          </Button>

          <Button
            variant="aiCardActionActive"
            size="pageHeader"
            className="w-[187px]"
            onClick={() => router.push('/create-bundle')}
          >
            Create Manually
          </Button>
        </div>
      </div>

      <div className="w-full bg-white rounded-[16px] border-none p-6">
        <div className="mb-6 -ml-[18px] -mt-[5px] w-[calc(100%+36px)]">
          <div
            ref={tabsRef}
            className="flex gap-[26px] w-fit h-[26px] opacity-100 relative items-center pb-3"
          >
            {tabs.map((tab) => (
              <Button
                key={tab}
                data-tab={tab}
                variant={activeTab === tab ? "aiTabActive" : "aiTabInactive"}
                onClick={() => handleTabChange(tab)}
                className="h-[26px] px-2 pb-[9px] bg-transparent
                          transition-all duration-300 ease-out
                          hover:scale-105 hover:opacity-90"
              >
                <span
                  data-tab-text
                  className="inline-block transition-all duration-300"
                >
                  {tab}
                </span>
              </Button>
            ))}

            <div
              aria-hidden
              className="absolute bottom-0 h-[3px] bg-[#1A5D4A] rounded transition-all duration-300"
              style={{
                left: `${indicatorLeft}px`,
                width: `${indicatorWidth}px`,
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-[60px]">
            <p className="font-inter text-[#787777] animate-pulse">
              Loading bundles...
            </p>
          </div>
        ) : filteredBundles.length === 0 ? (
          <div className="text-center py-[60px]">
            <p className="font-inter text-[#787777]">No bundles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 opacity-100 min-w-0">
            {filteredBundles.map((bundle) => {
              const isVisible = visibleBundles.includes(bundle.id);

              return (
                <div
                  key={bundle.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(bundle.id, el);
                    else cardRefs.current.delete(bundle.id);
                  }}
                  data-bundle-id={bundle.id}
                  className="min-w-0 w-full"
                >
                  <div className="relative">
                    <Card
                      className={`group min-w-0 w-full aspect-[4/4] relative rounded-[20px] bg-[#FAFAFA] border border-[#EEEEEE] p-[14px] overflow-hidden flex-1
                                transition-all duration-500 ease-out
                                hover:scale-[1.02] 
                                hover:shadow-2xl
                                hover:border-green-300/30
                                ${
                                  isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                                }`}
                    >
                      {isVisible && (
                        <>
                          {/* Background image with smooth zoom */}
                          <img
                            src={bundle.images[0] || fallbackImage}
                            alt="Bundle"
                            className="absolute inset-0 w-full h-full object-cover rounded-[20px] z-0
                                      transition-all duration-700 ease-out
                                      group-hover:scale-110"
                          />

                          {/* Overlay with hover effect */}
                          <div
                            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 rounded-[20px] z-0
                                        transition-all duration-500 ease-out
                                        group-hover:bg-gradient-to-b group-hover:from-black/40 group-hover:via-black/30 group-hover:to-black/50"
                          />

                          {/* Glow effect on hover */}
                          <div
                            className="absolute inset-0 rounded-[20px] opacity-0 z-0
                                        bg-gradient-to-r from-green-500/0 via-green-300/0 to-emerald-500/0
                                        transition-all duration-700 ease-out
                                        group-hover:opacity-30
                                        group-hover:from-green-500/20 group-hover:via-green-300/10 group-hover:to-emerald-500/20"
                          />

                          {/* Content */}
                          <div className="flex flex-col justify-between h-full items-center relative z-10">
                            {/* Top section with badge and menu */}
                            <div className="flex items-center w-full h-[25px]">
                              <div className="flex items-center gap-[9px] ml-auto">
                                {/* Badge with hover animation */}
                                <Badge
                                  variant={
                                    bundle.status === "Active"
                                      ? "active"
                                      : bundle.status === "Pending"
                                      ? "pending"
                                      : "draft"
                                  }
                                  className="bg-white
                                            transition-all duration-300 ease-out
                                            group-hover:scale-105
                                            group-hover:shadow-md"
                                >
                                  {bundle.status}
                                </Badge>

                                {/* Menu button with hover effect */}
                                <Button
                                  variant="aiMenuIcon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMenu(
                                      showMenu === bundle.id ? null : bundle.id
                                    );
                                  }}
                                  className="w-[24px] h-[24px] p-0 relative bg-white rounded-sm
                                            transition-all duration-300 ease-out
                                            hover:bg-gray-100 hover:scale-110 hover:shadow-sm"
                                >
                                  <svg
                                    width="16"
                                    height="4"
                                    viewBox="0 0 16 4"
                                    fill="none"
                                    className="absolute top-[10.5px] left-[4.13px]
                                              transition-all duration-300 ease-out"
                                  >
                                    <circle
                                      cx="2"
                                      cy="2"
                                      r="1.5"
                                      fill="#1A5D4A"
                                      className="transition-all duration-300 ease-out"
                                    />
                                    <circle
                                      cx="8"
                                      cy="2"
                                      r="1.5"
                                      fill="#1A5D4A"
                                      className="transition-all duration-300 ease-out"
                                    />
                                    <circle
                                      cx="14"
                                      cy="2"
                                      r="1.5"
                                      fill="#1A5D4A"
                                      className="transition-all duration-300 ease-out"
                                    />
                                  </svg>
                                </Button>
                              </div>

                              {/* Menu dropdown */}
                              {showMenu === bundle.id && (
                                <div
                                  className="absolute right-0 top-[30px] w-[174px] bg-white shadow-[0_4px_24px_0_#1A5D4A1A] rounded-[12px] z-20 flex flex-col p-3 gap-1
                                            transition-all duration-300 ease-out
                                            animate-in fade-in slide-in-from-top-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="aiMenuItem"
                                    onClick={() =>
                                      handleMenuAction("edit", bundle.id)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredMenuItem("edit")
                                    }
                                    onMouseLeave={() =>
                                      setHoveredMenuItem(null)
                                    }
                                    className="w-full h-[36px] transition-all duration-200 ease-out
                                             hover:bg-gray-50 hover:scale-[1.02] hover:translate-x-1"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="transition-all duration-200 ease-out"
                                    >
                                      <path
                                        d="M11.3334 2.00004C11.5085 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1595 1.49653 13.3883 1.59129C13.6171 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38297 14.4088 2.61177C14.5036 2.84057 14.5523 3.08577 14.5523 3.33337C14.5523 3.58098 14.5036 3.82618 14.4088 4.05498C14.314 4.28378 14.1751 4.49162 14 4.66671L5.00004 13.6667L1.33337 14.6667L2.33337 11L11.3334 2.00004Z"
                                        stroke="#1E1E1E"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-all duration-200 ease-out"
                                      />
                                    </svg>
                                    <span className="transition-all duration-200 ease-out">
                                      Edit Bundle
                                    </span>
                                  </Button>

                                  <Button
                                    variant="aiMenuItem"
                                    onClick={() =>
                                      handleMenuAction("archive", bundle.id)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredMenuItem("archive")
                                    }
                                    onMouseLeave={() =>
                                      setHoveredMenuItem(null)
                                    }
                                    className="w-full h-[36px] text-[#787777]
                                             transition-all duration-200 ease-out
                                             hover:bg-gray-50 hover:scale-[1.02] hover:translate-x-1"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="transition-all duration-200 ease-out"
                                    >
                                      <path
                                        d="M14 5.33337V14C14 14.3536 13.8595 14.6928 13.6095 14.9429C13.3594 15.1929 13.0203 15.3334 12.6667 15.3334H3.33333C2.97971 15.3334 2.64057 15.1929 2.39052 14.9429C2.14048 14.6928 2 14.3536 2 14V5.33337M6 7.33337V12.6667M10 7.33337V12.6667M1.33333 3.33337H14.6667M10.6667 3.33337V1.33337C10.6667 1.15656 10.5964 0.987027 10.4714 0.862003C10.3464 0.73698 10.1768 0.666707 10 0.666707H6C5.82319 0.666707 5.65362 0.73698 5.5286 0.862003C5.40357 0.987027 5.33333 1.15656 5.33333 1.33337V3.33337"
                                        stroke="#787777"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-all duration-200 ease-out"
                                      />
                                    </svg>
                                    <span className="transition-all duration-200 ease-out">
                                      Archive Bundle
                                    </span>
                                  </Button>

                                  <Button
                                    variant="aiMenuItemDelete"
                                    onClick={() =>
                                      handleMenuAction("delete", bundle.id)
                                    }
                                    onMouseEnter={() =>
                                      setHoveredMenuItem("delete")
                                    }
                                    onMouseLeave={() =>
                                      setHoveredMenuItem(null)
                                    }
                                    className="w-full h-[36px]
                                             transition-all duration-200 ease-out
                                             hover:bg-red-50 hover:scale-[1.02] hover:translate-x-1"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="transition-all duration-200 ease-out"
                                    >
                                      <path
                                        d="M2 4H3.33333M3.33333 4H14M3.33333 4V13.3333C3.33333 13.687 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.687 12.6667 13.3333V4H3.33333ZM5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333"
                                        stroke="#E74C3C"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-all duration-200 ease-out"
                                      />
                                    </svg>
                                    <span className="transition-all duration-200 ease-out">
                                      Delete Bundle
                                    </span>
                                  </Button>
                                </div>
                              )}
                            </div>

                            {/* Main clickable content area */}
                            <div 
                              className="flex-1 w-full cursor-pointer"
                              onClick={() => {
                                if (showMenu !== bundle.id) {
                                  router.push(`/ai-suggested/${bundle.id}`);
                                }
                              }}
                            >
                              {/* Bottom section with title */}
                              <div
                                className="flex flex-col gap-4 ml-[6px] w-full mt-auto
                                          transition-all duration-500 ease-out"
                              >
                                {/* Title with hover animation */}
                                <h3
                                  className="w-100 h-[25px] font-lato font-semibold sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[25px] text-white m-0 whitespace-nowrap overflow-hidden text-ellipsis [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]
                                            transition-all duration-300 ease-out
                                            group-hover:-translate-y-1
                                            group-hover:text-shadow-lg
                                            group-hover:text-green-100"
                                >
                                  {bundle.name}
                                </h3>
                              </div>
                            </div>

                            {/* Go Live button with hover animation */}
                            <Button
                              variant="aiGoLive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuAction("goLive", bundle.id);
                              }}
                              className="w-full h-[44px] mt-4
                                       transition-all duration-300 ease-out
                                       hover:scale-[1.03] 
                                       hover:shadow-lg
                                       hover:bg-green-100
                                       hover:-translate-y-1"
                            >
                              Go Live
                            </Button>
                          </div>

                          {/* Subtle border animation */}
                          <div
                            className="absolute inset-0 rounded-[20px] border-2 border-transparent
                                      transition-all duration-500 ease-out
                                      group-hover:border-green-400/30"
                          />
                        </>
                      )}
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AIDeleteDialog
        open={deleteDialogOpen}
        bundleName={bundleToDelete?.name}
        onOpenChange={(open) => setDeleteDialogOpen(open)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}