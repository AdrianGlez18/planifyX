import MarketingFooter from '@/components/layout/MarketingFooter'
import MarketingNavbar from '@/components/layout/MarketingNavbar'
import React from 'react'

const MarketingLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className='h-full bg-slate-100'>
            <MarketingNavbar />
            <main className="pt-40 pb-20">
            {children}
            </main>
            <MarketingFooter />
            </div>
    )
}

export default MarketingLayout