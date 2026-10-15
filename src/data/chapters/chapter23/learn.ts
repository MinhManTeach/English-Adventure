import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(23);

export const learnCards: Record<number, LearnCard[]> = {
  67: [
    card(67, 1, 'Comparative forms', 'Dạng so sánh hơn',
      'Short adjectives add -er: cheap → cheaper, busy → busier, big → bigger. Long adjectives use more: more crowded, more expensive.',
      'Tính từ ngắn thêm -er: cheap → cheaper, busy → busier, big → bigger. Tính từ dài dùng more: more crowded, more expensive.', [
        ['Hanoi is noisier than my village.', 'Hà Nội ồn ào hơn làng tôi.', 'noisier than'],
        ['Ben Thanh Market is more crowded than the supermarket.', 'Chợ Bến Thành đông đúc hơn siêu thị.', 'more crowded'],
      ], { en: 'Never use more and -er together: say bigger, not more bigger.', vi: 'Không dùng more cùng -er: nói bigger, không nói more bigger.' }),
    card(67, 2, 'Irregular comparatives', 'So sánh hơn bất quy tắc',
      'good → better, bad → worse, far → further.',
      'good → better (tốt hơn), bad → worse (tệ hơn), far → further (xa hơn).', [
        ["The food at Grandma's house is better than the food in restaurants.", 'Đồ ăn ở nhà bà ngon hơn đồ ăn ở nhà hàng.', 'better'],
        ['The traffic today is worse than yesterday.', 'Giao thông hôm nay tệ hơn hôm qua.', 'worse'],
        ['My new school is further from my house.', 'Trường mới xa nhà tôi hơn.', 'further'],
      ]),
    card(67, 3, 'much, a lot, far, a bit', 'much, a lot, far, a bit',
      'Put much, a lot or far before a comparative for a big difference, and a bit for a small difference. Do not use very.',
      'Đặt much, a lot hoặc far trước so sánh hơn khi khác nhau nhiều; a bit khi khác nhau ít. Không dùng very.', [
        ['Da Lat is much cooler than Ho Chi Minh City.', 'Đà Lạt mát hơn nhiều so với TP. Hồ Chí Minh.', 'much cooler'],
        ['My bag is a bit heavier than yours.', 'Cặp của tôi nặng hơn cặp bạn một chút.', 'a bit heavier'],
      ], { en: 'very bigger ✗ → much bigger ✓', vi: 'very bigger ✗ → much bigger ✓' }),
    card(67, 4, 'less … than', 'less … than',
      'less + adjective + than = not as … as. It is the opposite of more … than.',
      'less + tính từ + than = không … bằng. Đây là nghĩa ngược với more … than.', [
        ['The bus is less comfortable than the train.', 'Xe buýt kém thoải mái hơn tàu hỏa.', 'less comfortable'],
        ['My hometown is less modern than Da Nang.', 'Quê tôi kém hiện đại hơn Đà Nẵng.', 'less modern than'],
      ]),
    card(67, 5, '(not) as … as', '(not) as … as',
      'as + adjective + as = the same. not as + adjective + as = less. Use the normal adjective in the middle.',
      'as + tính từ + as = bằng nhau. not as + tính từ + as = không bằng. Ở giữa dùng tính từ nguyên dạng.', [
        ['Lan is as tall as her older sister.', 'Lan cao bằng chị gái.', 'as tall as'],
        ["My village isn't as crowded as Ho Chi Minh City.", 'Làng tôi không đông đúc bằng TP. Hồ Chí Minh.', "isn't as crowded as"],
      ]),
    card(67, 6, 'Bigger and bigger', 'Ngày càng lớn hơn',
      'Repeat the comparative to show a change that continues: hotter and hotter, more and more expensive.',
      'Lặp lại so sánh hơn để diễn tả sự thay đổi ngày càng tăng: hotter and hotter, more and more expensive.', [
        ['Our city is getting bigger and bigger.', 'Thành phố của chúng tôi ngày càng lớn hơn.', 'bigger and bigger'],
        ['Food is getting more and more expensive.', 'Đồ ăn ngày càng đắt hơn.', 'more and more expensive'],
      ]),
    card(67, 7, 'the same as, different from', 'the same as, different from',
      'the same as = not different; different from = not the same; similar to = almost the same.',
      'the same as = giống hệt; different from = khác với; similar to = tương tự.', [
        ['My phone is the same as yours.', 'Điện thoại của tôi giống của bạn.', 'the same as'],
        ['Village life is very different from city life.', 'Cuộc sống ở làng rất khác cuộc sống thành phố.', 'different from'],
      ]),
  ],
  68: [
    card(68, 1, 'Superlative forms', 'Dạng so sánh nhất',
      'Short adjectives: the + adjective + -est (the busiest, the biggest). Long adjectives: the most + adjective.',
      'Tính từ ngắn: the + tính từ + -est (the busiest, the biggest). Tính từ dài: the most + tính từ.', [
        ['Monday is the busiest day of the week.', 'Thứ Hai là ngày bận rộn nhất trong tuần.', 'the busiest'],
        ['This is the most expensive hotel in the city.', 'Đây là khách sạn đắt nhất thành phố.', 'the most expensive'],
      ], { en: 'Always put the before a superlative.', vi: 'Luôn đặt the trước so sánh nhất.' }),
    card(68, 2, 'Irregular superlatives', 'So sánh nhất bất quy tắc',
      'good → the best, bad → the worst, far → the furthest.',
      'good → the best (tốt nhất), bad → the worst (tệ nhất), far → the furthest (xa nhất).', [
        ['Lan is the best singer in our class.', 'Lan hát hay nhất lớp tôi.', 'the best'],
        ['This road is the worst road in the district.', 'Con đường này tệ nhất quận.', 'the worst'],
      ]),
    card(68, 3, 'in or of?', 'Dùng in hay of?',
      'After a superlative use in + a place or group (in our class, in Vietnam) and of + a number or all (of the three, of all).',
      'Sau so sánh nhất: in + nơi chốn / nhóm (in our class, in Vietnam); of + số lượng hoặc all (of the three, of all).', [
        ['Minh is the tallest boy in our class.', 'Minh là cậu bé cao nhất lớp chúng tôi.', 'in our class'],
        ['Nam is the youngest of the three boys.', 'Nam nhỏ tuổi nhất trong ba cậu bé.', 'of the three'],
      ]),
    card(68, 4, 'one of the …', 'one of the … (một trong những … nhất)',
      'one of the + superlative + plural noun.',
      'one of the + so sánh nhất + danh từ số nhiều.', [
        ['Hoi An is one of the most beautiful towns in Vietnam.', 'Hội An là một trong những thị trấn đẹp nhất Việt Nam.', 'one of the most beautiful towns'],
        ['Ben Thanh is one of the oldest markets in the city.', 'Bến Thành là một trong những khu chợ lâu đời nhất thành phố.', 'oldest markets'],
      ], { en: 'The noun is plural: one of the oldest buildings, not building.', vi: 'Danh từ ở số nhiều: one of the oldest buildings, không phải building.' }),
    card(68, 5, "… I've ever …", "… nhất mà tôi từng …",
      "the + superlative + I've ever + past participle.",
      "the + so sánh nhất + I've ever + quá khứ phân từ.", [
        ["This is the most delicious banh mi I've ever eaten.", 'Đây là ổ bánh mì ngon nhất tôi từng ăn.', 'eaten'],
        ["That was the funniest film I've ever seen.", 'Đó là bộ phim hài nhất tôi từng xem.', "I've ever seen"],
      ]),
    card(68, 6, 'the least', 'the least (kém … nhất)',
      'the least + adjective is the opposite of the most + adjective.',
      'the least + tính từ (kém … nhất) ngược nghĩa với the most + tính từ.', [
        ['This is the least crowded beach in Nha Trang.', 'Đây là bãi biển ít đông nhất ở Nha Trang.', 'the least crowded'],
        ['Maths is the least difficult subject for me.', 'Toán là môn ít khó nhất đối với tôi.', 'the least difficult'],
      ]),
    card(68, 7, 'Two or more?', 'Hai hay nhiều hơn?',
      'Compare two things with a comparative (taller than). Compare three or more with a superlative (the tallest).',
      'So sánh hai vật dùng so sánh hơn (taller than). Ba vật trở lên dùng so sánh nhất (the tallest).', [
        ['Lan is taller than Mai.', 'Lan cao hơn Mai.', 'taller than'],
        ['Hoa is the tallest of the three girls.', 'Hoa cao nhất trong ba bạn gái.', 'the tallest'],
      ]),
  ],
  69: [
    card(69, 1, 'Buildings in town', 'Các tòa nhà trong thị trấn',
      'pharmacy, post office, car park, petrol station, town hall, department store.',
      'pharmacy (hiệu thuốc), post office (bưu điện), car park (bãi đỗ xe), petrol station (cây xăng), town hall (tòa thị chính), department store (cửa hàng bách hóa).', [
        ['Mum bought some cough medicine at the pharmacy.', 'Mẹ mua thuốc ho ở hiệu thuốc.', 'pharmacy'],
        ['I sent a parcel to my cousin from the post office.', 'Tôi gửi bưu kiện cho em họ ở bưu điện.', 'post office'],
      ]),
    card(69, 2, 'In the street', 'Trên đường phố',
      'pavement, crossroads, roundabout, bridge, corner, square.',
      'pavement (vỉa hè), crossroads (ngã tư), roundabout (vòng xuyến), bridge (cây cầu), corner (góc phố), square (quảng trường).', [
        ['Turn right at the next crossroads.', 'Rẽ phải ở ngã tư tiếp theo.', 'crossroads'],
        ['There is a bakery on the corner of my street.', 'Có một tiệm bánh ở góc phố nhà tôi.', 'on the corner'],
      ]),
    card(69, 3, 'The countryside', 'Vùng nông thôn',
      'village, field, hill, lake, coast, countryside.',
      'village (ngôi làng), field (cánh đồng), hill (ngọn đồi), lake (hồ), coast (bờ biển), countryside (nông thôn).', [
        ['My grandparents live in a small village near Nam Dinh.', 'Ông bà tôi sống ở một ngôi làng nhỏ gần Nam Định.', 'village'],
        ['We climbed the hill to watch the sunset.', 'Chúng tôi leo đồi ngắm hoàng hôn.', 'hill'],
      ]),
    card(69, 4, 'Describing places', 'Miêu tả nơi chốn',
      'lively, polluted, narrow, wide, convenient, local.',
      'lively (sôi động), polluted (ô nhiễm), narrow (hẹp), wide (rộng), convenient (thuận tiện), local (địa phương).', [
        ['The night market is very lively.', 'Chợ đêm rất sôi động.', 'lively'],
        ['The lanes in the Old Quarter are very narrow.', 'Những con ngõ ở Phố Cổ rất hẹp.', 'narrow'],
      ]),
    card(69, 5, 'Giving directions', 'Chỉ đường',
      'Use the street words to give directions: turn left at the crossroads, go round the roundabout, cross the bridge.',
      'Dùng từ về đường phố để chỉ đường: rẽ trái ở ngã tư, đi vòng qua vòng xuyến, đi qua cầu.', [
        ['Take the second exit at the roundabout.', 'Đi lối ra thứ hai ở vòng xuyến.', 'roundabout'],
        ['We walked across the bridge to the island.', 'Chúng tôi đi bộ qua cầu ra đảo.', 'bridge'],
        ['Walk on the pavement, not in the road.', 'Hãy đi trên vỉa hè, đừng đi dưới lòng đường.', 'pavement'],
      ]),
    card(69, 6, 'Town or country?', 'Thành thị hay nông thôn?',
      'Compare places with the adjectives you know: a lively city, a polluted river, a convenient flat, the peaceful countryside.',
      'So sánh các nơi bằng tính từ đã học: thành phố sôi động, dòng sông ô nhiễm, căn hộ thuận tiện, vùng quê yên bình.', [
        ['The city is livelier than the countryside.', 'Thành phố sôi động hơn nông thôn.', 'livelier'],
        ['I love the fresh air in the countryside.', 'Tôi thích không khí trong lành ở nông thôn.', 'countryside'],
        ['Our flat is convenient because it is near the bus stop.', 'Căn hộ của chúng tôi thuận tiện vì gần bến xe buýt.', 'convenient'],
      ]),
  ],
};
