import DashboardSidebar from "@/components/layout/DashboardSidebar"

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='pt-20 md:pt-24 px-4  mx-auto '>{/* max-w-6xl 2xl:max-w-screen-xl */}
      <div className="flex gap-x-7 items-start">
        <div className="w-64 shrink-0 hidden md:block">
          <DashboardSidebar />
        </div>
        {children}
      </div>
    </div>
  )
}

export default OrganizationLayout