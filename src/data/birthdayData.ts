import { PhotoItem, TimelineEvent, ReasonCard, MessageCard, SurpriseAdjective } from '../types';

export const PHO_GALLERY_DATA: PhotoItem[] = [
  {
    id: '1',
    url: '/images/1.jpg',
    caption: 'A smile that carries kindness, happiness, and a little magic ✨ Never stop being this beautiful.',
    date: 'March 14, 2025',
    location: 'Cozy Bean Corner',
    category: 'favorites'
  },
  {
    id: '2',
    url: '/images/2.jpg',
    caption: 'Just being pretty 🌸',
    date: 'October 28, 2025',
    location: 'Downtown Fest',
    category: 'memories'
  },
  {
    id: '3',
    url: '/images/3.jpg',
    caption: 'Cute and elegant ✨',
    date: 'January 05, 2026',
    location: 'The Botanical Haven',
    category: 'travel'
  },
  {
    id: '4',
    url: '/images/4.jpg',
    caption: 'Simple, sweet, and beautiful 🌸',
    date: 'April 11, 2025',
    location: 'Sandy Horizon Coast',
    category: 'travel'
  },
  {
    id: '5',
    url: '/images/5.jpg',
    caption: 'Pretty in every little way 🦋',
    date: 'May 18, 2025',
    location: 'Study Session Library',
    category: 'goofy'
  },
  {
    id: '6',
    url: '/images/6.jpg',
    caption: 'Just being cute 💙',
    date: 'December 21, 2025',
    location: 'The Hilltop View',
    category: 'favorites'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    title: 'The First Spark',
    date: 'September 2024',
    description: 'A casual hello that slowly turned into nonstop midnight chats. Who knew that a simple greeting would lead to my favorite person?',
    emoji: '🌱'
  },
  {
    id: 't2',
    title: 'Becoming Inseparable',
    date: 'January 2025',
    description: 'Sharing Spotify playlists, sending goofy memes, and realizing we are essentially the exact same puzzle piece.',
    emoji: '🎵'
  },
  {
    id: 't3',
    title: 'The Unspoken Anchor',
    date: 'July 2025',
    description: 'When days got tough, your gentle voice and silly rants were my quiet refuge. You became the first person I wanted to tell everything to.',
    emoji: '⚓'
  },
  {
    id: 't4',
    title: 'An Everlasting Promise',
    date: 'Now & Forever',
    description: 'Standing here, celebrating you, wishing we could halt time. Here’s to many more sunset talks, cafe dates, and beautiful memories together.',
    emoji: '✨'
  }
];

export const REASON_CARDS: ReasonCard[] = [
  {
    id: 'r1',
    title: 'Your Radiant Smile',
    description: 'It’s literally therapeutic. One genuine burst of your laughter can wipe out my most stressful days in an instant.',
    emoji: '✨',
    tag: 'Charming'
  },
  {
    id: 'r2',
    title: 'An Incredibly Kind Soul',
    description: 'The way you care for animals, feel for others’ struggles, and try to heal the world is completely inspiring.',
    emoji: '🌸',
    tag: 'Pure'
  },
  {
    id: 'r3',
    title: 'The 2 AM Confidant',
    description: 'You listen to my most chaotic theories and emotional ramblings without an ounce of judgment, always making me feel heard.',
    emoji: '🌙',
    tag: 'Anchor'
  },
  {
    id: 'r4',
    title: 'Your Playful Goofiness',
    description: 'Only you can pull off the silliest faces and turn an incredibly boring grocery shopping store walk into an ultimate laughter riot.',
    emoji: '🤪',
    tag: 'Joy'
  },
  {
    id: 'r5',
    title: 'Your Deep Dedication',
    description: 'When you set your mind to a goal, you put in absolute heart and soul. It’s impossible not to admire your resilience.',
    emoji: '🎯',
    tag: 'Inspirational'
  },
  {
    id: 'r6',
    title: 'You Are Simply YOU',
    description: 'No pretenses, no masks. Just an authentic, gorgeous, sparkly soul who I am unbelievably lucky to call my bestie and crush.',
    emoji: '💖',
    tag: 'Unique'
  }
];

export const INITIAL_MESSAGES: MessageCard[] = [
  {
    id: 'm1',
    sender: 'Your Favorite Idiot (Poojan)',
    text: 'The girl with the sweetest smile ✨ We may not meet often, but the bond and memories we created will always be special. Wishing you endless happiness because you truly deserve it 🤍, Happy Birthday, Kupu ❤️!',
    date: 'June 19, 2026',
    bgColor: 'bg-rose-50 border-rose-200 text-rose-800',
    sticker: '💝',
    isPinned: true
  },
  {
    id: 'm2',
    sender: 'With Love',
    text: 'To my favorite person, may your life always be filled with happiness, dreams, and all the little things that make you smile ✨, Happy Birthday Kupu ❤️!',
    date: 'June 19, 2026', // maintaining original or updating to relative year
    bgColor: 'bg-violet-50 border-violet-200 text-violet-800',
    sticker: '🎈',
    isPinned: true
  },
  {
    id: 'm3',
    sender: 'Your Secret Admirer',
    text: 'May your birthday be as beautiful, wonderful, and charming as you are. Happy Birthday❤️! ', 
    date: 'June 19, 2026',
    bgColor: 'bg-amber-50 border-amber-200 text-amber-800',
    sticker: '⭐',
    isPinned: true
  }
];

export const SURPRISE_ADJECTIVES: SurpriseAdjective[] = [
  { phrase: 'Incredibly Intelligent 🧠', color: 'from-pink-400 to-rose-400' },
  { phrase: 'Purest Heart Ever 💖', color: 'from-rose-400 to-red-400' },
  { phrase: 'The Prettiest Smile ✨', color: 'from-amber-400 to-orange-400' },
  { phrase: 'Wonderfully Goofy 🤪', color: 'from-purple-400 to-indigo-400' },
  { phrase: 'My Constant Calm ⚓', color: 'from-emerald-400 to-teal-400' },
  { phrase: 'An Elegant Sparkle 🪐', color: 'from-blue-400 to-violet-400' },
  { phrase: 'Incurably Cute 🥰', color: 'from-fuchsia-400 to-rose-500' },
  { phrase: 'Absolutely Irreplaceable 🔒', color: 'from-violet-400 to-purple-600' }
];

export const BACKGROUND_MUSIC_STREAMS = [
  {
    title: 'Soft Guitar Romance',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  },
  {
    title: 'Golden Hour Piano',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
  },
  {
    title: 'Acoustic Calm Breeze',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  }
];
