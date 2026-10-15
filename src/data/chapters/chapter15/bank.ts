import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { FAMILY_FRIENDS_WORDS } from './content';

const RULES = {
  thirdPerson: { en: 'He/she/it: verb + -s; -es after ch, sh, s, x, o; consonant + y → -ies; have → has.', vi: 'Ngôi thứ ba số ít: động từ + -s; thêm -es sau ch, sh, s, x, o; phụ âm + y → -ies; have → has.' },
  negQ: { en: "Present Simple negatives and questions use don't/doesn't and do/does + base verb.", vi: "Phủ định và câu hỏi hiện tại đơn dùng don't/doesn't và do/does + động từ nguyên mẫu." },
  facts: { en: 'Present Simple is for habits, facts and things that are always true.', vi: 'Hiện tại đơn dùng cho thói quen, sự thật và điều luôn đúng.' },
  adverb: { en: 'Frequency adverbs go before the main verb but after be.', vi: 'Trạng từ chỉ tần suất đứng trước động từ thường nhưng sau động từ be.' },
  there: { en: 'there is + singular or uncountable noun; there are + plural noun. Use some in positives, any in negatives and questions.', vi: 'there is + danh từ số ít hoặc không đếm được; there are + danh từ số nhiều. Câu khẳng định dùng some, phủ định và câu hỏi dùng any.' },
  howMany: { en: 'How many + plural noun + are there? How much + uncountable noun + is there?', vi: 'How many + danh từ số nhiều + are there? How much + danh từ không đếm được + is there?' },
  thereIt: { en: 'there is/are says something exists; it/they + be describes a thing already mentioned.', vi: 'there is/are nói rằng có cái gì đó; it/they + be miêu tả vật đã được nhắc đến.' },
  continuous: { en: 'Present Continuous (am/is/are + verb-ing) is for actions happening now.', vi: 'Hiện tại tiếp diễn (am/is/are + động từ-ing) dùng cho hành động đang diễn ra.' },
  temporary: { en: 'Present Continuous is also for temporary situations (this week, these days); Present Simple is for usual habits.', vi: 'Hiện tại tiếp diễn còn dùng cho tình huống tạm thời (this week, these days); hiện tại đơn dùng cho thói quen thường ngày.' },
  spelling: { en: '-ing spelling: drop silent -e, change ie to y, double one final consonant after one short stressed vowel.', vi: 'Chính tả -ing: bỏ -e câm, đổi ie thành y, gấp đôi phụ âm cuối sau một nguyên âm ngắn được nhấn.' },
  stative: { en: 'State verbs (know, want, need, own, belong, understand, prefer…) are not usually used with -ing.', vi: 'Động từ chỉ trạng thái (know, want, need, own, belong, understand, prefer…) thường không dùng dạng -ing.' },
  twoMeanings: { en: 'think, have, taste, see: simple for a state or opinion, continuous for an action happening now.', vi: 'think, have, taste, see: dùng thì đơn khi chỉ trạng thái/ý kiến, thì tiếp diễn khi chỉ hành động đang diễn ra.' },
} as const;
const buildBank = createBankBuilder(RULES, 15);
const PS = 'present-simple', TH = 'there-is-are', PC = 'present-continuous', SV = 'stative-verbs';

export const UNIT_43_QUESTIONS: Question[] = buildBank(43, [
  ['My uncle ___ motorbikes in his small shop in Hue. (fix)', 'fixes', ['fixs', 'fix', 'fixies'], 'thirdPerson', PS, 1],
  ['Lan ___ English and Chinese at a language centre. (study)', 'studies', ['studys', 'study', 'studyes'], 'thirdPerson', PS, 1],
  ['Water ___ at 100 degrees Celsius.', 'boils', ['is boiling', 'boil', 'boiling'], 'facts', PS, 2],
  ['___ your brother live in Da Nang or in Hue?', 'Does', ['Do', 'Is', 'Has'], 'negQ', PS, 1],
  ['My grandparents ___ meat. They are vegetarians.', "don't eat", ["doesn't eat", "aren't eat", "don't eats"], 'negQ', PS, 2],
  ['Where ___ your mum work?', 'does', ['do', 'is', 'has'], 'negQ', PS, 2],
  ['Minh ___ his homework before dinner.', 'always does', ['does always', 'always do', 'is always do'], 'adverb', PS, 2],
  ['We ___ late for our English class.', 'are never', ['never are', 'never', 'do never'], 'adverb', PS, 2],
  ['The school bus ___ at 6.45 every morning.', 'leaves', ['leave', 'is leave', 'leaving'], 'facts', PS, 1],
  ['What time ___ the shops close on Sundays?', 'do', ['does', 'are', 'is'], 'negQ', PS, 2],
  ['Our teacher ___ angry. She is very patient.', 'is rarely', ['rarely is', 'rarely', 'does rarely'], 'adverb', PS, 3],
  ['There ___ a lot of tourists in Hoi An in the summer.', 'are', ['is', 'have', 'be'], 'there', TH, 1],
  ['There ___ any milk in the fridge. Can you buy some?', "isn't", ["aren't", "don't", 'not'], 'there', TH, 1],
  ['___ any good cafés near your school?', 'Are there', ['Is there', 'There are', 'Have there'], 'there', TH, 2],
  ['How many students ___ in your class?', 'are there', ['is there', 'there are', 'do there'], 'howMany', TH, 2],
  ['How much homework ___ for tomorrow?', 'is there', ['are there', 'there is', 'does there'], 'howMany', TH, 2],
  ['There is a new cinema in town. ___ very big and modern.', "It's", ["There's", 'Its', "It has"], 'thereIt', TH, 3],
  ['There ___ some furniture in the new flat, but not much.', 'is', ['are', 'have', 'be'], 'there', TH, 3],
  ['___ a post office near here? — Yes, there is.', 'Is there', ['Are there', 'There is', 'Has there'], 'there', TH, 2],
  ['My cousin ___ his bike to school every day. (ride)', 'rides', ['ride', 'rids', 'is ride'], 'thirdPerson', PS, 1],
], [
  ['My sister watchs cartoons every evening.', 'My sister watches cartoons every evening.', ['My sister watch cartoons every evening.', 'My sister watchies cartoons every evening.'], 'thirdPerson', PS],
  ["Nam doesn't likes spicy food.", "Nam doesn't like spicy food.", ["Nam don't like spicy food.", "Nam isn't like spicy food."], 'negQ', PS],
  ['Does your father works in a hospital?', 'Does your father work in a hospital?', ['Do your father work in a hospital?', 'Is your father work in a hospital?'], 'negQ', PS],
  ['I go usually to bed at ten.', 'I usually go to bed at ten.', ['I usually goes to bed at ten.', 'I am usually go to bed at ten.'], 'adverb', PS],
  ['There are some water in the bottle.', 'There is some water in the bottle.', ['There is any water in the bottle.', 'There are any water in the bottle.'], 'there', TH],
  ['How many chairs there are in the room?', 'How many chairs are there in the room?', ['How many chairs is there in the room?', 'How much chairs are there in the room?'], 'howMany', TH],
], [
  ['My mother never drinks coffee in the evening.', 'adverb', PS],
  ['Does Minh play the guitar at weekends?', 'negQ', PS],
  ['There are thirty-five students in my class.', 'there', TH],
  ["There isn't any rice in the rice cooker.", 'there', TH],
  ['How often do you visit your grandparents?', 'negQ', PS],
]);

export const UNIT_44_QUESTIONS: Question[] = buildBank(44, [
  ['Look! The children ___ in the river. (swim)', 'are swimming', ['are swiming', 'swim', 'is swimming'], 'spelling', PC, 1],
  ['Be quiet, please. Grandpa ___ on the sofa. (lie)', 'is lying', ['is lieing', 'lies', 'is liing'], 'spelling', PC, 2],
  ['Lan usually walks to school, but this week she ___ the bus.', 'is taking', ['takes', 'take', 'is take'], 'temporary', PC, 2],
  ['My dad ___ in Ha Noi this month because of his new project.', 'is working', ['works', 'work', 'working'], 'temporary', PC, 2],
  ['I ___ the answer to question five.', 'know', ['am knowing', 'knows', 'knowing'], 'stative', SV, 1],
  ['This blue backpack ___ to Minh.', 'belongs', ['is belonging', 'belong', 'belonging'], 'stative', SV, 2],
  ['We ___ a great time in Nha Trang right now!', 'are having', ['have', 'has', 'are have'], 'twoMeanings', SV, 2],
  ['I ___ your new haircut looks great.', 'think', ['am thinking', 'thinks', 'thinking'], 'twoMeanings', SV, 2],
  ['What ___ at the moment? — I\'m writing an email.', 'are you doing', ['do you do', 'are you do', 'you are doing'], 'continuous', PC, 2],
  ['Nam ___ his homework now. He\'s playing a game!', "isn't doing", ["doesn't do", "isn't do", "not doing"], 'continuous', PC, 1],
  ['These days, more and more students ___ to school by electric bike.', 'are going', ['goes', 'is going', 'going'], 'temporary', PC, 3],
  ['Mai ___ long black hair and brown eyes.', 'has', ['is having', 'have', 'having'], 'twoMeanings', SV, 3],
  ['Do you ___ what I mean?', 'understand', ['understanding', 'understands', 'understood of'], 'stative', SV, 1],
  ['Mum ___ dinner, so she can\'t answer the phone. (make)', 'is making', ['is makeing', 'makes', 'is makking'], 'spelling', PC, 1],
  ['This cake ___ really sweet.', 'tastes', ['is tasting', 'taste', 'tasting'], 'twoMeanings', SV, 2],
  ['My brother ___ a lot of video games, but this week he\'s studying for his exams.', 'usually plays', ['is playing usually', 'usually play', 'plays usually'], 'temporary', PC, 3],
  ['Minh ___ a new phone. His old one is broken.', 'needs', ['is needing', 'need', 'needing'], 'stative', SV, 1],
  ['Why ___ you ___ your coat? It\'s hot today!', 'are … wearing', ['do … wearing', 'are … wear', 'is … wearing'], 'continuous', PC, 2],
  ['We ___ a trip to Phu Quoc for the summer holiday. (plan)', 'are planning', ['are planing', 'plan', 'are planeing'], 'spelling', PC, 2],
  ['Hoa ___ Japanese food to Korean food.', 'prefers', ['is preferring', 'prefer', 'preferring'], 'stative', SV, 2],
], [
  ['Listen! Somebody sings in the next room.', 'Listen! Somebody is singing in the next room.', ['Listen! Somebody singing in the next room.', 'Listen! Somebody are singing in the next room.'], 'continuous', PC],
  ['I am wanting a new pair of trainers.', 'I want a new pair of trainers.', ['I wants a new pair of trainers.', 'I am want a new pair of trainers.'], 'stative', SV],
  ['She is writeing a letter to her penfriend.', 'She is writing a letter to her penfriend.', ['She is writting a letter to her penfriend.', 'She writeing a letter to her penfriend.'], 'spelling', PC],
  ['Nam is having two sisters and a brother.', 'Nam has two sisters and a brother.', ['Nam have two sisters and a brother.', 'Nam is has two sisters and a brother.'], 'twoMeanings', SV],
  ["This week I stay with my aunt because my parents are away.", "This week I'm staying with my aunt because my parents are away.", ["This week I staying with my aunt because my parents are away.", "This week I am stay with my aunt because my parents are away."], 'temporary', PC],
  ['Do you understanding the question?', 'Do you understand the question?', ['Are you understand the question?', 'Does you understand the question?'], 'stative', SV],
], [
  ['My cousin is staying with us this week.', 'temporary', PC],
  ['I don\'t believe his story.', 'stative', SV],
  ['What are you thinking about?', 'twoMeanings', SV],
  ['The baby is lying in her bed.', 'spelling', PC],
  ['Are you having a good time?', 'twoMeanings', SV],
]);

/** Unit 45: meaning and translation checks for every taught family and friends word. */
export const UNIT_45_QUESTIONS: Question[] = buildWordBank(45, 15, FAMILY_FRIENDS_WORDS);
