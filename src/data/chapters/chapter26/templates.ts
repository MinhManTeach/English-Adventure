import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import {
  SO_SUCH_ITEMS, SO_SUCH, RESPONDERS, SPEAKERS, AGREE_ITEMS, NEG_AUX, PAST_TAGS, BE_PAST_TAGS, CONTINUOUS_TAGS, PERFECT_TAGS,
  MODAL_TAGS, MODAL_NEG, OTHER_MODAL, SPECIAL_TAGS, TECH2_WORDS,
} from './content';

const SO_SUCH_RULE = {
  so: ['so + adjective or adverb (so kind, so fast), and so much / so many + noun.', 'so + tính từ hoặc trạng từ (so kind, so fast); so much / so many + danh từ.'],
  such: ['such + plural or uncountable noun (such good friends, such awful weather).', 'such + danh từ số nhiều hoặc không đếm được (such good friends, such awful weather).'],
  'such a': ['such a + (adjective) + singular noun beginning with a consonant sound.', 'such a + (tính từ) + danh từ số ít bắt đầu bằng phụ âm.'],
  'such an': ['such an + (adjective) + singular noun beginning with a vowel sound.', 'such an + (tính từ) + danh từ số ít bắt đầu bằng nguyên âm.'],
} as const;

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // A2 Unit 34 (id 76): so / such, So do I / Neither do I, too / either.
  register(76, 'so-such-either-neither', 'so-such', SO_SUCH_ITEMS.map(([gap, answer], i) => {
    const choices = SO_SUCH.filter(x => x !== answer), correct = cap(gap.replace('___', answer));
    return withContext(frame(`so-such-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, [...choices], `Choose so, such, such a or such an: ${gap}`,
      `${SO_SUCH_RULE[answer][0]} ${correct}`, SO_SUCH_RULE[answer][1]), `so-such:${i}`);
  }));
  for (const form of ['so-neither', 'agree-aux', 'too-either'] as const) {
    const frames: ControlledFrame[] = [];
    for (const [i, r] of RESPONDERS.entries()) for (const [j, it] of AGREE_ITEMS.entries()) for (const negative of [false, true]) {
      const [a, b] = SPEAKERS[(i + j) % SPEAKERS.length], aux = it.aux[r.kind], said = `${a}: ${negative ? it.neg : it.pos} ${b}:`;
      let correct: string, gap: string, answer: string, choices: string[], errors: string[], clue: string, en: string, vi: string;
      if (form === 'too-either') {
        const verb = negative ? NEG_AUX[aux] : aux, glue = verb.startsWith('\'') ? '' : ' ', head = `${said} ${cap(r.text)}${glue}${verb}`;
        answer = negative ? 'either' : 'too'; choices = negative ? ['too', 'neither', 'so'] : ['either', 'neither', 'both'];
        correct = `${head} ${answer}.`; gap = `${head} ___.`; errors = choices.map(x => `${head} ${x}.`); clue = `Agree with ${a}: ${gap}`;
        en = negative ? `Agree with a negative sentence: subject + negative auxiliary + either. ${correct}` : `Agree with a positive sentence: subject + auxiliary + too. ${correct}`;
        vi = negative ? 'Đồng ý với câu phủ định: chủ ngữ + trợ động từ phủ định + either (cũng không).' : 'Đồng ý với câu khẳng định: chủ ngữ + trợ động từ + too (cũng vậy).';
      } else {
        const word = negative ? 'Neither' : 'So';
        correct = `${said} ${word} ${aux} ${r.text}.`;
        if (form === 'so-neither') {
          answer = word; choices = [negative ? 'So' : 'Neither', 'Too', 'Either'];
          gap = `${said} ___ ${aux} ${r.text}.`; errors = choices.map(x => `${said} ${x} ${aux} ${r.text}.`); clue = `Agree with ${a}: ${gap}`;
        } else {
          answer = aux; choices = [...new Set([...Object.values(it.aux), ...it.alts])].filter(x => x !== aux).slice(0, 3);
          gap = `${said} ${word} ___ ${r.text}.`; errors = choices.map(x => `${said} ${word} ${x} ${r.text}.`); clue = `Use the same auxiliary and tense: ${gap}`;
        }
        en = `${negative ? 'Neither' : 'So'} + auxiliary + subject agrees with a ${negative ? 'negative' : 'positive'} sentence. Use the same auxiliary and tense (do / am / did / can / have / will ...), matching the new subject. ${correct}`;
        vi = `${negative ? 'Neither' : 'So'} + trợ động từ + chủ ngữ dùng để đồng ý với câu ${negative ? 'phủ định' : 'khẳng định'}. Dùng đúng trợ động từ và thì của câu trước, chia theo chủ ngữ mới.`;
      }
      frames.push(withContext(frame(`${form}-${i}-${j}-${negative ? 'n' : 'p'}`, correct, errors, gap, answer, choices, clue, en, vi),
        `${form === 'too-either' ? 'too' : 'agree'}:${it.key}`, r.text));
    }
    register(76, 'so-such-either-neither', form, frames);
  }

  // A2 Unit 35 (id 77): question tags with every auxiliary.
  const subjects = SUBJECTS.filter(s => s.text !== 'I');
  const tagFamily = (family: string, items: readonly string[], build: (s: (typeof subjects)[number], item: string, negative: boolean) => { start: string; answer: string; wrong: string[] }) => {
    const frames: ControlledFrame[] = [];
    for (const [i, s] of subjects.entries()) for (const [j, item] of items.entries()) for (const negative of [false, true]) {
      const { start, answer, wrong } = build(s, item, negative), correct = `${start}, ${answer}?`, gap = `${start}, ___?`;
      frames.push(withContext(frame(`${family}-${i}-${j}-${negative ? 'n' : 'p'}`, correct, wrong.map(x => `${start}, ${x}?`), gap, answer, wrong, `Add the question tag: ${gap}`,
        `${negative ? 'A negative sentence takes a positive tag' : 'A positive sentence takes a negative tag'}. Use the same auxiliary as the sentence and a pronoun. ${correct}`,
        negative ? 'Câu phủ định đi với câu hỏi đuôi khẳng định. Dùng cùng trợ động từ với câu chính và đại từ làm chủ ngữ.' : 'Câu khẳng định đi với câu hỏi đuôi phủ định. Dùng cùng trợ động từ với câu chính và đại từ làm chủ ngữ.'),
      `tag-${family}:${j}`, s.text));
    }
    register(77, 'question-tags', family, frames);
  };
  const doOf = (s: (typeof subjects)[number]) => s.third ? 'does' : 'do';
  const wasOf = (s: (typeof subjects)[number]) => s.be === 'is' ? 'was' : 'were';
  tagFamily('past-simple', PAST_TAGS.map(([pos]) => pos), (s, item, negative) => {
    const base = PAST_TAGS.find(([pos]) => pos === item)![1], p = s.pronoun, subject = cap(s.text);
    return negative
      ? { start: `${subject} didn't ${base}`, answer: `did ${p}`, wrong: [`didn't ${p}`, `${wasOf(s)} ${p}`, `${doOf(s)} ${p}`] }
      : { start: `${subject} ${item}`, answer: `didn't ${p}`, wrong: [`did ${p}`, `${wasOf(s)}n't ${p}`, `${doOf(s)}n't ${p}`] };
  });
  tagFamily('was-were', BE_PAST_TAGS, (s, item, negative) => {
    const p = s.pronoun, w = wasOf(s), subject = cap(s.text);
    return negative
      ? { start: `${subject} ${w}n't ${item}`, answer: `${w} ${p}`, wrong: [`${w}n't ${p}`, `did ${p}`, `${s.be} ${p}`] }
      : { start: `${subject} ${w} ${item}`, answer: `${w}n't ${p}`, wrong: [`${w} ${p}`, `didn't ${p}`, `${s.be}n't ${p}`] };
  });
  tagFamily('present-continuous', CONTINUOUS_TAGS, (s, item, negative) => {
    const p = s.pronoun, be = s.be, subject = cap(s.text);
    return negative
      ? { start: `${subject} ${be}n't ${item}`, answer: `${be} ${p}`, wrong: [`${be}n't ${p}`, `${doOf(s)} ${p}`, `${wasOf(s)} ${p}`] }
      : { start: `${subject} ${be} ${item}`, answer: `${be}n't ${p}`, wrong: [`${be} ${p}`, `${doOf(s)}n't ${p}`, `${wasOf(s)}n't ${p}`] };
  });
  tagFamily('present-perfect', PERFECT_TAGS, (s, item, negative) => {
    const p = s.pronoun, hv = s.third ? 'has' : 'have', subject = cap(s.text);
    return negative
      ? { start: `${subject} ${hv}n't ${item}`, answer: `${hv} ${p}`, wrong: [`${hv}n't ${p}`, `did ${p}`, `${s.be} ${p}`] }
      : { start: `${subject} ${hv} ${item}`, answer: `${hv}n't ${p}`, wrong: [`${hv} ${p}`, `didn't ${p}`, `${s.be}n't ${p}`] };
  });
  tagFamily('modals', MODAL_TAGS.map(([m, vp]) => `${m} ${vp}`), (s, item, negative) => {
    const [m, ...rest] = item.split(' '), vp = rest.join(' '), p = s.pronoun, subject = cap(s.text), d = doOf(s), o = OTHER_MODAL[m];
    return negative
      ? { start: `${subject} ${MODAL_NEG[m]} ${vp}`, answer: `${m} ${p}`, wrong: [`${MODAL_NEG[m]} ${p}`, `${d} ${p}`, `${o} ${p}`] }
      : { start: `${subject} ${m} ${vp}`, answer: `${MODAL_NEG[m]} ${p}`, wrong: [`${m} ${p}`, `${d}n't ${p}`, `${MODAL_NEG[o]} ${p}`] };
  });
  register(77, 'question-tags', 'special-tags', SPECIAL_TAGS.map(([start, answer, wrong, rule], i) => {
    const correct = `${start}, ${answer}?`, gap = `${start}, ___?`;
    return withContext(frame(`special-${i}`, correct, wrong.map(x => `${start}, ${x}?`), gap, answer, [...wrong], `Add the special question tag: ${gap}`,
      `Special tag (${rule}). ${correct}`, `Câu hỏi đuôi đặc biệt (${rule}): I am → aren't I; Let's → shall we; câu mệnh lệnh → will you; there is → isn't there; nobody, nothing, never mang nghĩa phủ định nên đi với đuôi khẳng định.`), `tag-special:${i}`);
  }));

  // A2 Unit 36 (id 78): technology words.
  registerWordUnit(78, TECH2_WORDS, 'tech2', 'tech2-meaning');
}
