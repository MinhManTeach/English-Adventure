import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { MANNER_ITEMS, IRREGULAR_ITEMS, ADJ_ADV_ITEMS, COMP_ADV_ITEMS, ADJ_PREP_ITEMS, VERB_PREP_ITEMS, TIME_PREP_ITEMS, TRANSPORT_ITEMS, TRAVEL_WORDS } from './content';

type GapItem = readonly [string, string, string, readonly string[]];
type PrepItem = readonly [string, string, readonly string[]];

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  // A2 Unit 28 (id 70): -ly adverbs, irregular adverbs, adjective or adverb, comparative adverbs.
  register(70, 'adverbs', 'manner-form', MANNER_ITEMS.map((x, i) => {
    const head = [x.subj, x.verb, x.pre].filter(Boolean).join(' '), say = (w: string) => `${head} ${w}${x.post ? ' ' + x.post : ''}.`;
    const choices = [x.adj, ...x.wrong], gap = `${head} ___${x.post ? ' ' + x.post : ''}. (${x.adj})`;
    const rule = x.adj.endsWith('y') ? ['y → ily: happy → happily.', 'y → ily: happy → happily.']
      : x.adj.endsWith('le') ? ['-le → -ly: gentle → gently, terrible → terribly.', '-le → -ly: gentle → gently, terrible → terribly.']
      : ['Add -ly to the adjective: careful → carefully, polite → politely.', 'Thêm -ly vào tính từ: careful → carefully, polite → politely.'];
    return withContext(frame(`manner-${i}`, say(x.adv), choices.map(say), gap, x.adv, choices, `Say how someone does it: ${gap}`,
      `An adverb of manner describes the action. ${rule[0]} ${say(x.adv)}`, `Trạng từ chỉ cách thức bổ nghĩa cho động từ. ${rule[1]}`), `manner:${x.adj}`);
  }));
  const gapFrames = (items: readonly GapItem[], prefix: string, clue: string, en: (answer: string) => string, vi: (answer: string, hint: string) => string) =>
    items.map(([gap, hint, answer, wrong], i) => {
      const correct = gap.replace('___', answer), withHint = `${gap} (${hint})`;
      return withContext(frame(`${prefix}-${i}`, correct, wrong.map(w => gap.replace('___', w)), withHint, answer, [...wrong], `${clue} ${withHint}`, `${en(answer)} ${correct}`, vi(answer, hint)), `${prefix}:${i}`);
    });
  register(70, 'adverbs', 'irregular', gapFrames(IRREGULAR_ITEMS, 'irregular', 'Choose the adverb:',
    a => a === 'well' ? 'good is an adjective; its adverb is well.' : `${a} is the same as an adjective and an adverb. Don't add -ly${a === 'hard' ? ' (hardly means almost not)' : a === 'late' ? ' (lately means recently)' : a === 'high' ? ' (highly means very)' : ''}.`,
    a => a === 'well' ? 'good là tính từ; trạng từ của nó là well.' : `${a} vừa là tính từ vừa là trạng từ, không thêm -ly${a === 'hard' ? ' (hardly nghĩa là hầu như không)' : a === 'late' ? ' (lately nghĩa là gần đây)' : a === 'high' ? ' (highly nghĩa là rất)' : ''}.`));
  register(70, 'adverbs', 'adjective-or-adverb', gapFrames(ADJ_ADV_ITEMS, 'adj-adv', 'Adjective or adverb?',
    a => /ly$/.test(a) ? 'After an action verb, use an adverb.' : 'After be, look, feel, taste, sound or before a noun, use an adjective.',
    a => /ly$/.test(a) ? 'Sau động từ chỉ hành động dùng trạng từ.' : 'Sau be, look, feel, taste, sound hoặc trước danh từ dùng tính từ.'));
  register(70, 'adverbs', 'comparative-adverb', gapFrames(COMP_ADV_ITEMS, 'comp-adv', 'Compare how two people do it:',
    a => a.startsWith('more ') ? 'Adverbs ending in -ly use more: more carefully.' : ['better', 'worse'].includes(a) ? 'Irregular: well → better, badly → worse.' : 'Adverbs with the same form as the adjective add -er: faster, harder, earlier.',
    a => a.startsWith('more ') ? 'Trạng từ tận cùng -ly dùng more: more carefully.' : ['better', 'worse'].includes(a) ? 'Bất quy tắc: well → better, badly → worse.' : 'Trạng từ giống tính từ thì thêm -er: faster, harder, earlier.'));

  // A2 Unit 29 (id 71): adjective + preposition, verb + preposition, time prepositions, transport.
  const prepFrames = (items: readonly PrepItem[], prefix: string, clue: string, en: string, vi: string) => items.map(([gap, answer, wrong], i) => {
    const correct = gap.replace('___', answer);
    return withContext(frame(`${prefix}-${i}`, correct, wrong.map(w => gap.replace('___', w)), gap, answer, [...wrong], `${clue} ${gap}`, `${en} ${correct}`, vi), `${prefix}:${i}`);
  });
  register(71, 'prepositions', 'adjective-preposition', prepFrames(ADJ_PREP_ITEMS, 'adj-prep', 'Which preposition goes with the adjective?',
    'Some adjectives always take the same preposition: good at, afraid of, interested in, proud of, worried about, famous for, keen on.',
    'Một số tính từ luôn đi với giới từ cố định: good at, afraid of, interested in, proud of, worried about, famous for, keen on.'));
  register(71, 'prepositions', 'verb-preposition', prepFrames(VERB_PREP_ITEMS, 'verb-prep', 'Which preposition goes with the verb?',
    'Some verbs always take the same preposition: listen to, wait for, look after, belong to, depend on, agree with, pay for, spend on.',
    'Một số động từ luôn đi với giới từ cố định: listen to, wait for, look after, belong to, depend on, agree with, pay for, spend on.'));
  register(71, 'prepositions', 'time', prepFrames(TIME_PREP_ITEMS, 'time-prep', 'Choose the time preposition:',
    'for + a length of time; since + a starting point; during + an event; until = up to a time; by = not later than; from … to.',
    'for + khoảng thời gian; since + mốc thời gian; during + trong suốt sự kiện; until = cho đến khi; by = trước hoặc đúng lúc; from … to = từ … đến.'));
  register(71, 'prepositions', 'transport', prepFrames(TRANSPORT_ITEMS, 'transport', 'How do they travel?',
    'by + transport with no article (by bus, by train); on foot; in a car or taxi; on a bus, train, plane or boat.',
    'by + phương tiện, không có mạo từ (by bus, by train); on foot (đi bộ); in a car / taxi; on a bus / train / plane / boat.'));

  // A2 Unit 30 (id 72): travel words.
  registerWordUnit(72, TRAVEL_WORDS, 'travel', 'travel-meaning');
}
