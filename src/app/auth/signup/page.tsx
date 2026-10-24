'use client'

import { supabase } from '@/lib/SupabaseClient'
import { signUpUser } from '@/services/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setMessage('All field are required!')
      return
    }

    const result = await signUpUser(email, password)
    if (result?.error) {
      setMessage(result.error)
    } else {
      setMessage('Signup successful')

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
        <h2 className="font-bold text-3xl text-primary-text mb-12">
          Sign up to AltTwitter
        </h2>

        {message && (
          <p className="bg-primary py-1 mb-4 font-semibold text-center rounded-xl">
            {message}
          </p>
        )}

        <form onSubmit={signup}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            autoComplete="current-password"
            className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <button
            type="submit"
            className="text-black w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white"
          >
            Continue
          </button>
        </form>

        <div className="text-secondary-text mt-8">
          <span className="mr-1">Already have an account</span>
          <Link href="/" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
