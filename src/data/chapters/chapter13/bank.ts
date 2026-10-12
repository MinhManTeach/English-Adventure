import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { FAME_WORDS } from './content';

const RULES = {
  short: { en: 'Short adjectives add -er: tall → taller, nice → nicer, big → bigger, easy → easier.', vi: 'Tính từ ngắn thêm -er: tall → taller, nice → nicer, big → bigger, easy → easier.' },
  long: { en: 'Long adjectives use more: more expensive, more interesting.', vi: 'Tính từ dài dùng more: more expensive, more interesting.' },
  irregular: { en: 'Irregular: good → better → the best; bad → worse → the worst; far → further → the furthest.', vi: 'Bất quy tắc: good → better → the best; bad → worse → the worst; far → further → the furthest.' },
  than: { en: 'Use than after a comparative.', vi: 'Sau so sánh hơn dùng than.' },
  asAs: { en: '(not) as + adjective + as: the same / less.', vi: '(not) as + tính từ + as: bằng / không bằng.' },
  superShort: { en: 'Short adjectives: the + adjective + -est: the tallest, the biggest, the funniest.', vi: 'Tính từ ngắn: the + tính từ + -est: the tallest, the biggest, the funniest.' },
  superLong: { en: 'Long adjectives: the most + adjective: the most beautiful.', vi: 'Tính từ dài: the most + tính từ: the most beautiful.' },
  inOf: { en: 'After a superlative use in + a place or group: the best in the class.', vi: 'Sau so sánh nhất dùng in + nơi chốn / nhóm: the best in the class.' },
  ever: { en: 'the + superlative + I have ever …: the best film I have ever seen.', vi: 'the + so sánh nhất + I have ever …: bộ phim hay nhất tôi từng xem.' },
} as const;
const buildBank = createBankBuilder(RULES, 13);
const CO = 'comparatives', SU = 'superlatives';

export const UNIT_37_QUESTIONS: Question[] = buildBank(37, [
  ['A giraffe is ___ than a zebra. (tall)', 'taller', ['more tall', 'taler', 'the tallest'], 'short', CO, 1],
  ['My new phone is ___ than my old one. (good)', 'better', ['gooder', 'more good', 'best'], 'irregular', CO, 1],
  ['This test is ___ than the last one. (easy)', 'easier', ['easyer', 'more easy', 'easiest'], 'short', CO, 1],
  ['A plane ticket is ___ than a bus ticket. (expensive)', 'more expensive', ['expensiver', 'most expensive', 'more expensiver'], 'long', CO, 1],
  ['Today is ___ than yesterday. (hot)', 'hotter', ['hoter', 'more hot', 'hottest'], 'short', CO, 2],
  ['My cold is ___ today than yesterday. (bad)', 'worse', ['badder', 'more bad', 'worst'], 'irregular', CO, 2],
  ['Mai is taller ___ her sister.', 'than', ['that', 'then', 'as'], 'than', CO, 1],
  ['Lan is as tall ___ her mum.', 'as', ['than', 'like', 'that'], 'asAs', CO, 1],
  ['This book isn\'t as ___ as the film. (interesting)', 'interesting', ['more interesting', 'interestinger', 'most interesting'], 'asAs', CO, 2],
  ['A horse is ___ than a dog. (big)', 'bigger', ['biger', 'more big', 'biggest'], 'short', CO, 1],
  ['My bag is ___ than yours. (heavy)', 'heavier', ['heavyer', 'more heavy', 'heaviest'], 'short', CO, 2],
  ['Cats are ___ than goldfish. (intelligent)', 'more intelligent', ['intelligenter', 'most intelligent', 'more intelligenter'], 'long', CO, 2],
  ['Is Hanoi ___ than Da Nang? (big)', 'bigger', ['biger', 'more big', 'biggest'], 'short', CO, 2],
  ['My sister is ___ than me. (young)', 'younger', ['youngger', 'more young', 'youngest'], 'short', CO, 1],
  ['Football is ___ than golf in Vietnam. (popular)', 'more popular', ['popularer', 'most popular', 'more popularer'], 'long', CO, 2],
  ['The second film was ___ than the first. (funny)', 'funnier', ['funnyer', 'more funny', 'funniest'], 'short', CO, 2],
  ['My brother isn\'t as ___ as my dad. (strong)', 'strong', ['stronger', 'strongest', 'more strong'], 'asAs', CO, 2],
  ['This road is ___ than that one. (dangerous)', 'more dangerous', ['dangerouser', 'most dangerous', 'more dangerouser'], 'long', CO, 2],
  ['A snail is much ___ than a rabbit. (slow)', 'slower', ['slowwer', 'more slow', 'slowest'], 'short', CO, 3],
  ['Your house is ___ from school than mine. (far)', 'further', ['farer', 'more far', 'furthest'], 'irregular', CO, 3],
], [
  ['My dad is more tall than me.', 'My dad is taller than me.', ['My dad is taller that me.', 'My dad is tallest than me.'], 'short', CO],
  ['This book is interestinger than that one.', 'This book is more interesting than that one.', ['This book is more interestinger than that one.', 'This book is most interesting than that one.'], 'long', CO],
  ['Your English is gooder than mine.', 'Your English is better than mine.', ['Your English is more good than mine.', 'Your English is best than mine.'], 'irregular', CO],
  ['A cat is smaller then a dog.', 'A cat is smaller than a dog.', ['A cat is smaller that a dog.', 'A cat is more small than a dog.'], 'than', CO],
  ['Nam is as taller as Minh.', 'Nam is as tall as Minh.', ['Nam is as tall than Minh.', 'Nam is so taller as Minh.'], 'asAs', CO],
  ['It is more hot today than yesterday.', 'It is hotter today than yesterday.', ['It is hoter today than yesterday.', 'It is hottest today than yesterday.'], 'short', CO],
], [
  ['An elephant is bigger than a horse.', 'short', CO],
  ['A car is more expensive than a bike.', 'long', CO],
  ['My cousin is as old as me.', 'asAs', CO],
  ['Your drawing is better than mine.', 'irregular', CO],
  ["Science isn't as easy as Art.", 'asAs', CO],
]);

export const UNIT_38_QUESTIONS: Question[] = buildBank(38, [
  ['Fansipan is the ___ mountain in Vietnam. (high)', 'highest', ['higher', 'most high', 'highst'], 'superShort', SU, 1],
  ['This is the ___ day of my life! (happy)', 'happiest', ['happyest', 'happier', 'most happy'], 'superShort', SU, 1],
  ['Lan is the ___ student in our class. (good)', 'best', ['goodest', 'better', 'most good'], 'irregular', SU, 1],
  ['That was the ___ film I have ever seen. (bad)', 'worst', ['baddest', 'worse', 'most bad'], 'ever', SU, 2],
  ['Ha Long Bay is the ___ place in Vietnam. (beautiful)', 'most beautiful', ['beautifulest', 'more beautiful', 'most beautifuller'], 'superLong', SU, 1],
  ['The blue whale is the ___ animal in the world. (big)', 'biggest', ['bigest', 'bigger', 'most big'], 'superShort', SU, 1],
  ['Mount Everest is ___ highest mountain in the world.', 'the', ['a', 'than', 'as'], 'superShort', SU, 1],
  ['Who is the tallest boy ___ your class?', 'in', ['than', 'at', 'as'], 'inOf', SU, 2],
  ['This is the ___ dress in the shop. (expensive)', 'most expensive', ['expensivest', 'more expensive', 'most expensivest'], 'superLong', SU, 2],
  ['August is the ___ month of the year here. (hot)', 'hottest', ['hotest', 'hotter', 'most hot'], 'superShort', SU, 2],
  ['It\'s the ___ book I have ever read. (interesting)', 'most interesting', ['interestingest', 'more interesting', 'most interestinger'], 'ever', SU, 2],
  ['Minh is the ___ runner in the school. (fast)', 'fastest', ['faster', 'most fast', 'fastst'], 'superShort', SU, 1],
  ['This is the ___ question in the test. (easy)', 'easiest', ['easyest', 'easier', 'most easy'], 'superShort', SU, 2],
  ['My grandpa is the ___ person in our family. (old)', 'oldest', ['older', 'most old', 'oldst'], 'superShort', SU, 1],
  ['That is the ___ joke I have ever heard! (funny)', 'funniest', ['funnyest', 'funnier', 'most funny'], 'ever', SU, 2],
  ['Football is the ___ sport in Vietnam. (popular)', 'most popular', ['popularest', 'more popular', 'most popularer'], 'superLong', SU, 2],
  ['Russia is the ___ country in the world. (large)', 'largest', ['largeest', 'larger', 'most large'], 'superShort', SU, 2],
  ['Neptune is the ___ planet from the Sun. (far)', 'furthest', ['farest', 'further', 'most far'], 'irregular', SU, 3],
  ['Who is the ___ person you know? (funny)', 'funniest', ['funnyest', 'funnier', 'most funny'], 'superShort', SU, 2],
  ['This is the ___ chair in the house. (comfortable)', 'most comfortable', ['comfortablest', 'more comfortable', 'most comfortabler'], 'superLong', SU, 3],
], [
  ['Lan is the most tall girl in the class.', 'Lan is the tallest girl in the class.', ['Lan is the taller girl in the class.', 'Lan is the tallest girl of the class than.'], 'superShort', SU],
  ['This is the beautifulest beach in Vietnam.', 'This is the most beautiful beach in Vietnam.', ['This is the more beautiful beach in Vietnam.', 'This is most beautifulest beach in Vietnam.'], 'superLong', SU],
  ['He is the goodest player in the team.', 'He is the best player in the team.', ['He is the better player in the team.', 'He is the most good player in the team.'], 'irregular', SU],
  ['Mount Everest is highest mountain in the world.', 'Mount Everest is the highest mountain in the world.', ['Mount Everest is the higher mountain in the world.', 'Mount Everest is a highest mountain in the world.'], 'superShort', SU],
  ['She is the best student of our school.', 'She is the best student in our school.', ['She is the better student in our school.', 'She is the best student than our school.'], 'inOf', SU],
  ['It was the baddest day ever!', 'It was the worst day ever!', ['It was the worse day ever!', 'It was the most bad day ever!'], 'irregular', SU],
], [
  ['The cheetah is the fastest animal on land.', 'superShort', SU],
  ['This is the most exciting game in the shop.', 'superLong', SU],
  ['Mai is the best singer in our class.', 'irregular', SU],
  ['It was the worst day of my life.', 'irregular', SU],
  ['This is the biggest pizza I have ever seen.', 'ever', SU],
]);

/** Unit 39: meaning and translation checks for every taught famous people and places word. */
export const UNIT_39_QUESTIONS: Question[] = buildWordBank(39, 13, FAME_WORDS);
