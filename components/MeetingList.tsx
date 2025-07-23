"use client"
import React,{useState} from 'react'
import HomeCard from './HomeCard'
import NewMeet from '@/components/modals/NewMeet'
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from "next/navigation";
import { toast } from "sonner"
const MeetingList = () => {
const router = useRouter();
  const[meeting,setMeeting] = useState<'isJoining'|'isSchedule'|'isNew'|undefined>()
  const[info,setInfo] = useState({
    date: new Date(),
    description:'',
    link:'',
  })
  const[callinfo,setCallInfo] = useState<Call>()
  const {user} = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async() => {
    if(!client||!user) return;
    try{
      if(!info.date) {
        toast.error("Please select a date for the meeting");
        return;
      }
      // if(!info.description) {
      //   toast.error("Please provide a description for the meeting");
      //   return;
      // }
      // if(!info.link) {
      //   toast.error("Please provide a link for the meeting");
      //   return;
      // }
const id = crypto.randomUUID();
const call = client.call('default',id);
if(!call) throw new Error("Call not created");
const start = info.date.toISOString || new Date().toISOString();
const description = info.description || 'Instant meeting';
await call.create({
  data:{
    starts_at: start,
  },
  custom: {
description: description,
  },
  settings_override: {
    video: {
      camera_default_on: false,
    },
    audio: {
      microphone_default_on: false,
    },
  },
})
setCallInfo(call);
if(!info.description){
  router.push(`/meeting/${call.id}`);}
toast.success("Meeting created successfully");
    }catch(error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting. Please try again.");
    }
  }
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-4 '>
       <HomeCard
       title = "New Meeting"
       description='Start an instant meeting'
       icon='homeIcon/newMeet.svg'
       bgCol='bg-[#FF742E]'
        handleClick={() => setMeeting('isNew')}

       />
              <HomeCard
       title = "Join Meeting"
       description='Join via invitation link'
       icon='homeIcon/joinMeet.svg'
        bgCol='bg-[#0E78F9]'
        handleClick={() => setMeeting('isJoining')}
       />
              <HomeCard
       title = "Schedule Meeting"
       description='Plan your meeting'
       icon='homeIcon/schedMeet.svg'
        bgCol='bg-[#830EF9]'
        handleClick={() => setMeeting('isSchedule')}
       />
              <HomeCard
       title = "View Recordings"
       description='View your recordings'
       icon='homeIcon/viewRecord.svg'
        bgCol='bg-[#F9A90E]'
       />
{meeting === 'isNew' && (
  <NewMeet
  handleClick={createMeeting}
    open={true}
    onOpenChange={(open: boolean) => {
      if (!open) setMeeting(undefined);
    }}
  />
)}

    </section>
  )
}

export default MeetingList