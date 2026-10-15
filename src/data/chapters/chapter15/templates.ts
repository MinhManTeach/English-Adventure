import type { ControlledFrame, TemplateApi } from '../../templates/questionTemplates';
import { SUBJECTS } from '../../templates/controlledPools';
import { ROUTINES, ADVERBS, BE_STATES, THERE_ITEMS, ING_VERBS, NOW_WORDS, TEMPORARY, STATE_VERBS, TWO_MEANINGS, FAMILY_FRIENDS_WORDS } from './content';

const notBe = (be: string) => (be === 'am' ? 'am not' : `${be}n't`);
const otherBe = (be: string) => (be === 'is' ? 'are' : 'is');

export function addTemplates({ register, frame, withContext, cap, registerWordUnit }: TemplateApi) {
  // Unit 43: present simple spelling, negatives, How often questions, adverb position; there is / there are.
  const thirds = SUBJECTS.filter(s => s.third), notI = SUBJECTS.filter(s => s.text !== 'I');
  register(43, 'present-simple', 'spelling', thirds.flatMap((s, i) => ROUTINES.map((v, j) => {
    const subject = cap(s.text), tail = `${v.obj} ${v.time}`, correct = `${subject} ${v.third} ${tail}.`, choices = [...v.wrong, v.base];
    return withContext(frame(`spelling-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), `${subject} ___ ${tail}. (${v.base})`, v.third, choices,
      `Write "${v.base}" for he or she: ${subject} ___ ${tail}.`,
      `He/she/it: add -s, -es after ch, sh, s, x, o, and change consonant + y to -ies: ${v.base} → ${v.third}. ${correct}`,
      `Ngôi thứ ba số ít: thêm -s; thêm -es sau ch, sh, s, x, o; phụ âm + y đổi thành -ies: ${v.base} → ${v.third}.`), `routine:${v.base}`, s.text);
  })));
  register(43, 'present-simple', 'negative', SUBJECTS.flatMap((s, i) => ROUTINES.map((v, j) => {
    const subject = cap(s.text), tail = `${v.obj} ${v.time}`, neg = s.third ? "doesn't" : "don't", other = s.third ? "don't" : "doesn't";
    const correct = `${subject} ${neg} ${v.base} ${tail}.`;
    return withContext(frame(`negative-${i}-${j}`, correct,
      [`${subject} ${neg} ${v.third} ${tail}.`, `${subject} ${other} ${v.base} ${tail}.`, `${subject} ${notBe(s.be)} ${v.base} ${tail}.`],
      `${subject} ___ ${v.base} ${tail}.`, neg, [other, notBe(s.be), 'not'], `Say no about a routine: ${subject} ___ ${v.base} ${tail}.`,
      `Present Simple negative: don't/doesn't + base verb (no -s after doesn't). ${correct}`,
      "Phủ định hiện tại đơn: don't/doesn't + động từ nguyên mẫu (sau doesn't không thêm -s)."), `routine:${v.base}`, s.text);
  })));
  register(43, 'present-simple', 'how-often', notI.flatMap((s, i) => ROUTINES.map((v, j) => {
    const aux = s.third ? 'does' : 'do', other = s.third ? 'do' : 'does', correct = `How often ${aux} ${s.text} ${v.base} ${v.obj}?`;
    return withContext(frame(`how-often-${i}-${j}`, correct,
      [`How often ${other} ${s.text} ${v.base} ${v.obj}?`, `How often ${aux} ${s.text} ${v.third} ${v.obj}?`, `How often ${s.be} ${s.text} ${v.base} ${v.obj}?`],
      `How often ___ ${s.text} ${v.base} ${v.obj}?`, aux, [other, s.be, 'has'], `Ask about a routine: How often ___ ${s.text} ${v.base} ${v.obj}?`,
      `Wh-questions in Present Simple: question word + do/does + subject + base verb. ${correct}`,
      'Câu hỏi có từ để hỏi ở hiện tại đơn: từ để hỏi + do/does + chủ ngữ + động từ nguyên mẫu.'), `routine:${v.base}`, s.text);
  })));
  const adverbFrames: ControlledFrame[] = [];
  for (const [i, s] of SUBJECTS.entries()) {
    const subject = cap(s.text);
    for (const [j, state] of BE_STATES.entries()) {
      const adv = ADVERBS[(i + j) % ADVERBS.length], answer = `${s.be} ${adv}`, correct = `${subject} ${answer} ${state}.`;
      const choices = [`${adv} ${s.be}`, adv, `${adv} ${otherBe(s.be)}`];
      adverbFrames.push(withContext(frame(`adverb-be-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${state}.`), `${subject} ___ ${state}. (${adv})`, answer, choices,
        `Put "${adv}" in the right place: ${subject} ___ ${state}.`, `Frequency adverbs go after be: ${answer}. ${correct}`,
        'Trạng từ chỉ tần suất đứng sau động từ be.'), `state:${state}`, s.text));
    }
    for (const [j, v] of ROUTINES.entries()) {
      const adv = ADVERBS[(i + j + 2) % ADVERBS.length], verb = s.third ? v.third : v.base, wrongVerb = s.third ? v.base : v.third;
      const answer = `${adv} ${verb}`, correct = `${subject} ${answer} ${v.obj}.`, choices = [`${verb} ${adv}`, `${adv} ${wrongVerb}`, `${s.be} ${adv} ${v.base}`];
      adverbFrames.push(withContext(frame(`adverb-verb-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${v.obj}.`), `${subject} ___ ${v.obj}. (${adv})`, answer, choices,
        `Put "${adv}" in the right place: ${subject} ___ ${v.obj}.`, `Frequency adverbs go before the main verb: ${answer}. ${correct}`,
        'Trạng từ chỉ tần suất đứng trước động từ thường.'), `routine:${v.base}`, s.text));
    }
  }
  register(43, 'frequency-adverbs', 'adverb-position', adverbFrames);
  register(43, 'there-is-are', 'some-any', THERE_ITEMS.flatMap((t, i) => {
    const be = t.plural ? 'are' : 'is', other = t.plural ? 'is' : 'are', rule = t.plural ? 'plural nouns take there are' : 'uncountable nouns take there is';
    const viRule = t.plural ? 'danh từ số nhiều dùng there are' : 'danh từ không đếm được dùng there is';
    const pos = `There ${be} some ${t.noun} ${t.place}.`, neg = `There ${be}n't any ${t.noun} ${t.place}.`, q = `${cap(be)} there any ${t.noun} ${t.place}?`;
    return [
      withContext(frame(`there-pos-${i}`, pos, [`There ${other} some ${t.noun} ${t.place}.`, `It ${be} some ${t.noun} ${t.place}.`, `There ${be} any ${t.noun} ${t.place}.`],
        `___ some ${t.noun} ${t.place}.`, `There ${be}`, [`There ${other}`, 'There have', 'There be'], `Say what is there: ___ some ${t.noun} ${t.place}.`,
        `"${t.noun}": ${rule}; use some in positive sentences. ${pos}`, `"${t.noun}": ${viRule}; câu khẳng định dùng some.`), `there:${t.noun}`),
      withContext(frame(`there-neg-${i}`, neg, [`There ${other}n't any ${t.noun} ${t.place}.`, `There ${be}n't some ${t.noun} ${t.place}.`, `There don't have any ${t.noun} ${t.place}.`],
        `There ___ any ${t.noun} ${t.place}.`, `${be}n't`, [`${other}n't`, "don't", 'not'], `Say there is none: There ___ any ${t.noun} ${t.place}.`,
        `"${t.noun}": ${rule}; use any in negatives. ${neg}`, `"${t.noun}": ${viRule}; câu phủ định dùng any.`), `there:${t.noun}`),
      withContext(frame(`there-q-${i}`, q, [`${cap(other)} there any ${t.noun} ${t.place}?`, `There ${be} any ${t.noun} ${t.place}?`, `Do there any ${t.noun} ${t.place}?`],
        `___ any ${t.noun} ${t.place}?`, `${cap(be)} there`, [`${cap(other)} there`, `There ${be}`, 'Do there'], `Ask: ___ any ${t.noun} ${t.place}?`,
        `Questions: ${cap(be)} there any …? ${rule}. ${q}`, `Câu hỏi: Is/Are there any …? ${viRule}.`), `there:${t.noun}`),
    ];
  }));
  register(43, 'there-is-are', 'how-many', THERE_ITEMS.map((t, i) => {
    const how = t.plural ? 'How many' : 'How much', answer = t.plural ? 'are there' : 'is there', other = t.plural ? 'is there' : 'are there';
    const flat = t.plural ? 'there are' : 'there is', correct = `${how} ${t.noun} ${answer} ${t.place}?`;
    return withContext(frame(`how-many-${i}`, correct, [`${how} ${t.noun} ${other} ${t.place}?`, `${how} ${t.noun} ${flat} ${t.place}?`, `${how} ${t.noun} ${t.plural ? 'do' : 'does'} there ${t.place}?`],
      `${how} ${t.noun} ___ ${t.place}?`, answer, [other, flat, t.plural ? 'do there' : 'does there'], `Ask about the amount: ${how} ${t.noun} ___ ${t.place}?`,
      `How many + plural noun + are there? How much + uncountable noun + is there? ${correct}`,
      'How many + danh từ số nhiều + are there? How much + danh từ không đếm được + is there?'), `there:${t.noun}`);
  }));

  // Unit 44: present continuous spelling, temporary vs usual, questions; state verbs and verbs with two meanings.
  register(44, 'present-continuous', 'ing-spelling', SUBJECTS.flatMap((s, i) => ING_VERBS.map((v, j) => {
    const subject = cap(s.text), now = NOW_WORDS[(i + j) % NOW_WORDS.length], tail = `${v.obj} ${now}`, correct = `${subject} ${s.be} ${v.ing} ${tail}.`;
    const choices = [...v.wrong, v.base];
    return withContext(frame(`ing-${i}-${j}`, correct, choices.map(x => `${subject} ${s.be} ${x} ${tail}.`), `${subject} ${s.be} ___ ${tail}. (${v.base})`, v.ing, choices,
      `Spell the -ing form of "${v.base}": ${subject} ${s.be} ___ ${tail}.`,
      `-ing spelling: drop silent -e (make → making), ie → y (lie → lying), double one final consonant after one short vowel (swim → swimming). ${v.base} → ${v.ing}. ${correct}`,
      `Chính tả -ing: bỏ -e câm (make → making), ie → y (lie → lying), gấp đôi phụ âm cuối sau một nguyên âm ngắn (swim → swimming): ${v.base} → ${v.ing}.`), `ing:${v.base}`, s.text);
  })));
  register(44, 'present-continuous', 'temporary-vs-usual', SUBJECTS.flatMap((s, i) => TEMPORARY.map((v, j) => {
    const subject = cap(s.text), pron = s.pronoun, verb = s.third ? v.third : v.base, wrongVerb = s.third ? v.base : v.third;
    if ((i + j) % 2 === 0) {
      const lead = `${subject} usually ${verb} ${v.usual}, but ${v.marker} ${pron}`, answer = `${s.be} ${v.ing}`, choices = [verb, `${s.be} ${v.base}`, v.ing];
      const correct = `${lead} ${answer} ${v.temp}.`;
      return withContext(frame(`temporary-${i}-${j}`, correct, choices.map(x => `${lead} ${x} ${v.temp}.`), `${lead} ___ ${v.temp}.`, answer, choices,
        `"${v.marker}" shows a temporary situation: ${lead} ___ ${v.temp}.`,
        `A temporary situation (${v.marker}) uses am/is/are + verb-ing; a usual habit uses Present Simple. ${correct}`,
        `Tình huống tạm thời (${v.marker}) dùng am/is/are + động từ-ing; thói quen thường ngày dùng hiện tại đơn.`), `temporary:${v.base}`, s.text);
    }
    const lead = `${cap(v.marker)}, ${s.text} ${s.be} ${v.ing} ${v.temp}, but ${pron} usually`, choices = [`${s.be} ${v.ing}`, wrongVerb, v.ing];
    const correct = `${lead} ${verb} ${v.usual}.`;
    return withContext(frame(`usual-${i}-${j}`, correct, choices.map(x => `${lead} ${x} ${v.usual}.`), `${lead} ___ ${v.usual}.`, verb, choices,
      `"usually" shows a habit: … but ${pron} usually ___ ${v.usual}.`,
      `A usual habit uses Present Simple; the temporary change uses am/is/are + verb-ing. ${correct}`,
      'Thói quen thường ngày (usually) dùng hiện tại đơn; sự thay đổi tạm thời dùng am/is/are + động từ-ing.'), `temporary:${v.base}`, s.text);
  })));
  register(44, 'present-continuous', 'question', notI.flatMap((s, i) => TEMPORARY.map((v, j) => {
    const answer = cap(s.be), wrongBe = cap(otherBe(s.be)), doAux = s.third ? 'Does' : 'Do', tail = `${v.temp} ${v.marker}`;
    const correct = `${answer} ${s.text} ${v.ing} ${tail}?`;
    return withContext(frame(`question-${i}-${j}`, correct,
      [`${wrongBe} ${s.text} ${v.ing} ${tail}?`, `${doAux} ${s.text} ${v.ing} ${tail}?`, `${answer} ${s.text} ${v.base} ${tail}?`],
      `___ ${s.text} ${v.ing} ${tail}?`, answer, [wrongBe, doAux, 'Am'], `Ask about a temporary situation: ___ ${s.text} ${v.ing} ${tail}?`,
      `Present Continuous questions: Am/Is/Are + subject + verb-ing. ${correct}`,
      'Câu hỏi hiện tại tiếp diễn: Am/Is/Are + chủ ngữ + động từ-ing.'), `temporary:${v.base}`, s.text);
  })));
  register(44, 'stative-verbs', 'state', SUBJECTS.flatMap((s, i) => STATE_VERBS.map((v, j) => {
    const subject = cap(s.text), verb = s.third ? v.third : v.base, wrongVerb = s.third ? v.base : v.third;
    const tail = `${v.obj} ${NOW_WORDS[(i + j) % NOW_WORDS.length]}`, correct = `${subject} ${verb} ${tail}.`, choices = [`${s.be} ${v.ing}`, wrongVerb, v.ing];
    return withContext(frame(`state-${i}-${j}`, correct, choices.map(x => `${subject} ${x} ${tail}.`), `${subject} ___ ${tail}.`, verb, choices,
      `"${v.base}" is a state verb. Complete: ${subject} ___ ${tail}.`,
      `"${v.base}" is a state verb, so it stays in Present Simple even with "now". ${correct}`,
      `"${v.base}" (${v.vi}) là động từ chỉ trạng thái nên vẫn dùng hiện tại đơn, kể cả khi có "now".`), `state-verb:${v.base}`, s.text);
  })));
  register(44, 'stative-verbs', 'state-negative', SUBJECTS.flatMap((s, i) => STATE_VERBS.map((v, j) => {
    const subject = cap(s.text), neg = s.third ? "doesn't" : "don't", other = s.third ? "don't" : "doesn't", tail = `${v.obj} at the moment`;
    const correct = `${subject} ${neg} ${v.base} ${tail}.`;
    return withContext(frame(`state-neg-${i}-${j}`, correct,
      [`${subject} ${notBe(s.be)} ${v.ing} ${tail}.`, `${subject} ${other} ${v.base} ${tail}.`, `${subject} ${neg} ${v.third} ${tail}.`],
      `${subject} ___ ${v.base} ${tail}.`, neg, [other, notBe(s.be), 'not'], `Say no with the state verb "${v.base}": ${subject} ___ ${v.base} ${tail}.`,
      `State verbs make negatives with don't/doesn't, not with -ing. ${correct}`,
      `Động từ chỉ trạng thái phủ định bằng don't/doesn't, không dùng dạng -ing.`), `state-verb:${v.base}`, s.text);
  })));
  register(44, 'stative-verbs', 'two-meanings', TWO_MEANINGS.map(([gap, answer, wrong, note], i) => {
    const correct = gap.replace('___', answer);
    return withContext(frame(`two-meanings-${i}`, correct, wrong.map(x => gap.replace('___', x)), gap, answer, [...wrong],
      `State or action? ${gap}`, `${note}. State meanings use Present Simple; action meanings can use -ing. ${correct}`,
      'Nghĩa chỉ trạng thái dùng hiện tại đơn; nghĩa chỉ hành động đang diễn ra có thể dùng dạng -ing.'), `two-meanings:${i}`);
  }));

  // Unit 45: family and friends words.
  registerWordUnit(45, FAMILY_FRIENDS_WORDS, 'family-a2', 'family-meaning');
}
