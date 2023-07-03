export const MBTI = {
  IE: 'IE',
  NS: 'NS',
  FT: 'FT',
  JP: 'JP',
} as const;
type MBTI = (typeof MBTI)[keyof typeof MBTI];
