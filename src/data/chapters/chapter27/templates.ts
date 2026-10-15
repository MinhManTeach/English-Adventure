import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { WHO_WHICH_THAT, WHOSE_WHERE_WHEN, NON_DEFINING, HAD_DONE, HAD_NOT, HAD_QUESTIONS, PAST_SEQUENCE, NATURE_WORDS, type GapPoolItem } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  /** One frame per authored gap item; a trailing "(verb)" hint stays in the gap but not in the finished sentence. */
  const gapFrames = (kind: string, items: readonly GapPoolItem[], clue: string, en: string, vi: string): ControlledFrame[] =>
    items.map(([gap, answer, wrong, extra], i) => {
      const sentence = gap.replace(/ \([^)]*\)$/, ''), fill = (x: string) => {
        const filled = sentence.replace('___', x);
        return filled[0].toUpperCase() + filled.slice(1);
      };
      const correct = fill(answer), subs = wrong.map(fill);
      const errors = extra ? [extra, ...subs.slice(0, 2)] : subs;
      return withContext(frame(`${kind}-${i}`, correct, errors, gap, answer, [...wrong], `${clue} ${gap}`, `${en} ${correct}`, vi), `${kind}:${i}`);
    });

  // Unit 79: relative clauses.
  register(79, 'relative-clauses', 'who-which-that', gapFrames('who-which-that', WHO_WHICH_THAT, 'Complete the relative clause:',
    'Use who for people and which for things; that can replace both in defining clauses. Never say what here, and never repeat the object (it, him, her) after the relative pronoun.',
    'Dùng who cho người, which cho vật; that thay được cả hai trong mệnh đề xác định. Không dùng what và không lặp lại tân ngữ (it, him, her) sau đại từ quan hệ.'));
  register(79, 'relative-clauses', 'whose-where-when', gapFrames('whose-where-when', WHOSE_WHERE_WHEN, 'Choose whose, where or when:',
    'whose = possession (whose dog); where = a place (the town where...); when = a time (the day when...).',
    'whose chỉ sở hữu (whose dog); where chỉ nơi chốn (the town where...); when chỉ thời gian (the day when...).'));
  register(79, 'relative-clauses', 'non-defining', gapFrames('non-defining', NON_DEFINING, 'Commas show extra information. Complete:',
    'A non-defining clause gives extra information between commas. Use who, which, whose or where, but never that.',
    'Mệnh đề không xác định bổ sung thông tin và nằm giữa hai dấu phẩy. Dùng who, which, whose hoặc where, không bao giờ dùng that.'));

  // Unit 80: past perfect.
  register(80, 'past-perfect', 'had-done', gapFrames('had-done', HAD_DONE, 'One action happened before another past action. Complete:',
    'Past perfect = had + past participle for the earlier of two past actions. Learn irregular participles: gone, eaten, seen, taken, written.',
    'Quá khứ hoàn thành = had + quá khứ phân từ, dùng cho hành động xảy ra trước một hành động quá khứ khác. Nhớ phân từ bất quy tắc: gone, eaten, seen, taken, written.'));
  register(80, 'past-perfect', 'negative', gapFrames('had-not', HAD_NOT, 'Say it had not happened before then:',
    'Negative past perfect: hadn\'t + past participle, or had never + past participle ... before.',
    'Phủ định quá khứ hoàn thành: hadn\'t + quá khứ phân từ, hoặc had never + quá khứ phân từ ... before (chưa từng ... trước đó).'));
  register(80, 'past-perfect', 'question', gapFrames('had-question', HAD_QUESTIONS, 'Ask about an earlier past action:',
    'Past perfect questions: (Wh-word +) Had + subject + past participle?',
    'Câu hỏi quá khứ hoàn thành: (từ để hỏi +) Had + chủ ngữ + quá khứ phân từ?'));
  register(80, 'past-perfect', 'sequence', gapFrames('past-sequence', PAST_SEQUENCE, 'Which action came first? Complete:',
    'In a past story, the later action uses the past simple and the earlier action uses had + past participle.',
    'Khi kể chuyện quá khứ, hành động xảy ra sau dùng quá khứ đơn, hành động xảy ra trước dùng had + quá khứ phân từ.'));

  // Unit 81: nature words.
  registerWordUnit(81, NATURE_WORDS, 'nature-a2', 'nature-meaning');
}
