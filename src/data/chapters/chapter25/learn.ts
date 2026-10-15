import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(25);

export const learnCards: Record<number, LearnCard[]> = {
  73: [
    card(73, 1, 'First conditional', 'Câu điều kiện loại 1',
      'If + present simple, will / won\'t + base verb. Use it for things that can really happen in the future.',
      'If + hiện tại đơn, will / won\'t + động từ nguyên mẫu. Dùng cho điều thật sự có thể xảy ra trong tương lai.', [
        ['If it rains tomorrow, we will stay at home.', 'Nếu mai trời mưa, chúng tôi sẽ ở nhà.', 'If it rains'],
        ['If Lan studies for the exam, she will get a good mark.', 'Nếu Lan ôn thi, bạn ấy sẽ được điểm tốt.', 'will get'],
        ['If you forget the umbrella, you won\'t stay dry.', 'Nếu bạn quên ô, bạn sẽ bị ướt.', 'won\'t stay'],
      ], { en: 'Never use will in the if-clause: If it rains, NOT If it will rain.', vi: 'Không bao giờ dùng will trong mệnh đề if: If it rains, KHÔNG nói If it will rain.' }),
    card(73, 2, 'Which clause comes first?', 'Mệnh đề nào đứng trước?',
      'The if-clause can come first (with a comma) or second (no comma). The meaning is the same.',
      'Mệnh đề if có thể đứng trước (có dấu phẩy) hoặc đứng sau (không cần dấu phẩy). Nghĩa không đổi.', [
        ['If you leave now, you will catch the ferry.', 'Nếu bạn đi ngay bây giờ, bạn sẽ kịp chuyến phà.', 'If you leave now,'],
        ['You will catch the ferry if you leave now.', 'Bạn sẽ kịp chuyến phà nếu đi ngay bây giờ.', 'if you leave now'],
      ]),
    card(73, 3, 'Unless', 'Unless (trừ khi)',
      'Unless = if ... not. The verb after unless is positive.',
      'Unless = if ... not (trừ khi, nếu không). Động từ sau unless ở thể khẳng định.', [
        ['Unless you hurry, you will miss the bus.', 'Nếu bạn không nhanh lên, bạn sẽ lỡ xe buýt.', 'Unless you hurry'],
        ['If you don\'t hurry, you will miss the bus.', 'Nếu bạn không nhanh lên, bạn sẽ lỡ xe buýt.', 'If you don\'t hurry'],
        ['Unless Lan revises for the test, she won\'t pass.', 'Nếu Lan không ôn bài, bạn ấy sẽ không đỗ.', 'Unless Lan revises'],
      ], { en: 'Say Unless you hurry, NOT Unless you don\'t hurry.', vi: 'Nói Unless you hurry, KHÔNG nói Unless you don\'t hurry.' }),
    card(73, 4, 'Can, might, should in the result', 'Can, might, should trong mệnh đề kết quả',
      'Instead of will, the result can use can, might, may, should or must + base verb.',
      'Thay cho will, mệnh đề kết quả có thể dùng can (có thể), might / may (có lẽ), should (nên), must (phải) + động từ nguyên mẫu.', [
        ['If it rains on Saturday, we might cancel the picnic.', 'Nếu thứ Bảy trời mưa, có lẽ chúng tôi sẽ hủy buổi dã ngoại.', 'might cancel'],
        ['If you finish your homework, you can watch cartoons.', 'Nếu con làm xong bài tập, con có thể xem hoạt hình.', 'can watch'],
        ['If you have a fever, you should see a doctor.', 'Nếu bạn bị sốt, bạn nên đi khám bác sĩ.', 'should see'],
      ]),
    card(73, 5, 'If + imperative', 'If + câu mệnh lệnh',
      'If + present simple, then an imperative to tell someone what to do in that situation.',
      'If + hiện tại đơn, rồi đến câu mệnh lệnh để bảo ai đó nên làm gì trong tình huống đó.', [
        ['If you see Mai, tell her to call me.', 'Nếu bạn gặp Mai, bảo bạn ấy gọi cho mình nhé.', 'tell her'],
        ['If you get lost, ask a police officer for help.', 'Nếu bạn bị lạc, hãy nhờ cảnh sát giúp.', 'ask'],
      ]),
    card(73, 6, 'When, as soon as and questions', 'When, as soon as và câu hỏi',
      'After when, as soon as and before, use the present simple for the future too. Ask: What will you do if ...?',
      'Sau when, as soon as, before cũng dùng hiện tại đơn để nói về tương lai. Hỏi: What will you do if ...?', [
        ['I\'ll call you when I arrive at the airport.', 'Mình sẽ gọi cho bạn khi tới sân bay.', 'when I arrive'],
        ['I\'ll text you as soon as I get home.', 'Mình sẽ nhắn tin ngay khi về đến nhà.', 'as soon as I get'],
        ['What will you do if you miss the bus?', 'Bạn sẽ làm gì nếu lỡ xe buýt?', 'What will you do'],
      ], { en: 'when = I am sure it will happen; if = maybe it will happen.', vi: 'when = chắc chắn sẽ xảy ra; if = có thể xảy ra.' }),
  ],
  74: [
    card(74, 1, 'Second conditional', 'Câu điều kiện loại 2',
      'If + past simple, would + base verb. Use it for imaginary or very unlikely situations now or in the future.',
      'If + quá khứ đơn, would + động từ nguyên mẫu. Dùng cho tình huống tưởng tượng hoặc khó xảy ra ở hiện tại / tương lai.', [
        ['If I had a lot of free time, I would learn to play the guitar.', 'Nếu tôi có nhiều thời gian rảnh, tôi sẽ học chơi đàn ghi-ta.', 'If I had'],
        ['If we lived near the beach, we would go swimming every day.', 'Nếu chúng tôi sống gần biển, ngày nào chúng tôi cũng đi bơi.', 'would go'],
      ], { en: 'The verb is past, but the meaning is now or the future.', vi: 'Động từ ở dạng quá khứ nhưng nghĩa là hiện tại hoặc tương lai.' }),
    card(74, 2, 'Wouldn\'t and \'d', 'Wouldn\'t và \'d',
      'Negative: wouldn\'t (= would not) + base verb. Short form: I\'d = I would.',
      'Phủ định: wouldn\'t (= would not) + động từ nguyên mẫu. Viết tắt: I\'d = I would.', [
        ['If I won the lottery, I wouldn\'t work any more.', 'Nếu trúng xổ số, tôi sẽ không làm việc nữa.', 'wouldn\'t work'],
        ['If it didn\'t rain so much, we would play outside more.', 'Nếu trời không mưa nhiều như vậy, chúng tôi sẽ chơi ngoài trời nhiều hơn.', 'didn\'t rain'],
        ['If I found a wallet, I\'d take it to the police.', 'Nếu nhặt được ví, tôi sẽ mang nó tới đồn cảnh sát.', 'I\'d take'],
      ]),
    card(74, 3, 'If I were', 'If I were',
      'In the second conditional we can use were with every subject: I, he, she, it.',
      'Trong câu điều kiện loại 2, động từ to be có thể dùng were với mọi chủ ngữ: I, he, she, it.', [
        ['If Nam were taller, he would join the basketball team.', 'Nếu Nam cao hơn, bạn ấy sẽ vào đội bóng rổ.', 'were taller'],
        ['If I were a bird, I would fly over the mountains.', 'Nếu tôi là chim, tôi sẽ bay qua những ngọn núi.', 'If I were'],
        ['If Lan weren\'t so shy, she would make more friends.', 'Nếu Lan không nhút nhát như vậy, bạn ấy sẽ có thêm nhiều bạn.', 'weren\'t'],
      ]),
    card(74, 4, 'Advice: If I were you', 'Lời khuyên: If I were you',
      'Give advice with If I were you, I would / wouldn\'t ...',
      'Đưa lời khuyên bằng If I were you, I would / wouldn\'t ... (Nếu tôi là bạn, tôi sẽ / sẽ không ...).', [
        ['If I were you, I would talk to the teacher.', 'Nếu tôi là bạn, tôi sẽ nói chuyện với cô giáo.', 'If I were you'],
        ['I wouldn\'t buy that jacket if I were you.', 'Nếu tôi là bạn, tôi sẽ không mua cái áo khoác đó.', 'wouldn\'t buy'],
      ]),
    card(74, 5, 'Questions', 'Câu hỏi',
      'Question: (Wh-word) + would + subject + base verb + if + past simple?',
      'Câu hỏi: (từ để hỏi) + would + chủ ngữ + động từ nguyên mẫu + if + quá khứ đơn?', [
        ['What would you do if you saw a ghost?', 'Bạn sẽ làm gì nếu nhìn thấy ma?', 'What would you do'],
        ['Where would you go if you could go anywhere in the world?', 'Bạn sẽ đi đâu nếu có thể đi bất cứ nơi nào trên thế giới?', 'Where would you go'],
        ['Would you be scared if you saw a tiger in the street?', 'Bạn có sợ không nếu thấy một con hổ ngoài đường?', 'Would you be scared'],
      ]),
    card(74, 6, 'First or second conditional?', 'Điều kiện loại 1 hay loại 2?',
      'Real and possible: If + present, will. Imaginary or unlikely: If + past, would.',
      'Có thật, có thể xảy ra: If + hiện tại, will. Tưởng tượng, khó xảy ra: If + quá khứ, would.', [
        ['If it is sunny tomorrow, we will go to the beach.', 'Nếu mai trời nắng, chúng tôi sẽ đi biển.', 'will go'],
        ['If I had a billion dong, I would buy an island.', 'Nếu tôi có một tỷ đồng, tôi sẽ mua một hòn đảo.', 'would buy'],
      ], { en: 'Don\'t mix them: NOT If it will rain, we would stay at home.', vi: 'Không trộn lẫn hai loại: KHÔNG nói If it will rain, we would stay at home.' }),
  ],
  75: [
    card(75, 1, 'Feeling ill', 'Bị ốm',
      'headache, sore throat, cough, fever, stomach ache, sneeze.',
      'headache (đau đầu), sore throat (đau họng), cough (ho), fever (sốt), stomach ache (đau bụng), sneeze (hắt hơi).', [
        ['I have a headache because the music is too loud.', 'Tôi bị đau đầu vì nhạc to quá.', 'headache'],
        ['The baby has a fever of 39 degrees.', 'Em bé bị sốt 39 độ.', 'fever'],
        ['Cover your mouth when you cough.', 'Hãy che miệng khi ho.', 'cough'],
      ], { en: 'Say I have a headache / a sore throat / a fever / a stomach ache.', vi: 'Nói I have a headache / a sore throat / a fever / a stomach ache (tôi bị ...).' }),
    card(75, 2, 'Injuries', 'Chấn thương',
      'hurt, bandage, plaster, bruise, ambulance, first aid.',
      'hurt (làm đau, bị đau), bandage (băng gạc), plaster (băng dán cá nhân), bruise (vết bầm), ambulance (xe cứu thương), first aid (sơ cứu).', [
        ['I fell off my bike and hurt my knee.', 'Tôi ngã xe đạp và bị đau đầu gối.', 'hurt'],
        ['I cut my finger, so I put a plaster on it.', 'Tôi bị đứt tay nên dán một miếng băng cá nhân.', 'plaster'],
        ['Call an ambulance! A man has fallen off his motorbike.', 'Gọi xe cứu thương đi! Một người đàn ông bị ngã xe máy.', 'ambulance'],
      ], { en: 'In Vietnam, phone 115 for an ambulance.', vi: 'Ở Việt Nam, gọi 115 để gọi xe cứu thương.' }),
    card(75, 3, 'At the doctor\'s', 'Đi khám bệnh',
      'medicine, pharmacy, appointment, patient, recover, check-up.',
      'medicine (thuốc), pharmacy (hiệu thuốc), appointment (cuộc hẹn), patient (bệnh nhân), recover (hồi phục), check-up (khám định kỳ).', [
        ['Take this medicine three times a day.', 'Uống thuốc này ba lần một ngày.', 'medicine'],
        ['I have an appointment with the dentist at 3 pm.', 'Tôi có hẹn với nha sĩ lúc 3 giờ chiều.', 'appointment'],
        ['Grandpa recovered quickly after the operation.', 'Ông hồi phục nhanh sau ca phẫu thuật.', 'recovered'],
      ]),
    card(75, 4, 'Getting fit', 'Rèn luyện thân thể',
      'diet, work out, stretch, energy, muscle, sweat.',
      'diet (chế độ ăn), work out (tập thể dục), stretch (giãn cơ), energy (năng lượng), muscle (cơ bắp), sweat (mồ hôi).', [
        ['A healthy diet has lots of fruit and vegetables.', 'Chế độ ăn lành mạnh có nhiều rau quả.', 'diet'],
        ['My dad works out at the gym three times a week.', 'Bố tôi tập thể dục ở phòng gym ba lần một tuần.', 'works out'],
        ['Always stretch before you run.', 'Luôn giãn cơ trước khi chạy.', 'stretch'],
      ], { en: 'diet = the food you usually eat. It doesn\'t always mean eating less.', vi: 'diet = những gì bạn thường ăn, không phải lúc nào cũng có nghĩa là ăn kiêng.' }),
    card(75, 5, 'Giving health advice', 'Lời khuyên về sức khỏe',
      'Use should / shouldn\'t and if to give advice about health.',
      'Dùng should / shouldn\'t và if để khuyên về sức khỏe.', [
        ['If you have a sore throat, you should drink warm water with honey.', 'Nếu bị đau họng, bạn nên uống nước ấm pha mật ong.', 'sore throat'],
        ['You shouldn\'t work out if you have a fever.', 'Bạn không nên tập thể dục khi đang sốt.', 'shouldn\'t work out'],
        ['If you hurt your ankle, put a bandage on it.', 'Nếu bị đau mắt cá chân, hãy quấn băng vào.', 'bandage'],
      ]),
    card(75, 6, 'Talking about your health', 'Nói về sức khỏe của bạn',
      'Ask What\'s the matter? and answer I feel ill / I\'ve got a cough / My leg hurts.',
      'Hỏi What\'s the matter? (Bạn bị sao vậy?) và trả lời I feel ill / I\'ve got a cough / My leg hurts.', [
        ['What\'s the matter? You look pale.', 'Bạn bị sao vậy? Trông bạn xanh xao quá.', 'What\'s the matter'],
        ['I\'ve got a bad cough and a sore throat.', 'Tôi bị ho nặng và đau họng.', 'a bad cough'],
        ['My leg hurts after the match, but I\'ll recover soon.', 'Chân tôi đau sau trận đấu, nhưng tôi sẽ sớm hồi phục.', 'recover'],
      ]),
  ],
};
