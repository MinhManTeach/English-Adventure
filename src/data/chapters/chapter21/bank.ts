import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { CUSTOM_WORDS } from './content';

const RULES = {
  present: { en: 'Present simple passive: am / is / are + past participle.', vi: 'Bị động thì hiện tại đơn: am / is / are + quá khứ phân từ (V3).' },
  past: { en: 'Past simple passive: was / were + past participle.', vi: 'Bị động thì quá khứ đơn: was / were + quá khứ phân từ (V3).' },
  negQ: { en: "Passive negatives and questions use be, not do / does / did: isn't / wasn't + past participle; Is / Was … + past participle?", vi: "Câu phủ định và câu hỏi bị động dùng động từ be, không dùng do / does / did: isn't / wasn't + V3; Is / Was … + V3?" },
  by: { en: 'Use by + person or thing to say who or what did the action.', vi: 'Dùng by + người hoặc vật để nói ai hoặc cái gì thực hiện hành động.' },
  irregular: { en: 'Many past participles are irregular: write – written, steal – stolen, eat – eaten, give – given, catch – caught.', vi: 'Nhiều động từ có quá khứ phân từ bất quy tắc: write – written, steal – stolen, eat – eaten, give – given, catch – caught.' },
  choose: { en: 'Active: the doer is the subject (Nguyen Du wrote it). Passive: the thing is the subject (It was written by Nguyen Du).', vi: 'Chủ động: người làm là chủ ngữ (Nguyen Du wrote it). Bị động: vật chịu tác động là chủ ngữ (It was written by Nguyen Du).' },
  aAn: { en: 'Use a / an before a job, in rates like twice a week, and in What a …!', vi: 'Dùng a / an trước nghề nghiệp, trong cụm tần suất như twice a week và trong câu cảm thán What a …!' },
  general: { en: 'No article with plural or uncountable nouns that mean things in general.', vi: 'Không dùng mạo từ với danh từ số nhiều hoặc không đếm được khi nói chung chung.' },
  specific: { en: 'Use the for a specific thing that we both know, and before superlatives.', vi: 'Dùng the cho vật cụ thể mà cả hai đều biết, và trước so sánh nhất.' },
  places: { en: 'the + rivers, seas, oceans, mountain ranges, the USA / the UK; no article with cities, most countries, lakes and single mountains.', vi: 'the + sông, biển, đại dương, dãy núi, the USA / the UK; không dùng mạo từ với thành phố, đa số quốc gia, hồ và ngọn núi đơn lẻ.' },
  phrases: { en: 'No article in go to bed / school / work, at home, by bus, have breakfast, at night.', vi: 'Không dùng mạo từ trong go to bed / school / work, at home, by bus, have breakfast, at night.' },
} as const;
const buildBank = createBankBuilder(RULES, 21);
const PA = 'passive', AR = 'articles';

export const UNIT_61_QUESTIONS: Question[] = buildBank(61, [
  ['English ___ in many countries around the world. (speak)', 'is spoken', ['speaks', 'are spoken', 'is spoke'], 'present', PA, 1],
  ['These bags ___ from old plastic bottles. (make)', 'are made', ['make', 'is made', 'are make'], 'present', PA, 1],
  ['The Temple of Literature ___ in 1070. (build)', 'was built', ['built', 'is built', 'was build'], 'past', PA, 1],
  ['The first Harry Potter book ___ in 1997. (publish)', 'was published', ['published', 'is published', 'were published'], 'past', PA, 2],
  ['My bike ___ last night! (steal)', 'was stolen', ['was stole', 'stole', 'is stolen'], 'irregular', PA, 2],
  ['Two thousand mooncakes ___ in this bakery every day in September. (sell)', 'are sold', ['sell', 'is sold', 'are sell'], 'present', PA, 2],
  ['Our homework ___ by Ms Lan every week. (check)', 'is checked', ['checks', 'are checked', 'is check'], 'by', PA, 2],
  ["Yesterday's football match ___ because of the rain. (cancel)", 'was cancelled', ['cancelled', 'was cancel', 'is cancelled'], 'past', PA, 2],
  ['When ___ the Eiffel Tower built?', 'was', ['is', 'did', 'were'], 'negQ', PA, 2],
  ['Phở ___ for breakfast in many Vietnamese homes. (eat)', 'is eaten', ['eats', 'is ate', 'are eaten'], 'irregular', PA, 2],
  ['The letters ___ yesterday, so they will arrive soon. (send)', 'were sent', ['sent', 'are sent', 'were send'], 'past', PA, 2],
  ['The prizes ___ to the winners at the end of the ceremony yesterday. (give)', 'were given', ['were gave', 'gave', 'are given'], 'irregular', PA, 3],
  ['Pets ___ in this hotel. (not allow)', "aren't allowed", ["don't allowed", "isn't allowed", "aren't allow"], 'negQ', PA, 2],
  ['The new bridge ___ last year, so we still use the ferry. (not finish)', "wasn't finished", ["didn't finished", "wasn't finish", "weren't finished"], 'negQ', PA, 3],
  ['___ the children taken to school by bus every day?', 'Are', ['Do', 'Is', 'Does'], 'negQ', PA, 2],
  ['Many old houses in Hoi An ___ yellow. (paint)', 'are painted', ['paint', 'is painted', 'are paint'], 'present', PA, 2],
  ['Romeo and Juliet ___ by Shakespeare. (write)', 'was written', ['wrote', 'was wrote', 'is writing'], 'by', PA, 2],
  ["Lan ___ to Mai's birthday party last week. (invite)", 'was invited', ['invited', 'is invited', 'were invited'], 'past', PA, 2],
  ['The thief ___ by a police officer near the market. (catch)', 'was caught', ['was catched', 'caught', 'were caught'], 'irregular', PA, 3],
  ['Millions of photos ___ on social media every day. (post)', 'are posted', ['post', 'is posted', 'are post'], 'present', PA, 2],
  ['Nguyen Du ___ The Tale of Kieu. (write)', 'wrote', ['was written', 'is written', 'written'], 'choose', PA, 3],
  ['Alexander Graham Bell ___ the telephone. (invent)', 'invented', ['was invented', 'is invented', 'invent'], 'choose', PA, 3],
], [
  ['This bridge was build in 2010.', 'This bridge was built in 2010.', ['This bridge built in 2010.', 'This bridge is built in 2010.'], 'past', PA],
  ['English is speak in Singapore.', 'English is spoken in Singapore.', ['English speaks in Singapore.', 'English is spoke in Singapore.'], 'present', PA],
  ['The cakes was made by my aunt.', 'The cakes were made by my aunt.', ['The cakes made by my aunt.', 'The cakes was make by my aunt.'], 'past', PA],
  ['The book wrote by a famous author.', 'The book was written by a famous author.', ['The book was wrote by a famous author.', 'The book written by a famous author.'], 'by', PA],
  ["Photos don't allowed in the museum.", "Photos aren't allowed in the museum.", ["Photos isn't allowed in the museum.", "Photos aren't allow in the museum."], 'negQ', PA],
  ['Did the window broken by the ball?', 'Was the window broken by the ball?', ['Was the window broke by the ball?', 'Did the window break by the ball?'], 'negQ', PA],
], [
  ['Rice is grown in the Mekong Delta.', 'present', PA],
  ['The Temple of Literature was built in 1070.', 'past', PA],
  ['Our classroom is cleaned every day.', 'present', PA],
  ['The Tale of Kieu was written by Nguyen Du.', 'by', PA],
  ['Were the photos taken in Da Lat?', 'negQ', PA],
]);

export const UNIT_62_QUESTIONS: Question[] = buildBank(62, [
  ["My aunt works in a hospital and looks after patients. She's ___.", 'a nurse', ['nurse', 'an nurse', 'the nurses'], 'aAn', AR, 1],
  ["Nam's dad is ___. He designs bridges.", 'an engineer', ['engineer', 'a engineer', 'engineers'], 'aAn', AR, 1],
  ['We have PE twice ___.', 'a week', ['week', 'the week', 'in week'], 'aAn', AR, 2],
  ['What ___ beautiful day!', 'a', ['an', 'the', 'one'], 'aAn', AR, 2],
  ['___ are my favourite animals. (cats in general)', 'Cats', ['The cats', 'A cats', 'Cat'], 'general', AR, 2],
  ['___ in this bottle is too cold to drink.', 'The water', ['Water', 'A water', 'Waters'], 'specific', AR, 2],
  ['___ is good for your bones. (milk in general)', 'Milk', ['The milk', 'A milk', 'Milks'], 'general', AR, 2],
  ['Where is ___ I lent you last week?', 'the book', ['book', 'a books', 'books'], 'specific', AR, 2],
  ['___ is the longest river in Southeast Asia.', 'The Mekong', ['Mekong', 'A Mekong', 'The Mekongs'], 'places', AR, 2],
  ['My uncle lives in ___.', 'the USA', ['USA', 'a USA', 'an USA'], 'places', AR, 2],
  ['We spent our holiday in ___.', 'Thailand', ['the Thailand', 'a Thailand', 'an Thailand'], 'places', AR, 1],
  ['Is ___ bigger than the Atlantic?', 'the Pacific', ['Pacific', 'a Pacific', 'Pacifics'], 'places', AR, 3],
  ['Many tourists climb ___. It is the highest mountain in Vietnam.', 'Mount Fansipan', ['the Mount Fansipan', 'a Mount Fansipan', 'Mounts Fansipan'], 'places', AR, 3],
  ["I usually go to ___ at half past nine.", 'bed', ['the bed', 'a bed', 'beds'], 'phrases', AR, 1],
  ['We have ___ at half past six every morning.', 'breakfast', ['the breakfast', 'a breakfast', 'breakfasts'], 'phrases', AR, 1],
  ["Mai's mum isn't at work today. She's at ___.", 'home', ['the home', 'a home', 'homes'], 'phrases', AR, 1],
  ['Dad listens to ___ while he drives.', 'the radio', ['radio', 'a radio', 'radios'], 'phrases', AR, 2],
  ['We travelled to Hue ___.', 'by train', ['by the train', 'by a train', 'with train'], 'phrases', AR, 2],
  ['Ha Long Bay is one of ___ places in Vietnam.', 'the most beautiful', ['most beautiful', 'a most beautiful', 'the more beautiful'], 'specific', AR, 3],
  ['Lan is ___ student in our class.', 'the best', ['best', 'a best', 'the better'], 'specific', AR, 2],
  ['My cousin wants to be ___ when she finishes university.', 'an architect', ['architect', 'a architect', 'the architects'], 'aAn', AR, 2],
], [
  ['My mother is teacher.', 'My mother is a teacher.', ['My mother is an teacher.', 'My mother is the teachers.'], 'aAn', AR],
  ["The money isn't everything.", "Money isn't everything.", ["A money isn't everything.", "Moneys aren't everything."], 'general', AR],
  ['We visited the Hanoi last summer.', 'We visited Hanoi last summer.', ['We visited a Hanoi last summer.', 'We visited an Hanoi last summer.'], 'places', AR],
  ['Nile is the longest river in Africa.', 'The Nile is the longest river in Africa.', ['A Nile is the longest river in Africa.', 'The Nile is longest river in Africa.'], 'places', AR],
  ['I go to school by the bus.', 'I go to school by bus.', ['I go to the school by a bus.', 'I go to school by a bus.'], 'phrases', AR],
  ['She is tallest girl in our class.', 'She is the tallest girl in our class.', ['She is a tallest girl in our class.', 'She is the most tallest girl in our class.'], 'specific', AR],
], [
  ['My aunt is an engineer.', 'aAn', AR],
  ['We have English three times a week.', 'aAn', AR],
  ['The Mekong flows through six countries.', 'places', AR],
  ['I usually have breakfast at home.', 'phrases', AR],
  ['Children love sweets.', 'general', AR],
]);

/** Unit 63: meaning and translation checks for every taught customs and traditions word. */
export const UNIT_63_QUESTIONS: Question[] = buildWordBank(63, 21, CUSTOM_WORDS);
