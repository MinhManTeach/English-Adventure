import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { A_AN_ITEMS, SECOND_MENTION, UNIQUE_THE, ZERO_ARTICLE, ORDINALS, CARDINALS, MONTHS, NUMBER_WORDS, COUNTED, NATURE_WORDS } from './content';

const MULTIPLIERS = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const;
const PLACE_SCENES = [
  (o: string) => `Our flat is on the ${o} floor.`, (o: string) => `Nam came ${o} in the race.`,
  (o: string) => `This is my ${o} visit to Hue.`, (o: string) => `Today is my sister's ${o} birthday.`,
] as const;

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 28: a / an, the for second mention and unique things, no article with sports, subjects, languages and transport.
  register(28, 'articles', 'a-an', A_AN_ITEMS.map(([gap, key, art], i) => {
    const choices = [art === 'a' ? 'an' : 'a', 'any', 'much'], correct = gap.replace('___', art);
    return withContext(frame(`a-an-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, art, choices, `Listen to the first sound of the next word: ${gap}`,
      `Use an before a vowel sound and a before a consonant sound. ${correct}`, 'Dùng an trước nguyên âm (theo cách đọc), a trước phụ âm.'), `aan:${key}`);
  }));
  register(28, 'articles', 'second-mention', SECOND_MENTION.map(([first, noun, rest], i) => {
    const gap = `${first} ___ ${noun} ${rest}`, correct = `${first} The ${noun} ${rest}`, choices = ['A', 'An', 'Some'];
    return withContext(frame(`second-${i}`, correct, choices.map(x => `${first} ${x} ${noun} ${rest}`), gap, 'The', choices, `We already know which ${noun}: ${gap}`,
      `First time: a / an. When we talk about it again: the. ${correct}`, 'Lần đầu nhắc đến: a / an. Nhắc lại lần sau: the.'), `second:${noun}`);
  }));
  register(28, 'articles', 'unique-the', UNIQUE_THE.map(([gap, key], i) => {
    const start = gap.startsWith('___'), answer = start ? 'The' : 'the', choices = start ? ['A', 'An', 'One'] : ['a', 'an', 'one'];
    const correct = gap.replace('___', answer);
    return withContext(frame(`unique-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, choices, `There is only one: ${gap}`,
      `Use the when there is only one, or everybody knows which one. ${correct}`, 'Dùng the khi chỉ có một, hoặc ai cũng biết là cái nào.'), `unique:${key}`);
  }));
  register(28, 'articles', 'zero-article', ZERO_ARTICLE.map(([gap, word], i) => {
    const choices = [`the ${word}`, `a ${word}`, `an ${word}`], correct = gap.replace('___', word);
    return withContext(frame(`zero-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, word, choices, `Sports, school subjects, languages and by + transport: ${gap}`,
      `No article with sports, school subjects, languages or by + transport. ${correct}`, 'Không dùng mạo từ với môn thể thao, môn học, ngôn ngữ và by + phương tiện.'), `zero:${word}`);
  }));
  // Unit 29: ordinal numbers in dates and places, number spelling, hundred / thousand without -s.
  register(29, 'numbers', 'ordinal-date', ORDINALS.map(([n, ord, wrong], i) => {
    let month = MONTHS[(i * 5) % 12]; if (n >= 29 && month === 'February') month = 'March';
    const gap = `My birthday is on the ___ of ${month}. (${n})`, correct = `My birthday is on the ${ord} of ${month}.`, choices = [CARDINALS[n], wrong, `${ord}s`];
    return withContext(frame(`date-${n}`, correct, choices.map(x => `My birthday is on the ${x} of ${month}.`), gap, ord, choices, `Say the date: ${gap}`,
      `Dates use ordinal numbers: the ${ord} of ${month}. ${correct}`, `Ngày tháng dùng số thứ tự: the ${ord} of ${month}.`), `ordinal:${n}`);
  }));
  register(29, 'numbers', 'ordinal-place', ORDINALS.filter(([n]) => n <= 24).map(([n, ord, wrong], i) => {
    const scene = PLACE_SCENES[i % PLACE_SCENES.length], correct = scene(ord), gap = `${scene('___')} (${n})`, choices = [CARDINALS[n], wrong, `${ord}s`];
    return withContext(frame(`place-${n}`, correct, choices.map(x => scene(x)), gap, ord, choices, `Order or position: ${gap}`,
      `Use ordinal numbers for order: first, second, third … ${correct}`, 'Dùng số thứ tự để chỉ thứ tự: first, second, third …'), `place:${n}`);
  }));
  const spelling: ControlledFrame[] = [];
  for (const [i, [n, word, wrong]] of NUMBER_WORDS.entries()) for (const [j, [thing, place]] of COUNTED.entries()) {
    const start = j % 2 === 0, choices = [...wrong, word === 'a hundred' ? 'a hundred of' : `${word}s`];
    const make = (x: string) => start ? `${cap(x)} ${thing} are ${place}.` : `There are ${x} ${thing} ${place}.`;
    const gap = start ? `___ ${thing} are ${place}. (${n})` : `There are ___ ${thing} ${place}. (${n})`, answer = start ? cap(word) : word;
    spelling.push(withContext(frame(`spell-${i}-${j}`, make(word), choices.map(make), gap, answer, choices.map(x => start ? cap(x) : x), `Write the number in words: ${gap}`,
      `${n} = ${word}. ${make(word)}`, `${n} viết là ${word}.`), `spell:${n}|${thing}`));
  }
  register(29, 'numbers', 'number-word', spelling);
  const big: ControlledFrame[] = [];
  for (const [i, m] of MULTIPLIERS.entries()) for (const [j, [thing, place]] of COUNTED.entries()) {
    const unit = (i + j) % 2 === 0 ? 'hundred' : 'thousand', value = (i + 2) * (unit === 'hundred' ? 100 : 1000);
    const choices = [`${unit}s`, `${unit}s of`, `${unit} of`], make = (x: string) => `There are ${m} ${x} ${thing} ${place}.`;
    big.push(withContext(frame(`big-${i}-${j}`, make(unit), choices.map(make), `There are ${m} ___ ${thing} ${place}. (${value.toLocaleString('en-US')})`, unit, choices,
      `Write the big number: There are ${m} ___ ${thing} ${place}.`, `After a number, hundred and thousand have no -s and no of. ${make(unit)}`,
      'Sau một con số, hundred và thousand không thêm -s và không có of.'), `big:${value}|${thing}`));
  }
  register(29, 'numbers', 'hundred-thousand', big);
  // Unit 30: weather, seasons, nature and ecology words.
  registerWordUnit(30, NATURE_WORDS, 'nature', 'nature-meaning');
}
