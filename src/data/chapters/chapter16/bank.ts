import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { LEISURE_WORDS } from './content';

const RULES = {
  edSpelling: { en: '-ed spelling: consonant + y → -ied; vowel + y → -yed; double one final consonant after one short stressed vowel; -e → -d.', vi: 'Chính tả -ed: phụ âm + y → -ied; nguyên âm + y → -yed; gấp đôi phụ âm cuối sau một nguyên âm ngắn được nhấn; tận cùng -e chỉ thêm -d.' },
  irregular: { en: 'Irregular verbs have their own past form (leave → left, pay → paid, begin → began). Learn them by heart.', vi: 'Động từ bất quy tắc có dạng quá khứ riêng (leave → left, pay → paid, begin → began). Cần học thuộc.' },
  finished: { en: 'Use Past Simple for finished actions at a finished time in the past.', vi: 'Dùng quá khứ đơn cho hành động đã kết thúc tại một thời điểm đã qua.' },
  timeWords: { en: 'Past time words: two days ago, last week, yesterday morning, in 2010.', vi: 'Từ chỉ thời gian quá khứ: two days ago, last week, yesterday morning, in 2010.' },
  wasWere: { en: 'was with I/he/she/it and singular or uncountable subjects; were with you/we/they and plural subjects.', vi: 'was dùng với I/he/she/it và chủ ngữ số ít hoặc không đếm được; were dùng với you/we/they và chủ ngữ số nhiều.' },
  sequence: { en: 'In a story, Past Simple verbs show actions one after another.', vi: 'Trong một câu chuyện, các động từ quá khứ đơn diễn tả các hành động nối tiếp nhau.' },
  negative: { en: "Past negative: didn't + base verb for every subject.", vi: "Phủ định quá khứ: didn't + động từ nguyên mẫu với mọi chủ ngữ." },
  question: { en: 'Past questions: (Wh-word +) did + subject + base verb.', vi: 'Câu hỏi quá khứ: (từ để hỏi +) did + chủ ngữ + động từ nguyên mẫu.' },
  subjectQ: { en: 'When Who/What is the subject of the question, do not use did: Who broke the window?', vi: 'Khi Who/What là chủ ngữ của câu hỏi thì không dùng did: Who broke the window?' },
  wasOrDid: { en: "was/were go with adjectives, nouns and places; did/didn't go with other verbs.", vi: "was/were đi với tính từ, danh từ, nơi chốn; did/didn't đi với động từ thường." },
  short: { en: "Short answers: Yes, I did. / No, she didn't. / Yes, it was. / No, they weren't.", vi: "Trả lời ngắn: Yes, I did. / No, she didn't. / Yes, it was. / No, they weren't." },
} as const;
const buildBank = createBankBuilder(RULES, 16);
const PS = 'past-simple', PT = 'past-time', PQ = 'past-questions';

export const UNIT_46_QUESTIONS: Question[] = buildBank(46, [
  ['The bus ___ suddenly, and everyone fell forward. (stop)', 'stopped', ['stoped', 'stops', 'stopt'], 'edSpelling', PS, 1],
  ['Lan ___ hard for the English test last week. (study)', 'studied', ['studyed', 'studies', 'studed'], 'edSpelling', PS, 1],
  ['We ___ a trip to Ninh Binh last month. (plan)', 'planned', ['planed', 'plan', 'planted'], 'edSpelling', PS, 2],
  ['Nam ___ the concert very much. (enjoy)', 'enjoyed', ['enjoied', 'enjoys', 'enjoid'], 'edSpelling', PS, 2],
  ['My dad ___ for the taxi with his phone. (pay)', 'paid', ['payed', 'pays', 'paied'], 'irregular', PS, 2],
  ['The lesson ___ at half past seven yesterday. (begin)', 'began', ['begun', 'beginned', 'begins'], 'irregular', PS, 2],
  ['I ___ my keys on the bus last Friday. (lose)', 'lost', ['losed', 'lose', 'losted'], 'irregular', PS, 1],
  ['Mai ___ me a birthday card from Da Lat. (send)', 'sent', ['sended', 'send', 'sents'], 'irregular', PS, 1],
  ['We flew to Phu Quoc ___ summer.', 'last', ['ago', 'yesterday', 'on'], 'timeWords', PT, 2],
  ['My grandparents moved to Ho Chi Minh City forty years ___.', 'ago', ['last', 'before ago', 'in'], 'timeWords', PT, 1],
  ['Hoa started learning the piano ___ 2021.', 'in', ['on', 'ago', 'last'], 'timeWords', PT, 1],
  ['There ___ a lot of tourists in Hoi An last weekend.', 'were', ['was', 'did', 'been'], 'wasWere', PS, 2],
  ['The news on TV ___ very sad yesterday.', 'was', ['were', 'did', 'been'], 'wasWere', PS, 3],
  ['Everyone in my class ___ excited about the school trip.', 'was', ['were', 'did', 'been'], 'wasWere', PS, 3],
  ['Minh ___ his bag on the floor, sat down and opened his book.', 'dropped', ['droped', 'drops', 'is dropping'], 'sequence', PS, 2],
  ['When I was small, I ___ my grandparents every summer. (visit)', 'visited', ['visit', 'visitted', 'was visit'], 'finished', PS, 2],
  ['Dad ___ the Mid-Autumn lanterns himself last year. (make)', 'made', ['maked', 'makes', 'did made'], 'irregular', PS, 1],
  ['We ___ very tired after the long walk.', 'were', ['was', 'did', 'are been'], 'wasWere', PS, 1],
  ['The children ___ the ball over the fence. (throw)', 'threw', ['throwed', 'thrown', 'throws'], 'irregular', PS, 2],
  ['I ___ to the shop and bought some milk. (hurry)', 'hurried', ['hurryed', 'hurrid', 'hurries'], 'edSpelling', PS, 2],
], [
  ['Yesterday I buyed a new pair of trainers.', 'Yesterday I bought a new pair of trainers.', ['Yesterday I boughted a new pair of trainers.', 'Yesterday I buy a new pair of trainers.'], 'irregular', PS],
  ['We stoped at a café on the way to Vung Tau.', 'We stopped at a café on the way to Vung Tau.', ['We stopt at a café on the way to Vung Tau.', 'We stop at a café on the way to Vung Tau.'], 'edSpelling', PS],
  ['I met Lan in the park ago two days.', 'I met Lan in the park two days ago.', ['I met Lan in the park two days before ago.', 'I met Lan in the park last two days.'], 'timeWords', PT],
  ['My jeans was too long, so I didn\'t wear them.', 'My jeans were too long, so I didn\'t wear them.', ['My jeans did too long, so I didn\'t wear them.', 'My jeans been too long, so I didn\'t wear them.'], 'wasWere', PS],
  ['She studyed until midnight.', 'She studied until midnight.', ['She studed until midnight.', 'She studys until midnight.'], 'edSpelling', PS],
  ['The film begun at eight o\'clock.', 'The film began at eight o\'clock.', ['The film beginned at eight o\'clock.', 'The film begins at eight o\'clock yesterday.'], 'irregular', PS],
], [
  ['We spent two days in Ha Long Bay last summer.', 'irregular', PS],
  ['My parents got married in 2009.', 'timeWords', PT],
  ['Nam carried the heavy box upstairs.', 'edSpelling', PS],
  ['There were thirty people at the party.', 'wasWere', PS],
  ['Lan woke up, had breakfast and left home.', 'sequence', PS],
]);

export const UNIT_47_QUESTIONS: Question[] = buildBank(47, [
  ["I ___ my homework last night. I forgot!", "didn't do", ["didn't did", "wasn't do", "don't did"], 'negative', PS, 1],
  ['Minh ___ the answer, so he asked the teacher.', "didn't know", ["didn't knew", "wasn't know", "doesn't knew"], 'negative', PS, 2],
  ['___ you go to the cinema last weekend?', 'Did', ['Were', 'Do', 'Was'], 'question', PS, 1],
  ['Where ___ your summer holiday?', 'did you spend', ['you spent', 'did you spent', 'were you spend'], 'question', PQ, 2],
  ['What time ___ home yesterday?', 'did Lan get', ['Lan got', 'did Lan got', 'was Lan get'], 'question', PQ, 2],
  ['Who ___ the first goal? — Minh did.', 'scored', ['scores', 'did scored', 'was score'], 'subjectQ', PQ, 3],
  ['Who ___ yesterday? — I called my aunt in Hue.', 'did you call', ['called you', 'you called', 'did you called'], 'question', PQ, 3],
  ['What ___ to your arm? — I fell off my bike.', 'happened', ['did happened', 'did it happen', 'was happen'], 'subjectQ', PQ, 3],
  ['The weather ___ very nice, so we stayed at home.', "wasn't", ["didn't", "weren't", 'not'], 'wasOrDid', PS, 2],
  ['We ___ enjoy the food at that restaurant.', "didn't", ["weren't", "wasn't", 'not'], 'wasOrDid', PS, 2],
  ['___ your parents at the school concert?', 'Were', ['Did', 'Was', 'Do'], 'wasOrDid', PS, 2],
  ['Did you see the fireworks? — Yes, I ___.', 'did', ['saw', 'was', 'do'], 'short', PS, 1],
  ['Was the test difficult? — No, it ___.', "wasn't", ["didn't", "isn't", "weren't"], 'short', PS, 1],
  ['Did Lan and Mai win the competition? — No, they ___.', "didn't", ["weren't", "don't", "wasn't"], 'short', PS, 2],
  ['How ___ to Hue? — By train.', 'did they travel', ['they travelled', 'did they travelled', 'were they travel'], 'question', PQ, 2],
  ['Why ___ to the party? — Because I was ill.', "didn't you come", ["you didn't come", "didn't you came", "weren't you come"], 'question', PQ, 3],
  ['My brother ___ his phone at school. He brought it home.', "didn't leave", ["didn't left", "wasn't leave", 'not left'], 'negative', PS, 2],
  ['How much ___ for your new bike?', 'did you pay', ['you paid', 'did you paid', 'were you pay'], 'question', PQ, 2],
  ['Who ___ you this lovely scarf? — My grandma did.', 'gave', ['was give', 'did gave', 'gived'], 'subjectQ', PQ, 3],
  ['I ___ at home yesterday evening. I was at my friend\'s house.', "wasn't", ["didn't", "weren't", "don't"], 'wasOrDid', PS, 1],
], [
  ["I didn't went to school yesterday.", "I didn't go to school yesterday.", ["I wasn't go to school yesterday.", "I don't went to school yesterday."], 'negative', PS],
  ['Did you saw the new film?', 'Did you see the new film?', ['Were you see the new film?', 'Do you saw the new film?'], 'question', PS],
  ['Where you went last weekend?', 'Where did you go last weekend?', ['Where did you went last weekend?', 'Where were you go last weekend?'], 'question', PQ],
  ['Who did broke the vase?', 'Who broke the vase?', ['Who was break the vase?', 'Who breaked the vase?'], 'subjectQ', PQ],
  ["The film didn't interesting.", "The film wasn't interesting.", ["The film weren't interesting.", "The film not was interesting."], 'wasOrDid', PS],
  ['Were you enjoy the party?', 'Did you enjoy the party?', ['Was you enjoy the party?', 'Did you enjoyed the party?'], 'wasOrDid', PS],
], [
  ['What did you have for breakfast?', 'question', PQ],
  ["We didn't see any dolphins.", 'negative', PS],
  ['Who told you the news?', 'subjectQ', PQ],
  ['Was the museum open on Sunday?', 'wasOrDid', PS],
  ['Did Minh finish his project on time?', 'question', PS],
]);

/** Unit 48: meaning and translation checks for every taught leisure word. */
export const UNIT_48_QUESTIONS: Question[] = buildWordBank(48, 16, LEISURE_WORDS);
