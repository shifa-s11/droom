import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HamburgerMenu from './hamburgerMenu'
import { SignedIn, UserButton } from '@clerk/nextjs'
const Navbar = () => {
  return (
    <nav className='primary-bg z-50 fixed w-full px-6 py-5 flex lg:px-8 justify-between'>
    <Link href='/' className='flex gap-1'>
        <Image
        src = '/logo.svg'
        alt = 'DROOM'
        height={32}
        width = {32}
        className='max-sm:size-10'
        />
        <h2 className='text-white font-extrabold text-2xl max-sm:hidden'>DROOM</h2>
        </Link>
        <div  className='flex items-center gap-4'>
          <SignedIn>
            <UserButton/>
          </SignedIn>
      <HamburgerMenu/>
      </div>
        </nav>
  )
}

export default Navbar