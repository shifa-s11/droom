import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DROOM",
  description: "A video calling feature",
  icons:{
    icon:'/logo.svg'
  }
};
const HomeLayout = ({children}:{children:ReactNode}) => {
  
  return (
   <main className='relative'>
    <Navbar/>
    <div className='flex'>
        <Sidebar/>
        <section className="flex min-h-screen flex-col  px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 w-full">
          <div className="w-full">{children}</div>
        </section>
    </div>
   </main>
  )
}

export default HomeLayout