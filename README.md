# AltTwitter 🐦

A full-stack social media web application inspired by Twitter/X, built with **Next.js 16 App Router**, **React 19**, **TypeScript**, **Supabase (PostgreSQL, Auth & Storage)**, **TanStack React Query**, and **Tailwind CSS v4**.

---

## 🚀 Features

- **🔐 Authentication**: Secure email & password sign-up and sign-in powered by Supabase Auth, with session management and route protection.
- **👤 Profile Onboarding**: Dedicated user profile setup with custom avatar uploads to Supabase Storage.
- **📝 Post Creation & Media Sharing**: Compose posts with rich media attachments (image upload preview, deletion, and cloud storage upload).
- **💬 Discussion Threads**: View individual post pages (`/home/post/[postid]`) with reply threads, comment counts, and comment deletion.
- **❤️ Real-time Interactions**: Like/unlike posts with instant cache invalidation and live count tracking.
- **⚡ Optimistic Caching**: Synchronized client state and background query refetching with TanStack React Query.
- **🎨 Modern Dark UI**: Pixel-crafted dark theme matching Twitter/X aesthetics using Tailwind CSS v4.
- **🛡️ Row Level Security (RLS)**: Enforced database-level security policies and covering foreign key indexes on PostgreSQL.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | React Framework with App Router & Turbopack |
| **[React 19](https://react.dev/)** | Frontend UI Library with modern hooks |
| **[TypeScript](https://www.typescriptlang.org/)** | End-to-end type safety |
| **[Supabase](https://supabase.com/)** | PostgreSQL Database, User Auth, and Media Storage |
| **[TanStack React Query](https://tanstack.com/query)** | Server state management, caching, and mutations |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling and theme design |
| **[React Icons](https://react-icons.github.io/react-icons/)** | UI iconography |

---

## 📂 Project Structure

```text
├── custom-hooks/        # Custom React Query hooks (tweets, comments, likes, auth)
├── lib/                 # Core client libraries (Supabase client initialization)
├── providers/           # App providers (React Query provider)
├── services/            # Supabase API services (auth, twitte, comment, like)
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   │   ├── auth/        # Sign-up and profile callback onboarding
│   │   ├── home/        # Main feed and dynamic post detail view
│   │   └── page.tsx     # Landing and login page
│   └── components/      # Reusable UI components (Sidebar, Post, Comment, Like, etc.)
├── supabase/
│   └── schema.sql       # Reproducible PostgreSQL DDL, RLS policies & indexes
├── types/               # TypeScript interfaces and definitions
└── .github/workflows/   # Automated Supabase keep-alive cron workflow
```

---

## ⚙️ Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/alttwitter.git
cd alttwitter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory by copying the example template:

```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials (found in **Project Settings > API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### 4. Set Up Supabase Database & Storage

1. Create a project at [supabase.com](https://supabase.com/).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of [`supabase/schema.sql`](supabase/schema.sql) and run it. This will:
   - Create tables: `profiles`, `twitts`, `comments`, `likes`.
   - Set up Row Level Security (RLS) policies.
   - Create performance indexes on foreign keys.
   - Create public storage buckets: `avatars` and `twitt-images`.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Netlify

This project is fully ready for deployment on [Netlify](https://www.netlify.com/):

1. **Push your code to GitHub**.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository (`alttwitter`).
4. Netlify will automatically detect Next.js with build command `npm run build`.
5. Under **Environment variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = your Supabase publishable/anon key
6. Click **Deploy alttwitter**.

---

## 🔄 Supabase Free Tier Keep-Alive

Supabase Free Tier projects automatically pause after 7 days of inactivity. This repository includes a GitHub Action in [`.github/workflows/supabase-keepalive.yml`](.github/workflows/supabase-keepalive.yml) that automatically sends a lightweight ping to your Supabase project every 3 days.

To activate the keep-alive ping on your repository:
1. Go to your GitHub repository's **Settings > Secrets and variables > Actions**.
2. Add two repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
