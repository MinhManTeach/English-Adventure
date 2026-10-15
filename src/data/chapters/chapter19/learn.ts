import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(19);

export const learnCards: Record<number, LearnCard[]> = {
  55: [
    card(55, 1, 'will for predictions', 'will để dự đoán',
      'will / won\'t + base verb for what you think or believe about the future. We often use I think, I\'m sure, I hope, maybe.',
      'will / won\'t + động từ nguyên mẫu để nói điều mình nghĩ, tin sẽ xảy ra. Thường đi với I think, I\'m sure, I hope, maybe.', [
        ['I think Vietnam will win the match.', 'Tôi nghĩ Việt Nam sẽ thắng trận đấu.', 'will win'],
        ['I\'m sure you will pass the exam.', 'Tôi chắc chắn bạn sẽ thi đỗ.', 'will pass'],
        ['I don\'t think it will rain tomorrow.', 'Tôi không nghĩ ngày mai trời sẽ mưa.', 'will rain'],
      ], { en: 'We usually say I don\'t think … will, not I think … won\'t.', vi: 'Người ta thường nói I don\'t think … will hơn là I think … won\'t.' }),
    card(55, 2, 'probably and definitely', 'probably và definitely',
      'probably (có lẽ) and definitely (chắc chắn) go after will but before won\'t.',
      'probably (có lẽ) và definitely (chắc chắn) đứng sau will nhưng đứng trước won\'t.', [
        ['She will probably miss the bus.', 'Có lẽ cô ấy sẽ lỡ xe buýt.', 'will probably'],
        ['We probably won\'t go to the beach today.', 'Có lẽ hôm nay chúng tôi sẽ không đi biển.', 'probably won\'t'],
        ['Grandpa definitely won\'t buy a smartphone.', 'Ông chắc chắn sẽ không mua điện thoại thông minh.', 'definitely won\'t'],
      ]),
    card(55, 3, 'Offers, promises and quick decisions', 'Đề nghị, lời hứa và quyết định tức thì',
      'Use I\'ll when you decide at the moment of speaking, offer help or promise something. Use Shall I / Shall we? for offers and suggestions.',
      'Dùng I\'ll khi quyết định ngay lúc nói, đề nghị giúp đỡ hoặc hứa hẹn. Dùng Shall I / Shall we? để đề nghị, gợi ý.', [
        ['Don\'t worry. I\'ll lend you a pen.', 'Đừng lo. Mình sẽ cho bạn mượn bút.', 'I\'ll lend'],
        ['I won\'t tell anyone, I promise.', 'Mình sẽ không kể với ai đâu, mình hứa.', 'won\'t tell'],
        ['Shall we go to the night market?', 'Chúng ta đi chợ đêm nhé?', 'Shall we'],
      ], { en: 'won\'t can also mean refuse: The car won\'t start.', vi: 'won\'t còn có nghĩa là "không chịu": The car won\'t start (Xe không chịu nổ máy).' }),
    card(55, 4, 'be going to for plans', 'be going to cho kế hoạch',
      'am / is / are going to + base verb for plans and intentions you decided before speaking.',
      'am / is / are going to + động từ nguyên mẫu cho kế hoạch, dự định đã quyết định từ trước.', [
        ['We are going to travel to Sa Pa next winter.', 'Mùa đông tới chúng tôi sẽ đi Sa Pa.', 'are going to travel'],
        ['I\'m not going to eat any more cake.', 'Tôi sẽ không ăn thêm bánh nữa.', 'not going to eat'],
        ['What are you going to wear to the party?', 'Bạn định mặc gì đến bữa tiệc?', 'are you going to wear'],
      ]),
    card(55, 5, 'be going to with evidence', 'be going to khi có dấu hiệu',
      'Use be going to for a prediction when you can see something now that tells you what will happen.',
      'Dùng be going to để dự đoán khi có dấu hiệu, bằng chứng ngay trước mắt.', [
        ['Look at those black clouds. It\'s going to rain.', 'Nhìn những đám mây đen kia kìa. Trời sắp mưa rồi.', 'going to rain'],
        ['Be careful! You\'re going to drop those eggs!', 'Cẩn thận! Bạn sắp làm rơi mấy quả trứng kia rồi!', 'going to drop'],
      ]),
    card(55, 6, 'there will be / there is going to be', 'there will be / there is going to be',
      'The future of there is / there are: there will be, or there is / are going to be.',
      'Dạng tương lai của there is / there are: there will be, hoặc there is / are going to be.', [
        ['There will be more electric cars in the future.', 'Trong tương lai sẽ có nhiều ô tô điện hơn.', 'There will be'],
        ['There is going to be a concert in the park.', 'Sắp có một buổi hòa nhạc trong công viên.', 'There is going to be'],
        ['Will there be a test on Friday?', 'Thứ Sáu có bài kiểm tra không?', 'Will there be'],
      ], { en: 'Never say there will have.', vi: 'Không bao giờ nói there will have.' }),
  ],
  56: [
    card(56, 1, 'Reflexive pronouns', 'Đại từ phản thân',
      'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves: use them when the subject and the object are the same.',
      'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves: dùng khi chủ ngữ và tân ngữ là cùng một người, vật.', [
        ['Minh hurt himself when he fell off his bike.', 'Minh tự làm mình bị thương khi ngã xe.', 'himself'],
        ['The children enjoyed themselves at the water park.', 'Bọn trẻ chơi rất vui ở công viên nước.', 'themselves'],
        ['I taught myself to play the guitar.', 'Tôi tự học chơi đàn ghi-ta.', 'myself'],
      ], { en: 'Say himself and themselves, never hisself or theirselves.', vi: 'Nói himself, themselves; không có hisself hay theirselves.' }),
    card(56, 2, 'by myself, enjoy yourself, help yourself', 'by myself, enjoy yourself, help yourself',
      'by + reflexive pronoun = alone or without help. Enjoy yourself! = Have a good time. Help yourself! = Take what you want.',
      'by + đại từ phản thân = một mình, không ai giúp. Enjoy yourself! = Chúc vui vẻ! Help yourself! = Cứ tự nhiên lấy nhé!', [
        ['My grandfather lives by himself.', 'Ông tôi sống một mình.', 'by himself'],
        ['Did you make this cake yourself?', 'Bạn tự làm cái bánh này à?', 'yourself'],
        ['Help yourselves to some rice, children!', 'Các con cứ tự nhiên lấy cơm nhé!', 'Help yourselves'],
      ], { en: 'yourself = one person; yourselves = two or more people.', vi: 'yourself = một người; yourselves = từ hai người trở lên.' }),
    card(56, 3, 'each other', 'each other (lẫn nhau)',
      'each other = A does it to B and B does it to A. themselves = each person does it to himself or herself.',
      'each other = A làm cho B và B làm cho A. themselves = mỗi người tự làm cho chính mình.', [
        ['Nam and Mai text each other every evening.', 'Nam và Mai nhắn tin cho nhau mỗi tối.', 'each other'],
        ['Lan and her sister looked at each other and laughed.', 'Lan và chị nhìn nhau rồi bật cười.', 'each other'],
      ]),
    card(56, 4, 'Possessive pronouns', 'Đại từ sở hữu',
      'mine, yours, his, hers, ours, theirs stand alone and replace my / your … + noun. a friend of mine = one of my friends.',
      'mine, yours, his, hers, ours, theirs đứng một mình, thay cho my / your … + danh từ. a friend of mine = một người bạn của tôi.', [
        ['This isn\'t my umbrella. Mine is blue.', 'Đây không phải ô của tôi. Ô của tôi màu xanh.', 'Mine'],
        ['Our flat is small, but theirs is very big.', 'Căn hộ của chúng tôi nhỏ, nhưng của họ rất rộng.', 'theirs'],
        ['Lan is a friend of mine.', 'Lan là một người bạn của tôi.', 'of mine'],
      ], { en: 'No apostrophe: yours, hers, theirs (not your\'s, her\'s).', vi: 'Không có dấu \': yours, hers, theirs (không viết your\'s, her\'s).' }),
    card(56, 5, 'Whose or who\'s? its or it\'s?', 'Whose hay who\'s? its hay it\'s?',
      'Whose …? = Of whom? / who\'s = who is. its = belonging to it / it\'s = it is.',
      'Whose …? = Của ai? / who\'s = who is. its = của nó / it\'s = it is.', [
        ['Whose phone is ringing?', 'Điện thoại của ai đang reo thế?', 'Whose'],
        ['Who\'s coming to the cinema tonight?', 'Ai sẽ đi xem phim tối nay?', 'Who\'s'],
        ['The dog is wagging its tail.', 'Con chó đang vẫy đuôi.', 'its'],
      ]),
    card(56, 6, 'Possessive \'s and s\'', 'Sở hữu cách \'s và s\'',
      'Singular nouns and irregular plurals add \'s: my aunt\'s house, the children\'s toys. Regular plurals in -s add only \': my parents\' friends.',
      'Danh từ số ít và số nhiều bất quy tắc thêm \'s: my aunt\'s house, the children\'s toys. Danh từ số nhiều tận cùng -s chỉ thêm \': my parents\' friends.', [
        ['This is my aunt\'s house.', 'Đây là nhà của dì tôi.', 'aunt\'s'],
        ['The women\'s toilets are next to the library.', 'Nhà vệ sinh nữ ở cạnh thư viện.', 'women\'s'],
        ['I\'m staying at my grandparents\' house.', 'Tôi đang ở nhà ông bà.', 'grandparents\''],
      ], { en: 'the boy\'s room = one boy; the boys\' room = two or more boys.', vi: 'the boy\'s room = phòng của một cậu bé; the boys\' room = phòng của nhiều cậu bé.' }),
  ],
  57: [
    card(57, 1, 'Jobs', 'Nghề nghiệp',
      'pilot, receptionist, hairdresser, plumber, accountant, tour guide.',
      'pilot (phi công), receptionist (lễ tân), hairdresser (thợ làm tóc), plumber (thợ sửa ống nước), accountant (kế toán), tour guide (hướng dẫn viên du lịch).', [
        ['My uncle is a pilot for a Vietnamese airline.', 'Chú tôi là phi công của một hãng hàng không Việt Nam.', 'pilot'],
        ['The kitchen tap is broken, so we called a plumber.', 'Vòi nước bếp bị hỏng nên nhà tôi gọi thợ sửa ống nước.', 'plumber'],
        ['Our tour guide told us about the history of Hue.', 'Hướng dẫn viên kể cho chúng tôi về lịch sử Huế.', 'tour guide'],
      ]),
    card(57, 2, 'At work', 'Nơi làm việc',
      'factory, company, colleague, manager, employee, meeting.',
      'factory (nhà máy), company (công ty), colleague (đồng nghiệp), manager (người quản lý), employee (nhân viên), meeting (cuộc họp).', [
        ['My dad works in a shoe factory.', 'Bố tôi làm việc ở một nhà máy giày.', 'factory'],
        ['Mum is having lunch with her colleagues.', 'Mẹ đang ăn trưa cùng đồng nghiệp.', 'colleagues'],
        ['I\'d like to speak to the manager, please.', 'Tôi muốn nói chuyện với người quản lý.', 'manager'],
      ]),
    card(57, 3, 'Working life', 'Cuộc sống đi làm',
      'earn, full-time, day off, career, experience, apply for.',
      'earn (kiếm tiền), full-time (toàn thời gian), day off (ngày nghỉ), career (sự nghiệp), experience (kinh nghiệm), apply for (nộp đơn xin).', [
        ['She earns ten million dong a month.', 'Cô ấy kiếm được mười triệu đồng một tháng.', 'earns'],
        ['Tomorrow is my day off.', 'Ngày mai là ngày nghỉ của tôi.', 'day off'],
        ['My brother is applying for a job at a hotel.', 'Anh tôi đang nộp đơn xin việc ở một khách sạn.', 'applying for'],
      ]),
    card(57, 4, 'Describing jobs and workers', 'Miêu tả công việc và người lao động',
      'well-paid, stressful, creative, organised, patient, responsible.',
      'well-paid (lương cao), stressful (căng thẳng), creative (sáng tạo), organised (ngăn nắp, có tổ chức), patient (kiên nhẫn), responsible (có trách nhiệm).', [
        ['Pilots usually have well-paid jobs.', 'Phi công thường có công việc lương cao.', 'well-paid'],
        ['Designers need to be creative.', 'Nhà thiết kế cần sáng tạo.', 'creative'],
        ['Teachers of young children must be patient.', 'Giáo viên dạy trẻ nhỏ phải kiên nhẫn.', 'patient'],
      ]),
    card(57, 5, 'Talking about your job', 'Nói về công việc',
      'work as + a / an + job; work for + a company; work in + a place.',
      'work as + a / an + nghề; work for + công ty; work in + nơi làm việc.', [
        ['My aunt works as an accountant.', 'Dì tôi làm nghề kế toán.', 'works as'],
        ['She works for a computer company.', 'Cô ấy làm cho một công ty máy tính.', 'works for'],
        ['My dad works in a factory.', 'Bố tôi làm việc trong nhà máy.', 'works in'],
      ], { en: 'Use a / an before a job: She is a nurse. He is an engineer.', vi: 'Dùng a / an trước nghề nghiệp: She is a nurse. He is an engineer.' }),
    card(57, 6, 'Getting a job', 'Tìm việc',
      'First you apply for a job, then you have an interview. Employers like people with experience.',
      'Đầu tiên bạn nộp đơn xin việc, sau đó đi phỏng vấn. Nhà tuyển dụng thích người có kinh nghiệm.', [
        ['She has ten years\' experience as a nurse.', 'Cô ấy có mười năm kinh nghiệm làm y tá.', 'experience'],
        ['My mum has a full-time job at a hospital.', 'Mẹ tôi làm toàn thời gian ở bệnh viện.', 'full-time'],
        ['She wants a career in medicine.', 'Cô ấy muốn theo nghề y.', 'career'],
      ]),
  ],
};
