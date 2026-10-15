import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(17);

export const learnCards: Record<number, LearnCard[]> = {
  49: [
    card(49, 1, 'Past Continuous', 'Thì quá khứ tiếp diễn',
      'was/were + verb-ing: an action in progress at a moment in the past. I/he/she/it was; you/we/they were.',
      'was/were + động từ-ing: hành động đang diễn ra tại một thời điểm trong quá khứ. I/he/she/it dùng was; you/we/they dùng were.', [
        ['At 8 pm yesterday, Lan was doing her homework.', '8 giờ tối qua, Lan đang làm bài tập.', 'was doing'],
        ['The children were playing in the garden.', 'Bọn trẻ đang chơi trong vườn.', 'were playing'],
      ], { en: 'Watch the spelling: lie → lying, make → making, swim → swimming.', vi: 'Chú ý chính tả: lie → lying, make → making, swim → swimming.' }),
    card(49, 2, 'Negatives and questions', 'Phủ định và câu hỏi',
      "Negative: wasn't/weren't + verb-ing. Question: (What) was/were + subject + verb-ing?",
      "Phủ định: wasn't/weren't + động từ-ing. Câu hỏi: (What) was/were + chủ ngữ + động từ-ing?", [
        ["We weren't watching TV at 10 pm.", 'Lúc 10 giờ tối chúng tôi không xem ti vi.', "weren't watching"],
        ['What were you doing at nine last night?', 'Tối qua lúc chín giờ bạn đang làm gì?', 'were you doing'],
        ['Was Minh sleeping? – No, he wasn\'t.', 'Minh đang ngủ à? – Không.', "wasn't"],
      ], { en: "Never say didn't sleeping. Say wasn't sleeping.", vi: "Không nói didn't sleeping. Hãy nói wasn't sleeping." }),
    card(49, 3, 'A long action and a short action', 'Hành động dài và hành động ngắn',
      'The long action (Past Continuous) was in progress when a short action (Past Simple) happened.',
      'Hành động dài (quá khứ tiếp diễn) đang diễn ra thì một hành động ngắn (quá khứ đơn) xen vào.', [
        ['I was reading a comic when my phone rang.', 'Tôi đang đọc truyện tranh thì điện thoại reo.', 'rang'],
        ['When the teacher came in, the students were talking.', 'Khi cô giáo bước vào, học sinh đang nói chuyện.', 'were talking'],
      ]),
    card(49, 4, 'when and while', 'when và while',
      'while + the long action (Past Continuous). when + the short action (Past Simple).',
      'while + hành động dài (quá khứ tiếp diễn). when + hành động ngắn (quá khứ đơn).', [
        ['While I was cycling home, it started to rain.', 'Trong khi tôi đang đạp xe về nhà thì trời bắt đầu mưa.', 'While I was cycling'],
        ['I was cycling home when it started to rain.', 'Tôi đang đạp xe về nhà thì trời bắt đầu mưa.', 'when it started'],
      ], { en: 'When the while-part comes first, put a comma after it.', vi: 'Khi mệnh đề while đứng đầu câu, đặt dấu phẩy sau nó.' }),
    card(49, 5, 'Two actions at the same time', 'Hai hành động cùng lúc',
      'Two long actions in progress at the same time can both use the Past Continuous. It also describes the background of a story.',
      'Hai hành động dài cùng đang diễn ra có thể đều dùng quá khứ tiếp diễn. Thì này cũng dùng để tả bối cảnh câu chuyện.', [
        ['While Mum was cooking, Dad was cleaning the house.', 'Trong khi mẹ nấu ăn thì bố dọn nhà.', 'was cleaning'],
        ['The sun was shining and the birds were singing.', 'Mặt trời đang chiếu sáng và chim đang hót.', 'was shining'],
      ]),
    card(49, 6, 'while or during', 'while hay during',
      'while + subject + verb. during + a noun.',
      'while + chủ ngữ + động từ. during + danh từ.', [
        ['Mai fell asleep while she was watching the film.', 'Mai ngủ quên khi đang xem phim.', 'while she was watching'],
        ['Mai fell asleep during the film.', 'Mai ngủ quên trong lúc xem phim.', 'during the film'],
      ], { en: 'Say during the film, not while the film.', vi: 'Nói during the film, không nói while the film.' }),
  ],
  50: [
    card(50, 1, 'Imperatives', 'Câu mệnh lệnh',
      "Base verb at the start for orders and advice. Don't + base verb to say no. Let's (not) + base verb for suggestions.",
      "Động từ nguyên mẫu đứng đầu để ra lệnh, khuyên. Don't + động từ để cấm. Let's (not) + động từ để rủ rê.", [
        ['Be careful! The floor is wet.', 'Cẩn thận! Sàn nhà ướt.', 'Be careful'],
        ["Don't forget your swimming things!", 'Đừng quên đồ bơi nhé!', "Don't forget"],
        ["Let's not tell anyone about the party.", 'Chúng ta đừng kể với ai về bữa tiệc nhé.', "Let's not tell"],
      ]),
    card(50, 2, 'Verb + to + base verb', 'Động từ + to + động từ nguyên mẫu',
      'decide, promise, refuse, manage, agree, offer, plan, hope, can\'t afford + to + base verb.',
      'decide (quyết định), promise (hứa), refuse (từ chối), manage (xoay xở được), agree (đồng ý), offer (đề nghị), plan (dự định), hope (hy vọng), can\'t afford (không đủ tiền) + to + động từ.', [
        ['Nam decided to join the drama club.', 'Nam quyết định tham gia câu lạc bộ kịch.', 'to join'],
        ['We managed to reach the top of Fansipan.', 'Chúng tôi đã leo được lên đỉnh Fansipan.', 'to reach'],
        ["I can't afford to buy a new laptop.", 'Tôi không đủ tiền mua máy tính mới.', 'to buy'],
      ]),
    card(50, 3, 'Verb + -ing', 'Động từ + -ing',
      "avoid, finish, practise, suggest, keep, imagine, feel like, can't stand, give up + verb-ing.",
      "avoid (tránh), finish (hoàn thành), practise (luyện tập), suggest (gợi ý), keep (cứ, liên tục), imagine (tưởng tượng), feel like (thấy muốn), can't stand (không chịu nổi), give up (bỏ) + động từ-ing.", [
        ['My brother avoids eating junk food.', 'Anh tôi tránh ăn đồ ăn vặt.', 'eating'],
        ['Lan suggested taking the bus.', 'Lan gợi ý đi xe buýt.', 'taking'],
        ['Do you feel like going to the cinema?', 'Bạn có muốn đi xem phim không?', 'going'],
      ]),
    card(50, 4, 'Preposition + -ing', 'Giới từ + -ing',
      'After a preposition (of, in, about, at, without, before, after, by, instead of) the verb takes -ing.',
      'Sau giới từ (of, in, about, at, without, before, after, by, instead of) động từ thêm -ing.', [
        ["I'm tired of eating the same food.", 'Tôi chán ăn mãi một món.', 'eating'],
        ['She left without having breakfast.', 'Cô ấy đi mà không ăn sáng.', 'having'],
        ['I learn new words by watching cartoons.', 'Tôi học từ mới bằng cách xem phim hoạt hình.', 'by watching'],
      ]),
    card(50, 5, 'Verb + person + to', 'Động từ + người + to',
      'tell, ask, want, remind, advise, teach, invite + person + to + base verb. But let / make + person + base verb.',
      'tell, ask, want, remind, advise, teach, invite + người + to + động từ. Nhưng let / make + người + động từ nguyên mẫu (không có to).', [
        ['Mum told me to tidy my room.', 'Mẹ bảo tôi dọn phòng.', 'told me to tidy'],
        ['The doctor advised him to rest.', 'Bác sĩ khuyên anh ấy nghỉ ngơi.', 'advised him to rest'],
        ["My parents won't let me stay out late.", 'Bố mẹ không cho tôi đi chơi khuya.', 'let me stay'],
      ]),
    card(50, 6, '-ing as subject, adjective + to', '-ing làm chủ ngữ, tính từ + to',
      'An activity as the subject takes -ing. After adjectives, too + adjective and adjective + enough, use to + base verb.',
      'Hoạt động làm chủ ngữ dùng -ing. Sau tính từ, too + tính từ và tính từ + enough dùng to + động từ nguyên mẫu.', [
        ['Swimming in the sea is fun.', 'Bơi ở biển rất vui.', 'Swimming'],
        ["It's important to drink enough water.", 'Uống đủ nước là điều quan trọng.', 'to drink'],
        ['This tea is too hot to drink.', 'Trà này nóng quá không uống được.', 'too hot to drink'],
      ]),
  ],
  51: [
    card(51, 1, 'People in sport', 'Con người trong thể thao',
      'captain, coach, referee, fan, opponent, champion.',
      'captain (đội trưởng), coach (huấn luyện viên), referee (trọng tài), fan (người hâm mộ), opponent (đối thủ), champion (nhà vô địch).', [
        ['Minh is the captain of our football team.', 'Minh là đội trưởng đội bóng của chúng tôi.', 'captain'],
        ['The referee showed the player a yellow card.', 'Trọng tài rút thẻ vàng cho cầu thủ.', 'referee'],
      ]),
    card(51, 2, 'Places for sport', 'Nơi chơi thể thao',
      'court, pitch, track, swimming pool, ice rink, golf course.',
      'court (sân cầu lông, quần vợt, bóng rổ), pitch (sân cỏ bóng đá), track (đường chạy), swimming pool (bể bơi), ice rink (sân trượt băng), golf course (sân gôn).', [
        ['The badminton court is next to the gym.', 'Sân cầu lông ở cạnh phòng tập.', 'court'],
        ['The players walked onto the pitch.', 'Các cầu thủ bước ra sân.', 'pitch'],
      ], { en: 'Football is on a pitch; tennis, badminton and basketball are on a court.', vi: 'Bóng đá chơi trên pitch; quần vợt, cầu lông, bóng rổ chơi trên court.' }),
    card(51, 3, 'Equipment', 'Dụng cụ',
      'racket, bat, helmet, goggles, net, trainers.',
      'racket (vợt), bat (gậy), helmet (mũ bảo hiểm), goggles (kính bơi), net (lưới), trainers (giày thể thao).', [
        ['I need a new badminton racket.', 'Tôi cần một cây vợt cầu lông mới.', 'racket'],
        ['Always wear a helmet when you ride a bike.', 'Luôn đội mũ bảo hiểm khi đi xe đạp.', 'helmet'],
      ]),
    card(51, 4, 'Competing', 'Thi đấu',
      'score, beat, draw, cheer, medal, tournament.',
      'score (ghi bàn), beat (thắng ai), draw (hòa), cheer (cổ vũ), medal (huy chương), tournament (giải đấu).', [
        ['Minh scored two goals.', 'Minh ghi hai bàn.', 'scored'],
        ['The two teams drew 2–2.', 'Hai đội hòa 2–2.', 'drew'],
      ]),
    card(51, 5, 'win or beat?', 'win hay beat?',
      'You win a match, a game or a medal. You beat a person or a team.',
      'win + trận đấu, cuộc thi, huy chương. beat + người hoặc đội.', [
        ['Our class beat Class 8B.', 'Lớp chúng tôi thắng lớp 8B.', 'beat'],
        ['She won a gold medal.', 'Cô ấy giành huy chương vàng.', 'won'],
      ], { en: 'beat – beat – beaten; win – won – won; draw – drew – drawn.', vi: 'beat – beat – beaten; win – won – won; draw – drew – drawn.' }),
    card(51, 6, 'Talking about a match', 'Nói về một trận đấu',
      'Use sport words together to tell the story of a match.',
      'Kết hợp các từ về thể thao để kể lại một trận đấu.', [
        ['Thousands of fans came to watch the final.', 'Hàng nghìn người hâm mộ đến xem trận chung kết.', 'fans'],
        ['We cheered when our team scored.', 'Chúng tôi reo hò khi đội nhà ghi bàn.', 'cheered'],
        ['Sixteen schools are taking part in the tournament.', 'Mười sáu trường tham gia giải đấu.', 'tournament'],
      ]),
  ],
};
