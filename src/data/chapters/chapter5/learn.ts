import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(5);

export const learnCards: Record<number, LearnCard[]> = {
  13: [
    card(13, 1, 'have/has + past participle', 'have/has + quá khứ phân từ',
      'Present Perfect: I/you/we/they have + past participle; he/she/it has + past participle.',
      'Hiện tại hoàn thành: I/you/we/they have + quá khứ phân từ; he/she/it has + quá khứ phân từ.', [
        ['I have finished my homework.', 'Tôi đã làm xong bài tập.', 'have finished'],
        ['She has visited Hue.', 'Bạn ấy đã từng đến Huế.', 'has visited'],
      ]),
    card(13, 2, 'Past participles', 'Quá khứ phân từ',
      'Regular verbs: + -ed (visited). Irregular verbs: learn them (see → seen, eat → eaten, write → written, be → been).',
      'Động từ có quy tắc: thêm -ed (visited). Động từ bất quy tắc: học thuộc (see → seen, eat → eaten, write → written, be → been).', [
        ['We have seen a dolphin.', 'Chúng tôi đã từng thấy cá heo.', 'seen'],
        ['He has written a poem.', 'Bạn ấy đã viết một bài thơ.', 'written'],
        ['They have eaten sushi.', 'Họ đã từng ăn sushi.', 'eaten'],
      ]),
    card(13, 3, 'Life experiences', 'Trải nghiệm trong đời',
      'Use Present Perfect for experiences when we don\'t say when they happened.',
      'Dùng hiện tại hoàn thành để kể trải nghiệm mà không nói rõ thời gian.', [
        ['I have flown in a helicopter.', 'Tôi đã từng bay trực thăng.', 'have flown'],
        ['My dad has climbed a mountain.', 'Bố tôi đã từng leo núi.', 'has climbed'],
      ], { en: 'With a finished time (yesterday, in 2020), use Past Simple.', vi: 'Nếu có thời gian cụ thể (yesterday, in 2020), dùng quá khứ đơn.' }),
    card(13, 4, 'ever and never', 'ever và never',
      'Have you ever …? = at any time in your life. never = not at any time. Answer: Yes, I have. / No, I haven\'t.',
      'Have you ever …? = bạn đã bao giờ … chưa? never = chưa bao giờ. Trả lời: Yes, I have. / No, I haven\'t.', [
        ['Have you ever ridden a camel?', 'Bạn đã bao giờ cưỡi lạc đà chưa?', 'ever'],
        ['I have never eaten snails.', 'Tôi chưa bao giờ ăn ốc sên.', 'never'],
        ["No, I haven't.", 'Chưa, tôi chưa từng.', "haven't"],
      ]),
    card(13, 5, 'just and already', 'just và already',
      'just = a very short time ago. already = earlier than expected. Put them between have/has and the past participle.',
      'just = vừa mới. already = đã … rồi (sớm hơn mong đợi). Đặt giữa have/has và quá khứ phân từ.', [
        ["I've just had lunch.", 'Tôi vừa ăn trưa xong.', 'just'],
        ["We've already bought the tickets.", 'Chúng tôi đã mua vé rồi.', 'already'],
      ]),
    card(13, 6, 'yet', 'yet',
      'yet = until now. It goes at the end of negatives and questions.',
      'yet = tính đến bây giờ (chưa). Đứng cuối câu phủ định và câu hỏi.', [
        ["The bus hasn't arrived yet.", 'Xe buýt vẫn chưa đến.', 'yet'],
        ['Have you finished your project yet?', 'Bạn đã làm xong dự án chưa?', 'yet'],
      ]),
  ],
  14: [
    card(14, 1, 'Started in the past, still true now', 'Bắt đầu từ quá khứ, vẫn còn đến nay',
      'Use Present Perfect for something that started in the past and continues now.',
      'Dùng hiện tại hoàn thành cho việc bắt đầu trong quá khứ và vẫn tiếp tục đến bây giờ.', [
        ['We have lived here for ten years.', 'Chúng tôi đã sống ở đây mười năm (và vẫn đang sống).', 'have lived'],
        ['She has had a cat since 2021.', 'Bạn ấy nuôi mèo từ năm 2021.', 'has had'],
      ], { en: 'Don\'t say I live here for ten years.', vi: 'Không nói I live here for ten years.' }),
    card(14, 2, 'for + a length of time', 'for + khoảng thời gian',
      'for two years, for six months, for a week, for a long time.',
      'for + khoảng thời gian: for two years (hai năm), for six months (sáu tháng), for a long time (lâu rồi).', [
        ['I have known Mai for five years.', 'Tôi quen Mai được năm năm rồi.', 'for five years'],
        ['We have waited for twenty minutes.', 'Chúng tôi đã đợi hai mươi phút.', 'for twenty minutes'],
      ]),
    card(14, 3, 'since + a starting point', 'since + mốc thời gian',
      'since 2018, since Monday, since last summer, since I was six.',
      'since + mốc bắt đầu: since 2018, since Monday, since last summer, since I was six.', [
        ['They have been friends since Year 3.', 'Họ là bạn từ hồi lớp 3.', 'since Year 3'],
        ['I have learnt English since I was six.', 'Tôi học tiếng Anh từ năm sáu tuổi.', 'since I was six'],
      ]),
    card(14, 4, 'How long …?', 'How long …?',
      'How long + have/has + subject + past participle? It asks about the time until now.',
      'How long + have/has + chủ ngữ + quá khứ phân từ? = … được bao lâu rồi?', [
        ['How long have you lived in Da Nang?', 'Bạn sống ở Đà Nẵng bao lâu rồi?', 'How long'],
        ['How long has Nam played the guitar?', 'Nam chơi ghi-ta được bao lâu rồi?', 'has'],
      ]),
    card(14, 5, 'Answering How long?', 'Trả lời How long?',
      'Answer with for or since: For three years. / Since my birthday.',
      'Trả lời bằng for hoặc since: For three years. / Since my birthday.', [
        ["I've had it since my birthday.", 'Tôi có nó từ hôm sinh nhật.', 'since'],
        ['For twelve years.', 'Mười hai năm rồi.', 'For'],
      ]),
    card(14, 6, 'Negatives with for and since', 'Phủ định với for và since',
      "haven't/hasn't + past participle + for/since = it has not happened during that time.",
      "haven't/hasn't + quá khứ phân từ + for/since = đã lâu không …", [
        ["I haven't seen my cousin since Tet.", 'Tôi không gặp em họ từ Tết.', "haven't seen"],
        ["We haven't eaten anything for six hours!", 'Chúng tôi chưa ăn gì sáu tiếng rồi!', "haven't eaten"],
      ]),
  ],
  15: [
    card(15, 1, 'Travel places', 'Địa điểm du lịch',
      'airport, train station, hotel, capital, beach, museum.',
      'airport (sân bay), train station (ga tàu), hotel (khách sạn), capital (thủ đô), beach (bãi biển), museum (bảo tàng).', [
        ['We got to the airport two hours early.', 'Chúng tôi đến sân bay sớm hai tiếng.', 'airport'],
        ['Hanoi is the capital of Viet Nam.', 'Hà Nội là thủ đô của Việt Nam.', 'capital'],
        ['Our hotel has a swimming pool.', 'Khách sạn của chúng tôi có bể bơi.', 'hotel'],
      ]),
    card(15, 2, 'Things for a trip', 'Đồ dùng cho chuyến đi',
      'passport, ticket, suitcase, map.',
      'passport (hộ chiếu), ticket (vé), suitcase (va li), map (bản đồ).', [
        ["Don't forget your passport!", 'Đừng quên hộ chiếu nhé!', 'passport'],
        ['My suitcase is too heavy!', 'Va li của tôi nặng quá!', 'suitcase'],
        ['I bought a train ticket to Hue.', 'Tôi đã mua vé tàu đi Huế.', 'ticket'],
      ]),
    card(15, 3, 'People and trips', 'Người và chuyến đi',
      'A tourist visits a place on holiday. A journey is the travelling from one place to another.',
      'tourist = khách du lịch. journey = chuyến đi, hành trình.', [
        ['Many tourists visit Ha Long Bay every year.', 'Nhiều khách du lịch đến vịnh Hạ Long mỗi năm.', 'tourists'],
        ['The journey from Hanoi to Sapa takes six hours.', 'Chuyến đi từ Hà Nội đến Sa Pa mất sáu tiếng.', 'journey'],
      ]),
    card(15, 4, 'Getting on and off', 'Lên và xuống xe',
      'get on / get off a bus, train or plane. arrive in a city, arrive at a place. leave = go away.',
      'get on / get off: lên / xuống xe, tàu, máy bay. arrive in + thành phố, arrive at + địa điểm. leave = rời đi.', [
        ['We got on the bus at the school gate.', 'Chúng tôi lên xe buýt ở cổng trường.', 'got on'],
        ['We arrived in Da Lat in the evening.', 'Chúng tôi đến Đà Lạt vào buổi tối.', 'arrived in'],
        ["Our train leaves at seven o'clock.", 'Tàu của chúng tôi khởi hành lúc bảy giờ.', 'leaves'],
      ], { en: 'Say get on the bus, not get in the bus.', vi: 'Nói get on the bus, không nói get in the bus.' }),
    card(15, 5, 'At the hotel', 'Ở khách sạn',
      'check in = tell the hotel or airport you have arrived. stay = live somewhere for a short time.',
      'check in = làm thủ tục nhận phòng / lên máy bay. stay = ở lại một thời gian.', [
        ['We checked in at the hotel at 2 pm.', 'Chúng tôi nhận phòng khách sạn lúc 2 giờ chiều.', 'checked in'],
        ['We stayed with our cousins for a week.', 'Chúng tôi ở nhà anh chị họ một tuần.', 'stayed'],
      ]),
    card(15, 6, 'Describing places', 'Miêu tả địa điểm',
      'crowded, famous, foreign, modern, safe, exciting.',
      'crowded (đông đúc), famous (nổi tiếng), foreign (nước ngoài), modern (hiện đại), safe (an toàn), exciting (hào hứng).', [
        ['The market is very crowded on Sundays.', 'Chợ rất đông vào Chủ nhật.', 'crowded'],
        ['Ha Long Bay is famous all over the world.', 'Vịnh Hạ Long nổi tiếng khắp thế giới.', 'famous'],
        ['The boat trip was really exciting!', 'Chuyến đi thuyền thật hào hứng!', 'exciting'],
      ]),
  ],
};
