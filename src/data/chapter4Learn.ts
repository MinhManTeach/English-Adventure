import type { LearnCard } from './learnContent';

type Example = readonly [en: string, vi: string, highlight: string];
const card = (unitId: number, n: number, title: string, titleVi: string, ruleEn: string, ruleVi: string,
  examples: readonly Example[], tip?: { en: string; vi: string }): LearnCard => ({
  id: `u${unitId}-c4-card-${n}`, unitId, title, titleVi, ruleEn, ruleVi,
  examples: examples.map(([en, vi, highlight]) => ({ en, vi, highlight })), ...(tip ? { tip } : {}),
});

export const CHAPTER4_LEARN_CARDS: Record<number, LearnCard[]> = {
  10: [
    card(10, 1, 'was or were?', 'was hay were?',
      'Past of be: I / he / she / it → was. You / we / they → were.',
      'Quá khứ của be: I / he / she / it → was. You / we / they → were.', [
        ['I was at the beach yesterday.', 'Hôm qua tôi ở bãi biển.', 'was'],
        ['They were very tired.', 'Họ đã rất mệt.', 'were'],
        ['The film was funny.', 'Bộ phim rất hài hước.', 'was'],
      ]),
    card(10, 2, "wasn't / weren't and questions", "wasn't / weren't và câu hỏi",
      "Say no: wasn't / weren't. Ask: Was …? / Were …? Answer: Yes, I was. / No, they weren't.",
      "Phủ định: wasn't / weren't. Hỏi: Was …? / Were …? Trả lời: Yes, I was. / No, they weren't.", [
        ["Lan wasn't at school yesterday.", 'Hôm qua Lan không đến trường.', "wasn't"],
        ['Were you at home last night?', 'Tối qua bạn có ở nhà không?', 'Were'],
        ["No, I wasn't.", 'Không, tôi không ở nhà.', "wasn't"],
      ]),
    card(10, 3, 'Irregular verbs', 'Động từ bất quy tắc',
      'Some verbs do not add -ed. Learn their past form: go → went, see → saw, eat → ate, buy → bought.',
      'Một số động từ không thêm -ed. Cần học thuộc dạng quá khứ: go → went, see → saw, eat → ate, buy → bought.', [
        ['We went to Ha Long Bay last summer.', 'Hè năm ngoái chúng tôi đã đi vịnh Hạ Long.', 'went'],
        ['I saw a rainbow yesterday.', 'Hôm qua tôi đã thấy cầu vồng.', 'saw'],
        ['Dad bought a new bike.', 'Bố đã mua một chiếc xe đạp mới.', 'bought'],
      ], { en: 'Never say goed or buyed.', vi: 'Không bao giờ nói goed hay buyed.' }),
    card(10, 4, 'More irregular verbs', 'Thêm động từ bất quy tắc',
      'make → made, take → took, write → wrote, swim → swam, win → won, lose → lost, build → built.',
      'make → made (làm), take → took (lấy, chụp), write → wrote (viết), swim → swam (bơi), win → won (thắng), lose → lost (mất, thua), build → built (xây).', [
        ['Mum made a cake for my birthday.', 'Mẹ đã làm bánh cho sinh nhật tôi.', 'made'],
        ['Our team won the match.', 'Đội chúng tôi đã thắng trận.', 'won'],
        ['We built a sandcastle.', 'Chúng tôi đã xây lâu đài cát.', 'built'],
      ]),
    card(10, 5, "didn't and Did with irregular verbs", "didn't và Did với động từ bất quy tắc",
      "After didn't and Did, use the base verb: didn't go, Did you see …?",
      "Sau didn't và Did dùng động từ nguyên mẫu: didn't go, Did you see …?", [
        ["I didn't go to the party.", 'Tôi đã không đi dự tiệc.', "didn't go"],
        ['Did you see the fireworks?', 'Bạn có xem pháo hoa không?', 'Did'],
        ["Yes, I did. / No, I didn't.", 'Có. / Không.', 'did'],
      ], { en: "Say didn't see, not didn't saw.", vi: "Nói didn't see, không nói didn't saw." }),
    card(10, 6, 'was/were or did?', 'was/were hay did?',
      'Use was/were before places, feelings and nouns. Use did with other verbs.',
      'Dùng was/were trước nơi chốn, cảm xúc, danh từ. Dùng did với động từ thường.', [
        ['Were you tired after the race?', 'Bạn có mệt sau cuộc đua không?', 'Were'],
        ['Did you swim in the sea?', 'Bạn có bơi ở biển không?', 'Did'],
      ]),
  ],
  11: [
    card(11, 1, 'In progress in the past', 'Đang diễn ra trong quá khứ',
      'was / were + verb-ing: an action that was in progress at a moment in the past.',
      'was / were + động từ-ing: hành động đang diễn ra tại một thời điểm trong quá khứ.', [
        ['At eight o’clock I was watching TV.', 'Lúc tám giờ tôi đang xem ti vi.', 'was watching'],
        ['The children were playing in the garden.', 'Bọn trẻ đang chơi trong vườn.', 'were playing'],
      ]),
    card(11, 2, 'Moments in the past', 'Thời điểm trong quá khứ',
      'at that moment, at 7 pm yesterday, at this time yesterday → Past Continuous.',
      'at that moment, at 7 pm yesterday, at this time yesterday → quá khứ tiếp diễn.', [
        ['At this time yesterday we were flying to Hue.', 'Giờ này hôm qua chúng tôi đang bay đến Huế.', 'At this time yesterday'],
        ['What were you doing at 9 pm?', 'Lúc 9 giờ tối bạn đang làm gì?', 'at 9 pm'],
      ]),
    card(11, 3, "wasn't / weren't and questions", "wasn't / weren't và câu hỏi",
      "Say no: wasn't / weren't + verb-ing. Ask: Was / Were + subject + verb-ing?",
      "Phủ định: wasn't / weren't + động từ-ing. Hỏi: Was / Were + chủ ngữ + động từ-ing?", [
        ["Nam wasn't sleeping. He was reading.", 'Nam không ngủ. Bạn ấy đang đọc sách.', "wasn't sleeping"],
        ['Were you listening to music?', 'Lúc đó bạn đang nghe nhạc à?', 'Were'],
        ['Yes, I was.', 'Đúng vậy.', 'was'],
      ]),
    card(11, 4, 'A long action and a short action', 'Hành động dài và hành động ngắn',
      'The long action uses Past Continuous. The short action that interrupts it uses Past Simple.',
      'Hành động dài dùng quá khứ tiếp diễn. Hành động ngắn xen vào dùng quá khứ đơn.', [
        ['We were having dinner when the phone rang.', 'Chúng tôi đang ăn tối thì điện thoại reo.', 'were having'],
        ['I was walking home when it began to rain.', 'Tôi đang đi bộ về nhà thì trời bắt đầu mưa.', 'began'],
      ]),
    card(11, 5, 'when or while?', 'when hay while?',
      'when + the short action (Past Simple). while + the long action (Past Continuous).',
      'when + hành động ngắn (quá khứ đơn). while + hành động dài (quá khứ tiếp diễn).', [
        ['I was having a bath when the phone rang.', 'Tôi đang tắm thì điện thoại reo.', 'when'],
        ['The phone rang while I was having a bath.', 'Điện thoại reo trong khi tôi đang tắm.', 'while'],
      ]),
    card(11, 6, 'Finished actions stay simple', 'Việc đã xong dùng quá khứ đơn',
      'Do not use Past Continuous for finished or repeated actions. Use Past Simple.',
      'Không dùng quá khứ tiếp diễn cho việc đã xong hoặc lặp lại nhiều lần. Dùng quá khứ đơn.', [
        ['He fell off his bike three times last month.', 'Tháng trước cậu ấy ngã xe đạp ba lần.', 'fell'],
        ['I tidied my room and then I went out.', 'Tôi dọn phòng rồi đi ra ngoài.', 'tidied'],
      ], { en: 'Say he fell three times, not he was falling three times.', vi: 'Nói he fell three times, không nói he was falling three times.' }),
  ],
  12: [
    card(12, 1, 'My family', 'Gia đình tôi',
      'aunt, uncle, cousin, grandmother, grandfather, relatives.',
      'aunt (cô/dì), uncle (chú/cậu), cousin (anh chị em họ), grandmother (bà), grandfather (ông), relatives (họ hàng).', [
        ['My aunt lives in Da Nang.', 'Cô của tôi sống ở Đà Nẵng.', 'aunt'],
        ['My cousin and I play together at Tet.', 'Em họ và tôi chơi cùng nhau vào dịp Tết.', 'cousin'],
        ['All our relatives come to our house at Tet.', 'Tất cả họ hàng đến nhà chúng tôi vào dịp Tết.', 'relatives'],
      ]),
    card(12, 2, 'Nephew and niece', 'Cháu trai và cháu gái',
      "Your brother's or sister's son is your nephew; their daughter is your niece.",
      'Con trai của anh chị em bạn là nephew (cháu trai); con gái là niece (cháu gái).', [
        ['My aunt gave her nephew a bike.', 'Cô tôi tặng cháu trai một chiếc xe đạp.', 'nephew'],
        ['My uncle reads stories to his niece.', 'Chú tôi đọc truyện cho cháu gái nghe.', 'niece'],
      ]),
    card(12, 3, 'People of different ages', 'Người ở các độ tuổi',
      'baby → child → teenager (13–19) → adult. A neighbour lives near you.',
      'baby (em bé) → child (trẻ em) → teenager (thiếu niên 13–19) → adult (người lớn). neighbour là hàng xóm.', [
        ['My brother is a teenager. He is fifteen.', 'Anh tôi là thiếu niên. Anh ấy mười lăm tuổi.', 'teenager'],
        ['Our neighbour waters our plants when we are away.', 'Hàng xóm tưới cây giúp khi nhà tôi đi vắng.', 'neighbour'],
      ]),
    card(12, 4, 'Being friends', 'Làm bạn',
      'make friends, get on well with, hang out with, have something in common.',
      'make friends (kết bạn), get on well with (hòa hợp với), hang out with (đi chơi với), have something in common (có điểm chung).', [
        ['It is easy to make friends at summer camp.', 'Kết bạn ở trại hè rất dễ.', 'make friends'],
        ['I get on well with my cousin.', 'Tôi rất hòa hợp với em họ.', 'get on well with'],
        ['I hang out with my friends at the park on Sundays.', 'Chủ nhật tôi đi chơi với bạn bè ở công viên.', 'hang out with'],
      ]),
    card(12, 5, 'Problems and kindness', 'Giận nhau và tử tế',
      'fall out with = argue and stop being friends. say sorry, share and invite help friendships.',
      'fall out with = cãi nhau, giận nhau. say sorry (xin lỗi), share (chia sẻ), invite (mời) giúp tình bạn tốt hơn.', [
        ['I fell out with Nam because he broke my ruler.', 'Tôi giận Nam vì bạn ấy làm gãy thước của tôi.', 'fell out with'],
        ['I broke her pencil, so I said sorry.', 'Tôi làm gãy bút chì của bạn ấy nên tôi đã xin lỗi.', 'said sorry'],
        ['Hoa always shares her snacks with me.', 'Hoa luôn chia đồ ăn vặt cho tôi.', 'shares'],
      ]),
    card(12, 6, 'Describing friends', 'Miêu tả bạn bè',
      'friendly, helpful, cool, special ↔ unkind. different ↔ same. elder = older (brother, sister).',
      'friendly (thân thiện), helpful (hay giúp đỡ), cool (ngầu), special (đặc biệt) ↔ unkind (xấu tính). different (khác) ↔ same (giống). elder = lớn tuổi hơn.', [
        ['The new girl is very friendly.', 'Bạn nữ mới rất thân thiện.', 'friendly'],
        ['Nam and I are in the same class.', 'Nam và tôi học cùng một lớp.', 'same'],
        ['My elder sister is at university.', 'Chị gái tôi đang học đại học.', 'elder'],
      ], { en: 'Say my elder sister, but my sister is older than me.', vi: 'Nói my elder sister, nhưng nói my sister is older than me.' }),
  ],
};
