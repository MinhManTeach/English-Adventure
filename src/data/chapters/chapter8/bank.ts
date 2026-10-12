import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { SHOP_WORDS } from './content';

const RULES = {
  plural: { en: 'Most nouns add -s; -s, -sh, -ch, -x, -o add -es; consonant + y → -ies; -f/-fe → -ves.', vi: 'Hầu hết thêm -s; tận cùng -s, -sh, -ch, -x, -o thêm -es; phụ âm + y → -ies; -f/-fe → -ves.' },
  irregular: { en: 'Irregular plurals: child → children, man → men, foot → feet, tooth → teeth, mouse → mice.', vi: 'Số nhiều bất quy tắc: child → children, man → men, foot → feet, tooth → teeth, mouse → mice.' },
  countable: { en: 'Countable nouns can be one or many and take a/an in the singular.', vi: 'Danh từ đếm được có số ít, số nhiều; số ít dùng a/an.' },
  uncountable: { en: 'Uncountable nouns (milk, bread, money, information) have no plural and no a/an.', vi: 'Danh từ không đếm được (milk, bread, money, information) không có số nhiều, không dùng a/an.' },
  someAny: { en: 'some in positive sentences; any in negatives and questions.', vi: 'some trong câu khẳng định; any trong câu phủ định và câu hỏi.' },
  muchMany: { en: 'many + countable plural; much + uncountable.', vi: 'many + danh từ đếm được số nhiều; much + danh từ không đếm được.' },
  fewLittle: { en: 'a few + countable plural; a little + uncountable.', vi: 'a few + danh từ đếm được số nhiều; a little + danh từ không đếm được.' },
  lotOf: { en: 'a lot of / lots of work with both kinds of nouns.', vi: 'a lot of / lots of dùng với cả hai loại danh từ.' },
  offer: { en: 'Use some in offers and requests: Would you like some …?', vi: 'Dùng some trong lời mời, lời đề nghị: Would you like some …?' },
} as const;
const buildBank = createBankBuilder(RULES, 8);
const PL = 'plurals', UN = 'uncountable', Q = 'quantifiers';

export const UNIT_22_QUESTIONS: Question[] = buildBank(22, [
  ['There are three ___ in the garden. (child)', 'children', ['childs', 'childrens', 'child'], 'irregular', PL, 1],
  ['I need two ___ for the cake. (knife)', 'knives', ['knifes', 'knifs', 'knive'], 'plural', PL, 2],
  ['The ___ are crying because they are hungry. (baby)', 'babies', ['babys', 'babyes', 'baby'], 'plural', PL, 1],
  ['Brush your ___ twice a day. (tooth)', 'teeth', ['tooths', 'teeths', 'toothes'], 'irregular', PL, 1],
  ['There are five ___ in the sink. (dish)', 'dishes', ['dishs', 'dishies', 'dishe'], 'plural', PL, 1],
  ['We saw two ___ in the kitchen! (mouse)', 'mice', ['mouses', 'mices', 'mousees'], 'irregular', PL, 2],
  ['Can I have ___ water, please?', 'some', ['a', 'an', 'many'], 'uncountable', UN, 1],
  ['I\'d like ___ orange, please.', 'an', ['a', 'some', 'any'], 'countable', UN, 1],
  ['There ___ some bread on the table.', 'is', ['are', 'am', 'be'], 'uncountable', UN, 1],
  ['There ___ two apples in the bowl.', 'are', ['is', 'am', 'be'], 'countable', PL, 1],
  ['My dad gave me some good ___.', 'advice', ['advices', 'an advice', 'a advice'], 'uncountable', UN, 2],
  ['We have a lot of ___ today.', 'homework', ['homeworks', 'a homework', 'an homework'], 'uncountable', UN, 2],
  ['The ___ are waiting at the door. (man)', 'men', ['mans', 'mens', 'man'], 'irregular', PL, 1],
  ['There are many ___ on the bus. (woman)', 'women', ['womans', 'womens', 'woman'], 'irregular', PL, 1],
  ['My ___ hurt after the long walk. (foot)', 'feet', ['foots', 'feets', 'footes'], 'irregular', PL, 2],
  ['The ___ on the trees are turning yellow. (leaf)', 'leaves', ['leafs', 'leafes', 'leave'], 'plural', PL, 2],
  ['Your money ___ on the desk.', 'is', ['are', 'am', 'be'], 'uncountable', UN, 2],
  ['This information ___ very useful.', 'is', ['are', 'am', 'be'], 'uncountable', UN, 2],
  ['There are four ___ in the box. (watch)', 'watches', ['watchs', 'watchies', 'watche'], 'plural', PL, 1],
  ['There are ten ___ on the farm. (sheep)', 'sheep', ['sheeps', 'sheepes', 'sheepies'], 'irregular', PL, 2],
], [
  ['I have two childs.', 'I have two children.', ['I have two childrens.', 'I have two child.'], 'irregular', PL],
  ['Can I have a bread, please?', 'Can I have some bread, please?', ['Can I have an bread, please?', 'Can I have breads, please?'], 'uncountable', UN],
  ['The furnitures in this room are new.', 'The furniture in this room is new.', ['The furniture in this room are new.', 'The furnitures in this room is new.'], 'uncountable', UN],
  ['There are three boxs on the floor.', 'There are three boxes on the floor.', ['There are three boxies on the floor.', 'There is three boxes on the floor.'], 'plural', PL],
  ['I bought some tomatos.', 'I bought some tomatoes.', ['I bought some tomatoies.', 'I bought a tomatoes.'], 'plural', PL],
  ['The news are good.', 'The news is good.', ['The newses are good.', 'The new is good.'], 'uncountable', UN],
], [
  ['There are two buses at the station.', 'plural', PL],
  ['I need some milk for my tea.', 'uncountable', UN],
  ['The children are playing with the puppies.', 'irregular', PL],
  ['Can I have an egg, please?', 'countable', UN],
  ['This money is for the tickets.', 'uncountable', UN],
]);

export const UNIT_23_QUESTIONS: Question[] = buildBank(23, [
  ['How ___ apples do you want?', 'many', ['much', 'lot', 'few'], 'muchMany', Q, 1],
  ['How ___ sugar do you take in your tea?', 'much', ['many', 'lot', 'few'], 'muchMany', Q, 1],
  ['How ___ does this bag cost?', 'much', ['many', 'lot', 'few'], 'muchMany', Q, 2],
  ['There aren\'t ___ eggs in the fridge.', 'any', ['some', 'a', 'much'], 'someAny', Q, 1],
  ['Is there ___ milk left?', 'any', ['a', 'many', 'few'], 'someAny', Q, 1],
  ['I bought ___ bananas at the market.', 'some', ['any', 'a', 'much'], 'someAny', Q, 1],
  ['Would you like ___ juice?', 'some', ['a', 'many', 'few'], 'offer', Q, 2],
  ['We don\'t have ___ time. Hurry up!', 'much', ['many', 'few', 'a'], 'muchMany', Q, 2],
  ['There were ___ people at the concert. It was full!', 'a lot of', ['much', 'a little', 'a lot'], 'lotOf', Q, 1],
  ['Can I have ___ salt, please? Just a bit.', 'a little', ['a few', 'many', 'a lot'], 'fewLittle', Q, 2],
  ['I have ___ friends in Da Nang. Three or four.', 'a few', ['a little', 'much', 'a lot'], 'fewLittle', Q, 2],
  ['She drinks ___ water every day.', 'a lot of', ['many', 'a few', 'a lot'], 'lotOf', Q, 2],
  ['There isn\'t ___ cheese in the sandwich.', 'much', ['many', 'a few', 'any of'], 'muchMany', Q, 2],
  ['Are there ___ biscuits in the jar?', 'any', ['a', 'much', 'little'], 'someAny', Q, 1],
  ['I\'ve got ___ homework tonight. Only one exercise.', 'a little', ['a few', 'many', 'a lot'], 'fewLittle', Q, 3],
  ['How many ___ are there in your class?', 'students', ['student', 'studentes', 'a student'], 'muchMany', Q, 1],
  ['How much ___ do you need?', 'money', ['moneys', 'a money', 'moneyes'], 'muchMany', Q, 2],
  ['There are ___ tourists in Hoi An in summer.', 'lots of', ['much', 'a little', 'lot'], 'lotOf', Q, 2],
  ['We need ___ potatoes for the soup. Not many.', 'a few', ['a little', 'much', 'any'], 'fewLittle', Q, 2],
  ['There aren\'t ___ chairs. Some people are standing.', 'many', ['much', 'a little', 'little'], 'muchMany', Q, 2],
], [
  ['How much books have you got?', 'How many books have you got?', ['How many book have you got?', 'How lot books have you got?'], 'muchMany', Q],
  ['There aren\'t some oranges.', 'There aren\'t any oranges.', ['There isn\'t any oranges.', 'There aren\'t a oranges.'], 'someAny', Q],
  ['I have a few money.', 'I have a little money.', ['I have a few moneys.', 'I have a little moneys.'], 'fewLittle', Q],
  ['There is a lot milk in the fridge.', 'There is a lot of milk in the fridge.', ['There are a lot of milk in the fridge.', 'There is a lots of milk in the fridge.'], 'lotOf', Q],
  ['How many water do you drink?', 'How much water do you drink?', ['How much waters do you drink?', 'How many waters do you drink?'], 'muchMany', Q],
  ['We need a little eggs.', 'We need a few eggs.', ['We need a few egg.', 'We need a little egg.'], 'fewLittle', Q],
], [
  ['How many people are in your family?', 'muchMany', Q],
  ['There is a little rice in the pot.', 'fewLittle', Q],
  ["We haven't got any bread.", 'someAny', Q],
  ['Would you like some cake?', 'offer', Q],
  ['She has a lot of friends.', 'lotOf', Q],
]);

/** Unit 24: meaning and translation checks for every taught food and shopping word. */
export const UNIT_24_QUESTIONS: Question[] = buildWordBank(24, 8, SHOP_WORDS);
