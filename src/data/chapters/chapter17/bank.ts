import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { SPORT_WORDS } from './content';

const RULES = {
  progress: { en: 'Past Continuous: was/were + verb-ing for an action in progress at a moment in the past.', vi: 'Quá khứ tiếp diễn: was/were + động từ-ing cho hành động đang diễn ra tại một thời điểm trong quá khứ.' },
  interrupt: { en: 'The longer action uses the Past Continuous; the short action that happens in the middle of it uses the Past Simple.', vi: 'Hành động dài dùng quá khứ tiếp diễn; hành động ngắn xảy ra xen vào dùng quá khứ đơn.' },
  question: { en: 'Questions: (What) + was/were + subject + verb-ing? Short answers: Yes, … was/were. / No, … wasn\'t/weren\'t.', vi: 'Câu hỏi: (What) + was/were + chủ ngữ + động từ-ing? Trả lời ngắn: Yes, … was/were. / No, … wasn\'t/weren\'t.' },
  negative: { en: 'Negative: wasn\'t/weren\'t + verb-ing. Do not use didn\'t with -ing.', vi: 'Phủ định: wasn\'t/weren\'t + động từ-ing. Không dùng didn\'t với -ing.' },
  whileWhen: { en: 'while + the longer action (Past Continuous). Two actions in progress at the same time can both use the Past Continuous.', vi: 'while + hành động dài (quá khứ tiếp diễn). Hai hành động cùng đang diễn ra có thể đều dùng quá khứ tiếp diễn.' },
  during: { en: 'during + a noun (during the film); while + subject + verb (while I was watching the film).', vi: 'during + danh từ (during the film); while + chủ ngữ + động từ (while I was watching the film).' },
  background: { en: 'Use the Past Continuous to describe the background of a story: The sun was shining…', vi: 'Dùng quá khứ tiếp diễn để tả bối cảnh của câu chuyện: The sun was shining…' },
  spelling: { en: '-ing spelling: lie → lying, make → making, swim → swimming.', vi: 'Chính tả -ing: lie → lying, make → making, swim → swimming.' },
  imperative: { en: "Imperative: base verb at the start (Be careful!). Negative: Don't + base verb. Suggestion: Let's (not) + base verb.", vi: "Câu mệnh lệnh: động từ nguyên mẫu đứng đầu (Be careful!). Phủ định: Don't + động từ. Rủ rê: Let's (not) + động từ." },
  toInf: { en: 'decide, promise, refuse, manage, agree, offer, plan, hope, afford + to + base verb.', vi: 'decide, promise, refuse, manage, agree, offer, plan, hope, afford + to + động từ nguyên mẫu.' },
  ing: { en: 'avoid, finish, practise, suggest, keep, imagine, feel like, can\'t stand, give up + verb-ing.', vi: 'avoid, finish, practise, suggest, keep, imagine, feel like, can\'t stand, give up + động từ-ing.' },
  prepIng: { en: 'After a preposition (of, in, about, at, without, before, after, by) use verb-ing.', vi: 'Sau giới từ (of, in, about, at, without, before, after, by) dùng động từ-ing.' },
  objectTo: { en: 'tell, ask, want, remind, advise, teach + person + to + base verb.', vi: 'tell, ask, want, remind, advise, teach + người + to + động từ nguyên mẫu.' },
  letMake: { en: 'let and make + person + base verb (no to).', vi: 'let và make + người + động từ nguyên mẫu (không có to).' },
  ingSubject: { en: 'When an activity is the subject of the sentence, use verb-ing: Swimming is fun.', vi: 'Khi hoạt động làm chủ ngữ của câu, dùng động từ-ing: Swimming is fun.' },
  adjTo: { en: 'adjective + to + base verb; too + adjective + to; adjective + enough + to.', vi: 'tính từ + to + động từ nguyên mẫu; too + tính từ + to; tính từ + enough + to.' },
} as const;
const buildBank = createBankBuilder(RULES, 17);
const PC = 'past-continuous', IM = 'imperatives', VP = 'verb-patterns';

/** A2 Unit 7: Past Continuous. */
export const UNIT_49_QUESTIONS: Question[] = buildBank(49, [
  ['At 8 pm yesterday, Lan ___ her homework. (do)', 'was doing', ['was do', 'were doing', 'is doing'], 'progress', PC, 1],
  ['The children ___ in the garden when it started to rain. (play)', 'were playing', ['was playing', 'are playing', 'were play'], 'interrupt', PC, 1],
  ['I was reading a comic when my phone ___. (ring)', 'rang', ['was ring', 'ringed', 'rings'], 'interrupt', PC, 2],
  ['___ you sleeping when I called you last night?', 'Were', ['Was', 'Did', 'Are'], 'question', PC, 1],
  ["What ___ Minh doing at 9 o'clock yesterday morning?", 'was', ['were', 'did', 'is'], 'question', PC, 1],
  ['We ___ TV at 10 pm last night. We were asleep. (not watch)', "weren't watching", ["wasn't watching", "didn't watching", "weren't watch"], 'negative', PC, 2],
  ['___ Mum was cooking, Dad was cleaning the house.', 'While', ['During', 'At', 'For'], 'whileWhen', PC, 2],
  ['Nam hurt his leg ___ the football match.', 'during', ['while', 'when', 'for'], 'during', PC, 2],
  ['Mai fell asleep ___ she was watching the film.', 'while', ['during', 'for', 'at'], 'during', PC, 2],
  ['When the teacher came in, the students ___ loudly. (talk)', 'were talking', ['was talking', 'talk', 'are talking'], 'interrupt', PC, 2],
  ['The sun ___ and the birds were singing when we arrived at the beach. (shine)', 'was shining', ['were shining', 'is shining', 'was shineing'], 'background', PC, 2],
  ['While I was walking to school, I ___ a 50,000-dong note on the ground. (find)', 'found', ['was find', 'finded', 'find'], 'interrupt', PC, 2],
  ['Lan ___ on the beach at noon yesterday. (lie)', 'was lying', ['was lieing', 'were lying', 'was lyeing'], 'spelling', PC, 2],
  ['What were you doing when the lights went out? – I ___ a shower. (have)', 'was having', ['was haveing', 'were having', 'am having'], 'interrupt', PC, 3],
  ['Were your parents working in Hanoi in 2020? – Yes, they ___.', 'were', ['was', 'did', 'are'], 'question', PC, 1],
  ['Was Minh riding his bike when he fell off? – No, he ___. He was walking.', "wasn't", ["weren't", "didn't", "isn't"], 'question', PC, 2],
  ['The phone rang ___ I was having dinner.', 'while', ['during', 'for', 'at'], 'whileWhen', PC, 2],
  ['Two cars ___ very fast when the accident happened. (go)', 'were going', ['was going', 'are going', 'were go'], 'interrupt', PC, 3],
  ['At this time last year, we ___ in Da Nang. (stay)', 'were staying', ['was staying', 'are staying', 'were stay'], 'progress', PC, 2],
  ['I ___ my dog in the park when I saw an old friend. (walk)', 'was walking', ['were walking', 'am walking', 'was walk'], 'interrupt', PC, 1],
], [
  ['I was study English when you called.', 'I was studying English when you called.', ['I were studying English when you called.', 'I studying English when you called.'], 'progress', PC],
  ['They was playing chess at 8 pm.', 'They were playing chess at 8 pm.', ['They were play chess at 8 pm.', 'They is playing chess at 8 pm.'], 'progress', PC],
  ["Lan didn't sleeping when the phone rang.", "Lan wasn't sleeping when the phone rang.", ["Lan weren't sleeping when the phone rang.", "Lan wasn't sleep when the phone rang."], 'negative', PC],
  ['While I cycling home, it started to rain.', 'While I was cycling home, it started to rain.', ['While I were cycling home, it started to rain.', 'While I was cycling home, it starting to rain.'], 'interrupt', PC],
  ['We swam in the sea during the sun was shining.', 'We swam in the sea while the sun was shining.', ['We swam in the sea during the sun shining.', 'We swam in the sea while the sun shining.'], 'during', PC],
  ['What did you doing at 9 pm last night?', 'What were you doing at 9 pm last night?', ['What was you doing at 9 pm last night?', 'What you were doing at 9 pm last night?'], 'question', PC],
], [
  ['I was watching TV when the phone rang.', 'interrupt', PC],
  ['While we were playing football, it started to rain.', 'interrupt', PC],
  ["What were you doing at seven o'clock?", 'question', PC],
  ['Mai fell asleep during the film.', 'during', PC],
  ['The children were not sleeping at midnight.', 'negative', PC],
]);

/** A2 Unit 8: imperative, to-infinitive and -ing. */
export const UNIT_50_QUESTIONS: Question[] = buildBank(50, [
  ['___ forget to bring your swimming things tomorrow!', "Don't", ['Not', "Doesn't", 'No'], 'imperative', IM, 1],
  ['___ not tell anyone about the surprise party.', "Let's", ['Lets', "Don't", 'Not'], 'imperative', IM, 2],
  ['___ careful! The floor is wet.', 'Be', ['Being', 'Are', 'To be'], 'imperative', IM, 1],
  ['Nam decided ___ the drama club. (join)', 'to join', ['joining', 'join', 'to joining'], 'toInf', VP, 1],
  ['My brother avoids ___ junk food. (eat)', 'eating', ['to eat', 'eat', 'eats'], 'ing', VP, 1],
  ['We managed ___ the top of Fansipan. (reach)', 'to reach', ['reaching', 'reach', 'reached'], 'toInf', VP, 2],
  ['Lan suggested ___ the bus to the museum. (take)', 'taking', ['to take', 'take', 'took'], 'ing', VP, 2],
  ['Mum told me ___ my room before dinner. (tidy)', 'to tidy', ['tidy', 'tidying', 'tidied'], 'objectTo', VP, 2],
  ["I'm tired of ___ the same food every day. (eat)", 'eating', ['to eat', 'eat', 'ate'], 'prepIng', VP, 2],
  ['___ too much sugar is bad for your teeth. (have)', 'Having', ['Have', 'Has', 'Had'], 'ingSubject', VP, 2],
  ["It's difficult ___ Chinese characters. (write)", 'to write', ['for write', 'write', 'wrote'], 'adjTo', VP, 2],
  ['The little boy refused ___ his vegetables. (eat)', 'to eat', ['eating', 'eat', 'ate'], 'toInf', VP, 2],
  ['Do you feel like ___ to the cinema tonight? (go)', 'going', ['to go', 'go', 'went'], 'ing', VP, 2],
  ['Our teacher reminded us ___ our names on the test. (write)', 'to write', ['writing', 'write', 'wrote'], 'objectTo', VP, 2],
  ['She left the house without ___ breakfast. (have)', 'having', ['to have', 'have', 'had'], 'prepIng', VP, 2],
  ["I can't afford ___ a new laptop. (buy)", 'to buy', ['buying', 'buy', 'bought'], 'toInf', VP, 3],
  ['Have you finished ___ the poster yet? (paint)', 'painting', ['to paint', 'paint', 'painted'], 'ing', VP, 2],
  ['This tea is too hot ___ now. (drink)', 'to drink', ['drinking', 'drink', 'for drink'], 'adjTo', VP, 3],
  ['Lan practises ___ the piano every evening. (play)', 'playing', ['to play', 'play', 'plays'], 'ing', VP, 2],
  ["My parents won't let me ___ out late. (stay)", 'stay', ['to stay', 'staying', 'stayed'], 'letMake', VP, 3],
], [
  ['Please to close the door when you leave.', 'Please close the door when you leave.', ['Please closing the door when you leave.', 'Please you to close the door when you leave.'], 'imperative', IM],
  ['Nam promised helping me with my homework.', 'Nam promised to help me with my homework.', ['Nam promised help me with my homework.', 'Nam promised to helping me with my homework.'], 'toInf', VP],
  ['Lan keeps to forget her keys.', 'Lan keeps forgetting her keys.', ['Lan keeps forget her keys.', 'Lan keeps to forgetting her keys.'], 'ing', VP],
  ['She is interested in learn Korean.', 'She is interested in learning Korean.', ['She is interested in to learn Korean.', 'She is interested to learning Korean.'], 'prepIng', VP],
  ['The doctor advised him rest at home.', 'The doctor advised him to rest at home.', ['The doctor advised him resting at home.', 'The doctor advised to him rest at home.'], 'objectTo', VP],
  ['Swim in the sea is fun in summer.', 'Swimming in the sea is fun in summer.', ['Swims in the sea is fun in summer.', 'Swam in the sea is fun in summer.'], 'ingSubject', VP],
], [
  ["Don't forget to lock the door.", 'imperative', IM],
  ['We decided to visit Hoi An.', 'toInf', VP],
  ['My sister avoids eating fast food.', 'ing', VP],
  ['The teacher asked us to be quiet.', 'objectTo', VP],
  ['Learning English is fun.', 'ingSubject', VP],
]);

/** A2 Unit 9: meaning and translation checks for every taught sport word. */
export const UNIT_51_QUESTIONS: Question[] = buildWordBank(51, 17, SPORT_WORDS);
