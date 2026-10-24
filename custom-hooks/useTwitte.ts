import { createTwitte, deleteTwitte, getTwittes } from '@/services/twitte'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usePostTwitte = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      content,
      twittImage,
    }: {
      userId: string
      content: string | null
      twittImage: File | null
    }) => createTwitte(userId, content, twittImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twitts'] })
    },
  })
}

export const useGetTwitte = () => {
  return useQuery({
    queryKey: ['twitts'],
    queryFn: getTwittes,
  })
}

export const useDeleteTwitte = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      twitteId,
      imagePath,
    }: {
      twitteId: string
      imagePath?: string
    }) => deleteTwitte(twitteId, imagePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twitts'] })
    },
  })
}
