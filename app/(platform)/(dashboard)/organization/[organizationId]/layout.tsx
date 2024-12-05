import OrganizationController from "./_components/OrganizationController"

export function generateMetadata({ params }: { params: { organizationId: string } }) {
    return {
        title: `${params.organizationId}`,
    }
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <OrganizationController />
            {children}
        </>
    )
}

export default OrganizationIdLayout