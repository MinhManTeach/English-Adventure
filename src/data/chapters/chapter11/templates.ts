import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { OWNERS, OWNED, PRONOUNS, OBJECT_FRAMES, BELONGINGS, ITS_ITEMS, CLOTHES_WORDS } from './content';

export function addTemplates({ register, frame, withContext, registerWordUnit }: TemplateApi) {
  // Unit 31: possessive 's and s', Whose …? questions and answers.
  for (const form of ['possessive-s', 'whose-question', 'whose-answer']) {
    const frames: ControlledFrame[] = [];
    for (const [i, o] of OWNERS.entries()) for (const [j, thing] of OWNED.entries()) {
      const plural = o.poss.endsWith("s'"), irregular = !plural && !/^[A-Z]/.test(o.owner);
      let correct = `This is ${o.poss} ${thing}.`, answer: string = o.poss, gap = `This is ___ ${thing}. (${o.owner})`, choices: string[] = [...o.wrong];
      let errors = choices.map(x => `This is ${x} ${thing}.`), clue = `Show who it belongs to: ${gap}`;
      let en = plural ? `Plural nouns ending in -s add only an apostrophe: ${o.poss}. ${correct}` : irregular ? `Plural nouns without -s add 's: ${o.poss}. ${correct}` : `Add 's to a name to show who owns something. ${correct}`;
      let vi = plural ? "Danh từ số nhiều tận cùng -s chỉ thêm dấu ': parents'." : irregular ? "Danh từ số nhiều không tận cùng -s thì thêm 's: children's." : "Thêm 's sau tên người để chỉ sở hữu.";
      if (form === 'whose-question') { answer = 'Whose'; correct = `Whose ${thing} is this? It's ${o.poss}.`; gap = `___ ${thing} is this? It's ${o.poss}.`; choices = ['Who', "Who's", 'Whos']; errors = choices.map(x => `${x} ${thing} is this? It's ${o.poss}.`); clue = `Ask who it belongs to: ${gap}`; en = `Whose + noun asks who something belongs to. ${correct}`; vi = 'Whose + danh từ dùng để hỏi vật đó của ai.'; }
      if (form === 'whose-answer') { correct = `Whose ${thing} is this? It's ${o.poss}.`; gap = `Whose ${thing} is this? It's ___. (${o.owner})`; errors = choices.map(x => `Whose ${thing} is this? It's ${x}.`); clue = `Answer the Whose question: ${gap}`; }
      frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, choices, clue, en, vi), `owner:${o.owner}|${thing}`));
    }
    register(31, 'possessives', form, frames);
  }
  // Unit 32: object pronouns, possessive adjectives, possessive pronouns, its or it's.
  const objects: ControlledFrame[] = [];
  for (const [i, p] of PRONOUNS.entries()) for (const [j, f] of OBJECT_FRAMES.entries()) {
    const correct = f.replace('___', p.object), gap = `${f} (${p.subject})`;
    objects.push(withContext(frame(`object-${i}-${j}`, correct, p.objWrong.map(x => f.replace('___', x)), gap, p.object, [...p.objWrong], `Use the object form of "${p.subject}": ${gap}`,
      `After a verb or a preposition, use an object pronoun: me, you, him, her, it, us, them. ${correct}`, 'Sau động từ hoặc giới từ dùng đại từ tân ngữ: me, you, him, her, it, us, them.'), `object:${j}`, p.subject));
  }
  register(32, 'pronouns', 'object-pronoun', objects);
  for (const form of ['possessive-adjective', 'possessive-pronoun']) {
    const frames: ControlledFrame[] = [];
    for (const [i, p] of PRONOUNS.entries()) for (const [j, thing] of BELONGINGS.entries()) {
      const adj = form === 'possessive-adjective', answer = adj ? p.adj : p.pron, wrong = adj ? p.adjWrong : p.pronWrong;
      const make = (x: string) => adj ? `Is this ${x} ${thing}?` : `This ${thing} is ${x}.`;
      const gap = `${make('___')} (${p.subject})`;
      frames.push(withContext(frame(`${form}-${i}-${j}`, make(answer), wrong.map(make), gap, answer, [...wrong],
        adj ? `Put my / your / his / her / our / their before the noun: ${gap}` : `Use mine / yours / his / hers / ours / theirs with no noun after it: ${gap}`,
        adj ? `Possessive adjectives come before a noun: my bike, their bike. ${make(answer)}` : `Possessive pronouns stand alone, with no noun and no apostrophe: mine, yours, hers, ours, theirs. ${make(answer)}`,
        adj ? 'Tính từ sở hữu đứng trước danh từ: my bike, their bike.' : 'Đại từ sở hữu đứng một mình, không có danh từ theo sau và không có dấu nháy: mine, yours, hers, ours, theirs.'),
      `${form}:${thing}`, p.subject));
    }
    register(32, 'pronouns', form, frames);
  }
  register(32, 'pronouns', 'its', ITS_ITEMS.map(([gap, key], i) => {
    const start = gap.startsWith('___') || gap.includes('. ___'), answer = start ? 'Its' : 'its', choices = start ? ["It's", 'Its\'', 'It'] : ["it's", "its'", 'it'];
    const correct = gap.replace('___', answer);
    return withContext(frame(`its-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, choices, `It belongs to the ${key}: ${gap}`,
      `its = belonging to it (no apostrophe). it's = it is. ${correct}`, "its = của nó (không có dấu nháy). it's = it is (nó là)."), `its:${key}`);
  }));
  // Unit 33: clothes and fashion words.
  registerWordUnit(33, CLOTHES_WORDS, 'clothes', 'clothes-meaning');
}
