'use client'

import { useCreateComment } from '@/custom-hooks/useComment'
import useUserSession from '@/custom-hooks/useUserSession'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { IoLocateOutline } from 'react-icons/io5'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { TbPhoto } from 'react-icons/tb'

export default function ReplyPost({ twitteId }: { twitteId: string }) {
  const [reply, setReply] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const isDisabled = reply.trim() === '' && imagePreviews.length === 0
  const fileref = useRef<HTMLInputElement | null>(null)
  const { mutate, isPending } = useCreateComment()
  const { session } = useUserSession()
  const userId = session?.user.id

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const previews = Array.from(files).map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    if (fileref.current && imagePreviews.length <= 1) {
      fileref.current.value = ''
    }
  }

  const onEmojiClick = (emojidata: EmojiClickData) => {
    setReply((prev) => prev + emojidata.emoji)
  }

  const PostComment = () => {
    if (!reply.trim()) return
    if (!userId) return

    mutate(
      {
        userId,
        twitteId,
        content: reply,
      },
      {
        onSuccess: () => {
          setReply('')
        },
      },
    )
  }

  if (!session) return null

  return (
    <div
      className={`flex gap-4 p-4 border border-border ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <Image
        src="/globe.svg"
        alt="profile-pic"
        width={500}
        height={500}
        className="w-10 h-10 object-cover rounded-full shrink-0"
      />
      <div className="w-full">
        <textarea
          placeholder="whats happening?"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full placeholder:text-secondary-text outline-none text-xl text-white resize-none"
        ></textarea>

        {imagePreviews.length > 0 && (
          <div className="h-60 md:h-100 rounded-lg overflow-hidden border border-border mb-10 relative">
            <Image
              src={imagePreviews[0]}
              alt="preview-image"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
            <button
              className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer grid place-items-center"
              onClick={() => removeImage(0)}
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
              onClick={PostComment}
              className="text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full"
            >
              Post
            </button>
          )}
          {showPicker && (
            <div className="fixed z-10 top-60 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
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
