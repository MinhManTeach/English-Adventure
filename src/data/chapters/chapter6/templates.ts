import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { EXPERIENCES } from '../chapter5/content';
import { FINISHED_TIMES, PERFECT_MARKERS, PLANS, FUTURE_TIMES, EVIDENCE, SPORT_WORDS } from './content';

const haveOf = (third: boolean) => third ? 'has' : 'have';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 16: Present Perfect (no finished time) or Past Simple (finished time).
  for (const form of ['finished-time', 'ever-answer', 'past-time-word', 'yet-or-time', 'when-question', 'just-participle']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of EXPERIENCES.entries()) {
      if (form === 'ever-answer' && s.text === 'I') continue;
      const subject = cap(s.text), have = haveOf(s.third), neg = `${have}n't`, time = FINISHED_TIMES[(i + j) % FINISHED_TIMES.length];
      const pronoun = s.pronoun === 'you' ? 'I' : s.pronoun;
      let correct = `${subject} ${v.past} ${v.object} ${time}.`, answer: string = v.past, gap = `${subject} ___ ${v.object} ${time}.`;
      let choices = [`${have} ${v.pp}`, v.base, `${haveOf(!s.third)} ${v.pp}`];
      let errors = choices.map(x => `${subject} ${x} ${v.object} ${time}.`), clue = `"${time}" is a finished time. Complete: ${gap}`;
      let en = `With a finished time like "${time}", use Past Simple, not Present Perfect. ${correct}`, vi = `Có thời gian đã kết thúc như "${time}" thì dùng quá khứ đơn, không dùng hiện tại hoàn thành.`;
      if (form === 'ever-answer') { correct = `${cap(have)} ${s.text} ever ${v.pp} ${v.object}? Yes, ${pronoun} ${v.past} ${v.object} ${time}.`; gap = `${cap(have)} ${s.text} ever ${v.pp} ${v.object}? Yes, ${pronoun} ___ ${v.object} ${time}.`; const ph = ['he', 'she'].includes(pronoun) ? 'has' : 'have'; choices = [`${ph} ${v.pp}`, v.pp !== v.past ? v.pp : `${ph} ${v.base}`, v.base]; errors = choices.map(x => `${cap(have)} ${s.text} ever ${v.pp} ${v.object}? Yes, ${pronoun} ${x} ${v.object} ${time}.`); clue = `The question has no time, but the answer says when. Complete the answer.`; en = `The question asks about experience (Present Perfect). The answer gives a finished time, so it uses Past Simple. ${correct}`; vi = 'Câu hỏi về trải nghiệm dùng hiện tại hoàn thành; câu trả lời có thời gian cụ thể nên dùng quá khứ đơn.'; }
      if (form === 'past-time-word') { answer = time; gap = `${subject} ${v.past} ${v.object} ___.`; choices = [...PERFECT_MARKERS]; errors = choices.map(x => `${subject} ${v.past} ${v.object} ${x}.`); clue = `Past Simple needs a finished time. Complete: ${gap}`; en = `Past Simple goes with finished times like "${time}". yet, ever and since go with Present Perfect. ${correct}`; vi = `Quá khứ đơn đi với thời gian đã kết thúc như "${time}"; yet, ever, since đi với hiện tại hoàn thành.`; }
      if (form === 'yet-or-time') { correct = `${subject} ${neg} ${v.pp} ${v.object} yet.`; answer = 'yet'; gap = `${subject} ${neg} ${v.pp} ${v.object} ___.`; choices = FINISHED_TIMES.filter((_, k) => k !== (i + j) % FINISHED_TIMES.length).slice(0, 3); errors = choices.map(x => `${subject} ${neg} ${v.pp} ${v.object} ${x}.`); clue = `Present Perfect cannot have a finished time. Complete: ${gap}`; en = `Present Perfect goes with yet, not with finished times. ${correct}`; vi = 'Hiện tại hoàn thành đi với yet, không đi với thời gian đã kết thúc.'; }
      if (form === 'when-question') { if (s.text === 'I') continue; correct = `When did ${s.text} ${v.base} ${v.object}?`; answer = 'did'; gap = `When ___ ${s.text} ${v.base} ${v.object}?`; choices = [have, haveOf(!s.third), s.third ? 'does' : 'do']; errors = [`When ${have} ${s.text} ${v.pp} ${v.object}?`, `When did ${s.text} ${v.past} ${v.object}?`, `When ${s.third ? 'does' : 'do'} ${s.text} ${v.past} ${v.object}?`]; clue = `"When" asks for a finished time. Complete: ${gap}`; en = `Questions with When use Past Simple: When did …? ${correct}`; vi = 'Câu hỏi với When dùng quá khứ đơn: When did …?'; }
      if (form === 'just-participle') { correct = `${subject} ${have} just ${v.pp} ${v.object}.`; answer = v.pp; gap = `${subject} ${have} just ___ ${v.object}. (${v.base})`; choices = [...new Set([v.past, v.wrong, v.base, v.third])].filter(x => x !== v.pp).slice(0, 3); errors = choices.map(x => `${subject} ${have} just ${x} ${v.object}.`); clue = `It happened a moment ago. Write "${v.base}" after have/has just.`; en = `have/has just + past participle = a moment ago. ${correct}`; vi = 'have/has just + quá khứ phân từ = vừa mới.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `experience:${v.base}|${v.object}`, s.text));
    }
    register(16, 'perfect-or-past', form, frames);
  }
  // Unit 17: will for predictions and decisions, be going to for plans and predictions we can see.
  for (const form of ['will', 'wont', 'will-question', 'going-to', 'not-going-to', 'going-to-question']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, p] of PLANS.entries()) {
      if (form === 'going-to-question' && s.text === 'I') continue;
      const subject = cap(s.text), b = s.be, other = b === 'is' ? 'are' : 'is', time = FUTURE_TIMES[(i + j) % FUTURE_TIMES.length], tail = `${p.base} ${p.object} ${time}`;
      const beNot = b === 'am' ? 'am not' : `${b}n't`;
      let correct = `${subject} will ${tail}.`, answer = 'will', gap = `${subject} ___ ${tail}.`, choices = ['wills', 'is will', 'will to'];
      let errors = [`${subject} will ${p.third} ${p.object} ${time}.`, `${subject} will to ${tail}.`, `${subject} wills ${tail}.`], clue = `Make a prediction about the future. Complete: ${gap}`;
      let en = `will + base verb is the same for every subject. ${correct}`, vi = 'will + động từ nguyên mẫu, giống nhau cho mọi chủ ngữ.';
      if (form === 'wont') { correct = `${subject} won't ${tail}.`; answer = "won't"; gap = `${subject} ___ ${tail}. (not)`; choices = ["don't", "willn't", beNot]; errors = [`${subject} don't ${tail}.`, `${subject} won't ${p.third} ${p.object} ${time}.`, `${subject} willn't ${tail}.`]; clue = `Say no about the future: ${gap}`; en = `The negative of will is won't (will not). ${correct}`; vi = "Phủ định của will là won't (will not)."; }
      if (form === 'will-question') { correct = `Will ${s.text} ${tail}?`; answer = 'Will'; gap = `___ ${s.text} ${tail}?`; choices = ['Did', cap(b), s.third ? 'Does' : 'Do']; errors = [`Will ${s.text} ${p.third} ${p.object} ${time}?`, `Did ${s.text} ${tail}?`, `${cap(b)} ${s.text} ${tail}?`]; clue = `Ask about the future: ${gap}`; en = `Questions: Will + subject + base verb? ${correct}`; vi = 'Câu hỏi: Will + chủ ngữ + động từ nguyên mẫu?'; }
      if (form === 'going-to') { correct = `${subject} ${b} going to ${tail}.`; answer = `${b} going to`; gap = `${subject} ___ ${tail}. (It's a plan.)`; choices = [`${other} going to`, `${b} going`, 'going to']; errors = choices.map(x => `${subject} ${x} ${tail}.`); clue = `Talk about a plan you have already made. Complete: ${gap}`; en = `Plans: am/is/are + going to + base verb. ${correct}`; vi = 'Kế hoạch đã định: am/is/are + going to + động từ nguyên mẫu.'; }
      if (form === 'not-going-to') { correct = `${subject} ${beNot} going to ${tail}.`; answer = beNot; gap = `${subject} ___ going to ${tail}.`; choices = ["won't", s.third ? "doesn't" : "don't", b === 'is' ? "aren't" : "isn't"]; errors = choices.map(x => `${subject} ${x} going to ${tail}.`); clue = `Say there is no plan: ${gap}`; en = `Negative plans: am not / isn't / aren't + going to. ${correct}`; vi = "Phủ định kế hoạch: am not / isn't / aren't + going to."; }
      if (form === 'going-to-question') { correct = `${cap(b)} ${s.text} going to ${tail}?`; answer = cap(b); gap = `___ ${s.text} going to ${tail}?`; choices = [cap(other), 'Will', s.third ? 'Does' : 'Do']; errors = [`${cap(other)} ${s.text} going to ${tail}?`, `Will ${s.text} going to ${tail}?`, `${cap(b)} ${s.text} going ${tail}?`]; clue = `Ask about someone's plan: ${gap}`; en = `Questions about plans: Am/Is/Are + subject + going to …? ${correct}`; vi = 'Hỏi về kế hoạch: Am/Is/Are + chủ ngữ + going to …?'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `plan:${p.base}|${p.object}`, s.text));
    }
    register(17, 'will-going-to', form, frames);
  }
  {
    const frames: ControlledFrame[] = EVIDENCE.map((e, i) => {
      const other = e.be === 'is' ? 'are' : 'is';
      const correct = `${e.clue} ${e.subject} ${e.be} going to ${e.verb}.`, gap = `${e.clue} ${e.subject} ___ ${e.verb}.`;
      const choices = [`${other} going to`, `${e.be} going`, 'going to'];
      return withContext(frame(`evidence-${i}`, correct, choices.map(x => `${e.clue} ${e.subject} ${x} ${e.verb}.`), gap, `${e.be} going to`, choices, `We can see what will happen. ${gap}`,
        `When we can see something coming, use be going to. ${correct}`, 'Khi thấy rõ dấu hiệu sắp xảy ra, dùng be going to.'), `evidence:${i}`, e.subject.toLowerCase());
    });
    register(17, 'going-to-evidence', 'evidence', frames);
  }
  // Unit 18: sports and healthy lifestyle words.
  registerWordUnit(18, SPORT_WORDS, 'sport', 'sport-meaning');
}
