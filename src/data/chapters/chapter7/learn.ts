import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(7);

export const learnCards: Record<number, LearnCard[]> = {
  19: [
    card(19, 1, 'Modal verbs', 'Động từ khuyết thiếu',
      'Modal verbs (can, could, may) + base verb without to. They never add -s and need no do/does.',
      'Động từ khuyết thiếu (can, could, may) + động từ nguyên mẫu không to. Không thêm -s, không cần do/does.', [
        ['She can play the violin.', 'Bạn ấy biết chơi vi-ô-lông.', 'can play'],
        ['Can you ride a horse?', 'Bạn có biết cưỡi ngựa không?', 'Can you'],
      ], { en: 'Say she can play, not she cans play or she can plays.', vi: 'Nói she can play, không nói she cans play hay she can plays.' }),
    card(19, 2, "can and can't: ability", "can và can't: khả năng",
      "can = be able to now. can't (cannot) = not able to.",
      "can = có thể, biết làm. can't (cannot) = không thể, không biết.", [
        ['I can help you with the cleaning.', 'Tôi có thể giúp bạn dọn dẹp.', 'can help'],
        ["My grandma can't swim.", 'Bà tôi không biết bơi.', "can't swim"],
      ]),
    card(19, 3, "could and couldn't: past ability", "could và couldn't: khả năng trong quá khứ",
      "could / couldn't = was able / wasn't able to in the past.",
      "could / couldn't = đã có thể / đã không thể (trong quá khứ).", [
        ['I could read when I was four.', 'Tôi biết đọc từ năm bốn tuổi.', 'could read'],
        ["I couldn't swim when I was five.", 'Năm tuổi tôi chưa biết bơi.', "couldn't swim"],
      ]),
    card(19, 4, 'Permission', 'Xin phép và cho phép',
      "You can … = it is allowed. You can't … = it isn't allowed. Can I …? / Could I …? ask for permission.",
      "You can … = được phép. You can't … = không được phép. Can I …? / Could I …? = Tôi có thể … không?", [
        ['You can use this laptop.', 'Bạn được dùng máy tính này.', 'can use'],
        ["You can't use this laptop.", 'Bạn không được dùng máy tính này.', "can't use"],
        ['Could I use your pencil, please?', 'Cho tôi mượn bút chì được không?', 'Could I'],
      ]),
    card(19, 5, 'Polite requests', 'Lời nhờ lịch sự',
      'Could you …, please? is more polite than Can you …?',
      'Could you …, please? lịch sự hơn Can you …?', [
        ['Could you help me, please?', 'Bạn giúp tôi được không?', 'Could you'],
        ['Could you open the window, please?', 'Bạn mở cửa sổ giúp tôi được không?', 'Could you'],
      ]),
    card(19, 6, 'may and may not', 'may và may not',
      "may / may not = perhaps it will / won't happen. Don't use couldn't for this.",
      "may / may not = có thể sẽ / có thể sẽ không xảy ra. Không dùng couldn't với nghĩa này.", [
        ['They may visit the museum.', 'Có thể họ sẽ đi bảo tàng.', 'may visit'],
        ['Alex has a cold, so he may not come to school tomorrow.', 'Alex bị cảm nên có thể mai không đi học.', 'may not'],
      ]),
  ],
  20: [
    card(20, 1, 'must', 'must',
      'must + base verb = it is necessary, a strong rule or duty.',
      'must + động từ nguyên mẫu = phải, bắt buộc.', [
        ['You must wear a helmet on a motorbike.', 'Bạn phải đội mũ bảo hiểm khi đi xe máy.', 'must wear'],
        ['Drivers must stop at a red light.', 'Tài xế phải dừng khi đèn đỏ.', 'must stop'],
      ]),
    card(20, 2, "mustn't", "mustn't",
      "mustn't = it is not allowed. Don't do it!",
      "mustn't = cấm, không được làm.", [
        ["You mustn't use your phone in class.", 'Bạn không được dùng điện thoại trong lớp.', "mustn't"],
        ["Students mustn't run in the corridor.", 'Học sinh không được chạy ngoài hành lang.', "mustn't run"],
      ]),
    card(20, 3, 'have to / has to', 'have to / has to',
      'have to = it is necessary. It changes like a normal verb: I have to, she has to.',
      'have to = phải (cần thiết). Biến đổi như động từ thường: I have to, she has to.', [
        ['I have to buy some new pencils.', 'Tôi phải mua bút chì mới.', 'have to'],
        ['My mum has to work on Sundays.', 'Mẹ tôi phải làm việc vào Chủ nhật.', 'has to'],
      ]),
    card(20, 4, "don't have to", "don't have to",
      "don't / doesn't have to = it isn't necessary, but you can if you want.",
      "don't / doesn't have to = không cần, nhưng làm cũng được.", [
        ["It's Saturday. I don't have to get up early.", 'Hôm nay thứ Bảy. Tôi không cần dậy sớm.', "don't have to"],
        ["Lan doesn't have to cook tonight.", 'Tối nay Lan không cần nấu ăn.', "doesn't have to"],
      ]),
    card(20, 5, "mustn't or don't have to?", "mustn't hay don't have to?",
      "mustn't = it is not allowed. don't have to = it isn't necessary. They are very different!",
      "mustn't = cấm. don't have to = không cần. Hai nghĩa rất khác nhau!", [
        ["You mustn't swim here. It's dangerous.", 'Bạn không được bơi ở đây. Nguy hiểm lắm.', "mustn't"],
        ["You don't have to pay. The museum is free.", 'Bạn không cần trả tiền. Bảo tàng miễn phí.', "don't have to"],
      ]),
    card(20, 6, 'Questions with have to', 'Câu hỏi với have to',
      'Do/Does + subject + have to …? Yes, I do. / No, she doesn\'t.',
      'Do/Does + chủ ngữ + have to …? Yes, I do. / No, she doesn\'t.', [
        ['Do you have to wear a uniform?', 'Bạn có phải mặc đồng phục không?', 'Do you have to'],
        ['Does Minh have to walk the dog?', 'Minh có phải dắt chó đi dạo không?', 'Does'],
      ]),
  ],
  21: [
    card(21, 1, 'Staying safe', 'Giữ an toàn',
      'helmet, seat belt, traffic lights.',
      'helmet (mũ bảo hiểm), seat belt (dây an toàn), traffic lights (đèn giao thông).', [
        ['You must wear a helmet on a motorbike.', 'Bạn phải đội mũ bảo hiểm khi đi xe máy.', 'helmet'],
        ['Put on your seat belt, please.', 'Hãy thắt dây an toàn.', 'seat belt'],
        ['Stop when the traffic lights are red.', 'Dừng lại khi đèn giao thông đỏ.', 'traffic lights'],
      ]),
    card(21, 2, 'School rules', 'Nội quy trường học',
      'school uniform, jewellery, make-up, notice.',
      'school uniform (đồng phục), jewellery (trang sức), make-up (đồ trang điểm), notice (thông báo).', [
        ['Our school uniform is a white shirt and blue trousers.', 'Đồng phục trường tôi là áo trắng quần xanh.', 'school uniform'],
        ["You can't wear jewellery in PE.", 'Không được đeo trang sức trong giờ Thể dục.', 'jewellery'],
        ['Read the notice on the classroom door.', 'Hãy đọc thông báo trên cửa lớp.', 'notice'],
      ]),
    card(21, 3, 'Law and order', 'Luật pháp và trật tự',
      'law, police officer, arrest, driver, road.',
      'law (luật), police officer (cảnh sát), arrest (bắt giữ), driver (tài xế), road (con đường).', [
        ['It is against the law to drive without a licence.', 'Lái xe không có bằng là vi phạm pháp luật.', 'law'],
        ['The police arrested the thief.', 'Cảnh sát đã bắt tên trộm.', 'arrested'],
        ['The bus driver stops at every bus stop.', 'Tài xế xe buýt dừng ở mọi trạm.', 'driver'],
      ]),
    card(21, 4, 'Allowed or not?', 'Được phép hay không?',
      'allow = say someone can do something. enter = go into. park = leave a car somewhere.',
      'allow = cho phép. enter = đi vào. park = đỗ xe.', [
        ['Our teacher allows us to use dictionaries.', 'Cô giáo cho phép chúng tôi dùng từ điển.', 'allows'],
        ['Please knock before you enter the office.', 'Hãy gõ cửa trước khi vào văn phòng.', 'enter'],
        ["You can't park in front of the gate.", 'Không được đỗ xe trước cổng.', 'park'],
      ]),
    card(21, 5, 'Litter and fights', 'Rác và đánh nhau',
      'litter = rubbish on the ground. throw away = put in the bin. fight = hit each other.',
      'litter = rác xả bừa bãi. throw away = vứt đi. fight = đánh nhau.', [
        ["Please don't drop litter in the park.", 'Xin đừng xả rác trong công viên.', 'litter'],
        ["Don't throw away plastic bottles. Recycle them!", 'Đừng vứt chai nhựa. Hãy tái chế!', 'throw away'],
        ['Students must never fight at school.', 'Học sinh không bao giờ được đánh nhau ở trường.', 'fight'],
      ]),
    card(21, 6, 'Describing rules and places', 'Miêu tả luật lệ và nơi chốn',
      'careful, dangerous, necessary, noisy, polite, quiet.',
      'careful (cẩn thận), dangerous (nguy hiểm), necessary (cần thiết), noisy (ồn ào), polite (lịch sự), quiet (yên tĩnh).', [
        ['Be careful with that knife!', 'Cẩn thận với con dao đó!', 'careful'],
        ['It is polite to say thank you.', 'Nói cảm ơn là lịch sự.', 'polite'],
        ['Please be quiet in the library.', 'Hãy giữ yên lặng trong thư viện.', 'quiet'],
      ]),
  ],
};
