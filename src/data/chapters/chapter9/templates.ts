import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS, ACTIVITIES } from '../../templates/controlledPools';
import { POSSESSIONS, WH_ITEMS, WH_WORDS, TAG_PREDICATES, PEOPLE_WORDS } from './content';

/** Question words that could also sound right in the same question are never offered as distractors. */
const CLOSE_WH: Record<string, readonly string[]> = { What: ['Which'], Which: ['What', 'Whose'], Whose: ['Which', 'Who'], Who: ['Which', 'Whose'] };

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 25: have got / has got, haven't got, Have … got?, short answers, have / has and Do … have?
  for (const form of ['have-got', 'havent-got', 'got-question', 'got-short-answer', 'has-have', 'do-have']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, item] of POSSESSIONS.entries()) {
      if (['got-question', 'got-short-answer', 'do-have'].includes(form) && s.text === 'I') continue;
      const subject = cap(s.text), has = s.third ? 'has' : 'have', other = s.third ? 'have' : 'has';
      let correct = `${subject} ${has} got ${item}.`, answer = has, gap = `${subject} ___ got ${item}.`, choices = [other, s.be, s.third ? 'does' : 'do'];
      let errors = choices.map(x => `${subject} ${x} got ${item}.`), clue = `Talk about what people have. Complete: ${gap}`;
      let en = `I / you / we / they have got; he / she / it has got. ${correct}`, vi = 'I / you / we / they have got; he / she / it has got.';
      if (form === 'havent-got') { answer = `${has}n't`; correct = `${subject} ${answer} got ${item}.`; gap = `${subject} ___ got ${item}. (not)`; choices = [`${other}n't`, `${s.third ? "doesn't" : "don't"}`, `${s.be === 'am' ? "am not" : `${s.be}n't`}`]; errors = choices.map(x => `${subject} ${x} got ${item}.`); clue = `Say they do not have it: ${gap}`; en = `Negative: haven't got / hasn't got. ${correct}`; vi = "Phủ định: haven't got / hasn't got."; }
      if (form === 'got-question') { answer = cap(has); correct = `${answer} ${s.text} got ${item}?`; gap = `___ ${s.text} got ${item}?`; choices = [cap(other), cap(s.be), s.third ? 'Does' : 'Do']; errors = choices.map(x => `${x} ${s.text} got ${item}?`); clue = `Ask about what someone has: ${gap}`; en = `Questions: Have / Has + subject + got …? ${correct}`; vi = 'Câu hỏi: Have / Has + chủ ngữ + got …?'; }
      if (form === 'got-short-answer') { const p = s.pronoun === 'you' ? 'I' : s.pronoun, ph = ['he', 'she'].includes(p) ? 'has' : 'have', yes = (i + j) % 2 === 0; answer = yes ? ph : `${ph}n't`; correct = `${cap(has)} ${s.text} got ${item}? ${yes ? 'Yes' : 'No'}, ${p} ${answer}.`; gap = `${cap(has)} ${s.text} got ${item}? ${yes ? 'Yes' : 'No'}, ${p} ___.`; choices = yes ? [ph === 'has' ? 'have' : 'has', 'got', 'does'] : [`${ph === 'has' ? 'have' : 'has'}n't`, `${ph}n't got`, "doesn't"]; errors = choices.map(x => correct.replace(new RegExp(`${p} ${answer}\\.$`), `${p} ${x}.`)); clue = `Give a short answer: ${gap}`; en = `Short answers: Yes, … have / has. No, … haven't / hasn't. Don't use got in the short answer. ${correct}`; vi = "Trả lời ngắn: Yes, … have / has. No, … haven't / hasn't. Không dùng got trong câu trả lời ngắn."; }
      if (form === 'has-have') { correct = `${subject} ${has} ${item}.`; gap = `${subject} ___ ${item}.`; choices = [other, `${s.be} having`, 'haves']; errors = choices.map(x => `${subject} ${x} ${item}.`); clue = `Use have or has: ${gap}`; en = `have / has (without got) means the same as have got / has got. ${correct}`; vi = 'have / has (không có got) có nghĩa giống have got / has got.'; }
      if (form === 'do-have') { answer = s.third ? 'Does' : 'Do'; correct = `${answer} ${s.text} have ${item}?`; gap = `___ ${s.text} have ${item}?`; choices = [s.third ? 'Do' : 'Does', cap(has), cap(s.be)]; errors = choices.map(x => `${x} ${s.text} have ${item}?`); clue = `Ask with have (no got): ${gap}`; en = `With have (no got), ask with Do / Does. ${correct}`; vi = 'Với have (không có got), câu hỏi dùng Do / Does.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `have:${item}`, s.text));
    }
    register(25, 'have-got', form, frames);
  }
  // Unit 26: Wh-question words, question tags with be and the present simple, do / does in Wh-questions.
  register(26, 'wh-questions', 'wh-word', WH_ITEMS.map(([gap, answer], i) => {
    const pool = WH_WORDS.filter(w => w !== answer && !(CLOSE_WH[answer] ?? []).includes(w));
    const choices = [0, 1, 2].map(k => pool[(i + k * 2) % pool.length]);
    const correct = gap.replace('___', answer);
    return withContext(frame(`wh-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, choices,
      `Look at the answer and choose the question word: ${gap}`, `Choose the question word that matches the answer. ${correct}`,
      'Chọn từ để hỏi phù hợp với câu trả lời: What (cái gì), Where (ở đâu), When (khi nào), Who (ai), Why (tại sao), How (thế nào), Whose (của ai), Which (cái nào).'), `wh:${answer}|${i}`);
  }));
  for (const form of ['tag-be', 'tag-be-negative', 'tag-do', 'tag-do-negative']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) {
      if (s.text === 'I') continue;
      const p = s.pronoun, be = s.be, wrongBe = be === 'is' ? 'are' : 'is', doo = s.third ? 'does' : 'do', wrongDo = s.third ? 'do' : 'does', subject = cap(s.text);
      const items = form.startsWith('tag-be') ? TAG_PREDICATES.map(x => ({ key: x, pos: `${subject} ${be} ${x}`, neg: `${subject} ${be}n't ${x}` }))
        : ACTIVITIES.slice(0, 12).map(v => ({ key: `${v.base} ${v.object}`, pos: `${subject} ${s.third ? v.third : v.base} ${v.object}`, neg: `${subject} ${doo}n't ${v.base} ${v.object}` }));
      for (const [j, it] of items.entries()) {
        const negative = form.endsWith('negative'), aux = form.startsWith('tag-be') ? be : doo, wrongAux = form.startsWith('tag-be') ? wrongBe : wrongDo;
        const otherKind = form.startsWith('tag-be') ? doo : be;
        const answer = negative ? `${aux} ${p}` : `${aux}n't ${p}`, start = negative ? it.neg : it.pos;
        const choices = negative ? [`${aux}n't ${p}`, `${otherKind} ${p}`, `${wrongAux} ${p}`] : [`${aux} ${p}`, `${otherKind}n't ${p}`, `${wrongAux}n't ${p}`];
        const correct = `${start}, ${answer}?`, gap = `${start}, ___?`;
        frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${start}, ${x}?`), gap, answer, choices, `Add the question tag: ${gap}`,
          `${negative ? 'A negative sentence takes a positive tag' : 'A positive sentence takes a negative tag'}, with the same helping verb and a pronoun. ${correct}`,
          negative ? 'Câu phủ định đi với câu hỏi đuôi khẳng định, cùng trợ động từ, chủ ngữ là đại từ.' : 'Câu khẳng định đi với câu hỏi đuôi phủ định, cùng trợ động từ, chủ ngữ là đại từ.'),
        `tag:${it.key}`, s.text));
      }
    }
    register(26, 'question-tags', form, frames);
  }
  register(26, 'wh-questions', 'wh-do', SUBJECTS.filter(s => s.text !== 'I').flatMap((s, i) => ACTIVITIES.slice(0, 12).map((v, j) => {
    const wh = ['What time', 'Where', 'When', 'How often', 'Why'][(i + j) % 5];
    const tail = `${v.base} ${v.object}`;
    const answer = s.third ? 'does' : 'do', choices = [s.third ? 'do' : 'does', s.be, 'doing'];
    const correct = `${wh} ${answer} ${s.text} ${tail}?`, gap = `${wh} ___ ${s.text} ${tail}?`;
    return withContext(frame(`wh-do-${i}-${j}`, correct, choices.map(x => `${wh} ${x} ${s.text} ${tail}?`), gap, answer, choices,
      `Ask a Wh-question in the present simple: ${gap}`, `Wh-word + do / does + subject + base verb? ${correct}`, 'Từ để hỏi + do / does + chủ ngữ + động từ nguyên mẫu?'),
    `whdo:${v.base}|${v.object}`, s.text);
  })));
  // Unit 27: character and appearance words.
  registerWordUnit(27, PEOPLE_WORDS, 'people', 'people-meaning');
}
