'use client'

import { useGetTwitte } from '@/custom-hooks/useTwitte'
import { Twitte } from '@/types/types'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { SpinnerCircularFixed } from 'spinners-react'
import TwitteAction from './TwitteAction'

export default function Post() {
  const { isLoading, isError, error, data: twitte } = useGetTwitte()

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-30">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    )
  if (isError) return <h1 className="text-2xl text-white">{error.message}</h1>

  return (
    <div>
      {twitte?.map((t: Twitte) => (
        <div key={t.id} className="px-4 py-2 flex gap-3 border-b border-border">
          <Image
            src={t.profiles.avatar_url}
            alt="profile-pic"
            width={100}
            height={100}
            className="w-10 h-10 object-cover rounded-full shrink-0"
          />
          <div className="w-full">
            <div className="flex justify-between gap-1 text-sm">
              <div className="flex gap-1 items-center text-sm">
                <span className="text-white font-bold">{t.profiles.name}</span>
                <span className="text-secondary-text">
                  @{t.profiles.username}
                </span>
                <span className="text-secondary-text">
                  {moment(t.created_at).fromNow()}
                </span>
              </div>
              <BsThreeDots className="text-secondary-text" />
            </div>

            {t.content && (
              <Link
                href={`/home/post/${t.id}`}
                className="text-white my-2 block"
              >
                {t.content}
              </Link>
            )}

            {t.image_url && (
              <Link href={`/home/post/${t.id}`}>
                <Image
                  src={t.image_url}
                  alt="post-image"
                  width={1800}
                  height={1800}
                  className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
                />
              </Link>
            )}

            <TwitteAction
              creatorId={t.profiles.id}
              twitteId={t.id}
              imagePath={t.image_path || ''}
              isTwittePostViewPage={false}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
