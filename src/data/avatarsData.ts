export interface AvatarPreset {
  id: string;
  name: string;
  title: string;
  icon: string;
  color: string;
  bgGradient: string;
  tagline: string;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'leo',
    name: 'Leo the Tiger',
    title: 'Brave Explorer',
    icon: '🐯',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-orange-500',
    tagline: 'Always ready for an English quest!',
  },
  {
    id: 'bao',
    name: 'Bao the Panda',
    title: 'Grammar Sage',
    icon: '🐼',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-500',
    tagline: 'Calm, clever, and loves new words.',
  },
  {
    id: 'astra',
    name: 'Astra the Star',
    title: 'Cosmic Champion',
    icon: '🚀',
    color: '#6366F1',
    bgGradient: 'from-indigo-400 to-purple-500',
    tagline: 'Aiming for the highest stars in English!',
  },
  {
    id: 'sky',
    name: 'Sky the Falcon',
    title: 'Swift Reader',
    icon: '🦅',
    color: '#0EA5E9',
    bgGradient: 'from-sky-400 to-blue-500',
    tagline: 'Speedy learner with sharp eyes.',
  },
  {
    id: 'pip',
    name: 'Pip the Bunny',
    title: 'Joyful Speaker',
    icon: '🐰',
    color: '#EC4899',
    bgGradient: 'from-pink-400 to-rose-500',
    tagline: 'Bouncing through lessons with joy!',
  },
  {
    id: 'draco',
    name: 'Draco the Dragon',
    title: 'Word Master',
    icon: '🐲',
    color: '#8B5CF6',
    bgGradient: 'from-violet-400 to-fuchsia-500',
    tagline: 'Breathes magical sentences and stories.',
  },
];
