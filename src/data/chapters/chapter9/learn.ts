import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(9);

export const learnCards: Record<number, LearnCard[]> = {
  25: [
    card(25, 1, 'have got / has got', 'have got / has got',
      'I / you / we / they have got. He / she / it has got. Short forms: I\'ve got, she\'s got.',
      'I / you / we / they have got. He / she / it has got. Viết tắt: I\'ve got, she\'s got.', [
        ['I have got two sisters.', 'Tôi có hai chị gái.', 'have got'],
        ['Minh has got a new bike.', 'Minh có một chiếc xe đạp mới.', 'has got'],
        ["She's got long hair.", 'Cô ấy có mái tóc dài.', "She's got"],
      ]),
    card(25, 2, "haven't got / hasn't got", "haven't got / hasn't got",
      "Negative: haven't got / hasn't got. Never say don't got.",
      "Phủ định: haven't got / hasn't got. Không bao giờ nói don't got.", [
        ["We haven't got a car.", 'Chúng tôi không có ô tô.', "haven't got"],
        ["Lan hasn't got a pet.", 'Lan không nuôi thú cưng.', "hasn't got"],
      ]),
    card(25, 3, 'Have … got? Short answers', 'Câu hỏi Have … got? Trả lời ngắn',
      "Ask: Have / Has + subject + got …? Answer: Yes, I have. / No, he hasn't. No got in short answers.",
      "Hỏi: Have / Has + chủ ngữ + got …? Trả lời: Yes, I have. / No, he hasn't. Không dùng got trong câu trả lời ngắn.", [
        ['Have you got a ruler?', 'Bạn có thước kẻ không?', 'Have'],
        ['Has Nam got a dog? Yes, he has.', 'Nam có nuôi chó không? Có.', 'Yes, he has'],
        ["Have they got a garden? No, they haven't.", 'Họ có vườn không? Không.', "No, they haven't"],
      ]),
    card(25, 4, 'What we can "have got"', 'Những thứ có thể "have got"',
      'have got is for things we own, family, how we look and when we are ill.',
      'have got dùng cho đồ vật sở hữu, gia đình, ngoại hình và khi bị ốm.', [
        ['My uncle has got a big truck.', 'Chú tôi có một chiếc xe tải lớn.', 'has got'],
        ['I have got three cousins.', 'Tôi có ba anh chị em họ.', 'have got'],
        ["I've got a headache.", 'Tôi bị đau đầu.', "I've got"],
      ]),
    card(25, 5, 'have without got', 'have không có got',
      'have / has (no got) means the same. Questions and negatives use do / does.',
      'have / has (không có got) nghĩa giống vậy. Câu hỏi và phủ định dùng do / does.', [
        ['Lan has a computer.', 'Lan có một chiếc máy tính.', 'has'],
        ['Does your school have a library?', 'Trường bạn có thư viện không?', 'Does'],
        ["We don't have a car.", 'Chúng tôi không có ô tô.', "don't have"],
      ], { en: "Say Does she have …? or Has she got …?, not Does she has …?", vi: "Nói Does she have …? hoặc Has she got …?, không nói Does she has …?" }),
    card(25, 6, 'some and any with have got', 'some và any với have got',
      "some in positive sentences; any in questions and negatives.",
      'some trong câu khẳng định; any trong câu hỏi và câu phủ định.', [
        ["I've got some stickers.", 'Tôi có vài miếng dán.', 'some'],
        ['Have you got any brothers?', 'Bạn có anh em trai không?', 'any'],
        ["We haven't got any milk.", 'Chúng tôi không còn sữa.', 'any'],
      ]),
  ],
  26: [
    card(26, 1, 'Question words', 'Từ để hỏi',
      'What = thing, Where = place, When = time, Who = person, Why = reason.',
      'What = cái gì, Where = ở đâu, When = khi nào, Who = ai, Why = tại sao.', [
        ['Where do you live? In Hue.', 'Bạn sống ở đâu? Ở Huế.', 'Where'],
        ['When is your birthday? On 5 May.', 'Sinh nhật bạn khi nào? Ngày 5 tháng 5.', 'When'],
        ['Why are you late? Because the bus was late.', 'Sao bạn đến muộn? Vì xe buýt đến muộn.', 'Why'],
      ]),
    card(26, 2, 'Whose and Which', 'Whose và Which',
      'Whose asks who something belongs to. Which asks you to choose from a few things.',
      'Whose hỏi vật là của ai. Which hỏi chọn cái nào trong vài thứ.', [
        ["Whose bag is this? It's Lan's.", 'Cái cặp này của ai? Của Lan.', 'Whose'],
        ['Which T-shirt do you want, the red one or the blue one?', 'Bạn muốn áo nào, áo đỏ hay áo xanh?', 'Which'],
      ]),
    card(26, 3, 'How + word', 'How + từ',
      'How old (age), How many (number), How much (price / amount), How often (how many times), How long (time).',
      'How old (tuổi), How many (số lượng), How much (giá / lượng), How often (bao lâu một lần), How long (bao lâu).', [
        ['How old is your sister? She is twelve.', 'Em gái bạn bao nhiêu tuổi? Mười hai.', 'How old'],
        ['How much is this book?', 'Quyển sách này giá bao nhiêu?', 'How much'],
        ['How often do you swim? Twice a week.', 'Bạn bơi bao lâu một lần? Hai lần một tuần.', 'How often'],
      ]),
    card(26, 4, 'Word order in Wh-questions', 'Trật tự từ trong câu hỏi Wh-',
      'Wh-word + do / does / did + subject + base verb?',
      'Từ để hỏi + do / does / did + chủ ngữ + động từ nguyên mẫu?', [
        ['Where do your cousins live?', 'Anh chị em họ của bạn sống ở đâu?', 'do'],
        ['What time does Nam get up?', 'Nam thức dậy lúc mấy giờ?', 'does'],
        ['What did you do last weekend?', 'Cuối tuần trước bạn đã làm gì?', 'did'],
      ], { en: 'When Who is the subject, there is no do: Who lives here?', vi: 'Khi Who làm chủ ngữ thì không có do: Who lives here?' }),
    card(26, 5, 'Question tags', 'Câu hỏi đuôi',
      "Positive sentence → negative tag. Negative sentence → positive tag. Use a pronoun in the tag.",
      'Câu khẳng định → đuôi phủ định. Câu phủ định → đuôi khẳng định. Đuôi dùng đại từ.', [
        ["Lan is your friend, isn't she?", 'Lan là bạn của bạn, phải không?', "isn't she"],
        ["You aren't tired, are you?", 'Bạn không mệt, phải không?', 'are you'],
      ]),
    card(26, 6, 'Tags with do / does / did', 'Câu hỏi đuôi với do / does / did',
      'For the present simple and past simple, the tag uses do / does / did.',
      'Với hiện tại đơn và quá khứ đơn, câu hỏi đuôi dùng do / does / did.', [
        ["Your brother likes football, doesn't he?", 'Anh bạn thích bóng đá, phải không?', "doesn't he"],
        ["They don't eat meat, do they?", 'Họ không ăn thịt, phải không?', 'do they'],
        ["You went to the museum, didn't you?", 'Bạn đã đi bảo tàng, phải không?', "didn't you"],
      ]),
  ],
  27: [
    card(27, 1, 'Hair and face', 'Tóc và khuôn mặt',
      'curly, straight, blond hair; bald; a beard; freckles.',
      'curly (xoăn), straight (thẳng), blond (vàng hoe); bald (hói); beard (râu); freckles (tàn nhang).', [
        ['My sister has curly hair.', 'Chị tôi có tóc xoăn.', 'curly'],
        ['Grandpa is bald.', 'Ông bị hói.', 'bald'],
        ['She has freckles on her nose.', 'Cô ấy có tàn nhang trên mũi.', 'freckles'],
      ]),
    card(27, 2, 'How people look', 'Ngoại hình',
      'tall, slim, handsome, pretty, cute, middle-aged.',
      'tall (cao), slim (mảnh khảnh), handsome (đẹp trai), pretty (xinh), cute (dễ thương), middle-aged (trung niên).', [
        ['The dancer is tall and slim.', 'Vũ công cao và mảnh khảnh.', 'slim'],
        ['The actor is very handsome.', 'Nam diễn viên rất đẹp trai.', 'handsome'],
        ['What a cute puppy!', 'Chú cún dễ thương quá!', 'cute'],
      ], { en: 'handsome is usually for men; pretty is usually for girls and women.', vi: 'handsome thường dùng cho nam; pretty thường dùng cho nữ.' }),
    card(27, 3, 'Good character', 'Tính cách tốt',
      'generous, honest, clever, funny, brave, hard-working.',
      'generous (hào phóng), honest (trung thực), clever (thông minh), funny (hài hước), brave (dũng cảm), hard-working (chăm chỉ).', [
        ['Lan is honest. She never tells lies.', 'Lan trung thực. Bạn ấy không bao giờ nói dối.', 'honest'],
        ['The firefighter was very brave.', 'Người lính cứu hỏa rất dũng cảm.', 'brave'],
      ]),
    card(27, 4, 'Difficult character', 'Tính cách chưa tốt',
      'shy, rude, selfish, bossy, lazy, impatient.',
      'shy (nhút nhát), rude (thô lỗ), selfish (ích kỷ), bossy (hách dịch), lazy (lười), impatient (thiếu kiên nhẫn).', [
        ["Don't be selfish. Share your toys!", 'Đừng ích kỷ. Hãy chia sẻ đồ chơi!', 'selfish'],
        ['He is too lazy to tidy his room.', 'Bạn ấy lười đến mức không dọn phòng.', 'lazy'],
      ]),
    card(27, 5, 'Asking about people', 'Hỏi về một người',
      'What does he look like? = appearance. What is he like? = character.',
      'What does he look like? = hỏi ngoại hình. What is he like? = hỏi tính cách.', [
        ["What does your brother look like? He's tall with straight hair.", 'Anh bạn trông thế nào? Anh ấy cao, tóc thẳng.', 'look like'],
        ["What's your teacher like? She's funny and kind.", 'Cô giáo bạn là người thế nào? Cô hài hước và tốt bụng.', "What's your teacher like"],
      ]),
    card(27, 6, 'Describing with have got and be', 'Miêu tả với have got và be',
      'Use have got for hair, eyes and beards. Use be for height, age and character.',
      'Dùng have got cho tóc, mắt, râu. Dùng be cho chiều cao, tuổi và tính cách.', [
        ['My uncle has got a beard.', 'Chú tôi có râu.', 'has got'],
        ['My aunt is middle-aged and very generous.', 'Cô tôi trung niên và rất hào phóng.', 'is'],
      ], { en: 'Say she has got blond hair, not she is blond hair.', vi: 'Nói she has got blond hair, không nói she is blond hair.' }),
  ],
};
