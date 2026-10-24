import { supabase } from '@/lib/SupabaseClient'

export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.log('Unexpected Error:', error)
    return { data: null, error: 'Unexpected error occurred. Please try again.' }
  }
}

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.log('Unexpected Error:', error)
    return { data: null, error: 'Unexpected error occurred. Please try again.' }
  }
}
