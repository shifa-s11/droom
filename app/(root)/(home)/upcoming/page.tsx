import CallProfile from '@/components/CallProfile'
import React from 'react'

const Upcoming = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <h2 className='font-bold text-3xl '>Upcoming Meeting</h2>
    <CallProfile type='upcoming'/>
    </div>
  )
}

export default Upcoming