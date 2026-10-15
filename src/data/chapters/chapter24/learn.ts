import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(24);

export const learnCards: Record<number, LearnCard[]> = {
  70: [
    card(70, 1, 'Adverbs of manner', 'Trạng từ chỉ cách thức',
      'An adverb of manner says how we do something. Most are adjective + -ly: careful → carefully, polite → politely.',
      'Trạng từ chỉ cách thức cho biết ta làm việc gì như thế nào. Phần lớn là tính từ + -ly: careful → carefully, polite → politely.', [
        ['Mum rides her motorbike carefully.', 'Mẹ đi xe máy cẩn thận.', 'carefully'],
        ['Mai speaks politely to her teachers.', 'Mai nói chuyện lễ phép với thầy cô.', 'politely'],
      ]),
    card(70, 2, '-ly spelling', 'Chính tả của -ly',
      'y → ily (happy → happily, easy → easily). -le → -ly (gentle → gently, terrible → terribly).',
      'y → ily (happy → happily, easy → easily). -le → -ly (gentle → gently, terrible → terribly).', [
        ['The children play happily in the schoolyard.', 'Bọn trẻ chơi vui vẻ ngoài sân trường.', 'happily'],
        ['Lan holds the baby kitten gently.', 'Lan bế chú mèo con nhẹ nhàng.', 'gently'],
      ]),
    card(70, 3, 'Irregular adverbs', 'Trạng từ bất quy tắc',
      'good → well. fast, hard, late, early, high and straight do not change.',
      'good → well. fast, hard, late, early, high, straight giữ nguyên.', [
        ['Lan speaks English very well.', 'Lan nói tiếng Anh rất giỏi.', 'well'],
        ['Mai studies hard every day.', 'Mai học chăm chỉ mỗi ngày.', 'hard'],
        ['The coach arrived late.', 'Xe khách đến muộn.', 'late'],
      ], { en: 'hardly = almost not; lately = recently. They are different words!', vi: 'hardly = hầu như không; lately = gần đây. Đây là những từ khác nghĩa!' }),
    card(70, 4, 'Adjective or adverb?', 'Tính từ hay trạng từ?',
      'Adjectives describe nouns and come after be, look, feel, taste, sound. Adverbs describe actions.',
      'Tính từ bổ nghĩa cho danh từ và đứng sau be, look, feel, taste, sound. Trạng từ bổ nghĩa cho hành động.', [
        ['My uncle is a careful driver.', 'Chú tôi là người lái xe cẩn thận.', 'careful driver'],
        ['My uncle drives very carefully.', 'Chú tôi lái xe rất cẩn thận.', 'drives very carefully'],
        ['This soup tastes delicious.', 'Món súp này có vị rất ngon.', 'tastes delicious'],
      ]),
    card(70, 5, 'Comparing adverbs', 'So sánh trạng từ',
      'fast → faster, hard → harder, early → earlier. -ly adverbs use more: more carefully. well → better, badly → worse.',
      'fast → faster, hard → harder, early → earlier. Trạng từ -ly dùng more: more carefully. well → better, badly → worse.', [
        ['Nam runs faster than Minh.', 'Nam chạy nhanh hơn Minh.', 'faster than'],
        ['Mai sings more beautifully than me.', 'Mai hát hay hơn tôi.', 'more beautifully'],
        ['Lan speaks English better than her brother.', 'Lan nói tiếng Anh giỏi hơn anh trai.', 'better'],
      ]),
    card(70, 6, 'Where does the adverb go?', 'Trạng từ đứng ở đâu?',
      'Put an adverb of manner after the verb and its object. Adverbs of degree (very, really, quite, too) go before an adjective or adverb.',
      'Trạng từ chỉ cách thức đứng sau động từ và tân ngữ. Trạng từ chỉ mức độ (very, really, quite, too) đứng trước tính từ hoặc trạng từ.', [
        ['She speaks English quietly.', 'Cô ấy nói tiếng Anh nhỏ nhẹ.', 'English quietly'],
        ['The film was really good.', 'Bộ phim thực sự hay.', 'really good'],
      ], { en: 'She speaks quietly English ✗ → She speaks English quietly ✓', vi: 'She speaks quietly English ✗ → She speaks English quietly ✓' }),
  ],
  71: [
    card(71, 1, 'Adjective + preposition', 'Tính từ + giới từ',
      'good at, afraid of, interested in, proud of, worried about, famous for, keen on, kind to.',
      'good at (giỏi), afraid of (sợ), interested in (quan tâm), proud of (tự hào), worried about (lo lắng), famous for (nổi tiếng về), keen on (say mê), kind to (tử tế với).', [
        ['Nam is very good at Maths.', 'Nam rất giỏi Toán.', 'good at'],
        ['Hoi An is famous for its colourful lanterns.', 'Hội An nổi tiếng với những chiếc đèn lồng nhiều màu.', 'famous for'],
        ['My little sister is afraid of the dark.', 'Em gái tôi sợ bóng tối.', 'afraid of'],
      ]),
    card(71, 2, 'Verb + preposition', 'Động từ + giới từ',
      'listen to, wait for, look after, look for, belong to, depend on, agree with, pay for, spend money on.',
      'listen to (nghe), wait for (chờ), look after (chăm sóc), look for (tìm), belong to (thuộc về), depend on (phụ thuộc), agree with (đồng ý với), pay for (trả tiền), spend money on (tiêu tiền vào).', [
        ['Please listen to your teacher.', 'Hãy lắng nghe cô giáo.', 'listen to'],
        ['Grandma looks after my baby brother.', 'Bà chăm sóc em trai tôi.', 'looks after'],
        ['Our picnic depends on the weather.', 'Buổi dã ngoại phụ thuộc vào thời tiết.', 'depends on'],
      ]),
    card(71, 3, 'Preposition + -ing', 'Giới từ + động từ -ing',
      'After a preposition, the verb takes -ing.',
      'Sau giới từ, động từ thêm -ing.', [
        ['My brother is keen on playing badminton.', 'Anh tôi mê chơi cầu lông.', 'playing'],
        ["I'm tired of eating instant noodles.", 'Tôi chán ăn mì gói rồi.', 'eating'],
      ]),
    card(71, 4, 'for, since, during', 'for, since, during',
      'for + a length of time (for two weeks). since + a starting point (since 2020). during + an event (during the exam).',
      'for + khoảng thời gian (for two weeks). since + mốc thời gian (since 2020). during + sự kiện (during the exam).', [
        ['We stayed with our grandparents for two weeks.', 'Chúng tôi ở với ông bà hai tuần.', 'for two weeks'],
        ["I've known Lan since 2020.", 'Tôi quen Lan từ năm 2020.', 'since 2020'],
        ["Please don't talk during the exam.", 'Đừng nói chuyện trong giờ thi.', 'during'],
      ]),
    card(71, 5, 'until or by?', 'until hay by?',
      'until = the action continues up to that time. by = the action happens before or at that time.',
      'until = hành động kéo dài đến thời điểm đó. by = hành động xảy ra trước hoặc đúng thời điểm đó.', [
        ['The library is open until 8 pm.', 'Thư viện mở cửa đến 8 giờ tối.', 'until'],
        ['You must hand in your project by Friday.', 'Em phải nộp dự án trước thứ Sáu.', 'by Friday'],
      ]),
    card(71, 6, 'Travelling', 'Phương tiện đi lại',
      'by bus, by train, by plane (no article). on foot. in a car, in a taxi. on the bus, on the train, on the plane.',
      'by bus, by train, by plane (không có mạo từ). on foot (đi bộ). in a car, in a taxi. on the bus, on the train, on the plane.', [
        ['Lan goes to school by bike.', 'Lan đi học bằng xe đạp.', 'by bike'],
        ['Nam goes on foot.', 'Nam đi bộ.', 'on foot'],
        ["They came in my uncle's car.", 'Họ đến bằng xe của chú tôi.', 'in my uncle'],
      ], { en: "by car, but in my uncle's car.", vi: "Nói by car, nhưng in my uncle's car." }),
  ],
  72: [
    card(72, 1, 'Transport', 'Phương tiện',
      'ferry, coach, underground, platform, cable car, return ticket.',
      'ferry (phà), coach (xe khách), underground (tàu điện ngầm), platform (sân ga), cable car (cáp treo), return ticket (vé khứ hồi).', [
        ['We took the ferry to Cat Ba Island.', 'Chúng tôi đi phà ra đảo Cát Bà.', 'ferry'],
        ['The train to Hue leaves from platform 2.', 'Tàu đi Huế khởi hành từ sân ga số 2.', 'platform'],
      ]),
    card(72, 2, 'At the airport', 'Ở sân bay',
      'flight, boarding pass, luggage, gate, delay, land.',
      'flight (chuyến bay), boarding pass (thẻ lên máy bay), luggage (hành lý), gate (cửa ra máy bay), delay (sự chậm trễ), land (hạ cánh).', [
        ['Please show your boarding pass at the gate.', 'Vui lòng xuất trình thẻ lên máy bay ở cửa ra.', 'boarding pass'],
        ['There was a two-hour delay because of the storm.', 'Chuyến bay bị chậm hai tiếng vì bão.', 'delay'],
      ], { en: 'luggage is uncountable: a lot of luggage, not luggages.', vi: 'luggage là danh từ không đếm được: a lot of luggage, không nói luggages.' }),
    card(72, 3, 'Places to stay', 'Nơi lưu trú',
      'book, reception, hostel, campsite, single room, guest.',
      'book (đặt trước), reception (quầy lễ tân), hostel (nhà nghỉ giá rẻ), campsite (khu cắm trại), single room (phòng đơn), guest (khách).', [
        ['We booked a room by the sea.', 'Chúng tôi đã đặt một phòng gần biển.', 'booked'],
        ['Please leave your key at reception.', 'Vui lòng để lại chìa khóa ở quầy lễ tân.', 'reception'],
      ]),
    card(72, 4, 'On a trip', 'Trong chuyến đi',
      'sightseeing, souvenir, guidebook, backpack, abroad, trip.',
      'sightseeing (tham quan), souvenir (quà lưu niệm), guidebook (sách hướng dẫn du lịch), backpack (ba lô), abroad (ở nước ngoài), trip (chuyến đi).', [
        ['We went sightseeing in Hue all day.', 'Chúng tôi đi tham quan Huế cả ngày.', 'sightseeing'],
        ['I bought a lantern as a souvenir of Hoi An.', 'Tôi mua đèn lồng làm quà lưu niệm Hội An.', 'souvenir'],
      ]),
    card(72, 5, 'Travel phrases', 'Cụm từ du lịch',
      'go sightseeing, go on a trip, book a room, take the ferry, travel abroad.',
      'go sightseeing (đi tham quan), go on a trip (đi một chuyến), book a room (đặt phòng), take the ferry (đi phà), travel abroad (đi nước ngoài).', [
        ['Our class went on a trip to the museum.', 'Lớp chúng tôi đi tham quan bảo tàng.', 'went on a trip'],
        ['My cousin is studying abroad in Australia.', 'Anh họ tôi đang du học ở Úc.', 'abroad'],
      ], { en: 'Say go abroad, not go to abroad.', vi: 'Nói go abroad, không nói go to abroad.' }),
    card(72, 6, 'A journey by plane', 'Một chuyến đi bằng máy bay',
      'Book your flight, check your luggage, show your boarding pass at the gate, then the plane takes off and lands.',
      'Đặt vé máy bay, gửi hành lý, xuất trình thẻ lên máy bay ở cửa ra, rồi máy bay cất cánh và hạ cánh.', [
        ['Our flight to Da Nang takes one hour.', 'Chuyến bay đến Đà Nẵng mất một tiếng.', 'flight'],
        ['Our luggage was too heavy.', 'Hành lý của chúng tôi quá nặng.', 'luggage'],
        ['The plane will land in Hue at 6 pm.', 'Máy bay sẽ hạ cánh ở Huế lúc 6 giờ chiều.', 'land'],
      ]),
  ],
};
