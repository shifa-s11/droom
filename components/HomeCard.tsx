import React from 'react'
import Image from 'next/image'

    interface HomeCardProps {
        title: string;
        description: string;
        icon: string;
        bgCol:string
        handleClick?: () => void;
    }
    const HomeCard = ({title,description,icon,bgCol,handleClick}:HomeCardProps) => {
  return (
    <div  className={`min-h-[260px] rounded-lg xl:max-w-[270px] cursor-pointer text-white flex flex-col justify-between py-5 px-4 ${bgCol}`}
  onClick={handleClick}>
          <div className='glass h-12 rounded-xl w-12 flex items-center justify-center'>
<Image
            src={icon} 
            alt={description}
            width={28}
            height={28}
          />
          </div>
          <div className='flex flex-col gap-2'>
          <h1 className=' text-2xl font-bold'>{title}</h1>
          <h3 className='text-lg font-normal'>{description}</h3>
          </div>
        </div>
  )
}

export default HomeCard