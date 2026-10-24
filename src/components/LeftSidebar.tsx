import Link from 'next/link'
import { BiBell, BiEnvelope } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaFeather, FaRegUser, FaXTwitter } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import LogoutButton from './LogoutButton'
import Profile from './Profile'

export default function LeftSidebar() {
  return (
    <aside className="sticky top-0 h-screen w-20 xl:w-72 flex flex-col px-2 xl:px-3 py-2">
      <Link
        href="/"
        className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-hover"
      >
        <FaXTwitter size={30} className="text-white" />
      </Link>

      <nav className="mt-2 flex flex-col gap-1">
        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <GoHomeFill size={28} className="text-white" />
          <span className="hidden xl:block text-xl font-bold text-white">
            Home
          </span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <IoSearchOutline size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">Explore</span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <BiBell size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">
            Notifications
          </span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <BiEnvelope size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">Messages</span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <BsPeople size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">
            Communities
          </span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <FaXTwitter size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">Premium</span>
        </Link>

        <Link
          href="#"
          className="flex items-center justify-center xl:justify-start xl:gap-5 p-3 rounded-full hover:bg-hover"
        >
          <FaRegUser size={28} className="text-white" />
          <span className="hidden xl:block text-xl text-white">Profile</span>
        </Link>
      </nav>

      <LogoutButton />

      <button className="xl:hidden mt-5 w-12 h-12 rounded-full bg-white flex items-center justify-center">
        <FaFeather className="text-black" />
      </button>

      <Profile />
    </aside>
  )
}
