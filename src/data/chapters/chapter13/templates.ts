import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { ADJECTIVES, FAME_WORDS } from './content';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 37: comparatives with than, (not) as … as.
  for (const form of ['comparative', 'than', 'not-as-as', 'as-word']) {
    const frames: ControlledFrame[] = ADJECTIVES.map((x, i) => {
      const A = cap(x.a), B = cap(x.b), long = x.comp.startsWith('more ');
      let correct = `${A} is ${x.comp} than ${x.b}.`, answer: string = x.comp, gap = `${A} is ___ than ${x.b}. (${x.adj})`, choices: string[] = [...x.wc, `the ${x.sup}`];
      let errors = choices.map(c => `${A} is ${c} than ${x.b}.`), clue = `Compare two things: ${gap}`;
      let en = `${['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.comp} is irregular.` : long ? 'Long adjectives use more + adjective.' : 'Short adjectives add -er (y → ier; double the last letter in big, hot, thin).'} ${correct}`;
      let vi = ['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.comp} là dạng bất quy tắc.` : long ? 'Tính từ dài dùng more + tính từ.' : 'Tính từ ngắn thêm -er (y → ier; gấp đôi phụ âm cuối với big, hot, thin).';
      if (form === 'than') { gap = `${A} is ${x.comp} ___ ${x.b}.`; answer = 'than'; choices = ['that', 'then', 'as']; errors = choices.map(c => `${A} is ${x.comp} ${c} ${x.b}.`); clue = `Comparatives are followed by than: ${gap}`; en = `comparative + than. ${correct}`; vi = 'So sánh hơn + than.'; }
      if (form === 'not-as-as') { correct = `${B} isn't as ${x.adj} as ${x.a}.`; answer = x.adj; gap = `${B} isn't as ___ as ${x.a}. (${x.adj})`; choices = [x.comp, x.sup, x.wc[0]]; errors = choices.map(c => `${B} isn't as ${c} as ${x.a}.`); clue = `Use the normal adjective between as … as: ${gap}`; en = `not as + adjective + as = less than. ${correct}`; vi = 'not as + tính từ + as = không bằng.'; }
      if (form === 'as-word') { correct = `${B} isn't as ${x.adj} as ${x.a}.`; answer = 'as'; gap = `${B} isn't as ${x.adj} ___ ${x.a}.`; choices = ['than', 'that', 'like']; errors = choices.map(c => `${B} isn't as ${x.adj} ${c} ${x.a}.`); clue = `Complete as … as: ${gap}`; en = `as + adjective + as. ${correct}`; vi = 'Cấu trúc as + tính từ + as.'; }
      return withContext(frame(`${form}-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `compare:${x.adj}`);
    });
    register(37, 'comparatives', form, frames);
  }
  // Unit 38: superlatives with the.
  for (const form of ['superlative', 'the-superlative']) {
    const frames: ControlledFrame[] = ADJECTIVES.map((x, i) => {
      const tail = `${x.sg}`, make = (w: string) => `${x.sa} is the ${w} ${tail}.`;
      let correct = make(x.sup), answer: string = x.sup, gap = `${x.sa} is the ___ ${tail}. (${x.adj})`, choices: string[] = [...x.ws, x.comp];
      let errors = choices.map(make), clue = `The top one of a group: ${gap}`;
      let en = `${['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.sup} is irregular.` : x.sup.startsWith('most ') ? 'Long adjectives use the most + adjective.' : 'Short adjectives use the + adjective + -est.'} ${correct}`;
      let vi = ['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.sup} là dạng bất quy tắc.` : x.sup.startsWith('most ') ? 'Tính từ dài dùng the most + tính từ.' : 'Tính từ ngắn dùng the + tính từ + -est.';
      if (form === 'the-superlative') { answer = 'the'; gap = `${x.sa} is ___ ${x.sup} ${tail}.`; choices = ['than', 'as', 'more']; errors = choices.map(c => `${x.sa} is ${c} ${x.sup} ${tail}.`); clue = `Superlatives need a word before them: ${gap}`; en = `Use the before a superlative. ${correct}`; vi = 'Trước so sánh nhất phải có the.'; }
      return withContext(frame(`${form}-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `super:${x.adj}`);
    });
    register(38, 'superlatives', form, frames);
  }
  // Unit 39: famous people and places.
  registerWordUnit(39, FAME_WORDS, 'fame', 'fame-meaning');
}
