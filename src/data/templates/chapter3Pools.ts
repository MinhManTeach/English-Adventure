/** Controlled word pools for Chapter 3 (Units 7–9). Every entry is a complete, checked pairing. */

/** Unit 7: end-of-sentence markers that decide between Present Simple and Present Continuous. */
export const HABIT_MARKERS = ['every day', 'every Sunday', 'on Mondays', 'twice a week'] as const;
export const NOW_MARKERS = ['now', 'at the moment', 'right now'] as const;

/** Unit 7: state verbs are not used in the continuous form, even with "now". */
export const STATIVE_VERBS = [
  { base: 'like', third: 'likes', ing: 'liking', object: 'ice cream', vi: 'thích' },
  { base: 'love', third: 'loves', ing: 'loving', object: 'this song', vi: 'yêu thích' },
  { base: 'know', third: 'knows', ing: 'knowing', object: 'the answer', vi: 'biết' },
  { base: 'want', third: 'wants', ing: 'wanting', object: 'a new bike', vi: 'muốn' },
  { base: 'need', third: 'needs', ing: 'needing', object: 'a ruler', vi: 'cần' },
  { base: 'understand', third: 'understands', ing: 'understanding', object: 'the lesson', vi: 'hiểu' },
  { base: 'remember', third: 'remembers', ing: 'remembering', object: 'her name', vi: 'nhớ' },
  { base: 'hate', third: 'hates', ing: 'hating', object: 'cold weather', vi: 'ghét' },
  { base: 'believe', third: 'believes', ing: 'believing', object: 'his story', vi: 'tin' },
  { base: 'prefer', third: 'prefers', ing: 'preferring', object: 'orange juice', vi: 'thích hơn' },
] as const;

/**
 * Unit 8: regular verbs with their past form and two common misspellings.
 * rule: ed = add -ed, d = add -d, ied = consonant + y → -ied, double = double the last consonant.
 */
export const PAST_VERBS = [
  { base: 'play', past: 'played', third: 'plays', ing: 'playing', object: 'football', rule: 'ed', wrong: ['plaied', 'playd'] },
  { base: 'watch', past: 'watched', third: 'watches', ing: 'watching', object: 'a film', rule: 'ed', wrong: ['watchd', 'watcht'] },
  { base: 'visit', past: 'visited', third: 'visits', ing: 'visiting', object: 'Grandma', rule: 'ed', wrong: ['visitted', 'visitd'] },
  { base: 'clean', past: 'cleaned', third: 'cleans', ing: 'cleaning', object: 'the kitchen', rule: 'ed', wrong: ['cleanned', 'cleand'] },
  { base: 'help', past: 'helped', third: 'helps', ing: 'helping', object: 'Mum', rule: 'ed', wrong: ['helpt', 'helpped'] },
  { base: 'cook', past: 'cooked', third: 'cooks', ing: 'cooking', object: 'dinner', rule: 'ed', wrong: ['cookd', 'cookked'] },
  { base: 'walk', past: 'walked', third: 'walks', ing: 'walking', object: 'to school', rule: 'ed', wrong: ['walkd', 'walkked'] },
  { base: 'wash', past: 'washed', third: 'washes', ing: 'washing', object: 'the dishes', rule: 'ed', wrong: ['washd', 'washhed'] },
  { base: 'listen', past: 'listened', third: 'listens', ing: 'listening', object: 'to music', rule: 'ed', wrong: ['listend', 'listenned'] },
  { base: 'paint', past: 'painted', third: 'paints', ing: 'painting', object: 'a picture', rule: 'ed', wrong: ['paintd', 'paintted'] },
  { base: 'call', past: 'called', third: 'calls', ing: 'calling', object: 'Grandpa', rule: 'ed', wrong: ['cald', 'calld'] },
  { base: 'open', past: 'opened', third: 'opens', ing: 'opening', object: 'the window', rule: 'ed', wrong: ['openned', 'opend'] },
  { base: 'dance', past: 'danced', third: 'dances', ing: 'dancing', object: 'at the party', rule: 'd', wrong: ['danceed', 'dancd'] },
  { base: 'practise', past: 'practised', third: 'practises', ing: 'practising', object: 'the piano', rule: 'd', wrong: ['practiseed', 'practisd'] },
  { base: 'invite', past: 'invited', third: 'invites', ing: 'inviting', object: 'our friends', rule: 'd', wrong: ['inviteed', 'invitd'] },
  { base: 'study', past: 'studied', third: 'studies', ing: 'studying', object: 'English', rule: 'ied', wrong: ['studyed', 'studed'] },
  { base: 'carry', past: 'carried', third: 'carries', ing: 'carrying', object: 'the shopping bags', rule: 'ied', wrong: ['carryed', 'carryd'] },
  { base: 'tidy', past: 'tidied', third: 'tidies', ing: 'tidying', object: 'the classroom', rule: 'ied', wrong: ['tidyed', 'tidyd'] },
  { base: 'try', past: 'tried', third: 'tries', ing: 'trying', object: 'the new noodles', rule: 'ied', wrong: ['tryed', 'tryd'] },
  { base: 'stop', past: 'stopped', third: 'stops', ing: 'stopping', object: 'the bike', rule: 'double', wrong: ['stoped', 'stopt'] },
  { base: 'plan', past: 'planned', third: 'plans', ing: 'planning', object: 'a picnic', rule: 'double', wrong: ['planed', 'plannd'] },
  { base: 'chat', past: 'chatted', third: 'chats', ing: 'chatting', object: 'with friends', rule: 'double', wrong: ['chated', 'chatd'] },
  { base: 'drop', past: 'dropped', third: 'drops', ing: 'dropping', object: 'a cup', rule: 'double', wrong: ['droped', 'dropd'] },
] as const;
export const PAST_TIMES = ['yesterday', 'last night', 'last weekend', 'two days ago'] as const;

export const PAST_SPELLING_RULES: Record<string, { en: string; vi: string }> = {
  ed: { en: 'Most verbs add -ed.', vi: 'Hầu hết động từ thêm -ed.' },
  d: { en: 'Verbs ending in -e add -d.', vi: 'Động từ tận cùng bằng -e chỉ thêm -d.' },
  ied: { en: 'Consonant + y: change y to i and add -ed.', vi: 'Phụ âm + y: đổi y thành i rồi thêm -ed.' },
  double: { en: 'Short vowel + one consonant: double the consonant and add -ed.', vi: 'Nguyên âm ngắn + một phụ âm: gấp đôi phụ âm cuối rồi thêm -ed.' },
};
