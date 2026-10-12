import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(6);

export const learnCards: Record<number, LearnCard[]> = {
  16: [
    card(16, 1, 'Present Perfect or Past Simple?', 'Hiện tại hoàn thành hay quá khứ đơn?',
      'Present Perfect: the time is not said or not important. Past Simple: we say or know when.',
      'Hiện tại hoàn thành: không nói thời gian. Quá khứ đơn: có nói hoặc biết rõ thời gian.', [
        ["She's finished her project.", 'Bạn ấy đã làm xong dự án (không nói khi nào).', "'s finished"],
        ['She finished her project last night.', 'Bạn ấy làm xong dự án tối qua.', 'finished'],
      ]),
    card(16, 2, 'Past Simple time words', 'Từ chỉ thời gian của quá khứ đơn',
      'ago, yesterday, last week, on Monday, at six o\'clock, in 2016 → Past Simple.',
      'ago, yesterday, last week, on Monday, at six o\'clock, in 2016 → quá khứ đơn.', [
        ['Dean took the test a week ago.', 'Dean đã làm bài kiểm tra một tuần trước.', 'ago'],
        ['We went to the gym yesterday.', 'Hôm qua chúng tôi đã đi tập gym.', 'yesterday'],
        ['She started school in 2016.', 'Bạn ấy bắt đầu đi học năm 2016.', 'in 2016'],
      ]),
    card(16, 3, 'Present Perfect words', 'Từ đi với hiện tại hoàn thành',
      'already, ever, just, never, yet → Present Perfect.',
      'already, ever, just, never, yet → hiện tại hoàn thành.', [
        ['We have already done the cooking.', 'Chúng tôi đã nấu ăn xong rồi.', 'already'],
        ['Have you ever eaten this kind of fish?', 'Bạn đã bao giờ ăn loại cá này chưa?', 'ever'],
        ["You haven't done your homework yet.", 'Bạn vẫn chưa làm bài tập.', 'yet'],
      ]),
    card(16, 4, 'When …? uses Past Simple', 'When …? dùng quá khứ đơn',
      'When asks for a finished time, so use When did …?, not When have …?',
      'When hỏi thời điểm cụ thể nên dùng When did …?, không dùng When have …?', [
        ['When did you buy that jacket?', 'Bạn mua cái áo khoác đó khi nào?', 'When did'],
        ['What time did the film start?', 'Phim bắt đầu lúc mấy giờ?', 'did'],
      ]),
    card(16, 5, 'Ask, then tell the story', 'Hỏi rồi kể chi tiết',
      'Ask about experience with Present Perfect. Give the details with Past Simple.',
      'Hỏi về trải nghiệm bằng hiện tại hoàn thành. Kể chi tiết bằng quá khứ đơn.', [
        ['Have you ever been to Sapa?', 'Bạn đã bao giờ đến Sa Pa chưa?', 'Have you ever been'],
        ['Yes, I went there last winter.', 'Rồi, mình đến đó mùa đông năm ngoái.', 'went'],
      ]),
    card(16, 6, 'Common mistakes', 'Lỗi thường gặp',
      'Never use Present Perfect with a finished time.',
      'Không dùng hiện tại hoàn thành với thời gian đã kết thúc.', [
        ['I saw that film last night.', 'Tôi đã xem bộ phim đó tối qua.', 'saw'],
        ["We haven't eaten lunch yet.", 'Chúng tôi chưa ăn trưa.', "haven't eaten"],
      ], { en: 'Say I saw it last night, not I have seen it last night.', vi: 'Nói I saw it last night, không nói I have seen it last night.' }),
  ],
  17: [
    card(17, 1, 'will', 'will',
      'will + base verb for predictions about the future. The same for every subject.',
      'will + động từ nguyên mẫu để dự đoán tương lai. Giống nhau cho mọi chủ ngữ.', [
        ['I think it will be sunny tomorrow.', 'Tôi nghĩ ngày mai trời sẽ nắng.', 'will be'],
        ['In 2050, people will drive flying cars.', 'Năm 2050, con người sẽ lái ô tô bay.', 'will drive'],
      ]),
    card(17, 2, "won't and Will …?", "won't và Will …?",
      "won't = will not. Questions: Will + subject + base verb? Yes, I will. / No, I won't.",
      "won't = will not. Câu hỏi: Will + chủ ngữ + động từ nguyên mẫu? Yes, I will. / No, I won't.", [
        ["I won't tell anyone.", 'Tôi sẽ không nói với ai.', "won't"],
        ['Will you help me, please?', 'Bạn giúp tôi được không?', 'Will'],
      ]),
    card(17, 3, 'Decisions, offers and promises', 'Quyết định, đề nghị, lời hứa',
      'Use will for decisions you make now, promises and requests. Shall I/we …? makes offers and suggestions.',
      'Dùng will cho quyết định ngay lúc nói, lời hứa, lời nhờ. Shall I/we …? dùng để đề nghị, gợi ý.', [
        ["The phone is ringing. I'll answer it.", 'Điện thoại reo kìa. Để tôi nghe.', "I'll"],
        ['Shall I open the window?', 'Tôi mở cửa sổ nhé?', 'Shall I'],
        ['Shall we go to the cinema?', 'Chúng ta đi xem phim nhé?', 'Shall we'],
      ]),
    card(17, 4, 'be going to: plans', 'be going to: kế hoạch',
      'am/is/are + going to + base verb for plans you made before now.',
      'am/is/are + going to + động từ nguyên mẫu cho kế hoạch đã định trước.', [
        ["I'm going to go swimming after school.", 'Tôi định đi bơi sau giờ học.', 'going to go'],
        ['We are going to visit Hoi An next month.', 'Tháng sau chúng tôi sẽ đi Hội An.', 'are going to'],
      ]),
    card(17, 5, 'be going to: we can see it', 'be going to: thấy rõ dấu hiệu',
      'Use be going to when you can see that something will happen.',
      'Dùng be going to khi thấy rõ việc gì đó sắp xảy ra.', [
        ["Look at the black sky! It's going to rain.", 'Nhìn trời đen kìa! Sắp mưa rồi.', "It's going to rain"],
        ["Be careful! You're going to fall!", 'Cẩn thận! Bạn sắp ngã đấy!', 'going to fall'],
      ]),
    card(17, 6, 'Negatives and questions with going to', 'Phủ định và câu hỏi với going to',
      "I'm not / isn't / aren't going to … Am/Is/Are … going to …? Yes, I am. / No, I'm not.",
      "I'm not / isn't / aren't going to … Am/Is/Are … going to …? Yes, I am. / No, I'm not.", [
        ["I'm not going to watch TV tonight.", 'Tối nay tôi sẽ không xem ti vi.', 'not going to'],
        ['Is your brother going to join the team?', 'Anh bạn có định vào đội không?', 'Is'],
      ]),
  ],
  18: [
    card(18, 1, 'Sport words', 'Từ về thể thao',
      'athlete, team, stadium, gym, race, goal.',
      'athlete (vận động viên), team (đội), stadium (sân vận động), gym (phòng tập), race (cuộc đua), goal (bàn thắng).', [
        ['Our team has eleven players.', 'Đội chúng tôi có mười một cầu thủ.', 'team'],
        ['The stadium has 40,000 seats.', 'Sân vận động có 40.000 chỗ ngồi.', 'stadium'],
        ['Minh scored a great goal!', 'Minh ghi một bàn thắng tuyệt đẹp!', 'goal'],
      ]),
    card(18, 2, 'Sports and activities', 'Các môn thể thao',
      'do athletics / gymnastics / karate / yoga; go skiing / surfing.',
      'do + athletics (điền kinh) / gymnastics (thể dục dụng cụ) / karate / yoga; go + skiing (trượt tuyết) / surfing (lướt sóng).', [
        ['She does gymnastics after school.', 'Bạn ấy tập thể dục dụng cụ sau giờ học.', 'does gymnastics'],
        ['Mum does yoga every morning.', 'Mẹ tập yoga mỗi sáng.', 'does yoga'],
        ['We went skiing in Japan last winter.', 'Mùa đông năm ngoái chúng tôi đi trượt tuyết ở Nhật.', 'went skiing'],
      ], { en: 'go + -ing sports (go swimming), do + other sports (do karate).', vi: 'go + môn có -ing (go swimming), do + các môn khác (do karate).' }),
    card(18, 3, 'Healthy habits', 'Thói quen lành mạnh',
      'keep fit, go for a jog, warm up, take up a new sport.',
      'keep fit (giữ sức khỏe), go for a jog (đi chạy bộ), warm up (khởi động), take up (bắt đầu môn mới).', [
        ['I cycle to school to keep fit.', 'Tôi đạp xe đến trường để giữ sức khỏe.', 'keep fit'],
        ['Always warm up before you run.', 'Luôn khởi động trước khi chạy.', 'warm up'],
        ['I want to take up tennis this year.', 'Năm nay tôi muốn bắt đầu chơi quần vợt.', 'take up'],
      ]),
    card(18, 4, 'Healthy or junk food?', 'Thức ăn lành mạnh hay đồ ăn vặt?',
      'healthy food is good for your body; junk food is tasty but bad for you.',
      'healthy food = thức ăn lành mạnh; junk food = đồ ăn vặt không tốt cho sức khỏe.', [
        ['Fruit and vegetables are healthy food.', 'Trái cây và rau là thức ăn lành mạnh.', 'healthy food'],
        ["Don't eat too much junk food.", 'Đừng ăn quá nhiều đồ ăn vặt.', 'junk food'],
      ]),
    card(18, 5, 'Strong, fit and lazy', 'Khỏe, cân đối và lười',
      'fit = healthy from exercise; strong = can lift heavy things; lazy = doesn\'t want to move.',
      'fit = khỏe nhờ tập luyện; strong = khỏe, nâng được vật nặng; lazy = lười biếng.', [
        ['My grandma is seventy but she is very fit.', 'Bà tôi bảy mươi tuổi nhưng rất khỏe.', 'fit'],
        ['He is strong enough to lift the table.', 'Anh ấy đủ khỏe để nâng cái bàn.', 'strong'],
        ["Don't be lazy. Let's go for a walk!", 'Đừng lười thế. Đi dạo đi!', 'lazy'],
      ]),
    card(18, 6, 'Indoor, outdoor, extreme', 'Trong nhà, ngoài trời, mạo hiểm',
      'indoor = inside a building; outdoor = outside; extreme = very dangerous and exciting.',
      'indoor = trong nhà; outdoor = ngoài trời; extreme = mạo hiểm.', [
        ['Badminton is a popular indoor sport.', 'Cầu lông là môn thể thao trong nhà phổ biến.', 'indoor'],
        ['Football is an outdoor game.', 'Bóng đá là môn chơi ngoài trời.', 'outdoor'],
        ['Skydiving is an extreme sport.', 'Nhảy dù là môn thể thao mạo hiểm.', 'extreme'],
      ]),
  ],
};
