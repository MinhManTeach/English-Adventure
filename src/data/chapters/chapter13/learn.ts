import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(13);

export const learnCards: Record<number, LearnCard[]> = {
  37: [
    card(37, 1, 'Short adjectives: -er', 'Tính từ ngắn: -er',
      'Add -er + than. nice → nicer. big → bigger. easy → easier.',
      'Thêm -er + than. Tận cùng e chỉ thêm r: nice → nicer. Gấp đôi phụ âm: big → bigger. y → ier: easy → easier.', [
        ['A giraffe is taller than a zebra.', 'Hươu cao cổ cao hơn ngựa vằn.', 'taller than'],
        ['A horse is bigger than a dog.', 'Ngựa to hơn chó.', 'bigger'],
        ['This test is easier than the last one.', 'Bài kiểm tra này dễ hơn bài trước.', 'easier'],
      ]),
    card(37, 2, 'Long adjectives: more', 'Tính từ dài: more',
      'Adjectives with two or more syllables (not ending in -y) use more + adjective + than.',
      'Tính từ có từ hai âm tiết trở lên (không tận cùng -y) dùng more + tính từ + than.', [
        ['A car is more expensive than a bike.', 'Ô tô đắt hơn xe đạp.', 'more expensive'],
        ['Football is more popular than golf.', 'Bóng đá phổ biến hơn gôn.', 'more popular'],
      ], { en: 'Never use more and -er together: more taller is wrong.', vi: 'Không dùng more và -er cùng lúc: more taller là sai.' }),
    card(37, 3, 'good, bad, far', 'good, bad, far',
      'good → better, bad → worse, far → further.',
      'good → better (tốt hơn), bad → worse (tệ hơn), far → further (xa hơn).', [
        ['Your drawing is better than mine.', 'Tranh của bạn đẹp hơn của tôi.', 'better'],
        ['My cold is worse today.', 'Hôm nay tôi bị cảm nặng hơn.', 'worse'],
      ]),
    card(37, 4, 'as … as', 'as … as',
      'as + adjective + as = the same. Use the normal adjective, not -er.',
      'as + tính từ + as = bằng nhau. Dùng tính từ nguyên dạng, không thêm -er.', [
        ['My cousin is as old as me.', 'Em họ tôi bằng tuổi tôi.', 'as old as'],
        ['Lan is as tall as her mum.', 'Lan cao bằng mẹ.', 'as tall as'],
      ]),
    card(37, 5, 'not as … as', 'not as … as',
      'not as … as = less than.',
      'not as … as = không bằng.', [
        ["Science isn't as easy as Art.", 'Môn Khoa học không dễ bằng môn Mĩ thuật.', "isn't as easy as"],
        ["My brother isn't as strong as my dad.", 'Anh tôi không khỏe bằng bố tôi.', "isn't as strong as"],
      ]),
    card(37, 6, 'than, not that or then', 'than, không phải that hay then',
      'After a comparative, always use than.',
      'Sau so sánh hơn luôn dùng than (không phải that hay then).', [
        ['A cat is smaller than a dog.', 'Mèo nhỏ hơn chó.', 'than'],
        ['Mai is taller than her sister.', 'Mai cao hơn chị gái.', 'than'],
      ]),
  ],
  38: [
    card(38, 1, 'Short adjectives: the -est', 'Tính từ ngắn: the -est',
      'the + adjective + -est: the tallest, the biggest, the happiest.',
      'the + tính từ + -est: the tallest (cao nhất), the biggest (to nhất), the happiest (vui nhất).', [
        ['The blue whale is the biggest animal in the world.', 'Cá voi xanh là loài vật lớn nhất thế giới.', 'the biggest'],
        ['Fansipan is the highest mountain in Vietnam.', 'Fansipan là ngọn núi cao nhất Việt Nam.', 'the highest'],
      ]),
    card(38, 2, 'Long adjectives: the most', 'Tính từ dài: the most',
      'the most + long adjective.',
      'the most + tính từ dài.', [
        ['Ha Long Bay is the most beautiful place in Vietnam.', 'Vịnh Hạ Long là nơi đẹp nhất Việt Nam.', 'the most beautiful'],
        ['Football is the most popular sport here.', 'Bóng đá là môn thể thao phổ biến nhất ở đây.', 'the most popular'],
      ]),
    card(38, 3, 'the best and the worst', 'the best và the worst',
      'good → better → the best. bad → worse → the worst. far → further → the furthest.',
      'good → better → the best. bad → worse → the worst. far → further → the furthest.', [
        ['Lan is the best student in our class.', 'Lan là học sinh giỏi nhất lớp.', 'the best'],
        ['It was the worst day of my life.', 'Đó là ngày tồi tệ nhất đời tôi.', 'the worst'],
      ]),
    card(38, 4, "Don't forget the", 'Đừng quên the',
      'A superlative needs the before it.',
      'So sánh nhất phải có the đứng trước.', [
        ['Mount Everest is the highest mountain in the world.', 'Everest là ngọn núi cao nhất thế giới.', 'the highest'],
        ['Minh is the fastest runner in the school.', 'Minh là người chạy nhanh nhất trường.', 'the fastest'],
      ]),
    card(38, 5, 'in + place or group', 'in + nơi chốn / nhóm',
      'After a superlative, use in for places and groups: in the world, in our class.',
      'Sau so sánh nhất, dùng in với nơi chốn và nhóm: in the world, in our class.', [
        ['Who is the tallest boy in your class?', 'Ai là bạn nam cao nhất lớp bạn?', 'in your class'],
        ['She is the best student in our school.', 'Bạn ấy là học sinh giỏi nhất trường tôi.', 'in our school'],
      ]),
    card(38, 6, 'the … I have ever …', 'the … I have ever …',
      'the + superlative + I have ever + past participle.',
      'the + so sánh nhất + I have ever + quá khứ phân từ: … nhất mà tôi từng ….', [
        ['This is the biggest pizza I have ever seen.', 'Đây là chiếc pizza to nhất tôi từng thấy.', 'I have ever seen'],
        ['It\'s the most interesting book I have ever read.', 'Đó là cuốn sách thú vị nhất tôi từng đọc.', 'I have ever read'],
      ]),
  ],
  39: [
    card(39, 1, 'Famous people', 'Người nổi tiếng',
      'inventor, scientist, explorer, astronaut, author, champion.',
      'inventor (nhà phát minh), scientist (nhà khoa học), explorer (nhà thám hiểm), astronaut (phi hành gia), author (tác giả), champion (nhà vô địch).', [
        ['Pham Tuan was the first Vietnamese astronaut.', 'Phạm Tuân là phi hành gia đầu tiên của Việt Nam.', 'astronaut'],
        ['Thomas Edison was a famous inventor.', 'Thomas Edison là nhà phát minh nổi tiếng.', 'inventor'],
      ]),
    card(39, 2, 'Famous places', 'Địa danh nổi tiếng',
      'palace, temple, tower, statue, monument, pagoda.',
      'palace (cung điện), temple (đền), tower (tháp), statue (tượng), monument (đài tưởng niệm), pagoda (chùa).', [
        ['The One Pillar Pagoda is in Hanoi.', 'Chùa Một Cột ở Hà Nội.', 'Pagoda'],
        ['The Eiffel Tower is in Paris.', 'Tháp Eiffel ở Paris.', 'Tower'],
      ]),
    card(39, 3, 'Being famous', 'Nổi tiếng',
      'celebrity, fan, autograph, award, legend, record.',
      'celebrity (người nổi tiếng), fan (người hâm mộ), autograph (chữ ký), award (giải thưởng), legend (huyền thoại), record (kỷ lục).', [
        ["I got the footballer's autograph!", 'Tôi xin được chữ ký của cầu thủ!', 'autograph'],
        ['She broke the world record.', 'Cô ấy phá kỷ lục thế giới.', 'record'],
      ]),
    card(39, 4, 'Describing places', 'Miêu tả địa danh',
      'ancient, historic, peaceful, enormous, tiny, amazing.',
      'ancient (cổ xưa), historic (lịch sử), peaceful (yên bình), enormous (khổng lồ), tiny (nhỏ xíu), amazing (tuyệt vời).', [
        ['Hoi An is an ancient town.', 'Hội An là một phố cổ.', 'ancient'],
        ['Son Doong Cave is enormous.', 'Hang Sơn Đoòng khổng lồ.', 'enormous'],
      ]),
    card(39, 5, 'Strong adjectives', 'Tính từ mạnh',
      'enormous = very big. tiny = very small. amazing = very good and surprising. Don\'t use very with them.',
      'enormous = rất to. tiny = rất nhỏ. amazing = rất tuyệt. Không dùng very trước các từ này.', [
        ['The view is amazing!', 'Cảnh thật tuyệt vời!', 'amazing'],
        ['They live in a tiny house.', 'Họ sống trong một ngôi nhà nhỏ xíu.', 'tiny'],
      ], { en: 'Say really enormous, not very enormous.', vi: 'Nói really enormous, không nói very enormous.' }),
    card(39, 6, 'Talking about famous people', 'Nói về người nổi tiếng',
      'Use the past simple for people from history and the present perfect for things they have done until now.',
      'Dùng quá khứ đơn cho nhân vật lịch sử, hiện tại hoàn thành cho những gì họ đã làm đến nay.', [
        ['Marie Curie was a great scientist.', 'Marie Curie là nhà khoa học vĩ đại.', 'was'],
        ['This author has written over a hundred books.', 'Tác giả này đã viết hơn một trăm cuốn sách.', 'has written'],
      ]),
  ],
};
