import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
        <div className="cursor-pointer hover:opacity-80 items-center transition-all hidden md:flex">
            <Image
            src="/logo.svg"
            alt="logo"
            width={96}
            height={32}
            />
        </div>
    </Link>
  )
}

export default Logo