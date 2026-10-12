import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { COUNTABLES, PLURAL_RULES, NUMBERS, UNCOUNTABLES, SHOP_WORDS } from './content';

const article = (word: string) => /^[aeiou]/.test(word) ? 'an' : 'a';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  // Unit 22: plural spelling, a/an with one countable thing, some with uncountable nouns, is/are agreement.
  for (const form of ['plural-spelling', 'plural-be', 'a-an-or-some']) {
    const frames: ControlledFrame[] = [];
    for (const [i, n] of COUNTABLES.entries()) for (const [j, num] of NUMBERS.entries()) {
      if (form === 'a-an-or-some' && j > 0) continue; // one thing: the number does not change the sentence
      const rule = PLURAL_RULES[n.rule];
      let correct = `There are ${num} ${n.many} ${n.place}.`, answer: string = n.many, gap = `There are ${num} ___ ${n.place}. (${n.one})`;
      let choices: string[] = [...n.wrong, n.one !== n.many ? n.one : `${n.one}en`];
      let errors = choices.map(x => `There are ${num} ${x} ${n.place}.`), clue = `Write the plural of "${n.one}": There are ${num} ___ ${n.place}.`;
      let en = `${rule.en} ${n.one} → ${n.many}. ${correct}`, vi = `${rule.vi} ${n.one} → ${n.many}.`;
      if (form === 'plural-be') { correct = `There ${j % 2 === 0 ? 'are' : 'is'} ${j % 2 === 0 ? `${num} ${n.many}` : `${article(n.one)} ${n.one}`} ${n.place}.`; answer = j % 2 === 0 ? 'are' : 'is'; gap = `There ___ ${j % 2 === 0 ? `${num} ${n.many}` : `${article(n.one)} ${n.one}`} ${n.place}.`; choices = [answer === 'are' ? 'is' : 'are', 'am', 'be']; errors = choices.map(x => correct.replace(`There ${answer} `, `There ${x} `)); clue = `One thing or more than one? ${gap}`; en = `One thing: there is. More than one: there are. ${correct}`; vi = 'Một vật: there is. Nhiều vật: there are.'; }
      if (form === 'a-an-or-some') { const a = article(n.one); correct = `There is ${a} ${n.one} ${n.place}.`; answer = a; gap = `There is ___ ${n.one} ${n.place}.`; choices = [a === 'a' ? 'an' : 'a', 'some', 'any']; errors = choices.map(x => `There is ${x} ${n.one} ${n.place}.`); clue = `One countable thing. Complete: ${gap}`; en = `Use a/an with one countable thing: an before a vowel sound, a before a consonant sound. ${correct}`; vi = 'Dùng a/an với một vật đếm được: an trước nguyên âm, a trước phụ âm.'; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `noun:${n.one}`));
    }
    register(22, 'plurals', form, frames);
  }
  for (const form of ['some-uncountable', 'no-plural', 'uncountable-is']) {
    const frames: ControlledFrame[] = UNCOUNTABLES.map((u, i) => {
      let correct = `There is some ${u.noun} ${u.place}.`, answer = 'some', gap = `There is ___ ${u.noun} ${u.place}.`, choices = ['a', 'an', 'many'];
      let errors = choices.map(x => `There is ${x} ${u.noun} ${u.place}.`), clue = `"${u.noun}" is uncountable. Complete: ${gap}`;
      let en = `Uncountable nouns don't take a/an. Use some. ${correct}`, vi = 'Danh từ không đếm được không dùng a/an; dùng some.';
      if (form === 'no-plural') { correct = `The ${u.noun} ${u.place} is ${u.adj}.`; answer = u.noun; gap = `The ___ ${u.place} is ${u.adj}. (${u.noun})`; choices = [`${u.noun}s`, `${u.noun}es`, `a ${u.noun}`]; errors = choices.map(x => `The ${x} ${u.place} is ${u.adj}.`); clue = `"${u.noun}" has no plural. Complete: ${gap}`; en = `Uncountable nouns have no plural form. ${correct}`; vi = 'Danh từ không đếm được không có dạng số nhiều.'; }
      if (form === 'uncountable-is') { correct = `The ${u.noun} ${u.place} is ${u.adj}.`; answer = 'is'; gap = `The ${u.noun} ${u.place} ___ ${u.adj}.`; choices = ['are', 'am', 'be']; errors = choices.map(x => `The ${u.noun} ${u.place} ${x} ${u.adj}.`); clue = `Uncountable nouns take a singular verb: ${gap}`; en = `Uncountable nouns take is, not are. ${correct}`; vi = 'Danh từ không đếm được đi với is, không đi với are.'; }
      return withContext(frame(`${form}-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `uncountable:${u.noun}`);
    });
    register(22, 'uncountable', form, frames);
  }
  // Unit 23: much/many, How much/How many, some/any, a few/a little, a lot of.
  for (const form of ['how-many', 'any-negative', 'some-positive', 'a-few', 'a-lot-of']) {
    const frames: ControlledFrame[] = [];
    for (const [i, n] of COUNTABLES.entries()) {
      if (n.many === n.one) continue;
      let correct = `How many ${n.many} are there ${n.place}?`, answer = 'many', gap = `How ___ ${n.many} are there ${n.place}?`, choices = ['much', 'lot', 'few'];
      let errors = choices.map(x => `How ${x} ${n.many} are there ${n.place}?`), clue = `"${n.many}" is countable. Complete: ${gap}`;
      let en = `How many + plural countable noun. ${correct}`, vi = 'How many + danh từ đếm được số nhiều.';
      if (form === 'any-negative') { correct = `There aren't any ${n.many} ${n.place}.`; answer = 'any'; gap = `There aren't ___ ${n.many} ${n.place}.`; choices = ['some', 'a', 'much']; errors = choices.map(x => `There aren't ${x} ${n.many} ${n.place}.`); clue = `Negative sentence. Complete: ${gap}`; en = `Use any in negatives and questions. ${correct}`; vi = 'Dùng any trong câu phủ định và câu hỏi.'; }
      if (form === 'some-positive') { correct = `There are some ${n.many} ${n.place}.`; answer = 'some'; gap = `There are ___ ${n.many} ${n.place}.`; choices = ['any', 'a', 'much']; errors = choices.map(x => `There are ${x} ${n.many} ${n.place}.`); clue = `Positive sentence. Complete: ${gap}`; en = `Use some in positive sentences. ${correct}`; vi = 'Dùng some trong câu khẳng định.'; }
      if (form === 'a-few') { correct = `There are a few ${n.many} ${n.place}.`; answer = 'a few'; gap = `There are ___ ${n.many} ${n.place}. (not many)`; choices = ['a little', 'much', 'a lot']; errors = choices.map(x => `There are ${x} ${n.many} ${n.place}.`); clue = `A small number of countable things: ${gap}`; en = `a few + plural countable noun = a small number. ${correct}`; vi = 'a few + danh từ đếm được số nhiều = một vài.'; }
      if (form === 'a-lot-of') { correct = `There are a lot of ${n.many} ${n.place}.`; answer = 'a lot of'; gap = `There are ___ ${n.many} ${n.place}. (very many)`; choices = ['a lot', 'much', 'a little']; errors = choices.map(x => `There are ${x} ${n.many} ${n.place}.`); clue = `A big number: ${gap}`; en = `a lot of works with countable and uncountable nouns. ${correct}`; vi = 'a lot of dùng được với cả danh từ đếm được và không đếm được.'; }
      frames.push(withContext(frame(`${form}-c-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `noun:${n.one}`));
    }
    for (const [i, u] of UNCOUNTABLES.entries()) {
      let correct = `How much ${u.noun} is there ${u.place}?`, answer = 'much', gap = `How ___ ${u.noun} is there ${u.place}?`, choices = ['many', 'lot', 'few'];
      let errors = choices.map(x => `How ${x} ${u.noun} is there ${u.place}?`), clue = `"${u.noun}" is uncountable. Complete: ${gap}`;
      let en = `How much + uncountable noun. ${correct}`, vi = 'How much + danh từ không đếm được.';
      if (form === 'any-negative') { correct = `There isn't any ${u.noun} ${u.place}.`; answer = 'any'; gap = `There isn't ___ ${u.noun} ${u.place}.`; choices = ['some', 'a', 'many']; errors = choices.map(x => `There isn't ${x} ${u.noun} ${u.place}.`); clue = `Negative sentence. Complete: ${gap}`; en = `Use any in negatives and questions. ${correct}`; vi = 'Dùng any trong câu phủ định và câu hỏi.'; }
      if (form === 'some-positive') { correct = `There is some ${u.noun} ${u.place}.`; answer = 'some'; gap = `There is ___ ${u.noun} ${u.place}.`; choices = ['any', 'a', 'many']; errors = choices.map(x => `There is ${x} ${u.noun} ${u.place}.`); clue = `Positive sentence. Complete: ${gap}`; en = `Use some in positive sentences. ${correct}`; vi = 'Dùng some trong câu khẳng định.'; }
      if (form === 'a-few') { correct = `There is a little ${u.noun} ${u.place}.`; answer = 'a little'; gap = `There is ___ ${u.noun} ${u.place}. (not much)`; choices = ['a few', 'many', 'a lot']; errors = choices.map(x => `There is ${x} ${u.noun} ${u.place}.`); clue = `A small amount of something uncountable: ${gap}`; en = `a little + uncountable noun = a small amount. ${correct}`; vi = 'a little + danh từ không đếm được = một ít.'; }
      if (form === 'a-lot-of') { correct = `There is a lot of ${u.noun} ${u.place}.`; answer = 'a lot of'; gap = `There is ___ ${u.noun} ${u.place}. (very much)`; choices = ['a lot', 'many', 'a few']; errors = choices.map(x => `There is ${x} ${u.noun} ${u.place}.`); clue = `A big amount: ${gap}`; en = `a lot of works with countable and uncountable nouns. ${correct}`; vi = 'a lot of dùng được với cả danh từ đếm được và không đếm được.'; }
      frames.push(withContext(frame(`${form}-u-${i}`, correct, errors, gap, answer, choices, clue, en, vi), `uncountable:${u.noun}`));
    }
    register(23, 'quantifiers', form, frames);
  }
  // Unit 24: food and shopping words.
  registerWordUnit(24, SHOP_WORDS, 'shop', 'shop-meaning');
}
