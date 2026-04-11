## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS`
   - `GEMINI_API_KEY` (optional for existing AI Studio flows)
3. Run the app:
   `npm run dev`

## Supabase Admin CMS Setup (Vercel-only deployment)

This project now includes a built-in admin panel at `/admin` and API routes under `/api/admin/*`.
No separate backend deployment is required.

### 1. Create a Supabase project

In Supabase dashboard:
1. Create a new project.
2. Copy your Project URL and API keys.

### 2. Run SQL migration manually

In Supabase SQL Editor, run this migration file:
- `supabase/migrations/202604100001_create_portfolio_sections.sql`

This creates and seeds `portfolio_sections` with the initial content for:
- `about`
- `expertise`
- `experience`
- `projects`
- `blog`

### 3. Create admin user(s)

In Supabase Auth:
1. Create users with email/password.
2. Disable sign-up in Auth settings if you want sign-in only behavior.
3. Add those email(s) to `ADMIN_EMAILS` in environment variables.

### 4. Configure Vercel environment variables

Add the same variables from `.env.example` to your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`

### 5. Content editing flow

1. Visit `/admin`.
2. Sign in with Supabase email/password.
3. Edit About/Expertise/Experience/Projects/Blog in `/admin` and save per section.
4. Public pages (`/about`, `/expertise`, `/experience`, `/projects`, `/blog`) update from DB content.

## Notes

- Admin navigation is not shown on public pages.
- Admin APIs require a valid Supabase access token and an email present in `ADMIN_EMAILS`.
- If Supabase env vars are missing, public pages fall back to local `lib/data.ts` content.
