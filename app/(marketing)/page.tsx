import { Button } from '@/components/ui/button'
import { Medal } from 'lucide-react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const descFont = Poppins({
    subsets: ['latin'],
    weight: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
    ]
})

const MarketingPage = () => {
    return (
        <div className='flex items-center justify-center flex-col'>
            <div className="flex items-center justify-center flex-col">
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-xl uppercase">
                    <Medal className='mr-2' />
                    No 1 task management
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-900 mb-6">
                    Taskify helps team move
                </h1>
                <div className="text-3xl md:text-6xl text-center text-neutral-100 bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 pb-4 p-2 rounded-lg w-fit">
                    work forward
                </div>
            </div>
            <div className={`text-sm md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto
            ${descFont.className}`}>
                Collaborate with your team, manage your projects, and improve your productivity.
                Change the way you work and manage your time with Taskify.
            </div>
            <Button className='mt-6 bg-cyan-600 hover:bg-cyan-600/90' size="lg" asChild>
                <Link href="/sign-up">
                    Get Started for free
                </Link>
            </Button>
        </div>
    )
}

export default MarketingPage