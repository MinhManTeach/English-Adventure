import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { INSTRUCTIONS, ACTIONS, PLACE_ITEMS, TIME_ITEMS, IN_ON_AT, MOVEMENT_ITEMS, TECH_WORDS } from './content';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 40: imperatives, want / would like + to-infinitive, enjoy / good at / don't mind + -ing.
  register(40, 'imperatives', 'imperative', INSTRUCTIONS.flatMap((v, i) => {
    const pos = `${cap(v.base)} ${v.obj}.`, posChoices = [cap(v.ing), `To ${v.base}`, `You ${v.ing}`];
    const neg = `Don't ${v.dont}!`, negChoices = ['Not', 'No', "Doesn't"];
    return [
      withContext(frame(`imperative-${i}`, pos, posChoices.map(x => `${x} ${v.obj}.`), `___ ${v.obj}. (${v.base})`, cap(v.base), posChoices, `Give an instruction: ___ ${v.obj}.`,
        `Imperative: base verb at the start, no subject. ${pos}`, 'Câu mệnh lệnh: động từ nguyên mẫu đứng đầu, không có chủ ngữ.'), `imperative:${v.base}`),
      withContext(frame(`dont-${i}`, neg, negChoices.map(x => `${x} ${v.dont}!`), `___ ${v.dont}!`, "Don't", negChoices, `Tell someone not to do it: ___ ${v.dont}!`,
        `Negative imperative: Don't + base verb. ${neg}`, "Câu mệnh lệnh phủ định: Don't + động từ nguyên mẫu."), `dont:${v.dont}`),
    ];
  }));
  for (const form of ['want-to', 'would-like-to', 'enjoy-ing']) {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of SUBJECTS.entries()) for (const [j, v] of ACTIONS.entries()) {
      const subject = cap(s.text), want = s.third ? 'wants' : 'want';
      const head = form === 'want-to' ? `${subject} ${want}` : form === 'would-like-to' ? `${subject} would like`
        : [`${subject} ${s.third ? 'enjoys' : 'enjoy'}`, `${subject} ${s.be} good at`, `${subject} ${s.third ? "doesn't" : "don't"} mind`][(i + j) % 3];
      const ing = form === 'enjoy-ing', answer = ing ? v.ing : `to ${v.base}`, choices = ing ? [`to ${v.base}`, v.base, `to ${v.ing}`] : [v.ing, v.base, `to ${v.ing}`];
      const correct = `${head} ${answer} ${v.obj}.`, gap = `${head} ___ ${v.obj}. (${v.base})`;
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, choices.map(x => `${head} ${x} ${v.obj}.`), gap, answer, choices,
        ing ? `After enjoy, be good at and don't mind, use -ing: ${gap}` : `After want and would like, use to + base verb: ${gap}`,
        ing ? `enjoy / be good at / don't mind + verb-ing. ${correct}` : `${form === 'want-to' ? 'want' : 'would like'} + to + base verb. ${correct}`,
        ing ? "enjoy / be good at / don't mind + động từ-ing." : `${form === 'want-to' ? 'want' : 'would like'} + to + động từ nguyên mẫu.`), `${form}:${v.base}|${v.obj}`, s.text));
    }
    register(40, 'verb-patterns', form, frames);
  }
  // Unit 41: prepositions of place, time and movement.
  const inOnAt = (items: readonly (readonly [string, string])[], kind: 'place' | 'time') => items.map(([gap, answer], i) => {
    const choices = IN_ON_AT.filter(p => p !== answer), correct = gap.replace('___', answer);
    const rule = kind === 'time'
      ? ['at + clock times and night / Christmas; on + days and dates; in + months, years, seasons and parts of the day.', 'at + giờ, night, Christmas; on + thứ, ngày tháng; in + tháng, năm, mùa, buổi trong ngày.']
      : ['in + inside a space or a town; on + a surface or a floor; at + a point (the bus stop, home, the door).', 'in + bên trong, thành phố; on + bề mặt, tầng; at + một điểm (bến xe, nhà, cửa).'];
    return withContext(frame(`${kind}-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, [...choices], `Choose in, on or at: ${gap}`,
      `${rule[0]} ${correct}`, rule[1]), `${kind}:${i}`);
  });
  register(41, 'prepositions', 'place', inOnAt(PLACE_ITEMS, 'place'));
  register(41, 'prepositions', 'time', inOnAt(TIME_ITEMS, 'time'));
  register(41, 'prepositions', 'movement', MOVEMENT_ITEMS.map(([gap, answer, wrong], i) => {
    const sentence = gap.replace(/ \([^)]*\)$/, ''), correct = sentence.replace('___', answer);
    return withContext(frame(`move-${i}`, correct, wrong.map(x => sentence.replace('___', x)), gap, answer, [...wrong], `Follow the direction: ${gap}`,
      `Prepositions of movement show where something goes: across, through, along, up, down, into, out of, over, under, off, onto. ${correct}`,
      'Giới từ chỉ chuyển động cho biết vật đi đâu: across (băng qua), through (xuyên qua), along (dọc theo), up (lên), down (xuống), into (vào trong), out of (ra khỏi), over (qua phía trên), under (dưới), off (rời khỏi), onto (lên trên).'),
    `move:${i}`);
  }));
  // Unit 42: communication and technology words.
  registerWordUnit(42, TECH_WORDS, 'tech', 'tech-meaning');
}
