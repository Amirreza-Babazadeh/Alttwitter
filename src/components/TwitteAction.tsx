'use client'

import { useCommentCount } from '@/custom-hooks/useComment'
import { useDeleteTwitte } from '@/custom-hooks/useTwitte'
import useUserSession from '@/custom-hooks/useUserSession'
import { useRouter } from 'next/navigation'
import { FaRegBookmark, FaRegComment, FaRepeat, FaTrash } from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'
import LikeButton from './LikeButton'

type twitteActionProp = {
  creatorId: string
  twitteId: string
  imagePath: string
  isTwittePostViewPage: boolean
}

export default function TwitteAction({
  creatorId,
  twitteId,
  imagePath,
  isTwittePostViewPage,
}: twitteActionProp) {
  const { mutate } = useDeleteTwitte()

  const { session } = useUserSession()
  const { data: commentsCount } = useCommentCount(twitteId)
  const userId = session?.user.id
  const router = useRouter()

  const handleDeleteTwitte = () => {
    mutate(
      {
        twitteId,
        imagePath: imagePath || undefined,
      },
      {
        onSuccess: () => {
          if (isTwittePostViewPage) {
            router.replace('/home')
          }
        },
      },
    )
  }

  return (
    <div className="flex justify-between my-4">
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegComment />
        <span className="text-sm">{commentsCount}</span>
      </div>

      {creatorId === userId ? (
        <button
          onClick={handleDeleteTwitte}
          className="text-red-700 flex items-center gap-1 hover:text-red-800 cursor-pointer"
        >
          <FaTrash />
        </button>
      ) : (
        <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
          <FaRepeat />
          <span className="text-sm">7.2k</span>
        </div>
      )}

      <LikeButton twitteId={twitteId} userId={userId} session={session} />
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <IoIosStats />
        <span className="text-sm">5k</span>
      </div>

      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegBookmark size={20} />
      </div>
    </div>
  )
}
