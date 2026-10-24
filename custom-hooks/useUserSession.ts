import { supabase } from '@/lib/SupabaseClient'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const useUserSession = () => {
  const [session, setSession] = useState<null | Session>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    fetchSession()

    return () => subscription.unsubscribe()
  }, [])

  return { loading, session }
}

export default useUserSession
