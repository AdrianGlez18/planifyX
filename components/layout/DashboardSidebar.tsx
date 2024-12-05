"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Accordion } from "../ui/accordion";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { OrganizationType } from "./DashboardSidebarItem";

interface DashboardSidebarProps {
  storageKey?: string;
}

const DashboardSidebar = ({ storageKey }: DashboardSidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>
    (storageKey || "dashboard-sidebar-expanded", {});

  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    }
  });

  const defaultAccordionValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    }, [])

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) return (

    <div className="space-y-2 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-10 w-[50%]" />
        <Skeleton className="h-10 w-[10%]" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-10 w-[15%]" />
        <Skeleton className="h-10 w-[75%]" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-between mb-2 mt-8">
        <Skeleton className="h-10 w-[80%]" />
        <Skeleton className="h-10 w-[80%]" />
        <Skeleton className="h-10 w-[80%]" />
        <Skeleton className="h-10 w-[80%]" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-10 w-[15%]" />
        <Skeleton className="h-10 w-[75%]" />
      </div>
    </div>
  )

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4 font-bold">
          Workspaces
        </span>
        <Button
          asChild
          type="button"
          size='icon'
          variant="ghost"
          className="ml-auto"
        >
          <Link href='select-org'>
            <Plus /></Link>

        </Button>
      </div>
      <Accordion
        type="multiple"
        value={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <DashboardSidebarItem
            key={organization.id}
            isActive={organization.id === activeOrganization?.id}
            isExpanded={expanded[organization.id]}
            organization={organization as OrganizationType}
            onExpand={onExpand} />
        ))}
      </Accordion>
    </>
  )
}


export default DashboardSidebar