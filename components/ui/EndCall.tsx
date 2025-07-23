"use client"
import React from 'react'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './button';
import { useRouter } from 'next/navigation';
const EndCall = () => {
    const call = useCall();
    const router = useRouter();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const isOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    if(!isOwner) return null;
  return (
<Button onClick={async()=>{
    await call.endCall();
    router.push('/');
}}>
End Call for everyone
</Button>
  )
}

export default EndCall