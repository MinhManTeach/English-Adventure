import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { TECH2_WORDS } from './content';

const RULES = {
  so: { en: 'so + adjective or adverb (so kind, so fast); so much / so many + noun.', vi: 'so + tính từ hoặc trạng từ (so kind, so fast); so much / so many + danh từ.' },
  such: { en: 'such + plural or uncountable noun, often with an adjective (such good friends, such awful weather).', vi: 'such + danh từ số nhiều hoặc không đếm được, thường có tính từ (such good friends, such awful weather).' },
  suchA: { en: 'such a / such an + (adjective) + singular countable noun (such a hot day, such an easy question).', vi: 'such a / such an + (tính từ) + danh từ đếm được số ít (such a hot day, such an easy question).' },
  soThat: { en: 'so + adjective + that / such (a) + adjective + noun + that show a result.', vi: 'so + tính từ + that / such (a) + tính từ + danh từ + that: quá ... đến nỗi mà (chỉ kết quả).' },
  soNeither: { en: 'Agree with So + auxiliary + subject (positive) or Neither + auxiliary + subject (negative). Use the same auxiliary and tense.', vi: 'Đồng ý bằng So + trợ động từ + chủ ngữ (câu khẳng định) hoặc Neither + trợ động từ + chủ ngữ (câu phủ định). Dùng cùng trợ động từ và thì.' },
  tooEither: { en: 'Positive: subject + auxiliary + too. Negative: subject + negative auxiliary + either.', vi: 'Khẳng định: chủ ngữ + trợ động từ + too. Phủ định: chủ ngữ + trợ động từ phủ định + either.' },
  eitherOr: { en: 'either ... or = one of two choices.', vi: 'either ... or = hoặc ... hoặc (một trong hai).' },
  neitherNor: { en: 'neither ... nor / neither of = not one and not the other of two.', vi: 'neither ... nor / neither of = không ... cũng không (cả hai đều không).' },
  posNeg: { en: 'A positive sentence takes a negative tag with the same auxiliary and a pronoun.', vi: 'Câu khẳng định đi với câu hỏi đuôi phủ định, cùng trợ động từ, chủ ngữ là đại từ.' },
  sameAux: { en: 'The tag uses the same auxiliary as the sentence (be, do / does, did ...) with the opposite polarity.', vi: 'Câu hỏi đuôi dùng cùng trợ động từ với câu chính (be, do / does, did ...) nhưng ngược thể khẳng định / phủ định.' },
  pastTag: { en: 'Past simple sentences take did / didn\'t in the tag.', vi: 'Câu ở thì quá khứ đơn dùng did / didn\'t trong câu hỏi đuôi.' },
  perfectTag: { en: 'Present perfect sentences take have / has (haven\'t / hasn\'t) in the tag.', vi: 'Câu ở thì hiện tại hoàn thành dùng have / has (haven\'t / hasn\'t) trong câu hỏi đuôi.' },
  modalTag: { en: 'Modal verbs repeat in the tag: can → can\'t, will → won\'t, should → shouldn\'t.', vi: 'Động từ khuyết thiếu được lặp lại trong câu hỏi đuôi: can → can\'t, will → won\'t, should → shouldn\'t.' },
  iAm: { en: 'I am ... takes the tag aren\'t I.', vi: 'Câu I am ... dùng câu hỏi đuôi aren\'t I.' },
  lets: { en: 'Let\'s ... takes the tag shall we.', vi: 'Câu Let\'s ... dùng câu hỏi đuôi shall we.' },
  imperative: { en: 'An imperative (positive or negative) takes the tag will you.', vi: 'Câu mệnh lệnh (khẳng định hay phủ định) dùng câu hỏi đuôi will you.' },
  thereIs: { en: 'There is / There are ... takes a tag with there: isn\'t there, aren\'t there.', vi: 'There is / There are ... dùng câu hỏi đuôi với there: isn\'t there, aren\'t there.' },
  negWords: { en: 'never, nobody and nothing make the sentence negative, so the tag is positive. Nobody / everyone → they.', vi: 'never, nobody, nothing làm câu mang nghĩa phủ định nên câu hỏi đuôi ở dạng khẳng định. Nobody / everyone → they.' },
  thisThat: { en: 'this / that → it in the tag; these / those → they.', vi: 'this / that → it trong câu hỏi đuôi; these / those → they.' },
} as const;
const buildBank = createBankBuilder(RULES, 26);
const SE = 'so-such-either-neither', QT = 'question-tags';

export const UNIT_76_QUESTIONS: Question[] = buildBank(76, [
  ['The weather was ___ cold that we stayed in bed.', 'so', ['such', 'such a', 'such an'], 'soThat', SE, 1],
  ['Phong Nha is ___ beautiful cave!', 'such a', ['so', 'such', 'such an'], 'suchA', SE, 1],
  ['My grandparents are ___ generous people.', 'such', ['so', 'such a', 'such an'], 'such', SE, 2],
  ['Mai: I love bánh mì. Nam: So ___ I.', 'do', ['am', 'does', 'did'], 'soNeither', SE, 1],
  ['Lan: I can\'t dance. Minh: Neither ___ I.', 'can', ['can\'t', 'do', 'am'], 'soNeither', SE, 2],
  ['Hoa: I didn\'t see the match. Tuan: ___ did I.', 'Neither', ['So', 'Either', 'Too'], 'soNeither', SE, 2],
  ['Nam: I\'m hungry. Mai: I am ___.', 'too', ['either', 'neither', 'both'], 'tooEither', SE, 1],
  ['Linh: I don\'t like horror films. Duc: I don\'t ___.', 'either', ['too', 'neither', 'so'], 'tooEither', SE, 1],
  ['We can go ___ by bus or by train.', 'either', ['neither', 'both', 'so'], 'eitherOr', SE, 2],
  ['___ Lan nor Mai came to the party.', 'Neither', ['Either', 'Both', 'So'], 'neitherNor', SE, 2],
  ['It was ___ a long journey that we slept on the bus.', 'such', ['so', 'such a', 'very'], 'soThat', SE, 3],
  ['The soup was ___ salty that nobody could eat it.', 'so', ['such', 'very', 'too'], 'soThat', SE, 2],
  ['There were ___ many mosquitoes that we went inside.', 'so', ['such', 'such a', 'very'], 'so', SE, 2],
  ['Minh: I\'ve finished my homework. Lan: So ___ I.', 'have', ['was', 'am', 'do'], 'soNeither', SE, 2],
  ['Mai: I was scared. Nam: So ___ I.', 'was', ['did', 'am', 'were'], 'soNeither', SE, 2],
  ['My dad doesn\'t eat meat, and ___ does my mum.', 'neither', ['so', 'either', 'too'], 'soNeither', SE, 3],
  ['Tuan likes K-pop, and ___ does his sister.', 'so', ['neither', 'either', 'too'], 'soNeither', SE, 2],
  ['I\'d like to visit Ha Long Bay. My best friend would ___.', 'too', ['either', 'neither', 'so'], 'tooEither', SE, 2],
  ['You can have ___ the chicken or the fish.', 'either', ['neither', 'both', 'so'], 'eitherOr', SE, 1],
  ['___ of my parents can swim. They are both afraid of water.', 'Neither', ['Either', 'Both', 'So'], 'neitherNor', SE, 3],
], [
  ['It was so hot day.', 'It was such a hot day.', ['It was such hot day.', 'It was so a hot day.'], 'suchA', SE],
  ['They are such kind.', 'They are so kind.', ['They are such a kind.', 'They are such an kind.'], 'so', SE],
  ['Lan: I like mangoes. Nam: Neither do I.', 'Lan: I like mangoes. Nam: So do I.', ['Lan: I like mangoes. Nam: So am I.', 'Lan: I like mangoes. Nam: So does I.'], 'soNeither', SE],
  ['Mai: I don\'t like spiders. Hoa: I don\'t too.', 'Mai: I don\'t like spiders. Hoa: I don\'t either.', ['Mai: I don\'t like spiders. Hoa: I do either.', 'Mai: I don\'t like spiders. Hoa: I don\'t neither.'], 'tooEither', SE],
  ['Neither Nam or Minh was at school.', 'Neither Nam nor Minh was at school.', ['Either Nam nor Minh was at school.', 'Neither Nam and Minh was at school.'], 'neitherNor', SE],
  ['The film was such exciting that we watched it twice.', 'The film was so exciting that we watched it twice.', ['The film was such an exciting that we watched it twice.', 'The film was very exciting that we watched it twice.'], 'soThat', SE],
], [
  ['It was such a beautiful day.', 'suchA', SE],
  ['The test was so hard that nobody finished.', 'soThat', SE],
  ['Lan can swim and so can Minh.', 'soNeither', SE],
  ['I don\'t like coffee either.', 'tooEither', SE],
  ['We can either walk or take a taxi.', 'eitherOr', SE],
]);

export const UNIT_77_QUESTIONS: Question[] = buildBank(77, [
  ['Lan is from Hue, ___?', 'isn\'t she', ['is she', 'doesn\'t she', 'isn\'t Lan'], 'posNeg', QT, 1],
  ['You didn\'t call me, ___?', 'did you', ['didn\'t you', 'do you', 'were you'], 'pastTag', QT, 1],
  ['Minh has been to Sa Pa, ___?', 'hasn\'t he', ['has he', 'didn\'t he', 'isn\'t he'], 'perfectTag', QT, 2],
  ['They will come tomorrow, ___?', 'won\'t they', ['will they', 'don\'t they', 'aren\'t they'], 'modalTag', QT, 2],
  ['I\'m late again, ___?', 'aren\'t I', ['am I', 'amn\'t I', 'don\'t I'], 'iAm', QT, 2],
  ['Let\'s have phở for breakfast, ___?', 'shall we', ['don\'t we', 'will us', 'do we'], 'lets', QT, 2],
  ['Pass me the salt, ___?', 'will you', ['do you', 'don\'t you', 'are you'], 'imperative', QT, 2],
  ['There are 40 students in your class, ___?', 'aren\'t there', ['aren\'t they', 'are there', 'don\'t there'], 'thereIs', QT, 3],
  ['Nobody knows the answer, ___?', 'do they', ['don\'t they', 'does nobody', 'doesn\'t he'], 'negWords', QT, 3],
  ['That was a great film, ___?', 'wasn\'t it', ['wasn\'t that', 'was it', 'didn\'t it'], 'thisThat', QT, 2],
  ['Your parents can speak English, ___?', 'can\'t they', ['can they', 'don\'t they', 'can\'t your parents'], 'modalTag', QT, 2],
  ['Mai wasn\'t at school yesterday, ___?', 'was she', ['wasn\'t she', 'did she', 'is she'], 'sameAux', QT, 2],
  ['You\'re coming to my party, ___?', 'aren\'t you', ['are you', 'don\'t you', 'won\'t you'], 'sameAux', QT, 2],
  ['Nam never does his homework on time, ___?', 'does he', ['doesn\'t he', 'is he', 'never he'], 'negWords', QT, 3],
  ['We should leave now, ___?', 'shouldn\'t we', ['should we', 'don\'t we', 'won\'t we'], 'modalTag', QT, 2],
  ['The children haven\'t eaten yet, ___?', 'have they', ['haven\'t they', 'did they', 'are they'], 'perfectTag', QT, 2],
  ['Your brother plays the guitar, ___?', 'doesn\'t he', ['does he', 'isn\'t he', 'don\'t he'], 'posNeg', QT, 1],
  ['Don\'t forget your helmet, ___?', 'will you', ['won\'t you', 'do you', 'are you'], 'imperative', QT, 3],
  ['You bought a new bike, ___?', 'didn\'t you', ['did you', 'don\'t you', 'weren\'t you'], 'pastTag', QT, 1],
  ['There isn\'t any milk, ___?', 'is there', ['isn\'t there', 'is it', 'does there'], 'thereIs', QT, 2],
], [
  ['Lan likes durian, isn\'t she?', 'Lan likes durian, doesn\'t she?', ['Lan likes durian, does she?', 'Lan likes durian, doesn\'t Lan?'], 'sameAux', QT],
  ['You went to Hue, don\'t you?', 'You went to Hue, didn\'t you?', ['You went to Hue, did you?', 'You went to Hue, weren\'t you?'], 'pastTag', QT],
  ['I\'m right, amn\'t I?', 'I\'m right, aren\'t I?', ['I\'m right, am I?', 'I\'m right, isn\'t I?'], 'iAm', QT],
  ['Let\'s play badminton, don\'t we?', 'Let\'s play badminton, shall we?', ['Let\'s play badminton, do we?', 'Let\'s play badminton, shall us?'], 'lets', QT],
  ['She has finished, didn\'t she?', 'She has finished, hasn\'t she?', ['She has finished, has she?', 'She has finished, isn\'t she?'], 'perfectTag', QT],
  ['Nobody came, didn\'t they?', 'Nobody came, did they?', ['Nobody came, did nobody?', 'Nobody came, does he?'], 'negWords', QT],
], [
  ['You are from Da Nang, aren\'t you?', 'posNeg', QT],
  ['Minh didn\'t come, did he?', 'pastTag', QT],
  ['Let\'s go home, shall we?', 'lets', QT],
  ['Your sister can cook, can\'t she?', 'modalTag', QT],
  ['There is a bank near here, isn\'t there?', 'thereIs', QT],
]);

/** A2 Unit 36: meaning and translation checks for every taught technology word. */
export const UNIT_78_QUESTIONS: Question[] = buildWordBank(78, 26, TECH2_WORDS);
