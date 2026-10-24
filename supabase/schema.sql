-- ==============================================================================
-- AltTwitter Database Schema
-- Run this script in the Supabase SQL Editor to initialize all tables,
-- relationships, security policies, and performance indexes.
-- ==============================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  avatar_url VARCHAR
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Enable public with access" ON public.profiles;
CREATE POLICY "Enable public with access"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow auth users to insert data" ON public.profiles;
CREATE POLICY "Allow auth users to insert data"
  ON public.profiles FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile"
  ON public.profiles FOR UPDATE
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);


-- 2. TWITTS (POSTS) TABLE
CREATE TABLE IF NOT EXISTS public.twitts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT,
  image_url VARCHAR,
  image_path VARCHAR
);

ALTER TABLE public.twitts ENABLE ROW LEVEL SECURITY;

-- Twitts Policies
DROP POLICY IF EXISTS "Allow public read access" ON public.twitts;
CREATE POLICY "Allow public read access"
  ON public.twitts FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Enable insert for auth users" ON public.twitts;
CREATE POLICY "Enable insert for auth users"
  ON public.twitts FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Enable auth users to delete their twitte" ON public.twitts;
CREATE POLICY "Enable auth users to delete their twitte"
  ON public.twitts FOR DELETE
  USING ((select auth.role()) = 'authenticated' AND (select auth.uid()) = user_id);


-- 3. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  twitte_id UUID NOT NULL REFERENCES public.twitts(id) ON DELETE CASCADE,
  content TEXT NOT NULL
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Comments Policies
DROP POLICY IF EXISTS "Allow public real access" ON public.comments;
CREATE POLICY "Allow public real access"
  ON public.comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow auth users to insert to this table" ON public.comments;
CREATE POLICY "Allow auth users to insert to this table"
  ON public.comments FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Allow auth usert so delete comment" ON public.comments;
CREATE POLICY "Allow auth usert so delete comment"
  ON public.comments FOR DELETE
  USING ((select auth.role()) = 'authenticated' AND (select auth.uid()) = user_id);


-- 4. LIKES TABLE
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  twitte_id UUID NOT NULL REFERENCES public.twitts(id) ON DELETE CASCADE,
  CONSTRAINT unique_user_twitte_like UNIQUE (user_id, twitte_id)
);

ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Likes Policies
DROP POLICY IF EXISTS "Allow public read access" ON public.likes;
CREATE POLICY "Allow public read access"
  ON public.likes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow auth users to inset to likes table" ON public.likes;
CREATE POLICY "Allow auth users to inset to likes table"
  ON public.likes FOR INSERT
  WITH CHECK ((select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Allow auth users to delete from likes table" ON public.likes;
CREATE POLICY "Allow auth users to delete from likes table"
  ON public.likes FOR DELETE
  USING ((select auth.role()) = 'authenticated' AND (select auth.uid()) = user_id);


-- ==============================================================================
-- 5. PERFORMANCE INDEXES (Covering Foreign Keys)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_twitts_user_id ON public.twitts(user_id);
CREATE INDEX IF NOT EXISTS idx_twitts_created_at ON public.twitts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_twitte_id ON public.comments(twitte_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);

CREATE INDEX IF NOT EXISTS idx_likes_twitte_id ON public.likes(twitte_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON public.likes(user_id);


-- ==============================================================================
-- 6. STORAGE BUCKETS SETUP
-- ==============================================================================
-- Insert public buckets if they don't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('twitt-images', 'twitt-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for 'avatars'
DROP POLICY IF EXISTS "Allow users to select from avatars" ON storage.objects;
CREATE POLICY "Allow users to select from avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow users to insert to avatars" ON storage.objects;
CREATE POLICY "Allow users to insert to avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND (select auth.role()) = 'authenticated');

-- Storage Policies for 'twitt-images'
DROP POLICY IF EXISTS "Allow users to select from twitt-images" ON storage.objects;
CREATE POLICY "Allow users to select from twitt-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'twitt-images');

DROP POLICY IF EXISTS "Allow users to insert to twitt-images" ON storage.objects;
CREATE POLICY "Allow users to insert to twitt-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'twitt-images' AND (select auth.role()) = 'authenticated');

DROP POLICY IF EXISTS "Allow users to delete from twitt-images" ON storage.objects;
CREATE POLICY "Allow users to delete from twitt-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'twitt-images' AND (select auth.role()) = 'authenticated');
