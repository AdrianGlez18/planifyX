import Link from "next/link"
import { Button } from "../ui/button"
import Logo from "./Logo"


const MarketingNavbar = () => {
  return (
    <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
            <Logo />
            <div className="space-x-4 flex md:block md:w-auto items-center justify-between w-full">
                <Button asChild variant='ghost'><Link href="/sign-in">Login</Link></Button>
                <Button asChild><Link href="/sign-in">Get Started for free</Link></Button>
            </div>
        </div>

    </div>
  )
}

export default MarketingNavbar