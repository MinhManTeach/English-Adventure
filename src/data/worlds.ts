import type { ChapterId } from '../types';

/** One unit with the number of questions it contributes to a mixed session. */
export type UnitQuota = readonly [unit: number, count: number];

/** Player-facing words for a chapter boss. Kept as data so a new world needs no screen edits. */
export interface BossProfile {
  name: string;
  fullName: string;
  emoji: string;
  arena: string;
  leaveLabel: string;
  awaits: string;
  intro: string;
  strikeLabel: string;
  defeatedTitle: string;
  defeatedSubtitle: string;
  defeatedMessage: string;
  survivedTitle: string;
  defeatMessage: string;
  levelTitle: string;
  achievementTitle: string;
  unlockHint: string;
  mapBlurb: string;
  fightLabel: string;
  gateGoal: string;
  gatePass: string;
}

export interface WorldConfig {
  chapter: ChapterId;
  units: readonly [number, number, number];
  title: string;
  titleVi: string;
  emojis: string;
  intro: string;
  lockedHint: string;
  completeMessage: string;
  reviewTitle: string;
  reviewQuota: readonly UnitQuota[];
  bossQuota: readonly UnitQuota[];
  /** Marker stored in startedStages once a boss question is attempted. */
  bossStageKey: string;
  firstClear: { xp: number; coins: number };
  achievementId: string;
  /** Badge for worlds whose achievement is generated from this entry. */
  badge?: { title: string; titleVi: string; icon: string };
  /** Glow colour for worlds whose boss is drawn from its emoji. */
  bossColor?: string;
  boss: BossProfile;
}

export const WORLDS: readonly WorldConfig[] = [
  {
    chapter: 1, units: [1, 2, 3], title: 'Beginner Kingdom', titleVi: 'Vương Quốc Khởi Đầu', emojis: '🏰 🏡 🛋️',
    intro: 'Complete Units 1–3, pass Review Gate, then enter Grammar Castle!',
    lockedHint: '', completeMessage: 'You completed Units 1–3 and defeated Lord Verbose!',
    reviewTitle: 'Review Gate',
    reviewQuota: [[1, 3], [2, 3], [3, 2]], bossQuota: [[1, 3], [2, 4], [3, 3]],
    bossStageKey: 'boss', firstClear: { xp: 100, coins: 50 }, achievementId: 'boss_slayer',
    boss: {
      name: 'Lord Verbose', fullName: 'Lord Verbose', emoji: '🐉', arena: 'GRAMMAR CASTLE', leaveLabel: 'Leave Castle',
      awaits: 'Lord Verbose Awaits!', intro: "Lord Verbose guards Grammar Castle! Cast 10 accurate spells to claim the champion's trophy!",
      strikeLabel: '🔥 Dragon Strikes!', defeatedTitle: 'BOSS DEFEATED!', defeatedSubtitle: 'LORD VERBOSE HAS BEEN DEFEATED!',
      defeatedMessage: 'With your English grammar mastery, Grammar Castle is now unlocked!',
      survivedTitle: 'THE DRAGON SURVIVED!',
      defeatMessage: 'The Grammar Dragon is still guarding the castle. Review your weak questions and try again!',
      levelTitle: 'Castle Champion', achievementTitle: 'Grammar Castle Champion!',
      unlockHint: 'Defeat the Grammar Castle dragon to unlock.',
      mapBlurb: 'Lord Verbose awaits! Defeat him with your A1 grammar and home vocabulary mastery!',
      fightLabel: 'Fight Boss!', gateGoal: 'Prepare for Grammar Castle', gatePass: 'PASS — Grammar Castle is unlocked!',
    },
  },
  {
    chapter: 2, units: [4, 5, 6], title: 'Everyday Adventure', titleVi: 'Hành Trình Mỗi Ngày', emojis: '🏡 🚲 🌳 ⛵',
    intro: 'Follow the trail, explore Action Park and share your hobbies!',
    lockedHint: 'Complete Chapter 1 by defeating Lord Verbose to begin this adventure.',
    completeMessage: 'You mastered everyday routines, actions, and hobbies!',
    reviewTitle: 'Everyday Adventure Review',
    reviewQuota: [[4, 3], [5, 3], [6, 2]], bossQuota: [[4, 3], [5, 4], [6, 3]],
    bossStageKey: 'boss2', firstClear: { xp: 250, coins: 125 }, achievementId: 'time_master',
    boss: {
      name: 'Chronos', fullName: 'Chronos · Time Keeper', emoji: '⏱️ ⚙️', arena: 'TIME PORTAL', leaveLabel: 'Leave Time Portal',
      awaits: 'Chronos Awaits!', intro: 'Chronos guards the Time Portal! Cast 10 accurate spells about routines, actions and hobbies.',
      strikeLabel: '⏱️ Time Strike!', defeatedTitle: 'CHRONOS DEFEATED!', defeatedSubtitle: 'THE TIME KEEPER HAS BEEN DEFEATED!',
      defeatedMessage: 'You mastered everyday routines, actions and hobbies. Chapter 2 is complete!',
      survivedTitle: 'THE TIME KEEPER SURVIVED!',
      defeatMessage: 'Chronos still guards the portal. Review your mistakes and try again!',
      levelTitle: 'Time Master', achievementTitle: 'TIME MASTER!',
      unlockHint: 'Defeat Chronos in Chapter 2 to unlock.',
      mapBlurb: 'Control routines, actions and hobbies to open the Time Portal.',
      fightLabel: 'Fight Chronos!', gateGoal: 'Prepare for the Time Keeper', gatePass: 'PASS — Chronos is unlocked!',
    },
  },
  {
    chapter: 3, units: [7, 8, 9], title: 'School of Yesterday', titleVi: 'Ngôi Trường Hôm Qua', emojis: '⏰ 📜 🏫 🦉',
    intro: 'Choose now or every day, travel back to yesterday and explore school life!',
    lockedHint: 'Complete Chapter 2 by defeating Chronos to begin this adventure.',
    completeMessage: 'You mastered present tenses, the past simple and school life!',
    reviewTitle: 'School of Yesterday Review',
    reviewQuota: [[7, 3], [8, 3], [9, 2]], bossQuota: [[7, 3], [8, 4], [9, 3]],
    bossStageKey: 'boss3', firstClear: { xp: 300, coins: 150 }, achievementId: 'top_of_the_class',
    boss: {
      name: 'Professor Hoot', fullName: 'Professor Hoot · Exam Owl', emoji: '🦉 📚', arena: 'GREAT EXAM HALL', leaveLabel: 'Leave Exam Hall',
      awaits: 'Professor Hoot Awaits!', intro: 'Professor Hoot guards the Great Exam Hall! Cast 10 accurate spells about now, yesterday and school life.',
      strikeLabel: '📚 Pop Quiz!', defeatedTitle: 'PROFESSOR HOOT DEFEATED!', defeatedSubtitle: 'THE EXAM OWL HAS BEEN DEFEATED!',
      defeatedMessage: 'You mastered present tenses, the past simple and school life. Chapter 3 is complete!',
      survivedTitle: 'THE EXAM OWL SURVIVED!',
      defeatMessage: 'Professor Hoot still guards the exam hall. Review your mistakes and try again!',
      levelTitle: 'Top of the Class', achievementTitle: 'TOP OF THE CLASS!',
      unlockHint: 'Defeat Professor Hoot in Chapter 3 to unlock.',
      mapBlurb: 'Show what happens now, what happened yesterday and how school works to pass the Great Exam.',
      fightLabel: 'Fight Professor Hoot!', gateGoal: 'Prepare for the Exam Owl', gatePass: 'PASS — Professor Hoot is unlocked!',
    },
  },
  {
    chapter: 4, units: [10, 11, 12], title: 'Memory Island', titleVi: 'Đảo Ký Ức', emojis: '🗼 🌧️ 🤝 🏴‍☠️',
    intro: 'Light up the old lighthouse, survive the stormy night and make friends in the harbour!',
    lockedHint: 'Complete Chapter 3 by defeating Professor Hoot to begin this adventure.',
    completeMessage: 'You mastered was/were, irregular verbs, the past continuous and making friends!',
    reviewTitle: 'Memory Island Review',
    reviewQuota: [[10, 3], [11, 3], [12, 2]], bossQuota: [[10, 3], [11, 4], [12, 3]],
    bossStageKey: 'boss4', firstClear: { xp: 350, coins: 175 }, achievementId: 'memory_keeper',
    boss: {
      name: 'Captain Fogbeard', fullName: 'Captain Fogbeard · Memory Thief', emoji: '🏴‍☠️ 🌫️', arena: 'MISTY HARBOUR', leaveLabel: 'Leave the Harbour',
      awaits: 'Captain Fogbeard Awaits!', intro: 'Captain Fogbeard stole the island\'s memories! Cast 10 accurate spells about the past and friendship to bring them back.',
      strikeLabel: '🌫️ Fog Attack!', defeatedTitle: 'CAPTAIN FOGBEARD DEFEATED!', defeatedSubtitle: 'THE MEMORY THIEF HAS BEEN DEFEATED!',
      defeatedMessage: 'You brought back the island\'s memories with the past tenses and friendship words. Chapter 4 is complete!',
      survivedTitle: 'THE MEMORY THIEF ESCAPED!',
      defeatMessage: 'Captain Fogbeard still hides in the fog. Review your mistakes and try again!',
      levelTitle: 'Memory Keeper', achievementTitle: 'MEMORY KEEPER!',
      unlockHint: 'Defeat Captain Fogbeard in Chapter 4 to unlock.',
      mapBlurb: 'Tell what was happening, what happened next and who your friends are to clear the fog.',
      fightLabel: 'Fight Captain Fogbeard!', gateGoal: 'Prepare for the Memory Thief', gatePass: 'PASS — Captain Fogbeard is unlocked!',
    },
  },
  {
    chapter: 5, units: [13, 14, 15], title: 'Globe Trotters', titleVi: 'Vòng Quanh Thế Giới', emojis: '✈️ 🚉 🧳 🌀',
    intro: 'Share your experiences, count the years since you started and pack your bags for a world tour!',
    lockedHint: 'Complete Chapter 4 by defeating Captain Fogbeard to begin this adventure.',
    completeMessage: 'You mastered the present perfect, for and since, and travel words!',
    reviewTitle: 'Globe Trotters Review',
    reviewQuota: [[13, 3], [14, 3], [15, 2]], bossQuota: [[13, 3], [14, 4], [15, 3]],
    bossStageKey: 'boss5', firstClear: { xp: 400, coins: 200 }, achievementId: 'globe_trotter',
    badge: { title: 'GLOBE TROTTER', titleVi: 'Nhà du hành', icon: '🌍' }, bossColor: '#f59e0b',
    boss: {
      name: 'Sir Jetlag', fullName: 'Sir Jetlag · Lord of Lost Luggage', emoji: '🧳 🌀', arena: 'STORMY TERMINAL', leaveLabel: 'Leave the Terminal',
      awaits: 'Sir Jetlag Awaits!', intro: 'Sir Jetlag has mixed up every suitcase in the terminal! Cast 10 accurate spells about experiences, for and since, and travel.',
      strikeLabel: '🌀 Luggage Storm!', defeatedTitle: 'SIR JETLAG DEFEATED!', defeatedSubtitle: 'THE LORD OF LOST LUGGAGE HAS BEEN DEFEATED!',
      defeatedMessage: 'You mastered the present perfect and travel words. Chapter 5 is complete!',
      survivedTitle: 'SIR JETLAG IS STILL SPINNING!',
      defeatMessage: 'Sir Jetlag still blocks the terminal. Review your mistakes and try again!',
      levelTitle: 'Globe Trotter', achievementTitle: 'GLOBE TROTTER!',
      unlockHint: 'Defeat Sir Jetlag in Chapter 5 to unlock.',
      mapBlurb: 'Tell what you have done, how long you have done it and where you travelled to clear the terminal.',
      fightLabel: 'Fight Sir Jetlag!', gateGoal: 'Prepare for the Lord of Lost Luggage', gatePass: 'PASS — Sir Jetlag is unlocked!',
    },
  },
  {
    chapter: 6, units: [16, 17, 18], title: 'Future Stadium', titleVi: 'Sân Vận Động Tương Lai', emojis: '🌉 🗓️ 🏟️ 🔮',
    intro: 'Tell then from now, make plans for the future and train like a champion!',
    lockedHint: 'Complete Chapter 5 by defeating Sir Jetlag to begin this adventure.',
    completeMessage: 'You mastered present perfect or past simple, will and going to, and sports words!',
    reviewTitle: 'Future Stadium Review',
    reviewQuota: [[16, 3], [17, 3], [18, 2]], bossQuota: [[16, 3], [17, 4], [18, 3]],
    bossStageKey: 'boss6', firstClear: { xp: 450, coins: 225 }, achievementId: 'future_champion',
    badge: { title: 'FUTURE CHAMPION', titleVi: 'Nhà vô địch tương lai', icon: '🏆' }, bossColor: '#a855f7',
    boss: {
      name: 'Madame Crystal', fullName: 'Madame Crystal · Fortune Teller', emoji: '🔮 ✨', arena: 'CRYSTAL ARENA', leaveLabel: 'Leave the Arena',
      awaits: 'Madame Crystal Awaits!', intro: 'Madame Crystal says she knows your future! Cast 10 accurate spells about the past, the future and sport to prove her wrong.',
      strikeLabel: '🔮 Prophecy Blast!', defeatedTitle: 'MADAME CRYSTAL DEFEATED!', defeatedSubtitle: 'THE FORTUNE TELLER DID NOT SEE THAT COMING!',
      defeatedMessage: 'You mastered past, present perfect and future forms, and sports words. Chapter 6 is complete!',
      survivedTitle: 'THE CRYSTAL BALL STILL GLOWS!',
      defeatMessage: 'Madame Crystal still rules the arena. Review your mistakes and try again!',
      levelTitle: 'Future Champion', achievementTitle: 'FUTURE CHAMPION!',
      unlockHint: 'Defeat Madame Crystal in Chapter 6 to unlock.',
      mapBlurb: 'Choose between then and now, plan the future and talk about sport to break the crystal ball.',
      fightLabel: 'Fight Madame Crystal!', gateGoal: 'Prepare for the Fortune Teller', gatePass: 'PASS — Madame Crystal is unlocked!',
    },
  },
  {
    chapter: 7, units: [19, 20, 21], title: 'Rule Castle', titleVi: 'Lâu Đài Luật Lệ', emojis: '🧗 ⛰️ 🚦 🤖',
    intro: 'Show what you can do, learn what you must do and keep the city safe!',
    lockedHint: 'Complete Chapter 6 by defeating Madame Crystal to begin this adventure.',
    completeMessage: 'You mastered can, could, may, must, have to and rules words!',
    reviewTitle: 'Rule Castle Review',
    reviewQuota: [[19, 3], [20, 3], [21, 2]], bossQuota: [[19, 3], [20, 4], [21, 3]],
    bossStageKey: 'boss7', firstClear: { xp: 500, coins: 250 }, achievementId: 'rule_master',
    badge: { title: 'RULE MASTER', titleVi: 'Bậc thầy luật lệ', icon: '🛡️' }, bossColor: '#ef4444',
    boss: {
      name: 'Robo-Ranger', fullName: 'Robo-Ranger · Rule Robot', emoji: '🤖 🚨', arena: 'CASTLE COURTYARD', leaveLabel: 'Leave the Courtyard',
      awaits: 'Robo-Ranger Awaits!', intro: 'Robo-Ranger has made silly new rules for everyone! Cast 10 accurate spells about can, must, have to and rules to reset it.',
      strikeLabel: '🚨 Rule Alarm!', defeatedTitle: 'ROBO-RANGER DEFEATED!', defeatedSubtitle: 'THE RULE ROBOT HAS BEEN RESET!',
      defeatedMessage: 'You mastered modal verbs and rules words. Chapter 7 is complete!',
      survivedTitle: 'ROBO-RANGER IS STILL BEEPING!',
      defeatMessage: 'Robo-Ranger still guards the castle. Review your mistakes and try again!',
      levelTitle: 'Rule Master', achievementTitle: 'RULE MASTER!',
      unlockHint: 'Defeat Robo-Ranger in Chapter 7 to unlock.',
      mapBlurb: 'Say what people can, may, must and don\'t have to do to reset the Rule Robot.',
      fightLabel: 'Fight Robo-Ranger!', gateGoal: 'Prepare for the Rule Robot', gatePass: 'PASS — Robo-Ranger is unlocked!',
    },
  },
  {
    chapter: 8, units: [22, 23, 24], title: 'Market Town', titleVi: 'Thị Trấn Chợ Phiên', emojis: '🥫 🛒 🍜 🦝',
    intro: 'Count everything in the pantry, fill your basket and cook up a feast!',
    lockedHint: 'Complete Chapter 7 by defeating Robo-Ranger to begin this adventure.',
    completeMessage: 'You mastered plurals, countable and uncountable nouns, quantities and shopping words!',
    reviewTitle: 'Market Town Review',
    reviewQuota: [[22, 3], [23, 3], [24, 2]], bossQuota: [[22, 3], [23, 4], [24, 3]],
    bossStageKey: 'boss8', firstClear: { xp: 550, coins: 275 }, achievementId: 'market_master',
    badge: { title: 'MARKET MASTER', titleVi: 'Bậc thầy đi chợ', icon: '🛍️' }, bossColor: '#f97316',
    boss: {
      name: 'The Snack Snatcher', fullName: 'The Snack Snatcher · Pantry Bandit', emoji: '🦝 🍪', arena: 'NIGHT MARKET', leaveLabel: 'Leave the Market',
      awaits: 'The Snack Snatcher Awaits!', intro: 'The Snack Snatcher has stolen food from every stall! Cast 10 accurate spells about nouns, quantities and shopping to win it back.',
      strikeLabel: '🍪 Crumb Attack!', defeatedTitle: 'SNACK SNATCHER DEFEATED!', defeatedSubtitle: 'THE PANTRY BANDIT HAS BEEN CAUGHT!',
      defeatedMessage: 'You mastered nouns, quantities and shopping words. Chapter 8 is complete!',
      survivedTitle: 'THE SNACK SNATCHER RAN AWAY!',
      defeatMessage: 'The Snack Snatcher is still raiding the market. Review your mistakes and try again!',
      levelTitle: 'Market Master', achievementTitle: 'MARKET MASTER!',
      unlockHint: 'Defeat the Snack Snatcher in Chapter 8 to unlock.',
      mapBlurb: 'Count, measure and shop like a pro to catch the Pantry Bandit.',
      fightLabel: 'Fight the Snack Snatcher!', gateGoal: 'Prepare for the Pantry Bandit', gatePass: 'PASS — the Snack Snatcher is unlocked!',
    },
  },
  {
    chapter: 9, units: [25, 26, 27], title: 'Village of Faces', titleVi: 'Làng Muôn Mặt', emojis: '🎒 ❓ 😊 🎭',
    intro: 'Meet the villagers: find out what they have got, ask the right questions and describe every face!',
    lockedHint: 'Complete Chapter 8 by defeating the Snack Snatcher to begin this adventure.',
    completeMessage: 'You mastered have got, Wh-questions, question tags and words for people!',
    reviewTitle: 'Village of Faces Review',
    reviewQuota: [[25, 3], [26, 3], [27, 2]], bossQuota: [[25, 3], [26, 4], [27, 3]],
    bossStageKey: 'boss9', firstClear: { xp: 600, coins: 300 }, achievementId: 'people_reader',
    badge: { title: 'PEOPLE READER', titleVi: 'Bậc thầy đọc người', icon: '🔍' }, bossColor: '#ec4899',
    boss: {
      name: 'The Masked Mimic', fullName: 'The Masked Mimic · Face Stealer', emoji: '🎭 🪞', arena: 'MIRROR HALL', leaveLabel: 'Leave the Village',
      awaits: 'The Masked Mimic Awaits!', intro: 'The Masked Mimic has stolen the villagers\' faces! Cast 10 accurate spells about have got, questions and people to give them back.',
      strikeLabel: '🪞 Mirror Trick!', defeatedTitle: 'MASKED MIMIC DEFEATED!', defeatedSubtitle: 'EVERY FACE IS BACK WHERE IT BELONGS!',
      defeatedMessage: 'You mastered have got, questions and describing people. Chapter 9 is complete!',
      survivedTitle: 'THE MASKED MIMIC SLIPPED AWAY!',
      defeatMessage: 'The Masked Mimic is still wearing stolen faces. Review your mistakes and try again!',
      levelTitle: 'People Reader', achievementTitle: 'PEOPLE READER!',
      unlockHint: 'Defeat the Masked Mimic in Chapter 9 to unlock.',
      mapBlurb: 'Ask sharp questions and describe every face to unmask the Mimic.',
      fightLabel: 'Fight the Masked Mimic!', gateGoal: 'Prepare for the Face Stealer', gatePass: 'PASS — the Masked Mimic is unlocked!',
    },
  },
  {
    chapter: 10, units: [28, 29, 30], title: 'Wild Weather Valley', titleVi: 'Thung Lũng Thời Tiết', emojis: '🔤 🔢 🌦️ 🌪️',
    intro: 'Read the signs, count the stars and survive the wild weather of the valley!',
    lockedHint: 'Complete Chapter 9 by defeating the Masked Mimic to begin this adventure.',
    completeMessage: 'You mastered articles, numbers, dates and words for weather and nature!',
    reviewTitle: 'Wild Weather Valley Review',
    reviewQuota: [[28, 3], [29, 3], [30, 2]], bossQuota: [[28, 3], [29, 4], [30, 3]],
    bossStageKey: 'boss10', firstClear: { xp: 650, coins: 325 }, achievementId: 'nature_guardian',
    badge: { title: 'NATURE GUARDIAN', titleVi: 'Người bảo vệ thiên nhiên', icon: '🌍' }, bossColor: '#0ea5e9',
    boss: {
      name: 'Storm Queen Tempesta', fullName: 'Storm Queen Tempesta · Ruler of Thunder', emoji: '🌪️ ⚡', arena: 'EYE OF THE STORM', leaveLabel: 'Leave the Valley',
      awaits: 'Storm Queen Tempesta Awaits!', intro: 'Storm Queen Tempesta is blowing the valley away! Cast 10 accurate spells about articles, numbers and nature to calm the storm.',
      strikeLabel: '⚡ Lightning Strike!', defeatedTitle: 'TEMPESTA DEFEATED!', defeatedSubtitle: 'THE SUN IS SHINING AGAIN!',
      defeatedMessage: 'You mastered articles, numbers and nature words. Chapter 10 is complete!',
      survivedTitle: 'THE STORM IS STILL RAGING!',
      defeatMessage: 'Storm Queen Tempesta is still blowing. Review your mistakes and try again!',
      levelTitle: 'Nature Guardian', achievementTitle: 'NATURE GUARDIAN!',
      unlockHint: 'Defeat Storm Queen Tempesta in Chapter 10 to unlock.',
      mapBlurb: 'Use a, an and the, count high and name the weather to calm the storm.',
      fightLabel: 'Fight Storm Queen Tempesta!', gateGoal: 'Prepare for the Ruler of Thunder', gatePass: 'PASS — Storm Queen Tempesta is unlocked!',
    },
  },
];

export const LAST_CHAPTER = WORLDS[WORLDS.length - 1].chapter;
export const ALL_WORLD_UNIT_IDS: readonly number[] = WORLDS.flatMap(world => world.units);

export function getWorld(chapter: ChapterId): WorldConfig {
  return WORLDS.find(world => world.chapter === chapter) ?? WORLDS[0];
}

export function getWorldOfUnit(unitId: number): WorldConfig | undefined {
  return WORLDS.find(world => world.units.includes(unitId));
}

export function isChapterId(value: unknown): value is ChapterId {
  return WORLDS.some(world => world.chapter === value);
}
