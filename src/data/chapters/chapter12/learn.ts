import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(12);

export const learnCards: Record<number, LearnCard[]> = {
  34: [
    card(34, 1, 'who for people', 'who cho người',
      'A relative clause tells us which person we mean. Use who for people.',
      'Mệnh đề quan hệ cho biết ta đang nói về người nào. Dùng who cho người.', [
        ['A dentist is a person who looks after your teeth.', 'Nha sĩ là người chăm sóc răng của bạn.', 'who'],
        ['The girl who sits next to me is from Hue.', 'Bạn nữ ngồi cạnh tôi đến từ Huế.', 'who'],
      ]),
    card(34, 2, 'which for things and animals', 'which cho đồ vật và con vật',
      'Use which for things and animals.',
      'Dùng which cho đồ vật và con vật.', [
        ['A fridge is a machine which keeps food cold.', 'Tủ lạnh là máy giữ thức ăn lạnh.', 'which'],
        ['A camel is an animal which can live in the desert.', 'Lạc đà là con vật có thể sống ở sa mạc.', 'which'],
      ], { en: 'You can also use that for people and things: the girl that sits next to me.', vi: 'Có thể dùng that thay cho who / which: the girl that sits next to me.' }),
    card(34, 3, 'where for places', 'where cho nơi chốn',
      'Use where for places.',
      'Dùng where cho nơi chốn.', [
        ['A library is a place where you can borrow books.', 'Thư viện là nơi bạn có thể mượn sách.', 'where'],
        ['This is the house where I was born.', 'Đây là ngôi nhà nơi tôi sinh ra.', 'where'],
      ]),
    card(34, 4, 'whose for owners', 'whose chỉ sở hữu',
      'whose + noun shows that something belongs to someone.',
      'whose + danh từ chỉ vật / người thuộc về ai đó.', [
        ['That\'s the girl whose brother is in my class.', 'Đó là bạn nữ có anh trai học cùng lớp tôi.', 'whose'],
        ['I have a friend whose dad is a pilot.', 'Tôi có một người bạn có bố là phi công.', 'whose'],
      ]),
    card(34, 5, 'Don\'t repeat the pronoun', 'Không lặp lại đại từ',
      'who / which already takes the place of he, she, it or they.',
      'who / which đã thay cho he, she, it, they, nên không lặp lại.', [
        ['The man who lives next door is a chef.', 'Người đàn ông sống cạnh nhà là đầu bếp.', 'who lives'],
        ['The book which is on the table is mine.', 'Quyển sách ở trên bàn là của tôi.', 'which is'],
      ], { en: 'Say the man who lives here, not the man who he lives here.', vi: 'Nói the man who lives here, không nói the man who he lives here.' }),
    card(34, 6, 'Defining words', 'Giải nghĩa từ',
      'Relative clauses are great for explaining words: A … is a person / thing / place who / which / where …',
      'Mệnh đề quan hệ rất hữu ích để giải nghĩa từ: A … is a person / thing / place who / which / where …', [
        ['A vet is a doctor who looks after animals.', 'Bác sĩ thú y là bác sĩ chăm sóc động vật.', 'who'],
        ['A dictionary is a book which explains words.', 'Từ điển là sách giải thích từ ngữ.', 'which'],
        ['A gym is a place where people do exercise.', 'Phòng tập là nơi mọi người tập thể dục.', 'where'],
      ]),
  ],
  35: [
    card(35, 1, 'The first conditional', 'Câu điều kiện loại 1',
      'If + present simple, will + base verb. It talks about a real possibility in the future.',
      'If + hiện tại đơn, will + động từ nguyên mẫu. Nói về điều có thể xảy ra trong tương lai.', [
        ['If it rains, we will stay at home.', 'Nếu trời mưa, chúng tôi sẽ ở nhà.', 'If it rains'],
        ['If you study hard, you will pass the test.', 'Nếu bạn học chăm, bạn sẽ qua bài kiểm tra.', 'will pass'],
      ]),
    card(35, 2, 'No will after if', 'Không dùng will sau if',
      'The if-clause uses the present simple, even for the future.',
      'Mệnh đề if dùng hiện tại đơn, dù nói về tương lai.', [
        ['If Nam goes to the party, he will have fun.', 'Nếu Nam đi dự tiệc, bạn ấy sẽ rất vui.', 'goes'],
        ['I will call you if I hear the news.', 'Tôi sẽ gọi bạn nếu nghe được tin.', 'hear'],
      ], { en: 'Say if it rains, not if it will rain.', vi: 'Nói if it rains, không nói if it will rain.' }),
    card(35, 3, "won't", "won't",
      "won't = will not. The if-clause can be negative too: don't / doesn't.",
      "won't = will not. Mệnh đề if cũng có thể phủ định: don't / doesn't.", [
        ["If we don't hurry, we won't catch the bus.", 'Nếu không nhanh lên, chúng ta sẽ lỡ xe buýt.', "won't"],
        ["If you don't water the plants, they will die.", 'Nếu bạn không tưới cây, cây sẽ chết.', "don't water"],
      ]),
    card(35, 4, 'The if-clause can come second', 'Mệnh đề if có thể đứng sau',
      'If the if-clause comes first, use a comma. If it comes second, no comma.',
      'Mệnh đề if đứng trước thì có dấu phẩy. Đứng sau thì không cần dấu phẩy.', [
        ['If you ask me, I will help you.', 'Nếu bạn nhờ, tôi sẽ giúp bạn.', 'If you ask me,'],
        ['I will help you if you ask me.', 'Tôi sẽ giúp bạn nếu bạn nhờ.', 'if you ask me'],
      ]),
    card(35, 5, 'Questions', 'Câu hỏi',
      'What will you do if …? Will you … if …?',
      'Bạn sẽ làm gì nếu …? Bạn có … nếu …?', [
        ['What will you do if you win?', 'Bạn sẽ làm gì nếu thắng?', 'What will you do'],
        ['Will you come if I invite you?', 'Bạn có đến nếu tôi mời không?', 'Will you come'],
      ]),
    card(35, 6, 'Warnings and promises', 'Lời cảnh báo và lời hứa',
      'We use the first conditional to warn people and to make promises.',
      'Dùng câu điều kiện loại 1 để cảnh báo và hứa hẹn.', [
        ['If you eat too many sweets, you will feel sick.', 'Nếu ăn quá nhiều kẹo, con sẽ bị mệt.', 'will feel sick'],
        ['If you tidy your room, I will take you to the cinema.', 'Nếu con dọn phòng, mẹ sẽ đưa con đi xem phim.', 'will take you'],
      ]),
  ],
  36: [
    card(36, 1, 'Jobs that help people', 'Nghề giúp đỡ mọi người',
      'dentist, vet, nurse, firefighter, police officer, lifeguard.',
      'dentist (nha sĩ), vet (bác sĩ thú y), nurse (y tá), firefighter (lính cứu hỏa), police officer (cảnh sát), lifeguard (cứu hộ).', [
        ['A vet looks after sick animals.', 'Bác sĩ thú y chăm sóc động vật ốm.', 'vet'],
        ['The firefighters arrived very quickly.', 'Lính cứu hỏa đến rất nhanh.', 'firefighters'],
      ]),
    card(36, 2, 'Creative jobs', 'Nghề sáng tạo',
      'artist, musician, photographer, designer, journalist, actor.',
      'artist (họa sĩ), musician (nhạc sĩ), photographer (nhiếp ảnh gia), designer (nhà thiết kế), journalist (nhà báo), actor (diễn viên).', [
        ['My sister wants to be a fashion designer.', 'Chị tôi muốn làm nhà thiết kế thời trang.', 'designer'],
        ['The journalist wrote a story about our school.', 'Nhà báo viết bài về trường tôi.', 'journalist'],
      ]),
    card(36, 3, 'Building and making', 'Xây dựng và chế tạo',
      'engineer, mechanic, builder, chef, farmer, electrician.',
      'engineer (kỹ sư), mechanic (thợ máy), builder (thợ xây), chef (đầu bếp), farmer (nông dân), electrician (thợ điện).', [
        ['The mechanic fixed our car.', 'Thợ máy đã sửa ô tô cho nhà tôi.', 'mechanic'],
        ['My mum is an engineer.', 'Mẹ tôi là kỹ sư.', 'an engineer'],
      ], { en: 'Use a / an with jobs: She is an engineer. He is a chef.', vi: 'Nói nghề nghiệp phải có a / an: She is an engineer. He is a chef.' }),
    card(36, 4, 'Job endings', 'Đuôi chỉ nghề',
      'Many jobs end in -er, -or, -ist or -ian: farmer, actor, artist, musician.',
      'Nhiều từ chỉ nghề có đuôi -er, -or, -ist, -ian: farmer, actor, artist, musician.', [
        ['farm → farmer, act → actor', 'trang trại → nông dân, diễn → diễn viên', 'farmer'],
        ['art → artist, music → musician', 'nghệ thuật → họa sĩ, âm nhạc → nhạc sĩ', 'musician'],
      ]),
    card(36, 5, 'Talking about work', 'Nói về công việc',
      'salary, boss, office, interview, part-time, retire.',
      'salary (lương), boss (sếp), office (văn phòng), interview (phỏng vấn), part-time (bán thời gian), retire (nghỉ hưu).', [
        ['My brother has a part-time job in a café.', 'Anh tôi làm bán thời gian ở quán cà phê.', 'part-time'],
        ['Grandpa retired when he was sixty.', 'Ông tôi nghỉ hưu năm sáu mươi tuổi.', 'retired'],
      ]),
    card(36, 6, 'Asking about jobs', 'Hỏi về nghề nghiệp',
      'What does she do? = What is her job? What do you want to be?',
      'What does she do? = Cô ấy làm nghề gì? What do you want to be? = Bạn muốn làm nghề gì?', [
        ['What does your dad do? He\'s a pilot.', 'Bố bạn làm nghề gì? Bố tôi là phi công.', 'What does your dad do'],
        ['I want to be a photographer.', 'Tôi muốn trở thành nhiếp ảnh gia.', 'want to be'],
      ]),
  ],
};
