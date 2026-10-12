import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(8);

export const learnCards: Record<number, LearnCard[]> = {
  22: [
    card(22, 1, 'Making plurals', 'Cách tạo số nhiều',
      'Most nouns + -s. Nouns ending in -s, -ss, -sh, -ch, -x, -o + -es.',
      'Hầu hết danh từ + -s. Danh từ tận cùng -s, -ss, -sh, -ch, -x, -o + -es.', [
        ['hat → hats', 'cái mũ → những cái mũ', 'hats'],
        ['box → boxes', 'cái hộp → những cái hộp', 'boxes'],
        ['tomato → tomatoes', 'quả cà chua → những quả cà chua', 'tomatoes'],
      ]),
    card(22, 2, '-ies and -ves', '-ies và -ves',
      'Consonant + y → -ies. Many nouns ending in -f / -fe → -ves.',
      'Phụ âm + y → -ies. Nhiều danh từ tận cùng -f / -fe → -ves.', [
        ['baby → babies', 'em bé → những em bé', 'babies'],
        ['leaf → leaves', 'chiếc lá → những chiếc lá', 'leaves'],
        ['knife → knives', 'con dao → những con dao', 'knives'],
      ]),
    card(22, 3, 'Irregular plurals', 'Số nhiều bất quy tắc',
      'child → children, man → men, woman → women, foot → feet, tooth → teeth, mouse → mice, sheep → sheep.',
      'child → children, man → men, woman → women, foot → feet, tooth → teeth, mouse → mice, sheep → sheep.', [
        ['There are three children in the garden.', 'Có ba đứa trẻ trong vườn.', 'children'],
        ['Brush your teeth twice a day.', 'Đánh răng hai lần mỗi ngày.', 'teeth'],
      ], { en: 'Never add -s to children, men or women.', vi: 'Không thêm -s vào children, men, women.' }),
    card(22, 4, 'Countable nouns', 'Danh từ đếm được',
      'Countable nouns can be counted: one apple, two apples. Use a/an with one.',
      'Danh từ đếm được: one apple, two apples. Số ít dùng a/an.', [
        ['Can I have an egg, please?', 'Cho tôi một quả trứng nhé.', 'an egg'],
        ['There are two buses at the station.', 'Có hai xe buýt ở bến.', 'two buses'],
      ]),
    card(22, 5, 'Uncountable nouns', 'Danh từ không đếm được',
      'milk, bread, water, rice, money, information, homework, advice, furniture: no plural, no a/an. Use some.',
      'milk, bread, water, rice, money, information, homework, advice, furniture: không có số nhiều, không dùng a/an. Dùng some.', [
        ['I need some milk for my tea.', 'Tôi cần chút sữa để pha trà.', 'some milk'],
        ['We have a lot of homework today.', 'Hôm nay chúng tôi có nhiều bài tập.', 'homework'],
      ], { en: 'Say some bread, not a bread or breads.', vi: 'Nói some bread, không nói a bread hay breads.' }),
    card(22, 6, 'is or are?', 'is hay are?',
      'Uncountable nouns take is. Plural countable nouns take are.',
      'Danh từ không đếm được đi với is. Danh từ đếm được số nhiều đi với are.', [
        ['This information is very useful.', 'Thông tin này rất hữu ích.', 'is'],
        ['The apples are in the bowl.', 'Những quả táo ở trong bát.', 'are'],
      ]),
  ],
  23: [
    card(23, 1, 'some and any', 'some và any',
      'some in positive sentences and offers; any in negatives and questions.',
      'some trong câu khẳng định và lời mời; any trong câu phủ định và câu hỏi.', [
        ['I bought some bananas.', 'Tôi đã mua ít chuối.', 'some'],
        ["There aren't any eggs.", 'Không còn quả trứng nào.', 'any'],
        ['Would you like some juice?', 'Bạn có muốn uống nước ép không?', 'some'],
      ]),
    card(23, 2, 'How many? How much?', 'How many? How much?',
      'How many + plural countable noun. How much + uncountable noun (and prices).',
      'How many + danh từ đếm được số nhiều. How much + danh từ không đếm được (và hỏi giá).', [
        ['How many apples do you want?', 'Bạn muốn bao nhiêu quả táo?', 'How many'],
        ['How much sugar do you take?', 'Bạn cho bao nhiêu đường?', 'How much'],
        ['How much does this bag cost?', 'Cái túi này giá bao nhiêu?', 'How much'],
      ]),
    card(23, 3, 'many and much', 'many và much',
      'many + countable plural; much + uncountable. We use them most in negatives and questions.',
      'many + danh từ đếm được số nhiều; much + danh từ không đếm được. Thường dùng trong câu phủ định và câu hỏi.', [
        ["There aren't many chairs.", 'Không có nhiều ghế.', 'many'],
        ["We don't have much time.", 'Chúng ta không có nhiều thời gian.', 'much'],
      ]),
    card(23, 4, 'a lot of / lots of', 'a lot of / lots of',
      'a lot of and lots of go with both kinds of nouns, especially in positive sentences.',
      'a lot of và lots of đi với cả hai loại danh từ, nhất là trong câu khẳng định.', [
        ['She has a lot of friends.', 'Bạn ấy có rất nhiều bạn.', 'a lot of'],
        ['She drinks lots of water.', 'Bạn ấy uống rất nhiều nước.', 'lots of'],
      ], { en: 'Say a lot of milk, not a lot milk.', vi: 'Nói a lot of milk, không nói a lot milk.' }),
    card(23, 5, 'a few and a little', 'a few và a little',
      'a few + countable plural = a small number. a little + uncountable = a small amount.',
      'a few + danh từ đếm được số nhiều = một vài. a little + danh từ không đếm được = một ít.', [
        ['I have a few friends in Da Nang.', 'Tôi có vài người bạn ở Đà Nẵng.', 'a few'],
        ['There is a little rice in the pot.', 'Còn một ít cơm trong nồi.', 'a little'],
      ]),
    card(23, 6, 'Countable or uncountable?', 'Đếm được hay không đếm được?',
      'Check the noun first, then choose: many / a few for countable; much / a little for uncountable.',
      'Xác định danh từ trước, rồi chọn: many / a few cho danh từ đếm được; much / a little cho danh từ không đếm được.', [
        ['How many people are in your family?', 'Nhà bạn có bao nhiêu người?', 'many people'],
        ['We need a few potatoes and a little salt.', 'Chúng ta cần vài củ khoai và một ít muối.', 'a little salt'],
      ]),
  ],
  24: [
    card(24, 1, 'Kinds of food', 'Các loại thức ăn',
      'vegetables, fruit, snack, meal, dessert, recipe.',
      'vegetables (rau củ), fruit (trái cây), snack (đồ ăn nhẹ), meal (bữa ăn), dessert (tráng miệng), recipe (công thức).', [
        ['Eat your vegetables!', 'Ăn rau đi con!', 'vegetables'],
        ['We had ice cream for dessert.', 'Chúng tôi ăn kem tráng miệng.', 'dessert'],
        ['This recipe needs three eggs.', 'Công thức này cần ba quả trứng.', 'recipe'],
      ]),
    card(24, 2, 'Containers', 'Đồ đựng',
      'a bottle of water, a carton of milk, a packet of biscuits, a jar of honey, a loaf of bread, a bar of chocolate.',
      'a bottle of (chai), a carton of (hộp giấy), a packet of (gói), a jar of (lọ), a loaf of (ổ), a bar of (thanh).', [
        ['Can I have a bottle of water?', 'Cho tôi một chai nước.', 'bottle'],
        ['I bought a packet of biscuits.', 'Tôi đã mua một gói bánh quy.', 'packet'],
        ['We need a loaf of bread.', 'Chúng ta cần một ổ bánh mì.', 'loaf'],
      ], { en: 'Containers help you count uncountable food: two cartons of milk.', vi: 'Đồ đựng giúp đếm thức ăn không đếm được: two cartons of milk.' }),
    card(24, 3, 'Places to shop', 'Nơi mua sắm',
      'supermarket, market, bakery.',
      'supermarket (siêu thị), market (chợ), bakery (tiệm bánh).', [
        ['We go to the supermarket on Saturdays.', 'Chúng tôi đi siêu thị vào thứ Bảy.', 'supermarket'],
        ['Grandma buys fish at the market.', 'Bà mua cá ở chợ.', 'market'],
      ]),
    card(24, 4, 'People and paper', 'Con người và giấy tờ',
      'A customer buys things. A shop assistant helps you. A receipt shows what you paid.',
      'customer (khách hàng), shop assistant (nhân viên bán hàng), receipt (hóa đơn).', [
        ['The shop has a lot of customers today.', 'Hôm nay cửa hàng có nhiều khách.', 'customers'],
        ['The shop assistant helped me find a bigger size.', 'Nhân viên bán hàng giúp tôi tìm cỡ lớn hơn.', 'shop assistant'],
        ['Keep the receipt.', 'Hãy giữ hóa đơn.', 'receipt'],
      ]),
    card(24, 5, 'Buying and selling', 'Mua và bán',
      'pay, sell, cost, try on, queue.',
      'pay (trả tiền), sell (bán), cost (có giá), try on (mặc thử), queue (xếp hàng).', [
        ['Can I pay by card?', 'Tôi trả bằng thẻ được không?', 'pay'],
        ['Can I try on these jeans?', 'Tôi mặc thử quần jean này được không?', 'try on'],
        ['We had to queue for twenty minutes.', 'Chúng tôi phải xếp hàng hai mươi phút.', 'queue'],
      ]),
    card(24, 6, 'Prices', 'Giá cả',
      'How much does it cost? cheap = not costing much money.',
      'How much does it cost? = Nó giá bao nhiêu? cheap = rẻ.', [
        ['How much does this T-shirt cost?', 'Áo phông này giá bao nhiêu?', 'cost'],
        ['These shoes are really cheap.', 'Đôi giày này rẻ thật.', 'cheap'],
      ]),
  ],
};
