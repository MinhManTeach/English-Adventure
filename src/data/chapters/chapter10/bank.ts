import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { NATURE_WORDS } from './content';

const RULES = {
  aAn: { en: 'a before a consonant sound, an before a vowel sound: a uniform, an hour.', vi: 'a trước phụ âm, an trước nguyên âm (theo cách đọc): a uniform, an hour.' },
  secondMention: { en: 'First mention: a / an. Second mention: the.', vi: 'Nhắc lần đầu: a / an. Nhắc lại: the.' },
  unique: { en: 'Use the for things there is only one of: the sun, the world, the internet.', vi: 'Dùng the cho vật duy nhất: the sun, the world, the internet.' },
  instrument: { en: 'Use the with musical instruments: play the guitar.', vi: 'Dùng the với nhạc cụ: play the guitar.' },
  zero: { en: 'No article with sports, school subjects, languages, meals and by + transport.', vi: 'Không dùng mạo từ với môn thể thao, môn học, ngôn ngữ, bữa ăn và by + phương tiện.' },
  ordinal: { en: 'Ordinal numbers show order and dates: first, second, third, fourth, twelfth, twentieth.', vi: 'Số thứ tự chỉ thứ tự và ngày tháng: first, second, third, fourth, twelfth, twentieth.' },
  spelling: { en: 'Watch the spelling: forty (not fourty), fourteen, ninety, twelfth.', vi: 'Chú ý chính tả: forty (không phải fourty), fourteen, ninety, twelfth.' },
  hundred: { en: 'After a number, hundred / thousand / million have no -s: two hundred people.', vi: 'Sau một con số, hundred / thousand / million không thêm -s: two hundred people.' },
  and: { en: 'In British English we say and after hundred: one hundred and five.', vi: 'Trong tiếng Anh Anh, nói and sau hundred: one hundred and five.' },
} as const;
const buildBank = createBankBuilder(RULES, 10);
const AR = 'articles', NU = 'numbers';

export const UNIT_28_QUESTIONS: Question[] = buildBank(28, [
  ['My brother wants to be ___ astronaut.', 'an', ['a', 'any', 'much'], 'aAn', AR, 1],
  ['We waited for ___ hour.', 'an', ['a', 'any', 'much'], 'aAn', AR, 2],
  ['She goes to ___ university in Hue.', 'a', ['an', 'any', 'much'], 'aAn', AR, 2],
  ['I bought a pen and a ruler. ___ pen is blue.', 'The', ['A', 'An', 'Some'], 'secondMention', AR, 1],
  ['___ moon goes round the Earth.', 'The', ['A', 'An', 'One'], 'unique', AR, 1],
  ['Hoa plays ___ piano very well.', 'the', ['a', 'an', 'one'], 'instrument', AR, 2],
  ['Do you play ___ after school?', 'volleyball', ['the volleyball', 'a volleyball', 'an volleyball'], 'zero', AR, 2],
  ['We have ___ on Tuesday.', 'English', ['the English', 'a English', 'an English'], 'zero', AR, 2],
  ['I usually go to school by ___.', 'bike', ['the bike', 'a bike', 'an bike'], 'zero', AR, 2],
  ['My aunt is ___ nurse in a big hospital.', 'a', ['an', 'any', 'much'], 'aAn', AR, 1],
  ['Is there ___ bank near here?', 'a', ['an', 'any', 'much'], 'aAn', AR, 1],
  ['I saw a tiger and a lion. ___ tiger was sleeping.', 'The', ['A', 'An', 'Some'], 'secondMention', AR, 1],
  ['There are a lot of stars in ___ sky tonight.', 'the', ['a', 'an', 'one'], 'unique', AR, 1],
  ['My cousin plays ___ guitar in a band.', 'the', ['a', 'an', 'one'], 'instrument', AR, 2],
  ['Let\'s go to the zoo by ___.', 'taxi', ['the taxi', 'a taxi', 'an taxi'], 'zero', AR, 2],
  ['It\'s ___ interesting book.', 'an', ['a', 'any', 'much'], 'aAn', AR, 1],
  ['Lan is ___ only girl in the chess club.', 'the', ['a', 'an', 'one'], 'unique', AR, 3],
  ['My best friend speaks ___ and Korean.', 'Vietnamese', ['the Vietnamese', 'a Vietnamese', 'an Vietnamese'], 'zero', AR, 3],
  ['We had a party. ___ party was great!', 'The', ['A', 'An', 'Some'], 'secondMention', AR, 1],
  ['Paris is ___ capital of France.', 'the', ['a', 'an', 'one'], 'unique', AR, 2],
], [
  ['I have an uniform for school.', 'I have a uniform for school.', ['I have the uniforms for school.', 'I have one uniforms for school.'], 'aAn', AR],
  ['We waited for a hour.', 'We waited for an hour.', ['We waited for an hours.', 'We waited for hour.'], 'aAn', AR],
  ['The sun is a star. A sun is very hot.', 'The sun is a star. The sun is very hot.', ['The sun is a star. An sun is very hot.', 'The sun is a star. Sun is very hot.'], 'unique', AR],
  ['She plays the tennis every day.', 'She plays tennis every day.', ['She plays a tennis every day.', 'She plays an tennis every day.'], 'zero', AR],
  ['My dad goes to work by the car.', 'My dad goes to work by car.', ['My dad goes to work by a car.', 'My dad goes to work by an car.'], 'zero', AR],
  ['He plays violin in the school band.', 'He plays the violin in the school band.', ['He plays a violin in the school band.', 'He plays an violin in the school band.'], 'instrument', AR],
], [
  ['My mum is an engineer.', 'aAn', AR],
  ['I saw a dog. The dog was very big.', 'secondMention', AR],
  ['The Earth goes round the Sun.', 'unique', AR],
  ['We play football after school.', 'zero', AR],
  ['My sister plays the drums.', 'instrument', AR],
]);

export const UNIT_29_QUESTIONS: Question[] = buildBank(29, [
  ['Christmas Day is on the ___ of December. (25)', 'twenty-fifth', ['twenty-five', 'twenty-fiveth', 'twentieth-five'], 'ordinal', NU, 1],
  ['There are ___ days in April. (30)', 'thirty', ['thirteen', 'threety', 'thirtieth'], 'spelling', NU, 1],
  ['Our classroom is on the ___ floor. (2)', 'second', ['two', 'twoth', 'secondth'], 'ordinal', NU, 1],
  ['My grandpa is ___ years old. (90)', 'ninety', ['ninty', 'nineteen', 'ninetieth'], 'spelling', NU, 2],
  ['About two ___ people live in our town. (200,000)', 'hundred thousand', ['hundreds thousands', 'hundred thousands', 'hundreds of thousand'], 'hundred', NU, 3],
  ['December is the ___ month of the year. (12)', 'twelfth', ['twelveth', 'twelve', 'twelfth-th'], 'ordinal', NU, 2],
  ['There are ___ students in my class. (40)', 'forty', ['fourty', 'fourteen', 'fortieth'], 'spelling', NU, 1],
  ['Nam finished ___ in the race. He won! (1)', 'first', ['one', 'oneth', 'firsth'], 'ordinal', NU, 1],
  ['This bike costs three ___ dong. (3,000,000)', 'million', ['millions', 'millions of', 'million of'], 'hundred', NU, 2],
  ['Children\'s Day is on the ___ of June. (1)', 'first', ['one', 'oneth', 'firsth'], 'ordinal', NU, 1],
  ['Teachers\' Day in Vietnam is on the ___ of November. (20)', 'twentieth', ['twenty', 'twentyth', 'twentieth-th'], 'ordinal', NU, 2],
  ['A football team has ___ players. (11)', 'eleven', ['elevan', 'eleventh', 'elefen'], 'spelling', NU, 1],
  ['There were ___ of people at the festival.', 'thousands', ['thousand', 'thousands of', 'thousand of'], 'hundred', NU, 3],
  ['My sister is in the ___ grade. (8)', 'eighth', ['eightth', 'eight', 'eighteenth'], 'ordinal', NU, 2],
  ['Our school has five ___ students. (500)', 'hundred', ['hundreds', 'hundreds of', 'hundred of'], 'hundred', NU, 1],
  ['There are ___ minutes in an hour. (60)', 'sixty', ['sixthy', 'sixteen', 'sixtieth'], 'spelling', NU, 1],
  ['The ___ letter of the alphabet is C. (3)', 'third', ['three', 'threeth', 'thirth'], 'ordinal', NU, 1],
  ['One hundred ___ five people came to the party. (105)', 'and', ['or', 'with', 'of'], 'and', NU, 3],
  ['Today is my parents\' ___ wedding anniversary. (15)', 'fifteenth', ['fiveteenth', 'fifteen', 'fiftieth'], 'ordinal', NU, 2],
  ['There are ___ people on the bus. (19)', 'nineteen', ['nineten', 'ninety', 'nineteenth'], 'spelling', NU, 2],
], [
  ['My birthday is on the twenty-two of May.', 'My birthday is on the twenty-second of May.', ['My birthday is on the twenty-twoth of May.', 'My birthday is on the twentieth-two of May.'], 'ordinal', NU],
  ['There are fourty chairs in the hall.', 'There are forty chairs in the hall.', ['There are fortieth chairs in the hall.', 'There are fourtys chairs in the hall.'], 'spelling', NU],
  ['Three hundreds people came to the concert.', 'Three hundred people came to the concert.', ['Three hundreds of people came to the concert.', 'Three hundred of people came to the concert.'], 'hundred', NU],
  ['We live on the fiveth floor.', 'We live on the fifth floor.', ['We live on the five floor.', 'We live on the fifeth floor.'], 'ordinal', NU],
  ['Two thousands fans watched the match.', 'Two thousand fans watched the match.', ['Two thousands of fans watched the match.', 'Two thousand of fans watched the match.'], 'hundred', NU],
  ['This is my nineth time in Ha Long.', 'This is my ninth time in Ha Long.', ['This is my nine time in Ha Long.', 'This is my ninety time in Ha Long.'], 'ordinal', NU],
], [
  ['My birthday is on the third of March.', 'ordinal', NU],
  ['There are forty students in my class.', 'spelling', NU],
  ['Five hundred people live in the village.', 'hundred', NU],
  ['We live on the twelfth floor.', 'ordinal', NU],
  ['Thousands of birds fly here every winter.', 'hundred', NU],
]);

/** Unit 30: meaning and translation checks for every taught weather, nature and ecology word. */
export const UNIT_30_QUESTIONS: Question[] = buildWordBank(30, 10, NATURE_WORDS);
