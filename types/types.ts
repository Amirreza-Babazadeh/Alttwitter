export type Twitte = {
  id: string
  user_id: string
  content: string
  image_url: string
  created_at: string
  image_path: string | null
  profiles: {
    id: string
    avatar_url: string
    name: string
    username: string
  }
}

export type Comment = {
  id: string
  user_id: string
  twitte_id: string
  content: string
  created_at: string
  profiles: {
    id: string
    avatar_url: string
    name: string
    username: string
  }
}
