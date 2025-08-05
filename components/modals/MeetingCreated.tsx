"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

interface MeetingLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: string;
}

const MeetingCreated = ({ open, onOpenChange, link }: MeetingLinkModalProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="primary-bg max-w-[420px] flex flex-col border-none items-center gap-5">
        <h2 className="text-white text-xl font-semibold">Meeting Scheduled 🎉</h2>
        <p className="text-white text-sm break-words text-center px-2">{link}</p>
        <Button onClick={handleCopy} className="button-bg flex gap-2 items-center">
          <ClipboardCopy size={16} />
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingCreated;
