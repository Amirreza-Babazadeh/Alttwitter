'use client'

import useUserSession from '@/custom-hooks/useUserSession'
import { supabase } from '@/lib/SupabaseClient'
import Link from 'next/link'

export default function LogoutButton() {
  const { session } = useUserSession()

  const LogoutUser = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log('LogoutError:', error.message)
    }
  }

  return (
    <>
      {session ? (
        <button
          onClick={LogoutUser}
          className="hidden xl:block mt-5 h-12 rounded-full bg-white font-bold cursor-pointer hover:bg-gray-200"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/"
          className="hidden xl:flex mt-5 h-12 rounded-full bg-white font-bold cursor-pointer hover:bg-gray-200 items-center justify-center"
        >
          Log In
        </Link>
      )}
    </>
  )
}
