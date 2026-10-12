import { Question } from '../../types';
import { FRIEND_WORDS } from '../templates/friendship';
import { createBankBuilder, buildWordBank } from './authoredBank';

/** Short teaching notes shared by several authored questions. */
const RULES = {
  was: { en: 'Past of be: I/he/she/it was, you/we/they were.', vi: 'Quá khứ của be: I/he/she/it dùng was; you/we/they dùng were.' },
  wasNegative: { en: "Past negative of be: wasn't / weren't.", vi: "Phủ định quá khứ của be: wasn't / weren't." },
  wasQuestion: { en: 'Past questions with be start with Was or Were.', vi: 'Câu hỏi quá khứ với be bắt đầu bằng Was hoặc Were.' },
  wasShort: { en: "Short answers: Yes, … was/were. / No, … wasn't/weren't.", vi: "Trả lời ngắn: Yes, … was/were. / No, … wasn't/weren't." },
  irregular: { en: 'Irregular verbs have a special past form, without -ed.', vi: 'Động từ bất quy tắc có dạng quá khứ riêng, không thêm -ed.' },
  didIrregular: { en: "didn't and Did take the base verb, also for irregular verbs.", vi: "Sau didn't và Did dùng động từ nguyên mẫu, kể cả động từ bất quy tắc." },
  beOrDid: { en: 'Use was/were with nouns, adjectives and places; use did with other verbs.', vi: 'Dùng was/were trước danh từ, tính từ, nơi chốn; dùng did với động từ thường.' },
  progress: { en: 'An action in progress at a past moment uses was/were + verb-ing.', vi: 'Hành động đang diễn ra tại một thời điểm quá khứ: was/were + động từ-ing.' },
  progressNegative: { en: "Past Continuous negative: wasn't/weren't + verb-ing.", vi: "Phủ định quá khứ tiếp diễn: wasn't/weren't + động từ-ing." },
  progressQuestion: { en: 'Past Continuous questions: Was/Were + subject + verb-ing.', vi: 'Câu hỏi quá khứ tiếp diễn: Was/Were + chủ ngữ + động từ-ing.' },
  interrupted: { en: 'The long action uses was/were + verb-ing; the short action that interrupts it uses Past Simple.', vi: 'Hành động dài dùng was/were + -ing; hành động ngắn xen vào dùng quá khứ đơn.' },
  whenWhile: { en: 'while + the long action (was/were + -ing); when + the short action (Past Simple).', vi: 'while + hành động dài (was/were + -ing); when + hành động ngắn (quá khứ đơn).' },
  finished: { en: 'Finished or repeated past actions use Past Simple, not Past Continuous.', vi: 'Việc đã xong hoặc lặp lại trong quá khứ dùng quá khứ đơn, không dùng quá khứ tiếp diễn.' },
} as const;
const buildBank = createBankBuilder(RULES, 4);
const WAS = 'was-were', IRR = 'irregular-past', PC = 'past-continuous';

export const UNIT_10_QUESTIONS: Question[] = buildBank(10, [
  ['I ___ at the beach last Sunday.', 'was', ['were', 'am', 'did'], 'was', WAS, 1],
  ['My friends ___ very tired after the trip.', 'were', ['was', 'are', 'did'], 'was', WAS, 1],
  ['The film ___ really funny last night.', 'was', ['were', 'is', 'did'], 'was', WAS, 1],
  ['We ___ late for school yesterday because of the rain.', 'were', ['was', 'are', 'did'], 'was', WAS, 1],
  ['Lan ___ at school yesterday. She was sick.', "wasn't", ["weren't", "didn't", "isn't"], 'wasNegative', WAS, 2],
  ['The shops ___ open yesterday because it was a holiday.', "weren't", ["wasn't", "didn't", "aren't"], 'wasNegative', WAS, 2],
  ['___ you at home last night?', 'Were', ['Was', 'Did', 'Are'], 'wasQuestion', WAS, 1],
  ['___ the test difficult yesterday?', 'Was', ['Were', 'Did', 'Is'], 'wasQuestion', WAS, 1],
  ['Was your grandma at the party? Yes, she ___.', 'was', ['were', 'did', 'is'], 'wasShort', WAS, 1],
  ['Were the children in the garden? No, they ___.', "weren't", ["wasn't", "didn't", "aren't"], 'wasShort', WAS, 2],
  ['We ___ to Ha Long Bay last summer.', 'went', ['goed', 'go', 'goes'], 'irregular', IRR, 1],
  ['Minh ___ a big fish at the lake yesterday.', 'caught', ['catched', 'catch', 'catches'], 'irregular', IRR, 2],
  ['I ___ my keys on the bus two days ago.', 'lost', ['losed', 'lose', 'loses'], 'irregular', IRR, 2],
  ['My sister ___ a postcard to Grandpa last week.', 'wrote', ['writed', 'write', 'writes'], 'irregular', IRR, 2],
  ['Our team ___ the match last Saturday!', 'won', ['winned', 'win', 'wins'], 'irregular', IRR, 2],
  ['Dad ___ me a new football for my birthday last year.', 'bought', ['buyed', 'buy', 'buys'], 'irregular', IRR, 2],
  ['We ___ a sandcastle on the beach last weekend.', 'built', ['builded', 'build', 'builds'], 'irregular', IRR, 2],
  ['I ___ see the rainbow yesterday. I was inside.', "didn't", ["wasn't", "don't", "weren't"], 'didIrregular', IRR, 2],
  ['Hoa didn’t ___ to the party last night.', 'come', ['came', 'comes', 'coming'], 'didIrregular', IRR, 2],
  ['Did you ___ your homework yesterday?', 'do', ['did', 'does', 'done'], 'didIrregular', IRR, 2],
  ['What did you ___ for breakfast this morning?', 'have', ['had', 'has', 'having'], 'didIrregular', IRR, 2],
  ['___ you tired after the race?', 'Were', ['Did', 'Do', 'Was'], 'beOrDid', WAS, 3],
  ['___ you swim in the sea last summer?', 'Did', ['Were', 'Was', 'Are'], 'beOrDid', IRR, 3],
], [
  ['They was at the zoo yesterday.', 'They were at the zoo yesterday.', ['They are at the zoo yesterday.', 'They did at the zoo yesterday.'], 'was', WAS],
  ['I goed to the cinema last night.', 'I went to the cinema last night.', ['I go to the cinema last night.', 'I wented to the cinema last night.'], 'irregular', IRR],
  ["She didn't saw the message.", "She didn't see the message.", ["She wasn't see the message.", "She not saw the message."], 'didIrregular', IRR],
  ['Did you went to the park on Sunday?', 'Did you go to the park on Sunday?', ['Were you go to the park on Sunday?', 'Do you went to the park on Sunday?'], 'didIrregular', IRR],
  ['Were you see the fireworks?', 'Did you see the fireworks?', ['Was you see the fireworks?', 'Did you saw the fireworks?'], 'beOrDid', IRR],
  ["The weather wasn't sunny and we didn't was happy.", "The weather wasn't sunny and we weren't happy.", ["The weather wasn't sunny and we wasn't happy.", "The weather didn't sunny and we weren't happy."], 'wasNegative', WAS],
], [
  ['We were at the museum last Friday.', 'was', WAS],
  ['Was the water cold in the morning?', 'wasQuestion', WAS],
  ['My brother made pancakes for us yesterday.', 'irregular', IRR],
  ["I didn't buy a new bag last week.", 'didIrregular', IRR],
  ['Did your cousins come to the party?', 'didIrregular', IRR],
]);

export const UNIT_11_QUESTIONS: Question[] = buildBank(11, [
  ['At eight o’clock last night I ___ TV.', 'was watching', ['were watching', 'am watching', 'watching'], 'progress', PC, 1],
  ['The children ___ in the garden at 4 pm yesterday.', 'were playing', ['was playing', 'are playing', 'playing'], 'progress', PC, 1],
  ['Dad ___ dinner when I came home.', 'was cooking', ['were cooking', 'is cooking', 'cooking'], 'interrupted', PC, 1],
  ['We ___ for the bus when it began to rain.', 'were waiting', ['was waiting', 'are waiting', 'waiting'], 'interrupted', PC, 1],
  ['Mai was reading a book when the lights ___ out.', 'went', ['was going', 'go', 'goed'], 'interrupted', PC, 2],
  ['I was walking home when I ___ my old teacher.', 'saw', ['were seeing', 'see', 'seed'], 'interrupted', PC, 2],
  ['Nam ___ sleeping at ten o’clock. He was reading.', "wasn't", ["weren't", "didn't", "isn't"], 'progressNegative', PC, 2],
  ['They ___ listening to the teacher. They were chatting.', "weren't", ["wasn't", "didn't", "aren't"], 'progressNegative', PC, 2],
  ['What ___ you doing at 9 pm last night?', 'were', ['was', 'did', 'are'], 'progressQuestion', PC, 2],
  ['___ Lan swimming when you arrived?', 'Was', ['Were', 'Did', 'Is'], 'progressQuestion', PC, 2],
  ['Were you sleeping when I called? Yes, I ___.', 'was', ['were', 'did', 'am'], 'progressQuestion', PC, 1],
  ['Was it raining at the beach? No, it ___.', "wasn't", ["weren't", "didn't", "isn't"], 'progressQuestion', PC, 1],
  ['It started to rain ___ we were playing football.', 'while', ['during', 'at', 'in'], 'whenWhile', PC, 3],
  ['I was having a bath ___ the phone rang.', 'when', ['during', 'at', 'in'], 'whenWhile', PC, 3],
  ['Hoa ___ her arm while she was skating.', 'hurt', ['were hurting', 'hurts', 'hurted'], 'interrupted', PC, 2],
  ['My brother ___ off his bike three times last month.', 'fell', ['was falling', 'falls', 'falled'], 'finished', PC, 3],
  ['Yesterday I ___ my room and then I went out.', 'tidied', ['were tidying', 'tidy', 'tidying'], 'finished', PC, 3],
  ['At this time yesterday we ___ on the plane.', 'were sitting', ['was sitting', 'are sitting', 'sitting'], 'progress', PC, 2],
  ['Grandma ___ in the garden at noon yesterday.', 'was working', ['were working', 'is working', 'working'], 'progress', PC, 2],
  ['While I ___ my homework, my cat jumped on the desk.', 'was doing', ['were doing', 'am doing', 'doing'], 'whenWhile', PC, 2],
  ['What were they doing when the bell ___?', 'rang', ['were ringing', 'rings', 'ringed'], 'interrupted', PC, 2],
  ['The sun ___ and the birds were singing.', 'was shining', ['were shining', 'is shining', 'shining'], 'progress', PC, 2],
], [
  ['I were sleeping at midnight.', 'I was sleeping at midnight.', ['I am sleeping at midnight.', 'I was sleep at midnight.'], 'progress', PC],
  ['They was playing chess when we arrived.', 'They were playing chess when we arrived.', ['They are playing chess when we arrived.', 'They were play chess when we arrived.'], 'interrupted', PC],
  ['She was cook dinner at seven o’clock.', 'She was cooking dinner at seven o’clock.', ['She were cooking dinner at seven o’clock.', 'She is cooking dinner at seven o’clock.'], 'progress', PC],
  ['Did you watching TV when I called?', 'Were you watching TV when I called?', ['Was you watching TV when I called?', 'Did you watch TV when I was call?'], 'progressQuestion', PC],
  ['When I arrived, they were eat lunch.', 'When I arrived, they were eating lunch.', ['When I arrived, they was eating lunch.', 'When I arrived, they are eating lunch.'], 'interrupted', PC],
  ['He was falling off his bike three times last week.', 'He fell off his bike three times last week.', ['He falled off his bike three times last week.', 'He falls off his bike three times last week.'], 'finished', PC],
], [
  ['We were having dinner when the phone rang.', 'interrupted', PC],
  ['What were you doing at six o’clock?', 'progressQuestion', PC],
  ["Mai wasn't listening to the teacher.", 'progressNegative', PC],
  ['While I was walking home, it started to rain.', 'whenWhile', PC],
  ['My parents were working in the garden all morning.', 'progress', PC],
]);

/** Unit 12: meaning and translation checks for every taught friendship word. */
export const UNIT_12_QUESTIONS: Question[] = buildWordBank(12, 4, FRIEND_WORDS);

export const CHAPTER4_QUESTIONS: Question[] = [...UNIT_10_QUESTIONS, ...UNIT_11_QUESTIONS, ...UNIT_12_QUESTIONS];
