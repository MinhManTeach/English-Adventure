import type { TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { REGULAR_VERBS, IRREGULAR_A2, PAST_MARKERS, MARKER_ITEMS, WAS_WERE_ITEMS, WH_ITEMS, WHO_ITEMS, WAS_DID_ITEMS, LEISURE_WORDS } from './content';

const wasWere = (be: string) => (be === 'are' ? 'were' : 'was');

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  const notI = SUBJECTS.filter(s => s.text !== 'I');
  // Unit 46: -ed spelling, A2 irregular verbs, past time expressions, was/were with tricky subjects.
  register(46, 'past-simple', 'ed-spelling', SUBJECTS.flatMap((s, i) => REGULAR_VERBS.map((v, j) => {
    const subject = cap(s.text), tail = `${v.obj} ${v.time}`, correct = `${subject} ${v.past} ${tail}.`, choices = [...v.wrong, v.base];
    return withContext(frame(`ed-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), `${subject} ___ ${tail}. (${v.base})`, v.past, choices,
      `Write "${v.base}" in the past: ${subject} ___ ${tail}.`,
      `-ed spelling: consonant + y → -ied (study → studied); vowel + y → -yed (play → played); one short vowel + one consonant → double it (stop → stopped). ${v.base} → ${v.past}. ${correct}`,
      `Chính tả -ed: phụ âm + y → -ied (study → studied); nguyên âm + y → -yed (play → played); một nguyên âm ngắn + một phụ âm → gấp đôi phụ âm (stop → stopped): ${v.base} → ${v.past}.`), `regular:${v.base}`, s.text);
  })));
  register(46, 'past-simple', 'irregular', SUBJECTS.flatMap((s, i) => IRREGULAR_A2.map((v, j) => {
    const subject = cap(s.text), tail = `${v.obj} ${v.time}`, correct = `${subject} ${v.past} ${tail}.`, choices = [...v.wrong, v.base];
    return withContext(frame(`irregular-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), `${subject} ___ ${tail}. (${v.base})`, v.past, choices,
      `"${v.base}" is irregular. Complete: ${subject} ___ ${tail}.`,
      `"${v.base}" is irregular: its past form is ${v.past} for every subject. ${correct}`,
      `"${v.base}" là động từ bất quy tắc: quá khứ là ${v.past} với mọi chủ ngữ.`), `irregular:${v.base}`, s.text);
  })));
  register(46, 'past-time', 'time-expression', MARKER_ITEMS.map(([gap, answer], i) => {
    const choices = PAST_MARKERS.filter(x => x !== answer), correct = gap.replace('___', answer);
    return withContext(frame(`marker-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, [...choices], `Choose ago, last, yesterday or in: ${gap}`,
      `Past time words: three years ago (after the time), last week/Friday/year, yesterday (morning), in 2008 / in the 1990s. ${correct}`,
      'Từ chỉ thời gian quá khứ: three years ago (ago đứng sau khoảng thời gian), last week/Friday/year, yesterday (morning), in 2008 / in the 1990s.'), `marker:${i}`);
  }));
  register(46, 'past-simple', 'was-were', WAS_WERE_ITEMS.map(([gap, answer], i) => {
    const choices = [answer === 'was' ? 'were' : 'was', 'did', 'been'], correct = gap.replace('___', answer);
    return withContext(frame(`was-were-${i}`, correct, choices.map(x => gap.replace('___', x)), gap, answer, choices, `Choose was or were: ${gap}`,
      `was with singular and uncountable subjects (everybody, nobody, the news, the weather); were with plural subjects (jeans, glasses, the police, my family and I). ${correct}`,
      'was dùng với chủ ngữ số ít và không đếm được (everybody, nobody, the news, the weather); were dùng với chủ ngữ số nhiều (jeans, glasses, the police, my family and I).'), `was-were:${i}`);
  }));

  // Unit 47: didn't, Did …?, wh-questions, subject/object questions, was/were or did.
  register(47, 'past-simple', 'negative', SUBJECTS.flatMap((s, i) => IRREGULAR_A2.map((v, j) => {
    const subject = cap(s.text), tail = `${v.obj} ${v.time}`, correct = `${subject} didn't ${v.base} ${tail}.`, b = wasWere(s.be);
    return withContext(frame(`negative-${i}-${j}`, correct,
      [`${subject} didn't ${v.past} ${tail}.`, `${subject} ${b}n't ${v.base} ${tail}.`, `${subject} not ${v.past} ${tail}.`],
      `${subject} ___ ${v.base} ${tail}.`, "didn't", [`${b}n't`, s.third ? "doesn't" : "don't", 'not'], `Say no about the past: ${subject} ___ ${v.base} ${tail}.`,
      `Past negative: didn't + base verb, also for irregular verbs (didn't ${v.base}, not didn't ${v.past}). ${correct}`,
      `Phủ định quá khứ: didn't + động từ nguyên mẫu, kể cả động từ bất quy tắc (didn't ${v.base}, không phải didn't ${v.past}).`), `irregular:${v.base}`, s.text);
  })));
  register(47, 'past-simple', 'question', notI.flatMap((s, i) => IRREGULAR_A2.map((v, j) => {
    const tail = `${v.obj} ${v.time}`, correct = `Did ${s.text} ${v.base} ${tail}?`, b = cap(wasWere(s.be)), present = s.third ? 'Does' : 'Do';
    return withContext(frame(`question-${i}-${j}`, correct,
      [`Did ${s.text} ${v.past} ${tail}?`, `${b} ${s.text} ${v.base} ${tail}?`, `${present} ${s.text} ${v.past} ${tail}?`],
      `___ ${s.text} ${v.base} ${tail}?`, 'Did', [b, present, 'Have'], `Ask about the past: ___ ${s.text} ${v.base} ${tail}?`,
      `Past questions: Did + subject + base verb. ${correct}`, 'Câu hỏi quá khứ: Did + chủ ngữ + động từ nguyên mẫu.'), `irregular:${v.base}`, s.text);
  })));
  register(47, 'past-questions', 'wh-question', notI.flatMap((s, i) => WH_ITEMS.map((v, j) => {
    const answer = `did ${s.text} ${v.base}`, choices = [`${s.text} ${v.past}`, `did ${s.text} ${v.past}`, `${wasWere(s.be)} ${s.text} ${v.base}`];
    const correct = `${v.wh} ${answer} ${v.tail}?`;
    return withContext(frame(`wh-${i}-${j}`, correct, choices.map(x => `${v.wh} ${x} ${v.tail}?`), `${v.wh} ___ ${v.tail}? (${s.text} / ${v.base})`, answer, choices,
      `Ask with "${v.wh}": ${v.wh} ___ ${v.tail}?`,
      `Wh-questions in the past: question word + did + subject + base verb. ${correct}`,
      'Câu hỏi có từ để hỏi ở quá khứ: từ để hỏi + did + chủ ngữ + động từ nguyên mẫu.'), `wh:${v.wh}|${v.base}`, s.text);
  })));
  register(47, 'past-questions', 'subject-object', WHO_ITEMS.map(([gap, answer, wrong, kind], i) => {
    const question = gap.split(' — ')[0], correct = question.replace('___', answer);
    return withContext(frame(`who-${i}`, correct, wrong.map(x => question.replace('___', x)), gap, answer, [...wrong],
      `Subject or object question? ${gap}`,
      kind === 'subject'
        ? `When Who/What is the subject, there is no did: Who + past verb …? ${correct}`
        : `When Who/What is the object, use did + subject + base verb. ${correct}`,
      kind === 'subject'
        ? 'Khi Who/What làm chủ ngữ thì không dùng did: Who + động từ quá khứ …?'
        : 'Khi Who/What làm tân ngữ thì dùng did + chủ ngữ + động từ nguyên mẫu.'), `who:${i}`);
  }));
  register(47, 'past-simple', 'was-or-did', WAS_DID_ITEMS.map(([gap, answer, wrong], i) => {
    const correct = gap.replace('___', answer);
    return withContext(frame(`was-did-${i}`, correct, wrong.map(x => gap.replace('___', x)), gap, answer, [...wrong], `was/were or did? ${gap}`,
      `Use was/were with adjectives, places and nouns; use did/didn't with other verbs. ${correct}`,
      'Dùng was/were với tính từ, nơi chốn và danh từ; dùng did/didn\'t với động từ thường.'), `was-did:${i}`);
  }));

  // Unit 48: leisure time words.
  registerWordUnit(48, LEISURE_WORDS, 'leisure-a2', 'leisure-meaning');
}
