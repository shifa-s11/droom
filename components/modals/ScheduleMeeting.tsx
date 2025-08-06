'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ScheduleMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: string;
  setDescription: (value: string) => void;
  date: Date;
  setDate: (value: Date) => void;
  handleClick: () => void;
}

const ScheduleMeeting = ({
  open,
  onOpenChange,
  description,
  setDescription,
  date,
  setDate,
  handleClick,
}: ScheduleMeetingModalProps) => {
const now = new Date();
  const filterTime = (time: Date) => {
    const selectedDate = new Date(date);
    if (
      selectedDate.toDateString() === now.toDateString()
    ) {
      return time.getTime() > now.getTime();
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="hidden">Modal to Schedule a Meeting</DialogTitle>

      <DialogContent className="primary-bg max-w-[420px] flex flex-col border-none items-center gap-7 focus-visible:ring-0 focus-visible:ring-offset-0">
        <h2 className="text-white text-2xl font-bold">Schedule a Meeting</h2>

        <div className="flex w-full flex-col gap-2">
          <label className="text-white text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="secondary-bg border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
            placeholder="Enter meeting description..."
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <label className="text-white text-sm font-medium">Select Date and Time</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d!)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
             minDate={new Date()}
              filterTime={filterTime}
            className=" secondary-bg w-full rounded-md bg-dark-3 text-white p-2 focus:outline-none"
          />
        </div>

        <Button className="button-bg w-full mt-4" onClick={handleClick}>
          Schedule Meeting
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;
