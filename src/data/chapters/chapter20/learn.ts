import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(20);

export const learnCards: Record<number, LearnCard[]> = {
  58: [
    card(58, 1, 'Arrangements: present continuous', 'Lịch hẹn: hiện tại tiếp diễn',
      'Use am / is / are + -ing for things you have already arranged: you know the time, the place or the people.',
      'Dùng am / is / are + V-ing cho việc đã hẹn, đã sắp xếp: đã biết giờ, địa điểm hoặc người cùng tham gia.', [
        ['I\'m meeting Lan at the cinema at seven tonight.', 'Tối nay bảy giờ tôi gặp Lan ở rạp chiếu phim.', 'I\'m meeting'],
        ['We are flying to Phu Quoc next Saturday.', 'Thứ Bảy tới chúng tôi bay đi Phú Quốc.', 'are flying'],
        ['Dad is starting his new job next Monday.', 'Thứ Hai tới bố bắt đầu công việc mới.', 'is starting'],
      ]),
    card(58, 2, 'Questions about arrangements', 'Hỏi về lịch hẹn',
      'Are you doing anything …? What are you doing …? Where are you staying …?',
      'Are you doing anything …? (Bạn có bận gì không?) What are you doing …? (Bạn sẽ làm gì?) Where are you staying …? (Bạn sẽ ở đâu?)', [
        ['Are you doing anything special this weekend?', 'Cuối tuần này bạn có làm gì đặc biệt không?', 'Are you doing'],
        ['What are you doing on Saturday?', 'Thứ Bảy bạn làm gì?', 'are you doing'],
        ['I\'m not going to the party tonight.', 'Tối nay tôi không đi dự tiệc.', 'not going'],
      ], { en: 'Use a future time word (tonight, tomorrow, next week) so the listener knows it is the future.', vi: 'Dùng từ chỉ thời gian tương lai (tonight, tomorrow, next week) để người nghe biết là nói về tương lai.' }),
    card(58, 3, 'Timetables: present simple', 'Lịch trình: hiện tại đơn',
      'Use the present simple for timetables and schedules: trains, buses, planes, films, lessons and opening times.',
      'Dùng thì hiện tại đơn cho lịch trình, thời gian biểu: tàu, xe buýt, máy bay, phim, giờ học, giờ mở cửa.', [
        ['The train to Hanoi leaves at 6.15 tomorrow morning.', 'Tàu đi Hà Nội khởi hành lúc 6 giờ 15 sáng mai.', 'leaves'],
        ['The film starts at 8 pm.', 'Phim bắt đầu lúc 8 giờ tối.', 'starts'],
        ['What time does the museum open on Sunday?', 'Chủ nhật bảo tàng mở cửa lúc mấy giờ?', 'does the museum open'],
      ]),
    card(58, 4, 'Time clauses', 'Mệnh đề thời gian',
      'After when, as soon as, before, after and until, use the present simple for the future. Use will in the other part of the sentence.',
      'Sau when, as soon as, before, after, until dùng thì hiện tại đơn để nói về tương lai. Vế còn lại mới dùng will.', [
        ['I\'ll call you when I get home.', 'Khi nào về đến nhà tôi sẽ gọi cho bạn.', 'when I get'],
        ['As soon as Lan knows the results, she\'ll tell us.', 'Ngay khi biết kết quả, Lan sẽ báo cho chúng tôi.', 'As soon as Lan knows'],
        ['We won\'t start dinner until Dad comes back.', 'Chúng tôi sẽ không ăn tối cho đến khi bố về.', 'until Dad comes'],
      ], { en: 'Never say when I will get home.', vi: 'Không nói when I will get home.' }),
    card(58, 5, 'Which future form?', 'Chọn dạng tương lai nào?',
      'Arrangement → present continuous. Timetable → present simple. Plan → going to. Quick decision or prediction → will.',
      'Lịch hẹn → hiện tại tiếp diễn. Lịch trình → hiện tại đơn. Dự định → going to. Quyết định tức thì hoặc dự đoán → will.', [
        ['I\'m seeing the dentist at ten tomorrow.', 'Mười giờ sáng mai tôi có hẹn với nha sĩ.', 'I\'m seeing'],
        ['The bus leaves at 7.30.', 'Xe buýt chạy lúc 7 giờ 30.', 'leaves'],
        ['I\'m going to study harder next term.', 'Kỳ tới tôi định học chăm hơn.', 'going to study'],
      ]),
    card(58, 6, 'Negatives and questions', 'Câu phủ định và câu hỏi',
      'Present continuous: I\'m not / isn\'t / aren\'t + -ing. Present simple: don\'t / doesn\'t + base verb; Does … leave?',
      'Hiện tại tiếp diễn: I\'m not / isn\'t / aren\'t + V-ing. Hiện tại đơn: don\'t / doesn\'t + động từ nguyên mẫu; Does … leave?', [
        ['Nam isn\'t playing football this afternoon.', 'Chiều nay Nam không chơi bóng đá.', 'isn\'t playing'],
        ['The new term doesn\'t start until 5 September.', 'Mãi đến ngày 5 tháng Chín năm học mới mới bắt đầu.', 'doesn\'t start'],
        ['When does the next boat to Cat Ba leave?', 'Khi nào chuyến tàu tiếp theo đi Cát Bà khởi hành?', 'does the next boat'],
      ]),
  ],
  59: [
    card(59, 1, 'should for advice', 'should để khuyên',
      'should / shouldn\'t + base verb to give advice. Should I …? to ask for advice.',
      'should / shouldn\'t + động từ nguyên mẫu để khuyên. Should I …? để xin lời khuyên.', [
        ['You look tired. You should go to bed early.', 'Trông bạn mệt quá. Bạn nên đi ngủ sớm.', 'should go'],
        ['You shouldn\'t eat so many sweets.', 'Bạn không nên ăn nhiều kẹo như vậy.', 'shouldn\'t eat'],
        ['Should I tell the teacher?', 'Tôi có nên nói với thầy cô không?', 'Should I'],
      ], { en: 'No to after should: should go, not should to go.', vi: 'Không có to sau should: should go, không nói should to go.' }),
    card(59, 2, 'must and have to', 'must và have to',
      'must / have to + base verb = it is necessary. he, she, it → has to.',
      'must / have to + động từ nguyên mẫu = phải, bắt buộc. he, she, it → has to.', [
        ['Students must bring their ID cards.', 'Học sinh phải mang thẻ học sinh.', 'must bring'],
        ['Nam has to get up early on weekdays.', 'Ngày thường Nam phải dậy sớm.', 'has to get up'],
      ]),
    card(59, 3, 'mustn\'t or don\'t have to?', 'mustn\'t hay don\'t have to?',
      'mustn\'t = it is not allowed (Don\'t do it!). don\'t have to = it is not necessary (You can do it if you want).',
      'mustn\'t = không được phép (Cấm làm!). don\'t have to = không cần thiết (muốn làm thì làm).', [
        ['You mustn\'t use your phone in the exam room.', 'Bạn không được dùng điện thoại trong phòng thi.', 'mustn\'t use'],
        ['We don\'t have to wear a uniform on Saturdays.', 'Thứ Bảy chúng tôi không cần mặc đồng phục.', 'don\'t have to wear'],
        ['Lan doesn\'t have to get up early tomorrow.', 'Ngày mai Lan không cần dậy sớm.', 'doesn\'t have to'],
      ], { en: 'Careful: they look similar but the meanings are very different!', vi: 'Cẩn thận: hai cụm trông giống nhau nhưng nghĩa rất khác nhau!' }),
    card(59, 4, 'had to and didn\'t have to', 'had to và didn\'t have to',
      'must has no past form. Use had to, didn\'t have to and Did … have to …?',
      'must không có dạng quá khứ. Dùng had to, didn\'t have to và Did … have to …?', [
        ['Yesterday I had to get up at five.', 'Hôm qua tôi phải dậy lúc năm giờ.', 'had to'],
        ['We didn\'t have to go to school last Monday.', 'Thứ Hai tuần trước chúng tôi không phải đi học.', 'didn\'t have to'],
        ['Did Nam have to stay late at school?', 'Nam có phải ở lại trường muộn không?', 'Did Nam have to'],
      ]),
    card(59, 5, 'could and couldn\'t', 'could và couldn\'t',
      'could / couldn\'t + base verb = ability in the past. will be able to = ability in the future.',
      'could / couldn\'t + động từ nguyên mẫu = khả năng trong quá khứ. will be able to = khả năng trong tương lai.', [
        ['When she was five, Mai could read and write.', 'Năm lên năm, Mai đã biết đọc và viết.', 'could read'],
        ['I couldn\'t find my keys this morning.', 'Sáng nay tôi không tìm thấy chìa khóa.', 'couldn\'t find'],
        ['Next year, my sister will be able to read.', 'Năm sau em gái tôi sẽ biết đọc.', 'will be able to'],
      ]),
    card(59, 6, 'might for possibility', 'might chỉ khả năng',
      'might / might not + base verb = perhaps something will happen, or perhaps not.',
      'might / might not + động từ nguyên mẫu = có lẽ sẽ xảy ra, hoặc có lẽ không.', [
        ['Take an umbrella. It might rain later.', 'Mang ô theo đi. Lát nữa có thể trời mưa.', 'might rain'],
        ['Mai might not come to the picnic.', 'Có lẽ Mai sẽ không đi dã ngoại.', 'might not come'],
      ], { en: 'might is not sure; will is more sure.', vi: 'might là chưa chắc chắn; will chắc chắn hơn.' }),
  ],
  60: [
    card(60, 1, 'Shops', 'Các cửa hàng',
      'chemist\'s, butcher\'s, bookshop, florist\'s, department store, shopping centre.',
      'chemist\'s (hiệu thuốc), butcher\'s (hàng thịt), bookshop (hiệu sách), florist\'s (cửa hàng hoa), department store (cửa hàng bách hóa), shopping centre (trung tâm mua sắm).', [
        ['I bought some medicine at the chemist\'s.', 'Tôi mua thuốc ở hiệu thuốc.', 'chemist\'s'],
        ['Dad bought roses at the florist\'s.', 'Bố mua hoa hồng ở cửa hàng hoa.', 'florist\'s'],
        ['We met our friends at the shopping centre.', 'Chúng tôi gặp bạn ở trung tâm mua sắm.', 'shopping centre'],
      ], { en: 'A department store is one big shop; a shopping centre is a building with many shops.', vi: 'Department store là một cửa hàng lớn; shopping centre là tòa nhà có nhiều cửa hàng.' }),
    card(60, 2, 'Money', 'Tiền',
      'cash, change, price, credit card, discount, wallet.',
      'cash (tiền mặt), change (tiền thừa), price (giá), credit card (thẻ tín dụng), discount (giảm giá), wallet (ví).', [
        ['Can I pay in cash?', 'Tôi trả bằng tiền mặt được không?', 'cash'],
        ['Here\'s your change.', 'Tiền thừa của bạn đây.', 'change'],
        ['Students get a 10% discount.', 'Học sinh được giảm giá 10%.', 'discount'],
      ]),
    card(60, 3, 'In the shop', 'Trong cửa hàng',
      'trolley, basket, checkout, changing room, shelf, size.',
      'trolley (xe đẩy), basket (giỏ), checkout (quầy thanh toán), changing room (phòng thử đồ), shelf (kệ hàng), size (cỡ).', [
        ['There was a long queue at the checkout.', 'Có một hàng dài ở quầy thanh toán.', 'checkout'],
        ['You can try it on in the changing room.', 'Bạn có thể thử trong phòng thử đồ.', 'changing room'],
        ['Do you have these trainers in a bigger size?', 'Đôi giày này có cỡ lớn hơn không?', 'size'],
      ]),
    card(60, 4, 'Shopping verbs', 'Động từ về mua sắm',
      'afford, spend, save up, take back, deliver, go window-shopping.',
      'afford (đủ tiền mua), spend (tiêu tiền), save up (để dành tiền), take back (mang trả lại), deliver (giao hàng), go window-shopping (đi ngắm đồ).', [
        ['I can\'t afford a new phone.', 'Tôi không đủ tiền mua điện thoại mới.', 'afford'],
        ['I\'m saving up for a new bike.', 'Tôi đang để dành tiền mua xe đạp mới.', 'saving up'],
        ['The shirt was too small, so I took it back.', 'Áo chật quá nên tôi mang trả lại.', 'took it back'],
      ]),
    card(60, 5, 'spend money on', 'spend money on',
      'spend + money + on + thing. pay for + thing. pay in cash / by credit card.',
      'spend + tiền + on + đồ vật (tiêu tiền vào). pay for + đồ vật (trả tiền cho). pay in cash / by credit card (trả bằng tiền mặt / thẻ).', [
        ['I spent all my pocket money on comics.', 'Tôi tiêu hết tiền tiêu vặt vào truyện tranh.', 'spent'],
        ['Dad paid for the TV by credit card.', 'Bố trả tiền ti vi bằng thẻ tín dụng.', 'by credit card'],
      ]),
    card(60, 6, 'Useful shop phrases', 'Mẫu câu hữu ích khi mua sắm',
      'What\'s the price of …? Can I pay in cash? Do you have this in a bigger size? Can you deliver it?',
      'What\'s the price of …? (… giá bao nhiêu?) Can I pay in cash? (Trả tiền mặt được không?) Do you have this in a bigger size? (Có cỡ lớn hơn không?) Can you deliver it? (Có giao hàng không?)', [
        ['What\'s the price of this T-shirt?', 'Chiếc áo phông này giá bao nhiêu?', 'price'],
        ['The shop will deliver the fridge on Monday.', 'Cửa hàng sẽ giao tủ lạnh vào thứ Hai.', 'deliver'],
        ['I left my wallet at home.', 'Tôi để quên ví ở nhà.', 'wallet'],
      ]),
  ],
};
