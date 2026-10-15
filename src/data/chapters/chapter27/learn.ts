import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(27);

export const learnCards: Record<number, LearnCard[]> = {
  79: [
    card(79, 1, 'who and which', 'who và which',
      'A defining relative clause tells us which person or thing we mean. Use who for people and which for things and animals.',
      'Mệnh đề quan hệ xác định cho biết ta đang nói về người hay vật nào. Dùng who cho người, which cho vật và con vật.', [
        ['A vet is a doctor who looks after sick animals.', 'Bác sĩ thú y là bác sĩ chăm sóc những con vật bị ốm.', 'who'],
        ['We stayed in a hotel which had a pool on the roof.', 'Chúng tôi ở một khách sạn có hồ bơi trên mái.', 'which'],
      ]),
    card(79, 2, 'that', 'that',
      'In defining clauses, that can replace who or which. Never use what after a noun.',
      'Trong mệnh đề xác định, that có thể thay cho who hoặc which. Không dùng what sau danh từ.', [
        ['Is this the bus that goes to Hoi An?', 'Đây có phải xe buýt đi Hội An không?', 'that'],
        ['Everything that she said was true.', 'Mọi điều cô ấy nói đều đúng.', 'that'],
      ], { en: 'Say "the book that I read", not "the book what I read".', vi: 'Nói "the book that I read", không nói "the book what I read".' }),
    card(79, 3, 'whose', 'whose',
      'whose + noun shows possession. It replaces his, her, its or their.',
      'whose + danh từ chỉ sự sở hữu, thay cho his, her, its hoặc their.', [
        ['I have a friend whose mother is a chef.', 'Tôi có một người bạn có mẹ là đầu bếp.', 'whose mother'],
        ['The girl whose bike was stolen called the police.', 'Cô bé bị mất trộm xe đạp đã gọi cảnh sát.', 'whose bike'],
      ], { en: "whose is not who's. Who's means who is.", vi: "whose khác who's. Who's nghĩa là who is." }),
    card(79, 4, 'where and when', 'where và when',
      'Use where after a place and when after a time, when a subject and verb follow.',
      'Dùng where sau danh từ chỉ nơi chốn và when sau danh từ chỉ thời gian, khi theo sau là chủ ngữ và động từ.', [
        ['This is the hospital where I was born.', 'Đây là bệnh viện nơi tôi được sinh ra.', 'where'],
        ['Tết is the time when families get together.', 'Tết là dịp các gia đình sum họp.', 'when'],
      ]),
    card(79, 5, 'Extra information with commas', 'Thông tin thêm với dấu phẩy',
      'A non-defining clause adds extra information about a person or thing we already know. Put it between commas and never use that.',
      'Mệnh đề không xác định bổ sung thông tin về người hoặc vật đã rõ. Đặt giữa hai dấu phẩy và không bao giờ dùng that.', [
        ['My grandmother, who lives in Hue, is 80 years old.', 'Bà tôi, người sống ở Huế, đã 80 tuổi.', 'who lives in Hue'],
        ['The Mekong, which flows through six countries, is very long.', 'Sông Mê Kông, chảy qua sáu nước, rất dài.', 'which flows through six countries'],
        ['Phu Quoc, where we spent our holiday, has lovely beaches.', 'Phú Quốc, nơi chúng tôi đi nghỉ, có những bãi biển đẹp.', 'where'],
      ]),
    card(79, 6, "Don't repeat the object", 'Không lặp lại tân ngữ',
      'The relative pronoun already stands for the object, so don\'t add it, him or her again. In defining clauses you can also leave the object pronoun out.',
      'Đại từ quan hệ đã thay cho tân ngữ, nên không thêm it, him, her. Trong mệnh đề xác định có thể lược bỏ đại từ quan hệ làm tân ngữ.', [
        ['The cake which Mum made was delicious.', 'Chiếc bánh mẹ làm rất ngon.', 'which Mum made'],
        ['The man we met at the market was friendly.', 'Người đàn ông chúng tôi gặp ở chợ rất thân thiện.', 'we met'],
      ], { en: 'Wrong: The cake which Mum made it was delicious.', vi: 'Sai: The cake which Mum made it was delicious.' }),
  ],
  80: [
    card(80, 1, 'Form: had + past participle', 'Cấu trúc: had + quá khứ phân từ',
      'The past perfect is had + past participle. It is the same for every subject.',
      'Thì quá khứ hoàn thành: had + quá khứ phân từ, giống nhau với mọi chủ ngữ.', [
        ['When we arrived, the film had begun.', 'Khi chúng tôi đến, phim đã bắt đầu.', 'had begun'],
        ['By the time Mum got home, we had eaten all the cake.', 'Lúc mẹ về đến nhà, chúng tôi đã ăn hết bánh.', 'had eaten'],
      ]),
    card(80, 2, 'Irregular participles', 'Phân từ bất quy tắc',
      'Many verbs have an irregular past participle: go → gone, see → seen, take → taken, write → written, fly → flown.',
      'Nhiều động từ có quá khứ phân từ bất quy tắc: go → gone, see → seen, take → taken, write → written, fly → flown.', [
        ['When I woke up, my parents had gone to work.', 'Khi tôi thức dậy, bố mẹ đã đi làm.', 'had gone'],
        ['I recognised the film because I had seen it before.', 'Tôi nhận ra bộ phim vì đã xem nó trước đó.', 'had seen'],
      ], { en: 'Say had gone, not had went.', vi: 'Nói had gone, không nói had went.' }),
    card(80, 3, 'The earlier past', 'Quá khứ xảy ra trước',
      'Use the past perfect for an action that happened before another action in the past. It often explains a reason.',
      'Dùng quá khứ hoàn thành cho hành động xảy ra trước một hành động khác trong quá khứ, thường để giải thích lý do.', [
        ['The streets were wet because it had rained all night.', 'Đường ướt vì trời đã mưa suốt đêm.', 'had rained'],
        ['Nam couldn\'t pay because he had left his wallet at home.', 'Nam không trả tiền được vì đã để quên ví ở nhà.', 'had left'],
      ]),
    card(80, 4, "hadn't and had never", "hadn't và had never",
      "Negative: hadn't + past participle. Use had never ... before for a first experience.",
      "Phủ định: hadn't + quá khứ phân từ. Dùng had never ... before để nói lần đầu trải nghiệm.", [
        ['We were hungry because we hadn\'t had breakfast.', 'Chúng tôi đói vì chưa ăn sáng.', "hadn't had"],
        ['Lan had never seen snow before her trip to Sa Pa.', 'Lan chưa từng thấy tuyết trước chuyến đi Sa Pa.', 'had never seen'],
      ]),
    card(80, 5, 'Questions', 'Câu hỏi',
      'Put had before the subject: Had + subject + past participle?',
      'Đặt had trước chủ ngữ: Had + chủ ngữ + quá khứ phân từ?', [
        ['Had you been to Hue before you moved there?', 'Bạn đã từng đến Huế trước khi chuyển đến đó chưa?', 'Had you been'],
        ['How long had they known each other?', 'Họ đã quen nhau bao lâu rồi?', 'had they known'],
      ]),
    card(80, 6, 'Telling a past story', 'Kể chuyện quá khứ',
      'The later action uses the past simple. The earlier action uses the past perfect. Look for when, by the time, before, after and already.',
      'Hành động xảy ra sau dùng quá khứ đơn, hành động xảy ra trước dùng quá khứ hoàn thành. Chú ý when, by the time, before, after, already.', [
        ['When I got home, my brother had already eaten dinner.', 'Khi tôi về nhà, anh tôi đã ăn tối rồi.', 'had already eaten'],
        ['By the time the police arrived, the thief had run away.', 'Lúc cảnh sát đến, tên trộm đã chạy mất.', 'had run away'],
        ['After Nam had finished his homework, he played football.', 'Sau khi làm xong bài tập, Nam đi đá bóng.', 'played'],
      ]),
  ],
  81: [
    card(81, 1, 'Landscapes', 'Địa hình',
      'cliff, volcano, coast, hill, field, rainforest.',
      'cliff (vách đá), volcano (núi lửa), coast (bờ biển), hill (ngọn đồi), field (cánh đồng), rainforest (rừng mưa nhiệt đới).', [
        ['We drove along the coast from Da Nang to Hoi An.', 'Chúng tôi lái xe dọc bờ biển từ Đà Nẵng đến Hội An.', 'coast'],
        ['The rice fields turn yellow before the harvest.', 'Những cánh đồng lúa chuyển vàng trước mùa gặt.', 'fields'],
      ]),
    card(81, 2, 'Water', 'Sông nước',
      'stream, pond, ocean, bay, wave, riverbank.',
      'stream (suối), pond (ao), ocean (đại dương), bay (vịnh), wave (sóng), riverbank (bờ sông).', [
        ['Ha Long Bay has nearly 2,000 islands.', 'Vịnh Hạ Long có gần 2.000 hòn đảo.', 'Bay'],
        ['We had a picnic on the riverbank.', 'Chúng tôi đi dã ngoại trên bờ sông.', 'riverbank'],
      ]),
    card(81, 3, 'Sky and weather', 'Bầu trời và thời tiết',
      'breeze, shower, frost, heatwave, sunrise, sunset.',
      'breeze (gió nhẹ), shower (mưa rào), frost (sương giá), heatwave (đợt nắng nóng), sunrise (bình minh), sunset (hoàng hôn).', [
        ['There will be showers this afternoon.', 'Chiều nay sẽ có mưa rào.', 'showers'],
        ['We got up early to watch the sunrise.', 'Chúng tôi dậy sớm để ngắm bình minh.', 'sunrise'],
      ]),
    card(81, 4, 'Plants and animals', 'Cây cối và động vật',
      'root, branch, seed, insect, nest, wildlife.',
      'root (rễ cây), branch (cành cây), seed (hạt giống), insect (côn trùng), nest (tổ chim), wildlife (thế giới hoang dã).', [
        ['A bird is sitting on a branch.', 'Một con chim đang đậu trên cành cây.', 'branch'],
        ['Cat Tien National Park is full of wildlife.', 'Vườn quốc gia Cát Tiên có rất nhiều động thực vật hoang dã.', 'wildlife'],
      ]),
    card(81, 5, 'Similar but different', 'Giống mà khác',
      'A stream is a small river; an ocean is a huge sea. A pond is small, still water. A hill is lower than a mountain.',
      'stream là sông nhỏ; ocean là biển rất rộng. pond là vùng nước nhỏ, đứng yên. hill thấp hơn mountain (núi).', [
        ['We drank cold water from a mountain stream.', 'Chúng tôi uống nước mát từ một con suối trên núi.', 'stream'],
        ['There are fish and frogs in our pond.', 'Có cá và ếch trong ao nhà tôi.', 'pond'],
      ]),
    card(81, 6, 'Talking about nature', 'Nói về thiên nhiên',
      'Useful phrases: the edge of a cliff, a cool breeze, plant seeds, build a nest, the volcano erupted.',
      'Cụm từ hữu ích: the edge of a cliff (mép vách đá), a cool breeze (làn gió mát), plant seeds (gieo hạt), build a nest (làm tổ), the volcano erupted (núi lửa phun trào).', [
        ['Don\'t stand too close to the edge of the cliff.', 'Đừng đứng quá gần mép vách đá.', 'edge of the cliff'],
        ['A cool breeze came from the sea.', 'Một làn gió mát thổi từ biển vào.', 'cool breeze'],
        ['Plant the seeds in spring.', 'Hãy gieo hạt vào mùa xuân.', 'Plant the seeds'],
      ]),
  ],
};
