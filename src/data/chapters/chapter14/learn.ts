import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(14);

export const learnCards: Record<number, LearnCard[]> = {
  40: [
    card(40, 1, 'Imperatives', 'Câu mệnh lệnh',
      'Start with the base verb to give instructions. There is no subject.',
      'Bắt đầu bằng động từ nguyên mẫu để ra lệnh, hướng dẫn. Không có chủ ngữ.', [
        ['Wash your hands before lunch.', 'Rửa tay trước khi ăn trưa.', 'Wash'],
        ['Be quiet, please!', 'Trật tự nào!', 'Be quiet'],
      ]),
    card(40, 2, "Don't and Let's", "Don't và Let's",
      "Don't + base verb = do not do it. Let's + base verb = a suggestion for us.",
      "Don't + động từ = đừng làm. Let's + động từ = chúng ta hãy cùng làm.", [
        ["Don't run in the corridor!", 'Đừng chạy ngoài hành lang!', "Don't run"],
        ["Let's go to the cinema tonight!", 'Tối nay đi xem phim đi!', "Let's go"],
      ]),
    card(40, 3, 'Verb + to + base verb', 'Động từ + to + động từ nguyên mẫu',
      'want, need, hope, decide, plan + to + base verb.',
      'want (muốn), need (cần), hope (hy vọng), decide (quyết định), plan (dự định) + to + động từ.', [
        ['I want to be a doctor.', 'Tôi muốn làm bác sĩ.', 'to be'],
        ['They decided to go to Da Lat.', 'Họ quyết định đi Đà Lạt.', 'to go'],
      ]),
    card(40, 4, 'Verb + -ing', 'Động từ + -ing',
      "enjoy, finish, don't mind, be good at, be interested in + verb-ing.",
      "enjoy (thích), finish (hoàn thành), don't mind (không ngại), be good at (giỏi), be interested in (quan tâm) + động từ-ing.", [
        ['Mai enjoys listening to music.', 'Mai thích nghe nhạc.', 'listening'],
        ['Nam is good at drawing.', 'Nam vẽ giỏi.', 'drawing'],
        ["I don't mind washing the dishes.", 'Tôi không ngại rửa bát.', 'washing'],
      ], { en: 'After a preposition (at, in, for), always use -ing.', vi: 'Sau giới từ (at, in, for) luôn dùng động từ-ing.' }),
    card(40, 5, "I'd like", "I'd like",
      "I'd like + noun or I'd like + to + base verb: a polite way to ask for something.",
      "I'd like + danh từ hoặc I'd like + to + động từ: cách nói lịch sự điều mình muốn.", [
        ["I'd like a glass of water, please.", 'Cho tôi một cốc nước nhé.', "I'd like"],
        ['Would you like to come with us?', 'Bạn có muốn đi cùng chúng tôi không?', 'to come'],
      ], { en: "I'd like = I would like. I like = I enjoy it in general.", vi: "I'd like = tôi muốn (lúc này). I like = tôi thích (nói chung)." }),
    card(40, 6, 'to for a reason', 'to chỉ mục đích',
      'Use to + base verb to say why you do something.',
      'Dùng to + động từ để nói lý do, mục đích làm việc gì.', [
        ['I went to the shop to buy some milk.', 'Tôi ra cửa hàng để mua sữa.', 'to buy'],
        ['She studies hard to pass the exam.', 'Cô ấy học chăm để thi đỗ.', 'to pass'],
      ], { en: 'Say to buy, not for buy.', vi: 'Nói to buy, không nói for buy.' }),
  ],
  41: [
    card(41, 1, 'in, on, at for place', 'in, on, at chỉ nơi chốn',
      'in = inside (a box, a room, a city). on = on a surface (a table, a wall, a floor). at = at a point (home, the bus stop, the door).',
      'in = bên trong (hộp, phòng, thành phố). on = trên bề mặt (bàn, tường, tầng). at = tại một điểm (nhà, bến xe, cửa).', [
        ['The keys are in my bag.', 'Chìa khóa ở trong cặp tôi.', 'in'],
        ['There is a picture on the wall.', 'Có một bức tranh trên tường.', 'on'],
        ["Let's meet at the bus stop.", 'Gặp nhau ở bến xe buýt nhé.', 'at the bus stop'],
      ]),
    card(41, 2, 'in, on, at for time', 'in, on, at chỉ thời gian',
      'at + clock times; on + days and dates; in + months, years, seasons and parts of the day.',
      'at + giờ; on + thứ, ngày tháng; in + tháng, năm, mùa, buổi trong ngày.', [
        ["The film starts at seven o'clock.", 'Phim bắt đầu lúc bảy giờ.', 'at'],
        ['We have English on Monday.', 'Chúng tôi học tiếng Anh vào thứ Hai.', 'on Monday'],
        ['My birthday is in July.', 'Sinh nhật tôi vào tháng Bảy.', 'in July'],
      ], { en: 'in the morning, but at night; on Saturday morning.', vi: 'in the morning nhưng at night; on Saturday morning.' }),
    card(41, 3, 'Position', 'Vị trí',
      'next to, between, opposite, behind, in front of.',
      'next to (bên cạnh), between (ở giữa), opposite (đối diện), behind (phía sau), in front of (phía trước).', [
        ['The bank is between the café and the bookshop.', 'Ngân hàng ở giữa quán cà phê và hiệu sách.', 'between'],
        ['My house is opposite the school.', 'Nhà tôi đối diện trường học.', 'opposite'],
        ['There is a tree in front of our house.', 'Có một cái cây trước nhà tôi.', 'in front of'],
      ], { en: 'Say next to and in front of, but opposite with no of.', vi: 'Nói next to, in front of, nhưng opposite không có of.' }),
    card(41, 4, 'Moving across and through', 'Băng qua và xuyên qua',
      'across = from one side to the other. through = in one end and out the other. along = following a line.',
      'across = từ bên này sang bên kia. through = xuyên qua. along = dọc theo.', [
        ['Walk across the road at the zebra crossing.', 'Đi qua đường ở vạch kẻ đường.', 'across'],
        ['The train went through a long tunnel.', 'Tàu đi xuyên qua một đường hầm dài.', 'through'],
        ['We walked along the river.', 'Chúng tôi đi dạo dọc bờ sông.', 'along'],
      ]),
    card(41, 5, 'Moving in, out, up and down', 'Vào, ra, lên, xuống',
      'into ↔ out of, up ↔ down, onto ↔ off.',
      'into (vào trong) ↔ out of (ra khỏi), up (lên) ↔ down (xuống), onto (lên trên) ↔ off (rời khỏi).', [
        ['The cat jumped into the box.', 'Con mèo nhảy vào hộp.', 'into'],
        ['Nam ran out of the classroom.', 'Nam chạy ra khỏi lớp.', 'out of'],
        ['She climbed up the stairs.', 'Cô ấy leo lên cầu thang.', 'up'],
      ]),
    card(41, 6, 'over and under', 'over và under',
      'over = above something, from one side to the other. under = below something.',
      'over = vượt qua phía trên. under = phía dưới.', [
        ['The horse jumped over the fence.', 'Con ngựa nhảy qua hàng rào.', 'over'],
        ['The boat sailed under the bridge.', 'Con thuyền đi dưới gầm cầu.', 'under'],
      ]),
  ],
  42: [
    card(42, 1, 'Devices', 'Thiết bị',
      'laptop, screen, keyboard, charger, headphones, printer.',
      'laptop (máy tính xách tay), screen (màn hình), keyboard (bàn phím), charger (bộ sạc), headphones (tai nghe), printer (máy in).', [
        ['I do my homework on my laptop.', 'Tôi làm bài tập trên máy tính xách tay.', 'laptop'],
        ['Can I borrow your charger?', 'Cho mình mượn bộ sạc nhé?', 'charger'],
      ]),
    card(42, 2, 'On the internet', 'Trên mạng',
      'website, password, download, search, app, online.',
      'website (trang web), password (mật khẩu), download (tải xuống), search (tìm kiếm), app (ứng dụng), online (trực tuyến).', [
        ['This app helps me learn English.', 'Ứng dụng này giúp tôi học tiếng Anh.', 'app'],
        ['Never tell anyone your password.', 'Đừng bao giờ cho ai biết mật khẩu.', 'password'],
      ]),
    card(42, 3, 'Communicating', 'Giao tiếp',
      'reply, chat, post, comment, video call, emoji.',
      'reply (trả lời), chat (trò chuyện), post (đăng bài), comment (bình luận), video call (gọi video), emoji (biểu tượng cảm xúc).', [
        ['Please reply to my email soon.', 'Hãy sớm trả lời email của mình nhé.', 'reply'],
        ['I have a video call with Grandma every Sunday.', 'Chủ nhật nào tôi cũng gọi video cho bà.', 'video call'],
      ]),
    card(42, 4, 'Tech problems', 'Sự cố công nghệ',
      'battery, Wi-Fi, delete, save, log in, virus.',
      'battery (pin), Wi-Fi (mạng không dây), delete (xóa), save (lưu), log in (đăng nhập), virus (vi-rút).', [
        ['My phone battery is low.', 'Pin điện thoại của tôi sắp hết.', 'battery'],
        ["Don't forget to save your work!", 'Đừng quên lưu bài!', 'save'],
      ]),
    card(42, 5, 'Staying safe online', 'An toàn trên mạng',
      "Use a strong password, don't open strange emails and don't share personal information.",
      'Dùng mật khẩu mạnh, không mở email lạ và không chia sẻ thông tin cá nhân.', [
        ["Don't open that email. It may have a virus.", 'Đừng mở email đó. Có thể có vi-rút.', 'virus'],
        ['Log in with your school email.', 'Đăng nhập bằng email của trường.', 'Log in'],
      ]),
    card(42, 6, 'Verbs with technology', 'Động từ với công nghệ',
      'download a game, post a photo, search for information, delete a file, save your work.',
      'download a game (tải trò chơi), post a photo (đăng ảnh), search for information (tìm thông tin), delete a file (xóa tệp), save your work (lưu bài).', [
        ['I downloaded a new game.', 'Tôi đã tải một trò chơi mới.', 'downloaded'],
        ['She posted a photo of her cat.', 'Cô ấy đăng ảnh con mèo.', 'posted'],
        ['I searched for pictures of pandas.', 'Tôi tìm ảnh gấu trúc.', 'searched for'],
      ]),
  ],
};
