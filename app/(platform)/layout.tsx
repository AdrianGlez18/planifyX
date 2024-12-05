/* import PlatformFooter from '@/components/layout/PlatformFooter'
import PlatformNavbar from '@/components/layout/PlatformNavbar' */
import { Toaster } from '@/components/ui/toaster'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const PlatformLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <ClerkProvider>
            {children}
            <Toaster/>
        </ClerkProvider>
    )
}

export default PlatformLayout