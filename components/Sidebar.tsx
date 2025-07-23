'use client'
import React from 'react'
import { sideLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section className='sticky flex flex-col top-0 left-0 h-screen w-fit  p-5 pt-30 max-sm:hidden lg:w-[264px] primary-bg'>
        <div className='flex flex-col gap-6'>
    {
        sideLinks.map((link)=>{
 const isActive =
            link.route === '/'
              ? pathname === '/'
              : pathname.startsWith(link.route);
           return(
            <Link 
            href={link.route}
            key={link.label}
            className={cn( 'font-semibold text-lg flex gap-3 text-[#C9DDFF] rounded-lg p-3 ',{
              'bg-[#0E78F9]':isActive
            })}
            >   <Image 
            src={link.imageUrl}
            alt = {link.label}
            width={24}
            height = {24}/>
            <p className='max-sm:hidden'> {link.label}</p>
                
            </Link>
           )
        })
    }
    </div>
    </section>
  )
}

export default Sidebar