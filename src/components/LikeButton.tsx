import {
  useLikesCount,
  useToggleLike,
  useUserLike,
} from '@/custom-hooks/useLike'
import { Session } from '@supabase/supabase-js'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

type LikeButtonProps = {
  twitteId: string
  userId: string | undefined
  session: Session | null | undefined
}
export default function LikeButton({ twitteId, userId, session }: LikeButtonProps) {
  const { data: hasLiked } = useUserLike(userId, twitteId)
  const { data: likesCount } = useLikesCount(twitteId)
  const { mutate } = useToggleLike()

  const handleLike = () => {
    if (!session || !userId) return

    mutate({
      userId: userId,
      twitteId,
      hasLiked: !!hasLiked
    })
  }

  return (
    <>
      {hasLiked ? (
        <button
          onClick={handleLike}
          className="text-pink-700 flex items-center gap-1 hover:text-pink-800 cursor-pointer"
        >
          <FaHeart />
          <span className="text-sm">{likesCount}</span>
        </button>
      ) : (
        <button
          onClick={handleLike}
          className="text-secondary-text flex items-center gap-1 hover:text-pink-500 cursor-pointer"
        >
          <FaRegHeart />
          <span className="text-sm">{likesCount}</span>
        </button>
      )}
    </>
  )
}
