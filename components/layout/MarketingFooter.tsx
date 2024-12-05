import Link from "next/link"
import { Button } from "../ui/button"
import Logo from "./Logo"


const MarketingFooter = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
        <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-around">
            <Logo />
            <div className="space-x-4 flex md:block md:w-auto items-center justify-around w-full">
                <Button size="sm" asChild variant="ghost"><Link href="/privacy-policy">Privacy Policy</Link></Button>
                <Button size="sm" asChild variant="ghost"><Link href="/use-term">Terms of Service</Link></Button>
            </div>
        </div>

    </div>
  )
}

export default MarketingFooter