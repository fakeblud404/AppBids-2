export interface Ad {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  baseBid: number; // in cents
  multiplier: number; // Plinko result e.g. 3.4
  finalBid: number; // baseBid × multiplier
  clicks: number;
  status: 'active' | 'pending' | 'rejected';
  stripePaymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdFormData {
  title: string;
  description: string;
  url: string;
  category: string;
  baseBid: number; // in dollars (converted to cents on submit)
}

export interface PlinkoResult {
  multiplier: number;
  slotIndex: number;
}

export interface AdminStats {
  totalRevenue: number;
  totalClicks: number;
  totalAds: number;
  activeAds: number;
  pendingAds: number;
  topCategories: { category: string; count: number }[];
}

export const CATEGORIES = [
  'All',
  'AI',
  'SEO',
  'Crypto',
  'SaaS',
  'Marketing',
  'Dev Tools',
  'Finance',
  'E-Commerce',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PLINKO_MULTIPLIERS = [
  { value: 0.5, weight: 25 },
  { value: 0.8, weight: 20 },
  { value: 1, weight: 20 },
  { value: 1.5, weight: 15 },
  { value: 2, weight: 10 },
  { value: 5, weight: 7 },
  { value: 10, weight: 3 },
] as const;

// Slot layout for the Plinko board (9 slots, symmetric)
export const PLINKO_SLOT_LABELS = [10, 5, 2, 1.5, 1, 1.5, 2, 5, 10] as const;
