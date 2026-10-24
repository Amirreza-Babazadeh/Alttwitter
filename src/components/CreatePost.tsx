'use client'

import { useGetUser } from '@/custom-hooks/useGetUser'
import { usePostTwitte } from '@/custom-hooks/useTwitte'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { IoLocateOutline } from 'react-icons/io5'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { TbPhoto } from 'react-icons/tb'
import { SpinnerCircularFixed } from 'spinners-react'

export default function CreatePost() {
  const [post, setPost] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string | null>(null)
  const [twitteImage, setTwitteImage] = useState<null | File>(null)
  const isDisabled = post.trim() === '' && !imagePreviews
  const fileref = useRef<HTMLInputElement | null>(null)
  const { loading, session, profile, gettingSession } = useGetUser()
  const { mutate, isPending } = usePostTwitte()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImagePreviews(URL.createObjectURL(file))
      setTwitteImage(file)
    }
  }

  const removeImage = () => {
    setImagePreviews(null)
    if (fileref.current) fileref.current.value = ''
    setTwitteImage(null)
  }

  const onEmojiClick = (emojidata: EmojiClickData) => {
    setPost((prev) => prev + emojidata.emoji)
  }

  const postTwitte = () => {
    if (!post && !twitteImage) {
      return
    }

    if (!session?.user.id) return

    mutate(
      {
        userId: session.user.id,
        content: post || null,
        twittImage: twitteImage || null,
      },
      {
        onSuccess: () => {
          setPost('')
          setImagePreviews(null)
          setTwitteImage(null)
        },
        onError: (error) => {
          console.log('Failed to post twitte', error.message)
        },
      },
    )
  }

  if (loading)
    return (
      <div className="flex justify-center items-center py-4">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    )
  if (gettingSession)
    return (
      <div className="flex justify-center items-center py-4">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    )
  if (!session) return null
  if (!profile) return null

  return (
    <div
      className={`flex gap-4 p-4 border border-border ${isPending ? 'opacity-30' : ''}`}
    >
      {profile?.avatar_url && (
        <Image
          src={profile.avatar_url}
          alt="profile-pic"
          width={500}
          height={500}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />
      )}
      <div className="w-full">
        <textarea
          placeholder="whats happening?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="w-full placeholder:text-secondary-text outline-none text-xl text-white resize-none"
        ></textarea>

        {imagePreviews && (
          <div className="h-60 md:h-100 rounded-lg overflow-hidden border border-border mb-10 relative">
            <Image
              src={imagePreviews}
              alt="preview-image"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
            <button
              className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer grid place-items-center"
              onClick={removeImage}
            >
              <RxCross2 />
            </button>
          </div>
        )}

        <div className="flex justify-between py-4 items-center border-t border-border">
          <div className="flex gap-3">
            <div className="text-primary cursor-pointer">
              <TbPhoto size={20} onClick={() => fileref.current?.click()} />
            </div>
            <div
              onClick={() => setShowPicker(!showPicker)}
              className="text-primary cursor-pointer"
            >
              <FaRegFaceSmile size={20} />
            </div>
            <div className="text-primary cursor-pointer">
              <IoLocateOutline size={20} />
            </div>
            <div className="text-primary cursor-pointer">
              <RiCalendarScheduleLine size={20} />
            </div>
          </div>

          {isDisabled ? (
            <button className="text-black bg-secondary-text py-2 px-5 font-semibold cursor-pointer rounded-full">
              Post
            </button>
          ) : (
            <button
              onClick={postTwitte}
              className="text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full"
            >
              Post
            </button>
          )}
          {showPicker && (
            <div className="fixed z-10 top-50 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={onEmojiClick}
                style={{
                  width: '100%',
                  background: 'black',
                }}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileref}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </div>
    </div>
  )
}
