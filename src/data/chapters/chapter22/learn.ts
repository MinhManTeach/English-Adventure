import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(22);

export const learnCards: Record<number, LearnCard[]> = {
  64: [
    card(64, 1, 'Tricky uncountable nouns', 'Danh từ không đếm được dễ nhầm',
      'advice, information, news, homework, furniture, luggage, traffic, weather, equipment and music are uncountable in English: no -s, no a / an.',
      'advice (lời khuyên), information (thông tin), news (tin tức), homework (bài tập về nhà), furniture (đồ đạc), luggage (hành lý), traffic (giao thông), weather (thời tiết), equipment (thiết bị), music (âm nhạc) là danh từ không đếm được: không thêm -s, không đi với a / an.', [
        ['My teacher gave me some useful advice.', 'Cô giáo cho tôi vài lời khuyên hữu ích.', 'some useful advice'],
        ['You can find more information on the website.', 'Bạn có thể tìm thêm thông tin trên trang web.', 'information'],
      ], { en: 'In Vietnamese we can say "một lời khuyên", but in English "an advice" is wrong.', vi: 'Tiếng Việt nói được "một lời khuyên", nhưng tiếng Anh không nói "an advice".' }),
    card(64, 2, 'Singular verb', 'Động từ số ít',
      'An uncountable noun takes a singular verb: is, was, has, comes.',
      'Danh từ không đếm được đi với động từ số ít: is, was, has, comes.', [
        ['The news is on at seven o\'clock.', 'Thời sự phát lúc bảy giờ.', 'news is'],
        ['The traffic was terrible this morning.', 'Sáng nay giao thông thật kinh khủng.', 'traffic was'],
      ], { en: 'news ends in -s, but it is not plural.', vi: 'news tận cùng bằng -s nhưng không phải số nhiều.' }),
    card(64, 3, 'a piece of …', 'a piece of …',
      'To count uncountable nouns, use a piece of: a piece of advice, a piece of information, a piece of furniture, a piece of paper.',
      'Để đếm danh từ không đếm được, dùng a piece of: a piece of advice (một lời khuyên), a piece of furniture (một món đồ đạc), a piece of paper (một tờ giấy).', [
        ['She gave me a piece of advice.', 'Cô ấy cho tôi một lời khuyên.', 'a piece of advice'],
        ['We bought three pieces of furniture.', 'Chúng tôi mua ba món đồ đạc.', 'three pieces of furniture'],
      ]),
    card(64, 4, 'Containers and portions', 'Vật chứa và khẩu phần',
      'a glass of water, a cup of tea, a carton of milk, a bowl of rice, a slice of bread, a bar of chocolate, a jar of honey.',
      'a glass of water (một cốc nước), a cup of tea (một tách trà), a carton of milk (một hộp sữa), a bowl of rice (một bát cơm), a slice of bread (một lát bánh mì), a bar of chocolate (một thanh sô-cô-la), a jar of honey (một lọ mật ong).', [
        ['Can I have a glass of water?', 'Cho tôi một cốc nước được không?', 'a glass of'],
        ['Nam ate three bowls of rice.', 'Nam ăn ba bát cơm.', 'three bowls of'],
      ], { en: 'Make the container plural, not the noun: two slices of bread.', vi: 'Thêm số nhiều cho vật chứa, không cho danh từ: two slices of bread.' }),
    card(64, 5, 'Always plural', 'Luôn ở dạng số nhiều',
      'jeans, trousers, shorts, pyjamas, glasses, scissors and clothes are plural. Use are, and a pair of to count them.',
      'jeans, trousers, shorts, pyjamas, glasses, scissors và clothes là số nhiều. Dùng are, và dùng a pair of để đếm.', [
        ['My new jeans are too long.', 'Quần jeans mới của tôi dài quá.', 'jeans are'],
        ['I need a pair of trousers for school.', 'Tôi cần một chiếc quần dài để đi học.', 'a pair of trousers'],
      ]),
    card(64, 6, 'Irregular plurals', 'Số nhiều bất quy tắc',
      'person – people, child – children, woman – women, tooth – teeth, foot – feet, mouse – mice; fish and sheep stay the same.',
      'person – people, child – children, woman – women, tooth – teeth, foot – feet, mouse – mice; fish và sheep giữ nguyên.', [
        ['The people in my village are very friendly.', 'Người dân làng tôi rất thân thiện.', 'people in my village are'],
        ['Two mice live in our kitchen.', 'Có hai con chuột sống trong bếp nhà tôi.', 'mice'],
      ]),
    card(64, 7, 'job or work?', 'job hay work?',
      'job is countable: a job, two jobs. work is uncountable: go to work, a lot of work.',
      'job đếm được: a job, two jobs. work không đếm được: go to work, a lot of work.', [
        ["I'm looking for a job.", 'Tôi đang tìm việc.', 'a job'],
        ['Dad has a lot of work today.', 'Hôm nay bố có nhiều việc.', 'a lot of work'],
      ]),
  ],
  65: [
    card(65, 1, 'much, many, a lot of', 'much, many, a lot of',
      'many + plural countable nouns; much + uncountable nouns, mostly in negatives and questions; a lot of / lots of with both.',
      'many + danh từ đếm được số nhiều; much + danh từ không đếm được, chủ yếu trong câu phủ định và câu hỏi; a lot of / lots of dùng với cả hai.', [
        ['How many brothers and sisters have you got?', 'Bạn có bao nhiêu anh chị em?', 'How many'],
        ["There isn't much milk in the fridge.", 'Trong tủ lạnh không còn nhiều sữa.', 'much milk'],
        ['There were lots of people at the market.', 'Có rất nhiều người ở chợ.', 'lots of'],
      ]),
    card(65, 2, 'too much, too many', 'too much, too many',
      'too many + plural countable nouns, too much + uncountable nouns = more than we want.',
      'too many + danh từ đếm được số nhiều, too much + danh từ không đếm được = quá nhiều, nhiều hơn mong muốn.', [
        ['There are too many cars in the city centre.', 'Có quá nhiều ô tô ở trung tâm thành phố.', 'too many'],
        ['I have too much homework this week.', 'Tuần này tôi có quá nhiều bài tập.', 'too much'],
      ]),
    card(65, 3, 'enough', 'enough',
      'enough + noun (enough chairs, enough money). Adjective + enough (old enough, tall enough).',
      'enough + danh từ (enough chairs, enough money). Tính từ + enough (old enough, tall enough).', [
        ["We don't have enough chairs.", 'Chúng ta không có đủ ghế.', 'enough chairs'],
        ["Minh isn't old enough to drive.", 'Minh chưa đủ tuổi lái xe.', 'old enough'],
      ], { en: 'Not "enough old" but "old enough".', vi: 'Không nói "enough old" mà nói "old enough".' }),
    card(65, 4, 'a few, a little', 'a few, a little',
      'a few + plural countable nouns; a little + uncountable nouns. Both mean "some, but not many / not much".',
      'a few + danh từ đếm được số nhiều; a little + danh từ không đếm được. Cả hai nghĩa là "một vài, một chút".', [
        ["I have a few good friends here, so I'm happy.", 'Tôi có vài người bạn tốt ở đây nên tôi vui.', 'a few'],
        ['Can I have a little milk in my tea?', 'Cho tôi một chút sữa vào trà nhé?', 'a little'],
      ]),
    card(65, 5, 'few, little', 'few, little',
      'Without a, few and little mean "almost none": the feeling is negative.',
      'Không có a, few và little nghĩa là "rất ít, gần như không có": mang nghĩa tiêu cực.', [
        ['Very few people came because of the storm.', 'Rất ít người đến vì trời bão.', 'Very few'],
        ['Hurry up! We have very little time.', 'Nhanh lên! Chúng ta còn rất ít thời gian.', 'very little'],
      ], { en: 'a few = some (good). few = not enough (bad).', vi: 'a few = có một vài (tích cực). few = không đủ (tiêu cực).' }),
    card(65, 6, 'any, no, none', 'any, no, none',
      "Negative verb + any: there isn't any. Positive verb + no: there is no. none stands alone without a noun.",
      "Động từ phủ định + any: there isn't any. Động từ khẳng định + no: there is no. none đứng một mình, không có danh từ theo sau.", [
        ["There isn't any bread left.", 'Không còn chút bánh mì nào.', 'any'],
        ['There is no milk in the fridge.', 'Trong tủ lạnh không có sữa.', 'no milk'],
        ['"How many pens have you got?" "None."', '"Bạn có bao nhiêu cái bút?" "Không cái nào."', 'None'],
      ], { en: "Never two negatives: not \"There isn't no milk\".", vi: "Không dùng hai từ phủ định: không nói \"There isn't no milk\"." }),
  ],
  66: [
    card(66, 1, 'Materials', 'Chất liệu',
      'cotton, wool, leather, silk, denim, gold.',
      'cotton (vải bông), wool (len), leather (da thuộc), silk (lụa), denim (vải bò), gold (vàng).', [
        ['This T-shirt is made of cotton.', 'Áo phông này làm bằng vải cotton.', 'cotton'],
        ['Her áo dài is made of silk.', 'Áo dài của cô ấy làm bằng lụa.', 'silk'],
      ], { en: 'Say "made of": a scarf made of wool, or use the material like an adjective: a wool scarf.', vi: 'Nói "made of": a scarf made of wool, hoặc dùng chất liệu như tính từ: a wool scarf.' }),
    card(66, 2, 'Patterns and styles', 'Họa tiết và phong cách',
      'checked, plain, flowery, baggy, smart, casual.',
      'checked (kẻ ca-rô), plain (trơn), flowery (họa tiết hoa), baggy (rộng thùng thình), smart (lịch sự), casual (thường ngày).', [
        ["He's wearing a checked shirt.", 'Anh ấy đang mặc áo sơ mi kẻ ca-rô.', 'checked'],
        ['At the weekend I wear casual clothes.', 'Cuối tuần tôi mặc đồ thường ngày.', 'casual'],
      ]),
    card(66, 3, 'Accessories', 'Phụ kiện',
      'necklace, earrings, bracelet, handbag, tie, cap.',
      'necklace (dây chuyền), earrings (bông tai), bracelet (vòng tay), handbag (túi xách), tie (cà vạt), cap (mũ lưỡi trai).', [
        ['Grandma gave me a silver necklace.', 'Bà tặng tôi một sợi dây chuyền bạc.', 'necklace'],
        ['Dad wears a tie to work.', 'Bố đeo cà vạt đi làm.', 'tie'],
      ]),
    card(66, 4, 'The fashion world', 'Thế giới thời trang',
      'outfit, brand, fashion show, model, dress up, match.',
      'outfit (bộ trang phục), brand (thương hiệu), fashion show (buổi trình diễn thời trang), model (người mẫu), dress up (ăn diện), match (hợp với).', [
        ['I love your outfit!', 'Mình thích bộ đồ của bạn quá!', 'outfit'],
        ['Your bag matches your shoes.', 'Túi của bạn hợp với giày đấy.', 'matches'],
      ]),
    card(66, 5, 'Describing clothes', 'Miêu tả quần áo',
      'Order: opinion – size – pattern – colour – material – noun: a lovely baggy checked blue cotton shirt. At A2, use two or three adjectives.',
      'Thứ tự: ý kiến – kích cỡ – họa tiết – màu sắc – chất liệu – danh từ. Ở trình độ A2, dùng hai hoặc ba tính từ.', [
        ['She bought a flowery silk scarf.', 'Cô ấy mua một chiếc khăn lụa họa tiết hoa.', 'flowery silk scarf'],
        ['I love my old denim jacket.', 'Tôi rất thích chiếc áo khoác bò cũ của mình.', 'old denim jacket'],
        ['He wore a plain white cotton shirt.', 'Anh ấy mặc một chiếc áo sơ mi cotton trắng trơn.', 'plain white cotton shirt'],
      ]),
    card(66, 6, 'Dressing for the occasion', 'Ăn mặc phù hợp hoàn cảnh',
      'dress up for Tết, a wedding or a party; wear smart clothes for an interview; wear casual clothes at the weekend.',
      'dress up (diện đồ đẹp) dịp Tết, đám cưới hay bữa tiệc; mặc đồ lịch sự khi phỏng vấn; mặc đồ thường ngày vào cuối tuần.', [
        ['We dress up for Tết.', 'Chúng tôi diện đồ đẹp vào dịp Tết.', 'dress up'],
        ['You look smart in that suit.', 'Trông bạn rất lịch sự trong bộ vest đó.', 'smart'],
      ]),
  ],
};
