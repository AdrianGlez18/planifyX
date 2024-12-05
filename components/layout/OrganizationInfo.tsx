"use client";

import { useOrganization } from "@clerk/nextjs";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { CreditCard } from "lucide-react";

const OrganizationInfo = () => {

  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <OrganizationInfo.Skeleton />

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-16 h-16 relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="organization"
          className="rounded-md object-cover" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">
          {organization?.name}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-4 w-4 mr-1"/>
          Free
        </div>
      </div>
    </div>
  )
}

export default OrganizationInfo

OrganizationInfo.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <Skeleton className="w-16 h-16" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}