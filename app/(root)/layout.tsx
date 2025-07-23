import React, { ReactNode } from 'react'
import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "DROOM",
  description: "A video calling feature",
  icons:{
    icon:'/logo.svg'
  }
};
const RootLayout = ({children}:{children:ReactNode}) => {
  return (
   <main>
    <StreamVideoProvider>
    {children}
    </StreamVideoProvider>
   </main>
  )
}

export default RootLayout