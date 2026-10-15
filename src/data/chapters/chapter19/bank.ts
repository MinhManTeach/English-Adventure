import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { WORK_WORDS } from './content';

const RULES = {
  willPredict: { en: 'Use will + base verb for predictions and opinions about the future, often after I think, I\'m sure, I hope or maybe.', vi: 'Dùng will + động từ nguyên mẫu để dự đoán hoặc nêu ý kiến về tương lai, thường sau I think, I\'m sure, I hope, maybe.' },
  wont: { en: 'won\'t = will not. Use it for negative predictions, promises and refusals (The car won\'t start).', vi: 'won\'t = will not, dùng cho dự đoán phủ định, lời hứa và sự từ chối (The car won\'t start = xe không chịu nổ máy).' },
  adverb: { en: 'probably and definitely go after will but before won\'t: will probably, probably won\'t.', vi: 'probably, definitely đứng sau will nhưng đứng trước won\'t: will probably, probably won\'t.' },
  offer: { en: 'Use I\'ll for offers, promises and quick decisions; Shall I / Shall we + base verb for offers and suggestions.', vi: 'Dùng I\'ll để đề nghị giúp, hứa hoặc quyết định ngay lúc nói; Shall I / Shall we + động từ để đề nghị, gợi ý.' },
  goingTo: { en: 'Use am / is / are going to + base verb for plans and intentions.', vi: 'Dùng am / is / are going to + động từ nguyên mẫu để nói về kế hoạch, dự định.' },
  evidence: { en: 'Use be going to for a prediction when something you can see now tells you what will happen.', vi: 'Dùng be going to để dự đoán khi có dấu hiệu, bằng chứng ngay lúc nói.' },
  thereWill: { en: 'there will be / there is going to be are the future of there is and there are.', vi: 'there will be / there is going to be là dạng tương lai của there is / there are.' },
  reflexive: { en: 'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves: the subject and the object are the same.', vi: 'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves: dùng khi chủ ngữ và tân ngữ là cùng một người hoặc vật.' },
  byMyself: { en: 'by myself, by yourself, by themselves … = alone or without help.', vi: 'by myself, by yourself, by themselves … = một mình, không có ai giúp.' },
  eachOther: { en: 'each other = one person does it to the other, and the other does it back.', vi: 'each other = lẫn nhau (người này làm cho người kia và ngược lại).' },
  possPronoun: { en: 'mine, yours, his, hers, ours, theirs replace my / your … + noun. They never have an apostrophe.', vi: 'mine, yours, his, hers, ours, theirs thay cho my / your … + danh từ. Không bao giờ có dấu \'.' },
  ofMine: { en: 'a friend of mine = one of my friends; a neighbour of ours = one of our neighbours.', vi: 'a friend of mine = một người bạn của tôi; a neighbour of ours = một người hàng xóm của chúng tôi.' },
  whose: { en: 'Whose …? asks who owns something. Who\'s = who is.', vi: 'Whose …? hỏi vật thuộc về ai. Who\'s = who is.' },
  its: { en: 'its = belonging to it; it\'s = it is.', vi: 'its = của nó; it\'s = it is.' },
  apostropheS: { en: 'Singular nouns, names and irregular plurals (children, women, men, people) add \'s.', vi: 'Danh từ số ít, tên riêng và danh từ số nhiều bất quy tắc (children, women, men, people) thêm \'s.' },
  pluralApostrophe: { en: 'Regular plural nouns ending in -s add only an apostrophe: my parents\' room.', vi: 'Danh từ số nhiều có quy tắc tận cùng bằng -s chỉ thêm dấu \': my parents\' room.' },
  objectPronoun: { en: 'After a verb or a preposition, use me, you, him, her, it, us, them.', vi: 'Sau động từ hoặc giới từ dùng me, you, him, her, it, us, them.' },
} as const;
const buildBank = createBankBuilder(RULES, 19);
const WG = 'will', GT = 'going-to', RF = 'reflexive-pronouns', PS = 'possessive-pronouns', PO = 'possessive-s';

export const UNIT_55_QUESTIONS: Question[] = buildBank(55, [
  ['I\'m sure Lan ___ the singing contest. Her voice is amazing. (win)', 'will win', ['will wins', 'wins will', 'will to win'], 'willPredict', WG, 1],
  ['Look at that little boy on the wall! He ___ fall!', 'is going to', ['going to', 'is going', 'are going to'], 'evidence', GT, 1],
  ['___ there be a test on Friday?', 'Will', ['Is', 'Are', 'Does'], 'thereWill', WG, 2],
  ['I ___ tell Mum about the broken vase, I promise.', 'won\'t', ['willn\'t', 'am not', 'won\'t to'], 'wont', WG, 1],
  ['We ___ travel to Sa Pa next winter. We have already booked the hotel.', 'are going to', ['is going to', 'are go to', 'going to'], 'goingTo', GT, 1],
  ['It\'s very late. Our team ___ win now. (probably not)', 'probably won\'t', ['won\'t probably', 'probably don\'t', 'probably not will'], 'adverb', WG, 2],
  ['That box looks heavy. ___ I help you carry it?', 'Shall', ['Does', 'Am', 'Have'], 'offer', WG, 2],
  ['There ___ a fireworks show at midnight on New Year\'s Eve. (going to)', 'is going to be', ['are going to be', 'is going to', 'going to be'], 'thereWill', GT, 2],
  ['My sister ___ become a doctor. She studies hard every day. (definitely)', 'will definitely', ['definitely wills', 'will definitely to', 'definitely will to'], 'adverb', WG, 2],
  ['What ___ you going to wear to the party?', 'are', ['do', 'will', 'is'], 'goingTo', GT, 1],
  ['I don\'t think Minh ___ to the class picnic. He has a cold. (come)', 'will come', ['will comes', 'will coming', 'comes will'], 'willPredict', WG, 2],
  ['I\'ve left my pencil case at home! — Don\'t worry. I ___ lend you a pen.', 'will', ['am', 'will to', 'shall to'], 'offer', WG, 2],
  ['The car ___ start. I think the battery is dead.', 'won\'t', ['doesn\'t will', 'willn\'t', 'won\'t to'], 'wont', WG, 3],
  ['Mai ___ going to stay at her grandparents\' house this summer.', 'is', ['are', 'will', 'does'], 'goingTo', GT, 1],
  ['___ we go to the night market after dinner? (a suggestion)', 'Shall', ['Are', 'Have', 'Does'], 'offer', WG, 2],
  ['Be careful! That glass ___ fall off the table. (going to)', 'is going to', ['are going to', 'is go to', 'going to'], 'evidence', GT, 2],
  ['Nam and his dad ___ going to fix the roof this weekend. (not)', 'aren\'t', ['isn\'t', 'don\'t', 'won\'t'], 'goingTo', GT, 2],
  ['I hope you ___ a great time in Da Lat! (have)', 'will have', ['will having', 'will has', 'have will'], 'willPredict', WG, 1],
  ['In twenty years, robots ___ most of the housework. (probably)', 'will probably do', ['probably will to do', 'will probably doing', 'probably wills do'], 'adverb', WG, 3],
  ['Who ___ going to be the new class monitor?', 'is', ['are', 'does', 'will'], 'goingTo', GT, 2],
], [
  ['I think it will raining tomorrow.', 'I think it will rain tomorrow.', ['I think it wills rain tomorrow.', 'I think it will to rain tomorrow.'], 'willPredict', WG],
  ['Mai won\'t probably come to the party.', 'Mai probably won\'t come to the party.', ['Mai probably not will come to the party.', 'Mai doesn\'t probably come to the party.'], 'adverb', WG],
  ['We going to visit Hoi An next month.', 'We are going to visit Hoi An next month.', ['We are going visit Hoi An next month.', 'We is going to visit Hoi An next month.'], 'goingTo', GT],
  ['Look at the clouds! It is going to raining.', 'Look at the clouds! It is going to rain.', ['Look at the clouds! It going to rain.', 'Look at the clouds! It are going to rain.'], 'evidence', GT],
  ['There will have a party at school on Friday.', 'There will be a party at school on Friday.', ['There will is a party at school on Friday.', 'There wills be a party at school on Friday.'], 'thereWill', WG],
  ['Shall I to open the window?', 'Shall I open the window?', ['Shall I opening the window?', 'Shall I opens the window?'], 'offer', WG],
], [
  ['I\'ll help you with your homework.', 'offer', WG],
  ['We are going to visit our grandparents at Tết.', 'goingTo', GT],
  ['It probably won\'t rain this afternoon.', 'adverb', WG],
  ['There will be more electric cars in the future.', 'thereWill', WG],
  ['I think Vietnam will win the match.', 'willPredict', WG],
]);

export const UNIT_56_QUESTIONS: Question[] = buildBank(56, [
  ['Mai, did you make this cake ___? It\'s delicious!', 'yourself', ['you', 'yours', 'yourselves'], 'reflexive', RF, 1],
  ['Our grandparents live ___ in the countryside. (alone)', 'by themselves', ['by them', 'by theirs', 'by themself'], 'byMyself', RF, 2],
  ['Lan and Hoa are pen pals. They write to ___ every month. (one writes to the other)', 'each other', ['themselves', 'theirselves', 'them each'], 'eachOther', RF, 2],
  ['Minh burned ___ when he was cooking noodles.', 'himself', ['him', 'hisself', 'his'], 'reflexive', RF, 1],
  ['This notebook isn\'t ___. Mine has a blue cover.', 'mine', ['my', 'me', 'mine\'s'], 'possPronoun', PS, 1],
  ['___ shoes are these? They\'re very muddy.', 'Whose', ['Who\'s', 'Who', 'Whom'], 'whose', PS, 1],
  ['My brother and I tidied the room ___. Mum didn\'t help.', 'ourselves', ['us', 'ours', 'ourself'], 'reflexive', RF, 2],
  ['Ms Thu is a colleague of ___. We work at the same school.', 'mine', ['me', 'my', 'I'], 'ofMine', PS, 2],
  ['This is my ___ new car. (uncle)', 'uncle\'s', ['uncles', 'uncles\'', 'uncle'], 'apostropheS', PO, 1],
  ['The ___ toys are all over the floor. (children)', 'children\'s', ['childrens\'', 'childrens', 'child\'s'], 'apostropheS', PO, 2],
  ['We stayed at my ___ flat in Hanoi. (grandparents)', 'grandparents\'', ['grandparent\'s', 'grandparents\'s', 'grandparents'], 'pluralApostrophe', PO, 2],
  ['Is that your bike or ___? (Nam\'s)', 'his', ['his\'', 'him', 'he'], 'possPronoun', PS, 1],
  ['The cat hurt ___ paw on the fence.', 'its', ['it\'s', 'it', 'itself'], 'its', PS, 1],
  ['Our house is bigger than ___. (the Tran family\'s house)', 'theirs', ['their\'s', 'their', 'them'], 'possPronoun', PS, 2],
  ['Help ___ to some cake, everyone!', 'yourselves', ['yourself', 'you', 'yours'], 'reflexive', RF, 2],
  ['___ the girl with the long hair? — That\'s my cousin.', 'Who\'s', ['Whose', 'Who', 'Whom'], 'whose', PS, 2],
  ['The ___ changing room is next to the gym. (boys)', 'boys\'', ['boy\'s', 'boys', 'boys\'s'], 'pluralApostrophe', PO, 2],
  ['The teacher gave ___ our test results this morning.', 'us', ['we', 'our', 'ours'], 'objectPronoun', PS, 1],
  ['Is this ___ umbrella? (the new teacher)', 'the new teacher\'s', ['the new teachers', 'the new teacher', 'the new teacher his'], 'apostropheS', PO, 3],
  ['Between you and ___, I don\'t like the new uniform.', 'me', ['I', 'my', 'myself'], 'objectPronoun', PS, 3],
], [
  ['The children enjoyed themself at the zoo.', 'The children enjoyed themselves at the zoo.', ['The children enjoyed theirselves at the zoo.', 'The children enjoyed them at the zoo.'], 'reflexive', RF],
  ['Is this pencil your\'s?', 'Is this pencil yours?', ['Is this pencil yours\'?', 'Is this pencil you?'], 'possPronoun', PS],
  ['Who\'s bag is this?', 'Whose bag is this?', ['Who bag is this?', 'Whom bag is this?'], 'whose', PS],
  ['The womens\' football team won the cup.', 'The women\'s football team won the cup.', ['The womens football team won the cup.', 'The women\' football team won the cup.'], 'apostropheS', PO],
  ['The dog is eating it\'s dinner.', 'The dog is eating its dinner.', ['The dog is eating its\' dinner.', 'The dog is eating it dinner.'], 'its', PS],
  ['Mai is a friend of me.', 'Mai is a friend of mine.', ['Mai is a friend of my.', 'Mai is a friend of I.'], 'ofMine', PS],
], [
  ['I taught myself to swim last summer.', 'reflexive', RF],
  ['That isn\'t my bag. Mine is red.', 'possPronoun', PS],
  ['We are staying at my cousins\' house.', 'pluralApostrophe', PO],
  ['Lan and Mai help each other with homework.', 'eachOther', RF],
  ['Whose phone is ringing?', 'whose', PS],
]);

/** Unit 57: meaning and translation checks for every taught work word. */
export const UNIT_57_QUESTIONS: Question[] = buildWordBank(57, 19, WORK_WORDS);
