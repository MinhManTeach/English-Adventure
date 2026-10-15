import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(21);

export const learnCards: Record<number, LearnCard[]> = {
  61: [
    card(61, 1, 'What is the passive?', 'Câu bị động là gì?',
      'Use the passive when the action or the thing is more important than who does it: subject + be + past participle.',
      'Dùng bị động khi hành động hoặc sự vật quan trọng hơn người làm: chủ ngữ + be + quá khứ phân từ (V3).', [
        ['English is spoken in many countries.', 'Tiếng Anh được nói ở nhiều quốc gia.', 'is spoken'],
        ['The Temple of Literature was built in 1070.', 'Văn Miếu được xây dựng năm 1070.', 'was built'],
      ]),
    card(61, 2, 'Present simple passive', 'Bị động hiện tại đơn',
      'am / is / are + past participle, for facts and things that happen regularly.',
      'am / is / are + V3, dùng cho sự thật và việc diễn ra thường xuyên.', [
        ['Rice is grown in the Mekong Delta.', 'Lúa được trồng ở đồng bằng sông Cửu Long.', 'is grown'],
        ['These bags are made from old bottles.', 'Những chiếc túi này được làm từ chai cũ.', 'are made'],
        ['The classroom is swept every afternoon.', 'Lớp học được quét mỗi buổi chiều.', 'is swept'],
      ], { en: 'One thing: is. More than one thing: are.', vi: 'Một vật: is. Nhiều vật: are.' }),
    card(61, 3, 'Past simple passive', 'Bị động quá khứ đơn',
      'was / were + past participle, for finished actions in the past.',
      'was / were + V3, dùng cho hành động đã kết thúc trong quá khứ.', [
        ['My bike was stolen last night.', 'Xe đạp của tôi bị lấy trộm tối qua.', 'was stolen'],
        ['The letters were sent yesterday.', 'Những lá thư đã được gửi hôm qua.', 'were sent'],
      ]),
    card(61, 4, 'Irregular past participles', 'Quá khứ phân từ bất quy tắc',
      'Learn the third form: write – written, eat – eaten, give – given, take – taken, build – built, steal – stolen, sing – sung.',
      'Học thuộc dạng thứ ba: write – written, eat – eaten, give – given, take – taken, build – built, steal – stolen, sing – sung.', [
        ['Phở is eaten all over the world.', 'Phở được ăn ở khắp thế giới.', 'eaten'],
        ['The prizes were given to the winners.', 'Giải thưởng được trao cho những người thắng cuộc.', 'given'],
        ['This song is sung at every school party.', 'Bài hát này được hát ở mọi bữa tiệc của trường.', 'sung'],
      ], { en: 'Not "was wrote" or "is eat": always use the past participle.', vi: 'Không nói "was wrote" hay "is eat": luôn dùng quá khứ phân từ.' }),
    card(61, 5, 'Negatives and questions', 'Phủ định và câu hỏi',
      "Negative: isn't / aren't / wasn't / weren't + past participle. Question: Is / Are / Was / Were + subject + past participle?",
      "Phủ định: isn't / aren't / wasn't / weren't + V3. Câu hỏi: Is / Are / Was / Were + chủ ngữ + V3?", [
        ["Pets aren't allowed in this hotel.", 'Không được mang thú cưng vào khách sạn này.', "aren't allowed"],
        ['When was the Eiffel Tower built?', 'Tháp Eiffel được xây khi nào?', 'was the Eiffel Tower built'],
      ], { en: "Never use do, does or did in a passive sentence.", vi: 'Không bao giờ dùng do, does hay did trong câu bị động.' }),
    card(61, 6, 'by + agent', 'by + tác nhân',
      'Add by + person or thing when it is important to say who or what did the action.',
      'Thêm by + người hoặc vật khi cần nói rõ ai hoặc cái gì thực hiện hành động.', [
        ['The Tale of Kieu was written by Nguyen Du.', 'Truyện Kiều được viết bởi Nguyễn Du.', 'by Nguyen Du'],
        ['Our homework is checked by Ms Lan.', 'Bài tập của chúng tôi được cô Lan kiểm tra.', 'by Ms Lan'],
      ], { en: 'Leave out by when the doer is not important: "My bike was stolen."', vi: 'Bỏ by khi người làm không quan trọng: "My bike was stolen."' }),
    card(61, 7, 'Active or passive?', 'Chủ động hay bị động?',
      'Active: the doer is the subject. Passive: the thing that receives the action is the subject.',
      'Chủ động: người làm là chủ ngữ. Bị động: vật chịu tác động là chủ ngữ.', [
        ['Nguyen Du wrote The Tale of Kieu.', 'Nguyễn Du đã viết Truyện Kiều.', 'wrote'],
        ['The Tale of Kieu was written by Nguyen Du.', 'Truyện Kiều được viết bởi Nguyễn Du.', 'was written'],
      ]),
  ],
  62: [
    card(62, 1, 'a / an with jobs', 'a / an với nghề nghiệp',
      'In English, a singular job always needs a or an.',
      'Trong tiếng Anh, danh từ chỉ nghề nghiệp số ít luôn cần a hoặc an.', [
        ['My aunt is a nurse.', 'Dì tôi là y tá.', 'a nurse'],
        ["Lan's mother is an architect.", 'Mẹ Lan là kiến trúc sư.', 'an architect'],
      ], { en: 'Not "She is nurse". Vietnamese has no article here, but English does.', vi: 'Không nói "She is nurse". Tiếng Việt không có mạo từ ở đây nhưng tiếng Anh thì có.' }),
    card(62, 2, 'a / an for rates and What a …!', 'a / an chỉ tần suất và What a …!',
      'twice a week, three times a day, 60 kilometres an hour; What a + adjective + noun!',
      'twice a week (hai lần một tuần), three times a day (ba lần một ngày), 60 kilometres an hour; What a + tính từ + danh từ!', [
        ['We have PE twice a week.', 'Chúng tôi học thể dục hai lần một tuần.', 'a week'],
        ['What a beautiful day!', 'Một ngày thật đẹp!', 'What a'],
      ]),
    card(62, 3, 'Things in general: no article', 'Nói chung chung: không mạo từ',
      'Use no article with plural or uncountable nouns when you mean all of them in general.',
      'Không dùng mạo từ với danh từ số nhiều hoặc không đếm được khi nói về chúng một cách chung chung.', [
        ['Dolphins are clever animals.', 'Cá heo là loài vật thông minh.', 'Dolphins'],
        ['Milk is good for your bones.', 'Sữa tốt cho xương.', 'Milk'],
      ], { en: 'Not "The money isn\'t everything" but "Money isn\'t everything".', vi: 'Không nói "The money isn\'t everything" mà nói "Money isn\'t everything".' }),
    card(62, 4, 'Specific things: the', 'Vật cụ thể: the',
      'Use the when we both know which one, and before superlatives.',
      'Dùng the khi cả hai đều biết là cái nào, và trước so sánh nhất.', [
        ['The soup that you made was delicious.', 'Món canh bạn nấu ngon lắm.', 'The soup'],
        ['Where is the book I lent you?', 'Quyển sách mình cho bạn mượn đâu rồi?', 'the book'],
        ['Lan is the best student in our class.', 'Lan là học sinh giỏi nhất lớp tôi.', 'the best'],
      ]),
    card(62, 5, 'Place names with the', 'Tên địa danh có the',
      'the + rivers, seas, oceans, mountain ranges and countries like the USA, the UK, the Philippines.',
      'the + sông, biển, đại dương, dãy núi và các nước như the USA, the UK, the Philippines.', [
        ['The Mekong flows through six countries.', 'Sông Mê Kông chảy qua sáu quốc gia.', 'The Mekong'],
        ['My uncle lives in the USA.', 'Chú tôi sống ở Mỹ.', 'the USA'],
        ['The Himalayas are the highest mountains in the world.', 'Dãy Himalaya là dãy núi cao nhất thế giới.', 'The Himalayas'],
      ]),
    card(62, 6, 'Place names without the', 'Tên địa danh không có the',
      'No article with cities, most countries, continents, lakes and single mountains.',
      'Không dùng mạo từ với thành phố, đa số quốc gia, châu lục, hồ và ngọn núi đơn lẻ.', [
        ['We visited Hoan Kiem Lake in Hanoi.', 'Chúng tôi đã thăm hồ Hoàn Kiếm ở Hà Nội.', 'Hoan Kiem Lake'],
        ['Many people climb Mount Fansipan.', 'Nhiều người leo núi Phan Xi Păng.', 'Mount Fansipan'],
        ['Lan wants to study in Japan.', 'Lan muốn đi du học Nhật Bản.', 'Japan'],
      ]),
    card(62, 7, 'Fixed phrases', 'Cụm từ cố định',
      'No article: go to bed / school / work, at home, at night, by bus / train, have breakfast / lunch. With the: in the morning, listen to the radio, play the piano.',
      'Không mạo từ: go to bed / school / work, at home, at night, by bus / train, have breakfast / lunch. Có the: in the morning, listen to the radio, play the piano.', [
        ['I go to bed at ten.', 'Tôi đi ngủ lúc mười giờ.', 'go to bed'],
        ['Dad goes to work by motorbike.', 'Bố đi làm bằng xe máy.', 'by motorbike'],
        ['Grandpa listens to the radio in the morning.', 'Ông nghe đài vào buổi sáng.', 'the radio'],
      ]),
  ],
  63: [
    card(63, 1, 'Festivals', 'Lễ hội',
      'festival, parade, fireworks, lantern, mooncake, costume.',
      'festival (lễ hội), parade (diễu hành), fireworks (pháo hoa), lantern (đèn lồng), mooncake (bánh trung thu), costume (trang phục hóa trang).', [
        ['The children carried star-shaped lanterns.', 'Bọn trẻ cầm đèn ông sao.', 'lanterns'],
        ['At midnight, the sky was full of fireworks.', 'Lúc nửa đêm, bầu trời rực rỡ pháo hoa.', 'fireworks'],
      ]),
    card(63, 2, 'Celebrating', 'Ăn mừng',
      'celebrate, decorate, lucky money, ceremony, feast, wish.',
      'celebrate (ăn mừng), decorate (trang trí), lucky money (tiền lì xì), ceremony (buổi lễ), feast (bữa tiệc lớn), wish (chúc).', [
        ['We decorated the classroom with flowers.', 'Chúng tôi trang trí lớp bằng hoa.', 'decorated'],
        ['I got lucky money from my grandparents.', 'Tôi được ông bà lì xì.', 'lucky money'],
      ]),
    card(63, 3, 'Family customs', 'Phong tục gia đình',
      'tradition, ancestor, generation, altar, wedding, anniversary.',
      'tradition (truyền thống), ancestor (tổ tiên), generation (thế hệ), altar (bàn thờ), wedding (đám cưới), anniversary (ngày kỷ niệm).', [
        ['Making bánh chưng is a Tết tradition.', 'Gói bánh chưng là truyền thống ngày Tết.', 'tradition'],
        ['Three generations live in our house.', 'Ba thế hệ sống trong nhà tôi.', 'generations'],
      ]),
    card(63, 4, 'Good manners', 'Phép lịch sự',
      'bow, shake hands, greet, chopsticks, guest, host.',
      'bow (cúi chào), shake hands (bắt tay), greet (chào hỏi), chopsticks (đũa), guest (khách), host (chủ nhà).', [
        ['Always greet your teachers politely.', 'Luôn chào thầy cô lễ phép.', 'greet'],
        ['The host offered us tea and cakes.', 'Chủ nhà mời chúng tôi trà và bánh.', 'host'],
      ], { en: 'guest = the visitor; host = the person who invites.', vi: 'guest = người đến thăm; host = người mời.' }),
    card(63, 5, 'Tết customs', 'Phong tục ngày Tết',
      'At Tết we decorate the house, put fruit on the altar, wish our grandparents good health and get lucky money.',
      'Dịp Tết chúng ta trang trí nhà cửa, bày hoa quả lên bàn thờ, chúc ông bà mạnh khỏe và nhận tiền lì xì.', [
        ['Mum puts five kinds of fruit on the altar.', 'Mẹ bày mâm ngũ quả lên bàn thờ.', 'altar'],
        ['We remember our ancestors at Tết.', 'Chúng tôi tưởng nhớ tổ tiên vào dịp Tết.', 'ancestors'],
        ['We wish you a happy new year!', 'Chúc bạn năm mới vui vẻ!', 'wish'],
      ]),
    card(63, 6, 'Word partners', 'Cụm từ hay đi cùng nhau',
      'celebrate a birthday, watch a parade, light a lantern, hold a ceremony, shake hands with someone, wish someone luck.',
      'celebrate a birthday (tổ chức sinh nhật), watch a parade (xem diễu hành), light a lantern (thắp đèn lồng), hold a ceremony (tổ chức buổi lễ), shake hands with someone (bắt tay ai), wish someone luck (chúc ai may mắn).', [
        ['How do you celebrate your birthday?', 'Bạn tổ chức sinh nhật thế nào?', 'celebrate'],
        ['The two players shook hands after the match.', 'Hai cầu thủ bắt tay nhau sau trận đấu.', 'shook hands'],
        ['We watched the parade from the balcony.', 'Chúng tôi xem diễu hành từ ban công.', 'watched the parade'],
      ]),
  ],
};
