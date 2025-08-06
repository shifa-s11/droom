'use client'
import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import { toast } from "sonner";

interface MeetingCardProps{
  icon:string
  description:string
  date:string,
  buttonText?:string
  link:string
  handleClick?: () => void
  isPrevious:boolean
}
const MeetingCard = (
{icon,description,date,buttonText,link,handleClick,isPrevious}:MeetingCardProps
) => {
  return (
    <div className='primary-bg w-full h-full flex flex-col min-h-[250px] p-6 justify-between rounded-xl xl:max-w-[560]'>
      <div className='flex flex-col gap-6'>
        <Image
        src = {icon}
        alt = 'Upcoming Meets'
        width = {25}
        height = {25}
             />
<h2 className=' font-bold text-2xl'>{description}</h2>
<h3 className='font-normal text-base'>{date}</h3>
      </div>
      {!isPrevious?(
         <div className='flex items-center gap-3 '>
        <Button onClick={handleClick}
        className='bg-[#0E78F9] rounded-sm text-white hover:bg-[#0E78F9]/90 px-6'
        >{buttonText}</Button>
         <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success('Link copied to clipboard');
              }}
              className='bg-[#252A41] rounded-sm text-[#C9DDFF]  px-9  hover:text-white'
            >
              <Image
              src = '/copy.svg'
              alt = 'Copy Invitation'
              width={20}
              height = {20}
              className='mr-1'
              />
Copy Invitation
        </Button>
      </div>
      ):('')}
     
    </div>
  )
}

export default MeetingCard