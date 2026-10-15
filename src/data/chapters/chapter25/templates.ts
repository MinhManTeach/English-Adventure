import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { FIRST_CONDITIONS, UNLESS_ITEMS, MODAL_ITEMS, IMPERATIVE_ITEMS, IMAGINARY, WERE_STATES, REAL_OR_UNREAL, HEALTH_WORDS } from './content';

const thirdOf = (base: string) => /(ch|sh|s|x)$/.test(base) ? `${base}es` : `${base}s`;
const ingOf = (base: string) => ({ be: 'being', see: 'seeing', 'put up': 'putting up' } as Record<string, string>)[base] ?? (base.endsWith('e') ? `${base.slice(0, -1)}ing` : `${base}ing`);
const fill = (gap: string, answer: string) => gap.replace(/ \([^)]*\)$/, '').replace('___', answer);

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  // A2 Unit 31 (id 73): first conditional with will / won't, unless, modals and imperatives.
  for (const form of ['if-clause', 'wont-result', 'unless'] as const) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) {
      const p = s.pronoun, dont = s.third ? "doesn't" : "don't";
      if (form === 'unless') {
        for (const [j, u] of UNLESS_ITEMS.entries()) {
          const present = s.third ? u.third : u.base, obj = u.obj ? ` ${u.obj}` : '';
          const choices = [`${dont} ${u.base}`, `will ${u.base}`, s.third ? u.base : u.third];
          const start = `Unless ${s.text}`, end = `${obj}, ${p} ${u.result}.`, correct = `${start} ${present}${end}`, gap = `${start} ___${end} (${u.base})`;
          frames.push(withContext(frame(`unless-${i}-${j}`, correct, choices.map(x => `${start} ${x}${end}`), gap, present, choices, `Unless means "if ... not": ${gap}`,
            `Unless = if ... not, so the verb after unless is positive and in the present simple. ${correct}`,
            'Unless = if ... not (trừ khi), nên động từ sau unless ở thể khẳng định, thì hiện tại đơn. Không dùng don\'t hay will sau unless.'), `unless:${u.base}`, s.text));
        }
        continue;
      }
      for (const [j, c] of FIRST_CONDITIONS.entries()) {
        const present = s.third ? c.third : c.base, head = `If ${s.text} ${present} ${c.obj}, ${p}`;
        if (form === 'if-clause') {
          const choices = [`will ${c.base}`, c.past, s.third ? c.base : c.third];
          const correct = `${head} will ${c.result}.`, gap = `If ${s.text} ___ ${c.obj}, ${p} will ${c.result}. (${c.base})`;
          frames.push(withContext(frame(`if-${i}-${j}`, correct, choices.map(x => `If ${s.text} ${x} ${c.obj}, ${p} will ${c.result}.`), gap, present, choices,
            `Complete the if-clause: ${gap}`, `First conditional: If + present simple, will + base verb. Never put will in the if-clause. ${correct}`,
            'Câu điều kiện loại 1: If + hiện tại đơn, will + động từ nguyên mẫu. Không dùng will trong mệnh đề if.'), `if:${c.base}`, s.text));
        } else {
          const choices = ["willn't", 'not will', "won't to"];
          const correct = `${head} won't ${c.noResult}.`, gap = `${head} ___ ${c.noResult}. (not)`;
          frames.push(withContext(frame(`wont-${i}-${j}`, correct, choices.map(x => `${head} ${x} ${c.noResult}.`), gap, "won't", choices,
            `Say what will not happen: ${gap}`, `The negative result is won't (= will not) + base verb. ${correct}`,
            "Kết quả phủ định dùng won't (= will not) + động từ nguyên mẫu."), `if:${c.base}`, s.text));
        }
      }
    }
    register(73, 'first-conditional', form, frames);
  }
  register(73, 'first-conditional', 'modal-result', MODAL_ITEMS.map(([gap, answer], i) => {
    const choices = [`to ${answer}`, thirdOf(answer), `will ${answer}`], correct = fill(gap, answer);
    return withContext(frame(`modal-${i}`, correct, choices.map(x => fill(gap, x)), gap, answer, choices, `Use the base verb after the modal: ${gap}`,
      `The result can use can, might, may, should or must + base verb (no to, no -s). ${correct}`,
      'Mệnh đề kết quả có thể dùng can, might, may, should, must + động từ nguyên mẫu (không có to, không thêm -s).'), `modal:${i}`);
  }));
  register(73, 'first-conditional', 'imperative-result', IMPERATIVE_ITEMS.map(([gap, answer], i) => {
    const choices = [`will ${answer}`, `to ${answer}`, ingOf(answer)], correct = fill(gap, answer);
    return withContext(frame(`imperative-${i}`, correct, choices.map(x => fill(gap, x)), gap, answer, choices, `Give an instruction in the result: ${gap}`,
      `If + present simple, then an imperative (base verb, no subject) to tell someone what to do. ${correct}`,
      'If + hiện tại đơn, sau đó là câu mệnh lệnh (động từ nguyên mẫu, không có chủ ngữ) để bảo ai đó làm gì.'), `imperative:${i}`);
  }));

  // A2 Unit 32 (id 74): second conditional for imaginary situations.
  for (const form of ['if-past', 'would-result', 'wouldnt-result'] as const) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, c] of IMAGINARY.entries()) {
      const p = s.pronoun, head = `If ${s.text} ${c.past} ${c.obj}, ${p}`;
      let correct = `${head} would ${c.result}.`, gap: string, answer: string, choices: string[], errors: string[], clue: string, en: string, vi: string;
      if (form === 'if-past') {
        answer = c.past; choices = [`would ${c.base}`, s.third ? c.third : c.base, `will ${c.base}`];
        gap = `If ${s.text} ___ ${c.obj}, ${p} would ${c.result}. (${c.base})`; errors = choices.map(x => `If ${s.text} ${x} ${c.obj}, ${p} would ${c.result}.`);
        clue = `Imagine it. Complete the if-clause: ${gap}`;
        en = `Second conditional: If + past simple, would + base verb, for imaginary situations. ${correct}`;
        vi = 'Câu điều kiện loại 2: If + quá khứ đơn, would + động từ nguyên mẫu, dùng cho tình huống không có thật ở hiện tại.';
      } else if (form === 'would-result') {
        answer = 'would'; choices = ['will', 'would to', s.be];
        gap = `${head} ___ ${c.result}.`; errors = choices.map(x => `${head} ${x} ${c.result}.`);
        clue = `Imagine the result: ${gap}`;
        en = `After an if-clause in the past simple, the result uses would + base verb, not will. ${correct}`;
        vi = 'Khi mệnh đề if ở quá khứ đơn (điều không có thật), mệnh đề kết quả dùng would + động từ nguyên mẫu, không dùng will.';
      } else {
        correct = `${head} wouldn't ${c.noResult}.`; answer = "wouldn't"; choices = ["won't", 'not would', "wouldn't to"];
        gap = `${head} ___ ${c.noResult}. (not)`; errors = choices.map(x => `${head} ${x} ${c.noResult}.`);
        clue = `Imagine what would not happen: ${gap}`;
        en = `The negative is wouldn't (= would not) + base verb. ${correct}`;
        vi = "Phủ định là wouldn't (= would not) + động từ nguyên mẫu.";
      }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `imagine:${c.base}`, s.text));
    }
    register(74, 'second-conditional', form, frames);
  }
  const plural = (s: (typeof SUBJECTS)[number]) => ['we', 'they'].includes(s.pronoun);
  register(74, 'second-conditional', 'if-were', SUBJECTS.flatMap((s, i) => WERE_STATES.flatMap(([state, result], j) => {
    if (plural(s) && /^(a|the) /.test(state)) return [];
    const choices = [s.be, 'will be', 'would be'], start = `If ${s.text}`, end = `${state}, ${s.pronoun} would ${result}.`;
    const correct = `${start} were ${end}`, gap = `${start} ___ ${end}`;
    return [withContext(frame(`were-${i}-${j}`, correct, choices.map(x => `${start} ${x} ${end}`), gap, 'were', choices, `Imagine it: ${gap}`,
      `In the second conditional we can use were with every subject: If I were, if she were. ${correct}`,
      'Trong câu điều kiện loại 2, động từ to be dùng were cho mọi chủ ngữ: If I were, if she were.'), `were:${state}`, s.text)];
  })));
  register(74, 'second-conditional', 'real-or-imaginary', REAL_OR_UNREAL.map(([gap, answer, hint], i) => {
    const choices = [answer === 'will' ? 'would' : 'will', 'did', 'to'], correct = gap.replace('___', answer);
    const first = answer === 'will';
    return withContext(frame(`real-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, choices, `Real or imaginary (${hint})? ${gap}`,
      `${first ? 'A real possibility: If + present simple, will + base verb.' : 'An imaginary situation: If + past simple, would + base verb.'} ${correct}`,
      first ? 'Tình huống có thể xảy ra: If + hiện tại đơn, will + động từ nguyên mẫu.' : 'Tình huống tưởng tượng: If + quá khứ đơn, would + động từ nguyên mẫu.'), `real:${i}`);
  }));

  // A2 Unit 33 (id 75): health and fitness words.
  registerWordUnit(75, HEALTH_WORDS, 'health', 'health-meaning');
}
