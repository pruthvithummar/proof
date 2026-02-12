import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://YOUR_PROJECT.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export const growthFormula = (current: number, baseline: number): number => {
  if (baseline <= 0) return 0;
  return Number((((current - baseline) / baseline) * 100).toFixed(1));
};

export const percentileFromRank = (rank: number, total: number): number => {
  if (total <= 1) return 100;
  return Math.max(1, Math.round(((total - rank + 1) / total) * 100));
};
