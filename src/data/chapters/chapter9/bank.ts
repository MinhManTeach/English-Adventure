import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { PEOPLE_WORDS } from './content';

const RULES = {
  haveGot: { en: 'I / you / we / they have got; he / she / it has got.', vi: 'I / you / we / they have got; he / she / it has got.' },
  gotNegative: { en: "Negative: haven't got / hasn't got.", vi: "Phủ định: haven't got / hasn't got." },
  gotQuestion: { en: 'Questions: Have / Has + subject + got …? Short answers: Yes, … have / has. No, … haven\'t / hasn\'t.', vi: 'Câu hỏi: Have / Has + chủ ngữ + got …? Trả lời ngắn: Yes, … have / has. No, … haven\'t / hasn\'t.' },
  haveDo: { en: 'have / has without got uses do / does in questions and negatives.', vi: 'have / has không có got dùng do / does trong câu hỏi và câu phủ định.' },
  someAny: { en: 'some in positive sentences; any in negatives and questions.', vi: 'some trong câu khẳng định; any trong câu phủ định và câu hỏi.' },
  whWord: { en: 'Choose the question word that matches the answer: What, Where, When, Who, Why, How, Whose, Which.', vi: 'Chọn từ để hỏi phù hợp với câu trả lời: What, Where, When, Who, Why, How, Whose, Which.' },
  howPlus: { en: 'How + old / many / much / often / long asks about age, number, price, frequency and time.', vi: 'How + old / many / much / often / long hỏi tuổi, số lượng, giá, tần suất và thời gian.' },
  whOrder: { en: 'Wh-word + do / does / did + subject + base verb?', vi: 'Từ để hỏi + do / does / did + chủ ngữ + động từ nguyên mẫu?' },
  subjectQ: { en: 'When Who / What is the subject, don\'t use do / does: Who lives here?', vi: 'Khi Who / What làm chủ ngữ thì không dùng do / does: Who lives here?' },
  tag: { en: 'Positive sentence → negative tag; negative sentence → positive tag. Use the same helping verb and a pronoun.', vi: 'Câu khẳng định → đuôi phủ định; câu phủ định → đuôi khẳng định. Dùng cùng trợ động từ và đại từ.' },
} as const;
const buildBank = createBankBuilder(RULES, 9);
const HG = 'have-got', WH = 'wh-questions', QT = 'question-tags';

export const UNIT_25_QUESTIONS: Question[] = buildBank(25, [
  ['My cousin ___ got a new skateboard.', 'has', ['have', 'is', 'does'], 'haveGot', HG, 1],
  ['We ___ got a lot of homework tonight.', 'have', ['has', 'are', 'do'], 'haveGot', HG, 1],
  ['I ___ got a pen. Can I borrow yours?', "haven't", ["hasn't", "don't", "am not"], 'gotNegative', HG, 1],
  ['___ your grandparents got a garden?', 'Have', ['Has', 'Do', 'Are'], 'gotQuestion', HG, 1],
  ['Has Minh got a dog? Yes, he ___.', 'has', ['have', 'got', 'is'], 'gotQuestion', HG, 2],
  ['Have you got a ruler? No, I ___.', "haven't", ["hasn't", "don't got", "haven't got"], 'gotQuestion', HG, 2],
  ['My little brother ___ a terrible cold.', 'has got', ['have got', 'has get', 'is got'], 'haveGot', HG, 2],
  ['___ your sister have a bike?', 'Does', ['Do', 'Has', 'Is'], 'haveDo', HG, 2],
  ["Our school doesn't ___ a swimming pool.", 'have', ['has', 'have got', 'having'], 'haveDo', HG, 2],
  ['The robot ___ got two arms and a big head.', 'has', ['have', 'is', 'does'], 'haveGot', HG, 1],
  ["They ___ got any money for the bus.", "haven't", ["hasn't", "don't", "aren't"], 'gotNegative', HG, 1],
  ['Have you got ___ brothers or sisters?', 'any', ['some', 'a', 'an'], 'someAny', HG, 2],
  ["I've got ___ stickers. Do you want one?", 'some', ['any', 'a', 'an'], 'someAny', HG, 2],
  ['Has the hotel got a lift? No, it ___.', "hasn't", ["haven't", "doesn't", "isn't"], 'gotQuestion', HG, 2],
  ['Do you have a pet? Yes, I ___.', 'do', ['does', 'am', 'got'], 'haveDo', HG, 2],
  ['What ___ you got in your bag?', 'have', ['has', 'do', 'are'], 'gotQuestion', HG, 2],
  ['Mai ___ long black hair and brown eyes.', 'has got', ['have got', 'is got', 'has get'], 'haveGot', HG, 1],
  ['How many cousins ___ your dad got?', 'has', ['have', 'does', 'is'], 'gotQuestion', HG, 2],
  ["My phone ___ got a camera. It's very old.", "hasn't", ["haven't", "doesn't", "isn't"], 'gotNegative', HG, 2],
  ['We ___ got time. The train leaves in two minutes!', "haven't", ["hasn't", "don't", "aren't"], 'gotNegative', HG, 2],
], [
  ['She have got a cat.', 'She has got a cat.', ['She has get a cat.', 'She is got a cat.'], 'haveGot', HG],
  ["I don't got a bike.", "I haven't got a bike.", ["I hasn't got a bike.", "I haven't get a bike."], 'gotNegative', HG],
  ['Do you got a pencil?', 'Have you got a pencil?', ['Has you got a pencil?', 'Are you got a pencil?'], 'gotQuestion', HG],
  ['Has he got a sister? Yes, he has got.', 'Has he got a sister? Yes, he has.', ['Has he got a sister? Yes, he have.', 'Has he got a sister? Yes, he got.'], 'gotQuestion', HG],
  ['Does Lan has a computer?', 'Does Lan have a computer?', ['Do Lan have a computer?', 'Does Lan got a computer?'], 'haveDo', HG],
  ['We have got any milk?', 'Have we got any milk?', ['Has we got any milk?', 'Have we get any milk?'], 'someAny', HG],
], [
  ['My uncle has got a big red truck.', 'haveGot', HG],
  ["We haven't got a car.", 'gotNegative', HG],
  ['Have you got a pet?', 'gotQuestion', HG],
  ['Does your school have a library?', 'haveDo', HG],
  ['She has got curly hair.', 'haveGot', HG],
]);

export const UNIT_26_QUESTIONS: Question[] = buildBank(26, [
  ['___ is your new teacher? Ms Hoa.', 'Who', ['What', 'Where', 'When'], 'whWord', WH, 1],
  ['___ did you put my keys? On the table.', 'Where', ['Who', 'What', 'Why'], 'whWord', WH, 1],
  ['___ is the school concert? On Friday.', 'When', ['Who', 'Why', 'Whose'], 'whWord', WH, 1],
  ['___ is that umbrella? It\'s my dad\'s.', 'Whose', ['Who', 'Where', 'When'], 'whWord', WH, 2],
  ['How ___ is your grandmother? She\'s seventy.', 'old', ['many', 'much', 'long'], 'howPlus', WH, 1],
  ['How ___ students are in your class? Thirty-five.', 'many', ['much', 'old', 'often'], 'howPlus', WH, 1],
  ['How ___ is this T-shirt? 120,000 dong.', 'much', ['many', 'old', 'long'], 'howPlus', WH, 2],
  ['How ___ do you play badminton? Every Sunday.', 'often', ['much', 'many', 'old'], 'howPlus', WH, 2],
  ['Where ___ your cousins live?', 'do', ['does', 'are', 'is'], 'whOrder', WH, 1],
  ['What time ___ Nam get up?', 'does', ['do', 'is', 'has'], 'whOrder', WH, 1],
  ['What ___ you do last weekend?', 'did', ['do', 'was', 'were'], 'whOrder', WH, 2],
  ['Who ___ next door to you?', 'lives', ['live', 'living', 'do live'], 'subjectQ', WH, 3],
  ['You are from Da Nang, ___?', "aren't you", ['are you', "don't you", "isn't you"], 'tag', QT, 1],
  ["Lan isn't in your class, ___?", 'is she', ["isn't she", 'does she', 'is Lan'], 'tag', QT, 2],
  ['Your brother likes football, ___?', "doesn't he", ["isn't he", "don't he", 'does he'], 'tag', QT, 2],
  ["They don't eat meat, ___?", 'do they', ["don't they", 'are they', 'does they'], 'tag', QT, 2],
  ['The film was great, ___?', "wasn't it", ["didn't it", "isn't it", 'was it'], 'tag', QT, 3],
  ['You went to the museum, ___?', "didn't you", ["don't you", "weren't you", 'did you'], 'tag', QT, 3],
  ['___ bag do you want, the big one or the small one?', 'Which', ['Who', 'Where', 'Why'], 'whWord', WH, 2],
  ['___ are you so happy? Because I won the prize!', 'Why', ['Where', 'Who', 'When'], 'whWord', WH, 1],
], [
  ['Where you live?', 'Where do you live?', ['Where does you live?', 'Where you do live?'], 'whOrder', WH],
  ['What time does the bus leaves?', 'What time does the bus leave?', ['What time do the bus leave?', 'What time the bus leaves?'], 'whOrder', WH],
  ['How much brothers have you got?', 'How many brothers have you got?', ['How many brother have you got?', 'How old brothers have you got?'], 'howPlus', WH],
  ['Who does live in this house?', 'Who lives in this house?', ['Who live in this house?', 'Who do lives in this house?'], 'subjectQ', WH],
  ["She is your aunt, is she?", "She is your aunt, isn't she?", ["She is your aunt, doesn't she?", "She is your aunt, isn't your aunt?"], 'tag', QT],
  ["You like pizza, aren't you?", "You like pizza, don't you?", ["You like pizza, do you?", "You like pizza, doesn't you?"], 'tag', QT],
], [
  ['Where did you go yesterday?', 'whOrder', WH],
  ['How often do you visit your grandparents?', 'howPlus', WH],
  ["It's cold today, isn't it?", 'tag', QT],
  ["You don't like spiders, do you?", 'tag', QT],
  ['Whose pencil case is this?', 'whWord', WH],
]);

/** Unit 27: meaning and translation checks for every taught character and appearance word. */
export const UNIT_27_QUESTIONS: Question[] = buildWordBank(27, 9, PEOPLE_WORDS);
