import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { TECH_WORDS } from './content';

const RULES = {
  imperative: { en: 'Imperative: base verb at the start. Negative: Don\'t + base verb. Let\'s + base verb for suggestions.', vi: 'Câu mệnh lệnh: động từ nguyên mẫu đứng đầu. Phủ định: Don\'t + động từ. Rủ rê: Let\'s + động từ.' },
  toInf: { en: 'want, would like, need, hope, decide, plan + to + base verb.', vi: 'want, would like, need, hope, decide, plan + to + động từ nguyên mẫu.' },
  ing: { en: "enjoy, finish, don't mind, be good at, be interested in + verb-ing.", vi: "enjoy, finish, don't mind, be good at, be interested in + động từ-ing." },
  wouldLike: { en: "I'd like = I would like: a polite way to say what you want.", vi: "I'd like = I would like: cách nói lịch sự điều mình muốn." },
  purpose: { en: 'Use to + base verb to say why: I went to the shop to buy milk.', vi: 'Dùng to + động từ để nói mục đích: I went to the shop to buy milk.' },
  place: { en: 'in = inside; on = on a surface; at = at a point.', vi: 'in = bên trong; on = trên bề mặt; at = tại một điểm.' },
  time: { en: 'at + times; on + days and dates; in + months, years, seasons and parts of the day.', vi: 'at + giờ; on + thứ, ngày; in + tháng, năm, mùa, buổi trong ngày.' },
  position: { en: 'next to, between, opposite, behind, in front of show position.', vi: 'next to (bên cạnh), between (ở giữa), opposite (đối diện), behind (phía sau), in front of (phía trước).' },
  movement: { en: 'across, through, along, into, out of, up, down, over, under show movement.', vi: 'across, through, along, into, out of, up, down, over, under chỉ sự chuyển động.' },
} as const;
const buildBank = createBankBuilder(RULES, 14);
const IM = 'imperatives', VP = 'verb-patterns', PR = 'prepositions';

export const UNIT_40_QUESTIONS: Question[] = buildBank(40, [
  ['___ quiet, please! The baby is sleeping.', 'Be', ['Being', 'Are', 'To be'], 'imperative', IM, 1],
  ['___ touch the plates. They\'re hot!', "Don't", ['Not', 'No', "Doesn't"], 'imperative', IM, 1],
  ['___ go to the cinema tonight!', "Let's", ['Lets', 'Let us to', 'Let'], 'imperative', IM, 2],
  ['I want ___ a doctor when I grow up. (be)', 'to be', ['being', 'be', 'to being'], 'toInf', VP, 1],
  ['Mai enjoys ___ to music. (listen)', 'listening', ['to listen', 'listen', 'listens'], 'ing', VP, 1],
  ['I\'d like ___ a glass of water, please. (have)', 'to have', ['having', 'have', 'to having'], 'wouldLike', VP, 1],
  ['Nam is good at ___ pictures. (draw)', 'drawing', ['draw', 'to draw', 'draws'], 'ing', VP, 1],
  ['We need ___ some bread. (buy)', 'to buy', ['buying', 'buy', 'to buying'], 'toInf', VP, 2],
  ['Have you finished ___ your homework? (do)', 'doing', ['to do', 'do', 'done'], 'ing', VP, 2],
  ['They decided ___ to Da Lat for the holiday. (go)', 'to go', ['going', 'go', 'to going'], 'toInf', VP, 2],
  ['I don\'t mind ___ the dishes. (wash)', 'washing', ['to wash', 'wash', 'washes'], 'ing', VP, 2],
  ['Would you like ___ with us? (come)', 'to come', ['coming', 'come', 'to coming'], 'wouldLike', VP, 1],
  ['I went to the shop ___ some milk. (buy)', 'to buy', ['for buy', 'for buying', 'for to buy'], 'purpose', VP, 3],
  ['She is interested in ___ about space. (learn)', 'learning', ['learn', 'to learn', 'learns'], 'ing', VP, 2],
  ['___ your seat belt.', 'Fasten', ['Fastening', 'To fasten', 'You fastening'], 'imperative', IM, 1],
  ['I hope ___ you again soon. (see)', 'to see', ['seeing', 'see', 'to seeing'], 'toInf', VP, 2],
  ['My dad stopped ___ coffee at night. (drink)', 'drinking', ['to drinking', 'drink', 'drinks'], 'ing', VP, 3],
  ['___ late for the bus!', "Don't be", ["Don't", 'Not be', "Aren't"], 'imperative', IM, 2],
  ['We are planning ___ a party for Lan. (have)', 'to have', ['having', 'have', 'to having'], 'toInf', VP, 3],
  ['Thank you for ___ me. (help)', 'helping', ['help', 'to help', 'helped'], 'ing', VP, 3],
], [
  ['Please to sit down.', 'Please sit down.', ['Please sitting down.', 'Please you sit down.'], 'imperative', IM],
  ["Not run in the classroom!", "Don't run in the classroom!", ["No running to the classroom!", "Doesn't run in the classroom!"], 'imperative', IM],
  ['I want going to the zoo.', 'I want to go to the zoo.', ['I want go to the zoo.', 'I want to going to the zoo.'], 'toInf', VP],
  ['She enjoys to swim in the sea.', 'She enjoys swimming in the sea.', ['She enjoys swim in the sea.', 'She enjoys to swimming in the sea.'], 'ing', VP],
  ["I'd like have a pizza.", "I'd like to have a pizza.", ["I'd like having a pizza.", "I'd like to having a pizza."], 'wouldLike', VP],
  ['He is good at play chess.', 'He is good at playing chess.', ['He is good at to play chess.', 'He is good at plays chess.'], 'ing', VP],
], [
  ["Don't forget your umbrella.", 'imperative', IM],
  ["Let's play football after school.", 'imperative', IM],
  ['I want to be a vet.', 'toInf', VP],
  ['My brother enjoys playing video games.', 'ing', VP],
  ["I'd like to visit Japan one day.", 'wouldLike', VP],
]);

export const UNIT_41_QUESTIONS: Question[] = buildBank(41, [
  ['The clock is ___ the wall.', 'on', ['in', 'at', 'to'], 'place', PR, 1],
  ['My birthday is ___ March.', 'in', ['on', 'at', 'to'], 'time', PR, 1],
  ['The lesson starts ___ eight o\'clock.', 'at', ['in', 'on', 'to'], 'time', PR, 1],
  ['We don\'t go to school ___ Sunday.', 'on', ['in', 'at', 'to'], 'time', PR, 1],
  ['The bank is ___ the café and the bookshop. (in the middle)', 'between', ['next', 'opposite of', 'behind of'], 'position', PR, 2],
  ['The cat is hiding ___ the sofa. (at the back of it)', 'behind', ['in front', 'between', 'next'], 'position', PR, 2],
  ['My house is ___ the school. (on the other side of the road, facing it)', 'opposite', ['between', 'next', 'in front'], 'position', PR, 2],
  ['Sit ___ me, please. (at my side)', 'next to', ['next', 'between', 'opposite of'], 'position', PR, 2],
  ['There\'s a big tree ___ our house. (before it, where everyone can see)', 'in front of', ['in front', 'front of', 'between'], 'position', PR, 3],
  ['The children ran ___ the park to the gate. (from one side to the other)', 'across', ['onto', 'off', 'up'], 'movement', PR, 2],
  ['A small dog came ___ the garden through a hole in the fence. (to the inside)', 'into', ['onto', 'off', 'up'], 'movement', PR, 2],
  ['I was born ___ 2013.', 'in', ['on', 'at', 'to'], 'time', PR, 1],
  ['Is Lan ___ home?', 'at', ['in', 'on', 'to'], 'place', PR, 1],
  ['We have a holiday ___ 2 September.', 'on', ['in', 'at', 'to'], 'time', PR, 2],
  ['The children are ___ the classroom.', 'in', ['on', 'at', 'to'], 'place', PR, 1],
  ['We get up early ___ the morning.', 'in', ['on', 'at', 'to'], 'time', PR, 1],
  ['The children walked ___ the forest. (in one side and out the other)', 'through', ['onto', 'off', 'up'], 'movement', PR, 3],
  ['Mum is waiting ___ the school gate.', 'at', ['in', 'on', 'to'], 'place', PR, 2],
  ['It\'s often cold ___ winter.', 'in', ['on', 'at', 'to'], 'time', PR, 1],
  ['We stayed at home ___ New Year\'s Day.', 'on', ['in', 'at', 'to'], 'time', PR, 3],
], [
  ['See you in Monday!', 'See you on Monday!', ['See you at Monday!', 'See you to Monday!'], 'time', PR],
  ['The party starts on 7 pm.', 'The party starts at 7 pm.', ['The party starts in 7 pm.', 'The party starts to 7 pm.'], 'time', PR],
  ['My cousin lives at Hanoi.', 'My cousin lives in Hanoi.', ['My cousin lives on Hanoi.', 'My cousin lives to Hanoi.'], 'place', PR],
  ['The post office is next the bank.', 'The post office is next to the bank.', ['The post office is next of the bank.', 'The post office is next at the bank.'], 'position', PR],
  ['The café is opposite of the cinema.', 'The café is opposite the cinema.', ['The café is opposite to of the cinema.', 'The café is opposites the cinema.'], 'position', PR],
  ['There is a bus stop in front the hotel.', 'There is a bus stop in front of the hotel.', ['There is a bus stop in the front the hotel.', 'There is a bus stop front of the hotel.'], 'position', PR],
], [
  ['The shop is between the bank and the café.', 'position', PR],
  ['We have Art on Friday afternoon.', 'time', PR],
  ['The cat jumped into the box.', 'movement', PR],
  ['I usually get up at six o\'clock.', 'time', PR],
  ['There is a lamp on my desk.', 'place', PR],
]);

/** Unit 42: meaning and translation checks for every taught communication and technology word. */
export const UNIT_42_QUESTIONS: Question[] = buildWordBank(42, 14, TECH_WORDS);
