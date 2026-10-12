import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { WHO_ITEMS, WHICH_ITEMS, WHERE_ITEMS, WHOSE_ITEMS, RELATIVES, CONDITIONS, JOB_WORDS } from './content';

const RELATIVE_RULES = {
  who: ['Use who for people.', 'Dùng who cho người.'],
  which: ['Use which for things and animals.', 'Dùng which cho đồ vật và con vật.'],
  where: ['Use where for places.', 'Dùng where cho nơi chốn.'],
  whose: ['Use whose to show that something belongs to someone.', 'Dùng whose để chỉ sự sở hữu.'],
} as const;

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 34: relative pronouns who / which / where / whose.
  const relative = (items: readonly (readonly [string, string])[], answer: typeof RELATIVES[number]) => items.map(([gap, key], i) => {
    const choices = RELATIVES.filter(r => r !== answer), correct = gap.replace('___', answer);
    return withContext(frame(`${answer}-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, [...choices], `Person, thing, place or owner? ${gap}`,
      `${RELATIVE_RULES[answer][0]} ${correct}`, RELATIVE_RULES[answer][1]), `relative:${key}|${answer}`);
  });
  register(34, 'relative-clauses', 'who-which', [...relative(WHO_ITEMS, 'who'), ...relative(WHICH_ITEMS, 'which')]);
  register(34, 'relative-clauses', 'where-whose', [...relative(WHERE_ITEMS, 'where'), ...relative(WHOSE_ITEMS, 'whose')]);
  // Unit 35: first conditional, If + present simple, will / won't + base verb.
  for (const form of ['if-present', 'will-result', 'wont-result', 'result-first']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, c] of CONDITIONS.entries()) {
      const subject = cap(s.text), present = s.third ? c.third : c.base, p = s.pronoun, dont = s.third ? "doesn't" : "don't";
      let correct = `If ${s.text} ${present} ${c.obj}, ${p} will ${c.result}.`, answer: string = present, gap = `If ${s.text} ___ ${c.obj}, ${p} will ${c.result}. (${c.base})`;
      let choices: string[] = [...new Set([`will ${c.base}`, c.past, s.third ? c.base : c.third, `will ${present}`])].filter(x => x !== present).slice(0, 3);
      let errors = choices.map(x => `If ${s.text} ${x} ${c.obj}, ${p} will ${c.result}.`), clue = `Complete the if-clause: ${gap}`;
      let en = `First conditional: If + present simple, will + base verb. Don't use will after if. ${correct}`, vi = 'Câu điều kiện loại 1: If + hiện tại đơn, will + động từ nguyên mẫu. Không dùng will sau if.';
      if (form === 'will-result') { answer = 'will'; gap = `If ${s.text} ${present} ${c.obj}, ${p} ___ ${c.result}.`; choices = ['wills', s.be, 'to']; errors = choices.map(x => `If ${s.text} ${present} ${c.obj}, ${p} ${x} ${c.result}.`); clue = `Say what will happen: ${gap}`; en = `The result uses will + base verb. ${correct}`; vi = 'Mệnh đề kết quả dùng will + động từ nguyên mẫu.'; }
      if (form === 'wont-result') { correct = `If ${s.text} ${dont} ${c.base} ${c.obj}, ${p} won't ${c.result}.`; answer = "won't"; gap = `If ${s.text} ${dont} ${c.base} ${c.obj}, ${p} ___ ${c.result}. (not)`; choices = ['not will', `${s.be === 'am' ? "am not" : `${s.be}n't`}`, "willn't"]; errors = choices.map(x => `If ${s.text} ${dont} ${c.base} ${c.obj}, ${p} ${x} ${c.result}.`); clue = `Say what will not happen: ${gap}`; en = `The negative of will is won't (will not). ${correct}`; vi = "Phủ định của will là won't (will not)."; }
      if (form === 'result-first') { correct = `${subject} will ${c.result} if ${p} ${present} ${c.obj}.`; gap = `${subject} will ${c.result} if ${p} ___ ${c.obj}. (${c.base})`; errors = choices.map(x => `${subject} will ${c.result} if ${p} ${x} ${c.obj}.`); clue = `The if-clause comes second: ${gap}`; en = `The if-clause can come second, with no comma. ${correct}`; vi = 'Mệnh đề if có thể đứng sau, khi đó không cần dấu phẩy.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `if:${c.base}|${c.obj}`, s.text));
    }
    register(35, 'first-conditional', form, frames);
  }
  // Unit 36: jobs.
  registerWordUnit(36, JOB_WORDS, 'jobs', 'jobs-meaning');
}
