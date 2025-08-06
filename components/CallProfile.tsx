'use client';
import { Call } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import React from 'react';
import MeetingCard from './Meeting/MeetingCard';


const CallProfile = ({ type }: { type: 'end' | 'upcoming' | 'recording' }) => {
  const { endedCall, upcomingCall, recordedCall } = useGetCalls();
const router = useRouter();
const getType = () => {
  switch (type) {
    case 'end':
      return endedCall || [];
    case 'upcoming':
      return upcomingCall || [];
    case 'recording':
      return recordedCall || [];
    default:
      return [];
  }
};


const calls = getType(); 

return (
  <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
    { calls && calls.length > 0 ? (
      calls.map((meet: Call) => (
        <MeetingCard
          key={meet.id}
          meet={meet}
          icon="/sidebar/upcoming.svg"
          description={meet.state?.custom?.description || 'No description'}
  date={meet.state?.startsAt?.toLocaleString() || 'No date'}
  buttonText='Start'
  link = {`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meet as Call).id}`}
 handleClick={
               () => router.push(`/meeting/${(meet as Call).id}`)
            }
            isPrevious = {
              type==='end'?true:false
            }
            
        />
      ))
    ) : (
      <p>No calls found</p>
    )}
  </div>);}

export default CallProfile