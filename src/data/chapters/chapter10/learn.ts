import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(10);

export const learnCards: Record<number, LearnCard[]> = {
  28: [
    card(28, 1, 'a or an?', 'a hay an?',
      'Listen to the first sound: a + consonant sound, an + vowel sound.',
      'Nghe âm đầu tiên: a + phụ âm, an + nguyên âm (theo cách đọc, không theo chữ cái).', [
        ['I saw an elephant at the zoo.', 'Tôi thấy một con voi ở sở thú.', 'an elephant'],
        ['We waited for an hour.', 'Chúng tôi đợi một tiếng.', 'an hour'],
        ['Nam is wearing a uniform.', 'Nam đang mặc đồng phục.', 'a uniform'],
      ], { en: 'hour starts with a vowel sound; uniform and university start with a "y" sound.', vi: 'hour bắt đầu bằng nguyên âm (h câm); uniform, university bắt đầu bằng âm "y" nên dùng a.' }),
    card(28, 2, 'a / an first, then the', 'Lần đầu a / an, lần sau the',
      'Use a / an the first time. Use the when we already know which one.',
      'Lần đầu nhắc đến dùng a / an. Khi đã biết là cái nào thì dùng the.', [
        ['I have a cat and a dog. The cat is black.', 'Tôi có một con mèo và một con chó. Con mèo màu đen.', 'The cat'],
        ['We watched a film. The film was funny.', 'Chúng tôi xem một bộ phim. Bộ phim rất hài.', 'The film'],
      ]),
    card(28, 3, 'Only one: the', 'Chỉ có một: the',
      'Use the for things there is only one of: the sun, the moon, the sky, the world, the internet.',
      'Dùng the cho vật duy nhất: the sun, the moon, the sky, the world, the internet.', [
        ['The sun is very hot today.', 'Hôm nay mặt trời rất nóng.', 'The sun'],
        ['Hanoi is the capital of Vietnam.', 'Hà Nội là thủ đô của Việt Nam.', 'the capital'],
        ['I found it on the internet.', 'Tôi tìm thấy nó trên mạng.', 'the internet'],
      ]),
    card(28, 4, 'the with instruments', 'the với nhạc cụ',
      'play the piano, play the guitar, play the drums.',
      'Chơi nhạc cụ dùng the: play the piano, play the guitar, play the drums.', [
        ['Hoa plays the piano very well.', 'Hoa chơi piano rất giỏi.', 'the piano'],
        ['My cousin plays the guitar in a band.', 'Anh họ tôi chơi guitar trong một ban nhạc.', 'the guitar'],
      ]),
    card(28, 5, 'No article', 'Không dùng mạo từ',
      'No article with sports, school subjects, languages, meals and by + transport.',
      'Không dùng mạo từ với môn thể thao, môn học, ngôn ngữ, bữa ăn và by + phương tiện.', [
        ['Nam plays football every Sunday.', 'Nam chơi bóng đá mỗi Chủ nhật.', 'plays football'],
        ['We have Maths on Monday.', 'Chúng tôi học Toán vào thứ Hai.', 'Maths'],
        ['She goes to school by bus.', 'Cô ấy đi học bằng xe buýt.', 'by bus'],
      ], { en: 'play football (no the) but play the piano (the).', vi: 'play football (không có the) nhưng play the piano (có the).' }),
    card(28, 6, 'Things in general', 'Nói chung chung',
      'When we talk about things in general, we use the plural with no article.',
      'Khi nói chung chung về một loại vật, dùng số nhiều và không có mạo từ.', [
        ['I love cats.', 'Tôi yêu mèo.', 'cats'],
        ['Snakes are scary.', 'Rắn thật đáng sợ.', 'Snakes'],
      ]),
  ],
  29: [
    card(29, 1, 'Tricky number words', 'Số đếm dễ viết sai',
      'thirteen / thirty, fourteen / forty, fifteen / fifty. forty has no u!',
      'thirteen (13) / thirty (30), fourteen (14) / forty (40), fifteen (15) / fifty (50). forty không có chữ u!', [
        ['There are forty students in my class.', 'Lớp tôi có bốn mươi học sinh.', 'forty'],
        ['My brother is fourteen.', 'Anh tôi mười bốn tuổi.', 'fourteen'],
      ]),
    card(29, 2, 'Big numbers', 'Số lớn',
      'After a number: hundred, thousand, million, no -s. One hundred and five (British English).',
      'Sau một con số: hundred, thousand, million không thêm -s. Một trăm lẻ năm: one hundred and five.', [
        ['Five hundred people live in the village.', 'Năm trăm người sống trong làng.', 'hundred'],
        ['This bike costs three million dong.', 'Chiếc xe này giá ba triệu đồng.', 'million'],
        ['one hundred and five', 'một trăm lẻ năm', 'and'],
      ], { en: 'Without a number: hundreds of / thousands of people.', vi: 'Không có số đứng trước: hundreds of / thousands of people (hàng trăm / hàng nghìn người).' }),
    card(29, 3, 'Ordinal numbers', 'Số thứ tự',
      'first, second, third, then add -th: fourth, sixth, seventh. 1st, 2nd, 3rd, 4th.',
      'first (thứ nhất), second (thứ hai), third (thứ ba), sau đó thêm -th: fourth, sixth, seventh. Viết tắt: 1st, 2nd, 3rd, 4th.', [
        ['Nam came first in the race.', 'Nam về nhất trong cuộc đua.', 'first'],
        ['Our flat is on the third floor.', 'Căn hộ của chúng tôi ở tầng ba.', 'third'],
      ]),
    card(29, 4, 'Ordinal spelling', 'Chính tả số thứ tự',
      'five → fifth, nine → ninth, twelve → twelfth, twenty → twentieth.',
      'five → fifth, nine → ninth (bỏ e), twelve → twelfth, twenty → twentieth (y → ie).', [
        ['December is the twelfth month.', 'Tháng Mười Hai là tháng thứ mười hai.', 'twelfth'],
        ['This is my ninth visit to Hue.', 'Đây là lần thứ chín tôi đến Huế.', 'ninth'],
        ['Teachers\' Day is on the twentieth of November.', 'Ngày Nhà giáo là ngày hai mươi tháng Mười Một.', 'twentieth'],
      ]),
    card(29, 5, 'Saying dates', 'Cách nói ngày tháng',
      'Write 5 May, say "the fifth of May". Use ordinal numbers for dates.',
      'Viết 5 May, đọc "the fifth of May". Ngày tháng dùng số thứ tự.', [
        ['My birthday is on the twenty-first of March.', 'Sinh nhật tôi vào ngày 21 tháng Ba.', 'twenty-first'],
        ['Christmas Day is on the twenty-fifth of December.', 'Lễ Giáng sinh vào ngày 25 tháng Mười Hai.', 'twenty-fifth'],
      ]),
    card(29, 6, 'Numbers in everyday life', 'Số trong cuộc sống',
      'Prices, ages and phone numbers use normal numbers. Floors, grades and places in a race use ordinals.',
      'Giá tiền, tuổi, số điện thoại dùng số đếm. Tầng, lớp, thứ hạng dùng số thứ tự.', [
        ['My sister is in the eighth grade.', 'Chị tôi học lớp tám.', 'eighth'],
        ['Grandpa is ninety years old.', 'Ông tôi chín mươi tuổi.', 'ninety'],
      ]),
  ],
  30: [
    card(30, 1, 'Weather words', 'Từ chỉ thời tiết',
      'foggy, stormy, windy, freezing, humid, cloudy.',
      'foggy (sương mù), stormy (có bão), windy (nhiều gió), freezing (lạnh cóng), humid (nồm ẩm), cloudy (nhiều mây).', [
        ['It\'s windy today. Let\'s fly a kite!', 'Hôm nay nhiều gió. Đi thả diều thôi!', 'windy'],
        ['It\'s freezing outside. Wear your gloves!', 'Ngoài trời lạnh cóng. Đeo găng tay vào!', 'freezing'],
        ['Hanoi is very humid in spring.', 'Hà Nội rất nồm vào mùa xuân.', 'humid'],
      ], { en: 'Many weather words add -y to a noun: wind → windy, cloud → cloudy, fog → foggy.', vi: 'Nhiều tính từ thời tiết = danh từ + y: wind → windy, cloud → cloudy, fog → foggy.' }),
    card(30, 2, 'In the sky', 'Trên bầu trời',
      'rainbow, thunder, lightning.',
      'rainbow (cầu vồng), thunder (sấm), lightning (tia chớp).', [
        ['After the rain, we saw a rainbow.', 'Sau cơn mưa, chúng tôi thấy cầu vồng.', 'rainbow'],
        ['Lightning hit the tall tree.', 'Tia chớp đánh trúng cái cây cao.', 'Lightning'],
      ]),
    card(30, 3, 'Seasons and temperature', 'Mùa và nhiệt độ',
      'spring, summer, autumn, winter. The forecast tells us the temperature.',
      'spring (xuân), summer (hạ), autumn (thu), winter (đông). forecast (dự báo) cho biết temperature (nhiệt độ).', [
        ['In autumn, the leaves turn yellow.', 'Vào mùa thu, lá chuyển vàng.', 'autumn'],
        ['The forecast says it will rain tomorrow.', 'Dự báo nói mai trời sẽ mưa.', 'forecast'],
        ['The temperature today is 35 degrees.', 'Nhiệt độ hôm nay là 35 độ.', 'temperature'],
      ]),
    card(30, 4, 'Places in nature', 'Cảnh thiên nhiên',
      'forest, waterfall, valley, desert, island, cave.',
      'forest (rừng), waterfall (thác nước), valley (thung lũng), desert (sa mạc), island (đảo), cave (hang động).', [
        ['Many animals live in the forest.', 'Nhiều loài vật sống trong rừng.', 'forest'],
        ['Phu Quoc is a big island.', 'Phú Quốc là một hòn đảo lớn.', 'island'],
        ['Son Doong is the biggest cave in the world.', 'Sơn Đoòng là hang động lớn nhất thế giới.', 'cave'],
      ]),
    card(30, 5, 'Looking after our planet', 'Bảo vệ hành tinh',
      'pollution, litter, environment, endangered animals.',
      'pollution (ô nhiễm), litter (rác bừa bãi), environment (môi trường), endangered (có nguy cơ tuyệt chủng).', [
        ['Air pollution is a big problem in cities.', 'Ô nhiễm không khí là vấn đề lớn ở thành phố.', 'pollution'],
        ['The saola is an endangered animal.', 'Sao la là loài có nguy cơ tuyệt chủng.', 'endangered'],
      ]),
    card(30, 6, 'What we can do', 'Chúng ta có thể làm gì',
      'recycle bottles and paper, don\'t drop litter, protect the environment.',
      'recycle (tái chế) chai lọ và giấy, không xả rác, protect (bảo vệ) môi trường.', [
        ['We recycle bottles and paper at school.', 'Ở trường chúng tôi tái chế chai và giấy.', 'recycle'],
        ['We must protect the environment.', 'Chúng ta phải bảo vệ môi trường.', 'protect'],
      ]),
  ],
};
