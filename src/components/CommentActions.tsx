'use client'

import { useDeleteComment } from '@/custom-hooks/useComment'
import useUserSession from '@/custom-hooks/useUserSession'
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaTrash,
} from 'react-icons/fa6'
import { IoIosStats } from 'react-icons/io'

type Props = {
  creatorId: string
  twitteId: string
  commentId: string
}

export default function CommentActions({
  creatorId,
  twitteId,
  commentId,
}: Props) {
  const { session } = useUserSession()
  const userId = session?.user.id

  const { mutate } = useDeleteComment()

  const handleDelete = () => {
    mutate({
      twitteId,
      commentId,
    })
  }

  return (
    <div className="flex justify-between my-4">
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegComment />
        <span className="text-sm">1.6k</span>
      </div>
      {userId === creatorId && (
        <button
          onClick={handleDelete}
          className="text-red-700 flex items-center gap-1 hover:text-red-800 cursor-pointer"
        >
          <FaTrash />
        </button>
      )}
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegHeart />
        <span className="text-sm">2.6k</span>
      </div>
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
