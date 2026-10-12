/** Controlled word pools for Chapter 4 (Units 10–12). Every entry is a complete, checked pairing. */

/** Unit 10: places and feelings that pair with was/were. */
export const WAS_WERE_PREDICATES = [
  'at the beach', 'tired after the trip', 'at home', 'happy', 'late for school', 'in the garden',
  'hungry', 'at the cinema', 'sick', 'excited', 'cold', 'in the library',
] as const;

/**
 * Unit 10: irregular verbs with their past form and two made-up wrong forms.
 * Same-form verbs (cut, put, read) are left out so the past form is always visible.
 */
export const IRREGULAR_VERBS = [
  { base: 'go', past: 'went', third: 'goes', object: 'to the beach', wrong: ['goed', 'wented'] },
  { base: 'eat', past: 'ate', third: 'eats', object: 'noodles', wrong: ['eated', 'ated'] },
  { base: 'see', past: 'saw', third: 'sees', object: 'a rainbow', wrong: ['seed', 'sawed'] },
  { base: 'buy', past: 'bought', third: 'buys', object: 'a new bag', wrong: ['buyed', 'boughted'] },
  { base: 'make', past: 'made', third: 'makes', object: 'a cake', wrong: ['maked', 'maded'] },
  { base: 'take', past: 'took', third: 'takes', object: 'photos', wrong: ['taked', 'tooked'] },
  { base: 'have', past: 'had', third: 'has', object: 'a picnic', wrong: ['haved', 'hadded'] },
  { base: 'write', past: 'wrote', third: 'writes', object: 'a letter', wrong: ['writed', 'wroted'] },
  { base: 'drink', past: 'drank', third: 'drinks', object: 'orange juice', wrong: ['drinked', 'dranked'] },
  { base: 'swim', past: 'swam', third: 'swims', object: 'in the sea', wrong: ['swimmed', 'swamed'] },
  { base: 'sing', past: 'sang', third: 'sings', object: 'a song', wrong: ['singed', 'sanged'] },
  { base: 'ride', past: 'rode', third: 'rides', object: 'a bike', wrong: ['rided', 'roded'] },
  { base: 'find', past: 'found', third: 'finds', object: 'a shell', wrong: ['finded', 'fond'] },
  { base: 'give', past: 'gave', third: 'gives', object: 'Mum a present', wrong: ['gived', 'gaved'] },
  { base: 'bring', past: 'brought', third: 'brings', object: 'sandwiches', wrong: ['bringed', 'brang'] },
  { base: 'catch', past: 'caught', third: 'catches', object: 'a fish', wrong: ['catched', 'caughted'] },
  { base: 'meet', past: 'met', third: 'meets', object: 'our cousins', wrong: ['meeted', 'metted'] },
  { base: 'win', past: 'won', third: 'wins', object: 'the match', wrong: ['winned', 'wonned'] },
  { base: 'lose', past: 'lost', third: 'loses', object: 'the key', wrong: ['losed', 'losted'] },
  { base: 'build', past: 'built', third: 'builds', object: 'a sandcastle', wrong: ['builded', 'builted'] },
  { base: 'draw', past: 'drew', third: 'draws', object: 'a map', wrong: ['drawed', 'drewed'] },
  { base: 'sleep', past: 'slept', third: 'sleeps', object: 'in a tent', wrong: ['sleeped', 'slepted'] },
  { base: 'come', past: 'came', third: 'comes', object: 'home late', wrong: ['comed', 'camed'] },
  { base: 'get', past: 'got', third: 'gets', object: 'a postcard', wrong: ['getted', 'gotted'] },
] as const;

/** Unit 11: longer actions that can be in progress at a moment in the past. */
export const LONG_ACTIONS = [
  { base: 'play', ing: 'playing', object: 'football' },
  { base: 'watch', ing: 'watching', object: 'TV' },
  { base: 'do', ing: 'doing', object: 'homework' },
  { base: 'cook', ing: 'cooking', object: 'dinner' },
  { base: 'ride', ing: 'riding', object: 'a bike' },
  { base: 'walk', ing: 'walking', object: 'home' },
  { base: 'wash', ing: 'washing', object: 'the dishes' },
  { base: 'have', ing: 'having', object: 'dinner' },
  { base: 'study', ing: 'studying', object: 'English' },
  { base: 'draw', ing: 'drawing', object: 'a picture' },
  { base: 'swim', ing: 'swimming', object: 'in the river' },
  { base: 'wait', ing: 'waiting', object: 'for the bus' },
  { base: 'listen', ing: 'listening', object: 'to music' },
  { base: 'clean', ing: 'cleaning', object: 'the kitchen' },
  { base: 'play', ing: 'playing', object: 'chess' },
  { base: 'take', ing: 'taking', object: 'photos' },
  { base: 'tidy', ing: 'tidying', object: 'the room' },
  { base: 'sing', ing: 'singing', object: 'a song' },
] as const;

/** Unit 11: exact moments in the past that ask for the past continuous. */
export const PAST_MOMENTS = ["at eight o'clock last night", 'at 7 am yesterday', "at nine o'clock yesterday", 'at this time yesterday'] as const;

/** Unit 11: short past actions that interrupt a longer one (singular subjects only). */
export const INTERRUPTIONS = [
  { subject: 'the phone', base: 'ring', past: 'rang', third: 'rings', wrong: 'ringed', tail: '' },
  { subject: 'it', base: 'begin', past: 'began', third: 'begins', wrong: 'beginned', tail: ' to rain' },
  { subject: 'Mum', base: 'come', past: 'came', third: 'comes', wrong: 'comed', tail: ' home' },
  { subject: 'the dog', base: 'bark', past: 'barked', third: 'barks', wrong: 'barkt', tail: ' loudly' },
  { subject: 'the bus', base: 'arrive', past: 'arrived', third: 'arrives', wrong: 'arriveed', tail: '' },
  { subject: 'a car', base: 'stop', past: 'stopped', third: 'stops', wrong: 'stoped', tail: ' near us' },
  { subject: 'my friend', base: 'call', past: 'called', third: 'calls', wrong: 'calld', tail: ' me' },
  { subject: 'someone', base: 'shout', past: 'shouted', third: 'shouts', wrong: 'shoutted', tail: ' hello' },
] as const;
