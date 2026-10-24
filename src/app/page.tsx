'use client'

import { supabase } from '@/lib/SupabaseClient'
import { signInUser } from '@/services/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const signin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setMessage('All fields are required')
      return
    }

    const result = await signInUser(email, password)
    if (result?.error) {
      setMessage(result.error)
    } else {
      setMessage('Login successful')
      setTimeout(() => {
        router.replace('/auth/callback')
      }, 2000)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/auth/callback')
      }
    })
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[95%] max-w-75 rounded-lg py-12">
        <h2 className="font-bold text-3xl text-primary-text">
          Sign in to AltTwitter
        </h2>

        <button className="bg-white w-full mt-8 h-10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full">
          <Image
            src="/globe.svg"
            alt="google-icon"
            width={470}
            height={470}
            className="w-6 h-6 object-cover"
          />
          <span>Sign in with google</span>
        </button>

        {/* or */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-border"></div>
          <span className="mx-4 text-md text-primary-text">or</span>
          <div className="grow h-px bg-border"></div>
        </div>

        {message && (
          <p className="bg-primary py-1 mb-4 font-semibold text-center rounded-xl">
            {message}
          </p>
        )}

        <form onSubmit={signin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <button
            type="submit"
            className="text-black w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white"
          >
            Continue
          </button>
        </form>
        <button className="text-white w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 hover:text-black font-semibold border border-border">
          Forgot Password
        </button>

        <div className="text-secondary-text mt-8">
          <span className="mr-1">Don&apos;t have an account</span>
          <Link href="/auth/signup" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
