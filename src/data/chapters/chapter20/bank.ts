import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { SHOP_WORDS } from './content';

const RULES = {
  arrangement: { en: 'Use the present continuous (am / is / are + -ing) for fixed future arrangements with a time, a place or other people.', vi: 'Dùng thì hiện tại tiếp diễn (am / is / are + V-ing) cho việc đã hẹn, đã sắp xếp trong tương lai (có thời gian, địa điểm, người cùng tham gia).' },
  timetable: { en: 'Use the present simple for timetables and schedules: trains, buses, films, lessons and opening times.', vi: 'Dùng thì hiện tại đơn cho lịch trình, thời gian biểu: tàu xe, phim, giờ học, giờ mở cửa.' },
  timeClause: { en: 'After when, as soon as, before, after and until, use the present simple to talk about the future, not will.', vi: 'Sau when, as soon as, before, after, until dùng thì hiện tại đơn để nói về tương lai, không dùng will.' },
  should: { en: 'Use should / shouldn\'t + base verb to give advice. Question: Should I …?', vi: 'Dùng should / shouldn\'t + động từ nguyên mẫu để đưa ra lời khuyên. Câu hỏi: Should I …?' },
  mustnt: { en: 'mustn\'t = it is not allowed; don\'t have to = it is not necessary.', vi: 'mustn\'t = không được phép; don\'t have to = không cần thiết.' },
  must: { en: 'must and have to + base verb = it is necessary. Use has to with he, she and it. Never add to after must.', vi: 'must và have to + động từ nguyên mẫu = phải, cần phải. Dùng has to với he, she, it. Không thêm to sau must.' },
  hadTo: { en: 'The past of must and have to is had to; the negative is didn\'t have to; the question is Did … have to …?', vi: 'Quá khứ của must và have to là had to; phủ định là didn\'t have to; câu hỏi là Did … have to …?' },
  could: { en: 'could / couldn\'t + base verb talk about ability in the past.', vi: 'could / couldn\'t + động từ nguyên mẫu diễn tả khả năng trong quá khứ.' },
  might: { en: 'might / might not + base verb = perhaps it will happen or perhaps not.', vi: 'might / might not + động từ nguyên mẫu = có lẽ sẽ (hoặc sẽ không) xảy ra.' },
  ableTo: { en: 'will be able to + base verb is the future of can.', vi: 'will be able to + động từ nguyên mẫu là dạng tương lai của can.' },
} as const;
const buildBank = createBankBuilder(RULES, 20);
const AR = 'present-continuous-future', TT = 'present-simple-future', TC = 'time-clauses';
const SH = 'should', OB = 'obligation', PM = 'past-modals', AB = 'ability-possibility';

export const UNIT_58_QUESTIONS: Question[] = buildBank(58, [
  ['I ___ my cousins at the airport at six this evening. (meet)', 'am meeting', ['am meet', 'meeting', 'is meeting'], 'arrangement', AR, 1],
  ['The bus to Ha Long ___ at 7.30 tomorrow morning. (leave)', 'leaves', ['leave', 'is leave', 'leaving'], 'timetable', TT, 1],
  ['I\'ll send you a message when I ___ at the station. (arrive)', 'arrive', ['will arrive', 'arrives', 'arrived'], 'timeClause', TC, 2],
  ['___ you doing anything on Saturday evening?', 'Are', ['Do', 'Will', 'Is'], 'arrangement', AR, 1],
  ['What time ___ the film start tonight?', 'does', ['do', 'is', 'are'], 'timetable', TT, 1],
  ['We ___ dinner with our grandparents on Sunday. It\'s Grandma\'s birthday. (have)', 'are having', ['are have', 'having', 'is having'], 'arrangement', AR, 1],
  ['As soon as the rain ___, we\'ll go out. (stop)', 'stops', ['will stop', 'stop', 'stopping'], 'timeClause', TC, 2],
  ['Our English lesson ___ at 2.15 on Thursdays, not 2.30. (begin)', 'begins', ['begin', 'is begin', 'beginning'], 'timetable', TT, 2],
  ['Minh ___ to the dentist tomorrow. He has an appointment at ten. (go)', 'is going', ['is go', 'going', 'are going'], 'arrangement', AR, 2],
  ['Please wait here until your mum ___. (come)', 'comes', ['will come', 'come', 'coming'], 'timeClause', TC, 2],
  ['The museum ___ on Mondays, so let\'s go on Tuesday. (not open)', 'doesn\'t open', ['don\'t open', 'not opens', 'doesn\'t opens'], 'timetable', TT, 2],
  ['I ___ football tomorrow. I\'ve hurt my ankle. (not play)', 'am not playing', ['not playing', 'am not play', 'isn\'t playing'], 'arrangement', AR, 2],
  ['When Mai ___ her homework, she\'ll call you. (finish)', 'finishes', ['will finish', 'finish', 'finished'], 'timeClause', TC, 2],
  ['Where ___ you staying in Nha Trang next week?', 'are', ['do', 'will', 'is'], 'arrangement', AR, 2],
  ['The train ___ in Hue at 4 pm, so we\'ll be there for dinner. (arrive)', 'arrives', ['arrive', 'is arrive', 'arriving'], 'timetable', TT, 2],
  ['Brush your teeth before you ___ to bed. (go)', 'go', ['will go', 'goes', 'went'], 'timeClause', TC, 1],
  ['My parents ___ a new sofa this afternoon. The shop is delivering it at three. (get)', 'are getting', ['are get', 'getting', 'is getting'], 'arrangement', AR, 3],
  ['When ___ the next train to Hai Phong leave?', 'does', ['do', 'is', 'are'], 'timetable', TT, 2],
  ['I won\'t go to bed until I ___ this chapter. (finish)', 'finish', ['will finish', 'finishes', 'finishing'], 'timeClause', TC, 3],
  ['Lan can\'t come to the party. She ___ her aunt in Can Tho this weekend. (visit)', 'is visiting', ['is visit', 'visiting', 'are visiting'], 'arrangement', AR, 2],
], [
  ['I\'ll call you when I will get home.', 'I\'ll call you when I get home.', ['I\'ll call you when I gets home.', 'I\'ll call you when I getting home.'], 'timeClause', TC],
  ['We meeting our friends at the café tonight.', 'We are meeting our friends at the café tonight.', ['We is meeting our friends at the café tonight.', 'We are meet our friends at the café tonight.'], 'arrangement', AR],
  ['The concert start at eight o\'clock.', 'The concert starts at eight o\'clock.', ['The concert is start at eight o\'clock.', 'The concert starting at eight o\'clock.'], 'timetable', TT],
  ['What time do the bus leave tomorrow?', 'What time does the bus leave tomorrow?', ['What time does the bus leaves tomorrow?', 'What time is the bus leave tomorrow?'], 'timetable', TT],
  ['As soon as Dad will arrive, we will eat.', 'As soon as Dad arrives, we will eat.', ['As soon as Dad arrive, we will eat.', 'As soon as Dad arriving, we will eat.'], 'timeClause', TC],
  ['Are you do anything this weekend?', 'Are you doing anything this weekend?', ['Do you doing anything this weekend?', 'Is you doing anything this weekend?'], 'arrangement', AR],
], [
  ['I\'m meeting Lan at the bookshop at five.', 'arrangement', AR],
  ['The train leaves at half past six.', 'timetable', TT],
  ['We\'ll go out when the rain stops.', 'timeClause', TC],
  ['What are you doing on Saturday?', 'arrangement', AR],
  ['The shop closes at nine tonight.', 'timetable', TT],
]);

export const UNIT_59_QUESTIONS: Question[] = buildBank(59, [
  ['You have a bad cough. You ___ see a doctor.', 'should', ['should to', 'shoulds', 'are should'], 'should', SH, 1],
  ['You ___ talk during the exam. It\'s against the rules.', 'mustn\'t', ['don\'t have to', 'mustn\'t to', 'don\'t must'], 'mustnt', OB, 1],
  ['We ___ wear our uniform tomorrow. It\'s sports day. (not necessary)', 'don\'t have to', ['mustn\'t', 'doesn\'t have to', 'don\'t must'], 'mustnt', OB, 2],
  ['Last year Minh ___ walk to school because his bike was broken. (it was necessary)', 'had to', ['must', 'has to', 'have to'], 'hadTo', PM, 2],
  ['When I was seven, I ___ ride a bike without help. (ability)', 'could', ['can', 'could to', 'cans'], 'could', PM, 1],
  ['Take an umbrella. It ___ rain later. (perhaps)', 'might', ['mights', 'might to', 'is might'], 'might', AB, 1],
  ['Lan ___ do her homework now. She can do it tomorrow. (not necessary)', 'doesn\'t have to', ['mustn\'t', 'don\'t have to', 'doesn\'t has to'], 'mustnt', OB, 2],
  ['___ I wear a jacket today? It looks cold. (ask for advice)', 'Should', ['Am', 'Does', 'Have'], 'should', SH, 2],
  ['We ___ go to school yesterday because it was a holiday. (not necessary)', 'didn\'t have to', ['mustn\'t', 'don\'t have to', 'didn\'t had to'], 'hadTo', PM, 2],
  ['I ___ open the door. It was locked. (no ability)', 'couldn\'t', ['can\'t', 'couldn\'t to', 'didn\'t could'], 'could', PM, 2],
  ['Students ___ bring their ID cards to the exam. It\'s a rule.', 'must', ['must to', 'musts', 'are must'], 'must', OB, 1],
  ['You ___ eat so much fast food. It isn\'t healthy. (advice)', 'shouldn\'t', ['don\'t should', 'shouldn\'t to', 'not should'], 'should', SH, 1],
  ['Nam ___ get up early on weekdays. His school starts at seven.', 'has to', ['have to', 'has', 'must to'], 'must', OB, 1],
  ['I\'m not sure, but we ___ go to Da Lat in the summer. (perhaps)', 'might', ['might to', 'mights', 'are might'], 'might', AB, 2],
  ['Next year, my little sister ___ read on her own. (future ability)', 'will be able to', ['will can', 'will able to', 'will be able'], 'ableTo', AB, 3],
  ['___ you swim when you were five? (ability)', 'Could', ['Can', 'Were', 'Have'], 'could', PM, 2],
  ['Passengers ___ use their phones while the plane is taking off. (not allowed)', 'mustn\'t', ['don\'t have to', 'mustn\'t to', 'don\'t must'], 'mustnt', OB, 2],
  ['Did your brother ___ work at the weekend?', 'have to', ['had to', 'has to', 'must'], 'hadTo', PM, 3],
  ['Mai ___ come to the picnic. She isn\'t sure yet. (perhaps not)', 'might not', ['mightn\'t to', 'doesn\'t might', 'might not to'], 'might', AB, 3],
  ['You ___ tell anyone. It\'s a secret! (it\'s very important not to)', 'mustn\'t', ['don\'t have to', 'mustn\'t to', 'not must'], 'mustnt', OB, 2],
], [
  ['You should to drink more water.', 'You should drink more water.', ['You should drinking more water.', 'You shoulds drink more water.'], 'should', SH],
  ['She have to wear glasses.', 'She has to wear glasses.', ['She has wear glasses.', 'She haves to wear glasses.'], 'must', OB],
  ['We must went home early yesterday.', 'We had to go home early yesterday.', ['We must go home early yesterday.', 'We had to went home early yesterday.'], 'hadTo', PM],
  ['I can\'t swim when I was six.', 'I couldn\'t swim when I was six.', ['I couldn\'t swam when I was six.', 'I didn\'t could swim when I was six.'], 'could', PM],
  ['It might rains tomorrow.', 'It might rain tomorrow.', ['It might to rain tomorrow.', 'It mights rain tomorrow.'], 'might', AB],
  ['You don\'t must run in the corridor.', 'You mustn\'t run in the corridor.', ['You mustn\'t to run in the corridor.', 'You don\'t must running in the corridor.'], 'mustnt', OB],
], [
  ['You shouldn\'t stay up so late.', 'should', SH],
  ['We don\'t have to wear a uniform on Fridays.', 'mustnt', OB],
  ['I had to help my mum yesterday.', 'hadTo', PM],
  ['It might be sunny tomorrow.', 'might', AB],
  ['My grandmother could sing very well.', 'could', PM],
]);

/** Unit 60: meaning and translation checks for every taught shopping word. */
export const UNIT_60_QUESTIONS: Question[] = buildWordBank(60, 20, SHOP_WORDS);
