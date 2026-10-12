import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { ABILITIES, REQUESTS, POSSIBILITIES, DUTIES, MUSTNT, NOT_NECESSARY, RULE_WORDS } from './content';

const pastBe = (pronoun: string) => ['you', 'we', 'they'].includes(pronoun) ? 'were' : 'was';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 19: can / can't / could / couldn't for ability, could for requests, may / may not for possibility.
  for (const form of ['can', 'can-base', 'cant', 'can-question', 'could-past', 'couldnt']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of ABILITIES.entries()) {
      if (form === 'can-question' && s.text === 'I') continue;
      const subject = cap(s.text), tail = `${v.base} ${v.object}`, age = ['three', 'four', 'five', 'six'][(i + j) % 4];
      const when = `when ${s.pronoun} ${pastBe(s.pronoun)} ${age}`;
      let correct = `${subject} can ${tail}.`, answer = 'can', gap = `${subject} ___ ${tail}.`, choices = ['cans', 'can to', `${s.be} can`];
      let errors = [`${subject} cans ${tail}.`, `${subject} can to ${tail}.`, `${subject} can ${v.third} ${v.object}.`], clue = `Talk about ability. Complete: ${gap}`;
      let en = `can + base verb, the same for every subject. ${correct}`, vi = 'can + động từ nguyên mẫu, giống nhau cho mọi chủ ngữ.';
      if (form === 'can-base') { answer = v.base; gap = `${subject} can ___ ${v.object}.`; choices = [v.third, v.ing, `to ${v.base}`]; errors = choices.map(x => `${subject} can ${x} ${v.object}.`); clue = `After can, use the base verb: ${gap}`; en = `After can, use the base verb without to. ${correct}`; vi = 'Sau can dùng động từ nguyên mẫu không có to.'; }
      if (form === 'cant') { correct = `${subject} can't ${tail}.`; answer = "can't"; gap = `${subject} ___ ${tail}. (not)`; choices = [`${s.third ? "doesn't" : "don't"} can`, 'not can', "cann't"]; errors = [`${subject} ${s.third ? "doesn't" : "don't"} can ${tail}.`, `${subject} not can ${tail}.`, `${subject} can't ${v.third} ${v.object}.`]; clue = `Say they are not able to: ${gap}`; en = `The negative of can is can't (cannot). ${correct}`; vi = "Phủ định của can là can't (cannot)."; }
      if (form === 'can-question') { const p = s.pronoun === 'you' ? 'I' : s.pronoun; correct = `Can ${s.text} ${tail}? Yes, ${p} can.`; answer = 'Can'; gap = `___ ${s.text} ${tail}? Yes, ${p} can.`; choices = [s.third ? 'Does' : 'Do', cap(s.be), 'Did']; errors = choices.map(x => `${x} ${s.text} ${tail}? Yes, ${p} can.`); clue = `Ask about ability: ${gap}`; en = `Questions: Can + subject + base verb? Yes, … can. / No, … can't. ${correct}`; vi = "Câu hỏi: Can + chủ ngữ + động từ nguyên mẫu? Yes, … can. / No, … can't."; }
      if (form === 'could-past') { correct = `${subject} could ${tail} ${when}.`; answer = 'could'; gap = `${subject} ___ ${tail} ${when}.`; choices = ['can', 'coulds', 'could to']; errors = choices.map(x => `${subject} ${x} ${tail} ${when}.`); clue = `Ability in the past. Complete: ${gap}`; en = `For ability in the past, use could. ${correct}`; vi = 'Khả năng trong quá khứ dùng could.'; }
      if (form === 'couldnt') { correct = `${subject} couldn't ${tail} ${when}.`; answer = "couldn't"; gap = `${subject} ___ ${tail} ${when}. (not)`; choices = ["can't", "didn't could", `${pastBe(s.pronoun === 'I' ? 'I' : s.pronoun)}n't can`]; errors = choices.map(x => `${subject} ${x} ${tail} ${when}.`); clue = `No ability in the past. Complete: ${gap}`; en = `For no ability in the past, use couldn't. ${correct}`; vi = "Không có khả năng trong quá khứ dùng couldn't."; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `ability:${v.base}|${v.object}`, s.text));
    }
    register(19, 'can-could', form, frames);
  }
  register(19, 'requests', 'could-you', REQUESTS.map((r, i) => {
    const correct = `Could you ${r.base} ${r.object}, please?`, gap = `___ you ${r.base} ${r.object}, please?`, choices = ['May', 'Do', 'Are'];
    return withContext(frame(`request-${i}`, correct, choices.map(x => `${x} you ${r.base} ${r.object}, please?`), gap, 'Could', choices, `Ask politely: ${gap}`,
      `Could you …? is a polite request. ${correct}`, 'Could you …? là lời nhờ lịch sự.'), `request:${r.base}|${r.object}`, 'you');
  }));
  for (const form of ['may', 'may-not']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of POSSIBILITIES.entries()) {
      const subject = cap(s.text), tail = `${v.base} ${v.object} tomorrow`, yes = form === 'may';
      const correct = `${subject} ${yes ? 'may' : 'may not'} ${tail}.`, gap = `${subject} ___ ${tail}. (${yes ? "Perhaps. We aren't sure." : "Perhaps not. We aren't sure."})`;
      const choices = yes ? ['mays', 'may to', `${s.be} may`] : ["couldn't", "mayn't", `${s.third ? "doesn't" : "don't"} may`];
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), gap, yes ? 'may' : 'may not', choices, `It is possible but not sure. Complete: ${gap}`,
        yes ? `may + base verb = perhaps it will happen. ${correct}` : `may not = perhaps it won't happen. Don't use couldn't for this. ${correct}`,
        yes ? 'may + động từ nguyên mẫu = có thể sẽ xảy ra.' : "may not = có thể sẽ không xảy ra. Không dùng couldn't trong trường hợp này."), `possible:${v.base}|${v.object}`, s.text));
    }
    register(19, 'may-might', form, frames);
  }
  // Unit 20: must / mustn't / have to / don't have to.
  for (const form of ['have-to', 'dont-have-to', 'have-to-question', 'must-base']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of DUTIES.entries()) {
      if (form === 'have-to-question' && s.text === 'I') continue;
      const subject = cap(s.text), tail = `${v.base} ${v.object}`, has = s.third ? 'has' : 'have', other = s.third ? 'have' : 'has';
      const dont = s.third ? "doesn't" : "don't", otherDont = s.third ? "don't" : "doesn't";
      let correct = `${subject} ${has} to ${tail}.`, answer = `${has} to`, gap = `${subject} ___ ${tail}.`, choices = [`${other} to`, 'must to', has];
      let errors = choices.map(x => `${subject} ${x} ${tail}.`), clue = `It is necessary. Complete: ${gap}`;
      let en = `have to / has to + base verb = it is necessary. ${correct}`, vi = 'have to / has to + động từ nguyên mẫu = phải (cần thiết).';
      if (form === 'dont-have-to') { correct = `${subject} ${dont} have to ${tail} today.`; answer = `${dont} have to`; gap = `${subject} ___ ${tail} today. (It isn't necessary.)`; choices = [`${otherDont} have to`, "mustn't", "haven't to"]; errors = choices.map(x => `${subject} ${x} ${tail} today.`); clue = `It isn't necessary. Complete: ${gap}`; en = `don't / doesn't have to = it isn't necessary. mustn't means it is not allowed. ${correct}`; vi = "don't / doesn't have to = không cần; mustn't = không được phép."; }
      if (form === 'have-to-question') { correct = `${s.third ? 'Does' : 'Do'} ${s.text} have to ${tail}?`; answer = s.third ? 'Does' : 'Do'; gap = `___ ${s.text} have to ${tail}?`; choices = [s.third ? 'Do' : 'Does', cap(has), cap(s.be)]; errors = choices.map(x => `${x} ${s.text} have to ${tail}?`); clue = `Ask if it is necessary: ${gap}`; en = `Questions with have to use Do/Does: ${correct}`; vi = 'Câu hỏi với have to dùng Do/Does.'; }
      if (form === 'must-base') { correct = `${subject} must ${tail}.`; answer = v.base; gap = `${subject} must ___ ${v.object}.`; choices = [`to ${v.base}`, v.third, `to ${v.third}`]; errors = choices.map(x => `${subject} must ${x} ${v.object}.`); clue = `After must, use the base verb: ${gap}`; en = `must + base verb (no to) for strong duties and rules. ${correct}`; vi = 'must + động từ nguyên mẫu (không có to): bắt buộc.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `duty:${v.base}|${v.object}`, s.text));
    }
    register(20, 'must-have-to', form, frames);
  }
  register(20, 'rules-signs', 'mustnt', MUSTNT.map((m, i) => {
    const correct = `${m.situation} You mustn't ${m.action}.`, gap = `${m.situation} You ___ ${m.action}.`, choices = ["don't have to", 'must', 'have to'];
    return withContext(frame(`mustnt-${i}`, correct, choices.map(x => `${m.situation} You ${x} ${m.action}.`), gap, "mustn't", choices, `It is not allowed. ${gap}`,
      `mustn't = it is not allowed. ${correct}`, "mustn't = không được phép (cấm)."), `sign:${i}`, 'you');
  }));
  register(20, 'rules-signs', 'not-necessary', NOT_NECESSARY.map((m, i) => {
    const correct = `${m.situation} You don't have to ${m.action}.`, gap = `${m.situation} You ___ ${m.action}.`, choices = ["mustn't", 'must', 'have to'];
    return withContext(frame(`no-need-${i}`, correct, choices.map(x => `${m.situation} You ${x} ${m.action}.`), gap, "don't have to", choices, `It isn't necessary. ${gap}`,
      `don't have to = it isn't necessary, but you can. ${correct}`, "don't have to = không cần (nhưng làm cũng được)."), `no-need:${i}`, 'you');
  }));
  // Unit 21: rules words.
  registerWordUnit(21, RULE_WORDS, 'rules', 'rules-meaning');
}
