import type { LearnCard } from './learnContent';

type Example = readonly [en: string, vi: string, highlight: string];
const card = (unitId: number, n: number, title: string, titleVi: string, ruleEn: string, ruleVi: string,
  examples: readonly Example[], tip?: { en: string; vi: string }): LearnCard => ({
  id: `u${unitId}-c3-card-${n}`, unitId, title, titleVi, ruleEn, ruleVi,
  examples: examples.map(([en, vi, highlight]) => ({ en, vi, highlight })), ...(tip ? { tip } : {}),
});

export const CHAPTER3_LEARN_CARDS: Record<number, LearnCard[]> = {
  7: [
    card(7, 1, 'Habit or now?', 'Thói quen hay lúc này?',
      'Present Simple: things you do regularly. Present Continuous: things happening now.',
      'Hiện tại đơn: việc làm thường xuyên. Hiện tại tiếp diễn: việc đang diễn ra lúc nói.', [
        ['I walk to school every day.', 'Ngày nào tôi cũng đi bộ đến trường.', 'walk'],
        ['I am walking to school now.', 'Bây giờ tôi đang đi bộ đến trường.', 'am walking'],
      ]),
    card(7, 2, 'Habit words', 'Từ chỉ thói quen',
      'every day, on Mondays, twice a week, always, usually, often, sometimes, never → Present Simple.',
      'every day, on Mondays, twice a week, always, usually, often, sometimes, never → hiện tại đơn.', [
        ['We have Music on Mondays.', 'Chúng tôi học Âm nhạc vào các thứ Hai.', 'on Mondays'],
        ['Lan usually reads before bed.', 'Lan thường đọc sách trước khi ngủ.', 'usually'],
        ['He plays chess twice a week.', 'Bạn ấy chơi cờ hai lần mỗi tuần.', 'twice a week'],
      ]),
    card(7, 3, 'Now words', 'Từ chỉ lúc này',
      'now, right now, at the moment, Look!, Listen! → Present Continuous.',
      'now, right now, at the moment, Look!, Listen! → hiện tại tiếp diễn.', [
        ['Look! It is raining.', 'Nhìn kìa! Trời đang mưa.', 'Look!'],
        ['They are studying at the moment.', 'Lúc này họ đang học.', 'at the moment'],
        ['Listen! Mai is singing.', 'Nghe kìa! Mai đang hát.', 'Listen!'],
      ]),
    card(7, 4, 'Questions: Do or Are?', 'Câu hỏi: Do hay Are?',
      'Habit: Do/Does + base verb. Now: Am/Is/Are + verb-ing.',
      'Thói quen: Do/Does + động từ nguyên mẫu. Lúc này: Am/Is/Are + động từ-ing.', [
        ['Do you play football on Sundays?', 'Bạn có chơi bóng đá vào Chủ nhật không?', 'Do'],
        ['Are you playing football now?', 'Bây giờ bạn đang chơi bóng đá à?', 'Are'],
        ['Does she walk to school?', 'Bạn ấy có đi bộ đến trường không?', 'Does'],
      ]),
    card(7, 5, "Saying no: don't or isn't?", "Phủ định: don't hay isn't?",
      "Habit: don't/doesn't + base verb. Now: am not/isn't/aren't + verb-ing.",
      "Thói quen: don't/doesn't + động từ nguyên mẫu. Lúc này: am not/isn't/aren't + động từ-ing.", [
        ["He doesn't watch TV in the morning.", 'Bạn ấy không xem ti vi vào buổi sáng.', "doesn't watch"],
        ["He isn't watching TV now.", 'Bây giờ bạn ấy không xem ti vi.', "isn't watching"],
      ]),
    card(7, 6, 'State verbs', 'Động từ chỉ trạng thái',
      'like, love, hate, know, want, need, understand, remember, believe, prefer are not used with -ing.',
      'like, love, hate, know, want, need, understand, remember, believe, prefer không dùng dạng -ing.', [
        ['I know the answer now.', 'Bây giờ tôi biết đáp án rồi.', 'know'],
        ['She likes her new school.', 'Bạn ấy thích ngôi trường mới.', 'likes'],
        ['We need a ruler.', 'Chúng tôi cần một cái thước.', 'need'],
      ], { en: "Say I like it, never I'm liking it.", vi: "Nói I like it, không nói I'm liking it." }),
  ],
  8: [
    card(8, 1, 'Finished past time', 'Thời gian đã qua',
      'Use Past Simple for finished actions: yesterday, last night, last week, two days ago.',
      'Dùng quá khứ đơn cho việc đã xong: yesterday, last night, last week, two days ago.', [
        ['I watched a film last night.', 'Tối qua tôi đã xem một bộ phim.', 'watched'],
        ['We visited Grandma yesterday.', 'Hôm qua chúng tôi đã thăm bà.', 'visited'],
        ['Lan cooked dinner two days ago.', 'Hai ngày trước Lan đã nấu bữa tối.', 'two days ago'],
      ]),
    card(8, 2, 'Add -ed or -d', 'Thêm -ed hoặc -d',
      'Most verbs add -ed. Verbs ending in -e add only -d. The form is the same for every subject.',
      'Hầu hết động từ thêm -ed. Động từ tận cùng bằng -e chỉ thêm -d. Mọi chủ ngữ dùng cùng một dạng.', [
        ['play → played', 'chơi → đã chơi', 'played'],
        ['dance → danced', 'nhảy → đã nhảy', 'danced'],
        ['She invited her friends.', 'Bạn ấy đã mời bạn bè.', 'invited'],
      ]),
    card(8, 3, 'y → ied and double letters', 'y → ied và gấp đôi phụ âm',
      'Consonant + y: change y to i and add -ed. Short vowel + one consonant: double it and add -ed.',
      'Phụ âm + y: đổi y thành i rồi thêm -ed. Nguyên âm ngắn + một phụ âm: gấp đôi phụ âm cuối rồi thêm -ed.', [
        ['study → studied', 'học → đã học', 'studied'],
        ['stop → stopped', 'dừng → đã dừng', 'stopped'],
        ['plan → planned', 'lên kế hoạch → đã lên kế hoạch', 'planned'],
      ], { en: 'Vowel + y keeps the y: play → played, stay → stayed.', vi: 'Nguyên âm + y giữ nguyên y: play → played, stay → stayed.' }),
    card(8, 4, "Saying no with didn't", "Phủ định với didn't",
      "didn't + base verb for every subject. Never add -ed after didn't.",
      "didn't + động từ nguyên mẫu cho mọi chủ ngữ. Không thêm -ed sau didn't.", [
        ["I didn't watch TV last night.", 'Tối qua tôi không xem ti vi.', "didn't watch"],
        ["Minh didn't play football.", 'Minh đã không chơi bóng đá.', "didn't play"],
      ]),
    card(8, 5, 'Questions with Did', 'Câu hỏi với Did',
      'Did + subject + base verb …? Short answers: Yes, I did. / No, I didn’t.',
      'Did + chủ ngữ + động từ nguyên mẫu …? Trả lời ngắn: Yes, I did. / No, I didn’t.', [
        ['Did you call Grandpa yesterday?', 'Hôm qua bạn có gọi cho ông không?', 'Did'],
        ['Yes, I did.', 'Có, tôi có gọi.', 'did'],
        ['No, she didn’t.', 'Không, bạn ấy không.', 'didn’t'],
      ]),
    card(8, 6, 'Past time words', 'Từ chỉ thời gian quá khứ',
      'yesterday · last night / week / summer · two days ago · in 2020',
      'yesterday (hôm qua) · last night / week / summer (tối qua / tuần trước / hè năm ngoái) · two days ago (hai ngày trước)', [
        ['We played chess last weekend.', 'Cuối tuần trước chúng tôi chơi cờ.', 'last weekend'],
        ['He tidied his room an hour ago.', 'Một giờ trước bạn ấy đã dọn phòng.', 'ago'],
      ], { en: 'Say last Sunday, not the last Sunday.', vi: 'Nói last Sunday, không nói the last Sunday.' }),
  ],
  9: [
    card(9, 1, 'School subjects', 'Các môn học',
      'Maths, Science, History, Geography, Literature, Art, Music, PE, IT. Subjects start with a capital letter.',
      'Toán, Khoa học, Lịch sử, Địa lý, Ngữ văn, Mỹ thuật, Âm nhạc, Thể dục, Tin học. Tên môn học viết hoa chữ cái đầu.', [
        ['We have Maths on Monday morning.', 'Chúng tôi học Toán vào sáng thứ Hai.', 'Maths'],
        ['In Science we do experiments.', 'Trong giờ Khoa học chúng tôi làm thí nghiệm.', 'Science'],
        ['We run and play games in PE.', 'Chúng tôi chạy và chơi trò chơi trong giờ Thể dục.', 'PE'],
      ]),
    card(9, 2, 'Things in my bag', 'Đồ dùng học tập',
      'notebook, ruler, rubber, pencil case: things you use every day at school.',
      'notebook (vở), ruler (thước kẻ), rubber (cục tẩy), pencil case (hộp bút).', [
        ['I write new words in my notebook.', 'Tôi viết từ mới vào vở.', 'notebook'],
        ['I draw a straight line with my ruler.', 'Tôi kẻ một đường thẳng bằng thước.', 'ruler'],
        ['Can I borrow your rubber, please?', 'Cho tôi mượn cục tẩy được không?', 'rubber'],
      ]),
    card(9, 3, 'People and plans', 'Con người và kế hoạch',
      'classmate, timetable, term, club, whiteboard: words about how school works.',
      'classmate (bạn cùng lớp), timetable (thời khóa biểu), term (học kỳ), club (câu lạc bộ), whiteboard (bảng trắng).', [
        ['Nam is my classmate and my best friend.', 'Nam là bạn cùng lớp và là bạn thân của tôi.', 'classmate'],
        ['I check my timetable every evening.', 'Tối nào tôi cũng xem thời khóa biểu.', 'timetable'],
        ['I go to the Chess Club after school.', 'Tôi đến câu lạc bộ cờ vua sau giờ học.', 'Club'],
      ]),
    card(9, 4, 'Doing school work', 'Việc học ở trường',
      'learn, teach, check, remember, do homework, miss a lesson.',
      'learn (học), teach (dạy), check (kiểm tra lại), remember (nhớ), do homework (làm bài tập về nhà), miss a lesson (nghỉ một tiết).', [
        ['I do my homework after dinner.', 'Tôi làm bài tập về nhà sau bữa tối.', 'do my homework'],
        ['Mr Tuan teaches us Music.', 'Thầy Tuấn dạy chúng tôi Âm nhạc.', 'teaches'],
        ['Check your answers before you finish.', 'Hãy kiểm tra lại đáp án trước khi nộp bài.', 'Check'],
      ], { en: 'Say do homework, not make homework.', vi: 'Nói do homework, không nói make homework.' }),
    card(9, 5, 'Tests', 'Bài kiểm tra',
      'pass a test = get a good enough mark. fail a test = not get a good enough mark.',
      'pass a test = qua bài kiểm tra. fail a test = trượt bài kiểm tra.', [
        ['I studied hard, so I passed the test.', 'Tôi học chăm nên đã qua bài kiểm tra.', 'passed the test'],
        ['He didn’t study, so he failed the test.', 'Bạn ấy không học nên đã trượt bài kiểm tra.', 'failed the test'],
      ]),
    card(9, 6, 'Describing lessons', 'Miêu tả bài học',
      'easy ↔ hard, boring ↔ interesting, fun, correct ↔ wrong.',
      'easy (dễ) ↔ hard (khó), boring (chán) ↔ interesting (thú vị), fun (vui), correct (đúng) ↔ wrong (sai).', [
        ['The first exercise is easy.', 'Bài tập đầu tiên dễ.', 'easy'],
        ['The lesson about planets is interesting.', 'Bài học về các hành tinh rất thú vị.', 'interesting'],
        ['Your answer is correct.', 'Câu trả lời của bạn đúng.', 'correct'],
      ]),
  ],
};
