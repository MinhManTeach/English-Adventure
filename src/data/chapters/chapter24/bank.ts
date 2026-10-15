import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { TRAVEL_WORDS } from './content';

const RULES = {
  manner: { en: 'Adverbs of manner say how we do something: adjective + -ly (quick → quickly, happy → happily, gentle → gently).', vi: 'Trạng từ chỉ cách thức cho biết làm việc gì như thế nào: tính từ + -ly (quick → quickly, happy → happily, gentle → gently).' },
  irregular: { en: 'Irregular adverbs: good → well; fast, hard, late, early and high stay the same. hardly = almost not; lately = recently.', vi: 'Trạng từ bất quy tắc: good → well; fast, hard, late, early, high giữ nguyên. hardly = hầu như không; lately = gần đây.' },
  adjAdv: { en: 'Use an adjective after be, look, feel, taste, sound and before a noun. Use an adverb after an action verb.', vi: 'Dùng tính từ sau be, look, feel, taste, sound và trước danh từ. Dùng trạng từ sau động từ chỉ hành động.' },
  compAdv: { en: 'Comparative adverbs: fast → faster, hard → harder; -ly adverbs use more (more carefully); well → better, badly → worse.', vi: 'So sánh hơn của trạng từ: fast → faster, hard → harder; trạng từ -ly dùng more (more carefully); well → better, badly → worse.' },
  degree: { en: 'Adverbs of degree go before an adjective or adverb: very, really, quite, too, extremely.', vi: 'Trạng từ chỉ mức độ đứng trước tính từ hoặc trạng từ: very, really, quite, too, extremely.' },
  position: { en: 'An adverb of manner usually goes after the verb and its object, not between them.', vi: 'Trạng từ chỉ cách thức thường đứng sau động từ và tân ngữ, không chen giữa chúng.' },
  adjPrep: { en: 'Adjective + preposition: good at, afraid of, interested in, proud of, worried about, famous for, keen on, kind to.', vi: 'Tính từ + giới từ: good at, afraid of, interested in, proud of, worried about, famous for, keen on, kind to.' },
  verbPrep: { en: 'Verb + preposition: listen to, wait for, look after, look for, belong to, depend on, agree with, pay for.', vi: 'Động từ + giới từ: listen to, wait for, look after, look for, belong to, depend on, agree with, pay for.' },
  time: { en: 'for + a length of time; since + a starting point; during + an event; until = up to; by = not later than.', vi: 'for + khoảng thời gian; since + mốc thời gian; during + trong suốt; until = cho đến khi; by = không muộn hơn.' },
  transport: { en: 'by bus / by train (no article); on foot; in a car / taxi; on a bus / train / plane.', vi: 'by bus / by train (không có mạo từ); on foot; in a car / taxi; on a bus / train / plane.' },
  ing: { en: 'After a preposition, use verb-ing: good at swimming, interested in learning.', vi: 'Sau giới từ dùng động từ-ing: good at swimming, interested in learning.' },
} as const;
const buildBank = createBankBuilder(RULES, 24);
const AD = 'adverbs', PR = 'prepositions';

export const UNIT_70_QUESTIONS: Question[] = buildBank(70, [
  ['Please write your name ___. (clear)', 'clearly', ['clear', 'clearlly', 'clearily'], 'manner', AD, 1],
  ['The old man walked ___ up the steps of the pagoda. (slow)', 'slowly', ['slowlly', 'slowely', 'slowily'], 'manner', AD, 1],
  ['Minh answered the phone ___. (polite)', 'politely', ['polite', 'politly', 'politelly'], 'manner', AD, 1],
  ['The baby is sleeping ___. (peaceful)', 'peacefully', ['peaceful', 'peacefuly', 'peacefullly'], 'manner', AD, 1],
  ['Hoa cooks very ___. Her spring rolls are the best! (good)', 'well', ['good', 'goodly', 'welly'], 'irregular', AD, 1],
  ['Nam tried ___, but he didn\'t win the race. (hard)', 'hard', ['hardly', 'hardily', 'hardful'], 'irregular', AD, 2],
  ['I can ___ hear you. The music is too loud.', 'hardly', ['hard', 'hardily', 'hardful'], 'irregular', AD, 3],
  ['Have you seen Lan ___? She hasn\'t been at school this week.', 'lately', ['late', 'latly', 'latefully'], 'irregular', AD, 3],
  ['The flowers in Da Lat look ___. (lovely)', 'lovely', ['lovelily', 'lovelyly', 'loveliness'], 'adjAdv', AD, 2],
  ['Lan sings ___ than anyone in our class. (well)', 'better', ['more well', 'weller', 'gooder'], 'compAdv', AD, 3],
  ['The pho smells ___. (wonderful)', 'wonderful', ['wonderfully', 'wonderfuly', 'wonder'], 'adjAdv', AD, 2],
  ['Mai can swim ___ than her brother. (fast)', 'faster', ['more fast', 'fastlier', 'more faster'], 'compAdv', AD, 2],
  ['Please drive ___ than last time. (carefully)', 'more carefully', ['carefullier', 'most carefully', 'more carefuller'], 'compAdv', AD, 2],
  ['This exercise is ___ difficult. I can\'t do it.', 'too', ['very much', 'enough', 'so much'], 'degree', AD, 2],
  ['The film was ___ good. I loved it!', 'really', ['realy', 'reallly', 'realily'], 'degree', AD, 1],
  ['The test was ___ easy, but not very easy. (a little)', 'quite', ['quiet', 'quit', 'quitely'], 'degree', AD, 3],
  ['Lan speaks English ___. (fluent)', 'fluently', ['fluent', 'fluentlly', 'fluentily'], 'manner', AD, 2],
  ['The teacher spoke ___ to the new student. (kind)', 'kindly', ['kind', 'kindely', 'kindily'], 'manner', AD, 2],
  ['Who works ___ in your family? (hard)', 'the hardest', ['the most hard', 'the hardliest', 'the most hardly'], 'compAdv', AD, 3],
  ['The bus stopped ___ and everyone fell forward. (sudden)', 'suddenly', ['sudden', 'suddenlly', 'suddenily'], 'manner', AD, 2],
], [
  ['Mai sings beautiful.', 'Mai sings beautifully.', ['Mai sings beautifuly.', 'Mai beautiful sings.'], 'manner', AD],
  ['Nam plays football very good.', 'Nam plays football very well.', ['Nam plays football very goodly.', 'Nam plays very good football well.'], 'irregular', AD],
  ['My dad works very hardly.', 'My dad works very hard.', ['My dad works very hardily.', 'My dad very hard works.'], 'irregular', AD],
  ['This cake tastes deliciously.', 'This cake tastes delicious.', ['This cake tastes deliciousily.', 'This cake deliciously tastes.'], 'adjAdv', AD],
  ['She speaks quietly English.', 'She speaks English quietly.', ['She quietly speaks English quiet.', 'She speaks English quiet.'], 'position', AD],
  ['Lan runs more fast than me.', 'Lan runs faster than me.', ['Lan runs more faster than me.', 'Lan runs fastlier than me.'], 'compAdv', AD],
], [
  ['Please close the door quietly.', 'manner', AD],
  ['Lan speaks English very well.', 'irregular', AD],
  ['The soup smells really good.', 'adjAdv', AD],
  ['Minh studies harder than his brother.', 'compAdv', AD],
  ['We waited patiently for the coach.', 'manner', AD],
]);

export const UNIT_71_QUESTIONS: Question[] = buildBank(71, [
  ['Are you good ___ playing chess?', 'at', ['of', 'on', 'about'], 'adjPrep', PR, 1],
  ['Ha Long Bay is famous ___ its beautiful islands.', 'for', ['of', 'with', 'about'], 'adjPrep', PR, 1],
  ['I\'m not afraid ___ spiders.', 'of', ['from', 'at', 'with'], 'adjPrep', PR, 1],
  ['Mum is very proud ___ my exam results.', 'of', ['for', 'with', 'on'], 'adjPrep', PR, 2],
  ['Minh is interested ___ about space. (learn)', 'in learning', ['in learn', 'on learning', 'to learning'], 'ing', PR, 3],
  ['Please wait ___ me at the bus stop.', 'for', ['to', 'on', 'about'], 'verbPrep', PR, 1],
  ['I like listening ___ music on the bus.', 'to', ['at', 'for', 'on'], 'verbPrep', PR, 1],
  ['Who looks ___ your dog when you go on holiday?', 'after', ['on', 'to', 'with'], 'verbPrep', PR, 2],
  ['This red suitcase belongs ___ my aunt.', 'to', ['at', 'for', 'with'], 'verbPrep', PR, 2],
  ['We stayed in Hoi An ___ four days.', 'for', ['during', 'since', 'by'], 'time', PR, 1],
  ['It rained a lot ___ our holiday in Sa Pa.', 'during', ['for', 'since', 'until'], 'time', PR, 2],
  ['My parents have worked at the hospital ___ 2015.', 'since', ['for', 'during', 'by'], 'time', PR, 2],
  ['The museum is open ___ 5 pm. Then it closes.', 'until', ['since', 'during', 'for'], 'time', PR, 2],
  ['Please send me the photos ___ Sunday. I need them on Monday.', 'by', ['until', 'since', 'during'], 'time', PR, 3],
  ['We went to Hue ___ train.', 'by', ['on', 'in', 'with'], 'transport', PR, 1],
  ['I usually go to school ___ foot.', 'on', ['in', 'at', 'with'], 'transport', PR, 1],
  ['We got to the hotel ___ a taxi.', 'in', ['by', 'on', 'at'], 'transport', PR, 2],
  ['Our bags were ___ the coach, so we couldn\'t get them.', 'on', ['by', 'at', 'with'], 'transport', PR, 2],
  ['Our trip depends ___ the weather.', 'on', ['at', 'of', 'from'], 'verbPrep', PR, 2],
  ['My sister is keen ___ taking photos.', 'on', ['in', 'at', 'of'], 'adjPrep', PR, 3],
], [
  ['I am interested on history.', 'I am interested in history.', ['I am interested at history.', 'I am interest in history.'], 'adjPrep', PR],
  ['Nam is good in drawing.', 'Nam is good at drawing.', ['Nam is good at draw.', 'Nam is good of drawing.'], 'adjPrep', PR],
  ['We waited the bus for an hour.', 'We waited for the bus for an hour.', ['We waited to the bus for an hour.', 'We waited for the bus since an hour.'], 'verbPrep', PR],
  ['I have lived here for 2018.', 'I have lived here since 2018.', ['I have lived here during 2018.', 'I have lived here by 2018.'], 'time', PR],
  ['We travelled to Da Lat by the coach.', 'We travelled to Da Lat by coach.', ['We travelled to Da Lat with coach.', 'We travelled to Da Lat in coach.'], 'transport', PR],
  ['Please finish your homework until Friday.', 'Please finish your homework by Friday.', ['Please finish your homework since Friday.', 'Please finish your homework during Friday.'], 'time', PR],
], [
  ['My little brother is afraid of dogs.', 'adjPrep', PR],
  ['Grandma looks after my baby sister.', 'verbPrep', PR],
  ['We stayed in Nha Trang for a week.', 'time', PR],
  ['Lan goes to school by bike.', 'transport', PR],
  ['I fell asleep during the long journey.', 'time', PR],
]);

/** A2 Unit 30: meaning and translation checks for every taught travel word. */
export const UNIT_72_QUESTIONS: Question[] = buildWordBank(72, 24, TRAVEL_WORDS);
