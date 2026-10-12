import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { CLOTHES_WORDS } from './content';

const RULES = {
  apostrophe: { en: "Add 's to a singular noun or a name to show who owns something: Lan's bag.", vi: "Thêm 's sau danh từ số ít hoặc tên người để chỉ sở hữu: Lan's bag." },
  pluralS: { en: "Plural nouns ending in -s add only ': my parents' room. Other plurals add 's: the children's toys.", vi: "Danh từ số nhiều tận cùng -s chỉ thêm ': my parents' room. Số nhiều khác thêm 's: the children's toys." },
  whose: { en: 'Whose …? asks who something belongs to.', vi: 'Whose …? hỏi vật đó của ai.' },
  object: { en: 'After a verb or a preposition use me, you, him, her, it, us, them.', vi: 'Sau động từ hoặc giới từ dùng me, you, him, her, it, us, them.' },
  adjective: { en: 'my, your, his, her, its, our, their come before a noun.', vi: 'my, your, his, her, its, our, their đứng trước danh từ.' },
  pronoun: { en: 'mine, yours, his, hers, ours, theirs stand alone, with no noun after them.', vi: 'mine, yours, his, hers, ours, theirs đứng một mình, không có danh từ theo sau.' },
  its: { en: "its = belonging to it. it's = it is.", vi: "its = của nó. it's = it is." },
  subject: { en: 'Before a verb, use a subject pronoun: I, you, he, she, it, we, they.', vi: 'Trước động từ dùng đại từ chủ ngữ: I, you, he, she, it, we, they.' },
} as const;
const buildBank = createBankBuilder(RULES, 11);
const PO = 'possessives', PR = 'pronouns';

export const UNIT_31_QUESTIONS: Question[] = buildBank(31, [
  ['This is ___ pencil case. (Nam)', "Nam's", ['Nams', "Nams'", 'Nam'], 'apostrophe', PO, 1],
  ['___ skateboard is this? It\'s Minh\'s.', 'Whose', ['Who', "Who's", 'Whos'], 'whose', PO, 1],
  ['My ___ house is next to the river. (grandparents)', "grandparents'", ["grandparent's", "grandparents's", 'grandparents'], 'pluralS', PO, 2],
  ['The ___ toys are all over the floor. (children)', "children's", ["childrens'", 'childrens', "childs'"], 'pluralS', PO, 2],
  ['Is this your ___ car? (dad)', "dad's", ['dads', "dad'", 'dad'], 'apostrophe', PO, 1],
  ['Whose shoes are these? They\'re ___. (Hoa)', "Hoa's", ['Hoas', "Hoas'", 'Hoa'], 'apostrophe', PO, 1],
  ['The ___ changing room is on the left. (boys)', "boys'", ["boy's's", "boys's", 'boys'], 'pluralS', PO, 3],
  ['My ___ name is Linh. (sister)', "sister's", ['sisters', "sister'", 'sister'], 'apostrophe', PO, 1],
  ['___ is this jacket? Is it yours?', 'Whose', ['Who', "Who's", 'Whos'], 'whose', PO, 2],
  ['The ___ room is very messy. (twins)', "twins'", ["twin's's", "twins's", 'twins'], 'pluralS', PO, 3],
  ['Have you seen the ___ new phone? (teacher)', "teacher's", ['teachers', "teacher'", 'teacher'], 'apostrophe', PO, 2],
  ['___ dog is barking? Is it Tuan\'s?', 'Whose', ['Who', "Who's", 'Whos'], 'whose', PO, 2],
  ['The ___ toilet is upstairs. (women)', "women's", ["womens'", 'womens', "woman's's"], 'pluralS', PO, 3],
  ['This is my ___ favourite song. (mum)', "mum's", ['mums', "mum'", 'mum'], 'apostrophe', PO, 1],
  ['These are my ___ bikes. (brothers)', "brothers'", ["brother's's", "brothers's", 'brothers'], 'pluralS', PO, 3],
  ['Whose bag is this? It\'s ___. (my friend)', "my friend's", ['my friends', "my friend'", 'my friend'], 'apostrophe', PO, 2],
  ['The ___ birthday is in May. (baby)', "baby's", ['babys', "baby'", 'baby'], 'apostrophe', PO, 2],
  ['___ book is on my desk?', 'Whose', ['Who', "Who's", 'Whos'], 'whose', PO, 1],
  ['That is the ___ classroom. (students)', "students'", ["student's's", "students's", 'students'], 'pluralS', PO, 3],
  ['I love my ___ cooking. (grandma)', "grandma's", ['grandmas', "grandma'", 'grandma'], 'apostrophe', PO, 1],
], [
  ['This is Lans bike.', "This is Lan's bike.", ["This is Lans' bike.", "This is Lan bike's."], 'apostrophe', PO],
  ["The childrens' toys are new.", "The children's toys are new.", ["The childrens toys are new.", "The children toys are new."], 'pluralS', PO],
  ["Who's bag is this?", 'Whose bag is this?', ['Who bag is this?', 'Whos bag is this?'], 'whose', PO],
  ["My parents's car is white.", "My parents' car is white.", ["My parent's's car is white.", "My parents car is white."], 'pluralS', PO],
  ['Whose is this phone? It\'s Nam.', "Whose is this phone? It's Nam's.", ["Whose is this phone? It's Nams.", "Whose is this phone? It's Nams'."], 'apostrophe', PO],
  ['The dog of Mai is very small.', "Mai's dog is very small.", ["Mais' dog is very small.", "Mais dog is very small."], 'apostrophe', PO],
], [
  ["This is my brother's room.", 'apostrophe', PO],
  ['Whose umbrella is this?', 'whose', PO],
  ["My parents' car is red.", 'pluralS', PO],
  ["The children's playground is new.", 'pluralS', PO],
  ["It's Lan's birthday today.", 'apostrophe', PO],
]);

export const UNIT_32_QUESTIONS: Question[] = buildBank(32, [
  ['My grandma lives with ___. (we)', 'us', ['we', 'our', 'ours'], 'object', PR, 1],
  ['Where is Nam? I can\'t see ___.', 'him', ['he', 'his', "he's"], 'object', PR, 1],
  ['Mai and I are friends. ___ go to the same school.', 'We', ['Us', 'Our', 'Ours'], 'subject', PR, 1],
  ['This isn\'t my pen. It\'s ___. (you)', 'yours', ['your', "your's", 'you'], 'pronoun', PR, 1],
  ['The children are playing with ___ dog.', 'their', ['them', 'theirs', "they're"], 'adjective', PR, 1],
  ['Lan has lost ___ keys again.', 'her', ['she', 'hers', "she's"], 'adjective', PR, 1],
  ['These books aren\'t ours. They\'re ___. (they)', 'theirs', ['their', 'them', "their's"], 'pronoun', PR, 2],
  ['The cat is drinking ___ milk.', 'its', ["it's", "its'", 'it'], 'its', PR, 2],
  ['Can you give ___ the ball, please? (I)', 'me', ['I', 'my', 'mine'], 'object', PR, 1],
  ['Is this bag ___, Hoa? (she)', 'hers', ['her', 'she', "her's"], 'pronoun', PR, 2],
  ['My brother and ___ love video games. (I)', 'I', ['me', 'my', 'mine'], 'subject', PR, 3],
  ['Our neighbours are nice. We often help ___.', 'them', ['they', 'their', 'theirs'], 'object', PR, 1],
  ['That isn\'t your seat. It\'s ___. (I)', 'mine', ['my', 'me', 'I'], 'pronoun', PR, 1],
  ['We love ___ new teacher.', 'our', ['us', 'ours', 'we'], 'adjective', PR, 1],
  ['___ raining. Take an umbrella.', "It's", ['Its', "Its'", 'It'], 'its', PR, 2],
  ['I called Minh, but ___ didn\'t answer.', 'he', ['him', 'his', "he's"], 'subject', PR, 2],
  ['This house is ___. We built it last year. (we)', 'ours', ['our', 'us', "our's"], 'pronoun', PR, 2],
  ['Do you like ___ new haircut? (I)', 'my', ['me', 'mine', 'I'], 'adjective', PR, 1],
  ['Look at that bird! ___ wings are so colourful.', 'Its', ["It's", "Its'", 'It'], 'its', PR, 3],
  ['Our teacher is very kind. Everyone likes ___.', 'her', ['she', 'hers', "she's"], 'object', PR, 2],
], [
  ['Can you help I?', 'Can you help me?', ['Can you help my?', 'Can you help mine?'], 'object', PR],
  ['This book is my.', 'This book is mine.', ['This book is me.', "This book is mine's."], 'pronoun', PR],
  ["The dog is eating it's food.", 'The dog is eating its food.', ["The dog is eating its' food.", 'The dog is eating it food.'], 'its', PR],
  ['Them are my cousins.', 'They are my cousins.', ['Their are my cousins.', 'Theirs are my cousins.'], 'subject', PR],
  ["Is this pen your's?", 'Is this pen yours?', ['Is this pen your?', "Is this pen you're?"], 'pronoun', PR],
  ['Lan and Mai love theirs teacher.', 'Lan and Mai love their teacher.', ['Lan and Mai love them teacher.', "Lan and Mai love they're teacher."], 'adjective', PR],
], [
  ['Please wait for us at the gate.', 'object', PR],
  ['That bike is his, not mine.', 'pronoun', PR],
  ['They are cleaning their classroom.', 'adjective', PR],
  ['The dog hurt its leg.', 'its', PR],
  ['Is this jacket yours?', 'pronoun', PR],
]);

/** Unit 33: meaning and translation checks for every taught clothes and fashion word. */
export const UNIT_33_QUESTIONS: Question[] = buildWordBank(33, 11, CLOTHES_WORDS);
