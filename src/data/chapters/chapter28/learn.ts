import type { LearnCard } from '../../learnContent';
import { cardMaker } from '../shared';

const card = cardMaker(28);

export const learnCards: Record<number, LearnCard[]> = {
  82: [
    card(82, 1, 'say or tell?', 'say hay tell?',
      'tell + person + (that) ...: Lan told me that she was tired. say + (that) ...: Lan said that she was tired.',
      'tell + người nghe + (that) ...: Lan told me that she was tired. say + (that) ...: Lan said that she was tired.', [
        ['Lan told me that she was tired.', 'Lan nói với tôi rằng bạn ấy mệt.', 'told me'],
        ['Minh said that he wanted to be a pilot.', 'Minh nói rằng cậu ấy muốn làm phi công.', 'said'],
      ], { en: 'Never say "said me". Say "told me" or "said to me".', vi: 'Không nói "said me". Nói "told me" hoặc "said to me".' }),
    card(82, 2, 'One step back', 'Lùi một thì',
      'When we report what someone said in the past, the verb usually moves back: am/is → was, are → were, present simple → past simple, present continuous → past continuous.',
      'Khi tường thuật lời ai đó nói trong quá khứ, động từ thường lùi một thì: am/is → was, are → were, hiện tại đơn → quá khứ đơn, hiện tại tiếp diễn → quá khứ tiếp diễn.', [
        ['"I am hungry." → Lan said that she was hungry.', '"Tớ đói." → Lan nói rằng bạn ấy đói.', 'was hungry'],
        ['"I\'m having a great time." → Nam said that he was having a great time.', '"Tớ đang rất vui." → Nam nói rằng cậu ấy đang rất vui.', 'was having'],
      ]),
    card(82, 3, 'More changes back', 'Lùi thì thêm',
      'can → could, will → would, present perfect and past simple → past perfect.',
      'can → could, will → would, hiện tại hoàn thành và quá khứ đơn → quá khứ hoàn thành.', [
        ['"I will be late." → Minh said that he would be late.', '"Tớ sẽ đến muộn." → Minh nói rằng cậu ấy sẽ đến muộn.', 'would'],
        ['"I can\'t find my keys." → Mai said that she couldn\'t find her keys.', '"Tớ không tìm thấy chìa khóa." → Mai nói rằng bạn ấy không tìm thấy chìa khóa.', "couldn't"],
        ['"I have finished my essay." → Mai said that she had finished her essay.', '"Tớ viết xong bài luận rồi." → Mai nói rằng bạn ấy đã viết xong bài luận.', 'had finished'],
      ]),
    card(82, 4, 'Pronouns and possessives', 'Đại từ và tính từ sở hữu',
      'Change I, my, we, our and you to fit the person who is reporting.',
      'Đổi I, my, we, our, you cho phù hợp với người đang tường thuật.', [
        ['"I love my new school." → Lan said that she loved her new school.', '"Tớ yêu trường mới của tớ." → Lan nói rằng bạn ấy yêu trường mới của mình.', 'her new school'],
        ['"I can help you." → Nam told Lan that he could help her.', '"Tớ có thể giúp cậu." → Nam nói với Lan rằng cậu ấy có thể giúp bạn ấy.', 'help her'],
      ]),
    card(82, 5, 'Time and place words', 'Từ chỉ thời gian và nơi chốn',
      'today → that day, tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that.',
      'today → that day, tomorrow → the next day, yesterday → the day before, now → then, here → there, this → that.', [
        ['Mai said that she would see me the next day.', 'Mai nói rằng bạn ấy sẽ gặp tôi vào hôm sau.', 'the next day'],
        ['Minh said that he had finished his project the day before.', 'Minh nói rằng cậu ấy đã làm xong dự án vào hôm trước.', 'the day before'],
      ]),
    card(82, 6, 'Reported commands and requests', 'Tường thuật mệnh lệnh và yêu cầu',
      'tell / ask + person + to + base verb. For negatives, use not to + base verb.',
      'tell / ask + người + to + động từ nguyên mẫu. Phủ định dùng not to + động từ nguyên mẫu.', [
        ['The teacher told us to be quiet.', 'Cô giáo bảo chúng tôi giữ trật tự.', 'to be quiet'],
        ['Mum told me not to use my phone at dinner.', 'Mẹ dặn tôi không dùng điện thoại trong bữa tối.', 'not to use'],
        ['Lan asked me to help her with her homework.', 'Lan nhờ tôi giúp bạn ấy làm bài tập.', 'asked me to help'],
      ], { en: 'Say "told me not to touch", not "told me don\'t touch".', vi: 'Nói "told me not to touch", không nói "told me don\'t touch".' }),
  ],
  83: [
    card(83, 1, 'Present simple or continuous?', 'Hiện tại đơn hay tiếp diễn?',
      'Present simple for habits and facts (usually, every day). Present continuous for now (Look!, Listen!, at the moment).',
      'Hiện tại đơn cho thói quen và sự thật (usually, every day). Hiện tại tiếp diễn cho lúc này (Look!, Listen!, at the moment).', [
        ['Lan usually walks to school, but today she is taking the bus.', 'Lan thường đi bộ đến trường, nhưng hôm nay bạn ấy đi xe buýt.', 'is taking'],
        ['Water boils at 100°C.', 'Nước sôi ở 100°C.', 'boils'],
      ], { en: 'State verbs (know, like, understand, taste) stay simple: I know, not I am knowing.', vi: 'Động từ trạng thái (know, like, understand, taste) giữ dạng đơn: I know, không nói I am knowing.' }),
    card(83, 2, 'Past simple or past continuous?', 'Quá khứ đơn hay quá khứ tiếp diễn?',
      'Past continuous for the long action in progress; past simple for the short action that interrupts it or for finished actions.',
      'Quá khứ tiếp diễn cho hành động dài đang diễn ra; quá khứ đơn cho hành động ngắn xen vào hoặc hành động đã kết thúc.', [
        ['Lan was having a shower when the phone rang.', 'Lan đang tắm thì điện thoại reo.', 'was having'],
        ['We went to Da Lat two years ago.', 'Chúng tôi đi Đà Lạt hai năm trước.', 'went'],
      ]),
    card(83, 3, 'The past perfect in stories', 'Quá khứ hoàn thành khi kể chuyện',
      'Use had + past participle for the action that happened first.',
      'Dùng had + quá khứ phân từ cho hành động xảy ra trước.', [
        ['By the time we arrived, the bus had left.', 'Lúc chúng tôi đến, xe buýt đã đi rồi.', 'had left'],
        ['Minh was sad because he had lost his cap.', 'Minh buồn vì đã làm mất mũ.', 'had lost'],
      ]),
    card(83, 4, 'Present perfect or past simple?', 'Hiện tại hoàn thành hay quá khứ đơn?',
      'Present perfect with since, for, ever, just, yet. Past simple with ago, yesterday, last week and When...?',
      'Hiện tại hoàn thành đi với since, for, ever, just, yet. Quá khứ đơn đi với ago, yesterday, last week và When...?', [
        ['Lan has lived in Hue since 2020.', 'Lan đã sống ở Huế từ năm 2020.', 'has lived'],
        ['Minh lost his phone two days ago.', 'Minh làm mất điện thoại hai ngày trước.', 'lost'],
      ]),
    card(83, 5, 'Talking about the future', 'Nói về tương lai',
      'going to for plans and evidence; will for quick decisions, promises and opinions; present continuous for arrangements; present simple for timetables.',
      'going to cho dự định và dự đoán có căn cứ; will cho quyết định tức thì, lời hứa, ý kiến; hiện tại tiếp diễn cho kế hoạch đã sắp xếp; hiện tại đơn cho lịch trình.', [
        ['Look at those clouds! It is going to rain.', 'Nhìn những đám mây kia kìa! Trời sắp mưa rồi.', 'is going to'],
        ['We are having a party next Saturday.', 'Thứ Bảy tới chúng tôi tổ chức tiệc.', 'are having'],
        ['The train leaves at 6.15 tomorrow morning.', 'Tàu khởi hành lúc 6 giờ 15 sáng mai.', 'leaves'],
      ]),
    card(83, 6, 'Look for the clues', 'Tìm dấu hiệu',
      'Time words choose the tense: every day (present simple), now (present continuous), yesterday (past simple), at 8 pm last night (past continuous), since (present perfect), by the time (past perfect), tomorrow (future).',
      'Từ chỉ thời gian quyết định thì: every day (hiện tại đơn), now (hiện tại tiếp diễn), yesterday (quá khứ đơn), at 8 pm last night (quá khứ tiếp diễn), since (hiện tại hoàn thành), by the time (quá khứ hoàn thành), tomorrow (tương lai).', [
        ['At 8 o\'clock last night, I was doing my homework.', 'Lúc 8 giờ tối qua, tôi đang làm bài tập.', 'was doing'],
        ['My parents have been married since 2010.', 'Bố mẹ tôi kết hôn từ năm 2010.', 'have been'],
      ]),
  ],
  84: [
    card(84, 1, 'Problems for our planet', 'Vấn đề của hành tinh',
      'climate change, rubbish, deforestation, extinct, smoke, traffic jam.',
      'climate change (biến đổi khí hậu), rubbish (rác thải), deforestation (nạn phá rừng), extinct (tuyệt chủng), smoke (khói), traffic jam (tắc đường).', [
        ['Climate change is making storms stronger.', 'Biến đổi khí hậu đang khiến bão mạnh hơn.', 'Climate change'],
        ['We were stuck in a traffic jam for an hour.', 'Chúng tôi bị kẹt xe suốt một tiếng.', 'traffic jam'],
      ]),
    card(84, 2, 'Natural disasters', 'Thiên tai',
      'flood, drought, earthquake, typhoon, landslide, wildfire.',
      'flood (lũ lụt), drought (hạn hán), earthquake (động đất), typhoon (bão lớn), landslide (sạt lở đất), wildfire (cháy rừng).', [
        ['The flood destroyed many houses in central Viet Nam.', 'Trận lũ đã phá hủy nhiều ngôi nhà ở miền Trung.', 'flood'],
        ['A landslide blocked the mountain road.', 'Một vụ sạt lở đất đã chặn con đường núi.', 'landslide'],
      ]),
    card(84, 3, 'People in need', 'Những người cần giúp đỡ',
      'poverty, homeless, hunger, disease, unemployed, crime.',
      'poverty (cảnh nghèo khó), homeless (vô gia cư), hunger (nạn đói), disease (bệnh tật), unemployed (thất nghiệp), crime (tội phạm).', [
        ['Many families still live in poverty.', 'Nhiều gia đình vẫn sống trong cảnh nghèo khó.', 'poverty'],
        ['The charity gives food to homeless people.', 'Tổ chức từ thiện phát đồ ăn cho người vô gia cư.', 'homeless'],
      ]),
    card(84, 4, 'Solutions', 'Giải pháp',
      'charity, volunteer, donate, solar panel, reuse, campaign.',
      'charity (tổ chức từ thiện), volunteer (tình nguyện viên), donate (quyên góp), solar panel (tấm pin mặt trời), reuse (tái sử dụng), campaign (chiến dịch).', [
        ['Volunteers cleaned the beach on Sunday.', 'Các tình nguyện viên đã dọn sạch bãi biển vào Chủ nhật.', 'Volunteers'],
        ['Our school has solar panels on the roof.', 'Trường tôi có các tấm pin mặt trời trên mái.', 'solar panels'],
      ]),
    card(84, 5, 'Word families', 'Họ từ',
      'poor → poverty, hungry → hunger, a home → homeless, a job → unemployed, a forest → deforestation.',
      'poor (nghèo) → poverty, hungry (đói) → hunger, a home (nhà) → homeless, a job (việc làm) → unemployed, a forest (rừng) → deforestation.', [
        ['Millions of children suffer from hunger.', 'Hàng triệu trẻ em phải chịu nạn đói.', 'hunger'],
        ['My uncle has been unemployed since the factory closed.', 'Chú tôi bị thất nghiệp từ khi nhà máy đóng cửa.', 'unemployed'],
      ]),
    card(84, 6, 'What can we do?', 'Chúng ta có thể làm gì?',
      'Useful phrases: donate old clothes, reuse bags, join a campaign, work as a volunteer, give money to a charity.',
      'Cụm từ hữu ích: donate old clothes (quyên góp quần áo cũ), reuse bags (dùng lại túi), join a campaign (tham gia chiến dịch), work as a volunteer (làm tình nguyện viên), give money to a charity (ủng hộ tổ chức từ thiện).', [
        ['We donated our old books to a school in the mountains.', 'Chúng tôi quyên góp sách cũ cho một trường học vùng cao.', 'donated'],
        ['Reuse your plastic bags when you go shopping.', 'Hãy dùng lại túi ni lông khi đi mua sắm.', 'Reuse'],
        ['Our school started a campaign to say no to plastic.', 'Trường tôi bắt đầu một chiến dịch nói không với đồ nhựa.', 'campaign'],
      ]),
  ],
};
