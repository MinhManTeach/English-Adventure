import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { HEALTH_WORDS } from './content';

const RULES = {
  firstCond: { en: 'First conditional: If + present simple, will / won\'t + base verb, for real possibilities. No will after if.', vi: 'Câu điều kiện loại 1: If + hiện tại đơn, will / won\'t + động từ nguyên mẫu, cho điều có thể xảy ra. Không dùng will sau if.' },
  unless: { en: 'Unless = if ... not. The verb after unless is positive, in the present simple.', vi: 'Unless = if ... not (trừ khi). Động từ sau unless ở thể khẳng định, thì hiện tại đơn.' },
  modalResult: { en: 'The result can use can, might, may, should or must + base verb (no to, no -s).', vi: 'Mệnh đề kết quả có thể dùng can, might, may, should, must + động từ nguyên mẫu (không có to, không thêm -s).' },
  imperativeResult: { en: 'If + present simple, then an imperative (base verb, no subject) to tell someone what to do.', vi: 'If + hiện tại đơn, sau đó là câu mệnh lệnh (động từ nguyên mẫu, không chủ ngữ) để bảo ai đó làm gì.' },
  whenIf: { en: 'After when, as soon as and before, use the present simple for the future, like after if.', vi: 'Sau when, as soon as, before dùng hiện tại đơn để nói về tương lai, giống như sau if.' },
  question: { en: 'Question: What will + subject + base verb + if + present simple?', vi: 'Câu hỏi: What will + chủ ngữ + động từ nguyên mẫu + if + hiện tại đơn?' },
  secondCond: { en: 'Second conditional: If + past simple, would / wouldn\'t + base verb, for imaginary situations now or in the future.', vi: 'Câu điều kiện loại 2: If + quá khứ đơn, would / wouldn\'t + động từ nguyên mẫu, cho tình huống không có thật ở hiện tại hoặc tương lai.' },
  were: { en: 'In the second conditional, be is were for every subject: If I were, if she were, if it weren\'t.', vi: 'Trong câu điều kiện loại 2, to be dùng were cho mọi chủ ngữ: If I were, if she were, if it weren\'t.' },
  advice: { en: 'Give advice with If I were you, I would / I wouldn\'t + base verb.', vi: 'Khuyên ai đó: If I were you, I would / I wouldn\'t + động từ nguyên mẫu (Nếu tôi là bạn, tôi sẽ...).' },
  wouldQuestion: { en: 'Question: What / Where / Who would + subject + base verb + if + past simple?', vi: 'Câu hỏi: What / Where / Who would + chủ ngữ + động từ nguyên mẫu + if + quá khứ đơn?' },
  realUnreal: { en: 'Real possibility: If + present, will. Imaginary: If + past, would. Don\'t mix them.', vi: 'Có thể xảy ra: If + hiện tại, will. Tưởng tượng: If + quá khứ, would. Không trộn hai loại.' },
} as const;
const buildBank = createBankBuilder(RULES, 25);
const FC = 'first-conditional', SC = 'second-conditional';

export const UNIT_73_QUESTIONS: Question[] = buildBank(73, [
  ['If it ___ tomorrow, we will stay at home. (rain)', 'rains', ['will rain', 'rained', 'rain'], 'firstCond', FC, 1],
  ['If Mai ___ the bus, she will walk to school. (miss)', 'misses', ['will miss', 'miss', 'missed'], 'firstCond', FC, 1],
  ['We ___ late unless we leave now. (be)', 'will be', ['were', 'would be', 'be'], 'unless', FC, 2],
  ['___ you hurry, you will miss the train.', 'Unless', ['If', 'When', 'Because'], 'unless', FC, 2],
  ['I won\'t go to the party unless Lan ___ too. (go)', 'goes', ['doesn\'t go', 'will go', 'go'], 'unless', FC, 2],
  ['If you see Nam, ___ him I said hello. (tell)', 'tell', ['to tell', 'telling', 'will tell'], 'imperativeResult', FC, 1],
  ['If the weather is nice, we ___ go to the beach. Maybe!', 'might', ['might to', 'mights', 'are might'], 'modalResult', FC, 2],
  ['What ___ you do if it rains on Sunday?', 'will', ['are', 'did', 'does'], 'question', FC, 2],
  ['I\'ll call you when I ___ at the airport. (arrive)', 'arrive', ['will arrive', 'arrived', 'arriving'], 'whenIf', FC, 2],
  ['I\'ll send you a message as soon as I ___ home. (get)', 'get', ['will get', 'got', 'gets'], 'whenIf', FC, 3],
  ['If you don\'t wear a coat, you ___ cold. (feel)', 'will feel', ['would feel', 'felt', 'are feeling'], 'firstCond', FC, 2],
  ['If Nam ___ his homework, the teacher will be angry. (not do)', 'doesn\'t do', ['won\'t do', 'don\'t do', 'didn\'t do'], 'firstCond', FC, 2],
  ['If you ___ me your email, I\'ll send you the photos. (give)', 'give', ['will give', 'gave', 'gives'], 'firstCond', FC, 1],
  ['If it\'s sunny, the children ___ play outside. (be able to)', 'can', ['cans', 'can to', 'could to'], 'modalResult', FC, 2],
  ['If you have a toothache, you ___ see a dentist. (good advice)', 'should', ['should to', 'shoulds', 'are should'], 'modalResult', FC, 2],
  ['Unless you ___ the instructions, you won\'t understand the game. (read)', 'read', ['don\'t read', 'will read', 'reads'], 'unless', FC, 2],
  ['If Minh ___ well, he will play in the final. (feel)', 'feels', ['will feel', 'feel', 'felt'], 'firstCond', FC, 1],
  ['If you ___ any problems, phone me. (have)', 'have', ['will have', 'had', 'has'], 'imperativeResult', FC, 2],
  ['If we don\'t hurry, we ___ the start of the film. (miss)', 'will miss', ['missed', 'would miss', 'misses'], 'firstCond', FC, 2],
  ['If it ___ cold tonight, I\'ll wear my new scarf. (be)', 'is', ['will be', 'was', 'be'], 'firstCond', FC, 1],
], [
  ['If it will rain, we will stay at home.', 'If it rains, we will stay at home.', ['If it rain, we will stay at home.', 'If it rained, we will stay at home.'], 'firstCond', FC],
  ['Unless you don\'t study, you will fail.', 'Unless you study, you will fail.', ['Unless you will study, you will fail.', 'Unless you studies, you will fail.'], 'unless', FC],
  ['If you see Mai, to tell her the news.', 'If you see Mai, tell her the news.', ['If you see Mai, telling her the news.', 'If you see Mai, tells her the news.'], 'imperativeResult', FC],
  ['If Lan is tired, she might to go to bed early.', 'If Lan is tired, she might go to bed early.', ['If Lan is tired, she mights go to bed early.', 'If Lan is tired, she might going to bed early.'], 'modalResult', FC],
  ['I\'ll text you when I will get home.', 'I\'ll text you when I get home.', ['I\'ll text you when I got home.', 'I\'ll text you when I getting home.'], 'whenIf', FC],
  ['What you will do if you miss the bus?', 'What will you do if you miss the bus?', ['What will you do if you will miss the bus?', 'What you do will if you miss the bus?'], 'question', FC],
], [
  ['If it rains, we will play chess at home.', 'firstCond', FC],
  ['Unless you hurry, you will be late.', 'unless', FC],
  ['If you feel tired, you should rest.', 'modalResult', FC],
  ['What will you do if you win the race?', 'question', FC],
  ['I will phone you when I arrive.', 'whenIf', FC],
]);

export const UNIT_74_QUESTIONS: Question[] = buildBank(74, [
  ['If I ___ a lot of money, I would buy a house by the sea. (have)', 'had', ['have', 'will have', 'would have'], 'secondCond', SC, 1],
  ['If Nam lived in Hanoi, he ___ visit us every week.', 'would', ['will', 'does', 'is'], 'secondCond', SC, 1],
  ['If I ___ you, I would talk to the teacher. (be)', 'were', ['am', 'will be', 'be'], 'advice', SC, 1],
  ['What would you do if you ___ a snake in your bedroom? (find)', 'found', ['find', 'will find', 'would find'], 'wouldQuestion', SC, 2],
  ['If my sister ___ a car, she would drive us to Vung Tau. (have)', 'had', ['has', 'will have', 'would have'], 'secondCond', SC, 2],
  ['If Lan ___ so shy, she would make more friends. (not be)', 'weren\'t', ['isn\'t', 'wouldn\'t be', 'won\'t be'], 'were', SC, 3],
  ['I ___ that jacket if I were you. It\'s too big. (not buy)', 'wouldn\'t buy', ['won\'t buy', 'don\'t buy', 'didn\'t buy'], 'advice', SC, 2],
  ['Where ___ you go if you could go anywhere in the world?', 'would', ['will', 'do', 'did'], 'wouldQuestion', SC, 2],
  ['If we ___ a garden, we would grow vegetables. (have)', 'had', ['have', 'would have', 'has'], 'secondCond', SC, 1],
  ['If I could speak English perfectly, I ___ work as a tour guide.', 'would', ['will', 'can to', 'am'], 'secondCond', SC, 2],
  ['If it ___ so much, we would play outside more. (not rain)', 'didn\'t rain', ['doesn\'t rain', 'won\'t rain', 'wouldn\'t rain'], 'secondCond', SC, 3],
  ['If you could meet a famous person, who ___ you choose?', 'would', ['will', 'do', 'are'], 'wouldQuestion', SC, 2],
  ['If I ___ the answer, I would tell you. But I don\'t know it. (know)', 'knew', ['know', 'will know', 'would know'], 'secondCond', SC, 2],
  ['If Grandma ___ nearer, we would see her more often. (live)', 'lived', ['lives', 'will live', 'would live'], 'secondCond', SC, 2],
  ['If I were you, I ___ take an umbrella.', 'would', ['will', 'did', 'am'], 'advice', SC, 1],
  ['If I won the competition, I ___ very happy. (be)', 'would be', ['will be', 'am', 'was'], 'secondCond', SC, 2],
  ['If it is sunny tomorrow, we ___ go to the beach.', 'will', ['would', 'did', 'are'], 'realUnreal', SC, 2],
  ['If people ___ more trees, the air would be cleaner. (plant)', 'planted', ['plant', 'will plant', 'would plant'], 'secondCond', SC, 2],
  ['If I ___ so tired, I would help you with the cleaning. (not be)', 'weren\'t', ['am not', 'won\'t be', 'wouldn\'t be'], 'were', SC, 3],
  ['Would you be scared if you ___ a tiger in the street? (see)', 'saw', ['see', 'will see', 'would see'], 'wouldQuestion', SC, 2],
], [
  ['If I would have a dog, I would walk it every day.', 'If I had a dog, I would walk it every day.', ['If I have a dog, I would walk it every day.', 'If I will have a dog, I would walk it every day.'], 'secondCond', SC],
  ['If I am you, I would see a doctor.', 'If I were you, I would see a doctor.', ['If I be you, I would see a doctor.', 'If I will be you, I would see a doctor.'], 'advice', SC],
  ['If Lan knew the answer, she will tell us.', 'If Lan knew the answer, she would tell us.', ['If Lan knew the answer, she tells us.', 'If Lan knew the answer, she would to tell us.'], 'secondCond', SC],
  ['What you would do if you saw a ghost?', 'What would you do if you saw a ghost?', ['What would you do if you would see a ghost?', 'What would you did if you saw a ghost?'], 'wouldQuestion', SC],
  ['If my brother weren\'t so lazy, he will help more at home.', 'If my brother weren\'t so lazy, he would help more at home.', ['If my brother isn\'t so lazy, he would help more at home.', 'If my brother weren\'t so lazy, he would helps more at home.'], 'were', SC],
  ['If it will rain tomorrow, we would stay at home.', 'If it rains tomorrow, we will stay at home.', ['If it rains tomorrow, we would stay at home.', 'If it will rain tomorrow, we will stay at home.'], 'realUnreal', SC],
], [
  ['If I had a robot, I would never do housework.', 'secondCond', SC],
  ['If I were you, I would tell the truth.', 'advice', SC],
  ['What would you do if you won the lottery?', 'wouldQuestion', SC],
  ['If Nam were taller, he would play basketball.', 'were', SC],
  ['If it rains, we will watch a film at home.', 'realUnreal', SC],
]);

/** A2 Unit 33: meaning and translation checks for every taught health and fitness word. */
export const UNIT_75_QUESTIONS: Question[] = buildWordBank(75, 25, HEALTH_WORDS);
