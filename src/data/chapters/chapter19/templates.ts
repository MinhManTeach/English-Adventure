import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { WILL_ITEMS, ADVERB_ITEMS, ADVERB_WRONG, GOING_TO_ITEMS, REFLEXIVE_ITEMS, POSSESSIVE_PRONOUN_ITEMS, POSSESSIVE_S_ITEMS, WORK_WORDS } from './content';
import type { GapLine } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  /** One frame per authored line; a trailing (hint) stays in the gap and the clue but not in the sentence. */
  const frames = (prefix: string, items: readonly GapLine[], lead: string, en: string, vi: string): ControlledFrame[] => items.map(([gap, answer, wrong], i) => {
    const sentence = gap.replace(/ \([^)]*\)$/, ''), correct = sentence.replace('___', answer);
    return withContext(frame(`${prefix}-${i}`, correct, wrong.map(x => sentence.replace('___', x)), gap, answer, [...wrong], `${lead}: ${gap}`,
      `${en} ${correct}`, vi), `${prefix}:${i}`);
  });
  // Unit 55: will, probably / definitely, be going to.
  register(55, 'will', 'will-predictions', frames('will', WILL_ITEMS, 'Talk about the future with will',
    'Use will / won\'t + base verb for predictions, opinions and promises.',
    'Dùng will / won\'t + động từ nguyên mẫu để dự đoán, nêu ý kiến và hứa hẹn về tương lai.'));
  register(55, 'will', 'probably-definitely', frames('adverb', ADVERB_ITEMS.map(([gap, answer]) => [gap, answer, ADVERB_WRONG[answer]] as const),
    'Put probably or definitely in the right place',
    'probably and definitely go after will but before won\'t.',
    'probably và definitely đứng sau will nhưng đứng trước won\'t.'));
  register(55, 'going-to', 'going-to', frames('going-to', GOING_TO_ITEMS, 'Use be going to',
    'am / is / are going to + base verb: plans, and predictions from what you can see now.',
    'am / is / are going to + động từ nguyên mẫu: kế hoạch, dự định và dự đoán dựa vào dấu hiệu hiện tại.'));
  // Unit 56: reflexive pronouns, possessive pronouns, possessive 's.
  register(56, 'reflexive-pronouns', 'reflexive', frames('reflexive', REFLEXIVE_ITEMS, 'Choose the pronoun',
    'Reflexive pronouns (myself, themselves …) when the subject and object are the same; each other when two people do it to one another.',
    'Đại từ phản thân (myself, themselves …) khi chủ ngữ và tân ngữ là một; each other khi hai người làm cho nhau.'));
  register(56, 'possessive-pronouns', 'possessive-pronouns', frames('poss-pronoun', POSSESSIVE_PRONOUN_ITEMS, 'Choose the possessive word',
    'mine, yours, his, hers, ours, theirs stand alone with no apostrophe. Whose = of whom; who\'s = who is; its = of it.',
    'mine, yours, his, hers, ours, theirs đứng một mình, không có dấu \'. Whose = của ai; who\'s = who is; its = của nó.'));
  register(56, 'possessive-s', 'possessive-s', frames('poss-s', POSSESSIVE_S_ITEMS, 'Show who owns it',
    'Singular nouns and irregular plurals add \'s (the children\'s); regular plurals in -s add only \' (my parents\').',
    'Danh từ số ít và số nhiều bất quy tắc thêm \'s (the children\'s); danh từ số nhiều tận cùng -s chỉ thêm \' (my parents\').'));
  // Unit 57: work words.
  registerWordUnit(57, WORK_WORDS, 'work', 'work-meaning');
}
