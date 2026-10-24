'use client'

import { useGetUser } from '@/custom-hooks/useGetUser'
import Image from 'next/image'
import Link from 'next/link'
import { HiDotsHorizontal } from 'react-icons/hi'
import { SpinnerCircularFixed } from 'spinners-react'

export default function Profile() {
  const { session, loading, profile, gettingSession } = useGetUser()

  if (loading || gettingSession)
    return (
      <div className="flex justify-center items-center py-4">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    )
  if (!session) return null
  if (!profile) return null

  return (
    <Link
      href="#"
      className="mt-auto flex items-center justify-center xl:justify-between p-3 rounded-full hover:bg-hover"
    >
      <div className="flex items-center gap-3">
        {profile?.avatar_url && (
          <Image
            src={profile.avatar_url}
            width={40}
            height={40}
            alt=""
            className="rounded-full shrink-0"
          />
        )}

        <div className="hidden xl:block">
          <p className="text-white font-semibold">{profile?.name}</p>
          <p className="text-secondary-text text-sm">@{profile?.username}</p>
        </div>
      </div>

      <HiDotsHorizontal className="hidden xl:block text-white" />
    </Link>
  )
}
