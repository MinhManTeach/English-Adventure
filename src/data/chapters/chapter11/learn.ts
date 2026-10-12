import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(11);

export const learnCards: Record<number, LearnCard[]> = {
  31: [
    card(31, 1, "Possessive 's", "Sở hữu cách 's",
      "Add 's to a person or a singular noun to show who owns something.",
      "Thêm 's sau người hoặc danh từ số ít để chỉ vật đó của ai.", [
        ["This is Lan's bag.", 'Đây là cặp của Lan.', "Lan's"],
        ["My sister's name is Linh.", 'Tên chị tôi là Linh.', "sister's"],
        ["I love my grandma's cooking.", 'Tôi thích món bà nấu.', "grandma's"],
      ]),
    card(31, 2, "Plural nouns: s'", "Danh từ số nhiều: s'",
      "Plural nouns ending in -s add only an apostrophe.",
      "Danh từ số nhiều tận cùng bằng -s chỉ thêm dấu nháy '.", [
        ["My parents' room is upstairs.", 'Phòng bố mẹ tôi ở tầng trên.', "parents'"],
        ["The girls' team won the match.", 'Đội của các bạn nữ đã thắng.', "girls'"],
      ], { en: "one boy → the boy's bike; two boys → the boys' bikes.", vi: "một cậu bé → the boy's bike; hai cậu bé → the boys' bikes." }),
    card(31, 3, "Irregular plurals: 's", "Số nhiều bất quy tắc: 's",
      "Plurals without -s (children, men, women, people) add 's.",
      "Danh từ số nhiều không tận cùng -s (children, men, women, people) thêm 's.", [
        ["The children's toys are on the floor.", 'Đồ chơi của bọn trẻ ở trên sàn.', "children's"],
        ["The women's team is very strong.", 'Đội nữ rất mạnh.', "women's"],
      ]),
    card(31, 4, 'Whose …?', 'Whose …? (Của ai?)',
      "Whose + noun asks who something belongs to. Answer with 's.",
      "Whose + danh từ hỏi vật đó của ai. Trả lời bằng 's.", [
        ["Whose bag is this? It's Lan's.", 'Cái cặp này của ai? Của Lan.', 'Whose'],
        ["Whose shoes are these? They're Nam's.", 'Đôi giày này của ai? Của Nam.', "Nam's"],
      ]),
    card(31, 5, "Whose or Who's?", "Whose hay Who's?",
      "Whose = belonging to who. Who's = who is.",
      "Whose = của ai. Who's = who is (ai là / ai đang).", [
        ['Whose umbrella is this?', 'Cái ô này của ai?', 'Whose'],
        ["Who's your new teacher?", 'Giáo viên mới của bạn là ai?', "Who's"],
      ]),
    card(31, 6, "'s or of?", "'s hay of?",
      "Use 's for people and animals. For things, we often use of: the name of the street.",
      "Dùng 's cho người và con vật. Với đồ vật thường dùng of: the name of the street.", [
        ["Mai's dog is very small.", 'Con chó của Mai rất nhỏ.', "Mai's"],
        ['What is the name of the street?', 'Tên con phố là gì?', 'the name of the street'],
      ], { en: "Say Mai's dog, not the dog of Mai.", vi: "Nói Mai's dog, không nói the dog of Mai." }),
  ],
  32: [
    card(32, 1, 'Subject and object pronouns', 'Đại từ chủ ngữ và tân ngữ',
      'Subject (before the verb): I, you, he, she, it, we, they. Object (after the verb): me, you, him, her, it, us, them.',
      'Chủ ngữ (trước động từ): I, you, he, she, it, we, they. Tân ngữ (sau động từ): me, you, him, her, it, us, them.', [
        ['I like Nam. He likes me too.', 'Tôi quý Nam. Bạn ấy cũng quý tôi.', 'me'],
        ['We often help them.', 'Chúng tôi thường giúp họ.', 'them'],
      ]),
    card(32, 2, 'After prepositions', 'Sau giới từ',
      'After with, for, to, at, use an object pronoun.',
      'Sau giới từ with, for, to, at dùng đại từ tân ngữ.', [
        ['Please wait for us at the gate.', 'Hãy đợi chúng tôi ở cổng.', 'us'],
        ['Come to the party with me.', 'Đi dự tiệc với tôi nhé.', 'with me'],
      ]),
    card(32, 3, 'Possessive adjectives', 'Tính từ sở hữu',
      'my, your, his, her, its, our, their + noun.',
      'my (của tôi), your (của bạn), his (của anh ấy), her (của cô ấy), its (của nó), our (của chúng tôi), their (của họ) + danh từ.', [
        ['Lan has lost her keys.', 'Lan làm mất chìa khóa của mình.', 'her'],
        ['They are cleaning their classroom.', 'Họ đang dọn lớp học của họ.', 'their'],
      ]),
    card(32, 4, 'Possessive pronouns', 'Đại từ sở hữu',
      'mine, yours, his, hers, ours, theirs stand alone. No noun after them.',
      'mine, yours, his, hers, ours, theirs đứng một mình, không có danh từ theo sau.', [
        ["This isn't my pen. It's yours.", 'Đây không phải bút của tôi. Nó là của bạn.', 'yours'],
        ['That bike is his, not mine.', 'Xe đạp đó của bạn ấy, không phải của tôi.', 'mine'],
      ], { en: "Never write your's, her's or their's.", vi: "Không bao giờ viết your's, her's hay their's." }),
    card(32, 5, "its or it's?", "its hay it's?",
      "its = belonging to it (no apostrophe). it's = it is.",
      "its = của nó (không có dấu nháy). it's = it is (nó là).", [
        ['The dog is wagging its tail.', 'Con chó đang vẫy đuôi.', 'its'],
        ["It's raining. Take an umbrella.", 'Trời đang mưa. Mang ô đi.', "It's"],
      ]),
    card(32, 6, 'My friend and I', 'Bạn tôi và tôi',
      'As the subject say "my friend and I". As the object say "my friend and me".',
      'Làm chủ ngữ nói "my friend and I". Làm tân ngữ nói "my friend and me".', [
        ['My brother and I love video games.', 'Anh tôi và tôi mê trò chơi điện tử.', 'My brother and I'],
        ['Grandma took my brother and me to the zoo.', 'Bà đưa anh tôi và tôi đi sở thú.', 'my brother and me'],
      ]),
  ],
  33: [
    card(33, 1, 'Clothes', 'Quần áo',
      'hoodie, sweater, jeans, tracksuit, raincoat, pyjamas.',
      'hoodie (áo nỉ có mũ), sweater (áo len), jeans (quần bò), tracksuit (đồ thể thao), raincoat (áo mưa), pyjamas (đồ ngủ).', [
        ['Grandma knitted me a red sweater.', 'Bà đan cho tôi chiếc áo len đỏ.', 'sweater'],
        ['Put on your pyjamas and go to bed.', 'Mặc đồ ngủ vào rồi đi ngủ.', 'pyjamas'],
      ], { en: 'jeans, pyjamas and trousers are always plural: My jeans are new.', vi: 'jeans, pyjamas, trousers luôn ở số nhiều: My jeans are new.' }),
    card(33, 2, 'Shoes and accessories', 'Giày dép và phụ kiện',
      'scarf, gloves, belt, sunglasses, trainers, boots.',
      'scarf (khăn quàng), gloves (găng tay), belt (thắt lưng), sunglasses (kính râm), trainers (giày thể thao), boots (bốt).', [
        ['Wear a scarf. It\'s cold.', 'Quàng khăn vào. Trời lạnh đấy.', 'scarf'],
        ['I need new trainers for running.', 'Tôi cần giày thể thao mới để chạy.', 'trainers'],
      ]),
    card(33, 3, 'Patterns', 'Họa tiết',
      'striped = with lines, spotted = with dots.',
      'striped = có sọc, spotted = có chấm bi.', [
        ['He is wearing a striped shirt.', 'Anh ấy mặc áo sơ mi sọc.', 'striped'],
        ['She has a red spotted dress.', 'Cô ấy có váy đỏ chấm bi.', 'spotted'],
      ]),
    card(33, 4, 'How clothes feel', 'Cảm giác khi mặc',
      'tight ↔ loose. comfortable = nice to wear. fashionable = modern and popular.',
      'tight (chật) ↔ loose (rộng). comfortable (thoải mái). fashionable (hợp thời trang).', [
        ['These jeans are too tight.', 'Quần bò này chật quá.', 'tight'],
        ['These trainers are very comfortable.', 'Đôi giày này rất thoải mái.', 'comfortable'],
      ]),
    card(33, 5, 'Putting clothes on and off', 'Mặc vào và cởi ra',
      'put on ↔ take off. get dressed = put on all your clothes. wear = have clothes on.',
      'put on (mặc vào) ↔ take off (cởi ra). get dressed (mặc quần áo). wear (đang mặc).', [
        ['Put on your coat. It\'s cold outside.', 'Mặc áo khoác vào. Ngoài trời lạnh.', 'Put on'],
        ['Please take off your shoes.', 'Vui lòng cởi giày ra.', 'take off'],
        ['We wear a uniform at school.', 'Chúng tôi mặc đồng phục ở trường.', 'wear'],
      ]),
    card(33, 6, 'fit or suit?', 'fit hay suit?',
      'fit = the right size. suit = looks good on you.',
      'fit = vừa cỡ. suit = hợp, trông đẹp khi mặc.', [
        ["These shoes don't fit. They're too small.", 'Đôi giày này không vừa. Nhỏ quá.', 'fit'],
        ['That colour really suits you!', 'Màu đó rất hợp với bạn!', 'suits'],
      ]),
  ],
};
