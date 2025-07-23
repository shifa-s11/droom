"use client"
import React from 'react'
import { sideLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'

const hamburgerMenu = () => {
   const pathname = usePathname();
  return (
   <Sheet>
  <SheetTrigger>
    <Image 
    src='/hamburger.svg'
     alt = 'Menu'
      height={32}
      width = {32}
      className='w-8 h-8 cursor-pointer max-sm:size-10 min-sm:hidden'>
    </Image>
  </SheetTrigger>
  <SheetContent side ="left" className='w-[264px] primary-bg border-none  [&>button]:hidden' >
    <div className='px-6 py-5'>
     <Link href='/' className='flex gap-1'>
        <Image
        src = '/logo.svg'
        alt = 'DROOM'
        height={26}
        width = {26}
        className='max-sm:size-8'
        />
        <h2 className='text-white font-extrabold text-xl'>DROOM</h2>
        </Link><SheetClose asChild>
  <button className="absolute right-4 top-6">
    <Image src="/close.svg" alt="Close" width={24} height={24} />
  </button>
</SheetClose>
        </div>
<div className='flex flex-col gap-4 px-6 pt-15'>
{sideLinks.map((link) => {
  const isActive =
    link.route === '/'
      ? pathname === '/'
      : pathname.startsWith(link.route);

  return (
    
    <SheetClose asChild key={link.label} >
      <Link
        href={link.route}
        className={cn(
          'font-semibold text-lg flex gap-3 text-[#C9DDFF] rounded-lg p-3',
          { 'bg-[#0E78F9]': isActive }
        )}
      >
        <Image
          src={link.imageUrl}
          alt={link.label}
          width={24}
          height={24}
        />
        <p>{link.label}</p>
      </Link>
    </SheetClose>
  )
})}
</div>
   
  </SheetContent>
</Sheet>
  )
}

export default hamburgerMenu