import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(18);

export const learnCards: Record<number, LearnCard[]> = {
  52: [
    card(52, 1, 'Irregular past participles', 'Quá khứ phân từ bất quy tắc',
      'Present Perfect = have/has + past participle. Learn the third form of irregular verbs: break – broke – broken, ride – rode – ridden, fly – flew – flown.',
      'Hiện tại hoàn thành = have/has + quá khứ phân từ. Hãy học cột 3 của động từ bất quy tắc: break – broke – broken, ride – rode – ridden, fly – flew – flown.', [
        ['Lan has broken her leg.', 'Lan bị gãy chân.', 'broken'],
        ['Have you ever ridden a horse?', 'Bạn đã bao giờ cưỡi ngựa chưa?', 'ridden'],
        ['My sister has never flown on a plane.', 'Chị tôi chưa bao giờ đi máy bay.', 'flown'],
      ], { en: 'Some verbs have the same past and participle: lose – lost – lost, find – found – found.', vi: 'Một số động từ có cột 2 và cột 3 giống nhau: lose – lost – lost, find – found – found.' }),
    card(52, 2, 'A past action with a result now', 'Việc đã xảy ra, kết quả ở hiện tại',
      'Use the Present Perfect when a past action is important now. We don\'t say when it happened.',
      'Dùng hiện tại hoàn thành khi việc đã xảy ra còn ảnh hưởng đến hiện tại. Không nói rõ thời điểm.', [
        ['Oh no! I have lost my phone.', 'Ôi không! Tôi làm mất điện thoại rồi.', 'have lost'],
        ['The children have eaten all the biscuits.', 'Bọn trẻ ăn hết bánh quy rồi.', 'have eaten'],
      ]),
    card(52, 3, 'been or gone', 'been hay gone',
      'has gone to = went there and is still there. has been to = went there and came back.',
      'has gone to = đã đi và vẫn đang ở đó. has been to = đã đến đó và đã quay về.', [
        ["Dad has gone to the market. He'll be back at ten.", 'Bố đi chợ rồi. Mười giờ bố sẽ về.', 'gone'],
        ['I have been to Hue three times.', 'Tôi đã đến Huế ba lần.', 'been'],
      ]),
    card(52, 4, 'just and already', 'just và already',
      'just = a moment ago. already = sooner than expected. Both go between have/has and the past participle.',
      'just = vừa mới. already = đã … rồi (sớm hơn mong đợi). Cả hai đứng giữa have/has và quá khứ phân từ.', [
        ["We've just finished lunch.", 'Chúng tôi vừa ăn trưa xong.', 'just'],
        ['Minh has already done his homework.', 'Minh đã làm xong bài tập rồi.', 'already'],
      ]),
    card(52, 5, 'yet', 'yet',
      'yet goes at the end of questions and negative sentences.',
      'yet (chưa) đứng cuối câu hỏi và câu phủ định.', [
        ['Has the bus left yet?', 'Xe buýt đã đi chưa?', 'yet'],
        ["I haven't seen the film yet.", 'Tôi vẫn chưa xem bộ phim đó.', "haven't seen"],
      ]),
    card(52, 6, 'ever, never and the best … ever', 'ever, never và the best … ever',
      'ever = at any time in your life (questions). never = not at any time. superlative + have/has ever + past participle.',
      'ever = đã từng (câu hỏi). never = chưa bao giờ. so sánh nhất + have/has ever + quá khứ phân từ.', [
        ['Have you ever tried durian?', 'Bạn đã bao giờ ăn sầu riêng chưa?', 'ever tried'],
        ['This is the best film I have ever seen.', 'Đây là bộ phim hay nhất tôi từng xem.', 'have ever seen'],
      ]),
  ],
  53: [
    card(53, 1, 'for and since', 'for và since',
      'for + a length of time (three years, ages, a long time). since + a starting point (2018, Tết, last Monday).',
      'for + khoảng thời gian (three years, ages, a long time). since + mốc thời gian (2018, Tết, last Monday).', [
        ['Minh has played the guitar for three years.', 'Minh chơi ghi-ta được ba năm rồi.', 'for three years'],
        ["I haven't seen my cousins since Tết.", 'Từ Tết đến giờ tôi chưa gặp các anh chị họ.', 'since Tết'],
      ]),
    card(53, 2, 'since + a past clause', 'since + mệnh đề quá khứ',
      'After since you can use a clause in the Past Simple.',
      'Sau since có thể dùng một mệnh đề ở thì quá khứ đơn.', [
        ['Mai has had her cat since she was nine.', 'Mai nuôi con mèo từ năm chín tuổi.', 'since she was nine'],
        ['We have lived here since we moved to Da Nang.', 'Chúng tôi sống ở đây từ khi chuyển đến Đà Nẵng.', 'since we moved'],
      ]),
    card(53, 3, 'How long …?', 'How long …?',
      'How long + have/has + subject + past participle? asks about the time from the start until now.',
      'How long + have/has + chủ ngữ + quá khứ phân từ? hỏi từ lúc bắt đầu đến nay được bao lâu.', [
        ['How long have you known your best friend?', 'Bạn quen bạn thân được bao lâu rồi?', 'How long have you known'],
        ['How long has your brother had his motorbike?', 'Anh bạn có xe máy được bao lâu rồi?', 'How long has'],
      ]),
    card(53, 4, 'When …? and ago', 'When …? và ago',
      'When asks about a finished time: use the Past Simple. ago counts back from now: three years ago.',
      'When hỏi thời điểm đã qua: dùng quá khứ đơn. ago tính ngược từ bây giờ: three years ago (cách đây ba năm).', [
        ['When did you start learning English?', 'Bạn bắt đầu học tiếng Anh khi nào?', 'When did'],
        ['My family moved to Hanoi five years ago.', 'Gia đình tôi chuyển ra Hà Nội cách đây năm năm.', 'five years ago'],
      ], { en: 'Never say When have you …? Say When did you …?', vi: 'Không nói When have you …? Hãy nói When did you …?' }),
    card(53, 5, 'Present Perfect or Past Simple?', 'Hiện tại hoàn thành hay quá khứ đơn?',
      'Present Perfect: the situation continues now (since, for, How long). Past Simple: finished time (last summer, in 2019, ago).',
      'Hiện tại hoàn thành: tình huống vẫn còn tiếp diễn (since, for, How long). Quá khứ đơn: thời gian đã kết thúc (last summer, in 2019, ago).', [
        ['Nam has studied at this school since Grade 6.', 'Nam học ở trường này từ lớp 6.', 'has studied'],
        ['We visited Phu Quoc last summer.', 'Hè năm ngoái chúng tôi đi Phú Quốc.', 'visited'],
      ]),
    card(53, 6, 'One story, two tenses', 'Một câu chuyện, hai thì',
      'The start is a finished event (Past Simple + ago). The situation since then continues (Present Perfect + for).',
      'Thời điểm bắt đầu là việc đã qua (quá khứ đơn + ago). Tình huống từ đó đến nay vẫn tiếp diễn (hiện tại hoàn thành + for).', [
        ['Lan started piano lessons two years ago.', 'Lan bắt đầu học piano cách đây hai năm.', 'two years ago'],
        ['She has played the piano for two years.', 'Cô ấy đã chơi piano được hai năm.', 'has played'],
      ]),
  ],
  54: [
    card(54, 1, 'People at school', 'Con người ở trường',
      'head teacher, class monitor, librarian, security guard, school nurse, tutor.',
      'head teacher (hiệu trưởng), class monitor (lớp trưởng), librarian (thủ thư), security guard (bảo vệ), school nurse (nhân viên y tế), tutor (gia sư).', [
        ['Lan is our class monitor this year.', 'Năm nay Lan là lớp trưởng của chúng tôi.', 'class monitor'],
        ['The security guard opens the school gate at 6:30.', 'Chú bảo vệ mở cổng trường lúc 6 giờ 30.', 'security guard'],
      ]),
    card(54, 2, 'Places at school', 'Các nơi trong trường',
      'canteen, playground, science lab, school hall, staff room, computer room.',
      'canteen (căng tin), playground (sân trường), science lab (phòng thí nghiệm), school hall (hội trường), staff room (phòng giáo viên), computer room (phòng máy tính).', [
        ['We have lunch in the canteen.', 'Chúng tôi ăn trưa ở căng tin.', 'canteen'],
        ['We wear safety glasses in the science lab.', 'Chúng tôi đeo kính bảo hộ trong phòng thí nghiệm.', 'science lab'],
      ]),
    card(54, 3, 'Studying and exams', 'Học tập và thi cử',
      'exam, revise, mark, cheat, school report, project.',
      'exam (kỳ thi), revise (ôn bài), mark (điểm), cheat (quay cóp), school report (học bạ, sổ liên lạc), project (dự án).', [
        ['I need to revise for my History test.', 'Tôi cần ôn bài kiểm tra Lịch sử.', 'revise'],
        ['I got a mark of 9 in Maths.', 'Tôi được 9 điểm Toán.', 'mark'],
      ]),
    card(54, 4, 'School life', 'Đời sống học đường',
      'uniform, break time, absent, detention, school trip, put up your hand.',
      'uniform (đồng phục), break time (giờ ra chơi), absent (vắng mặt), detention (phạt ở lại), school trip (chuyến dã ngoại), put up your hand (giơ tay).', [
        ['Nam was absent yesterday because he was ill.', 'Hôm qua Nam nghỉ học vì bị ốm.', 'absent'],
        ['Put up your hand if you know the answer.', 'Em nào biết câu trả lời thì giơ tay.', 'Put up your hand'],
      ]),
    card(54, 5, 'Verbs for tests', 'Động từ về kiểm tra',
      'take an exam, revise for a test, get a good mark, pass or fail, cheat in a test.',
      'take an exam (dự thi), revise for a test (ôn thi), get a good mark (được điểm cao), pass (đỗ) / fail (trượt), cheat in a test (quay cóp).', [
        ['Grade 9 students take an exam to get into high school.', 'Học sinh lớp 9 thi vào cấp ba.', 'take an exam'],
        ["Don't cheat in the test.", 'Đừng quay cóp trong giờ kiểm tra.', 'cheat'],
      ], { en: 'take an exam = do it; pass an exam = succeed in it.', vi: 'take an exam = đi thi; pass an exam = thi đỗ.' }),
    card(54, 6, 'Talking about your school', 'Nói về trường của bạn',
      'Use school words to describe your day.',
      'Dùng từ vựng về trường học để kể về một ngày của bạn.', [
        ['Our uniform is a white shirt and blue trousers.', 'Đồng phục của chúng tôi là áo sơ mi trắng và quần xanh.', 'uniform'],
        ['We play football at break time.', 'Chúng tôi đá bóng vào giờ ra chơi.', 'break time'],
        ['Our school trip to the Temple of Literature was great.', 'Chuyến tham quan Văn Miếu của trường rất tuyệt.', 'school trip'],
      ]),
  ],
};
