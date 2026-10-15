import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(15);

export const learnCards: Record<number, LearnCard[]> = {
  43: [
    card(43, 1, 'Present Simple: uses', 'Hiện tại đơn: cách dùng',
      'Use Present Simple for habits, routines, facts and timetables.',
      'Dùng hiện tại đơn cho thói quen, công việc hằng ngày, sự thật và lịch trình cố định.', [
        ['My dad watches the news every evening.', 'Bố tôi xem thời sự mỗi tối.', 'watches'],
        ['Water boils at 100 degrees Celsius.', 'Nước sôi ở 100 độ C.', 'boils'],
        ['The school bus leaves at 6.45.', 'Xe buýt của trường khởi hành lúc 6 giờ 45.', 'leaves'],
      ]),
    card(43, 2, 'He / she / it spelling', 'Chính tả ngôi thứ ba số ít',
      'Add -s (plays); -es after ch, sh, s, x, o (watches, fixes, goes); consonant + y → -ies (studies). have → has.',
      'Thêm -s (plays); thêm -es sau ch, sh, s, x, o (watches, fixes, goes); phụ âm + y → -ies (studies). have → has.', [
        ['Lan studies English at a language centre.', 'Lan học tiếng Anh ở trung tâm ngoại ngữ.', 'studies'],
        ['My uncle fixes old bikes at weekends.', 'Chú tôi sửa xe đạp cũ vào cuối tuần.', 'fixes'],
        ['Minh plays the guitar after school.', 'Minh chơi ghi-ta sau giờ học.', 'plays'],
      ], { en: 'Vowel + y just adds -s: play → plays, buy → buys.', vi: 'Nguyên âm + y chỉ thêm -s: play → plays, buy → buys.' }),
    card(43, 3, 'Negatives and questions', 'Phủ định và câu hỏi',
      "don't/doesn't + base verb. Questions: (Wh-word +) do/does + subject + base verb.",
      "don't/doesn't + động từ nguyên mẫu. Câu hỏi: (từ để hỏi +) do/does + chủ ngữ + động từ nguyên mẫu.", [
        ["Nam doesn't like spicy food.", 'Nam không thích đồ ăn cay.', "doesn't like"],
        ['Where does your mum work?', 'Mẹ bạn làm việc ở đâu?', 'does your mum work'],
        ['How often do you visit your grandparents?', 'Bạn có hay về thăm ông bà không?', 'How often do you'],
      ], { en: 'After does, the verb has no -s: Does he work? (not Does he works?)', vi: 'Sau does, động từ không thêm -s: Does he work? (không nói Does he works?)' }),
    card(43, 4, 'Frequency adverbs', 'Trạng từ chỉ tần suất',
      'always, usually, often, sometimes, rarely, never go before the main verb but after be.',
      'always, usually, often, sometimes, rarely, never đứng trước động từ thường nhưng sau động từ be.', [
        ['Minh always does his homework before dinner.', 'Minh luôn làm bài tập trước bữa tối.', 'always does'],
        ['We are never late for class.', 'Chúng tôi không bao giờ đi học muộn.', 'are never'],
      ]),
    card(43, 5, 'there is / there are', 'there is / there are',
      'there is + singular or uncountable noun; there are + plural noun. some in positives, any in negatives and questions.',
      'there is + danh từ số ít hoặc không đếm được; there are + danh từ số nhiều. Khẳng định dùng some, phủ định và câu hỏi dùng any.', [
        ['There is some milk in the fridge.', 'Có một ít sữa trong tủ lạnh.', 'There is some'],
        ["There aren't any eggs left.", 'Không còn quả trứng nào.', "There aren't any"],
        ['Are there any good cafés near your school?', 'Gần trường bạn có quán cà phê nào ngon không?', 'Are there any'],
      ]),
    card(43, 6, 'How many / How much … is there?', 'How many / How much … is there?',
      'How many + plural noun + are there? How much + uncountable noun + is there?',
      'How many + danh từ số nhiều + are there? How much + danh từ không đếm được + is there?', [
        ['How many students are there in your class?', 'Lớp bạn có bao nhiêu học sinh?', 'are there'],
        ['How much homework is there for tomorrow?', 'Ngày mai có bao nhiêu bài tập?', 'is there'],
      ], { en: "there is = something exists; it is = describing a thing you mentioned: There's a new cinema. It's very big.", vi: "there is = có cái gì đó; it is = miêu tả vật đã nhắc đến: There's a new cinema. It's very big." }),
  ],
  44: [
    card(44, 1, 'Actions happening now', 'Hành động đang diễn ra',
      'am/is/are + verb-ing for actions in progress now. Negative: am not / isn\'t / aren\'t + verb-ing.',
      'am/is/are + động từ-ing cho hành động đang diễn ra. Phủ định: am not / isn\'t / aren\'t + động từ-ing.', [
        ['Look! The children are swimming in the river.', 'Nhìn kìa! Bọn trẻ đang bơi dưới sông.', 'are swimming'],
        ["Nam isn't doing his homework now.", 'Bây giờ Nam không làm bài tập.', "isn't doing"],
        ['What are you doing at the moment?', 'Lúc này bạn đang làm gì?', 'are you doing'],
      ]),
    card(44, 2, '-ing spelling', 'Chính tả đuôi -ing',
      'make → making (drop -e); lie → lying (ie → y); swim → swimming, plan → planning (double the last consonant).',
      'make → making (bỏ -e); lie → lying (ie → y); swim → swimming, plan → planning (gấp đôi phụ âm cuối).', [
        ['Grandpa is lying on the sofa.', 'Ông đang nằm trên ghế sofa.', 'lying'],
        ['We are planning a trip to Phu Quoc.', 'Chúng tôi đang lên kế hoạch đi Phú Quốc.', 'planning'],
        ['Mum is making spring rolls.', 'Mẹ đang làm nem.', 'making'],
      ]),
    card(44, 3, 'Temporary situations', 'Tình huống tạm thời',
      'Use Present Continuous for things that are true only for now: this week, this month, these days.',
      'Dùng hiện tại tiếp diễn cho điều chỉ đúng trong thời gian này: this week, this month, these days.', [
        ['My cousin is staying with us this week.', 'Tuần này anh họ tôi ở nhà chúng tôi.', 'is staying'],
        ['My dad is working in Ha Noi this month.', 'Tháng này bố tôi làm việc ở Hà Nội.', 'is working'],
      ]),
    card(44, 4, 'Usual or temporary?', 'Thường ngày hay tạm thời?',
      'Present Simple = usual habit. Present Continuous = a temporary change.',
      'Hiện tại đơn = thói quen thường ngày. Hiện tại tiếp diễn = sự thay đổi tạm thời.', [
        ['Lan usually walks to school, but this week she is taking the bus.', 'Lan thường đi bộ đến trường, nhưng tuần này bạn ấy đi xe buýt.', 'is taking'],
        ['I usually have lunch at school, but today I am having lunch at home.', 'Tôi thường ăn trưa ở trường, nhưng hôm nay tôi ăn ở nhà.', 'usually have'],
      ]),
    card(44, 5, 'State verbs', 'Động từ chỉ trạng thái',
      'know, understand, want, need, own, belong, prefer, remember, agree, recognise describe states, so they stay simple.',
      'know, understand, want, need, own, belong, prefer, remember, agree, recognise chỉ trạng thái nên giữ ở thì đơn.', [
        ['I know the answer to question five.', 'Tôi biết đáp án câu năm.', 'know'],
        ['This blue backpack belongs to Minh.', 'Chiếc ba lô xanh này là của Minh.', 'belongs'],
        ["I don't understand the question.", 'Tôi không hiểu câu hỏi.', "don't understand"],
      ], { en: 'Say I want, not I am wanting, even with now.', vi: 'Nói I want, không nói I am wanting, kể cả khi có now.' }),
    card(44, 6, 'Verbs with two meanings', 'Động từ có hai nghĩa',
      'think (opinion) / be thinking (using your mind); have (own) / be having (eat, enjoy); taste (flavour) / be tasting (trying).',
      'think (ý kiến) / be thinking (đang suy nghĩ); have (sở hữu) / be having (đang ăn, đang tận hưởng); taste (có vị) / be tasting (đang nếm).', [
        ['I think your new haircut looks great.', 'Tớ nghĩ kiểu tóc mới của cậu trông rất đẹp.', 'think'],
        ['Right now, Lan is thinking about her trip.', 'Lúc này Lan đang nghĩ về chuyến đi.', 'is thinking'],
        ['We are having a great time in Nha Trang!', 'Chúng tôi đang có khoảng thời gian tuyệt vời ở Nha Trang!', 'are having'],
      ]),
  ],
  45: [
    card(45, 1, 'Family relations', 'Quan hệ gia đình',
      'twin, only child, stepfather, stepsister, great-grandmother, generation.',
      'twin (sinh đôi), only child (con một), stepfather (bố dượng), stepsister (chị/em gái kế), great-grandmother (cụ bà), generation (thế hệ).', [
        ['Mai and Lan are twins.', 'Mai và Lan là chị em sinh đôi.', 'twins'],
        ['I am an only child.', 'Tôi là con một.', 'only child'],
        ['Three generations live in our house.', 'Ba thế hệ sống trong nhà tôi.', 'generations'],
      ]),
    card(45, 2, 'Step- and great-', 'Step- và great-',
      'step- = family through a new marriage (stepfather, stepsister). great- = one more generation back (great-grandmother).',
      'step- = quan hệ qua cuộc hôn nhân mới (stepfather, stepsister). great- = lùi thêm một thế hệ (great-grandmother).', [
        ['My stepfather is very kind to me.', 'Bố dượng rất tốt với tôi.', 'stepfather'],
        ['My great-grandmother is ninety-five.', 'Cụ bà tôi chín mươi lăm tuổi.', 'great-grandmother'],
      ]),
    card(45, 3, 'Life events', 'Sự kiện trong đời',
      'be born, grow up, get married, wedding, anniversary, move house.',
      'be born (được sinh ra), grow up (lớn lên), get married (kết hôn), wedding (đám cưới), anniversary (ngày kỷ niệm), move house (chuyển nhà).', [
        ['I was born in Hai Phong in 2012.', 'Tôi sinh ra ở Hải Phòng năm 2012.', 'was born'],
        ['My mum grew up in a small village.', 'Mẹ tôi lớn lên ở một ngôi làng nhỏ.', 'grew up'],
        ['We moved house last year.', 'Năm ngoái nhà tôi chuyển nhà.', 'moved house'],
      ], { en: 'Say I was born (past), not I born or I am born.', vi: 'Nói I was born, không nói I born hay I am born.' }),
    card(45, 4, 'get married and wedding', 'get married và wedding',
      'get married is the action (verb); a wedding is the ceremony and party (noun).',
      'get married là hành động (động từ); wedding là lễ cưới và tiệc cưới (danh từ).', [
        ['My aunt got married last spring.', 'Dì tôi kết hôn mùa xuân năm ngoái.', 'got married'],
        ["We went to my cousin's wedding.", 'Chúng tôi đi dự đám cưới anh họ.', 'wedding'],
      ]),
    card(45, 5, 'Family verbs', 'Động từ về gia đình',
      'look after, take after, get together, argue, apologise, support.',
      'look after (chăm sóc), take after (giống người lớn trong nhà), get together (tụ họp), argue (cãi nhau), apologise (xin lỗi), support (ủng hộ).', [
        ['I look after my little sister.', 'Tôi trông em gái.', 'look after'],
        ['Minh takes after his dad.', 'Minh giống bố.', 'takes after'],
        ['Our whole family gets together at Tết.', 'Cả đại gia đình tôi tụ họp vào dịp Tết.', 'gets together'],
      ], { en: 'look after = take care of; take after = be like an older relative.', vi: 'look after = chăm sóc; take after = giống người lớn trong gia đình.' }),
    card(45, 6, 'People around us', 'Những người quanh ta',
      'penfriend, stranger, guest, host, teammate, member.',
      'penfriend (bạn qua thư), stranger (người lạ), guest (khách), host (chủ nhà), teammate (đồng đội), member (thành viên).', [
        ['I have a penfriend in Australia.', 'Tôi có một người bạn qua thư ở Úc.', 'penfriend'],
        ["Don't get into a car with a stranger.", 'Đừng lên xe người lạ.', 'stranger'],
        ['We had ten guests at my party.', 'Bữa tiệc của tôi có mười vị khách.', 'guests'],
      ], { en: 'The host invites; the guests come.', vi: 'Host là người mời; guest là người được mời đến.' }),
  ],
};
