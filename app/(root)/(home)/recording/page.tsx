import React from 'react'
import CallProfile from '@/components/CallProfile'

const Recording = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'><h2 className='font-bold text-3xl ' >Recorded Meetings</h2>
    <CallProfile type = 'recording'/>
    </div>
    
  )
}

export default Recording