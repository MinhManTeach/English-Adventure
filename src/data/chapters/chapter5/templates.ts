import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { EXPERIENCES, TASKS, LASTING, FOR_PERIODS, SINCE_POINTS, TRAVEL_WORDS } from './content';

const haveOf = (third: boolean) => third ? 'has' : 'have';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 13: Present Perfect for experiences: have/has + past participle, ever/never, already/yet.
  for (const form of ['affirmative', 'participle', 'negative', 'ever-question', 'short-answer', 'never']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of EXPERIENCES.entries()) {
      if ((form === 'ever-question' || form === 'short-answer') && s.text === 'I') continue; // we ask other people about their experiences
      const subject = cap(s.text), have = haveOf(s.third), other = haveOf(!s.third), neg = `${have}n't`;
      const third = v.past !== v.pp ? `${have} ${v.past}` : `${have} ${v.third}`;
      let correct = `${subject} ${have} ${v.pp} ${v.object}.`, answer = `${have} ${v.pp}`, gap = `${subject} ___ ${v.object}.`;
      let choices = [`${other} ${v.pp}`, `${have} ${v.base}`, third];
      let errors = choices.map(x => `${subject} ${x} ${v.object}.`), clue = `Talk about an experience in your life. Complete: ${subject} ___ ${v.object}.`;
      let en = `Present Perfect: have/has + past participle (${v.base} → ${v.pp}). ${correct}`, vi = `Hiện tại hoàn thành: have/has + quá khứ phân từ (${v.base} → ${v.pp}).`;
      if (form === 'participle') { answer = v.pp; gap = `${subject} ${have} ___ ${v.object}. (${v.base})`; choices = [...new Set([v.past, v.wrong, v.base, v.third])].filter(x => x !== v.pp).slice(0, 3); errors = choices.map(x => `${subject} ${have} ${x} ${v.object}.`); clue = `Write the past participle of "${v.base}": ${subject} ${have} ___ ${v.object}.`; en = `The past participle of ${v.base} is ${v.pp}. ${correct}`; vi = `Quá khứ phân từ của ${v.base} là ${v.pp}.`; }
      if (form === 'negative') { correct = `${subject} ${neg} ${v.pp} ${v.object}.`; answer = neg; gap = `${subject} ___ ${v.pp} ${v.object}.`; choices = [`${other}n't`, "didn't", s.third ? "doesn't" : "don't"]; errors = [`${subject} ${other}n't ${v.pp} ${v.object}.`, `${subject} ${neg} ${v.base} ${v.object}.`, `${subject} ${s.third ? "doesn't" : "don't"} ${v.pp} ${v.object}.`]; clue = `Say no: ${subject} ___ ${v.pp} ${v.object}.`; en = `Negative: haven't/hasn't + past participle. ${correct}`; vi = "Phủ định: haven't/hasn't + quá khứ phân từ."; }
      if (form === 'ever-question') { correct = `${cap(have)} ${s.text} ever ${v.pp} ${v.object}?`; answer = cap(have); gap = `___ ${s.text} ever ${v.pp} ${v.object}?`; choices = [cap(other), 'Did', s.third ? 'Does' : 'Do']; errors = [`${cap(other)} ${s.text} ever ${v.pp} ${v.object}?`, `${cap(have)} ${s.text} ever ${v.base} ${v.object}?`, `${s.third ? 'Does' : 'Do'} ${s.text} ever ${v.pp} ${v.object}?`]; clue = `Ask about an experience: ___ ${s.text} ever ${v.pp} ${v.object}?`; en = `Ask about experiences with Have/Has + subject + ever + past participle. ${correct}`; vi = 'Hỏi về trải nghiệm: Have/Has + chủ ngữ + ever + quá khứ phân từ.'; }
      if (form === 'short-answer') { const pronoun = s.pronoun === 'you' ? 'I' : s.pronoun, ph = ['he', 'she'].includes(pronoun) ? 'has' : 'have', yes = (i + j) % 2 === 0, lead = yes ? 'Yes' : 'No'; answer = yes ? ph : `${ph}n't`; correct = `${lead}, ${pronoun} ${answer}.`; gap = `${cap(have)} ${s.text} ever ${v.pp} ${v.object}? ${lead}, ${pronoun} ___.`; choices = yes ? [ph === 'has' ? 'have' : 'has', 'did', ph === 'has' ? 'does' : 'do'] : [`${ph === 'has' ? 'have' : 'has'}n't`, "didn't", 'not']; errors = choices.map(x => `${lead}, ${pronoun} ${x}.`); clue = `Answer ${yes ? 'yes' : 'no'}: ${cap(have)} ${s.text} ever ${v.pp} ${v.object}?`; en = `Short answers: Yes, … have/has. / No, … haven't/hasn't. ${correct}`; vi = "Trả lời ngắn: Yes, … have/has. / No, … haven't/hasn't."; }
      if (form === 'never') { correct = `${subject} ${have} never ${v.pp} ${v.object} before.`; answer = 'never'; gap = `${subject} ${have} ___ ${v.pp} ${v.object} before.`; choices = ['ever', 'yet', 'since']; errors = choices.map(x => `${subject} ${have} ${x} ${v.pp} ${v.object} before.`); clue = `It has not happened at any time in their life. Complete: ${gap}`; en = `never = not at any time in your life. ${correct}`; vi = 'never = chưa bao giờ.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `experience:${v.base}|${v.object}`, s.text));
    }
    register(13, 'present-perfect-experience', form, frames);
  }
  for (const form of ['yet', 'already']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, t] of TASKS.entries()) {
      const subject = cap(s.text), have = haveOf(s.third), neg = `${have}n't`;
      const yet = form === 'yet';
      const correct = yet ? `${subject} ${neg} ${t.pp} ${t.object} yet.` : `${subject} ${have} already ${t.pp} ${t.object}.`;
      const gap = yet ? `${subject} ${neg} ${t.pp} ${t.object} ___.` : `${subject} ${have} ___ ${t.pp} ${t.object}, so we can go now.`;
      const answer = yet ? 'yet' : 'already';
      const choices = yet ? ['already', 'just', 'ever'] : ['yet', 'ever', 'since'];
      const finalCorrect = yet ? correct : `${subject} ${have} already ${t.pp} ${t.object}, so we can go now.`;
      const errors = yet ? choices.map(x => `${subject} ${neg} ${t.pp} ${t.object} ${x}.`) : choices.map(x => `${subject} ${have} ${x} ${t.pp} ${t.object}, so we can go now.`);
      const clue = yet ? `It hasn't happened, but we expect it. Complete: ${gap}` : `It happened earlier than expected. Complete: ${gap}`;
      const en = yet ? `yet goes at the end of negatives and questions. ${finalCorrect}` : `already goes between have/has and the past participle. ${finalCorrect}`;
      const vi = yet ? 'yet (chưa) đứng cuối câu phủ định và câu hỏi.' : 'already (đã … rồi) đứng giữa have/has và quá khứ phân từ.';
      frames.push(withContext(frame(`${form}-${i}-${j}`, finalCorrect, errors, gap, answer, choices, clue, en, vi), `task:${t.base}|${t.object}`, s.text));
    }
    register(13, 'already-yet', form, frames);
  }
  // Unit 14: Present Perfect for situations that continue now: for, since, How long?
  for (const form of ['for-or-since', 'form', 'how-long', 'for-period', 'since-point']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of LASTING.entries()) {
      if (form === 'how-long' && s.text === 'I') continue;
      const subject = cap(s.text), have = haveOf(s.third), other = haveOf(!s.third), useFor = (i + j) % 2 === 0;
      const period = useFor ? FOR_PERIODS[(i + j) % FOR_PERIODS.length] : SINCE_POINTS[(i + j) % SINCE_POINTS.length], word = useFor ? 'for' : 'since';
      const tail = `${word} ${period}`, sentence = `${subject} ${have} ${v.pp} ${v.object} ${tail}.`;
      let correct = sentence, answer = word, gap = `${subject} ${have} ${v.pp} ${v.object} ___ ${period}.`, choices = [useFor ? 'since' : 'for', 'ago', 'during'];
      let errors = choices.map(x => `${subject} ${have} ${v.pp} ${v.object} ${x} ${period}.`), clue = `"${period}" is ${useFor ? 'a length of time' : 'a starting point'}. Complete: ${gap}`;
      let en = `for + a length of time; since + a starting point. ${correct}`, vi = 'for + khoảng thời gian; since + mốc thời gian bắt đầu.';
      if (form === 'form') { answer = `${have} ${v.pp}`; gap = `${subject} ___ ${v.object} ${tail}.`; choices = [s.third ? v.third : v.base, `${s.be} ${v.ing}`, `${other} ${v.pp}`]; errors = choices.map(x => `${subject} ${x} ${v.object} ${tail}.`); clue = `It started in the past and continues now. Complete: ${gap}`; en = `For something that started in the past and continues now, use have/has + past participle. ${correct}`; vi = 'Việc bắt đầu trong quá khứ và còn tiếp tục: have/has + quá khứ phân từ.'; }
      if (form === 'how-long') { correct = `How long ${have} ${s.text} ${v.pp} ${v.object}?`; answer = have; gap = `How long ___ ${s.text} ${v.pp} ${v.object}?`; choices = [other, 'did', s.third ? 'does' : 'do']; errors = [`How long ${other} ${s.text} ${v.pp} ${v.object}?`, `How long ${have} ${s.text} ${v.base} ${v.object}?`, `How long ${s.third ? 'does' : 'do'} ${s.text} ${v.pp} ${v.object}?`]; clue = `Ask about the length of time until now: How long ___ ${s.text} ${v.pp} ${v.object}?`; en = `How long + have/has + subject + past participle? ${correct}`; vi = 'How long + have/has + chủ ngữ + quá khứ phân từ? (… được bao lâu rồi?)'; }
      if (form === 'for-period') { const p = FOR_PERIODS[(i + j) % FOR_PERIODS.length]; correct = `${subject} ${have} ${v.pp} ${v.object} for ${p}.`; answer = p; gap = `${subject} ${have} ${v.pp} ${v.object} for ___.`; choices = SINCE_POINTS.filter((_, k) => k !== (i + j) % SINCE_POINTS.length).slice(0, 3); errors = choices.map(x => `${subject} ${have} ${v.pp} ${v.object} for ${x}.`); clue = `After "for", choose a length of time: ${gap}`; en = `for + a length of time, like ${p}. ${correct}`; vi = `for + khoảng thời gian, ví dụ ${p}.`; }
      if (form === 'since-point') { const p = SINCE_POINTS[(i + j) % SINCE_POINTS.length]; correct = `${subject} ${have} ${v.pp} ${v.object} since ${p}.`; answer = p; gap = `${subject} ${have} ${v.pp} ${v.object} since ___.`; choices = FOR_PERIODS.filter((_, k) => k !== (i + j) % FOR_PERIODS.length).slice(0, 3); errors = choices.map(x => `${subject} ${have} ${v.pp} ${v.object} since ${x}.`); clue = `After "since", choose a starting point: ${gap}`; en = `since + a starting point, like ${p}. ${correct}`; vi = `since + mốc thời gian, ví dụ ${p}.`; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `lasting:${v.base}|${v.object}`, s.text));
    }
    register(14, 'for-since', form, frames);
  }
  // Unit 15: travel words, each in three authored situations.
  registerWordUnit(15, TRAVEL_WORDS, 'travel', 'travel-meaning');
}
