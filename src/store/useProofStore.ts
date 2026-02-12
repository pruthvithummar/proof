import { create } from 'zustand';
import { Badge, LeaderboardEntry, UserProfile, AgeGroup } from '../types';
import { growthFormula, percentileFromRank } from '../services/supabase';

const now = new Date().toISOString();

const defaultBadges: Badge[] = [
  { id: 'growth_10', title: 'First 10% Growth', requirement: 'Reach +10% growth', unlocked: false },
  { id: 'growth_25', title: '25% Growth', requirement: 'Reach +25% growth', unlocked: false },
  { id: 'growth_50', title: '50% Growth', requirement: 'Reach +50% growth', unlocked: false },
  { id: 'growth_100', title: '100% Growth', requirement: 'Reach +100% growth', unlocked: false },
  { id: 'consistency_6', title: '6-Month Consistency', requirement: 'Log monthly updates for 6 months', unlocked: false },
  { id: 'consistency_12', title: '12-Month Consistency', requirement: 'Log monthly updates for 12 months', unlocked: false },
];

interface ProofState {
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  profile: UserProfile | null;
  leaderboard: LeaderboardEntry[];
  badges: Badge[];
  chartSeries: number[];
  latestBadgeUnlocked: Badge | null;
  signInDemo: () => void;
  completeOnboarding: (payload: { username: string; ageGroup: AgeGroup; baseline: number }) => void;
  updateNetWorth: (newWorth: number) => void;
  toggleProfileVisibility: () => void;
}

export const useProofStore = create<ProofState>((set, get) => ({
  isAuthenticated: false,
  onboardingComplete: false,
  profile: null,
  leaderboard: [],
  badges: defaultBadges,
  chartSeries: [100, 104, 109, 114, 118, 124],
  latestBadgeUnlocked: null,

  signInDemo: () => set({ isAuthenticated: true }),

  completeOnboarding: ({ username, ageGroup, baseline }) => {
    const profile: UserProfile = {
      user_id: 'local-user',
      username,
      age_group: ageGroup,
      baseline_net_worth: baseline,
      current_net_worth: baseline,
      growth_percentage: 0,
      percentile_rank: 50,
      created_at: now,
      updated_at: now,
      public_profile: true,
    };

    const peerSet: LeaderboardEntry[] = [
      { user_id: 'u-1', username: 'velar', growth_percentage: 38.5, percentile_rank: 96, age_group: ageGroup },
      { user_id: 'u-2', username: 'nox', growth_percentage: 24.7, percentile_rank: 82, age_group: ageGroup },
      { user_id: 'u-3', username: 'aeon', growth_percentage: 13.1, percentile_rank: 61, age_group: ageGroup },
      { user_id: 'local-user', username, growth_percentage: 0, percentile_rank: 50, age_group: ageGroup },
    ];

    set({
      profile,
      leaderboard: peerSet.sort((a, b) => b.growth_percentage - a.growth_percentage),
      onboardingComplete: true,
    });
  },

  updateNetWorth: (newWorth) => {
    const { profile, leaderboard, badges } = get();
    if (!profile) return;

    const growth = growthFormula(newWorth, profile.baseline_net_worth);
    const updatedBoard = leaderboard
      .map((entry) =>
        entry.user_id === profile.user_id ? { ...entry, growth_percentage: growth } : entry,
      )
      .sort((a, b) => b.growth_percentage - a.growth_percentage);

    const rank = updatedBoard.findIndex((entry) => entry.user_id === profile.user_id) + 1;
    const percentile = percentileFromRank(rank, updatedBoard.length);

    const nextBadges = badges.map((badge) => {
      if (badge.unlocked) return badge;
      if (badge.id === 'growth_10' && growth >= 10) return { ...badge, unlocked: true };
      if (badge.id === 'growth_25' && growth >= 25) return { ...badge, unlocked: true };
      if (badge.id === 'growth_50' && growth >= 50) return { ...badge, unlocked: true };
      if (badge.id === 'growth_100' && growth >= 100) return { ...badge, unlocked: true };
      return badge;
    });

    const newestUnlocked = nextBadges.find((badge, i) => badge.unlocked && !badges[i].unlocked) ?? null;

    set({
      profile: {
        ...profile,
        current_net_worth: newWorth,
        growth_percentage: growth,
        percentile_rank: percentile,
        updated_at: new Date().toISOString(),
      },
      leaderboard: updatedBoard.map((entry, index) => ({
        ...entry,
        percentile_rank: percentileFromRank(index + 1, updatedBoard.length),
      })),
      badges: nextBadges,
      chartSeries: [...get().chartSeries.slice(-5), Number((growth + 100).toFixed(1))],
      latestBadgeUnlocked: newestUnlocked,
    });
  },

  toggleProfileVisibility: () => {
    const { profile } = get();
    if (!profile) return;
    set({ profile: { ...profile, public_profile: !profile.public_profile } });
  },
}));
