import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { SPORT_WORDS } from './content';

const RULES = {
  finished: { en: 'A finished time (yesterday, last week, in 2022, ago) needs Past Simple.', vi: 'Thời gian đã kết thúc (yesterday, last week, in 2022, ago) dùng quá khứ đơn.' },
  noTime: { en: 'No finished time, or ever/never/already/just/yet: use Present Perfect.', vi: 'Không có thời gian cụ thể, hoặc có ever/never/already/just/yet: dùng hiện tại hoàn thành.' },
  when: { en: 'When …? asks for a finished time, so it uses Past Simple.', vi: 'When …? hỏi thời điểm cụ thể nên dùng quá khứ đơn.' },
  story: { en: 'Ask with Present Perfect, then give details with Past Simple.', vi: 'Hỏi bằng hiện tại hoàn thành, sau đó kể chi tiết bằng quá khứ đơn.' },
  will: { en: 'will + base verb: predictions, promises and decisions made now.', vi: 'will + động từ nguyên mẫu: dự đoán, lời hứa, quyết định ngay lúc nói.' },
  wont: { en: "won't = will not.", vi: "won't = will not." },
  goingTo: { en: 'be going to + base verb: plans made before now.', vi: 'be going to + động từ nguyên mẫu: kế hoạch đã định trước.' },
  evidence: { en: 'be going to: we can see it will happen.', vi: 'be going to: thấy rõ dấu hiệu sắp xảy ra.' },
  shall: { en: 'Shall I …? / Shall we …? make offers and suggestions.', vi: 'Shall I …? / Shall we …? dùng để đề nghị, gợi ý.' },
  decision: { en: 'A decision made at the moment of speaking uses will.', vi: 'Quyết định ngay lúc nói dùng will.' },
} as const;
const buildBank = createBankBuilder(RULES, 6);
const PP = 'perfect-or-past', WG = 'will-going-to';

export const UNIT_16_QUESTIONS: Question[] = buildBank(16, [
  ['I ___ my homework an hour ago.', 'finished', ['have finished', 'finish', 'has finished'], 'finished', PP, 1],
  ['She ___ her project. Look, it\'s on the desk!', 'has finished', ['finish', 'have finished', 'finishing'], 'noTime', PP, 2],
  ['We ___ to the gym yesterday.', 'went', ['have gone', 'go', 'have been'], 'finished', PP, 1],
  ['Have you ___ eaten this kind of fish?', 'ever', ['yesterday', 'ago', 'last'], 'noTime', PP, 1],
  ['Dean took the test a week ___.', 'ago', ['yet', 'already', 'since'], 'finished', PP, 1],
  ['They ___ in Hanoi in 2019.', 'lived', ['have lived', 'live', 'has lived'], 'finished', PP, 2],
  ['I ___ never tried Chinese food.', 'have', ['did', 'was', 'has'], 'noTime', PP, 1],
  ['When ___ you buy that jacket?', 'did', ['have', 'has', 'do'], 'when', PP, 2],
  ['My parents ___ married in 2010.', 'got', ['have got', 'get', 'has got'], 'finished', PP, 2],
  ['___ you seen my keys? I can\'t find them.', 'Have', ['Did', 'Do', 'Has'], 'noTime', PP, 1],
  ['Have you ever been to Sapa? Yes, I ___ there last winter.', 'went', ['have gone', 'go', 'have been'], 'story', PP, 2],
  ['Has Nam ever won a medal? Yes, he ___ one in 2023.', 'won', ['has won', 'wins', 'win'], 'story', PP, 2],
  ['We ___ already done the cooking.', 'have', ['did', 'were', 'are'], 'noTime', PP, 1],
  ['She ___ the film on Saturday.', 'saw', ['has seen', 'see', 'have seen'], 'finished', PP, 1],
  ['I can\'t play. I ___ my leg!', 'have broken', ['break', 'has broken', 'have break'], 'noTime', PP, 2],
  ['Lan ___ to the dentist two days ago.', 'went', ['has gone', 'goes', 'has been'], 'finished', PP, 1],
  ['We have just ___ making lunch.', 'finished', ['finish', 'finishing', 'finishes'], 'noTime', PP, 1],
  ['What time ___ the film start last night?', 'did', ['has', 'have', 'does'], 'when', PP, 2],
  ['You ___ done your homework yet.', "haven't", ["didn't", "don't", "hasn't"], 'noTime', PP, 2],
  ['I ___ football last week.', 'played', ['have played', 'play', 'has played'], 'finished', PP, 1],
], [
  ['I have seen that film last night.', 'I saw that film last night.', ['I have saw that film last night.', 'I see that film last night.'], 'finished', PP],
  ['When have you arrived?', 'When did you arrive?', ['When did you arrived?', 'When you arrived?'], 'when', PP],
  ['Did you ever visit Hue? Yes, I have visited it in 2021.', 'Have you ever visited Hue? Yes, I visited it in 2021.', ['Have you ever visited Hue? Yes, I have visit it in 2021.', 'Have you ever visit Hue? Yes, I visited it in 2021.'], 'story', PP],
  ['She has finished her homework two hours ago.', 'She finished her homework two hours ago.', ['She finish her homework two hours ago.', 'She have finished her homework two hours ago.'], 'finished', PP],
  ['We didn\'t eat lunch yet.', 'We haven\'t eaten lunch yet.', ['We haven\'t eat lunch yet.', 'We hasn\'t eaten lunch yet.'], 'noTime', PP],
  ['They have went to the beach in July.', 'They went to the beach in July.', ['They have gone to the beach in July.', 'They go to the beach in July.'], 'finished', PP],
], [
  ['Have you ever played table tennis?', 'noTime', PP],
  ['I played table tennis last weekend.', 'finished', PP],
  ['When did you start learning English?', 'when', PP],
  ['She has already cleaned her room.', 'noTime', PP],
  ['We visited the zoo two weeks ago.', 'finished', PP],
]);

export const UNIT_17_QUESTIONS: Question[] = buildBank(17, [
  ['I think it ___ be sunny tomorrow.', 'will', ['is', 'going', 'does'], 'will', WG, 1],
  ['Look at those black clouds! It ___ rain.', 'is going to', ['going to', 'will to', 'is go to'], 'evidence', WG, 1],
  ['The phone is ringing. I ___ answer it.', 'will', ['am', 'going', 'does'], 'decision', WG, 2],
  ['We ___ visit Hoi An next month. We have booked the hotel.', 'are going to', ['is going to', 'going to', 'are go to'], 'goingTo', WG, 2],
  ['Don\'t worry. I ___ tell anyone your secret.', "won't", ["don't", "willn't", "am not"], 'wont', WG, 1],
  ['___ you help me with this box, please?', 'Will', ['Are', 'Do', 'Shall'], 'will', WG, 2],
  ['___ I open the window? It\'s hot in here.', 'Shall', ['Will', 'Am', 'Does'], 'shall', WG, 2],
  ['___ we go to the cinema tonight?', 'Shall', ['Are', 'Does', 'Did'], 'shall', WG, 2],
  ['My sister ___ going to study Medicine at university.', 'is', ['are', 'will', 'am'], 'goingTo', WG, 1],
  ['I ___ going to watch TV tonight. I have a test tomorrow.', 'am not', ["won't", "don't", "isn't"], 'goingTo', WG, 2],
  ['Are you going to train tomorrow? Yes, I ___.', 'am', ['will', 'do', 'going'], 'goingTo', WG, 1],
  ['Will they live in London? No, they ___.', "won't", ["don't", "aren't", "willn't"], 'wont', WG, 1],
  ['Be careful! You ___ fall!', 'are going to', ['are go to', 'going to', 'is going to'], 'evidence', WG, 2],
  ['I\'m hungry. I think I ___ make a sandwich.', 'will', ['am', 'is', 'going'], 'decision', WG, 2],
  ['In 2050, people ___ drive flying cars.', 'will', ['are', 'going', 'did'], 'will', WG, 1],
  ['What ___ you going to do after school?', 'are', ['will', 'do', 'is'], 'goingTo', WG, 2],
  ['The new gym ___ have a big pool. It will be wonderful!', 'will', ['is', 'going', 'does'], 'will', WG, 1],
  ['Minh is going to ___ swimming after school.', 'go', ['goes', 'going', 'went'], 'goingTo', WG, 1],
  ['I promise I ___ be late again.', "won't", ["don't", "am not", "willn't"], 'wont', WG, 1],
  ['Hoa has saved her money. She ___ buy a new bike.', 'is going to', ['are going to', 'going to', 'is going'], 'goingTo', WG, 2],
], [
  ['I will to call you later.', 'I will call you later.', ['I will calling you later.', 'I wills call you later.'], 'will', WG],
  ['She going to visit her aunt next week.', 'She is going to visit her aunt next week.', ['She is going visit her aunt next week.', 'She are going to visit her aunt next week.'], 'goingTo', WG],
  ['He will plays tennis tomorrow.', 'He will play tennis tomorrow.', ['He will playing tennis tomorrow.', 'He wills play tennis tomorrow.'], 'will', WG],
  ['Look at that car! It is going crash!', 'Look at that car! It is going to crash!', ['Look at that car! It going to crash!', 'Look at that car! It are going to crash!'], 'evidence', WG],
  ["We don't will be late.", "We won't be late.", ["We willn't be late.", "We won't to be late."], 'wont', WG],
  ['Do you going to play football on Sunday?', 'Are you going to play football on Sunday?', ['Are you go to play football on Sunday?', 'Is you going to play football on Sunday?'], 'goingTo', WG],
], [
  ['I am going to take up karate this year.', 'goingTo', WG],
  ['It will be a great match.', 'will', WG],
  ['Shall we go for a walk?', 'shall', WG],
  ["They won't win the race.", 'wont', WG],
  ['Is your brother going to join the team?', 'goingTo', WG],
]);

/** Unit 18: meaning and translation checks for every taught sports word. */
export const UNIT_18_QUESTIONS: Question[] = buildWordBank(18, 6, SPORT_WORDS);
