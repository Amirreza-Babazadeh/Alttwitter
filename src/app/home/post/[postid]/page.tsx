import { supabase } from '@/lib/SupabaseClient'
import Comments from '@/src/components/Comments'
import GoBackButton from '@/src/components/GoBackButton'
import ReplyPost from '@/src/components/ReplyPost'
import TwitteAction from '@/src/components/TwitteAction'
import { Twitte } from '@/types/types'
import moment from 'moment'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'

const getTwitte = async (id: string) => {
  const { error, data } = await supabase
    .from('twitts')
    .select('*,profiles(id,username,name,avatar_url)')
    .eq('id', id)
    .single()

  if (error) {
    console.log(error.message)
  }

  return data
}

export default async function Page({
  params,
}: {
  params: Promise<{ postid: string }>
}) {
  const { postid } = await params
  const t: Twitte | null = await getTwitte(postid)

  if (!t || !t.profiles) {
    return (
      <div>
        <div className="flex justify-between items-center mb-3 px-4 py-2">
          <div className="text-white flex items-center gap-3">
            <GoBackButton />
            <span className="font-bold text-xl">Post</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-white">
          <h1 className="text-xl font-bold">Post not found</h1>
          <p className="text-secondary-text text-sm mt-2">
            This post may have been deleted or doesn&apos;t exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 px-4 py-2">
        <div className="text-white flex items-center gap-3">
          <GoBackButton />
          <span className="font-bold text-xl">Post</span>
        </div>
        <button className="border border-border rounded-full px-4 py-1 cursor-pointer text-white">
          Reply
        </button>
      </div>

      <div className="px-4 py-2 flex gap-3 border-b border-border">
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
            <div className="text-white my-2 block">{t.content}</div>
          )}

          {t.image_url && (
            <div>
              <Image
                src={t.image_url}
                alt="post-image"
                width={1800}
                height={1800}
                className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
              />
            </div>
          )}

          <TwitteAction
            creatorId={t.profiles.id}
            twitteId={t.id}
            imagePath={t.image_path || ''}
            isTwittePostViewPage={true}
          />
        </div>
      </div>
      <ReplyPost twitteId={t.id} />
      <Comments twitteId={t.id} />
    </div>
  )
}
