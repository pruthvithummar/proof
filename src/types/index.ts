export type AgeGroup = '18–22' | '23–27' | '28–35' | '36–45' | '46+';

export type LeaderboardFilter = 'Age Group' | 'Friends' | 'Global';

export type BadgeId =
  | 'growth_10'
  | 'growth_25'
  | 'growth_50'
  | 'growth_100'
  | 'consistency_6'
  | 'consistency_12';

export interface Badge {
  id: BadgeId;
  title: string;
  requirement: string;
  unlocked: boolean;
}

export interface UserProfile {
  user_id: string;
  username: string;
  age_group: AgeGroup;
  baseline_net_worth: number;
  current_net_worth: number;
  growth_percentage: number;
  percentile_rank: number;
  created_at: string;
  updated_at: string;
  public_profile: boolean;
  avatar_url?: string;
}

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  growth_percentage: number;
  percentile_rank: number;
  age_group: AgeGroup;
}
