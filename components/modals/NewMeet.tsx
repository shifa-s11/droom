import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
 import React from 'react'
import {Button} from "@/components/ui/button"
 interface NewMeetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleClick?: () => void;
}

const NewMeet = ({ open, onOpenChange ,handleClick}: NewMeetProps) => {
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="hidden">Modal to Create a New Meet</DialogTitle>
  <DialogTrigger>Open</DialogTrigger>
<DialogContent className="primary-bg max-w-[400px] flex flex-col border-none items-center gap-7">
<h2 className="text-white text-2xl font-bold py-2">Start an Instant Meeting</h2>
<Button className="button-bg w-76 " onClick={handleClick}>Start Meeting</Button>
</DialogContent>
</Dialog>
   )
 }
 
 export default NewMeet