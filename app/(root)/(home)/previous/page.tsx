import CallProfile from '@/components/CallProfile'
import React from 'react'

const Previous = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'><h2 className='font-bold text-3xl ' >Previous Meetings</h2>
    <CallProfile type = 'end'/>
    </div>
  )
}

export default Previous