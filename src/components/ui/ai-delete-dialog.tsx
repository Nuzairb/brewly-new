"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type ReasonOption = "duplicate" | "irrelevant"

interface AIDeleteDialogProps {
  open: boolean
  bundleName?: string
  onOpenChange: (open: boolean) => void
  onConfirm: (reason: string) => Promise<void> | void
}

export default function AIDeleteDialog({ open, bundleName, onOpenChange, onConfirm }: AIDeleteDialogProps) {
  const [reason, setReason] = React.useState<ReasonOption | null>(null)
  const [feedback, setFeedback] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const feedbackRef = React.useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    if (!open) {
      setReason(null)
      setFeedback("")
      setLoading(false)
    }
  }, [open])

  // Focus textarea when a reason is selected
  React.useEffect(() => {
    if (reason) {
      // focus next tick to ensure DOM is ready
      setTimeout(() => feedbackRef.current?.focus(), 0)
    }
  }, [reason])

  const handleConfirm = async () => {
    if (!reason) return
    const finalReason = `${reason}${feedback.trim() ? ` - ${feedback.trim()}` : ''}`
    setLoading(true)
    try {
      await onConfirm(finalReason)
    } finally {
      setLoading(false)
    }
  }

  const isConfirmDisabled = !reason || loading
  const [blink, setBlink] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const handleOutside = (e: any) => {
    // prevent Radix from closing
    e.preventDefault()
    // blink animation
    setBlink(true)
    // vibrate if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      // @ts-ignore
      navigator.vibrate(350)
    }
    setTimeout(() => setBlink(false), 300)
  }

  const startCloseAnimation = () => {
    setIsClosing(true)
    // wait for animation then close
    setTimeout(() => {
      setIsClosing(false)
      onOpenChange(false)
    }, 400)
  }

  const handleOpenChange = (next: boolean) => {
    if (next) {
      onOpenChange(true)
      return
    }
    // attempt to close -> play animation first
    startCloseAnimation()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        onPointerDownOutside={handleOutside}
        className={`max-w-md w-[92%] bg-white rounded-lg border p-6 shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out ${blink ? 'ring-2 ring-[#1A5D4A] border-[#1A5D4A] animate-bounce' : ''}`}
      >
        {/* Close button - top right corner */}
        <DialogClose
          onClick={(e) => { e.preventDefault(); startCloseAnimation(); }}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="font-lato font-semibold text-[16px] leading-normal text-[#1E1E1E]">
            Confirm delete
          </DialogTitle>
          <DialogDescription className="font-lato font-normal text-[14px] leading-normal text-[#787777]">
            Are you sure you want to delete <strong className="font-semibold">{bundleName}</strong>? Please select a reason before deleting.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="delete-reason"
              value="duplicate"
              checked={reason === "duplicate"}
              onChange={() => setReason("duplicate")}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="font-lato font-normal text-[14px] leading-normal text-[#1E1E1E]">Duplicate / Already exists</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="delete-reason"
              value="irrelevant"
              checked={reason === "irrelevant"}
              onChange={() => setReason("irrelevant")}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="font-lato font-normal text-[14px] leading-normal text-[#1E1E1E]">Irrelevant / Not useful</span>
          </label>
        </div>

        {/* Feedback textarea */}
        <div className="mt-4">
          <label className="block font-lato font-medium text-[14px] leading-normal text-[#1E1E1E] mb-2">
            Additional feedback (optional)
          </label>
          <textarea
            ref={feedbackRef}
            placeholder="Add additional feedback or comments"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className={`w-full border rounded-[6px] p-3 font-lato font-normal text-[14px] leading-normal resize-none h-20 transition-colors ${!reason ? 'border-[#E5E7EB] bg-gray-50 cursor-not-allowed' : 'border-[#E5E7EB] bg-white focus:border-[#1A5D4A] focus:outline-none focus:ring-1 focus:ring-[#1A5D4A]'}`}
            readOnly={!reason}
          />

        </div>

        <DialogFooter className="mt-6">
          <div className="flex gap-2 w-full">
            <Button variant="cancelBtn" onClick={() => startCloseAnimation()} className="flex-1 font-lato font-medium text-[14px] leading-normal">
              Cancel
            </Button>
            <Button
              variant="nextBtn"
              onClick={handleConfirm}
              className="flex-1 font-lato font-medium text-[14px] leading-normal"
              disabled={isConfirmDisabled}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}