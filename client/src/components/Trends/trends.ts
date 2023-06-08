export interface TrendItem {
  location: string
  trend: string
  tweets: number
}

export const initialTrendsItems: TrendItem[] = [
  {
    location: 'Gaming * Trending',
    trend: 'Steam',
    tweets: 49.85,
  },
  {
    location: 'Music * Trending',
    trend: 'Lana',
    tweets: 59.2,
  },
  {
    location: 'Music streaming service * Trending',
    trend: 'Spotify',
    tweets: 911,
  },
  {
    location: 'Gaming * Trending',
    trend: 'Switch',
    tweets: 150,
  },
  {
    location: 'Sports * Trending',
    trend: 'Newcastle',
    tweets: 51.6,
  },
  {
    location: 'Politics * Trending',
    trend: 'America',
    tweets: 467,
  },
  {
    location: 'Trending in Romania',
    trend: 'Tate',
    tweets: 24.5,
  },
  {
    location: 'Trending in Romania',
    trend: 'Greece',
    tweets: 17.5,
  },
  {
    location: 'Entertainment * Trending',
    trend: 'Peter',
    tweets: 15.7,
  },
  {
    location: 'Trending * Technology',
    trend: 'GPT',
    tweets: 215,
  },
]
