"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface NewMeetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleClick?: () => void;
  link?: string;
}

const NewMeet = ({ open, onOpenChange, handleClick, link }: NewMeetProps) => {
  const handleCopy = () => {
    if (link) {
      const fullLink = link.startsWith("http") ? link : `https://${link}`;
      navigator.clipboard.writeText(fullLink);
      toast.success("Invitation link copied!");
    }
  };

  const handleJoin = () => {
    if (link) {
      const fullLink = link.startsWith("http") ? link : `https://${link}`;
      window.open(fullLink, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="hidden">Modal to Create a New Meet</DialogTitle>
      <DialogContent className="primary-bg max-w-[400px] flex flex-col border-none items-center gap-7">
        <h2 className="text-white text-2xl font-bold py-2">
          Start an Instant Meeting
        </h2>

        {/* Show Start Meeting if link not created yet */}
        {!link && (
          <Button className="button-bg w-full" onClick={handleClick}>
            Start Meeting
          </Button>
        )}

        {/* Once link is available → show Copy + Join Now */}
        {link && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm text-gray-300">Share this invitation link:</p>
            <div className="flex gap-2">
              <Input
                value={link.startsWith("http") ? link : `https://${link}`}
                readOnly
                className="secondary-bg border-none text-white"
              />
              <Button type="button" className="button-bg" onClick={handleCopy}>
                Copy
              </Button>
            </div>
            <Button
              type="button"
              className="button-bg w-full mt-2"
              onClick={handleJoin}
            >
              Join Now
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewMeet;


