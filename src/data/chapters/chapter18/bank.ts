import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { SCHOOL_A2_WORDS } from './content';

const RULES = {
  participle: { en: 'Present Perfect: have/has + past participle. Many participles are irregular: break – broken, ride – ridden, fly – flown.', vi: 'Hiện tại hoàn thành: have/has + quá khứ phân từ. Nhiều động từ bất quy tắc: break – broken, ride – ridden, fly – flown.' },
  result: { en: 'Use the Present Perfect for a past action with a result now: I have lost my phone (I can\'t find it now).', vi: 'Dùng hiện tại hoàn thành cho việc đã xảy ra và còn kết quả ở hiện tại: I have lost my phone (giờ vẫn chưa tìm thấy).' },
  beenGone: { en: 'has gone to = went and is still there; has been to = went and came back (or has visited).', vi: 'has gone to = đã đi và vẫn đang ở đó; has been to = đã đến rồi quay về (hoặc đã từng đến).' },
  just: { en: 'just = a moment ago. It goes between have/has and the past participle.', vi: 'just = vừa mới. Đứng giữa have/has và quá khứ phân từ.' },
  already: { en: 'already = sooner than expected. It goes between have/has and the past participle.', vi: 'already = đã … rồi (sớm hơn mong đợi). Đứng giữa have/has và quá khứ phân từ.' },
  yet: { en: 'yet goes at the end of questions and negative sentences.', vi: 'yet (chưa) đứng cuối câu hỏi và câu phủ định.' },
  ever: { en: 'ever = at any time in your life. the best … + have/has ever + past participle.', vi: 'ever = đã từng. Cấu trúc: the best … + have/has ever + quá khứ phân từ.' },
  question: { en: 'Questions: Have/Has + subject (+ ever) + past participle?', vi: 'Câu hỏi: Have/Has + chủ ngữ (+ ever) + quá khứ phân từ?' },
  forSince: { en: 'for + a length of time (for three years, for ages); since + a starting point (since 2018, since Tết).', vi: 'for + khoảng thời gian (for three years, for ages); since + mốc thời gian (since 2018, since Tết).' },
  howLong: { en: 'How long + have/has + subject + past participle? asks about the time until now.', vi: 'How long + have/has + chủ ngữ + quá khứ phân từ? hỏi khoảng thời gian tính đến hiện tại.' },
  when: { en: 'When asks about a finished time, so it uses the Past Simple: When did …?', vi: 'When hỏi về thời điểm đã qua nên dùng quá khứ đơn: When did …?' },
  ago: { en: 'Past Simple + a period + ago: We moved here three years ago.', vi: 'Quá khứ đơn + khoảng thời gian + ago (cách đây): We moved here three years ago.' },
  perfectPast: { en: 'Present Perfect for situations that continue now (since, for, How long). Past Simple for finished times (last summer, in 2019, ago).', vi: 'Hiện tại hoàn thành cho tình huống còn tiếp diễn (since, for, How long). Quá khứ đơn cho thời gian đã kết thúc (last summer, in 2019, ago).' },
  sinceClause: { en: 'since + a clause in the Past Simple: since she was nine, since we moved here.', vi: 'since + mệnh đề ở quá khứ đơn: since she was nine, since we moved here.' },
} as const;
const buildBank = createBankBuilder(RULES, 18);
const PP = 'present-perfect', BG = 'been-gone', TW = 'just-already-yet', PT = 'present-perfect-time';

/** A2 Unit 10: Present Perfect 1. */
export const UNIT_52_QUESTIONS: Question[] = buildBank(52, [
  ['Oh no! I ___ my phone. Can you help me look for it? (lose)', 'have lost', ['has lost', 'have lose', 'am lost'], 'result', PP, 2],
  ["Lan has ___ her leg, so she can't play in the match. (break)", 'broken', ['broke', 'breaked', 'break'], 'participle', PP, 1],
  ['Have you ever ___ a horse? (ride)', 'ridden', ['rode', 'rided', 'ride'], 'participle', PP, 2],
  ["Dad isn't here. He has ___ to the market. He'll be back at ten.", 'gone', ['been', 'went', 'go'], 'beenGone', BG, 2],
  ['I have ___ to Hue three times. I love it there.', 'been', ['gone', 'went', 'go'], 'beenGone', BG, 2],
  ["We've ___ finished lunch. The plates are still on the table.", 'just', ['yet', 'ever', 'still'], 'just', TW, 2],
  ['Has the bus left ___?', 'yet', ['just', 'never', 'still'], 'yet', TW, 1],
  ["Don't tell me the ending! I haven't seen the film ___.", 'yet', ['just', 'never', 'still'], 'yet', TW, 2],
  ['Minh has ___ done his homework, so he can play now. (sooner than expected)', 'already', ['yet', 'ever', 'still'], 'already', TW, 2],
  ['This is the most delicious phở I have ___ eaten.', 'ever', ['never', 'yet', 'already'], 'ever', PP, 2],
  ['___ you ever tried durian?', 'Have', ['Did', 'Has', 'Do'], 'question', PP, 1],
  ['My sister has never ___ on a plane. (fly)', 'flown', ['flew', 'flied', 'fly'], 'participle', PP, 2],
  ["Someone ___ my bike! It isn't here. (steal)", 'has stolen', ['have stolen', 'has stole', 'is stolen'], 'result', PP, 3],
  ['The children ___ all the biscuits. The box is empty! (eat)', 'have eaten', ['has eaten', 'have ate', 'are eaten'], 'result', PP, 2],
  ['Have you ___ the new Doraemon film? (see)', 'seen', ['saw', 'seed', 'see'], 'participle', PP, 1],
  ['"Where\'s Lan?" "She\'s ___ to the library to return some books."', 'gone', ['been', 'went', 'go'], 'beenGone', BG, 3],
  ['Has your brother ___ to Singapore? – Yes, he went there last year.', 'been', ['gone', 'went', 'go'], 'beenGone', BG, 3],
  ['The children ___ the classroom. It looks great! (decorate)', 'have decorated', ['has decorated', 'have decorate', 'are decorated'], 'result', PP, 2],
  ["I've ___ heard the news. Lan won the competition! (a moment ago)", 'just', ['yet', 'ever', 'still'], 'just', TW, 2],
  ['Mum has ___ a cake for my birthday. (make)', 'made', ['maked', 'make', 'makes'], 'participle', PP, 1],
], [
  ['I have went to Da Lat twice.', 'I have been to Da Lat twice.', ['I have gone to Da Lat twice.', 'I has been to Da Lat twice.'], 'beenGone', BG],
  ['She has wrote three emails today.', 'She has written three emails today.', ['She have written three emails today.', 'She has writed three emails today.'], 'participle', PP],
  ['Have you yet finished your homework?', 'Have you finished your homework yet?', ['Have you finished yet your homework?', 'Has you finished your homework yet?'], 'yet', TW],
  ['We have just arrive at the station.', 'We have just arrived at the station.', ['We has just arrived at the station.', 'We have arrived just at the station.'], 'just', TW],
  ['This is the best book I have never read.', 'This is the best book I have ever read.', ['This is the best book I ever have read.', 'This is the best book I has ever read.'], 'ever', PP],
  ['My dad has broke his glasses.', 'My dad has broken his glasses.', ['My dad have broken his glasses.', 'My dad has breaked his glasses.'], 'participle', PP],
], [
  ['Have you ever been to Ha Long Bay?', 'question', PP],
  ['Lan has gone to the supermarket.', 'beenGone', BG],
  ['I have already done my homework.', 'already', TW],
  ['We have not finished the project yet.', 'yet', TW],
  ['This is the best film I have ever seen.', 'ever', PP],
]);

/** A2 Unit 11: Present Perfect 2. */
export const UNIT_53_QUESTIONS: Question[] = buildBank(53, [
  ['We have lived in Can Tho ___ 2018.', 'since', ['for', 'ago', 'yet'], 'forSince', PT, 1],
  ['Minh has played the guitar ___ three years.', 'for', ['since', 'ago', 'during'], 'forSince', PT, 1],
  ["I haven't seen my cousins ___ Tết.", 'since', ['for', 'ago', 'from'], 'forSince', PT, 2],
  ['Lan and Mai have been friends ___ ages.', 'for', ['since', 'ago', 'during'], 'forSince', PT, 2],
  ['How long ___ you known your best friend?', 'have', ['did', 'do', 'has'], 'howLong', PT, 1],
  ['When ___ you start learning English?', 'did', ['have', 'has', 'were'], 'when', PT, 2],
  ['My family moved to Hanoi five years ___.', 'ago', ['for', 'since', 'yet'], 'ago', PT, 2],
  ['Nam ___ at this school since Grade 6. (study)', 'has studied', ['studied', 'studies', 'is studying'], 'perfectPast', PT, 2],
  ['We ___ Phu Quoc last summer. It was amazing! (visit)', 'visited', ['have visited', 'visit', 'are visiting'], 'perfectPast', PT, 2],
  ['Mai has had her cat since she ___ nine.', 'was', ['is', 'has been', 'were'], 'sinceClause', PT, 3],
  ['I ___ Minh since we were in primary school. (know)', 'have known', ['know', 'knew', 'am knowing'], 'perfectPast', PT, 3],
  ['Grandpa ___ in a factory from 1980 to 1995. (work)', 'worked', ['has worked', 'works', 'is working'], 'perfectPast', PT, 3],
  ['___ have you had that bike? – Since my birthday.', 'How long', ['When', 'How much', 'What time'], 'howLong', PT, 2],
  ['The shop has been closed ___ last Monday.', 'since', ['for', 'ago', 'yet'], 'forSince', PT, 2],
  ['Have you seen Lan this morning? – Yes, I ___ her an hour ago. (see)', 'saw', ['have seen', 'see', 'seen'], 'perfectPast', PT, 3],
  ['My parents have been married ___ twenty years.', 'for', ['since', 'ago', 'during'], 'forSince', PT, 2],
  ['How long ___ your brother had his motorbike?', 'has', ['have', 'did', 'does'], 'howLong', PT, 2],
  ["I haven't eaten anything ___ breakfast.", 'since', ['for', 'ago', 'from'], 'forSince', PT, 2],
  ['Lan started piano lessons two years ago. She ___ the piano for two years. (play)', 'has played', ['played', 'plays', 'is playing'], 'perfectPast', PT, 3],
  ['We have lived here since we ___ to Da Nang in 2019. (move)', 'moved', ['have moved', 'move', 'were moving'], 'sinceClause', PT, 3],
], [
  ['I have lived here since five years.', 'I have lived here for five years.', ['I lived here since five years.', 'I have live here for five years.'], 'forSince', PT],
  ['When have you arrived in Hanoi?', 'When did you arrive in Hanoi?', ['When did you arrived in Hanoi?', 'When have you arrive in Hanoi?'], 'when', PT],
  ['She has bought a new phone last week.', 'She bought a new phone last week.', ['She buyed a new phone last week.', 'She has buy a new phone last week.'], 'perfectPast', PT],
  ['How long do you know Nam?', 'How long have you known Nam?', ['How long have you knew Nam?', 'How long did you known Nam?'], 'howLong', PT],
  ['Minh is in the choir since 2022.', 'Minh has been in the choir since 2022.', ['Minh have been in the choir since 2022.', 'Minh was been in the choir since 2022.'], 'perfectPast', PT],
  ['We moved here for three years ago.', 'We moved here three years ago.', ['We have moved here three years ago.', 'We moved here since three years.'], 'ago', PT],
], [
  ['I have known Lan for six years.', 'forSince', PT],
  ['How long have you lived in Hue?', 'howLong', PT],
  ['She has studied English since 2021.', 'forSince', PT],
  ['When did you start school?', 'when', PT],
  ['My cousin moved to Australia two years ago.', 'ago', PT],
]);

/** A2 Unit 12: meaning and translation checks for every taught school word. */
export const UNIT_54_QUESTIONS: Question[] = buildWordBank(54, 18, SCHOOL_A2_WORDS);
