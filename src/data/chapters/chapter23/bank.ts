import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { PLACE_WORDS } from './content';

const RULES = {
  form: { en: 'Short adjectives add -er (busy → busier, big → bigger); long adjectives use more. Never use both.', vi: 'Tính từ ngắn thêm -er (busy → busier, big → bigger); tính từ dài dùng more. Không dùng cả hai cùng lúc.' },
  irregular: { en: 'Irregular comparatives: good → better, bad → worse, far → further / farther.', vi: 'So sánh hơn bất quy tắc: good → better, bad → worse, far → further / farther.' },
  modifier: { en: 'much, a lot, far + comparative = a big difference; a bit + comparative = a small difference. Not very.', vi: 'much, a lot, far + so sánh hơn = hơn nhiều; a bit + so sánh hơn = hơn một chút. Không dùng very.' },
  less: { en: 'less + adjective + than means "not as … as".', vi: 'less + tính từ + than nghĩa là "không … bằng".' },
  asAs: { en: 'as + adjective + as = the same; not as + adjective + as = less. Use the normal adjective between as … as.', vi: 'as + tính từ + as = bằng; not as + tính từ + as = không bằng. Giữa as … as dùng tính từ nguyên dạng.' },
  double: { en: 'Repeat the comparative for a change that continues: hotter and hotter, more and more crowded.', vi: 'Lặp lại so sánh hơn để nói sự thay đổi ngày càng tăng: hotter and hotter, more and more crowded.' },
  same: { en: 'the same as, different from, similar to compare things without -er.', vi: 'the same as (giống), different from (khác), similar to (tương tự) dùng để so sánh mà không cần -er.' },
  than: { en: 'After a comparative use than. After than you can use an object pronoun (than me) or a subject + verb (than I am).', vi: 'Sau so sánh hơn dùng than. Sau than có thể dùng tân ngữ (than me) hoặc chủ ngữ + động từ (than I am).' },
  superShort: { en: 'Short adjectives: the + adjective + -est (the busiest, the biggest).', vi: 'Tính từ ngắn: the + tính từ + -est (the busiest, the biggest).' },
  superLong: { en: 'Long adjectives: the most / the least + adjective.', vi: 'Tính từ dài: the most / the least + tính từ.' },
  superIrregular: { en: 'Irregular superlatives: good → the best, bad → the worst, far → the furthest.', vi: 'So sánh nhất bất quy tắc: good → the best, bad → the worst, far → the furthest.' },
  inOf: { en: 'After a superlative: in + a place or group (in the world); of + a number or all (of the three, of all).', vi: 'Sau so sánh nhất: in + nơi chốn / nhóm (in the world); of + số lượng hoặc all (of the three, of all).' },
  oneOf: { en: 'one of the + superlative + plural noun.', vi: 'one of the + so sánh nhất + danh từ số nhiều.' },
  ever: { en: 'the + superlative + I have ever + past participle.', vi: 'the + so sánh nhất + I have ever + quá khứ phân từ (… nhất mà tôi từng …).' },
  twoOrMore: { en: 'Compare two things with a comparative; compare three or more with a superlative.', vi: 'So sánh hai vật dùng so sánh hơn; ba vật trở lên dùng so sánh nhất.' },
} as const;
const buildBank = createBankBuilder(RULES, 23);
const CO = 'comparatives', SU = 'superlatives';

export const UNIT_67_QUESTIONS: Question[] = buildBank(67, [
  ['The streets in Hanoi are ___ than the streets in my town. (busy)', 'busier', ['busyer', 'more busier', 'busiest'], 'form', CO, 1],
  ['A flat in the city centre is ___ than a house in the village. (expensive)', 'more expensive', ['expensiver', 'most expensive', 'more expensiver'], 'form', CO, 1],
  ['My new school is ___ from my house than my old one. (far)', 'further', ['farer', 'more far', 'furthest'], 'irregular', CO, 2],
  ['The weather today is ___ than yesterday. It\'s raining even harder. (bad)', 'worse', ['badder', 'more bad', 'worst'], 'irregular', CO, 1],
  ['Da Nang is ___ cleaner than many big cities. (big difference)', 'much', ['very', 'more', 'so'], 'modifier', CO, 2],
  ['My bag is ___ heavier than yours, but only a little. (small difference)', 'a bit', ['very', 'more', 'too'], 'modifier', CO, 2],
  ['The countryside is ___ noisy than the city.', 'less', ['least', 'fewer', 'little'], 'less', CO, 2],
  ['My village isn\'t as ___ as Ho Chi Minh City. (crowded)', 'crowded', ['more crowded', 'crowdeder', 'most crowded'], 'asAs', CO, 1],
  ['Lan is as tall ___ her older sister.', 'as', ['than', 'like', 'so'], 'asAs', CO, 1],
  ['Every year our town gets ___. (big)', 'bigger and bigger', ['more and more big', 'big and big', 'more bigger and bigger'], 'double', CO, 3],
  ['Train tickets are getting ___. (expensive)', 'more and more expensive', ['expensiver and expensiver', 'most and most expensive', 'more expensive and expensive'], 'double', CO, 3],
  ['My phone is the same ___ yours.', 'as', ['than', 'like', 'to'], 'same', CO, 2],
  ['City life is very different ___ village life.', 'from', ['as', 'of', 'with'], 'same', CO, 2],
  ['My brother is older ___ me.', 'than', ['that', 'then', 'as'], 'than', CO, 1],
  ['Hoi An is a lot ___ than it was ten years ago. (popular)', 'more popular', ['popularer', 'most popular', 'more popularer'], 'modifier', CO, 2],
  ['This lane is ___ than the main road. (narrow)', 'narrower', ['narrowwer', 'more narrower', 'narrowest'], 'form', CO, 2],
  ['Minh runs fast, but Nam is ___ than him. (fit)', 'fitter', ['fiter', 'more fitter', 'fittest'], 'form', CO, 2],
  ['The new park is far ___ than the old one. (nice)', 'nicer', ['nicest', 'more nicer', 'niceer'], 'modifier', CO, 3],
  ['Is Hue ___ than Hoi An? (quiet)', 'quieter', ['quietter', 'more quieter', 'quietest'], 'form', CO, 2],
  ['My cousin\'s house is similar ___ ours.', 'to', ['as', 'than', 'from'], 'same', CO, 3],
], [
  ['Hanoi is more bigger than Hue.', 'Hanoi is bigger than Hue.', ['Hanoi is biger than Hue.', 'Hanoi is more big than Hue.'], 'form', CO],
  ['This street is very wider than that one.', 'This street is much wider than that one.', ['This street is very more wide than that one.', 'This street is much more wider than that one.'], 'modifier', CO],
  ['The traffic is badder today than last week.', 'The traffic is worse today than last week.', ['The traffic is more bad today than last week.', 'The traffic is worst today than last week.'], 'irregular', CO],
  ['My town is not as modern than Da Nang.', 'My town is not as modern as Da Nang.', ['My town is not as more modern as Da Nang.', 'My town is not so modern than Da Nang.'], 'asAs', CO],
  ['Your bike is the same like mine.', 'Your bike is the same as mine.', ['Your bike is same as mine.', 'Your bike is the same than mine.'], 'same', CO],
  ['The city is getting more crowded and crowded.', 'The city is getting more and more crowded.', ['The city is getting crowdeder and crowdeder.', 'The city is getting most and most crowded.'], 'double', CO],
], [
  ['Da Lat is much cooler than Ho Chi Minh City.', 'modifier', CO],
  ['The bus is less comfortable than the train.', 'less', CO],
  ['The air is getting cleaner and cleaner.', 'double', CO],
  ['My street is not as noisy as yours.', 'asAs', CO],
  ['Village life is very different from city life.', 'same', CO],
]);

export const UNIT_68_QUESTIONS: Question[] = buildBank(68, [
  ['Monday is the ___ day of the week for me. (busy)', 'busiest', ['busyest', 'most busy', 'busier'], 'superShort', SU, 1],
  ['That is the ___ restaurant in the city. (expensive)', 'most expensive', ['expensivest', 'more expensive', 'most expensivest'], 'superLong', SU, 1],
  ['Who is the ___ student in your class? (good)', 'best', ['goodest', 'better', 'most good'], 'superIrregular', SU, 1],
  ['This is the ___ storm we\'ve had this year. (bad)', 'worst', ['baddest', 'worse', 'most bad'], 'superIrregular', SU, 2],
  ['Ca Mau is the ___ city from Hanoi that we visited. (far)', 'furthest', ['farest', 'further', 'most far'], 'superIrregular', SU, 3],
  ['Fansipan is the highest mountain ___ Vietnam.', 'in', ['than', 'as', 'to'], 'inOf', SU, 2],
  ['Nam is the youngest ___ the three boys.', 'of', ['in', 'than', 'from'], 'inOf', SU, 2],
  ['Hoi An is one of the most beautiful ___ in Vietnam.', 'towns', ['town', 'the town', 'a town'], 'oneOf', SU, 2],
  ['This is the best pho I\'ve ever ___. (eat)', 'eaten', ['ate', 'eat', 'eating'], 'ever', SU, 2],
  ['It was the most exciting match I have ___ seen.', 'ever', ['never', 'yet', 'already'], 'ever', SU, 2],
  ['This is the ___ interesting museum in town. Everyone says it\'s boring!', 'least', ['less', 'fewest', 'little'], 'superLong', SU, 3],
  ['Lan is taller than Mai, but Hoa is the ___ of the three. (tall)', 'tallest', ['taller', 'most tall', 'tallst'], 'twoOrMore', SU, 2],
  ['Of my two cousins, Minh is the ___ one. (old)', 'older', ['most old', 'oldder', 'more older'], 'twoOrMore', SU, 3],
  ['Ha Long Bay is one of the ___ places in the world. (famous)', 'most famous', ['famousest', 'more famous', 'most famousest'], 'oneOf', SU, 2],
  ['The ___ beach in our town is always full of rubbish. (dirty)', 'dirtiest', ['dirtyest', 'most dirty', 'dirtier'], 'superShort', SU, 2],
  ['This is the ___ street in the Old Quarter. (narrow)', 'narrowest', ['narrowwest', 'most narrowest', 'narrower'], 'superShort', SU, 2],
  ['August is the ___ month of the year in Hanoi. (wet)', 'wettest', ['wetest', 'most wet', 'wetter'], 'superShort', SU, 2],
  ['Ben Thanh is one of the ___ markets in Ho Chi Minh City. (old)', 'oldest', ['older', 'most old', 'oldst'], 'oneOf', SU, 2],
  ['She is the most popular singer ___ all.', 'of', ['in', 'than', 'from'], 'inOf', SU, 3],
  ['That was the ___ journey I have ever been on. (long)', 'longest', ['longer', 'most long', 'longgest'], 'ever', SU, 2],
], [
  ['Hanoi is the most big city in the north.', 'Hanoi is the biggest city in the north.', ['Hanoi is the bigest city in the north.', 'Hanoi is the bigger city in the north.'], 'superShort', SU],
  ['This is the beautifulest park in town.', 'This is the most beautiful park in town.', ['This is the most beautifulest park in town.', 'This is the more beautiful park in town.'], 'superLong', SU],
  ['Nam is the youngest in the three boys.', 'Nam is the youngest of the three boys.', ['Nam is the youngest than the three boys.', 'Nam is youngest from the three boys.'], 'inOf', SU],
  ['It is one of the oldest building in Hue.', 'It is one of the oldest buildings in Hue.', ['It is one of the older buildings in Hue.', 'It is one of oldest building in Hue.'], 'oneOf', SU],
  ['This is the worse day of my life!', 'This is the worst day of my life!', ['This is the baddest day of my life!', 'This is the most bad day of my life!'], 'superIrregular', SU],
  ['That is the funniest film I have ever saw.', 'That is the funniest film I have ever seen.', ['That is the funniest film I have ever see.', 'That is the funnier film I have ever seen.'], 'ever', SU],
], [
  ['Monday is the busiest day of the week.', 'superShort', SU],
  ['This is the best book I have ever read.', 'ever', SU],
  ['Hue is one of the most peaceful cities in Vietnam.', 'oneOf', SU],
  ['Minh is the oldest of the four brothers.', 'inOf', SU],
  ['This is the least crowded beach in Nha Trang.', 'superLong', SU],
]);

/** A2 Unit 27: meaning and translation checks for every taught places word. */
export const UNIT_69_QUESTIONS: Question[] = buildWordBank(69, 23, PLACE_WORDS);
