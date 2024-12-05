interface ListWrapperProps {
    children: React.ReactNode
}

const ListWrapper = ({children}: ListWrapperProps) => {
  return (
    <li className="shrink-9 h-full w-72 select-none">
        {children}
    </li>
  )
}

export default ListWrapper