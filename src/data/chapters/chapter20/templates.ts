import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { ARRANGEMENT_ITEMS, TIMETABLE_ITEMS, TIME_CLAUSE_ITEMS, SHOULD_ITEMS, MUSTNT_ITEMS, PAST_MODAL_ITEMS, SHOP_WORDS } from './content';
import type { GapLine } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  /** One frame per authored line; a trailing (hint) stays in the gap and the clue but not in the sentence. */
  const frames = (prefix: string, items: readonly GapLine[], lead: string, en: string, vi: string): ControlledFrame[] => items.map(([gap, answer, wrong], i) => {
    const sentence = gap.replace(/ \([^)]*\)$/, ''), correct = sentence.replace('___', answer);
    return withContext(frame(`${prefix}-${i}`, correct, wrong.map(x => sentence.replace('___', x)), gap, answer, [...wrong], `${lead}: ${gap}`,
      `${en} ${correct}`, vi), `${prefix}:${i}`);
  });
  // Unit 58: present tenses for the future.
  register(58, 'present-continuous-future', 'arrangements', frames('arrangement', ARRANGEMENT_ITEMS, 'Talk about an arrangement',
    'Present continuous (am / is / are + -ing) for fixed future arrangements.',
    'Thì hiện tại tiếp diễn (am / is / are + V-ing) cho những việc đã hẹn, đã sắp xếp trong tương lai.'));
  register(58, 'present-simple-future', 'timetables', frames('timetable', TIMETABLE_ITEMS, 'Talk about a timetable',
    'Present simple for timetables and schedules: the train leaves, the film starts, does the museum open …?',
    'Thì hiện tại đơn cho lịch trình, thời gian biểu: the train leaves, the film starts, does the museum open …?'));
  register(58, 'time-clauses', 'time-clauses', frames('time-clause', TIME_CLAUSE_ITEMS, 'Finish the time clause',
    'After when, as soon as, before, after and until, use the present simple for the future, not will.',
    'Sau when, as soon as, before, after, until dùng thì hiện tại đơn để nói về tương lai, không dùng will.'));
  // Unit 59: modal verbs.
  register(59, 'should', 'advice', frames('should', SHOULD_ITEMS, 'Give or ask for advice',
    'should / shouldn\'t + base verb for advice. Questions: Should I …?',
    'should / shouldn\'t + động từ nguyên mẫu để khuyên. Câu hỏi: Should I …?'));
  register(59, 'obligation', 'mustnt-dont-have-to', frames('mustnt', MUSTNT_ITEMS, 'Not allowed or not necessary?',
    'mustn\'t = it is not allowed; don\'t / doesn\'t have to = it is not necessary.',
    'mustn\'t = không được phép; don\'t / doesn\'t have to = không cần thiết.'));
  register(59, 'past-modals', 'past-modals', frames('past-modal', PAST_MODAL_ITEMS, 'Talk about the past',
    'had to / didn\'t have to = past obligation; could / couldn\'t = past ability.',
    'had to / didn\'t have to = bắt buộc / không bắt buộc trong quá khứ; could / couldn\'t = có thể / không thể làm trong quá khứ.'));
  // Unit 60: shopping words.
  registerWordUnit(60, SHOP_WORDS, 'shopping', 'shopping-meaning');
}
