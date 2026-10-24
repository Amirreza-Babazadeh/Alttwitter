import { getLikesCount, getUserLike, toggleLike } from '@/services/like'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      twitteId,
      hasLiked,
    }: {
      userId: string
      twitteId: string
      hasLiked: boolean
    }) => toggleLike({ userId, twitteId, hasLiked }),
    onSuccess: (
      data,
      variables: { userId: string; twitteId: string; hasLiked: boolean },
    ) => {
      queryClient.invalidateQueries({
        queryKey: ['likes', variables.twitteId],
      })
      queryClient.invalidateQueries({
        queryKey: ['likes', variables.twitteId],
      })
      queryClient.invalidateQueries({
        queryKey: ['likes-count', variables.twitteId],
      })
    },
  })
}

//func to check if liked a twitte
export const useUserLike = (userId: string | undefined, twitteId: string) => {
  return useQuery({
    queryFn: () => getUserLike(userId, twitteId),
    queryKey: ['likes', twitteId, userId],
    enabled: !!userId && !!twitteId,
  })
}

export const useLikesCount = (twitteId: string) => {
  return useQuery({
    queryFn: () => getLikesCount(twitteId),
    queryKey: ['likes-count', twitteId],
    enabled: !!twitteId,
  })
}
