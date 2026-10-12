import { Question } from '../../../types';
import { createBankBuilder, buildWordBank } from '../../A1/authoredBank';
import { TRAVEL_WORDS } from './content';

const RULES = {
  form: { en: 'Present Perfect: have/has + past participle.', vi: 'Hiện tại hoàn thành: have/has + quá khứ phân từ.' },
  participle: { en: 'Learn the past participle of irregular verbs: seen, eaten, written, been…', vi: 'Học thuộc quá khứ phân từ của động từ bất quy tắc: seen, eaten, written, been…' },
  experience: { en: 'Use Present Perfect for life experiences without a time.', vi: 'Dùng hiện tại hoàn thành cho trải nghiệm trong đời, không nói thời gian cụ thể.' },
  ever: { en: 'Have you ever …? asks about any time in your life; never means not at any time.', vi: 'Have you ever …? hỏi về bất kỳ lúc nào trong đời; never = chưa bao giờ.' },
  justAlready: { en: 'just = a very short time ago; already = earlier than expected. Both go before the past participle.', vi: 'just = vừa mới; already = đã … rồi. Cả hai đứng trước quá khứ phân từ.' },
  yet: { en: 'yet goes at the end of negatives and questions.', vi: 'yet (chưa) đứng cuối câu phủ định và câu hỏi.' },
  forSince: { en: 'for + a length of time; since + a starting point.', vi: 'for + khoảng thời gian; since + mốc thời gian.' },
  howLong: { en: 'How long + have/has + subject + past participle?', vi: 'How long + have/has + chủ ngữ + quá khứ phân từ?' },
  continuing: { en: 'Something that started in the past and continues now uses Present Perfect.', vi: 'Việc bắt đầu trong quá khứ và còn tiếp tục dùng hiện tại hoàn thành.' },
} as const;
const buildBank = createBankBuilder(RULES, 5);
const PP = 'present-perfect-experience', AY = 'already-yet', FS = 'for-since';

export const UNIT_13_QUESTIONS: Question[] = buildBank(13, [
  ['I ___ my English homework. Can I play now?', 'have finished', ['finish', 'am finishing', 'has finished'], 'form', PP, 1],
  ['My sister ___ to Japan three times.', 'has been', ['have been', 'is been', 'has be'], 'form', PP, 2],
  ['We ___ this film before. Let\'s watch a new one.', 'have seen', ['has seen', 'have saw', 'are seeing'], 'participle', PP, 2],
  ['Minh has ___ a letter to his pen friend.', 'written', ['wrote', 'writed', 'write'], 'participle', PP, 2],
  ['Have you ___ a camel?', 'ever ridden', ['ever rode', 'ever rided', 'ever ride'], 'ever', PP, 2],
  ['I have ___ eaten snails. I\'m scared to try!', 'never', ['ever', 'yet', 'since'], 'ever', PP, 1],
  ['___ your parents ever visited Phu Quoc?', 'Have', ['Has', 'Did', 'Do'], 'ever', PP, 1],
  ['___ Lan ever won a competition?', 'Has', ['Have', 'Did', 'Does'], 'ever', PP, 1],
  ['Have you ever broken your arm? No, I ___.', "haven't", ["hasn't", "didn't", "don't"], 'ever', PP, 1],
  ['Has your dad ever cooked pho? Yes, he ___.', 'has', ['have', 'did', 'does'], 'ever', PP, 1],
  ['They ___ the new museum. They don\'t know what it is like.', "haven't visited", ["hasn't visited", "didn't visited", "haven't visit"], 'experience', PP, 2],
  ['Hoa has ___ her keys again! She can\'t find them.', 'lost', ['lose', 'losed', 'loses'], 'participle', PP, 2],
  ['I\'m not hungry. I\'ve ___ had lunch.', 'just', ['yet', 'ever', 'since'], 'justAlready', AY, 2],
  ['We\'ve ___ bought the tickets, so we don\'t need to queue.', 'already', ['yet', 'ever', 'since'], 'justAlready', AY, 2],
  ['Have you finished your project ___?', 'yet', ['already', 'ever', 'just'], 'yet', AY, 2],
  ['The bus hasn\'t arrived ___. Let\'s wait.', 'yet', ['already', 'just', 'never'], 'yet', AY, 1],
  ['Nam has ___ left. You missed him by one minute!', 'just', ['yet', 'ever', 'since'], 'justAlready', AY, 2],
  ['Grandma has ___ the cake. Let\'s eat!', 'made', ['make', 'maked', 'makes'], 'participle', AY, 1],
  ['I can\'t go out. I haven\'t ___ my room yet.', 'tidied', ['tidy', 'tidyed', 'tidies'], 'participle', AY, 2],
  ['She ___ been to the zoo. She went there last year.', 'has', ['have', 'is', 'did'], 'form', PP, 1],
  ['Have you ___ been to Ha Long Bay?', 'ever', ['never', 'yet', 'since'], 'ever', PP, 1],
], [
  ['I have saw that film twice.', 'I have seen that film twice.', ['I has seen that film twice.', 'I have see that film twice.'], 'participle', PP],
  ['She have visited Hue.', 'She has visited Hue.', ['She is visited Hue.', 'She have visit Hue.'], 'form', PP],
  ['Did you ever eaten durian?', 'Have you ever eaten durian?', ['Has you ever eaten durian?', 'Have you ever ate durian?'], 'ever', PP],
  ['I have finished yet my homework.', 'I have already finished my homework.', ['I have finished already yet my homework.', 'I have yet finished my homework.'], 'justAlready', AY],
  ['We haven\'t yet eaten breakfast.', 'We haven\'t eaten breakfast yet.', ['We haven\'t eat breakfast yet.', 'We hasn\'t eaten breakfast yet.'], 'yet', AY],
  ['He has never swam in the sea.', 'He has never swum in the sea.', ['He have never swum in the sea.', 'He has never swim in the sea.'], 'participle', PP],
], [
  ['Have you ever flown in a plane?', 'ever', PP],
  ['I have never seen snow.', 'ever', PP],
  ['We have already packed our bags.', 'justAlready', AY],
  ["Lan hasn't read the email yet.", 'yet', AY],
  ['My brother has just made some tea.', 'justAlready', AY],
]);

export const UNIT_14_QUESTIONS: Question[] = buildBank(14, [
  ['We have lived here ___ 2018.', 'since', ['for', 'ago', 'during'], 'forSince', FS, 1],
  ['I have known Mai ___ five years.', 'for', ['since', 'ago', 'during'], 'forSince', FS, 1],
  ['My dad has worked at the bank ___ a long time.', 'for', ['since', 'ago', 'from'], 'forSince', FS, 1],
  ['They have been friends ___ Year 3.', 'since', ['for', 'ago', 'during'], 'forSince', FS, 1],
  ['She has had a cold ___ Monday.', 'since', ['for', 'ago', 'during'], 'forSince', FS, 1],
  ['We have waited for the bus ___ twenty minutes.', 'for', ['since', 'ago', 'during'], 'forSince', FS, 1],
  ['___ have you lived in Da Nang?', 'How long', ['How much', 'How often', 'When'], 'howLong', FS, 2],
  ['How long ___ Nam played the guitar?', 'has', ['have', 'did', 'does'], 'howLong', FS, 2],
  ['How long have they ___ in this house?', 'lived', ['live', 'living', 'lives'], 'howLong', FS, 2],
  ['I ___ English since I was six.', 'have learnt', ['learn', 'am learning', 'has learnt'], 'continuing', FS, 2],
  ['My grandparents ___ married for fifty years.', 'have been', ['are', 'has been', 'were being'], 'continuing', FS, 3],
  ['Lan ___ a pet cat since last summer.', 'has had', ['has', 'have had', 'is having'], 'continuing', FS, 2],
  ['I haven\'t seen my cousin ___ Tet.', 'since', ['for', 'ago', 'during'], 'forSince', FS, 2],
  ['We haven\'t eaten anything ___ six hours!', 'for', ['since', 'ago', 'during'], 'forSince', FS, 2],
  ['Hoa has played volleyball for ___.', 'three years', ['2019', 'last May', 'Year 5'], 'forSince', FS, 2],
  ['Minh has been in the library since ___.', 'two o\'clock', ['two hours', 'a long time', 'a week'], 'forSince', FS, 2],
  ['He ___ at this school since 2022.', 'has studied', ['studies', 'is studying', 'have studied'], 'continuing', FS, 2],
  ['How long have you had your bike? I\'ve had it ___ my birthday.', 'since', ['for', 'ago', 'during'], 'forSince', FS, 2],
  ['How long has your mum been a nurse? ___ twelve years.', 'For', ['Since', 'Ago', 'During'], 'forSince', FS, 2],
  ['They ___ each other since primary school.', 'have known', ['know', 'are knowing', 'has known'], 'continuing', FS, 2],
], [
  ['I have lived here since three years.', 'I have lived here for three years.', ['I have lived here ago three years.', 'I live here for three years.'], 'forSince', FS],
  ['She has been ill for Tuesday.', 'She has been ill since Tuesday.', ['She has been ill ago Tuesday.', 'She is ill since Tuesday.'], 'forSince', FS],
  ['I know him since 2019.', 'I have known him since 2019.', ['I am knowing him since 2019.', 'I has known him since 2019.'], 'continuing', FS],
  ['How long you have lived here?', 'How long have you lived here?', ['How long have you live here?', 'How long has you lived here?'], 'howLong', FS],
  ['We are friends for six years.', 'We have been friends for six years.', ['We has been friends for six years.', 'We were being friends for six years.'], 'continuing', FS],
  ['He has played chess since a long time.', 'He has played chess for a long time.', ['He has play chess for a long time.', 'He plays chess since a long time.'], 'forSince', FS],
], [
  ['How long have you known your best friend?', 'howLong', FS],
  ['We have lived in this flat for ten years.', 'forSince', FS],
  ['My sister has played the violin since 2021.', 'forSince', FS],
  ["I haven't seen Grandpa since Sunday.", 'forSince', FS],
  ['They have been in the team for two months.', 'continuing', FS],
]);

/** Unit 15: meaning and translation checks for every taught travel word. */
export const UNIT_15_QUESTIONS: Question[] = buildWordBank(15, 5, TRAVEL_WORDS);
