"use client";
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import MeetingCall from '@/components/Meeting/MeetingCall';
import MeetingSetUp from '@/components/Meeting/MeetingSetUp';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/ui/Loader';
export default  function Meeting() {
  const {isLoaded} = useUser();
  const[isSet, setIsSet] = useState(false);
  const params = useParams();
  const id = params?.id;
  const{call, loading} = useGetCallById(id);
  if(!isLoaded || loading) return <Loader/> 
  return (
    <div className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
{!isSet ? (
            <MeetingSetUp setIsSet={setIsSet} />
          ) : (
            <MeetingCall />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  )
}