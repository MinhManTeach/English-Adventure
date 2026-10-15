import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { FASHION_WORDS } from './content';

const RULES = {
  noPlural: { en: 'Uncountable nouns such as advice, information, news, homework, furniture and luggage have no plural and no a / an.', vi: 'Danh từ không đếm được như advice, information, news, homework, furniture, luggage không có số nhiều và không đi với a / an.' },
  singular: { en: 'Uncountable nouns take a singular verb: The news is good.', vi: 'Danh từ không đếm được đi với động từ số ít: The news is good.' },
  partitive: { en: 'Count uncountable nouns with a piece of, a slice of, a bowl of, a glass of, a carton of.', vi: 'Đếm danh từ không đếm được bằng a piece of, a slice of, a bowl of, a glass of, a carton of.' },
  pluralOnly: { en: 'jeans, trousers, glasses, scissors and clothes are always plural: use are, and a pair of to count them.', vi: 'jeans, trousers, glasses, scissors, clothes luôn ở dạng số nhiều: dùng are, và dùng a pair of để đếm.' },
  irregular: { en: 'Irregular plurals: person – people, tooth – teeth, foot – feet, mouse – mice, woman – women; fish stays the same.', vi: 'Số nhiều bất quy tắc: person – people, tooth – teeth, foot – feet, mouse – mice, woman – women; fish giữ nguyên.' },
  jobWork: { en: 'job is countable (a job, two jobs); work is uncountable (no a, no -s).', vi: 'job là danh từ đếm được (a job, two jobs); work là danh từ không đếm được (không có a, không thêm -s).' },
  manyMuch: { en: 'many + plural countable nouns; much + uncountable nouns, mostly in negatives and questions. lots of / a lot of work with both.', vi: 'many + danh từ đếm được số nhiều; much + danh từ không đếm được, chủ yếu trong câu phủ định và câu hỏi. lots of / a lot of dùng với cả hai.' },
  too: { en: 'too many + plural countable nouns, too much + uncountable nouns = more than we want.', vi: 'too many + danh từ đếm được số nhiều, too much + danh từ không đếm được = quá nhiều, nhiều hơn mong muốn.' },
  enough: { en: 'enough goes before a noun (enough chairs) but after an adjective (old enough).', vi: 'enough đứng trước danh từ (enough chairs) nhưng đứng sau tính từ (old enough).' },
  few: { en: 'a few / a little = some (positive). few / little = almost none (negative). few + countable, little + uncountable.', vi: 'a few / a little = một vài, một chút (tích cực). few / little = rất ít, gần như không có (tiêu cực). few + đếm được, little + không đếm được.' },
  none: { en: 'no + noun after a positive verb; any after a negative verb or in questions; none stands alone.', vi: 'no + danh từ sau động từ khẳng định; any sau động từ phủ định hoặc trong câu hỏi; none đứng một mình.' },
} as const;
const buildBank = createBankBuilder(RULES, 22);
const CU = 'countable-uncountable', QU = 'quantifiers';

export const UNIT_64_QUESTIONS: Question[] = buildBank(64, [
  ['Can you give me some ___ about my essay?', 'advice', ['advices', 'an advice', 'advise'], 'noPlural', CU, 1],
  ['I need ___ about the bus times to Hue.', 'some information', ['an information', 'informations', 'a few information'], 'noPlural', CU, 2],
  ['The news ___ really exciting today!', 'is', ['are', 'were', 'have'], 'singular', CU, 2],
  ['Our new furniture ___ from a shop in Hanoi.', 'comes', ['come', 'are coming', 'have come'], 'singular', CU, 3],
  ['How many ___ live in your village?', 'people', ['peoples', 'person', 'a people'], 'irregular', CU, 1],
  ['The dentist checked all my ___.', 'teeth', ['tooths', 'teeths', 'tooth'], 'irregular', CU, 1],
  ['There are a lot of ___ in the pond.', 'fish', ['fishs', 'a fish', 'fishies'], 'irregular', CU, 2],
  ['My jeans ___ too long. I need to cut them.', 'are', ['is', 'was', 'has'], 'pluralOnly', CU, 2],
  ['I bought ___ new trousers for school.', 'a pair of', ['a', 'a piece of', 'an'], 'pluralOnly', CU, 2],
  ["Grandpa can't see the board without his ___.", 'glasses', ['glass', 'a glass', 'glasss'], 'pluralOnly', CU, 2],
  ['Would you like ___ of cake?', 'a slice', ['a slices', 'slice', 'one slices'], 'partitive', CU, 2],
  ['Mum bought two ___ of milk at the supermarket.', 'cartons', ['carton', 'pieces', 'slices'], 'partitive', CU, 2],
  ['Nam ate two ___ of rice.', 'bowls', ['bowl', 'slices', 'pieces'], 'partitive', CU, 2],
  ['Let me give you ___ advice: always back up your work.', 'a piece of', ['an', 'a few', 'many'], 'partitive', CU, 3],
  ['There ___ a lot of traffic in the city centre this morning.', 'was', ['were', 'are', 'have'], 'singular', CU, 2],
  ['Your hair ___ lovely today!', 'looks', ['look', 'are looking', 'have looked'], 'singular', CU, 3],
  ["I'm looking for ___ in a restaurant this summer.", 'a job', ['a work', 'job', 'works'], 'jobWork', CU, 3],
  ['My dad goes to ___ by motorbike.', 'work', ['a work', 'the job', 'works'], 'jobWork', CU, 2],
  ['How much ___ do you have? Only one small suitcase.', 'luggage', ['luggages', 'a luggage', 'baggages'], 'noPlural', CU, 2],
  ['The weather ___ terrible yesterday, so we stayed at home.', 'was', ['were', 'are', 'is'], 'singular', CU, 1],
  ['Those ___ over there are helping the old man.', 'women', ['womans', 'womens', 'woman'], 'irregular', CU, 2],
  ['Can I borrow your ___? I need to cut this paper.', 'scissors', ['scissor', 'a scissors', 'scissores'], 'pluralOnly', CU, 2],
], [
  ['Lan gave me a good advice.', 'Lan gave me some good advice.', ['Lan gave me good advices.', 'Lan gave me a good advices.'], 'noPlural', CU],
  ["The news are on at seven o'clock.", "The news is on at seven o'clock.", ["The newses are on at seven o'clock.", "The new is on at seven o'clock."], 'singular', CU],
  ['We bought three furnitures for the bedroom.', 'We bought three pieces of furniture for the bedroom.', ['We bought three piece of furnitures for the bedroom.', 'We bought three furniture for the bedroom.'], 'partitive', CU],
  ['My trousers is too short.', 'My trousers are too short.', ['My trouser are too short.', 'My trousers was too short.'], 'pluralOnly', CU],
  ['Two mouses live in our kitchen.', 'Two mice live in our kitchen.', ['Two mices live in our kitchen.', 'Two mouse lives in our kitchen.'], 'irregular', CU],
  ['I have a lot of homeworks today.', 'I have a lot of homework today.', ['I have many homework today.', 'I have a homeworks today.'], 'noPlural', CU],
], [
  ['Can I have a glass of water?', 'partitive', CU],
  ['This information is very useful.', 'singular', CU],
  ['My new jeans are too tight.', 'pluralOnly', CU],
  ['She gave me a piece of advice.', 'partitive', CU],
  ['The children brushed their teeth.', 'irregular', CU],
]);

export const UNIT_65_QUESTIONS: Question[] = buildBank(65, [
  ['There are too ___ cars in the city centre.', 'many', ['much', 'lot', 'a lot'], 'too', QU, 1],
  ['I put too ___ salt in the soup. It tastes terrible!', 'much', ['many', 'lot', 'few'], 'too', QU, 1],
  ["We don't have ___ chairs for all the guests.", 'enough', ['too', 'much', 'a lot'], 'enough', QU, 2],
  ["Minh isn't ___ to drive a car. He's only fourteen.", 'old enough', ['enough old', 'old too', 'enough of old'], 'enough', QU, 2],
  ['Hurry up! We have very ___ time.', 'little', ['few', 'many', 'a few'], 'few', QU, 2],
  ["I have ___ good friends at my new school, so I'm happy.", 'a few', ['a little', 'little', 'much'], 'few', QU, 2],
  ['Can I have ___ milk in my tea, please?', 'a little', ['a few', 'few', 'many'], 'few', QU, 2],
  ['Very ___ people came to the meeting because of the storm.', 'few', ['little', 'much', 'a little'], 'few', QU, 3],
  ["There's ___ bread left. Can you buy some?", 'no', ['any', 'none', 'not'], 'none', QU, 2],
  ['Are there ___ eggs in the fridge?', 'any', ['none', 'much', 'a'], 'none', QU, 1],
  ['How ___ money did you spend on your new shoes?', 'much', ['many', 'lot', 'few'], 'manyMuch', QU, 1],
  ['How ___ brothers and sisters have you got?', 'many', ['much', 'lot', 'little'], 'manyMuch', QU, 1],
  ["There isn't ___ milk in the fridge. Let's buy some.", 'much', ['many', 'few', 'a few'], 'manyMuch', QU, 2],
  ["I can't buy that bag. I haven't got ___ money.", 'enough', ['too', 'many', 'few'], 'enough', QU, 2],
  ["This soup is too hot. It isn't cool ___ to eat yet.", 'enough', ['too', 'many', 'much'], 'enough', QU, 3],
  ["I'm tired. I have too ___ homework this week.", 'much', ['many', 'lot', 'few'], 'too', QU, 2],
  ['There were ___ of people at the Tết flower market.', 'lots', ['much', 'many', 'few'], 'manyMuch', QU, 2],
  ['"How many pens have you got?" "___. I lost them all."', 'None', ['No', 'Any', 'Not'], 'none', QU, 3],
  ['There are too ___ students in this class. We need another room.', 'many', ['much', 'little', 'lot'], 'too', QU, 2],
  ["Is there ___ juice in the bottle? I'm thirsty.", 'any', ['many', 'none', 'a few'], 'none', QU, 2],
  ["Lan speaks ___ English, but she's learning more every day.", 'a little', ['a few', 'few', 'many'], 'few', QU, 3],
], [
  ['There are too much people here.', 'There are too many people here.', ['There is too many people here.', 'There are too lot people here.'], 'too', QU],
  ["He isn't enough tall to play basketball.", "He isn't tall enough to play basketball.", ["He isn't enough tall for play basketball.", "He isn't tall too to play basketball."], 'enough', QU],
  ['I have a few money left.', 'I have a little money left.', ['I have a few moneys left.', 'I have few money left.'], 'few', QU],
  ["There isn't no milk in the fridge.", "There isn't any milk in the fridge.", ["There isn't none milk in the fridge.", "There aren't no milk in the fridge."], 'none', QU],
  ['How much books did you read last summer?', 'How many books did you read last summer?', ['How many book did you read last summer?', 'How much book did you read last summer?'], 'manyMuch', QU],
  ['Very little students passed the test.', 'Very few students passed the test.', ['Very a few students passed the test.', 'Very little student passed the test.'], 'few', QU],
], [
  ['There are too many cars on this road.', 'too', QU],
  ["We don't have enough time.", 'enough', QU],
  ['I need a little sugar in my coffee.', 'few', QU],
  ['There is no milk in the fridge.', 'none', QU],
  ['How much money do you need?', 'manyMuch', QU],
]);

/** Unit 66: meaning and translation checks for every taught fashion word. */
export const UNIT_66_QUESTIONS: Question[] = buildWordBank(66, 22, FASHION_WORDS);
