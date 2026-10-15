import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(26);

export const learnCards: Record<number, LearnCard[]> = {
  76: [
    card(76, 1, 'so + adjective', 'so + tính từ',
      'Use so before an adjective or adverb, with no noun after it. Use so much / so many before a noun.',
      'Dùng so trước tính từ hoặc trạng từ, phía sau không có danh từ. Dùng so much / so many trước danh từ.', [
        ['Mai is so kind.', 'Mai thật tốt bụng.', 'so kind'],
        ['Minh runs so fast!', 'Minh chạy nhanh quá!', 'so fast'],
        ['There was so much traffic.', 'Đường đông xe quá.', 'so much traffic'],
      ]),
    card(76, 2, 'such + noun', 'such + danh từ',
      'Use such a / such an + (adjective) + singular noun, and such + (adjective) + plural or uncountable noun.',
      'Dùng such a / such an + (tính từ) + danh từ số ít, và such + (tính từ) + danh từ số nhiều hoặc không đếm được.', [
        ['It was such a hot day.', 'Hôm đó trời nóng quá.', 'such a hot day'],
        ['Ha Long Bay is such an amazing place.', 'Vịnh Hạ Long là một nơi thật tuyệt vời.', 'such an amazing place'],
        ['We had such awful weather in Sa Pa.', 'Thời tiết ở Sa Pa tệ quá.', 'such awful weather'],
      ], { en: 'so hot, but such a hot day. Never so a or such + adjective alone.', vi: 'so hot nhưng such a hot day. Không nói so a, cũng không dùng such + tính từ đứng một mình.' }),
    card(76, 3, 'so / such ... that', 'so / such ... that (quá ... đến nỗi)',
      'Add that + a result: so + adjective + that ..., such (a) + adjective + noun + that ...',
      'Thêm that + kết quả: so + tính từ + that ..., such (a) + tính từ + danh từ + that ...', [
        ['The film was so boring that I fell asleep.', 'Bộ phim chán đến nỗi tôi ngủ gật.', 'so boring that'],
        ['It was such a long journey that we slept on the bus.', 'Chuyến đi dài đến nỗi chúng tôi ngủ trên xe buýt.', 'such a long journey that'],
      ]),
    card(76, 4, 'So do I / Neither do I', 'So do I / Neither do I',
      'Agree with a positive sentence: So + auxiliary + subject. Agree with a negative sentence: Neither + auxiliary + subject.',
      'Đồng ý với câu khẳng định: So + trợ động từ + chủ ngữ (tôi cũng vậy). Đồng ý với câu phủ định: Neither + trợ động từ + chủ ngữ (tôi cũng không).', [
        ['Mai: I love bánh mì. Nam: So do I.', 'Mai: Mình thích bánh mì. Nam: Mình cũng vậy.', 'So do I'],
        ['Hoa: I didn\'t see the match. Tuan: Neither did I.', 'Hoa: Mình không xem trận đấu. Tuấn: Mình cũng không.', 'Neither did I'],
        ['Minh: I\'ve finished my homework. Lan: So have I.', 'Minh: Mình làm xong bài tập rồi. Lan: Mình cũng vậy.', 'So have I'],
      ], { en: 'Copy the auxiliary and tense: am → So am I; can → So can I; did → So did I.', vi: 'Giữ nguyên trợ động từ và thì: am → So am I; can → So can I; did → So did I.' }),
    card(76, 5, 'too and either', 'too và either',
      'Positive: subject + auxiliary + too. Negative: subject + negative auxiliary + either.',
      'Khẳng định: chủ ngữ + trợ động từ + too (cũng vậy). Phủ định: chủ ngữ + trợ động từ phủ định + either (cũng không).', [
        ['Nam: I\'m hungry. Mai: I am too.', 'Nam: Mình đói. Mai: Mình cũng vậy.', 'I am too'],
        ['Linh: I don\'t like horror films. Duc: I don\'t either.', 'Linh: Mình không thích phim kinh dị. Đức: Mình cũng không.', 'I don\'t either'],
        ['My brother can\'t swim, and my cousins can\'t either.', 'Anh tôi không biết bơi, các anh chị họ tôi cũng không.', 'can\'t either'],
      ]),
    card(76, 6, 'either ... or / neither ... nor', 'either ... or / neither ... nor',
      'either A or B = A or B (one of them). neither A nor B = not A and not B.',
      'either A or B = hoặc A hoặc B. neither A nor B = không A cũng không B.', [
        ['You can have either the chicken or the fish.', 'Bạn có thể chọn hoặc gà hoặc cá.', 'either the chicken or'],
        ['Neither Lan nor Mai came to the party.', 'Cả Lan và Mai đều không đến bữa tiệc.', 'Neither Lan nor Mai'],
        ['Neither of my parents can swim.', 'Cả bố và mẹ tôi đều không biết bơi.', 'Neither of'],
      ]),
  ],
  77: [
    card(77, 1, 'Question tags', 'Câu hỏi đuôi',
      'A question tag is a short question at the end of a sentence. Positive sentence → negative tag; negative sentence → positive tag.',
      'Câu hỏi đuôi là câu hỏi ngắn ở cuối câu. Câu khẳng định → đuôi phủ định; câu phủ định → đuôi khẳng định.', [
        ['Lan is from Hue, isn\'t she?', 'Lan quê ở Huế, phải không?', 'isn\'t she'],
        ['Mai wasn\'t at school yesterday, was she?', 'Hôm qua Mai không đi học, đúng không?', 'was she'],
      ], { en: 'Use a pronoun in the tag: Lan → she, your parents → they.', vi: 'Dùng đại từ trong câu hỏi đuôi: Lan → she, your parents → they.' }),
    card(77, 2, 'do, does and did', 'do, does và did',
      'If the sentence has no auxiliary, use do / does (present simple) or did (past simple) in the tag.',
      'Nếu câu chính không có trợ động từ, dùng do / does (hiện tại đơn) hoặc did (quá khứ đơn) trong câu hỏi đuôi.', [
        ['Your brother plays the guitar, doesn\'t he?', 'Anh bạn chơi đàn ghi-ta, phải không?', 'doesn\'t he'],
        ['You bought a new bike, didn\'t you?', 'Bạn mua xe đạp mới rồi, phải không?', 'didn\'t you'],
        ['You didn\'t call me, did you?', 'Bạn không gọi cho mình, đúng không?', 'did you'],
      ]),
    card(77, 3, 'be, have and modals', 'be, have và động từ khuyết thiếu',
      'Repeat the auxiliary from the sentence: is / are / was, have / has, can / will / should.',
      'Lặp lại trợ động từ của câu chính: is / are / was, have / has, can / will / should.', [
        ['You\'re coming to my party, aren\'t you?', 'Bạn sẽ đến tiệc của mình, phải không?', 'aren\'t you'],
        ['Minh has been to Sa Pa, hasn\'t he?', 'Minh đã đến Sa Pa rồi, phải không?', 'hasn\'t he'],
        ['They will come tomorrow, won\'t they?', 'Mai họ sẽ đến, phải không?', 'won\'t they'],
      ]),
    card(77, 4, 'Special tags', 'Câu hỏi đuôi đặc biệt',
      'I am → aren\'t I. Let\'s → shall we. Imperatives → will you.',
      'I am → aren\'t I. Let\'s → shall we. Câu mệnh lệnh → will you.', [
        ['I\'m late again, aren\'t I?', 'Mình lại muộn rồi, phải không?', 'aren\'t I'],
        ['Let\'s have phở for breakfast, shall we?', 'Sáng nay ăn phở nhé?', 'shall we'],
        ['Don\'t forget your helmet, will you?', 'Đừng quên mũ bảo hiểm nhé?', 'will you'],
      ]),
    card(77, 5, 'there, this and that', 'there, this và that',
      'There is / are → isn\'t there / aren\'t there. This / that → it. These / those → they.',
      'There is / are → isn\'t there / aren\'t there. This / that → it. These / those → they.', [
        ['There are 40 students in your class, aren\'t there?', 'Lớp bạn có 40 học sinh, phải không?', 'aren\'t there'],
        ['That was a great film, wasn\'t it?', 'Bộ phim đó hay thật, phải không?', 'wasn\'t it'],
        ['Those are Nam\'s shoes, aren\'t they?', 'Đó là giày của Nam, phải không?', 'aren\'t they'],
      ]),
    card(77, 6, 'never, nobody, nothing', 'never, nobody, nothing',
      'These words make a sentence negative, so the tag is positive. Nobody / everyone → they; nothing / everything → it.',
      'Những từ này làm câu mang nghĩa phủ định, nên câu hỏi đuôi ở dạng khẳng định. Nobody / everyone → they; nothing / everything → it.', [
        ['Nam never does his homework on time, does he?', 'Nam chẳng bao giờ làm bài tập đúng hạn, phải không?', 'does he'],
        ['Nobody knows the answer, do they?', 'Không ai biết câu trả lời, đúng không?', 'do they'],
        ['Nothing is wrong, is it?', 'Không có gì sai, đúng không?', 'is it'],
      ]),
  ],
  78: [
    card(78, 1, 'Devices', 'Thiết bị',
      'tablet, smartwatch, speaker, remote control, webcam, games console.',
      'tablet (máy tính bảng), smartwatch (đồng hồ thông minh), speaker (loa), remote control (điều khiển từ xa), webcam (camera máy tính), games console (máy chơi game).', [
        ['My little brother reads e-books on his tablet.', 'Em trai tôi đọc sách điện tử trên máy tính bảng.', 'tablet'],
        ['Where is the remote control?', 'Cái điều khiển đâu rồi?', 'remote control'],
        ['Turn on your webcam so the teacher can see you.', 'Bật webcam lên để cô giáo nhìn thấy em.', 'webcam'],
      ]),
    card(78, 2, 'Using devices', 'Sử dụng thiết bị',
      'plug in, switch on, switch off, charge, install, update.',
      'plug in (cắm điện), switch on (bật), switch off (tắt), charge (sạc), install (cài đặt), update (cập nhật).', [
        ['Can you switch on the light, please?', 'Bạn bật đèn giúp mình nhé?', 'switch on'],
        ['I charge my phone every night.', 'Tối nào tôi cũng sạc điện thoại.', 'charge'],
        ['I installed a dictionary app on my phone.', 'Tôi đã cài một ứng dụng từ điển trên điện thoại.', 'installed'],
      ], { en: 'switch on / turn on and switch off / turn off mean the same.', vi: 'switch on / turn on (bật) và switch off / turn off (tắt) có nghĩa giống nhau.' }),
    card(78, 3, 'The internet', 'Internet',
      'username, link, upload, click, social media, screenshot.',
      'username (tên người dùng), link (đường liên kết), upload (tải lên), click (nhấp chuột), social media (mạng xã hội), screenshot (ảnh chụp màn hình).', [
        ['The teacher sent us a link to the video.', 'Cô giáo gửi cho chúng tôi đường link tới video.', 'link'],
        ['I uploaded my project to the class website.', 'Tôi đã tải bài dự án lên trang web của lớp.', 'uploaded'],
        ['I took a screenshot of my high score.', 'Tôi chụp màn hình điểm cao nhất của mình.', 'screenshot'],
      ], { en: 'upload = from your device to the internet; download = from the internet to your device.', vi: 'upload = từ máy lên mạng; download = từ mạng về máy.' }),
    card(78, 4, 'Problems and fixing', 'Sự cố và sửa chữa',
      'signal, crash, repair, cable, cracked, volume.',
      'signal (sóng), crash (bị sập), repair (sửa chữa), cable (dây cáp), cracked (bị nứt), volume (âm lượng).', [
        ['There is no signal in the mountains.', 'Trên núi không có sóng điện thoại.', 'signal'],
        ['My computer crashed and I lost my essay.', 'Máy tính của tôi bị sập và tôi mất bài luận.', 'crashed'],
        ['I dropped my phone and now the screen is cracked.', 'Tôi làm rơi điện thoại và giờ màn hình bị nứt.', 'cracked'],
      ]),
    card(78, 5, 'Turn it up, turn it down', 'Vặn to, vặn nhỏ',
      'turn the volume up = make it louder; turn the volume down = make it quieter.',
      'turn the volume up = vặn to âm lượng; turn the volume down = vặn nhỏ âm lượng.', [
        ['Please turn the volume down. The baby is sleeping.', 'Làm ơn vặn nhỏ âm lượng. Em bé đang ngủ.', 'turn the volume down'],
        ['I can\'t hear the video. Can you turn it up?', 'Mình không nghe rõ video. Bạn vặn to lên được không?', 'turn it up'],
      ]),
    card(78, 6, 'Using technology well', 'Dùng công nghệ đúng cách',
      'Update your apps, save your work and don\'t share your username and password on social media.',
      'Cập nhật ứng dụng, lưu bài làm và đừng chia sẻ tên người dùng và mật khẩu trên mạng xã hội.', [
        ['Update the app to get the new features.', 'Hãy cập nhật ứng dụng để có các tính năng mới.', 'Update'],
        ['Switch off your phones before the exam.', 'Tắt điện thoại trước khi thi.', 'Switch off'],
        ['My sister spends too much time on social media.', 'Chị tôi dành quá nhiều thời gian trên mạng xã hội.', 'social media'],
      ]),
  ],
};
