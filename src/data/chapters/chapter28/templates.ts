import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SAY_TELL, BACKSHIFT, REPORT_CHANGES, REPORTED_COMMANDS, PRESENT_REVISION, PAST_REVISION, PERFECT_REVISION, FUTURE_REVISION, GLOBAL_WORDS, type LeadGapItem } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  /** One frame per authored item. The lead-in (direct speech) is shown with the gap; the answer sentence is the reported one. */
  const gapFrames = (kind: string, items: readonly LeadGapItem[], clue: string, en: string, vi: string): ControlledFrame[] =>
    items.map(([lead, gap, answer, wrong], i) => {
      const sentence = gap.replace(/ \([^)]*\)$/, ''), fill = (x: string) => {
        const filled = sentence.replace('___', x);
        return filled[0].toUpperCase() + filled.slice(1);
      };
      const correct = fill(answer), shown = lead ? `${lead} → ${gap}` : gap;
      return withContext(frame(`${kind}-${i}`, correct, wrong.map(fill), shown, answer, [...wrong], `${clue} ${shown}`, `${en} ${correct}`, vi), `${kind}:${i}`);
    });

  // Unit 82: reported speech.
  register(82, 'reported-speech', 'say-tell', gapFrames('say-tell', SAY_TELL, 'Choose say or tell:',
    'tell needs a person after it (tell me, tell Lan). say has no person after it, or uses say to someone.',
    'Sau tell phải có người nghe (tell me, tell Lan). Sau say không có người nghe, hoặc dùng say to someone.'));
  register(82, 'reported-speech', 'backshift', gapFrames('backshift', BACKSHIFT, 'Report what was said:',
    'When we report something said in the past, the verb usually moves one step back: am/is → was, are → were, can → could, will → would, present → past.',
    'Khi tường thuật lời nói trong quá khứ, động từ thường lùi một thì: am/is → was, are → were, can → could, will → would, hiện tại → quá khứ.'));
  register(82, 'reported-speech', 'changes', gapFrames('report-changes', REPORT_CHANGES, 'Change the words for reported speech:',
    'In reported speech, pronouns and possessives change to fit the new speaker, and time and place words change: today → that day, tomorrow → the next day, yesterday → the day before, here → there, now → then, this → that.',
    'Trong câu tường thuật, đại từ và tính từ sở hữu đổi theo người nói mới; từ chỉ thời gian, nơi chốn cũng đổi: today → that day, tomorrow → the next day, yesterday → the day before, here → there, now → then, this → that.'));
  register(82, 'reported-speech', 'commands', gapFrames('reported-commands', REPORTED_COMMANDS, 'Report the instruction or request:',
    'Reported commands and requests: tell / ask + person + to + base verb; negative: not to + base verb.',
    'Tường thuật mệnh lệnh, yêu cầu: tell / ask + người + to + động từ nguyên mẫu; phủ định: not to + động từ nguyên mẫu.'));

  // Unit 83: tenses revision.
  register(83, 'tenses-revision', 'present', gapFrames('present-revision', PRESENT_REVISION, 'Habit, fact or happening now?',
    'Present simple for habits and facts; present continuous for actions happening now (Look!, Listen!, now). State verbs (know, like, taste) stay simple.',
    'Hiện tại đơn cho thói quen, sự thật; hiện tại tiếp diễn cho hành động đang xảy ra (Look!, Listen!, now). Động từ chỉ trạng thái (know, like, taste) không dùng dạng -ing.'));
  register(83, 'tenses-revision', 'past', gapFrames('past-revision', PAST_REVISION, 'Choose the right past tense:',
    'Past simple for finished actions (ago, yesterday, last); past continuous for an action in progress (was/were + -ing); past perfect for an earlier past action (had + past participle).',
    'Quá khứ đơn cho hành động đã kết thúc (ago, yesterday, last); quá khứ tiếp diễn cho hành động đang diễn ra (was/were + -ing); quá khứ hoàn thành cho hành động xảy ra trước (had + quá khứ phân từ).'));
  register(83, 'tenses-revision', 'perfect', gapFrames('perfect-revision', PERFECT_REVISION, 'Present perfect or past simple?',
    'Present perfect (have/has + past participle) with since, for, ever, just, yet and how many times; past simple with finished times like ago, last year and yesterday.',
    'Hiện tại hoàn thành (have/has + quá khứ phân từ) đi với since, for, ever, just, yet và số lần; quá khứ đơn đi với thời gian đã qua như ago, last year, yesterday.'));
  register(83, 'tenses-revision', 'future', gapFrames('future-revision', FUTURE_REVISION, 'Talk about the future:',
    'going to for plans and predictions with evidence; will for quick decisions, promises and opinions (I think, maybe); present continuous for arrangements; present simple for timetables.',
    'going to cho dự định và dự đoán có căn cứ; will cho quyết định tức thì, lời hứa và ý kiến (I think, maybe); hiện tại tiếp diễn cho kế hoạch đã sắp xếp; hiện tại đơn cho lịch trình, thời gian biểu.'));

  // Unit 84: global problems words.
  registerWordUnit(84, GLOBAL_WORDS, 'global', 'global-meaning');
}
