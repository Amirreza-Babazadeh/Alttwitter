import { supabase } from '@/lib/SupabaseClient'

type Props = {
  userId: string | undefined
  twitteId: string
  hasLiked: boolean
}

export const toggleLike = async ({ userId, twitteId, hasLiked }: Props) => {
  if (hasLiked) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('twitte_id', twitteId)
      .eq('user_id', userId)

    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('likes').insert({
      twitte_id: twitteId,
      user_id: userId,
    })

    if (error) throw new Error(error.message)
  }
}

export const getUserLike = async (
  userId: string | undefined,
  twitteId: string,
) => {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('twitte_id', twitteId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return !!data
}

export const getLikesCount = async (twitteId: string) => {
  const { count, error } = await supabase
    .from('likes')
    .select('id', { count: 'exact', head: true })
    .eq('twitte_id', twitteId)

  if (error) throw new Error(error.message)
  return count ?? 0
}
