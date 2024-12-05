"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
    Activity as ActivityIcon,
    CreditCard as CreditCardIcon,
    Layout as LayoutIcon,
    Settings as SettingsIcon
} from 'lucide-react';

import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";

export type OrganizationType = {
    id: string;
    slug: string;
    name: string;
    imageUrl: string;
}
interface DashboardSidebarItemProps {
    isActive: boolean;
    isExpanded: boolean;
    organization: OrganizationType;
    onExpand: (id: string) => void
}

const DashboardSidebarItem = ({
    isActive,
    isExpanded,
    organization,
    onExpand
}: DashboardSidebarItemProps) => {

    const router = useRouter();
    const pathname = usePathname();

    const paths = [
        {
            label: "Boards",
            icon: <LayoutIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.slug}`
        },
        {
            label: "Activity",
            icon: <ActivityIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.slug}/activity`
        },
        {
            label: "Settings",
            icon: <SettingsIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.slug}/settings`
        },
        {
            label: "Billing",
            icon: <CreditCardIcon className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.slug}/billing`
        }
    ]

    const onClick = (href: string) => {
        router.push(href);
    }

    return (
        <AccordionItem
            value={organization.id}
            className="border-none">
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={`flex items-center gap-x-2 p-2 text-neutral-700 rounded-md
    hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline
    ${isActive && !isExpanded ? "bg-sky-500/10 text-sky-700" : ""}`}>
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            src={organization.imageUrl}
                            fill
                            alt={organization.name}
                            className="rounded-md object-cover"
                        />
                    </div>
                    <span className="font-bold text-sm">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent
                className="pt-1 text-neutral-700"
            >
                {paths.map((path) => (
                    <Button
                        key={path.href}
                        size="sm"
                        variant={"ghost"}
                        onClick={() => onClick(path.href)}
                        className={`w-full justify-start px-10 mb-1
            ${pathname === path.href ? "bg-sky-500/10 text-sky-700" : ""}`}>
                        {path.icon}
                        {path.label}
                    </Button>

                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

export default DashboardSidebarItem