"use client";

import { useMobileSidebar } from "@/lib/hooks/useMobileSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "../ui/sheet";
import DashboardSidebar from "./DashboardSidebar";

const DashboardMobileSidebar = () => {

    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) onClose()
    }, [pathname])

    if (!isMounted) return null;

    return (
        <>
            <Button
                onClick={isOpen ? onClose : onOpen}
                className="block md:hidden"
                variant={"ghost"}
                size="sm"
            >
                <Menu className="h-6 w-6" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                 <SheetContent
                    side="left"
                    className="p-2 pt-10">
                    <DashboardSidebar 
                    storageKey="dashboard-mobile-sidebar"/>
                 </SheetContent>
            </Sheet>
        </>
    )
}

export default DashboardMobileSidebar