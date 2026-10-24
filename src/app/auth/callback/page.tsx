'use client'

import { supabase } from '@/lib/SupabaseClient'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<null | User>(null)
  const [isChecking, setIsChecking] = useState(true)

  const setupUserProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !username || !image) {
      setMessage('All fields are required')
      return
    }

    // upload user avatar
    const timestamp = Date.now()

    const imagePath = `${timestamp}_${image.name}`
    const { error: imgError } = await supabase.storage
      .from('avatars')
      .upload(imagePath, image)

    if (imgError) {
      setMessage(imgError.message)
      return
    }

    //generate the publicURL from the image uploaded
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(imagePath)

    //insert data to the profiles table
    const { error: insertError } = await supabase.from('profiles').insert({
      username,
      email: user?.email,
      id: user?.id,
      name,
      avatar_url: publicUrl,
    })

    if (insertError) {
      if (insertError.message.includes('profiles_email_key')) {
        setMessage('A profile with this email already exists.')
      } else if (insertError.message.includes('profiles_username_key')) {
        setMessage('This username is already taken. Please choose another.')
      } else {
        setMessage(insertError.message)
      }
      return
    }

    setMessage('Profile Created')
    setTimeout(() => {
      router.replace('/home')
    }, 2000)
  }

  useEffect(() => {
    const handleAuth = async () => {
      //check if a user has registered
      const {
        error: userError,
        data: { user },
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.replace('/auth/signup')
        return
      }

      setUser(user)

      //check if user already has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (profileError) {
        router.replace('/auth/signup')
        return
      }

      if (profile) {
        router.replace('/home')
        return
      }
      setIsChecking(false)
    }
    handleAuth()
  }, [router])

  if (isChecking)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-white text-xl">Checking Profile...</h1>
      </div>
    )

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[95%] max-w-75 rounded-lg py-12">
        <h2 className="font-bold text-3xl text-primary-text mb-12">
          Setup Profile
        </h2>

        {message && (
          <p className="bg-primary py-1 mb-4 font-semibold text-center rounded-xl">
            {message}
          </p>
        )}

        <form onSubmit={setupUserProfile}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />

          <label htmlFor="avatar" className="text-white block py-2">
            Profile Pic
          </label>
          <input
            onChange={(e) => {
              const files = e.target.files
              if (!files) return
              const file = files[0]
              setImage(file)
            }}
            accept="image/*"
            id="avatar"
            type="file"
            className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <button
            type="submit"
            className="text-black w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
