import { GameQuestionType, Question } from '../../types';
import { SCHOOL_WORDS } from '../templates/schoolLife';

/** Short teaching notes shared by several authored questions. */
const RULES = {
  habit: { en: 'Habits and facts use Present Simple.', vi: 'Thói quen và sự thật dùng hiện tại đơn.' },
  now: { en: 'Actions happening now use am/is/are + verb-ing.', vi: 'Việc đang diễn ra dùng am/is/are + động từ-ing.' },
  temporary: { en: 'Actions around now (this week, today) use Present Continuous.', vi: 'Việc tạm thời quanh thời điểm nói (this week, today) dùng hiện tại tiếp diễn.' },
  state: { en: 'State verbs (like, know, want, need, taste…) are not used with -ing.', vi: 'Động từ chỉ trạng thái (like, know, want, need, taste…) không dùng dạng -ing.' },
  doQuestion: { en: 'Habit questions use Do/Does + base verb.', vi: 'Câu hỏi về thói quen: Do/Does + động từ nguyên mẫu.' },
  beQuestion: { en: 'Questions about now use Am/Is/Are + verb-ing.', vi: 'Câu hỏi về việc đang diễn ra: Am/Is/Are + động từ-ing.' },
  doNegative: { en: "Habit negatives use don't/doesn't + base verb.", vi: "Phủ định thói quen: don't/doesn't + động từ nguyên mẫu." },
  beNegative: { en: "Negatives about now use am not/isn't/aren't + verb-ing.", vi: "Phủ định việc đang diễn ra: am not/isn't/aren't + động từ-ing." },
  nowWords: { en: 'Now, at the moment and right now go with Present Continuous.', vi: 'now, at the moment, right now đi với hiện tại tiếp diễn.' },
  habitWords: { en: 'Every day, on Mondays and twice a week go with Present Simple.', vi: 'every day, on Mondays, twice a week đi với hiện tại đơn.' },
  past: { en: 'Finished time in the past uses Past Simple: verb + -ed.', vi: 'Thời gian đã qua dùng quá khứ đơn: động từ thêm -ed.' },
  ed: { en: 'Most verbs add -ed; verbs ending in -e add -d.', vi: 'Hầu hết động từ thêm -ed; động từ tận cùng bằng -e chỉ thêm -d.' },
  ied: { en: 'Consonant + y: change y to i and add -ed.', vi: 'Phụ âm + y: đổi y thành i rồi thêm -ed.' },
  double: { en: 'Short vowel + one consonant: double the last consonant and add -ed.', vi: 'Nguyên âm ngắn + một phụ âm: gấp đôi phụ âm cuối rồi thêm -ed.' },
  didNegative: { en: "Past negatives use didn't + base verb.", vi: "Phủ định quá khứ: didn't + động từ nguyên mẫu." },
  didQuestion: { en: 'Past questions use Did + subject + base verb.', vi: 'Câu hỏi quá khứ: Did + chủ ngữ + động từ nguyên mẫu.' },
  shortAnswer: { en: "Answer Did questions with Yes, … did. / No, … didn't.", vi: "Trả lời câu hỏi Did: Yes, … did. / No, … didn't." },
  pastWords: { en: 'Yesterday, last … and … ago show finished past time.', vi: 'yesterday, last …, … ago chỉ thời gian đã qua.' },
} as const;
type RuleKey = keyof typeof RULES;

/** [question with ___, answer, three wrong options, rule, topic, difficulty] */
type GapItem = readonly [string, string, readonly [string, string, string], RuleKey, string, 1 | 2 | 3];
/** [wrong sentence, correct sentence, two more wrong sentences, rule, topic] */
type RepairItem = readonly [string, string, readonly [string, string], RuleKey, string];
/** [sentence to build, rule, topic] */
type BuildItem = readonly [string, RuleKey, string];

function buildBank(unit: number, gaps: readonly GapItem[], repairs: readonly RepairItem[], builders: readonly BuildItem[]): Question[] {
  const id = (n: number) => `A1-U${String(unit).padStart(2, '0')}-C3-${String(n).padStart(3, '0')}`;
  const questions: Question[] = [];
  const add = (type: GameQuestionType, fields: Omit<Question, 'id' | 'level' | 'unit' | 'skill' | 'type' | 'xp'>) =>
    questions.push({ id: id(questions.length + 1), level: 'A1', unit, skill: 'grammar', type, xp: 10, ...fields });
  gaps.forEach(([question, answer, wrong, rule, topic, difficulty], index) => {
    const sentence = question.replace('___', answer);
    add(index % 2 === 0 ? 'fill-gap' : 'multiple-choice', { topic, question, options: [answer, ...wrong], answer, difficulty,
      explanation: { en: `${RULES[rule].en} ${sentence}`, vi: RULES[rule].vi }, audioText: sentence });
  });
  repairs.forEach(([wrongSentence, correct, others, rule, topic]) => add('error-hunter', { topic, question: wrongSentence,
    subPrompt: 'Find the mistake and choose the correct sentence.', options: [correct, wrongSentence, ...others], answer: correct,
    correctSentence: correct, difficulty: 2, explanation: { en: `${RULES[rule].en} ${correct}`, vi: RULES[rule].vi }, audioText: correct }));
  builders.forEach(([sentence, rule, topic]) => add('sentence-builder', { topic, question: 'Build the sentence.', words: sentence.split(' '),
    answer: sentence, difficulty: 3, explanation: { en: `${RULES[rule].en} ${sentence}`, vi: RULES[rule].vi }, audioText: sentence }));
  return questions;
}

const PSC = 'present-simple-vs-continuous', STATE = 'stative-verbs', PAST = 'past-simple';

export const UNIT_07_QUESTIONS: Question[] = buildBank(7, [
  ['Lan ___ to school every day.', 'walks', ['is walking', 'walk', 'walking'], 'habit', PSC, 1],
  ['Look! The bus ___ now.', 'is coming', ['comes', 'come', 'coming'], 'now', PSC, 1],
  ['We usually ___ lunch at twelve o’clock.', 'have', ['are having', 'has', 'having'], 'habit', PSC, 1],
  ['Be quiet! The baby ___ at the moment.', 'is sleeping', ['sleeps', 'sleep', 'sleeping'], 'now', PSC, 1],
  ['My dad ___ coffee every morning.', 'drinks', ['is drinking', 'drink', 'drinking'], 'habit', PSC, 1],
  ['Listen! Somebody ___ the piano.', 'is playing', ['plays', 'play', 'playing'], 'now', PSC, 2],
  ['They ___ English at the moment.', 'are studying', ['study', 'studies', 'studying'], 'now', PSC, 1],
  ['The sun ___ in the east.', 'rises', ['is rising', 'rise', 'rising'], 'habit', PSC, 2],
  ['My cousins ___ with us this week.', 'are staying', ['stay', 'stays', 'staying'], 'temporary', PSC, 3],
  ['How often ___ you go swimming?', 'do', ['are', 'does', 'is'], 'doQuestion', PSC, 2],
  ['What ___ you doing right now?', 'are', ['do', 'does', 'is'], 'beQuestion', PSC, 2],
  ['___ Minh play chess on Fridays?', 'Does', ['Is', 'Do', 'Are'], 'doQuestion', PSC, 2],
  ['___ your sister watching TV now?', 'Is', ['Does', 'Are', 'Do'], 'beQuestion', PSC, 2],
  ['Why ___ you laughing?', 'are', ['do', 'is', 'does'], 'beQuestion', PSC, 2],
  ['Nam ___ like spicy food.', "doesn't", ["isn't", "don't", "aren't"], 'doNegative', PSC, 2],
  ['We ___ playing football today because it is raining.', "aren't", ["don't", "isn't", "doesn't"], 'beNegative', PSC, 2],
  ['Hoa is reading a comic ___.', 'at the moment', ['every evening', 'on Sundays', 'twice a week'], 'nowWords', PSC, 1],
  ['Mr Binh teaches us History ___.', 'twice a week', ['right now', 'at the moment', 'now'], 'habitWords', PSC, 1],
  ['I ___ the answer to this question.', 'know', ['am knowing', 'knows', 'knowing'], 'state', STATE, 2],
  ['She ___ a new phone.', 'wants', ['is wanting', 'want', 'wanting'], 'state', STATE, 2],
  ['I ___ understand this word.', "don't", ['am not', "doesn't", 'not'], 'state', STATE, 2],
  ['This soup ___ delicious.', 'tastes', ['is tasting', 'taste', 'tasting'], 'state', STATE, 3],
  ['Mai ___ her new school very much.', 'likes', ['is liking', 'like', 'liking'], 'state', STATE, 2],
], [
  ['I am liking this film.', 'I like this film.', ['I likes this film.', 'I liking this film.'], 'state', STATE],
  ['She is go to school by bike every day.', 'She goes to school by bike every day.', ['She going to school by bike every day.', 'She go to school by bike every day.'], 'habit', PSC],
  ['Look! The children play in the snow.', 'Look! The children are playing in the snow.', ['Look! The children plays in the snow.', 'Look! The children is playing in the snow.'], 'now', PSC],
  ['Do you studying now?', 'Are you studying now?', ['Do you study now?', 'Are you study now?'], 'beQuestion', PSC],
  ["He don't play tennis on Sundays.", "He doesn't play tennis on Sundays.", ["He isn't play tennis on Sundays.", "He doesn't plays tennis on Sundays."], 'doNegative', PSC],
  ['We are needing a new map.', 'We need a new map.', ['We needs a new map.', 'We needing a new map.'], 'state', STATE],
], [
  ['My brother is doing his homework now.', 'now', PSC],
  ['We always have Music on Tuesday.', 'habit', PSC],
  ['Are they waiting for the bus?', 'beQuestion', PSC],
  ["She doesn't understand the question.", 'state', STATE],
  ['I usually walk to school with Hoa.', 'habit', PSC],
]);

export const UNIT_08_QUESTIONS: Question[] = buildBank(8, [
  ['We ___ a film last night.', 'watched', ['watch', 'watches', 'are watching'], 'past', PAST, 1],
  ['Mai ___ her grandparents last weekend.', 'visited', ['visits', 'visit', 'visiting'], 'past', PAST, 1],
  ['I ___ English for two hours yesterday.', 'studied', ['studyed', 'study', 'studies'], 'ied', PAST, 2],
  ['The bus ___ at the school gate ten minutes ago.', 'stopped', ['stoped', 'stops', 'stop'], 'double', PAST, 2],
  ['They ___ in the school concert last Friday.', 'danced', ['danceed', 'dance', 'dances'], 'ed', PAST, 2],
  ['He ___ the heavy box to the classroom yesterday.', 'carried', ['carryed', 'carries', 'carry'], 'ied', PAST, 2],
  ['We ___ a trip to the beach last summer.', 'planned', ['planed', 'plan', 'plans'], 'double', PAST, 2],
  ['I ___ my friends to my birthday party last month.', 'invited', ['inviteed', 'invite', 'invites'], 'ed', PAST, 2],
  ['The film ___ at eight o’clock and finished at ten.', 'started', ['starts', 'start', 'starting'], 'past', PAST, 1],
  ['Minh ___ do his homework yesterday.', "didn't", ["doesn't", "don't", "wasn't"], 'didNegative', PAST, 1],
  ['She didn’t ___ the piano last night.', 'practise', ['practised', 'practises', 'practising'], 'didNegative', PAST, 2],
  ['___ you call Grandpa yesterday?', 'Did', ['Do', 'Does', 'Were'], 'didQuestion', PAST, 1],
  ['Did they ___ the window this morning?', 'open', ['opened', 'opens', 'opening'], 'didQuestion', PAST, 2],
  ['What ___ you do last weekend?', 'did', ['do', 'does', 'were'], 'didQuestion', PAST, 2],
  ['Did Lan cook dinner last night? Yes, she ___.', 'did', ['does', 'was', 'cooked'], 'shortAnswer', PAST, 1],
  ['Did you play football last weekend? No, I ___.', "didn't", ["don't", "wasn't", 'not'], 'shortAnswer', PAST, 1],
  ['I cleaned my room ___.', 'yesterday', ['tomorrow', 'every day', 'now'], 'pastWords', PAST, 1],
  ['We visited the museum two weeks ___.', 'ago', ['last', 'before', 'yesterday'], 'pastWords', PAST, 2],
  ['Nam helped his mum ___ Sunday.', 'last', ['ago', 'yesterday', 'next'], 'pastWords', PAST, 2],
  ['Choose the past form of "try": Hoa ___ the new noodles.', 'tried', ['tryed', 'tryied', 'try'], 'ied', PAST, 2],
  ['Choose the past form of "chat": We ___ with our teacher after class.', 'chatted', ['chated', 'chatd', 'chat'], 'double', PAST, 2],
  ['Choose the past form of "live": My grandparents ___ in Hue.', 'lived', ['liveed', 'livd', 'live'], 'ed', PAST, 2],
  ['Choose the past form of "cry": The baby ___ all night.', 'cried', ['cryed', 'cryd', 'cry'], 'ied', PAST, 2],
  ['Choose the past form of "drop": I ___ my pencil on the floor.', 'dropped', ['droped', 'dropd', 'drop'], 'double', PAST, 2],
], [
  ["I didn't watched TV last night.", "I didn't watch TV last night.", ["I don't watch TV last night.", "I not watched TV last night."], 'didNegative', PAST],
  ['She walk to school yesterday.', 'She walked to school yesterday.', ['She walks to school yesterday.', 'She is walking to school yesterday.'], 'past', PAST],
  ['Did you played chess last weekend?', 'Did you play chess last weekend?', ['Do you play chess last weekend?', 'Were you play chess last weekend?'], 'didQuestion', PAST],
  ['We studyed for the test last night.', 'We studied for the test last night.', ['We study for the test last night.', 'We studed for the test last night.'], 'ied', PAST],
  ['He stoped the car at the red light.', 'He stopped the car at the red light.', ['He stopt the car at the red light.', 'He stops the car at the red light.'], 'double', PAST],
], [
  ['We played badminton after school yesterday.', 'past', PAST],
  ['Did you finish your project last week?', 'didQuestion', PAST],
  ["My sister didn't like the film.", 'didNegative', PAST],
  ['I tidied my desk last night.', 'ied', PAST],
  ['They travelled to Hue last summer.', 'double', PAST],
]);

/** Unit 9: meaning and translation checks for every taught school word. */
export const UNIT_09_QUESTIONS: Question[] = SCHOOL_WORDS.flatMap((word, index) => {
  const sameTopic = SCHOOL_WORDS.filter(other => other.topic === word.topic && other !== word);
  const pick = (start: number) => [0, 2, 4].map(step => sameTopic[(index + start + step) % sameTopic.length].word);
  const base = { level: 'A1' as const, unit: 9, skill: 'vocabulary' as const, topic: word.topic, xp: 10, imageIcon: word.icon,
    answer: word.word, explanation: { en: `${word.word}: ${word.definition}. ${word.example}`, vi: `${word.word}: ${word.vi}. ${word.exampleVi}` }, audioText: word.word };
  return [
    { ...base, id: `A1-U09-C3-${String(index * 2 + 1).padStart(3, '0')}`, type: 'matching' as const, difficulty: 1 as const,
      question: `Which word or phrase means "${word.definition}"?`, options: [word.word, ...pick(0)] },
    { ...base, id: `A1-U09-C3-${String(index * 2 + 2).padStart(3, '0')}`, type: 'multiple-choice' as const, difficulty: 2 as const,
      question: `How do you say "${word.vi}" in English?`, options: [word.word, ...pick(1)] },
  ];
});

export const CHAPTER3_QUESTIONS: Question[] = [...UNIT_07_QUESTIONS, ...UNIT_08_QUESTIONS, ...UNIT_09_QUESTIONS];
