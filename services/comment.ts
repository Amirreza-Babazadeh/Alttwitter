import { supabase } from '@/lib/SupabaseClient'

export const createComment = async (
  userId: string,
  twitteId: string,
  content: string,
) => {
  const { error: insertError } = await supabase.from('comments').insert({
    user_id: userId,
    twitte_id: twitteId,
    content,
  })

  if (insertError) {
    console.log('commentInsertError:', insertError.message)
    return
  }

  return true
}

export const getComments = async (twitteId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*,profiles(id,name,username,avatar_url)')
    .eq('twitte_id', twitteId)
    .order('created_at', { ascending: false })

  if (error) {
    console.log('fetchCommentsError:', error.message)
    return
  }

  return data ?? []
}

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase.from('comments').delete().eq('id', commentId)

  if (error) {
    throw new Error(error.message)
  }
}

export const getCommentCount = async (twitteId: string) => {
  const { count, error } = await supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('twitte_id', twitteId)

  if (error) {
    console.log('fetchCommentCountError:', error.message)
    return 0
  }

  return count ?? 0
}
