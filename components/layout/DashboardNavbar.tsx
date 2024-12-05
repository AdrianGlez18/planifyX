import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import Logo from "./Logo"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import DashboardMobileSidebar from "./DashboardMobileSidebar"
import FormPopover from "../form/FormPopover"

const DashboardNavbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full px-4 h-14 border-b shadow-sm bg-white
         flex items-center">
            <DashboardMobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover
                align="start"
                side="bottom"
                sideOffset={12}>
                    <Button size="sm" className="rounded-lg hidden md:block
            h-auto p-2">
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                <Button size="sm" className="rounded-lg md:hidden block
            h-auto p-2">
                    <Plus />
                </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    afterSelectOrganizationUrl='/organization/:id'
                    afterCreateOrganizationUrl='/organization/:id'
                    afterLeaveOrganizationUrl="/select-org"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold"
                            }
                        }
                    }} />
            </div>
            <UserButton afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: {
                            height: 30,
                            width: 30
                        }
                    }
                }} />
        </nav>
    )
}

export default DashboardNavbar