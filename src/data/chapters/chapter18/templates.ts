import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { RESULTS, PLACES, TASKS, SUPERLATIVES, STATES, FOR_PERIODS, SINCE_POINTS, SINCE_AGES, FINISHED, AGO_PERIODS, SCHOOL_A2_WORDS } from './content';

const haveOf = (third: boolean) => third ? 'has' : 'have';
const pronounHave = (pronoun: string) => ['he', 'she'].includes(pronoun) ? 'has' : 'have';
const pronounBe = (pronoun: string) => pronoun === 'I' ? 'am' : ['he', 'she'].includes(pronoun) ? 'is' : 'are';
const pronounWas = (pronoun: string) => ['you', 'we', 'they'].includes(pronoun) ? 'were' : 'was';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // A2 Unit 10: irregular participles, present results, been / gone, just / already / yet, superlative + ever.
  for (const form of ['participle', 'result-now']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of RESULTS.entries()) {
      const subject = cap(s.text), have = haveOf(s.third), other = haveOf(!s.third);
      let correct: string, answer: string, gap: string, choices: string[], clue: string, en: string, vi: string;
      if (form === 'participle') {
        correct = `${subject} ${have} ${v.pp} ${v.obj}.`; answer = v.pp; gap = `${subject} ${have} ___ ${v.obj}. (${v.base})`; choices = [...v.wrong];
        clue = `Write the past participle of "${v.base}": ${gap}`;
        en = `${v.base} is irregular: ${v.base} – ${v.past} – ${v.pp}. After have/has use the past participle. ${correct}`;
        vi = `${v.base} là động từ bất quy tắc: ${v.base} – ${v.past} – ${v.pp}. Sau have/has dùng quá khứ phân từ (cột 3).`;
        frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${subject} ${have} ${x} ${v.obj}.`), gap, answer, choices, clue, en, vi), `pp-result:${v.base}`, s.text));
      } else {
        const tail = `${v.obj}, so ${v.result}`;
        correct = `${subject} ${have} ${v.pp} ${tail}.`; answer = `${have} ${v.pp}`; gap = `${subject} ___ ${tail}. (${v.base})`;
        choices = [`${other} ${v.pp}`, `${have} ${v.wrong[0]}`, `${s.be} ${v.pp}`];
        clue = `Something happened and we can see the result now: ${gap}`;
        en = `Present Perfect (have/has + past participle) links a past action to a result now. ${correct}`;
        vi = 'Hiện tại hoàn thành (have/has + quá khứ phân từ) nối hành động trong quá khứ với kết quả ở hiện tại.';
        frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), gap, answer, choices, clue, en, vi), `pp-result:${v.base}`, s.text));
      }
    }
    register(52, 'present-perfect', form, frames);
  }
  register(52, 'been-gone', 'been-or-gone', SUBJECTS.filter(s => !['I', 'you', 'we'].includes(s.text)).flatMap((s, i) => PLACES.map((place, j) => {
    const subject = cap(s.text), have = haveOf(s.third), pronoun = s.pronoun, be = pronounBe(pronoun), gone = (i + j) % 2 === 0;
    const answer = gone ? 'gone' : 'been', choices = [gone ? 'been' : 'gone', 'went', 'go'];
    const sentence = (x: string) => gone ? `${subject} ${have} ${x} to ${place}, so ${pronoun} ${be}n't here now.` : `${subject} ${have} just ${x} to ${place}, and ${pronoun} ${be} back now.`;
    const gap = sentence('___');
    return withContext(frame(`been-gone-${i}-${j}`, sentence(answer), choices.map(sentence), gap, answer, choices,
      gone ? `They went there and they are still there: ${gap}` : `They went there and came back: ${gap}`,
      `has gone to = went and is still there; has been to = went and came back. ${sentence(answer)}`,
      'has gone to = đã đi và vẫn đang ở đó; has been to = đã đến đó và đã quay về.'), `pp-place:${place}`, s.text);
  })));
  register(52, 'just-already-yet', 'time-words', SUBJECTS.flatMap((s, i) => TASKS.map((t, j) => {
    const subject = cap(s.text), have = haveOf(s.third), kind = (i + j) % 4;
    const build = (x: string) => kind === 0 ? `${cap(have)} ${s.text} ${t.pp} ${t.obj} ${x}?` : kind === 1 ? `${subject} ${have}n't ${t.pp} ${t.obj} ${x}.`
      : kind === 2 ? `${subject} ${have} ${x} ${t.pp} ${t.obj}, so ${t.result}.` : `${subject} ${have} ${x} ${t.pp} ${t.obj}, so nobody needs to do it now.`;
    const answer = ['yet', 'yet', 'just', 'already'][kind], choices = kind < 2 ? ['just', 'never', 'still'] : ['yet', 'ever', 'still'];
    const gap = build('___');
    const clue = [`Ask if it has happened: ${gap}`, `It hasn't happened, but we expect it: ${gap}`, `It happened a moment ago: ${gap}`, `It happened sooner than we thought: ${gap}`][kind];
    const en = ['yet goes at the end of questions and negatives.', 'yet goes at the end of questions and negatives.', 'just (= a moment ago) goes between have/has and the past participle.', 'already (= sooner than expected) goes between have/has and the past participle.'][kind];
    const vi = ['yet (chưa) đứng cuối câu hỏi và câu phủ định.', 'yet (chưa) đứng cuối câu hỏi và câu phủ định.', 'just (vừa mới) đứng giữa have/has và quá khứ phân từ.', 'already (đã … rồi) đứng giữa have/has và quá khứ phân từ.'][kind];
    return withContext(frame(`jay-${i}-${j}`, build(answer), choices.map(build), gap, answer, choices, clue, `${en} ${build(answer)}`, vi), `pp-task:${t.obj}`, s.text);
  })));
  register(52, 'present-perfect', 'ever-superlative', SUBJECTS.flatMap((s, i) => SUPERLATIVES.map((x, j) => {
    const build = (w: string) => `This is ${x.thing} ${s.text} ${haveOf(s.third)} ${w} ${x.pp}.`, choices = ['never', 'yet', 'already'], gap = build('___');
    return withContext(frame(`ever-${i}-${j}`, build('ever'), choices.map(build), gap, 'ever', choices, `Superlative + Present Perfect: ${gap}`,
      `the best / the most … + have/has ever + past participle. ${build('ever')}`, 'Cấu trúc so sánh nhất + have/has ever + quá khứ phân từ (… nhất từng …).'), `pp-ever:${x.thing}`, s.text);
  })));

  // A2 Unit 11: for / since, since + past clause, How long vs When, Present Perfect vs Past Simple, ago vs for.
  for (const form of ['for-since', 'since-clause', 'how-long-or-when', 'perfect-or-past', 'ago-or-for']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of STATES.entries()) {
      if (form === 'how-long-or-when' && s.text === 'I') continue;
      const subject = cap(s.text), have = haveOf(s.third), other = haveOf(!s.third), present = s.third ? v.third : v.base, k = i + j, even = k % 2 === 0;
      const perfect = `${subject} ${have} ${v.pp} ${v.obj}`;
      let build: (x: string) => string, answer: string, choices: string[], clue: string, en: string, vi: string;
      if (form === 'for-since') {
        const time = even ? FOR_PERIODS[k % FOR_PERIODS.length] : SINCE_POINTS[k % SINCE_POINTS.length];
        build = x => `${perfect} ${x} ${time}.`; answer = even ? 'for' : 'since'; choices = even ? ['since', 'ago', 'during'] : ['for', 'ago', 'yet'];
        clue = `"${time}" is ${even ? 'a length of time' : 'a starting point'}: ${build('___')}`;
        en = `for + a length of time (for ages, for a long time); since + a starting point (since Tết, since 2020). ${build(answer)}`;
        vi = 'for + khoảng thời gian (for ages, for a long time); since + mốc thời gian (since Tết, since 2020).';
      } else if (form === 'since-clause') {
        const pronoun = s.pronoun, age = SINCE_AGES[k % SINCE_AGES.length], was = pronounWas(pronoun);
        build = x => `${perfect} since ${pronoun} ${x} ${age}.`; answer = was; choices = [pronounBe(pronoun), `${pronounHave(pronoun)} been`, was === 'was' ? 'were' : 'was'];
        clue = `The starting point is a finished time in the past: ${build('___')}`;
        en = `since + a past clause: the clause after since uses the Past Simple. ${build(answer)}`;
        vi = 'since + mệnh đề chỉ mốc quá khứ: mệnh đề sau since dùng quá khứ đơn.';
      } else if (form === 'how-long-or-when') {
        if (even) {
          build = x => `How long ${x} ${s.text} ${v.pp} ${v.obj}?`; answer = have; choices = [other, 'did', s.third ? 'does' : 'do'];
          clue = `Ask about the time from the start until now: ${build('___')}`;
          en = `How long + have/has + subject + past participle? asks about time until now. ${build(answer)}`;
          vi = 'How long + have/has + chủ ngữ + quá khứ phân từ? hỏi khoảng thời gian tính đến hiện tại.';
        } else {
          build = x => x === 'did' ? `When did ${s.text} ${v.start.base}?` : `When ${x} ${s.text} ${v.start.past}?`;
          answer = 'did'; choices = [have, other, s.third ? 'does' : 'do'];
          clue = `Ask about the finished moment it started: When ___ ${s.text} ${v.start.base}?`;
          en = `When asks about a finished time, so use the Past Simple (When did …?), not the Present Perfect. ${build('did')}`;
          vi = 'When hỏi về thời điểm đã qua nên dùng quá khứ đơn (When did …?), không dùng hiện tại hoàn thành.';
          const errors = choices.map(build);
          frames.push(withContext(frame(`${form}-${i}-${j}`, build('did'), errors, `When ___ ${s.text} ${v.start.base}?`, answer, choices, clue, en, vi), `pp-state:${v.base}|${v.obj}`, s.text));
          continue;
        }
      } else if (form === 'perfect-or-past') {
        if (even) {
          const point = SINCE_POINTS[k % SINCE_POINTS.length];
          build = x => `${subject} ${x} ${v.obj} since ${point}.`; answer = `${have} ${v.pp}`; choices = [v.past, present, `${s.be} ${v.ing}`];
          clue = `It started in the past and is still true now: ${build('___')}`;
          en = `since shows the situation continues now, so use the Present Perfect. ${build(answer)}`;
          vi = 'since cho thấy tình huống vẫn còn tiếp diễn nên dùng hiện tại hoàn thành.';
        } else {
          const time = FINISHED[k % FINISHED.length];
          build = x => `${subject} ${x} ${v.obj} ${time}.`; answer = v.past; choices = [`${have} ${v.pp}`, present, `${s.be} ${v.ing}`];
          clue = `"${time}" is a finished time: ${build('___')}`;
          en = `A finished time like "${time}" needs the Past Simple. ${build(answer)}`;
          vi = `Thời gian đã kết thúc như "${time}" thì dùng quá khứ đơn.`;
        }
      } else {
        const period = AGO_PERIODS[k % AGO_PERIODS.length];
        if (even) {
          build = x => `${subject} ${v.start.past} ${period} ${x}.`; answer = 'ago'; choices = ['for', 'since', 'still'];
          clue = `Say when it happened, counting back from now: ${build('___')}`;
          en = `Past Simple + a period + ago says when something happened. ${build(answer)}`;
          vi = 'Quá khứ đơn + khoảng thời gian + ago cho biết việc xảy ra cách đây bao lâu.';
        } else {
          build = x => `${perfect} ${x} ${period}.`; answer = 'for'; choices = ['ago', 'since', 'during'];
          clue = `Say how long it has continued until now: ${build('___')}`;
          en = `Present Perfect + for + a period says how long until now. ${build(answer)}`;
          vi = 'Hiện tại hoàn thành + for + khoảng thời gian cho biết việc kéo dài bao lâu tính đến nay.';
        }
      }
      frames.push(withContext(frame(`${form}-${i}-${j}`, build(answer), choices.map(build), build('___'), answer, choices, clue, en, vi), `pp-state:${v.base}|${v.obj}`, s.text));
    }
    register(53, 'present-perfect-time', form, frames);
  }

  // A2 Unit 12: school words, each in three authored situations.
  registerWordUnit(54, SCHOOL_A2_WORDS, 'school-a2', 'school-a2-meaning');
}
