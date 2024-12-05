
const SessionLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
        {children}
    </div>
  )
}

export default SessionLayout