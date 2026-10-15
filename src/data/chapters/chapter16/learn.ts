import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(16);

export const learnCards: Record<number, LearnCard[]> = {
  46: [
    card(46, 1, 'Past Simple: finished actions', 'Quá khứ đơn: hành động đã kết thúc',
      'Use Past Simple for actions that finished at a time in the past. The form is the same for every subject.',
      'Dùng quá khứ đơn cho hành động đã kết thúc tại một thời điểm trong quá khứ. Dạng động từ giống nhau với mọi chủ ngữ.', [
        ['We spent two days in Ha Long Bay last summer.', 'Hè năm ngoái chúng tôi ở Hạ Long hai ngày.', 'spent'],
        ['Lan woke up, had breakfast and left home.', 'Lan thức dậy, ăn sáng rồi rời nhà.', 'woke up'],
      ]),
    card(46, 2, '-ed spelling', 'Chính tả đuôi -ed',
      'arrive → arrived (+d); study → studied (consonant + y → -ied); play → played (vowel + y); stop → stopped, plan → planned (double the consonant).',
      'arrive → arrived (+d); study → studied (phụ âm + y → -ied); play → played (nguyên âm + y); stop → stopped, plan → planned (gấp đôi phụ âm).', [
        ['Lan studied hard for the test.', 'Lan đã học chăm chỉ cho bài kiểm tra.', 'studied'],
        ['The bus stopped suddenly.', 'Xe buýt dừng đột ngột.', 'stopped'],
        ['Nam enjoyed the concert.', 'Nam rất thích buổi hòa nhạc.', 'enjoyed'],
      ], { en: 'Do not double the consonant when the stress is not at the end: visit → visited, open → opened.', vi: 'Không gấp đôi phụ âm khi trọng âm không rơi vào âm cuối: visit → visited, open → opened.' }),
    card(46, 3, 'More irregular verbs', 'Thêm động từ bất quy tắc',
      'leave → left, pay → paid, send → sent, spend → spent, choose → chose, fly → flew, forget → forgot, begin → began, sell → sold, throw → threw.',
      'leave → left, pay → paid, send → sent, spend → spent, choose → chose, fly → flew, forget → forgot, begin → began, sell → sold, throw → threw.', [
        ['My dad paid for the taxi.', 'Bố tôi trả tiền taxi.', 'paid'],
        ['The lesson began at half past seven.', 'Tiết học bắt đầu lúc bảy rưỡi.', 'began'],
        ['Mai sent me a card from Da Lat.', 'Mai gửi cho tôi một tấm thiệp từ Đà Lạt.', 'sent'],
      ], { en: 'began, not begun; threw, not thrown: the -n forms are not Past Simple.', vi: 'Nói began, không nói begun; threw, không nói thrown: các dạng có -n không phải quá khứ đơn.' }),
    card(46, 4, 'Past time words', 'Từ chỉ thời gian quá khứ',
      'two days ago (ago comes after the time), last week / last Friday / last year, yesterday (morning), in 2010 / in the 1990s.',
      'two days ago (ago đứng sau khoảng thời gian), last week / last Friday / last year, yesterday (morning), in 2010 / in the 1990s.', [
        ['My grandparents moved here forty years ago.', 'Ông bà tôi chuyển đến đây bốn mươi năm trước.', 'forty years ago'],
        ['We had a Maths test last Friday.', 'Thứ Sáu tuần trước chúng tôi kiểm tra Toán.', 'last Friday'],
        ['My parents got married in 2009.', 'Bố mẹ tôi kết hôn năm 2009.', 'in 2009'],
      ], { en: 'Say last night, but yesterday morning / afternoon / evening.', vi: 'Nói last night, nhưng yesterday morning / afternoon / evening.' }),
    card(46, 5, 'was and were', 'was và were',
      'I/he/she/it was; you/we/they were.',
      'I/he/she/it dùng was; you/we/they dùng were.', [
        ['We were very tired after the long walk.', 'Chúng tôi rất mệt sau chuyến đi bộ dài.', 'were'],
        ['There were thirty people at the party.', 'Có ba mươi người ở bữa tiệc.', 'were'],
      ]),
    card(46, 6, 'Tricky was / were subjects', 'Chủ ngữ dễ nhầm với was / were',
      'was: everybody, nobody, each student, the news, the weather, Maths. were: jeans, glasses, the police, my family and I.',
      'was: everybody, nobody, each student, the news, the weather, Maths. were: jeans, glasses, the police, my family and I.', [
        ['Everybody was happy at the end of the party.', 'Cuối bữa tiệc ai cũng vui.', 'was'],
        ['The news was very sad yesterday.', 'Tin tức hôm qua rất buồn.', 'was'],
        ['My new jeans were too long.', 'Chiếc quần bò mới của tôi quá dài.', 'were'],
      ]),
  ],
  47: [
    card(47, 1, "Negatives: didn't", "Phủ định: didn't",
      "didn't + base verb for every subject, regular or irregular.",
      "didn't + động từ nguyên mẫu với mọi chủ ngữ, động từ có quy tắc hay bất quy tắc đều vậy.", [
        ["I didn't do my homework last night.", 'Tối qua tôi không làm bài tập.', "didn't do"],
        ["Minh didn't know the answer.", 'Minh không biết đáp án.', "didn't know"],
      ], { en: "didn't go, not didn't went.", vi: "Nói didn't go, không nói didn't went." }),
    card(47, 2, 'Yes/No questions and short answers', 'Câu hỏi Yes/No và trả lời ngắn',
      "Did + subject + base verb …? Yes, I did. / No, I didn't.",
      "Did + chủ ngữ + động từ nguyên mẫu …? Yes, I did. / No, I didn't.", [
        ['Did you go to the cinema last weekend?', 'Cuối tuần trước bạn có đi xem phim không?', 'Did you go'],
        ["Did Lan and Mai win? — No, they didn't.", 'Lan và Mai có thắng không? — Không.', "No, they didn't"],
      ]),
    card(47, 3, 'Wh-questions', 'Câu hỏi có từ để hỏi',
      'Question word + did + subject + base verb: Where did you go? What did she buy? How much did you pay?',
      'Từ để hỏi + did + chủ ngữ + động từ nguyên mẫu: Where did you go? What did she buy? How much did you pay?', [
        ['Where did you spend your summer holiday?', 'Bạn đã nghỉ hè ở đâu?', 'did you spend'],
        ['What time did Lan get home yesterday?', 'Hôm qua Lan về nhà lúc mấy giờ?', 'did Lan get'],
        ['How much did you pay for your new bike?', 'Bạn mua xe đạp mới hết bao nhiêu tiền?', 'did you pay'],
      ]),
    card(47, 4, 'Subject questions', 'Câu hỏi về chủ ngữ',
      'When Who or What is the subject, there is no did: Who + past verb?',
      'Khi Who hoặc What là chủ ngữ thì không dùng did: Who + động từ quá khứ?', [
        ['Who broke the window? — Nam did.', 'Ai làm vỡ cửa sổ? — Nam.', 'broke'],
        ['What happened to your arm?', 'Tay bạn bị làm sao vậy?', 'happened'],
      ]),
    card(47, 5, 'Object questions', 'Câu hỏi về tân ngữ',
      'When Who or What is the object, use did: Who did you meet?',
      'Khi Who hoặc What là tân ngữ thì dùng did: Who did you meet?', [
        ['Who did you meet at the party? — I met Lan.', 'Bạn đã gặp ai ở bữa tiệc? — Mình gặp Lan.', 'did you meet'],
        ['Who did you call yesterday?', 'Hôm qua bạn gọi cho ai?', 'did you call'],
      ], { en: 'Who called you? (someone called you) / Who did you call? (you called someone)', vi: 'Who called you? (ai đó gọi cho bạn) / Who did you call? (bạn gọi cho ai đó)' }),
    card(47, 6, 'was/were or did?', 'was/were hay did?',
      "Use was/were with adjectives, nouns and places. Use did/didn't with other verbs.",
      "Dùng was/were với tính từ, danh từ và nơi chốn. Dùng did/didn't với động từ thường.", [
        ["The weather wasn't very nice.", 'Thời tiết không đẹp lắm.', "wasn't"],
        ["We didn't enjoy the food.", 'Chúng tôi không thích món ăn.', "didn't enjoy"],
        ['Were your parents at the concert?', 'Bố mẹ bạn có ở buổi hòa nhạc không?', 'Were'],
      ], { en: "Say The film wasn't interesting, not The film didn't interesting.", vi: "Nói The film wasn't interesting, không nói The film didn't interesting." }),
  ],
  48: [
    card(48, 1, 'Fun at home', 'Giải trí tại nhà',
      'board game, jigsaw puzzle, crossword, podcast, magazine, instrument.',
      'board game (cờ bàn), jigsaw puzzle (xếp hình), crossword (ô chữ), podcast (chương trình nghe trực tuyến), magazine (tạp chí), instrument (nhạc cụ).', [
        ['We often play a board game after dinner.', 'Chúng tôi thường chơi cờ bàn sau bữa tối.', 'board game'],
        ['This jigsaw puzzle has 1,000 pieces.', 'Bộ xếp hình này có 1.000 mảnh.', 'jigsaw puzzle'],
      ]),
    card(48, 2, 'Music and reading', 'Âm nhạc và đọc',
      'play an instrument, read a magazine, listen to a podcast, do a crossword.',
      'play an instrument (chơi nhạc cụ), read a magazine (đọc tạp chí), listen to a podcast (nghe podcast), do a crossword (giải ô chữ).', [
        ['Can you play a musical instrument?', 'Bạn có chơi được nhạc cụ nào không?', 'instrument'],
        ['I listen to an English podcast on the way to school.', 'Tôi nghe podcast tiếng Anh trên đường đến trường.', 'podcast'],
        ['Dad does the crossword every Sunday.', 'Chủ nhật nào bố cũng giải ô chữ.', 'does the crossword'],
      ], { en: 'We say do a crossword, not play a crossword.', vi: 'Nói do a crossword, không nói play a crossword.' }),
    card(48, 3, 'Outdoors', 'Ngoài trời',
      'go camping, go fishing, hiking, picnic, skateboarding, rock climbing.',
      'go camping (cắm trại), go fishing (câu cá), hiking (đi bộ đường dài), picnic (dã ngoại), skateboarding (trượt ván), rock climbing (leo núi đá).', [
        ['We go camping by the lake every summer.', 'Mùa hè nào chúng tôi cũng cắm trại bên hồ.', 'go camping'],
        ["Let's have a picnic in the park on Sunday.", 'Chủ nhật mình đi dã ngoại ở công viên nhé.', 'have a picnic'],
      ], { en: 'go + -ing for many activities: go fishing, go hiking, go skateboarding.', vi: 'go + V-ing cho nhiều hoạt động: go fishing, go hiking, go skateboarding.' }),
    card(48, 4, 'Events', 'Sự kiện',
      'concert, festival, exhibition, theme park, audience, fireworks.',
      'concert (hòa nhạc), festival (lễ hội), exhibition (triển lãm), theme park (công viên giải trí), audience (khán giả), fireworks (pháo hoa).', [
        ['We went to a pop concert in the city centre.', 'Chúng tôi đi xem hòa nhạc pop ở trung tâm.', 'concert'],
        ['There is a photo exhibition at the museum.', 'Bảo tàng có một triển lãm ảnh.', 'exhibition'],
        ['The audience clapped for five minutes.', 'Khán giả vỗ tay suốt năm phút.', 'audience'],
      ]),
    card(48, 5, 'Free-time verbs', 'Động từ về thời gian rảnh',
      'relax, join, be keen on, spend time, go out, stay in.',
      'relax (thư giãn), join (tham gia), be keen on (rất thích), spend time (dành thời gian), go out (ra ngoài chơi), stay in (ở nhà).', [
        ['I want to join the school chess club.', 'Tôi muốn tham gia câu lạc bộ cờ vua.', 'join'],
        ['Lan is keen on drawing manga.', 'Lan rất mê vẽ truyện tranh.', 'keen on'],
        ['I spend a lot of time with my grandparents.', 'Tôi dành nhiều thời gian bên ông bà.', 'spend a lot of time'],
      ], { en: 'be keen on + noun or verb-ing: keen on football, keen on drawing.', vi: 'be keen on + danh từ hoặc V-ing: keen on football, keen on drawing.' }),
    card(48, 6, 'go out or stay in?', 'Ra ngoài hay ở nhà?',
      'go out = leave home to have fun; stay in = stay at home.',
      'go out = ra khỏi nhà để đi chơi; stay in = ở nhà.', [
        ['We often go out for ice cream on Saturday evenings.', 'Tối thứ Bảy chúng tôi thường ra ngoài ăn kem.', 'go out'],
        ['It was raining, so we stayed in and watched a film.', 'Trời mưa nên chúng tôi ở nhà xem phim.', 'stayed in'],
      ]),
  ],
};
