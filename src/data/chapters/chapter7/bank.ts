import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { RULE_WORDS } from './content';

const RULES = {
  can: { en: 'can / can\'t + base verb: ability now, permission or no permission.', vi: "can / can't + động từ nguyên mẫu: khả năng, được phép hoặc không được phép." },
  could: { en: 'could / couldn\'t: ability in the past.', vi: "could / couldn't: khả năng trong quá khứ." },
  request: { en: 'Can I …? / Could I …? ask for permission; Could you …? is a polite request.', vi: 'Can I …? / Could I …? xin phép; Could you …? nhờ lịch sự.' },
  may: { en: 'may / may not: perhaps it will (or won\'t) happen. Use may not, not couldn\'t.', vi: "may / may not: có thể (hoặc có thể không) xảy ra. Dùng may not, không dùng couldn't." },
  modalForm: { en: 'Modal verbs take the base verb without to and never add -s.', vi: 'Động từ khuyết thiếu đi với động từ nguyên mẫu không có to và không thêm -s.' },
  must: { en: 'must + base verb: a strong duty or rule.', vi: 'must + động từ nguyên mẫu: bắt buộc.' },
  mustnt: { en: "mustn't: it is not allowed.", vi: "mustn't: cấm, không được phép." },
  haveTo: { en: 'have to / has to: it is necessary. It changes like a normal verb.', vi: 'have to / has to: phải, cần thiết. Biến đổi như động từ thường.' },
  dontHaveTo: { en: "don't / doesn't have to: it isn't necessary.", vi: "don't / doesn't have to: không cần." },
  haveToQuestion: { en: 'Questions with have to use Do/Does.', vi: 'Câu hỏi với have to dùng Do/Does.' },
} as const;
const buildBank = createBankBuilder(RULES, 7);
const CC = 'can-could', MAY = 'may-might', REQ = 'requests', MH = 'must-have-to', SIGN = 'rules-signs';

export const UNIT_19_QUESTIONS: Question[] = buildBank(19, [
  ['I ___ help you with the cleaning. I\'m free now.', 'can', ['cans', 'can to', 'am can'], 'can', CC, 1],
  ['Mozart ___ play the piano when he was five.', 'could', ['can', 'coulds', 'could to'], 'could', CC, 1],
  ['I ___ read when I was two. I was too young.', "couldn't", ["can't", "didn't could", "wasn't can"], 'could', CC, 1],
  ['You ___ use this laptop. It\'s for teachers only.', "can't", ['can', "don't can", "not can"], 'can', CC, 2],
  ['You ___ use my laptop. I don\'t need it today.', 'can', ["can't", 'cans', 'can to'], 'can', CC, 2],
  ['___ I use your pencil, please?', 'Could', ['Do', 'Am', 'Does'], 'request', REQ, 1],
  ['Could you ___ me, please?', 'help', ['helping', 'to help', 'helps'], 'modalForm', REQ, 1],
  ['Alex has a cold, so he ___ come to school tomorrow.', 'may not', ["couldn't", "mayn't", "doesn't may"], 'may', MAY, 2],
  ['Take an umbrella. It ___ rain later.', 'may', ['mays', 'may to', 'is may'], 'may', MAY, 1],
  ['They ___ visit the museum on Saturday, but they aren\'t sure.', 'may', ['mays', 'may to', 'are may'], 'may', MAY, 2],
  ['My grandma ___ swim, but she can ride a bike.', "can't", ["don't can", "isn't can", 'not can'], 'can', CC, 1],
  ['___ your brother speak English? Yes, he can.', 'Can', ['Does', 'Is', 'Do'], 'can', CC, 1],
  ['Can you skate? No, I ___.', "can't", ["don't", "am not", "couldn't"], 'can', CC, 1],
  ['Could you swim when you were six? Yes, I ___.', 'could', ['can', 'did', 'was'], 'could', CC, 2],
  ['She can ___ three languages.', 'speak', ['speaks', 'speaking', 'to speak'], 'modalForm', CC, 1],
  ['When I was little, I ___ tie my shoes. Now I can.', "couldn't", ["can't", "mayn't", "don't can"], 'could', CC, 2],
  ['We ___ go to the library this afternoon. We haven\'t decided yet.', 'could', ['can to', 'coulds', 'did'], 'may', MAY, 3],
  ['___ I go to the toilet, please?', 'Can', ['Do', 'Am', 'Does'], 'request', REQ, 1],
  ['Nam ___ come to the party. He isn\'t sure yet.', 'may', ['mays', 'may to', 'is may'], 'may', MAY, 1],
  ['Lan ___ ride a bike when she was four, but now she can.', "couldn't", ["can't", "didn't can", 'may not'], 'could', CC, 2],
], [
  ['She cans play the violin.', 'She can play the violin.', ['She can plays the violin.', 'She can to play the violin.'], 'modalForm', CC],
  ['I can to swim very well.', 'I can swim very well.', ['I can swimming very well.', 'I cans swim very well.'], 'modalForm', CC],
  ['Do you can ride a horse?', 'Can you ride a horse?', ['Are you can ride a horse?', 'Can you riding a horse?'], 'can', CC],
  ["He couldn't come tomorrow because he is ill.", "He may not come tomorrow because he is ill.", ["He mayn't come tomorrow because he is ill.", "He may not to come tomorrow because he is ill."], 'may', MAY],
  ['I didn\'t could read when I was three.', "I couldn't read when I was three.", ["I can't read when I was three.", "I couldn't to read when I was three."], 'could', CC],
  ['Could you to open the door, please?', 'Could you open the door, please?', ['Could you opening the door, please?', 'Could you opens the door, please?'], 'request', REQ],
], [
  ['My little brother can count to a hundred.', 'can', CC],
  ['Could you pass me the salt, please?', 'request', REQ],
  ["I couldn't swim when I was five.", 'could', CC],
  ['We may go to the beach tomorrow.', 'may', MAY],
  ['Can I use your phone, please?', 'request', REQ],
]);

export const UNIT_20_QUESTIONS: Question[] = buildBank(20, [
  ['You ___ wear a helmet on a motorbike. It\'s the law.', 'must', ['mustn\'t', 'don\'t have to', 'musts'], 'must', MH, 1],
  ['You ___ talk in the exam. It isn\'t allowed.', "mustn't", ["don't have to", 'must', 'have to'], 'mustnt', SIGN, 1],
  ['It\'s Saturday. I ___ get up early.', "don't have to", ["mustn't", 'must', 'has to'], 'dontHaveTo', MH, 2],
  ['My mum ___ work on Sundays. She is a nurse.', 'has to', ['have to', 'must to', 'haves to'], 'haveTo', MH, 1],
  ['I ___ buy some new pencils tomorrow.', 'have to', ['has to', 'must to', 'having to'], 'haveTo', MH, 1],
  ['___ you have to wear a uniform at your school?', 'Do', ['Does', 'Have', 'Are'], 'haveToQuestion', MH, 1],
  ['___ Minh have to walk the dog every day?', 'Does', ['Do', 'Has', 'Is'], 'haveToQuestion', MH, 1],
  ['Students ___ run in the corridor. It\'s dangerous.', "mustn't", ["don't have to", 'must', 'have to'], 'mustnt', SIGN, 1],
  ['Lan ___ cook dinner tonight. Her dad is cooking.', "doesn't have to", ["don't have to", "mustn't", "hasn't to"], 'dontHaveTo', MH, 2],
  ['You must ___ your hands before lunch.', 'wash', ['to wash', 'washing', 'washes'], 'must', MH, 1],
  ['We ___ be late. The bus leaves at 7.', "mustn't", ["don't have to", 'must to', "haven't to"], 'mustnt', SIGN, 2],
  ['Does Hoa have to study tonight? Yes, she ___.', 'does', ['has', 'must', 'is'], 'haveToQuestion', MH, 2],
  ['Do we have to pay? No, we ___. It\'s free.', "don't", ["mustn't", "haven't", "doesn't"], 'dontHaveTo', MH, 2],
  ['The museum is free, so you ___ pay.', "don't have to", ["mustn't", 'must', 'have to'], 'dontHaveTo', MH, 1],
  ['You ___ feed the animals at the zoo. The sign says no.', "mustn't", ["don't have to", 'must', 'have to'], 'mustnt', SIGN, 1],
  ['He ___ to see a doctor. He is very ill.', 'has', ['have', 'must', 'does'], 'haveTo', MH, 2],
  ['Drivers ___ stop at a red light.', 'must', ["mustn't", 'musts', 'must to'], 'must', MH, 1],
  ['Do I have to ___ a dictionary to the test?', 'bring', ['brings', 'to bring', 'bringing'], 'haveToQuestion', MH, 2],
  ['We have a dishwasher, so I ___ wash the dishes.', "don't have to", ["mustn't", 'have to', 'must'], 'dontHaveTo', MH, 2],
  ['You ___ forget your passport. You can\'t fly without it!', "mustn't", ["don't have to", 'must', 'have to'], 'mustnt', SIGN, 2],
], [
  ['You must to wear a seat belt.', 'You must wear a seat belt.', ['You musts wear a seat belt.', 'You must wearing a seat belt.'], 'must', MH],
  ['She have to tidy her room.', 'She has to tidy her room.', ['She has tidy her room.', 'She must to tidy her room.'], 'haveTo', MH],
  ['Do he have to go to school on Saturday?', 'Does he have to go to school on Saturday?', ['Has he to go to school on Saturday?', 'Does he has to go to school on Saturday?'], 'haveToQuestion', MH],
  ["We haven't to wear a tie.", "We don't have to wear a tie.", ["We don't have wear a tie.", "We doesn't have to wear a tie."], 'dontHaveTo', MH],
  ["It's a holiday. You mustn't go to school.", "It's a holiday. You don't have to go to school.", ["It's a holiday. You haven't to go to school.", "It's a holiday. You doesn't have to go to school."], 'dontHaveTo', MH],
  ['You don\'t have to smoke here. It\'s a hospital.', "You mustn't smoke here. It's a hospital.", ["You mustn't to smoke here. It's a hospital.", "You must smoke here. It's a hospital."], 'mustnt', SIGN],
], [
  ['You must listen to the teacher.', 'must', MH],
  ["We don't have to wear a uniform on Fridays.", 'dontHaveTo', MH],
  ['Does your sister have to take the bus?', 'haveToQuestion', MH],
  ["You mustn't use your phone in class.", 'mustnt', SIGN],
  ['My dad has to get up at five.', 'haveTo', MH],
]);

/** Unit 21: meaning and translation checks for every taught rules word. */
export const UNIT_21_QUESTIONS: Question[] = buildWordBank(21, 7, RULE_WORDS);
