import {
  createComment,
  deleteComment,
  getCommentCount,
  getComments,
} from '@/services/comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      twitteId,
      content,
    }: {
      userId: string
      twitteId: string
      content: string
    }) => createComment(userId, twitteId, content),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.twitteId],
      })
      queryClient.invalidateQueries({
        queryKey: ['comments-count', variables.twitteId],
      })
    },
  })
}

export const useGetComments = (twitteId: string) => {
  return useQuery({
    queryFn: () => getComments(twitteId),
    queryKey: ['comments', twitteId],
    enabled: !!twitteId,
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId }: { twitteId: string; commentId: string }) =>
      deleteComment(commentId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.twitteId],
      })
      queryClient.invalidateQueries({
        queryKey: ['comments-count', variables.twitteId],
      })
    },
  })
}

export const useCommentCount = (twitteId: string) => {
  return useQuery({
    queryFn: () => getCommentCount(twitteId),
    queryKey: ['comments-count', twitteId],
    enabled: !!twitteId,
  })
}
