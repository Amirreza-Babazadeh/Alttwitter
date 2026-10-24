import { supabase } from '@/lib/SupabaseClient'

export const createTwitte = async (
  userId: string,
  content: string | null,
  twitteImage: File | null,
) => {
  let imageURL: null | string = null
  let imagePath: null | string = null

  //handle image uploaded
  if (twitteImage) {
    const timestamp = Date.now()
    const path = `${timestamp}_${twitteImage.name}`

    const { error: imgError } = await supabase.storage
      .from('twitt-images')
      .upload(path, twitteImage)

    if (imgError) {
      console.log('TwitteImageUploadError: ', imgError.message)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('twitt-images').getPublicUrl(path)

    imageURL = publicUrl
    imagePath = path
  }

  //save twitte
  const { error: insertError } = await supabase.from('twitts').insert({
    user_id: userId,
    content: content ? content : null,
    image_url: imageURL,
    image_path: imagePath,
  })

  if (insertError) {
    console.log('TwitteInsertError: ', insertError.message)
    return
  }

  return true
}

export const getTwittes = async () => {
  const { error, data } = await supabase
    .from('twitts')
    .select(`*,profiles(id, username,name, avatar_url)`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log('fetchTweetsError:', error.message)
  }

  return data
}

export const deleteTwitte = async (twitteId: string, imagePath?: string) => {
  //delete the twitte record
  const { error: deleteError } = await supabase
    .from('twitts')
    .delete()
    .eq('id', twitteId)

  if (deleteError) {
    console.log('DeleteTwitteError', deleteError.message)
    return
  }

  if (imagePath) {
    const { error: imageError } = await supabase.storage
      .from('twitt-images')
      .remove([imagePath])

    if (imageError) {
      console.log('DeleteImageError', imageError.message)
    }
  }
}
