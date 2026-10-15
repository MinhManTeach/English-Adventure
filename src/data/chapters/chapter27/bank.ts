import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { NATURE_WORDS } from './content';

const RULES = {
  who: { en: 'Use who (or that) for people in a defining relative clause.', vi: 'Dùng who (hoặc that) cho người trong mệnh đề quan hệ xác định.' },
  which: { en: 'Use which (or that) for things and animals in a defining relative clause.', vi: 'Dùng which (hoặc that) cho vật và con vật trong mệnh đề quan hệ xác định.' },
  that: { en: 'that can replace who or which in a defining clause. Never use what after a noun.', vi: 'that có thể thay cho who hoặc which trong mệnh đề xác định. Không dùng what sau danh từ.' },
  whose: { en: 'whose shows possession: the boy whose dog... (not who\'s, which means who is).', vi: 'whose chỉ sự sở hữu: the boy whose dog... (không phải who\'s, nghĩa là who is).' },
  where: { en: 'Use where after a place when a full clause (subject + verb) follows.', vi: 'Dùng where sau danh từ chỉ nơi chốn khi theo sau là một mệnh đề đầy đủ (chủ ngữ + động từ).' },
  when: { en: 'Use when after a time word: the day when, the year when.', vi: 'Dùng when sau từ chỉ thời gian: the day when, the year when.' },
  nonDefining: { en: 'Non-defining clauses add extra information between commas. Use who, which, whose or where, never that.', vi: 'Mệnh đề không xác định thêm thông tin phụ, đặt giữa dấu phẩy. Dùng who, which, whose hoặc where, không dùng that.' },
  omit: { en: 'The relative pronoun already stands for the object, so don\'t add it, him or her again.', vi: 'Đại từ quan hệ đã thay cho tân ngữ, nên không thêm it, him hay her nữa.' },
  form: { en: 'Past perfect: had + past participle, the same for every subject.', vi: 'Quá khứ hoàn thành: had + quá khứ phân từ, giống nhau với mọi chủ ngữ.' },
  irregular: { en: 'Irregular verbs need their past participle after had: gone, been, eaten, seen.', vi: 'Động từ bất quy tắc dùng quá khứ phân từ sau had: gone, been, eaten, seen.' },
  earlier: { en: 'Use the past perfect for something that happened before another past moment, often to give a reason.', vi: 'Dùng quá khứ hoàn thành cho việc xảy ra trước một thời điểm quá khứ khác, thường để nêu lý do.' },
  negative: { en: 'Negative: hadn\'t + past participle; had never + past participle ... before.', vi: 'Phủ định: hadn\'t + quá khứ phân từ; had never + quá khứ phân từ ... before.' },
  question: { en: 'Questions: Had + subject + past participle?', vi: 'Câu hỏi: Had + chủ ngữ + quá khứ phân từ?' },
  signal: { en: 'by the time, already, before and when often show that one past action finished earlier.', vi: 'by the time, already, before và when thường cho thấy một hành động quá khứ đã xong trước.' },
  mix: { en: 'The later past action uses the past simple; the earlier one uses had + past participle.', vi: 'Hành động quá khứ xảy ra sau dùng quá khứ đơn; hành động xảy ra trước dùng had + quá khứ phân từ.' },
} as const;
const buildBank = createBankBuilder(RULES, 27);
const RC = 'relative-clauses', PP = 'past-perfect';

export const UNIT_79_QUESTIONS: Question[] = buildBank(79, [
  ['An astronaut is a person ___ travels into space.', 'who', ['which', 'where', 'whose'], 'who', RC, 1],
  ['A fridge is a machine ___ keeps food cold.', 'which', ['who', 'where', 'what'], 'which', RC, 1],
  ['This is the café ___ we usually meet after school.', 'where', ['which', 'who', 'when'], 'where', RC, 1],
  ['I know a girl ___ father is a pilot.', 'whose', ['who', 'who\'s', 'which'], 'whose', RC, 1],
  ['Monday is the day ___ we have PE.', 'when', ['where', 'whose', 'what'], 'when', RC, 2],
  ['The bag ___ you gave me is really useful.', 'that', ['what', 'who', 'where'], 'that', RC, 2],
  ['My uncle, ___ works in Japan, is coming home for Tết.', 'who', ['that', 'which', 'whose'], 'nonDefining', RC, 2],
  ['Hue, ___ was once the capital of Viet Nam, has many old palaces.', 'which', ['that', 'who', 'where'], 'nonDefining', RC, 2],
  ['The boy ___ broke the window said sorry.', 'who', ['which', 'whose', 'where'], 'who', RC, 1],
  ['Can you lend me the ruler ___ you used yesterday?', 'that', ['what', 'who', 'whose'], 'that', RC, 2],
  ['The village ___ my dad grew up is near the sea.', 'where', ['which', 'when', 'who'], 'where', RC, 2],
  ['The woman ___ bag was stolen went to the police station.', 'whose', ['who', 'which', 'who\'s'], 'whose', RC, 2],
  ['Lan, ___ sister is a singer, wants to be famous too.', 'whose', ['that', 'who', 'which'], 'nonDefining', RC, 3],
  ['The film ___ we watched last night was really scary.', 'which', ['what', 'who', 'where'], 'which', RC, 1],
  ['I\'ll never forget the moment ___ I scored my first goal.', 'when', ['where', 'which', 'whose'], 'when', RC, 3],
  ['Do you know anyone ___ speaks Korean?', 'who', ['which', 'what', 'whose'], 'who', RC, 1],
  ['Con Dao, ___ we went diving, has clear blue water.', 'where', ['which', 'that', 'who'], 'nonDefining', RC, 3],
  ['All the things ___ he told us were true.', 'that', ['what', 'whose', 'where'], 'that', RC, 2],
  ['Turtles are animals ___ can live for over 100 years.', 'which', ['who', 'where', 'whose'], 'which', RC, 1],
  ['Is this the key ___ opens the back door?', 'which', ['who', 'where', 'what'], 'which', RC, 2],
], [
  ['The cake which my mum made it was delicious.', 'The cake which my mum made was delicious.', ['The cake what my mum made was delicious.', 'The cake who my mum made was delicious.'], 'omit', RC],
  ['I have a friend who his dad is a firefighter.', 'I have a friend whose dad is a firefighter.', ['I have a friend which dad is a firefighter.', 'I have a friend who\'s dad is a firefighter.'], 'whose', RC],
  ['My best friend, that lives in Hai Phong, is visiting me.', 'My best friend, who lives in Hai Phong, is visiting me.', ['My best friend, which lives in Hai Phong, is visiting me.', 'My best friend, whose lives in Hai Phong, is visiting me.'], 'nonDefining', RC],
  ['This is the house which I was born.', 'This is the house where I was born.', ['This is the house when I was born.', 'This is the house who I was born.'], 'where', RC],
  ['The book what I am reading is about dinosaurs.', 'The book that I am reading is about dinosaurs.', ['The book who I am reading is about dinosaurs.', 'The book where I am reading is about dinosaurs.'], 'that', RC],
  ['The man which helped us was very kind.', 'The man who helped us was very kind.', ['The man whose helped us was very kind.', 'The man where helped us was very kind.'], 'who', RC],
], [
  ['The girl who won the race is my cousin.', 'who', RC],
  ['This is the park where we fly kites.', 'where', RC],
  ['The phone that I bought is very fast.', 'that', RC],
  ['My teacher, whose son is a doctor, lives in Hue.', 'nonDefining', RC],
  ['I remember the day when we moved here.', 'when', RC],
]);

export const UNIT_80_QUESTIONS: Question[] = buildBank(80, [
  ['When we got to the bus stop, the bus ___. (go)', 'had gone', ['has gone', 'had went', 'had go'], 'irregular', PP, 1],
  ['Lan couldn\'t open the door because she ___ her key. (lose)', 'had lost', ['has lost', 'had lose', 'had losed'], 'earlier', PP, 1],
  ['By the time I woke up, Mum ___ breakfast. (make)', 'had made', ['has made', 'had make', 'had maked'], 'signal', PP, 2],
  ['I ___ never seen the sea before I went to Nha Trang.', 'had', ['have', 'was', 'did'], 'negative', PP, 2],
  ['___ you finished your homework before the film started?', 'Had', ['Have', 'Did', 'Were'], 'question', PP, 2],
  ['The children were excited because they ___ a whale. (see)', 'had seen', ['have seen', 'had saw', 'had see'], 'earlier', PP, 1],
  ['After we ___ dinner, we went for a walk. (have)', 'had had', ['have had', 'had has', 'has had'], 'form', PP, 3],
  ['Nam was hungry because he ___ lunch. (not eat)', 'hadn\'t eaten', ['haven\'t eaten', 'hadn\'t ate', 'didn\'t ate'], 'negative', PP, 2],
  ['When the police arrived, the thieves ___. (escape)', 'had escaped', ['have escaped', 'had escape', 'has escape'], 'signal', PP, 1],
  ['Mai ___ the book, so she knew the ending of the film. (read)', 'had read', ['has read', 'had readed', 'have read'], 'earlier', PP, 2],
  ['When I ___ home, my sister had already gone to bed. (get)', 'got', ['have got', 'get', 'had get'], 'mix', PP, 3],
  ['Had they ___ the tickets before the price went up? (buy)', 'bought', ['buy', 'buyed', 'buying'], 'question', PP, 2],
  ['The ground was white because it ___ in the night. (snow)', 'had snowed', ['has snowed', 'had snow', 'had snowing'], 'earlier', PP, 2],
  ['Linh ___ to Hanoi before, so she didn\'t need a map. (be)', 'had been', ['has been', 'had was', 'had be'], 'irregular', PP, 2],
  ['We ___ the match because our best player had hurt his foot. (lose)', 'lost', ['have lost', 'lose', 'had lose'], 'mix', PP, 3],
  ['Before he came to the party, Nam ___ a present for Lan. (buy)', 'had bought', ['has bought', 'had buyed', 'had buy'], 'signal', PP, 2],
  ['Dad ___ the car before it started to rain. (wash)', 'had washed', ['has washed', 'had wash', 'had washing'], 'signal', PP, 1],
  ['They didn\'t want to see the film because they ___ it twice. (watch)', 'had watched', ['have watched', 'had watch', 'had watching'], 'earlier', PP, 1],
  ['When Hoa arrived at school, she realised she ___ her lunch box. (forget)', 'had forgotten', ['has forgotten', 'had forgetted', 'had forget'], 'irregular', PP, 2],
  ['Why ___ the teacher angry yesterday? Because nobody had done the homework.', 'was', ['had', 'has', 'is'], 'mix', PP, 2],
], [
  ['When I arrived, the party has already started.', 'When I arrived, the party had already started.', ['When I arrived, the party had already start.', 'When I arrived, the party have already started.'], 'form', PP],
  ['Nam had went home before the rain started.', 'Nam had gone home before the rain started.', ['Nam had go home before the rain started.', 'Nam has went home before the rain started.'], 'irregular', PP],
  ['She didn\'t knew the answer because she hadn\'t studied.', 'She didn\'t know the answer because she hadn\'t studied.', ['She didn\'t knew the answer because she hadn\'t study.', 'She doesn\'t knew the answer because she hadn\'t studied.'], 'mix', PP],
  ['I hadn\'t never been to Hue before.', 'I had never been to Hue before.', ['I had never was to Hue before.', 'I haven\'t never been to Hue before.'], 'negative', PP],
  ['Did you had eaten before you came?', 'Had you eaten before you came?', ['Had you ate before you came?', 'Had you eat before you came?'], 'question', PP],
  ['By the time we got there, the shop has closed.', 'By the time we got there, the shop had closed.', ['By the time we got there, the shop had close.', 'By the time we got there, the shop have closed.'], 'signal', PP],
], [
  ['The film had started when we arrived.', 'form', PP],
  ['She had never seen snow before.', 'negative', PP],
  ['Had you met Lan before the party?', 'question', PP],
  ['We were tired because we had walked all day.', 'earlier', PP],
  ['After he had finished his homework, Minh went out.', 'mix', PP],
]);

/** Unit 81: meaning and translation checks for every taught nature word. */
export const UNIT_81_QUESTIONS: Question[] = buildWordBank(81, 27, NATURE_WORDS);
