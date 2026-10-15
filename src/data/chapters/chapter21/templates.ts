import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { PASSIVE_ITEMS, BY_AGENT_ITEMS, A_AN_ITEMS, GENERAL_SPECIFIC_ITEMS, PLACE_NAME_ITEMS, FIXED_PHRASE_ITEMS, CUSTOM_WORDS } from './content';

const join = (...parts: string[]) => parts.filter(Boolean).join(' ');

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 61 (A2 Unit 19): present and past simple passive, negatives, questions and by + agent.
  for (const form of ['present', 'past', 'negative', 'question'] as const) {
    const frames: ControlledFrame[] = PASSIVE_ITEMS.map((v, i) => {
      const S = cap(v.subj), pl = v.plural;
      const be = pl ? 'are' : 'is', otherBe = pl ? 'is' : 'are', was = pl ? 'were' : 'was', otherWas = pl ? 'was' : 'were';
      const active = pl ? v.base : `${v.base}s`;
      let answer: string, choices: string[], make: (x: string) => string, gap: string, clue: string, en: string, vi: string;
      if (form === 'present') {
        answer = `${be} ${v.pp}`; choices = [`${otherBe} ${v.pp}`, `${be} ${v.wrong}`, active];
        make = x => `${join(S, x, v.tail, v.now)}.`; gap = `${join(S, '___', v.tail, v.now)}. (${v.base})`;
        clue = `It happens regularly. Use the present passive: ${gap}`;
        en = `Present simple passive: ${be} + past participle (${v.base} → ${v.pp}). ${make(answer)}`;
        vi = `Bị động hiện tại đơn: ${be} + quá khứ phân từ (${v.base} → ${v.pp}).`;
      } else if (form === 'past') {
        answer = `${was} ${v.pp}`; choices = [`${otherWas} ${v.pp}`, `${be} ${v.pp}`, `${was} ${v.wrong}`];
        make = x => `${join(S, x, v.tail, v.past)}.`; gap = `${join(S, '___', v.tail, v.past)}. (${v.base})`;
        clue = `It happened in the past. Use the past passive: ${gap}`;
        en = `Past simple passive: ${was} + past participle (${v.base} → ${v.pp}). ${make(answer)}`;
        vi = `Bị động quá khứ đơn: ${was} + quá khứ phân từ (${v.base} → ${v.pp}).`;
      } else if (form === 'negative') {
        const present = i % 2 === 0;
        const neg = present ? (pl ? "aren't" : "isn't") : (pl ? "weren't" : "wasn't");
        const otherNeg = present ? (pl ? "isn't" : "aren't") : (pl ? "wasn't" : "weren't");
        const aux = present ? (pl ? "don't" : "doesn't") : "didn't";
        const when = present ? v.now : v.past;
        answer = `${neg} ${v.pp}`; choices = [`${aux} ${v.pp}`, `${otherNeg} ${v.pp}`, `${neg} ${v.wrong}`];
        make = x => `${join(S, x, v.tail, when)}.`; gap = `${join(S, '___', v.tail, when)}. (not ${v.base})`;
        clue = `Make the passive negative: ${gap}`;
        en = `Passive negative: ${neg} + past participle. Don't use ${aux} with the passive. ${make(answer)}`;
        vi = `Bị động phủ định: ${neg} + quá khứ phân từ. Không dùng ${aux} trong câu bị động.`;
      } else {
        const present = i % 2 === 0;
        answer = present ? cap(be) : cap(was);
        choices = present ? ['Do', 'Does', cap(otherBe)] : ['Did', cap(otherWas), cap(be)];
        const when = present ? v.now : v.past;
        make = x => `${join(x, v.subj, v.pp, v.tail, when)}?`; gap = `${join('___', v.subj, v.pp, v.tail, when)}?`;
        clue = `Make a passive question: ${gap}`;
        en = `Passive questions start with ${present ? 'am / is / are' : 'was / were'}, not ${present ? 'do / does' : 'did'}. ${make(answer)}`;
        vi = `Câu hỏi bị động bắt đầu bằng ${present ? 'am / is / are' : 'was / were'}, không dùng ${present ? 'do / does' : 'did'}.`;
      }
      return withContext(frame(`${form}-${i}`, make(answer), choices.map(make), gap, answer, choices, clue, en, vi), `passive:${v.key}`);
    });
    register(61, 'passive', form, frames);
  }
  register(61, 'passive', 'by-agent', BY_AGENT_ITEMS.map(([gap, answer, wrong], i) => {
    const sentence = gap.replace(/ \([^)]*\)$/, ''), correct = sentence.replace('___', answer);
    return withContext(frame(`by-${i}`, correct, wrong.map(x => sentence.replace('___', x)), gap, answer, [...wrong], `Who or what did it? ${gap}`,
      `Passive + by + the person or thing that does the action. ${correct}`, 'Bị động + by + người hoặc vật thực hiện hành động.'), `by:${i}`);
  }));

  // Unit 62 (A2 Unit 20): a / an, no article vs the, place names and fixed phrases.
  const articles = (family: string, items: typeof A_AN_ITEMS, clue: string, en: string, vi: string) => register(62, 'articles', family, items.map(([gap, answer, wrong], i) => {
    const sentence = gap.replace(/ \([^)]*\)$/, ''), correct = sentence.replace('___', answer);
    return withContext(frame(`${family}-${i}`, correct, wrong.map(x => sentence.replace('___', x)), gap, answer, [...wrong], `${clue} ${gap}`, `${en} ${correct}`, vi), `art:${family}:${i}`);
  }));
  articles('a-an', A_AN_ITEMS, 'Choose a, an or nothing:',
    'Use a / an before a job, in rates like twice a week, and in What a …!', 'Dùng a / an trước nghề nghiệp, trong cụm chỉ tần suất (twice a week) và câu cảm thán What a …!');
  articles('general-specific', GENERAL_SPECIFIC_ITEMS, 'In general or a specific one?',
    'No article for things in general; the for a specific thing we both know.', 'Không dùng mạo từ khi nói chung chung; dùng the cho vật cụ thể mà cả hai đều biết.');
  articles('place-names', PLACE_NAME_ITEMS, 'Does this place name need the?',
    'the with rivers, seas, oceans, mountain ranges and the USA / the UK / the Philippines; no article with cities, most countries, lakes and single mountains.',
    'Dùng the với sông, biển, đại dương, dãy núi và the USA / the UK / the Philippines; không dùng mạo từ với thành phố, đa số quốc gia, hồ và ngọn núi đơn lẻ.');
  articles('fixed-phrases', FIXED_PHRASE_ITEMS, 'Fixed phrase:',
    'No article in go to bed / school / work, at home, by train, have lunch, at night; but in the morning and listen to the radio.',
    'Không dùng mạo từ trong go to bed / school / work, at home, by train, have lunch, at night; nhưng nói in the morning và listen to the radio.');

  // Unit 63 (A2 Unit 21): customs and traditions words.
  registerWordUnit(63, CUSTOM_WORDS, 'customs', 'customs-meaning');
}
