import { supabase } from '@/lib/SupabaseClient'
import { useEffect, useState } from 'react'
import useUserSession from './useUserSession'

type Profile = {
  username: string
  avatar_url: string
  email: string
  name: string
}

export const useGetUser = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const { session, loading: gettingSession } = useUserSession()
  const [loading, setLoading] = useState(true)
  const userId = session ? session.user.id : null

  useEffect(() => {
    if (!userId) return

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.log('ProfileError:', error.message)
        setProfile(null)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }
    fetchProfile()
  }, [userId])

  return { profile, session, loading, gettingSession }
}
