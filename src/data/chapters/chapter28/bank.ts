import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { GLOBAL_WORDS } from './content';

const RULES = {
  sayTell: { en: 'tell + person (tell me, tell Lan); say + no person, or say to someone.', vi: 'tell + người nghe (tell me, tell Lan); say không có người nghe, hoặc say to someone.' },
  backshift: { en: 'Reporting a past situation, move the verb one step back: am/is → was, are → were, present → past, present perfect / past → past perfect.', vi: 'Khi tường thuật một tình huống đã qua, lùi động từ một thì: am/is → was, are → were, hiện tại → quá khứ, hiện tại hoàn thành / quá khứ → quá khứ hoàn thành.' },
  modal: { en: 'In reported speech, can → could and will → would.', vi: 'Trong câu tường thuật, can → could và will → would.' },
  pronoun: { en: 'Change pronouns and possessives to fit the person who reports: I → he/she, my → his/her, you → me.', vi: 'Đổi đại từ và tính từ sở hữu theo người tường thuật: I → he/she, my → his/her, you → me.' },
  time: { en: 'Time words change: today → that day, tomorrow → the next day, yesterday → the day before, now → then.', vi: 'Từ chỉ thời gian thay đổi: today → that day, tomorrow → the next day, yesterday → the day before, now → then.' },
  command: { en: 'Reported commands: tell / ask + person + (not) to + base verb.', vi: 'Tường thuật mệnh lệnh: tell / ask + người + (not) to + động từ nguyên mẫu.' },
  presentSimple: { en: 'Present simple for habits, routines and facts. Questions use do / does.', vi: 'Hiện tại đơn cho thói quen, sinh hoạt hằng ngày và sự thật. Câu hỏi dùng do / does.' },
  presentCont: { en: 'Present continuous (am/is/are + -ing) for actions happening now.', vi: 'Hiện tại tiếp diễn (am/is/are + -ing) cho hành động đang xảy ra.' },
  stative: { en: 'State verbs such as know, understand, like, smell and taste are not usually used with -ing.', vi: 'Động từ chỉ trạng thái như know, understand, like, smell, taste thường không dùng với -ing.' },
  pastSimple: { en: 'Past simple for finished actions at a finished time: yesterday, last week, two years ago.', vi: 'Quá khứ đơn cho hành động đã xong ở thời điểm đã qua: yesterday, last week, two years ago.' },
  pastCont: { en: 'Past continuous (was/were + -ing) for an action in progress at a past moment or when something happened.', vi: 'Quá khứ tiếp diễn (was/were + -ing) cho hành động đang diễn ra tại một thời điểm quá khứ hoặc khi việc khác xảy ra.' },
  pastPerfect: { en: 'Past perfect (had + past participle) for an action before another past action.', vi: 'Quá khứ hoàn thành (had + quá khứ phân từ) cho hành động xảy ra trước một hành động quá khứ khác.' },
  presentPerfect: { en: 'Present perfect (have/has + past participle) with since, for, ever, never, just and yet.', vi: 'Hiện tại hoàn thành (have/has + quá khứ phân từ) đi với since, for, ever, never, just, yet.' },
  future: { en: 'going to for plans and evidence; will for decisions and predictions; present continuous for arrangements; present simple for timetables.', vi: 'going to cho dự định và dự đoán có căn cứ; will cho quyết định tức thì và dự đoán; hiện tại tiếp diễn cho kế hoạch đã sắp xếp; hiện tại đơn cho lịch trình.' },
} as const;
const buildBank = createBankBuilder(RULES, 28);
const RS = 'reported-speech', TR = 'tenses-revision';

export const UNIT_82_QUESTIONS: Question[] = buildBank(82, [
  ['Mai ___ me that she had a new kitten.', 'told', ['said', 'spoke', 'talked'], 'sayTell', RS, 1],
  ['Nam ___ that he was sorry.', 'said', ['told', 'spoke', 'talked'], 'sayTell', RS, 1],
  ['Last week Lan said, "I am ill." → Lan said that she ___ ill.', 'was', ['is', 'were', 'be'], 'backshift', RS, 1],
  ['Last Saturday Minh said, "I can\'t come to the match today." → Minh said that he ___ come to the match that day.', 'couldn\'t', ['can\'t', 'wasn\'t', 'isn\'t'], 'modal', RS, 2],
  ['Last month Hoa said, "I will call you tomorrow." → Hoa said that she ___ call me the next day.', 'would', ['will', 'is', 'does'], 'modal', RS, 2],
  ['Nam said to me, "I like your bike." → Nam said that he liked ___ bike.', 'my', ['your', 'our', 'its'], 'pronoun', RS, 2],
  ['Last Monday Lan said, "I\'m leaving tomorrow." → Lan said that she was leaving ___.', 'the next day', ['tomorrow', 'yesterday', 'the day before'], 'time', RS, 3],
  ['The teacher said, "Switch off your phones." → The teacher told us ___ our phones.', 'to switch off', ['switch off', 'switching off', 'switched off'], 'command', RS, 2],
  ['Mum said, "Don\'t be late." → Mum told me ___ late.', 'not to be', ['don\'t be', 'not being', 'not be'], 'command', RS, 2],
  ['Last week the boys said, "We are practising for the match." → The boys said that they ___ for the match.', 'were practising', ['are practising', 'was practising', 'practise'], 'backshift', RS, 2],
  ['Who ___ you about the party?', 'told', ['said', 'spoke', 'says'], 'sayTell', RS, 2],
  ['Last month Minh said, "I feel sick." → Minh said that he ___ sick.', 'felt', ['feels', 'feel', 'feeled'], 'backshift', RS, 2],
  ['Yesterday Mai said, "I have finished my essay." → Mai said that she ___ her essay.', 'had finished', ['has finished', 'have finished', 'finish'], 'backshift', RS, 3],
  ['Last week Nam said, "I lost my wallet." → Nam said that he ___ his wallet.', 'had lost', ['has lost', 'loses', 'have lost'], 'backshift', RS, 3],
  ['Lan said, "Please hold my bag for a minute." → Lan asked me ___ her bag for a minute.', 'to hold', ['hold', 'holding', 'held'], 'command', RS, 1],
  ['Please ___ me what happened.', 'tell', ['say', 'speak', 'talk'], 'sayTell', RS, 2],
  ['Last year my neighbours said, "We are moving to Da Nang." → My neighbours said that ___ were moving to Da Nang.', 'they', ['we', 'them', 'us'], 'pronoun', RS, 2],
  ['Last Friday Hoa said, "I am busy now." → Hoa said that she was busy ___.', 'then', ['now', 'today', 'tomorrow'], 'time', RS, 2],
  ['Two days ago Minh said to me, "I\'ll help you." → Minh said that he would help ___.', 'me', ['you', 'him', 'I'], 'pronoun', RS, 2],
  ['The doctor said, "Stay in bed for two days." → The doctor told me ___ in bed for two days.', 'to stay', ['stay', 'staying', 'stayed'], 'command', RS, 1],
], [
  ['Lan said me that she was tired.', 'Lan told me that she was tired.', ['Lan talked me that she was tired.', 'Lan spoke me that she was tired.'], 'sayTell', RS],
  ['Nam told that he was hungry.', 'Nam said that he was hungry.', ['Nam spoke that he was hungry.', 'Nam talked that he was hungry.'], 'sayTell', RS],
  ['The teacher told us be quiet.', 'The teacher told us to be quiet.', ['The teacher told us being quiet.', 'The teacher told to us be quiet.'], 'command', RS],
  ['Mum told me don\'t touch the oven.', 'Mum told me not to touch the oven.', ['Mum told me not touch the oven.', 'Mum told me to not touching the oven.'], 'command', RS],
  ['Last week Minh said that he will visit us the next day.', 'Last week Minh said that he would visit us the next day.', ['Last week Minh said that he would visits us the next day.', 'Last week Minh said that he would visiting us the next day.'], 'modal', RS],
  ['Last Sunday Hoa said that she is busy that day.', 'Last Sunday Hoa said that she was busy that day.', ['Last Sunday Hoa said that she were busy that day.', 'Last Sunday Hoa said that she be busy that day.'], 'backshift', RS],
], [
  ['She told me that she was hungry.', 'sayTell', RS],
  ['He said that he would call me.', 'modal', RS],
  ['The teacher told us to open our books.', 'command', RS],
  ['My friends said that they were going home.', 'backshift', RS],
  ['Mum told me not to be late.', 'command', RS],
]);

export const UNIT_83_QUESTIONS: Question[] = buildBank(83, [
  ['Minh ___ football every Saturday. (play)', 'plays', ['is play', 'play', 'playing'], 'presentSimple', TR, 1],
  ['Shh! Grandpa ___ a nap. (have)', 'is having', ['has', 'have', 'had'], 'presentCont', TR, 1],
  ['I ___ what you mean. (understand)', 'understand', ['am understanding', 'understands', 'understood'], 'stative', TR, 2],
  ['We ___ to Nha Trang last summer. (go)', 'went', ['have gone', 'go', 'were go'], 'pastSimple', TR, 1],
  ['I ___ TV when the lights went out. (watch)', 'was watching', ['am watching', 'have watched', 'watch'], 'pastCont', TR, 2],
  ['Lan ___ Korean for two years, and she still loves it. (learn)', 'has learned', ['learns', 'is learning', 'learn'], 'presentPerfect', TR, 2],
  ['When we arrived at the station, the train ___. (leave)', 'had left', ['has left', 'leaves', 'is leaving'], 'pastPerfect', TR, 2],
  ['Look at the sky! It ___ rain.', 'is going to', ['was going to', 'goes to', 'is going'], 'future', TR, 2],
  ['Have you ever ___ a horse? (ride)', 'ridden', ['rode', 'ride', 'riding'], 'presentPerfect', TR, 2],
  ['What ___ you doing at 10 pm last night?', 'were', ['are', 'did', 'have'], 'pastCont', TR, 1],
  ['Nam ___ his arm last week. (break)', 'broke', ['has broken', 'breaks', 'is breaking'], 'pastSimple', TR, 2],
  ['This cake ___ wonderful! (smell)', 'smells', ['is smelling', 'smell', 'smelling'], 'stative', TR, 2],
  ['I\'m tired. I think I ___ go to bed early tonight.', 'will', ['am', 'was', 'did'], 'future', TR, 1],
  ['The festival ___ at 7 pm tomorrow. It\'s on the programme. (start)', 'starts', ['started', 'has started', 'was starting'], 'future', TR, 3],
  ['Mai ___ her homework yet. (not do)', 'hasn\'t done', ['didn\'t did', 'doesn\'t done', 'hasn\'t did'], 'presentPerfect', TR, 3],
  ['While Mum ___, the phone rang. (cook)', 'was cooking', ['is cooking', 'has cooked', 'cooks'], 'pastCont', TR, 2],
  ['We ___ in this house since I was born. (live)', 'have lived', ['live', 'lived', 'are living'], 'presentPerfect', TR, 2],
  ['Lan was upset because she ___ her bus. (miss)', 'had missed', ['has missed', 'misses', 'is missing'], 'pastPerfect', TR, 2],
  ['How often ___ you go swimming?', 'do', ['are', 'does', 'have'], 'presentSimple', TR, 1],
  ['We ___ dinner with our cousins next Sunday. We arranged it last week. (have)', 'are having', ['had', 'have had', 'were having'], 'future', TR, 3],
], [
  ['I am knowing the answer.', 'I know the answer.', ['I knows the answer.', 'I am know the answer.'], 'stative', TR],
  ['I have seen Lan yesterday.', 'I saw Lan yesterday.', ['I see Lan yesterday.', 'I have saw Lan yesterday.'], 'pastSimple', TR],
  ['She lives in Hanoi since 2019.', 'She has lived in Hanoi since 2019.', ['She is living in Hanoi since 2019.', 'She lived in Hanoi since 2019.'], 'presentPerfect', TR],
  ['I was walk to school when it started to rain.', 'I was walking to school when it started to rain.', ['I am walking to school when it started to rain.', 'I walking to school when it started to rain.'], 'pastCont', TR],
  ['Look! The children plays in the snow.', 'Look! The children are playing in the snow.', ['Look! The children play in the snow.', 'Look! The children is playing in the snow.'], 'presentCont', TR],
  ['I will to visit my grandma tomorrow.', 'I will visit my grandma tomorrow.', ['I will visiting my grandma tomorrow.', 'I wills visit my grandma tomorrow.'], 'future', TR],
], [
  ['My brother usually walks to school.', 'presentSimple', TR],
  ['We were having dinner when you called.', 'pastCont', TR],
  ['Have you ever been to Ha Long Bay?', 'presentPerfect', TR],
  ['The bus had left when we arrived.', 'pastPerfect', TR],
  ['I am going to visit Hue next month.', 'future', TR],
]);

/** Unit 84: meaning and translation checks for every taught global problems word. */
export const UNIT_84_QUESTIONS: Question[] = buildWordBank(84, 28, GLOBAL_WORDS);
