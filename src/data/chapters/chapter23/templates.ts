import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { COMPARE_ITEMS, MODIFIERS, SUPER_ITEMS, EVER_ITEMS, PLACE_WORDS } from './content';

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // A2 Unit 25 (id 67): comparative forms, much / a bit + comparative, less … than, getting bigger and bigger.
  for (const form of ['comparative-form', 'modifier', 'less-than', 'double-comparative']) {
    const frames: ControlledFrame[] = [];
    for (const [i, x] of COMPARE_ITEMS.entries()) {
      if (form === 'less-than' && !x.long) continue;
      const A = cap(x.a), B = cap(x.b), tail = `${x.extra ? ' ' + x.extra : ''} than ${x.b}`;
      const say = (w: string) => `${A} is ${w}${tail}.`;
      let correct = say(x.comp), answer: string = x.comp, gap = `${A} is ___${tail}. (${x.adj})`, choices: string[] = [...x.wc, x.adj];
      let errors = choices.map(say), clue = `Compare two places or things: ${gap}`;
      let en = `${['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.comp} is irregular.` : x.long ? 'Long adjectives use more + adjective.' : 'Short adjectives add -er (y → ier; double the last letter in big, hot). Never use more with -er.'} ${correct}`;
      let vi = ['good', 'bad'].includes(x.adj) ? `${x.adj} → ${x.comp} là dạng bất quy tắc.` : x.long ? 'Tính từ dài dùng more + tính từ.' : 'Tính từ ngắn thêm -er (y → ier; gấp đôi phụ âm cuối với big, hot). Không dùng more cùng với -er.';
      if (form === 'modifier') {
        const [mod, size] = MODIFIERS[i % MODIFIERS.length];
        correct = say(`${mod} ${x.comp}`); answer = mod; gap = `${A} is ___ ${x.comp}${tail}. (${size})`; choices = ['very', 'more', 'so'];
        errors = choices.map(c => say(`${c} ${x.comp}`)); clue = `Show how big the difference is: ${gap}`;
        en = `Use much, a lot or far for a big difference and a bit for a small one. Never say very or more before a comparative. ${correct}`;
        vi = 'Dùng much, a lot, far khi khác nhau nhiều; a bit khi khác nhau ít. Không dùng very hay more trước so sánh hơn.';
      }
      if (form === 'less-than') {
        const lessSay = (w: string) => `${B} ${x.bBe} ${w} ${x.adj} than ${x.a}.`;
        correct = lessSay('less'); answer = 'less'; gap = `${B} ${x.bBe} ___ ${x.adj} than ${x.a}.`; choices = ['least', 'fewer', 'not'];
        errors = choices.map(lessSay); clue = `Say it the other way round: ${A} is ${x.comp} than ${x.b}. ${gap}`;
        en = `less + adjective + than is the opposite of more + adjective + than. ${correct}`; vi = 'less + tính từ + than (kém … hơn) ngược nghĩa với more + tính từ + than.';
      }
      if (form === 'double-comparative') {
        const grow = (w: string) => `${x.grow} getting ${w}.`;
        answer = x.long ? `more and more ${x.adj}` : `${x.comp} and ${x.comp}`; correct = grow(answer); gap = `${x.grow} getting ___. (${x.adj})`;
        choices = x.long ? [`${x.adj}er and ${x.adj}er`, `more ${x.adj} and more ${x.adj}`, `most and most ${x.adj}`] : [`more and more ${x.adj}`, `${x.adj} and ${x.adj}`, `more ${x.comp} and ${x.comp}`];
        errors = choices.map(grow); clue = `Something keeps changing: ${gap}`;
        en = `To show a change that continues, repeat the comparative: bigger and bigger, more and more expensive. ${correct}`;
        vi = 'Để diễn tả sự thay đổi ngày càng tăng, lặp lại so sánh hơn: bigger and bigger, more and more expensive (ngày càng…).';
      }
      frames.push(withContext(frame(`${form}-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `compare:${x.adj}`));
    }
    register(67, 'comparatives', form, frames);
  }
  // A2 Unit 26 (id 68): superlative forms, in or of after a superlative, one of the + plural, ever.
  for (const form of ['superlative-form', 'in-or-of', 'one-of']) {
    const frames: ControlledFrame[] = SUPER_ITEMS.map((x, i) => {
      const long = x.sup.startsWith('most '), say = (w: string) => `${x.subj} is the ${w} ${x.noun} in ${x.inP}.`;
      let correct = say(x.sup), answer: string = x.sup, gap = `${x.subj} is the ___ ${x.noun} in ${x.inP}. (${x.adj})`, choices: string[] = [...x.ws, x.comp];
      let errors = choices.map(say), clue = `Number one in a group: ${gap}`;
      let en = `${['good', 'bad'].includes(x.adj) ? `${x.adj} → the ${x.sup} is irregular.` : long ? 'Long adjectives use the most + adjective.' : 'Short adjectives use the + adjective + -est (y → iest; big → biggest).'} ${correct}`;
      let vi = ['good', 'bad'].includes(x.adj) ? `${x.adj} → the ${x.sup} là dạng bất quy tắc.` : long ? 'Tính từ dài dùng the most + tính từ.' : 'Tính từ ngắn dùng the + tính từ + -est (y → iest; big → biggest).';
      if (form === 'in-or-of') {
        const useIn = i % 2 === 0;
        const sayIn = (w: string) => `${x.subj} is the ${x.sup} ${x.noun} ${w} ${x.inP}.`, sayOf = (w: string) => `${x.subj} is the ${x.sup} ${w} ${x.ofP}.`;
        answer = useIn ? 'in' : 'of'; correct = useIn ? sayIn('in') : sayOf('of');
        gap = useIn ? `${x.subj} is the ${x.sup} ${x.noun} ___ ${x.inP}.` : `${x.subj} is the ${x.sup} ___ ${x.ofP}.`;
        choices = useIn ? ['than', 'as', 'to'] : ['in', 'than', 'as']; errors = choices.map(useIn ? sayIn : sayOf);
        clue = `Choose the word after the superlative: ${gap}`;
        en = `After a superlative, use in + a place or group (in our class) and of + a number or all (of the three, of all). ${correct}`;
        vi = 'Sau so sánh nhất: in + nơi chốn / nhóm (in our class); of + số lượng hoặc all (of the three, of all).';
      }
      if (form === 'one-of') {
        const sayOne = (w: string) => `${x.subj} is one of the ${w} in ${x.inP}.`;
        answer = `${x.sup} ${x.nouns}`; correct = sayOne(answer); gap = `${x.subj} is one of the ___ in ${x.inP}. (${x.adj} / ${x.noun})`;
        choices = [`${x.sup} ${x.noun}`, `${x.ws[0]} ${x.nouns}`, `${x.ws[1]} ${x.nouns}`]; errors = choices.map(sayOne);
        clue = `One member of the top group: ${gap}`;
        en = `one of the + superlative + plural noun. ${correct}`; vi = 'one of the + so sánh nhất + danh từ số nhiều (một trong những … nhất).';
      }
      return withContext(frame(`${form}-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `super:${x.adj}`);
    });
    register(68, 'superlatives', form, frames);
  }
  register(68, 'superlatives', 'ever', EVER_ITEMS.map(([start, base, pp, past, ing], i) => {
    const say = (w: string) => `${start} I've ever ${w}.`, choices = [past, base, ing];
    return withContext(frame(`ever-${i}`, say(pp), choices.map(say), `${start} I've ever ___. (${base})`, pp, choices, `Your biggest experience: ${start} I've ever ___. (${base})`,
      `the + superlative + I've ever + past participle: ${base} → ${pp}. ${say(pp)}`, `the + so sánh nhất + I've ever + quá khứ phân từ (… nhất mà tôi từng …): ${base} → ${pp}.`), `ever:${base}`);
  }));
  // A2 Unit 27 (id 69): places in town and the countryside.
  registerWordUnit(69, PLACE_WORDS, 'places', 'places-meaning');
}
