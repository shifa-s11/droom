"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface JoinMeetProps {
  open: boolean;
  onClose: () => void;
}

const JoinMeet = ({ open, onClose }: JoinMeetProps) => {
  const [meetingLink, setMeetingLink] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!meetingLink.trim()) return;
    // Navigate to the meeting page
    router.push(meetingLink);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="primary-bg max-w-[420px] flex flex-col border-none items-center gap-7 focus-visible:ring-0 focus-visible:ring-offset-0 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold py-2">Join a Meeting</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4 w-full">
          <Input
            placeholder="Paste your meeting link here..."
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="secondary-bg border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
          />
          <Button onClick={handleJoin} className="button-bg w-full mt-4 hover:bg-[#0E78F9]/90">
            Join Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinMeet;
