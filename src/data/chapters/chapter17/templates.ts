import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { SCENES, SPELLING, WHILE_DURING, VERB_TO, VERB_ING, PREP_ING, OBJECT_TO, OBJECT_FORM, ING_SUBJECT, ADJ_TO, SPORT_WORDS } from './content';

const wasWere = (be: string) => be === 'are' ? 'were' : 'was';
const pronounWas = (pronoun: string) => ['you', 'we', 'they'].includes(pronoun) ? 'were' : 'was';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // A2 Unit 7: Past Continuous: -ing spelling, What were you doing?, negatives, when / while with Past Simple, while / during.
  for (const form of ['ing-spelling', 'what-question', 'negative', 'interrupted', 'while-short-action']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) {
      const subject = cap(s.text), b = wasWere(s.be), other = b === 'was' ? 'were' : 'was';
      if (form === 'ing-spelling') {
        for (const [j, v] of SPELLING.entries()) {
          const tail = `${v.obj} ${v.moment}`, answer = `${b} ${v.ing}`, correct = `${subject} ${answer} ${tail}.`;
          const choices = [`${b} ${v.wrong[0]}`, `${b} ${v.wrong[1]}`, `${other} ${v.ing}`];
          frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), `${subject} ___ ${tail}. (${v.base})`, answer, choices,
            `Use "${v.base}" in the Past Continuous and spell the -ing form correctly: ${subject} ___ ${tail}.`,
            `Past Continuous: was/were + verb-ing. Spelling: ${v.base} → ${v.ing}. ${correct}`,
            `Quá khứ tiếp diễn: was/were + động từ-ing. Chú ý chính tả: ${v.base} → ${v.ing}.`), `pc-spell:${v.base}`, s.text));
        }
        continue;
      }
      for (const [j, v] of SCENES.entries()) {
        const c = v.cut, cutText = `${c.subject} ${c.past}${c.tail}`;
        let correct: string, answer: string, gap: string, choices: string[], errors: string[], clue: string, en: string, vi: string;
        if (form === 'what-question') {
          if (s.text === 'I') continue;
          const pronoun = s.pronoun === 'you' ? 'I' : s.pronoun, reply = `${cap(pronoun)} ${pronounWas(pronoun)} ${v.ing} ${v.obj}.`;
          answer = b; correct = `What ${b} ${s.text} doing ${v.moment}?`; gap = `What ___ ${s.text} doing ${v.moment}? – ${reply}`;
          choices = [other, 'did', s.be];
          errors = [`What ${other} ${s.text} doing ${v.moment}?`, `What did ${s.text} doing ${v.moment}?`, `What ${s.be} ${s.text} doing ${v.moment}?`];
          clue = `The answer is "${reply}" Ask the question about that past moment.`;
          en = `Ask about an action in progress in the past: What + was/were + subject + doing? ${correct}`;
          vi = 'Hỏi ai đó đang làm gì tại một thời điểm trong quá khứ: What + was/were + chủ ngữ + doing?';
        } else if (form === 'negative') {
          answer = `${b}n't`; correct = `${subject} ${answer} ${v.ing} ${v.obj} when ${cutText}.`; gap = `${subject} ___ ${v.ing} ${v.obj} when ${cutText}. (not)`;
          choices = [`${other}n't`, "didn't", s.be === 'am' ? 'am not' : `${s.be}n't`];
          errors = [`${subject} ${other}n't ${v.ing} ${v.obj} when ${cutText}.`, `${subject} didn't ${v.ing} ${v.obj} when ${cutText}.`, `${subject} ${answer} ${v.base} ${v.obj} when ${cutText}.`];
          clue = `Say that this action was NOT in progress at that moment: ${subject} ___ ${v.ing} ${v.obj} when ${cutText}.`;
          en = `Past Continuous negative: wasn't/weren't + verb-ing, never didn't + verb-ing. ${correct}`;
          vi = "Phủ định quá khứ tiếp diễn: wasn't/weren't + động từ-ing (không dùng didn't + -ing).";
        } else if (form === 'interrupted') {
          answer = `${b} ${v.ing}`; correct = `${subject} ${answer} ${v.obj} when ${cutText}.`; gap = `${subject} ___ ${v.obj} when ${cutText}.`;
          choices = [`${other} ${v.ing}`, `${s.be} ${v.ing}`, `${b} ${v.base}`]; errors = choices.map(x => `${subject} ${x} ${v.obj} when ${cutText}.`);
          clue = `A longer action was in progress, then something short happened: ${gap}`;
          en = `The longer background action uses was/were + verb-ing; the short action after when uses Past Simple. ${correct}`;
          vi = 'Hành động dài đang diễn ra dùng was/were + động từ-ing; hành động ngắn xen vào sau when dùng quá khứ đơn.';
        } else {
          answer = c.past; const opening = `While ${s.text} ${b} ${v.ing} ${v.obj}, ${c.subject}`;
          correct = `${opening} ${c.past}${c.tail}.`; gap = `${opening} ___${c.tail}. (${c.base})`;
          choices = [c.wrong, c.third, c.base]; errors = choices.map(x => `${opening} ${x}${c.tail}.`);
          clue = `While + the long action, then the short action in the Past Simple: ${opening} ___${c.tail}.`;
          en = `While goes with the longer action (Past Continuous). The short action uses Past Simple: ${c.base} → ${c.past}. ${correct}`;
          vi = `While đi với hành động dài (quá khứ tiếp diễn). Hành động ngắn dùng quá khứ đơn: ${c.base} → ${c.past}.`;
        }
        frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `pc:${v.base}|${v.obj}`, s.text));
      }
    }
    register(49, 'past-continuous', form, frames);
  }
  register(49, 'while-during', 'while-or-during', SUBJECTS.flatMap((s, i) => WHILE_DURING.map((item, j) => {
    const subject = cap(s.text), useWhile = (i + j) % 2 === 0, pronoun = s.pronoun;
    const after = useWhile ? `${pronoun} ${pronounWas(pronoun)} ${item.ing}` : item.noun, answer = useWhile ? 'while' : 'during';
    const choices = useWhile ? ['during', 'in', 'at'] : ['while', 'when', 'since'];
    const correct = `${subject} ${item.main} ${answer} ${after}.`, gap = `${subject} ${item.main} ___ ${after}.`;
    return withContext(frame(`while-during-${i}-${j}`, correct, choices.map(x => `${subject} ${item.main} ${x} ${after}.`), gap, answer, choices,
      `${useWhile ? 'A subject and verb follow the gap' : 'Only a noun follows the gap'}: ${gap}`,
      `while + subject + verb (often Past Continuous); during + a noun. ${correct}`,
      'while + chủ ngữ + động từ (thường ở quá khứ tiếp diễn); during + danh từ.'), `pc-during:${item.noun}`, s.text);
  })));

  // A2 Unit 8: verb + to-infinitive, verb + -ing, preposition + -ing, verb + object + to, -ing as subject, adjective + to.
  const perSubject = (family: string, items: readonly { verb: string; base: string; ing: string; obj: string }[], useTo: boolean) =>
    SUBJECTS.flatMap((s, i) => items.map((v, j) => {
      const head = `${cap(s.text)} ${v.verb}`, answer = useTo ? `to ${v.base}` : v.ing;
      const choices = useTo ? [v.ing, v.base, `to ${v.ing}`] : [`to ${v.base}`, v.base, `to ${v.ing}`];
      const correct = `${head} ${answer} ${v.obj}.`, gap = `${head} ___ ${v.obj}. (${v.base})`;
      return withContext(frame(`${family}-${i}-${j}`, correct, choices.map(x => `${head} ${x} ${v.obj}.`), gap, answer, choices,
        `Which form follows "${v.verb}"? ${gap}`,
        useTo ? `"${v.verb}" is followed by to + base verb. ${correct}` : `"${v.verb}" is followed by verb-ing. ${correct}`,
        useTo ? `Sau "${v.verb}" dùng to + động từ nguyên mẫu.` : `Sau "${v.verb}" dùng động từ-ing.`), `${family}:${v.verb}|${v.obj}`, s.text);
    }));
  register(50, 'infinitive', 'verb-to', perSubject('verb-to', VERB_TO, true));
  register(50, 'gerund', 'verb-ing', perSubject('verb-ing', VERB_ING, false));
  register(50, 'gerund', 'preposition-ing', SUBJECTS.flatMap((s, i) => PREP_ING.map((v, j) => {
    const head = `${cap(s.text)} ${v.be ? wasWere(s.be) + ' ' : ''}${v.head}`, choices = [`to ${v.base}`, v.base, `to ${v.ing}`];
    const correct = `${head} ${v.ing} ${v.obj}.`, gap = `${head} ___ ${v.obj}. (${v.base})`, prep = v.head.split(' ').at(-1);
    return withContext(frame(`prep-ing-${i}-${j}`, correct, choices.map(x => `${head} ${x} ${v.obj}.`), gap, v.ing, choices,
      `A preposition (${prep}) comes before the gap: ${gap}`,
      `After a preposition such as ${prep}, use verb-ing. ${correct}`, `Sau giới từ (${prep}) dùng động từ-ing.`), `prep-ing:${v.head}|${v.obj}`, s.text);
  })));
  register(50, 'infinitive', 'object-to', SUBJECTS.flatMap((s, i) => OBJECT_TO.map((v, j) => {
    const head = `${v.teller} ${v.verb} ${OBJECT_FORM[s.text]}`, answer = `to ${v.base}`, choices = [v.base, v.ing, `to ${v.ing}`];
    const correct = `${head} ${answer} ${v.obj}.`, gap = `${head} ___ ${v.obj}. (${v.base})`;
    return withContext(frame(`object-to-${i}-${j}`, correct, choices.map(x => `${head} ${x} ${v.obj}.`), gap, answer, choices,
      `${v.verb} + person + ? Complete: ${gap}`, `${v.verb} + person + to + base verb. ${correct}`, `${v.verb} + người + to + động từ nguyên mẫu.`), `object-to:${v.verb}|${v.base}`, s.text);
  })));
  register(50, 'gerund', 'ing-subject', ING_SUBJECT.map((v, i) => {
    const choices = [v.base, v.third, v.past], correct = `${v.ing} ${v.rest}`, gap = `___ ${v.rest} (${v.base.toLowerCase()})`;
    return withContext(frame(`ing-subject-${i}`, correct, choices.map(x => `${x} ${v.rest}`), gap, v.ing, choices,
      `The activity is the subject of the sentence: ${gap}`,
      `An activity as the subject of a sentence uses verb-ing. ${correct}`, 'Khi hoạt động làm chủ ngữ của câu, dùng động từ-ing.'), `ing-subject:${v.base}`);
  }));
  register(50, 'infinitive', 'adjective-to', ADJ_TO.map(([sentence, base, ing], i) => {
    const answer = `to ${base}`, choices = [base, `for ${base}`, `to ${ing}`], correct = sentence.replace('___', answer);
    return withContext(frame(`adjective-to-${i}`, correct, choices.map(x => sentence.replace('___', x)), `${sentence} (${base})`, answer, choices,
      `Adjective, too + adjective or adjective + enough, then a verb: ${sentence} (${base})`,
      `adjective + to + base verb (also too ... to and ... enough to). ${correct}`, 'tính từ + to + động từ nguyên mẫu (cả too … to và … enough to).'), `adjective-to:${i}`);
  }));

  // A2 Unit 9: sport words, each in three authored situations.
  registerWordUnit(51, SPORT_WORDS, 'sport-a2', 'sport-a2-meaning');
}
