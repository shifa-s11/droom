"use client"
import React from 'react'
import MeetingList from '@/components/MeetingList'
import { useGetCalls } from '@/hooks/useGetCalls';
const Home = () => {
const now = new Date();
 const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
const day = now.toLocaleDateString('en-US', { weekday: 'long' });
const date = now.toLocaleDateString('en-US', {  day: 'numeric',month: 'long',year: 'numeric' });
const {upcomingCall,load} = useGetCalls();
const firstUpcomingMeeting = upcomingCall?.[0];
  const meetingTime = firstUpcomingMeeting?.state?.startsAt
    ? firstUpcomingMeeting.state.startsAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : null;
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='home-bg h-[300px] w-full bg-cover bg-center flex  rounded-2xl'>
        <div className='flex flex-col items-start px-6 py-10 justify-between'>
 <div className="font-normal lg:text-xl bg-[rgba(255,255,255,0.25)] p-1 rounded-xs glass text-base">
            {load
              ? 'Loading upcoming meeting...'
              : meetingTime
              ? `Upcoming Meeting at ${meetingTime}`
              : 'No upcoming meet'}
          </div>
        <div className='flex flex-col items-start gap-2'>
        <div className='text-4xl font-extrabold lg:text-7xl'>{time} <span></span>
        </div>
        <div className='text-lg lg:text-2xl font-medium text-[#C9DDFF]'>{day},{date}</div></div>
        </div>
      </div>
<MeetingList/>
    </section>
  )
}

export default Home