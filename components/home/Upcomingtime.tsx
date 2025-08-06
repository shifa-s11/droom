'use client'
import React from 'react'
import { useGetCalls } from '@/hooks/useGetCalls';
const Upcomingtime = () => {
    const {upcomingCall,load} = useGetCalls();
const firstUpcomingMeeting = upcomingCall?.[0];
  const meetingTime = firstUpcomingMeeting?.state?.startsAt
    ? firstUpcomingMeeting.state.startsAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : null;
     const meetingDate = firstUpcomingMeeting?.state?.startsAt
        ? firstUpcomingMeeting.state.startsAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        : null;
  return (
    <div className="font-normal lg:text-xl bg-[rgba(255,255,255,0.25)] p-1 rounded-xs glass text-base">
            {load
                ? 'Loading upcoming meeting...'
                : meetingTime
                    ? `Upcoming Meeting at ${meetingTime} on ${meetingDate}`
                    : 'No upcoming meet'}
        </div>
  )
}

export default Upcomingtime