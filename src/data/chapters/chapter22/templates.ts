import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { NO_PLURAL_ITEMS, SINGULAR_VERB_ITEMS, PARTITIVE_ITEMS, PLURAL_NOUN_ITEMS, COUNT_NOUNS, MASS_NOUNS, FASHION_WORDS } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  // Unit 64 (A2 Unit 22): tricky uncountable nouns, singular verbs, a piece of / a slice of, always-plural and irregular nouns.
  const nouns = (family: string, items: typeof NO_PLURAL_ITEMS, clue: string, en: string, vi: string) => register(64, 'countable-uncountable', family, items.map(([key, gap, answer, wrong], i) => {
    const correct = gap.replace('___', answer);
    return withContext(frame(`${family}-${i}`, correct, wrong.map(x => gap.replace('___', x)), gap, answer, [...wrong], `${clue} ${gap}`, `${en} ${correct}`, vi), `noun:${key}`);
  }));
  nouns('no-plural', NO_PLURAL_ITEMS, 'This noun is uncountable in English:',
    'Uncountable nouns like advice, information, news, homework and furniture have no plural and no a / an.',
    'Danh từ không đếm được như advice, information, news, homework, furniture không có số nhiều và không đi với a / an.');
  nouns('singular-verb', SINGULAR_VERB_ITEMS, 'Choose the verb:',
    'An uncountable noun takes a singular verb: is / was, not are / were.', 'Danh từ không đếm được đi với động từ số ít: is / was, không dùng are / were.');
  nouns('partitive', PARTITIVE_ITEMS, 'Count it with a container or a piece:',
    'Count uncountable nouns with a piece of, a slice of, a bowl of, a glass of, a carton of, a bar of, a cup of, a jar of.',
    'Đếm danh từ không đếm được bằng a piece of (một mẩu), a slice of (một lát), a bowl of (một bát), a glass of (một cốc), a carton of (một hộp), a bar of (một thanh), a cup of (một tách), a jar of (một lọ).');
  nouns('plural-nouns', PLURAL_NOUN_ITEMS, 'Plural noun:',
    'jeans, trousers, glasses, scissors, clothes and people are plural: use are and a pair of. Irregular plurals: teeth, feet, mice, children.',
    'jeans, trousers, glasses, scissors, clothes, people là danh từ số nhiều: dùng are và a pair of. Số nhiều bất quy tắc: teeth, feet, mice, children.');

  // Unit 65 (A2 Unit 23): too much / too many, not enough, (a) few / (a) little, any / no.
  const all = [...COUNT_NOUNS.map(n => ({ ...n, count: true })), ...MASS_NOUNS.map(n => ({ ...n, count: false }))];
  for (const form of ['too-much-many', 'not-enough', 'few-little', 'any-no'] as const) {
    const frames: ControlledFrame[] = all.flatMap((n, i) => {
      // Nobody wants more noise, rubbish or traffic, so these stay out of "not enough".
      if (form === 'not-enough' && ['noise', 'rubbish', 'traffic'].includes(n.noun)) return [];
      const c = n.count, be = c ? 'are' : 'is', neg = c ? "aren't" : "isn't";
      let head: string, answer: string, choices: string[], clue: string, en: string, vi: string;
      if (form === 'too-much-many') {
        head = `There ${be} too`; answer = c ? 'many' : 'much'; choices = [c ? 'much' : 'many', 'lot', 'a lot'];
        clue = c ? `More than we want, and "${n.noun}" is countable:` : `More than we want, and "${n.noun}" is uncountable:`;
        en = c ? 'too many + plural countable noun.' : 'too much + uncountable noun.';
        vi = c ? 'too many + danh từ đếm được số nhiều = quá nhiều.' : 'too much + danh từ không đếm được = quá nhiều.';
      } else if (form === 'not-enough') {
        head = `There ${neg}`; answer = 'enough'; choices = ['too', c ? 'much' : 'many'];
        clue = 'Less than we need:';
        en = 'not enough + noun = less than we need. enough goes before a noun.';
        vi = 'not enough + danh từ = không đủ. enough đứng trước danh từ.';
      } else if (form === 'few-little') {
        const small = i % 2 === 0;
        head = small ? `There ${be} only` : `There ${be} very`;
        answer = c ? (small ? 'a few' : 'few') : (small ? 'a little' : 'little');
        choices = c ? ['a little', 'much'] : (small ? ['a few', 'many'] : ['few', 'many']);
        clue = small ? 'A small number or amount, but some:' : 'Almost none:';
        en = c ? `${small ? 'a few' : 'very few'} + plural countable noun${small ? '' : ' = almost none'}.` : `${small ? 'a little' : 'very little'} + uncountable noun${small ? '' : ' = almost none'}.`;
        vi = c ? `${small ? 'a few' : 'very few'} + danh từ đếm được số nhiều${small ? ' = một vài' : ' = rất ít, gần như không có'}.` : `${small ? 'a little' : 'very little'} + danh từ không đếm được${small ? ' = một chút' : ' = rất ít, gần như không có'}.`;
      } else {
        const any = i % 2 === 0;
        head = any ? `There ${neg}` : `There ${be}`; answer = any ? 'any' : 'no'; choices = any ? ['no', 'some'] : ['any', 'none'];
        clue = any ? 'Negative verb, so:' : 'Positive verb with a negative meaning:';
        en = any ? "Use any after a negative verb: there isn't / aren't any." : 'Use no + noun after a positive verb: there is / are no = there isn\'t / aren\'t any.';
        vi = any ? "Dùng any sau động từ phủ định: there isn't / aren't any." : "Dùng no + danh từ sau động từ khẳng định: there is / are no = there isn't / aren't any.";
      }
      const make = (x: string) => `${head} ${x} ${n.noun} ${n.place}.`, gap = `${head} ___ ${n.noun} ${n.place}.`;
      return [withContext(frame(`${form}-${i}`, make(answer), choices.map(make), gap, answer, choices, `${clue} ${gap}`, `${en} ${make(answer)}`, vi), `qnt:${n.noun}`)];
    });
    register(65, 'quantifiers', form, frames);
  }

  // Unit 66 (A2 Unit 24): fashion words.
  registerWordUnit(66, FASHION_WORDS, 'fashion', 'fashion-meaning');
}
