# Proof (Native Mobile App MVP)

Premium dark-mode social progress tracker for net worth growth ranking.

## Stack
- Expo React Native (iOS + Android)
- React Navigation
- Zustand state management
- Supabase client scaffolding for auth + realtime leaderboard

## Features implemented
- Email + Google auth entry points
- 4-step onboarding (welcome, age group, baseline, confirm)
- Dashboard with growth %, percentile badge, chart, metrics, update modal
- Leaderboard with filters and highlighted current user
- Badge system with unlock logic
- Profile screen with visibility toggle and earned badges
- Growth formula + percentile recalculation logic in store

## Run
```bash
npm install
npm run start
```

Set Supabase env vars:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
