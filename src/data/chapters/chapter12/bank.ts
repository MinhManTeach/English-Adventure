import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { JOB_WORDS } from './content';

const RULES = {
  who: { en: 'Use who (or that) for people.', vi: 'Dùng who (hoặc that) cho người.' },
  which: { en: 'Use which (or that) for things and animals.', vi: 'Dùng which (hoặc that) cho đồ vật và con vật.' },
  where: { en: 'Use where for places.', vi: 'Dùng where cho nơi chốn.' },
  whose: { en: 'Use whose to show something belongs to someone.', vi: 'Dùng whose để chỉ sự sở hữu.' },
  noPronoun: { en: 'Don\'t repeat the pronoun in a relative clause: the man who lives here (not who he lives here).', vi: 'Không lặp lại đại từ trong mệnh đề quan hệ: the man who lives here (không nói who he lives here).' },
  ifPresent: { en: 'First conditional: If + present simple, will + base verb.', vi: 'Câu điều kiện loại 1: If + hiện tại đơn, will + động từ nguyên mẫu.' },
  noWillAfterIf: { en: 'Never use will in the if-clause.', vi: 'Không bao giờ dùng will trong mệnh đề if.' },
  wont: { en: "won't = will not.", vi: "won't = will not." },
  question: { en: 'Questions: What will you do if …? Will you … if …?', vi: 'Câu hỏi: What will you do if …? Will you … if …?' },
} as const;
const buildBank = createBankBuilder(RULES, 12);
const RC = 'relative-clauses', FC = 'first-conditional';
const REL = (answer: string) => ['who', 'which', 'where', 'whose'].filter(x => x !== answer) as unknown as readonly [string, string, string];

export const UNIT_34_QUESTIONS: Question[] = buildBank(34, [
  ['A pilot is a person ___ flies planes.', 'who', REL('who'), 'who', RC, 1],
  ['A kettle is a thing ___ boils water.', 'which', REL('which'), 'which', RC, 1],
  ['A gym is a place ___ people do exercise.', 'where', REL('where'), 'where', RC, 1],
  ['I know a boy ___ sister is a famous singer.', 'whose', REL('whose'), 'whose', RC, 2],
  ['The students ___ won the quiz got a prize.', 'who', REL('who'), 'who', RC, 1],
  ['The phone ___ I bought last week is broken.', 'which', REL('which'), 'which', RC, 2],
  ['This is the restaurant ___ we had my birthday dinner.', 'where', REL('where'), 'where', RC, 2],
  ['A giraffe is an animal ___ has a very long neck.', 'which', REL('which'), 'which', RC, 1],
  ['She\'s the teacher ___ son is in my class.', 'whose', REL('whose'), 'whose', RC, 2],
  ['Mr Long is the man ___ fixed our roof.', 'who', REL('who'), 'who', RC, 1],
  ['A stadium is a place ___ you can watch football matches.', 'where', REL('where'), 'where', RC, 1],
  ['I like stories ___ have happy endings.', 'which', REL('which'), 'which', RC, 2],
  ['Do you know anyone ___ can fix computers?', 'who', REL('who'), 'who', RC, 2],
  ['That\'s the girl ___ mum is a doctor.', 'whose', REL('whose'), 'whose', RC, 2],
  ['A bakery is a shop ___ sells bread and cakes.', 'which', REL('which'), 'which', RC, 2],
  ['Da Lat is the city ___ we spent our holiday.', 'where', REL('where'), 'where', RC, 2],
  ['A goalkeeper is a player ___ stops the ball.', 'who', REL('who'), 'who', RC, 1],
  ['The dog ___ lives next door barks all night.', 'which', REL('which'), 'which', RC, 2],
  ['He\'s the boy ___ kite got stuck in the tree.', 'whose', REL('whose'), 'whose', RC, 3],
  ['The museum ___ we went last week was amazing.', 'where', REL('where'), 'where', RC, 3],
], [
  ['A nurse is a person which works in a hospital.', 'A nurse is a person who works in a hospital.', ['A nurse is a person where works in a hospital.', 'A nurse is a person whose works in a hospital.'], 'who', RC],
  ['The bike who I bought is red.', 'The bike which I bought is red.', ['The bike where I bought is red.', 'The bike whose I bought is red.'], 'which', RC],
  ['This is the park which we play football.', 'This is the park where we play football.', ['This is the park who we play football.', 'This is the park whose we play football.'], 'where', RC],
  ['I have a friend who dad is a pilot.', 'I have a friend whose dad is a pilot.', ['I have a friend which dad is a pilot.', 'I have a friend where dad is a pilot.'], 'whose', RC],
  ['The man who he lives next door is a chef.', 'The man who lives next door is a chef.', ['The man which lives next door is a chef.', 'The man who live next door is a chef.'], 'noPronoun', RC],
  ['The book which it is on the table is mine.', 'The book which is on the table is mine.', ['The book who is on the table is mine.', 'The book where is on the table is mine.'], 'noPronoun', RC],
], [
  ['A vet is a doctor who looks after animals.', 'who', RC],
  ['This is the cake which Mum made.', 'which', RC],
  ['That is the school where my mum works.', 'where', RC],
  ['I have a friend whose brother is a pilot.', 'whose', RC],
  ['The girl who sits next to me is funny.', 'who', RC],
]);

export const UNIT_35_QUESTIONS: Question[] = buildBank(35, [
  ['If it ___ tomorrow, we will stay at home. (rain)', 'rains', ['will rain', 'rained', 'rain'], 'ifPresent', FC, 1],
  ['If you study hard, you ___ pass the exam.', 'will', ['wills', 'are', 'to'], 'ifPresent', FC, 1],
  ['If we don\'t hurry, we ___ catch the bus. (not)', "won't", ['not will', "aren't", "willn't"], 'wont', FC, 1],
  ['If Nam ___ to the party, he will have fun. (go)', 'goes', ['will go', 'went', 'go'], 'ifPresent', FC, 1],
  ['I will call you if I ___ the news. (hear)', 'hear', ['will hear', 'heard', 'hears'], 'noWillAfterIf', FC, 2],
  ['What ___ you do if it snows?', 'will', ['are', 'does', 'wills'], 'question', FC, 2],
  ['If Lan ___ her homework, the teacher will be angry. (not do)', "doesn't do", ["won't do", "don't do", "didn't do"], 'ifPresent', FC, 2],
  ['If you eat too much, you ___ feel sick.', 'will', ['wills', 'are', 'did'], 'ifPresent', FC, 1],
  ['She will be happy if you ___ her a card. (send)', 'send', ['will send', 'sent', 'sends'], 'noWillAfterIf', FC, 2],
  ['If the weather is nice, we ___ go to the beach.', 'will', ['wills', 'are', 'did'], 'ifPresent', FC, 1],
  ['If you ___ the plants, they will die. (not water)', "don't water", ["won't water", "doesn't water", "didn't water"], 'ifPresent', FC, 2],
  ['If I see Minh, I ___ give him your message.', 'will', ['wills', 'am', 'did'], 'ifPresent', FC, 2],
  ['___ you come if I invite you?', 'Will', ['Are', 'Does', 'Did'], 'question', FC, 2],
  ['If my team ___ the match, I will be so happy! (win)', 'wins', ['will win', 'won', 'win'], 'ifPresent', FC, 1],
  ['You won\'t get wet if you ___ an umbrella. (take)', 'take', ['will take', 'took', 'takes'], 'noWillAfterIf', FC, 2],
  ['If it is cold, I ___ wear my scarf.', 'will', ['wills', 'am', 'did'], 'ifPresent', FC, 1],
  ['If they ___ early, they will get good seats. (arrive)', 'arrive', ['will arrive', 'arrived', 'arrives'], 'ifPresent', FC, 1],
  ['If you don\'t sleep, you ___ be tired tomorrow.', 'will', ['wills', 'are', 'to'], 'ifPresent', FC, 2],
  ['We ___ late if we don\'t leave now. (not)', "won't be", ["will be not", "aren't be", "don't be"], 'wont', FC, 3],
  ['If Grandma ___, she will make us some cake. (visit)', 'visits', ['will visit', 'visited', 'visit'], 'ifPresent', FC, 2],
], [
  ['If it will rain, we will stay inside.', 'If it rains, we will stay inside.', ['If it rain, we will stay inside.', 'If it rained, we will stay inside.'], 'noWillAfterIf', FC],
  ['If you study, you pass will the test.', 'If you study, you will pass the test.', ['If you study, you will passes the test.', 'If you study, you wills pass the test.'], 'ifPresent', FC],
  ['If she come, we will play chess.', 'If she comes, we will play chess.', ['If she will come, we will play chess.', 'If she came, we will play chess.'], 'ifPresent', FC],
  ["If we don't hurry, we will not to catch the train.", "If we don't hurry, we won't catch the train.", ["If we don't hurry, we willn't catch the train.", "If we don't hurry, we don't will catch the train."], 'wont', FC],
  ['I help you if you will ask me.', 'I will help you if you ask me.', ['I will help you if you will ask me.', 'I will helps you if you ask me.'], 'noWillAfterIf', FC],
  ['What you will do if you win?', 'What will you do if you win?', ['What will you do if you will win?', 'What do you will do if you win?'], 'question', FC],
], [
  ['If it rains, we will stay at home.', 'ifPresent', FC],
  ["If you don't hurry, you will be late.", 'ifPresent', FC],
  ['I will buy a bike if I save money.', 'noWillAfterIf', FC],
  ['What will you do if you win?', 'question', FC],
  ["We won't go out if it is cold.", 'wont', FC],
]);

/** Unit 36: meaning and translation checks for every taught job and work word. */
export const UNIT_36_QUESTIONS: Question[] = buildWordBank(36, 12, JOB_WORDS);
