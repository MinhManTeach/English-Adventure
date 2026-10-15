import type { VocabWord } from '../shared';

/**
 * A gap item: [direct-speech or situation lead-in shown before the gap ('' for none), sentence with ___
 * (and an optional verb hint in brackets at the end), answer, three wrong choices].
 */
export type LeadGapItem = readonly [lead: string, gap: string, answer: string, wrong: readonly [string, string, string]];

/** Unit 82: say or tell. */
export const SAY_TELL: readonly LeadGapItem[] = [
  ['', 'Lan ___ me that she was tired.', 'told', ['said', 'spoke', 'talked']],
  ['', 'Minh ___ that he wanted to be a pilot.', 'said', ['told', 'spoke', 'talked']],
  ['', 'The teacher ___ us that the test was on Friday.', 'told', ['said', 'spoke', 'talked']],
  ['', 'Mai ___ she couldn\'t come to the party.', 'said', ['told', 'talked', 'spoke']],
  ['', 'Dad ___ my brother that dinner was ready.', 'told', ['said', 'spoke', 'talked']],
  ['', 'Nam ___ to me that he had lost his phone.', 'said', ['told', 'talked', 'spoke']],
  ['', 'Our coach ___ the team that they had played well.', 'told', ['said', 'spoke', 'talked']],
  ['', 'Grandma ___ that the weather was perfect for a picnic.', 'said', ['told', 'talked', 'spoke']],
  ['', 'Who ___ you that the shop was closed?', 'told', ['said', 'spoke', 'talked']],
  ['', 'Hoa ___ goodbye to everyone and left.', 'said', ['told', 'talked', 'spoke']],
  ['', 'Please ___ me the truth.', 'tell', ['say', 'speak', 'talk']],
  ['', 'The guide ___ the tourists that the museum closed at five.', 'told', ['said', 'spoke', 'talked']],
];

/** Unit 82: tenses move one step back in reported statements about a finished past situation. */
export const BACKSHIFT: readonly LeadGapItem[] = [
  ['Yesterday Lan said, "I am hungry."', 'Lan said that she ___ hungry.', 'was', ['is', 'were', 'be']],
  ['At the party, Nam said, "I\'m having a great time."', 'Nam said that he ___ a great time.', 'was having', ['is having', 'were having', 'has']],
  ['On Monday, Mai said, "I can\'t find my keys."', 'Mai said that she ___ find her keys.', 'couldn\'t', ['can\'t', 'doesn\'t', 'wasn\'t']],
  ['Last night Dad said, "I will fix your bike tomorrow."', 'Dad said that he ___ fix my bike the next day.', 'would', ['will', 'is', 'does']],
  ['Yesterday the children said, "We are tired."', 'The children said that they ___ tired.', 'were', ['are', 'was', 'be']],
  ['Last Monday Hoa said, "I don\'t feel well."', 'Hoa said that she ___ well.', 'didn\'t feel', ['doesn\'t feel', 'didn\'t felt', 'wasn\'t feel']],
  ['Last summer my cousin said, "I want to learn to swim."', 'My cousin said that he ___ to learn to swim.', 'wanted', ['wants', 'want', 'wanting']],
  ['In Grade 6, Nam said, "I am the shortest boy in my class."', 'Nam said that he ___ the shortest boy in his class.', 'was', ['is', 'were', 'been']],
  ['Yesterday Lan said, "My brother is watching TV."', 'Lan said that her brother ___ TV.', 'was watching', ['is watching', 'were watching', 'watches']],
  ['Before last week\'s test, the teacher said, "You can use a dictionary."', 'The teacher said that we ___ use a dictionary.', 'could', ['can', 'are able', 'could to']],
  ['On Friday, Minh said, "I will be late."', 'Minh said that he ___ be late.', 'would', ['will', 'is', 'was']],
  ['Last Sunday Grandpa said, "It is raining."', 'Grandpa said that it ___ raining.', 'was', ['is', 'were', 'has']],
];

/** Unit 82: pronouns, possessives and time or place words change in reported speech. */
export const REPORT_CHANGES: readonly LeadGapItem[] = [
  ['Lan said, "I love my new school."', 'Lan said that she loved ___ new school.', 'her', ['my', 'his', 'your']],
  ['Nam said, "We are visiting our grandparents."', 'Nam said that they were visiting ___ grandparents.', 'their', ['our', 'its', 'your']],
  ['Last week Mai said, "I will see you tomorrow."', 'Mai said that she would see me ___.', 'the next day', ['tomorrow', 'the day before', 'yesterday']],
  ['Last Friday Minh said, "I finished my project yesterday."', 'Minh said that he had finished his project ___.', 'the day before', ['yesterday', 'the next day', 'tomorrow']],
  ['Last month Hoa said, "I am busy today."', 'Hoa said that she was busy ___.', 'that day', ['today', 'the next day', 'yesterday']],
  ['In Da Lat last year, Nam said, "I love it here."', 'Nam said that he loved it ___.', 'there', ['here', 'where', 'this']],
  ['Lan said to me, "I like your dress."', 'Lan said that she liked ___ dress.', 'my', ['your', 'our', 'his']],
  ['The boys said, "We have lost our ball."', 'The boys said that ___ had lost their ball.', 'they', ['we', 'he', 'them']],
  ['Last week Mum said, "I am making a cake this afternoon."', 'Mum said that she was making a cake ___ afternoon.', 'that', ['this', 'these', 'those']],
  ['Nam said to Lan, "I can help you."', 'Nam told Lan that he could help ___.', 'her', ['you', 'him', 'me']],
  ['Two years ago Mai said, "I live in Hue now."', 'Mai said that she lived in Hue ___.', 'then', ['now', 'there', 'today']],
  ['Last week Nam said, "This book is mine."', 'Nam said that ___ book was his.', 'that', ['this', 'these', 'those']],
];

/** Unit 82: reported commands and requests: tell / ask + object + (not) to + verb. */
export const REPORTED_COMMANDS: readonly LeadGapItem[] = [
  ['The teacher said, "Be quiet!"', 'The teacher told us ___ quiet.', 'to be', ['be', 'being', 'were']],
  ['Mum said, "Don\'t use your phone at dinner."', 'Mum told me ___ my phone at dinner.', 'not to use', ['don\'t use', 'not using', 'no to use']],
  ['Lan said, "Please help me with my homework."', 'Lan asked me ___ her with her homework.', 'to help', ['help', 'helping', 'helped']],
  ['The doctor said, "Don\'t eat so much salt."', 'The doctor told Grandpa ___ so much salt.', 'not to eat', ['don\'t eat', 'not eating', 'no eat']],
  ['Our coach said, "Arrive early!"', 'Our coach told us ___ early.', 'to arrive', ['arrive', 'arriving', 'arrived']],
  ['Dad said, "Nam, please wash the dishes."', 'Dad asked Nam ___ the dishes.', 'to wash', ['wash', 'washing', 'washed']],
  ['The guide said, "Don\'t feed the monkeys."', 'The guide told the tourists ___ the monkeys.', 'not to feed', ['don\'t feed', 'not feeding', 'no feed']],
  ['Mai said, "Please don\'t make so much noise."', 'Mai asked her brother ___ so much noise.', 'not to make', ['don\'t make', 'not making', 'no make']],
  ['The librarian said, "Don\'t shout in the library."', 'The librarian told us ___ in the library.', 'not to shout', ['don\'t shout', 'not shouting', 'no shout']],
  ['Minh said, "Could you bring me the menu, please?"', 'Minh asked the waiter ___ him the menu.', 'to bring', ['bring', 'bringing', 'brought']],
  ['The teacher said, "Hoa, write your name at the top."', 'The teacher told Hoa ___ her name at the top of the page.', 'to write', ['write', 'writing', 'wrote']],
  ['My parents said, "Come home before 9 pm."', 'My parents told me ___ home before 9 pm.', 'to come', ['come', 'coming', 'came']],
];

/** Unit 83: present simple or present continuous, including state verbs. */
export const PRESENT_REVISION: readonly LeadGapItem[] = [
  ['', 'Look! Nam ___ his bike to school today. (ride)', 'is riding', ['rides', 'ride', 'was riding']],
  ['', 'Water ___ at 100°C. (boil)', 'boils', ['is boiling', 'boil', 'boiled']],
  ['', 'Lan usually ___ to school, but today she is taking the bus. (walk)', 'walks', ['is walking', 'walk', 'walked']],
  ['', 'I ___ the answer to this question. (know)', 'know', ['am knowing', 'knows', 'knowed']],
  ['', 'Be quiet! The baby ___. (sleep)', 'is sleeping', ['sleeps', 'sleep', 'slept']],
  ['', 'How often ___ Minh visit his grandparents?', 'does', ['is', 'do', 'has']],
  ['', 'This soup ___ delicious. (taste)', 'tastes', ['is tasting', 'taste', 'tasting']],
  ['', 'Listen! Someone ___ at the door. (knock)', 'is knocking', ['knocks', 'knock', 'knocked']],
  ['', 'Mai ___ coffee. She prefers tea. (not like)', 'doesn\'t like', ['isn\'t liking', 'don\'t like', 'not likes']],
  ['', 'We can\'t go out now. It ___ heavily. (rain)', 'is raining', ['rains', 'rain', 'raining']],
  ['', 'The sun ___ in the east. (rise)', 'rises', ['is rising', 'rise', 'rose']],
  ['', 'What ___ Nam doing right now?', 'is', ['does', 'do', 'did']],
];

/** Unit 83: past simple, past continuous or past perfect. */
export const PAST_REVISION: readonly LeadGapItem[] = [
  ['', 'Lan ___ a shower when the phone rang. (have)', 'was having', ['is having', 'has had', 'have']],
  ['', 'We ___ to Da Lat two years ago. (go)', 'went', ['have gone', 'go', 'were go']],
  ['', 'By the time we arrived, the bus ___. (leave)', 'had left', ['has left', 'leaves', 'is leaving']],
  ['', 'At 8 o\'clock last night, I ___ my homework. (do)', 'was doing', ['am doing', 'have done', 'do']],
  ['', 'Nam ___ his leg while he was playing football. (break)', 'broke', ['was breaking', 'has broken', 'breaks']],
  ['', 'What ___ you doing at 9 pm yesterday?', 'were', ['did', 'are', 'have']],
  ['', 'Lan didn\'t come to the cinema because she ___ the film before. (see)', 'had seen', ['has seen', 'sees', 'was seeing']],
  ['', 'Last summer we ___ in a hotel by the sea. (stay)', 'stayed', ['have stayed', 'stay', 'are staying']],
  ['', 'It ___ when we left the house, so we took umbrellas. (rain)', 'was raining', ['is raining', 'has rained', 'rains']],
  ['', 'I ___ Mai yesterday. She looked great! (meet)', 'met', ['have met', 'meet', 'was meet']],
  ['', 'The thief ___ in through the window while the family was sleeping. (climb)', 'climbed', ['has climbed', 'climbs', 'is climbing']],
  ['', 'Minh was sad because he ___ his favourite cap. (lose)', 'had lost', ['has lost', 'loses', 'is losing']],
];

/** Unit 83: present perfect or past simple. */
export const PERFECT_REVISION: readonly LeadGapItem[] = [
  ['', 'Lan ___ in Hue since 2020. (live)', 'has lived', ['lives', 'lived', 'is living']],
  ['', 'I ___ my homework yet. (not finish)', 'haven\'t finished', ['don\'t finish', 'am not finish', 'not finished']],
  ['', 'We ___ to Phu Quoc last year. (fly)', 'flew', ['have flown', 'fly', 'had flew']],
  ['', 'Have you ever ___ durian? (eat)', 'eaten', ['ate', 'eat', 'eating']],
  ['', 'Minh ___ his phone two days ago. (lose)', 'lost', ['has lost', 'loses', 'is losing']],
  ['', 'My parents ___ married since 2010. (be)', 'have been', ['are', 'were', 'is']],
  ['', 'I ___ Mai for ages. Is she OK? (not see)', 'haven\'t seen', ['didn\'t see', 'don\'t see', 'am not seeing']],
  ['', 'When ___ you start learning English?', 'did', ['have', 'has', 'are']],
  ['', 'Nam has just ___ home. (come)', 'come', ['came', 'comes', 'coming']],
  ['', 'We ___ that film last weekend. (watch)', 'watched', ['have watched', 'watch', 'are watching']],
  ['', 'How long ___ you known your best friend?', 'have', ['did', 'are', 'do']],
  ['', 'I ___ to Ha Long Bay three times. (be)', 'have been', ['was', 'am', 'had been']],
];

/** Unit 83: future forms (will, going to, present continuous, present simple for timetables). */
export const FUTURE_REVISION: readonly LeadGapItem[] = [
  ['', 'Look at those dark clouds! It ___ rain.', 'is going to', ['was going to', 'goes to', 'is going']],
  ['', 'The train to Hai Phong ___ at 6.15 tomorrow morning. (leave)', 'leaves', ['left', 'has left', 'was leaving']],
  ['', 'I\'m thirsty. Wait here. I ___ get you some water.', 'will', ['am', 'was', 'did']],
  ['', 'Lan ___ her grandparents next weekend. She has already bought the bus ticket. (visit)', 'is visiting', ['visited', 'has visited', 'was visiting']],
  ['', 'I think Viet Nam ___ the match tomorrow. (win)', 'will win', ['won', 'has won', 'was winning']],
  ['', 'We ___ a party next Saturday. Can you come? (have)', 'are having', ['had', 'have had', 'were having']],
  ['', 'Maybe it ___ snow in Sa Pa next week.', 'will', ['is', 'has', 'was']],
  ['', 'What time ___ the film start tonight?', 'does', ['did', 'has', 'was']],
  ['', 'Nam ___ study medicine when he finishes school. He has already decided.', 'is going to', ['was going to', 'has', 'did']],
  ['', 'Don\'t worry. I ___ tell anyone your secret.', 'won\'t', ['wasn\'t', 'hasn\'t', 'not']],
  ['', 'Next year my sister ___ 16. (be)', 'will be', ['was', 'has been', 'is being']],
  ['', 'We ___ to Hoi An tomorrow. Our bags are already packed. (drive)', 'are driving', ['drove', 'have driven', 'were driving']],
];

/** Unit 84 Global problems: the environment, disasters, people in need and solutions. */
export const GLOBAL_WORDS: readonly VocabWord[] = [
  // Environment
  { word: 'climate change', topic: 'environment', definition: 'changes in the Earth\'s weather, mainly because the planet is getting warmer', vi: 'biến đổi khí hậu', icon: '🌡️',
    example: 'Climate change is making storms stronger.', exampleVi: 'Biến đổi khí hậu đang khiến bão mạnh hơn.',
    situations: ['Summers are getting hotter and storms are getting stronger all over the world.', 'Scientists say the Earth\'s weather is changing because of gases from cars and factories.', 'Sea levels are rising, and the Mekong Delta could lose land because the planet is warming.'] },
  { word: 'rubbish', topic: 'environment', definition: 'things that you throw away because you don\'t want them', vi: 'rác thải', icon: '🗑️',
    example: 'Please put your rubbish in the bin.', exampleVi: 'Hãy bỏ rác vào thùng.',
    situations: ['After the festival, the park was full of empty bottles and old food wrappers.', 'Put the banana skin and the empty can in the bin.', 'The truck comes every evening to take away the things people have thrown out.'] },
  { word: 'deforestation', topic: 'environment', definition: 'cutting down large areas of forest', vi: 'nạn phá rừng', icon: '🪓',
    example: 'Deforestation destroys the homes of many animals.', exampleVi: 'Nạn phá rừng phá hủy nơi sống của nhiều loài động vật.',
    situations: ['People cut down thousands of trees to make farms, and now the hills are bare.', 'The monkeys have nowhere to live because the forest has been cut down.', 'Companies cut down huge areas of trees to sell the wood.'] },
  { word: 'extinct', topic: 'environment', definition: 'no longer existing because every animal of that kind has died', vi: 'tuyệt chủng', icon: '🦣',
    example: 'Dinosaurs became extinct millions of years ago.', exampleVi: 'Khủng long đã tuyệt chủng từ hàng triệu năm trước.',
    situations: ['There are no dinosaurs alive today. They all died a very long time ago.', 'The last Javan rhino in Viet Nam died in 2010, so there are none here any more.', 'If we don\'t protect tigers, there may be none left anywhere in the future.'] },
  { word: 'smoke', topic: 'environment', definition: 'grey or black gas that comes from something burning', vi: 'khói', icon: '💨',
    example: 'Smoke from the factory makes the air dirty.', exampleVi: 'Khói từ nhà máy làm bẩn không khí.',
    situations: ['Dark grey clouds come out of the factory chimney all day.', 'Farmers burn rice straw, and the grey air makes people cough.', 'Dad\'s old motorbike leaves a black cloud behind it.'] },
  { word: 'traffic jam', topic: 'environment', definition: 'a long line of vehicles that cannot move', vi: 'tắc đường', icon: '🚗',
    example: 'We were stuck in a traffic jam for an hour.', exampleVi: 'Chúng tôi bị kẹt xe suốt một tiếng.',
    situations: ['At 5 pm, thousands of motorbikes and cars can\'t move on the main road.', 'We were late for school because the cars weren\'t moving at all.', 'Big cities have this problem because there are too many vehicles on the roads.'] },
  // Disasters
  { word: 'flood', topic: 'disasters', definition: 'a lot of water covering land that is usually dry', vi: 'lũ lụt', icon: '🌊',
    example: 'The flood destroyed many houses in central Viet Nam.', exampleVi: 'Trận lũ đã phá hủy nhiều ngôi nhà ở miền Trung.',
    situations: ['After days of heavy rain, the water in the streets was one metre deep.', 'The river rose and covered the rice fields and the roads.', 'People had to use boats to leave their homes because of the water.'] },
  { word: 'drought', topic: 'disasters', definition: 'a long time with little or no rain', vi: 'hạn hán', icon: '🏜️',
    example: 'The drought killed the rice in the fields.', exampleVi: 'Hạn hán làm chết lúa ngoài đồng.',
    situations: ['It hasn\'t rained for six months, and the rivers are almost dry.', 'The ground is cracked and the plants are dying because there is no water.', 'Farmers in the Central Highlands can\'t water their coffee trees because no rain has fallen for months.'] },
  { word: 'earthquake', topic: 'disasters', definition: 'a sudden shaking of the ground', vi: 'động đất', icon: '🏚️',
    example: 'The earthquake damaged many buildings.', exampleVi: 'Trận động đất làm hư hại nhiều tòa nhà.',
    situations: ['Suddenly the ground shook and the pictures fell off the walls.', 'In Japan, children practise hiding under their desks in case the ground starts to shake.', 'The buildings fell down when the earth moved for thirty seconds.'] },
  { word: 'typhoon', topic: 'disasters', definition: 'a very strong storm with violent winds that comes from the sea', vi: 'bão lớn', icon: '🌀',
    example: 'The typhoon hit the coast with very strong winds.', exampleVi: 'Cơn bão lớn đổ bộ vào bờ biển với sức gió rất mạnh.',
    situations: ['Strong winds and heavy rain from the sea blew the roofs off houses in Quang Ngai.', 'The weather report says a huge storm from the East Sea will arrive tomorrow.', 'Fishing boats must stay in the harbour because a violent storm is coming.'] },
  { word: 'landslide', topic: 'disasters', definition: 'a mass of earth and rocks suddenly falling down the side of a hill', vi: 'sạt lở đất', icon: '🪨',
    example: 'A landslide blocked the mountain road.', exampleVi: 'Một vụ sạt lở đất đã chặn con đường núi.',
    situations: ['After heavy rain, mud and rocks slid down the hill onto the road.', 'The side of the mountain fell and covered three houses with earth.', 'The road to Ha Giang is closed because rocks and mud came down from the hill.'] },
  { word: 'wildfire', topic: 'disasters', definition: 'a big fire that spreads quickly through forests or grass', vi: 'cháy rừng', icon: '🔥',
    example: 'The wildfire burned thousands of trees.', exampleVi: 'Vụ cháy rừng đã thiêu rụi hàng nghìn cái cây.',
    situations: ['In the dry season, flames spread fast through the forest and burned for days.', 'Firefighters used helicopters to put out the flames in the hills.', 'Hot, dry weather and strong wind made the flames jump from tree to tree.'] },
  // People in need
  { word: 'poverty', topic: 'people-in-need', definition: 'the state of being very poor', vi: 'cảnh nghèo khó', icon: '💸',
    example: 'Many families still live in poverty.', exampleVi: 'Nhiều gia đình vẫn sống trong cảnh nghèo khó.',
    situations: ['The family doesn\'t have enough money for rent, clothes or school books.', 'Many people in the world live on less than two dollars a day.', 'Education helps children escape from a life with very little money.'] },
  { word: 'homeless', topic: 'people-in-need', definition: 'having no place to live', vi: 'vô gia cư', icon: '⛺',
    example: 'The charity gives food to homeless people.', exampleVi: 'Tổ chức từ thiện phát đồ ăn cho người vô gia cư.',
    situations: ['The man sleeps on a bench in the park because he has no house.', 'After the flood, hundreds of families had nowhere to live.', 'In winter, the city opens warm rooms for people who sleep on the streets.'] },
  { word: 'hunger', topic: 'people-in-need', definition: 'the problem of not having enough food to eat', vi: 'nạn đói', icon: '🍽️',
    example: 'Millions of children suffer from hunger.', exampleVi: 'Hàng triệu trẻ em phải chịu nạn đói.',
    situations: ['The children hadn\'t eaten for two days and their stomachs hurt.', 'After the drought, there was not enough food for the village.', 'Food banks give meals to people who don\'t get enough to eat.'] },
  { word: 'disease', topic: 'people-in-need', definition: 'an illness, especially a serious one', vi: 'bệnh tật', icon: '🦠',
    example: 'Dirty water can spread disease.', exampleVi: 'Nước bẩn có thể lây lan bệnh tật.',
    situations: ['Mosquitoes can carry dengue fever and make people very ill.', 'Doctors are trying to find a cure for this serious illness.', 'Washing your hands stops many illnesses from spreading.'] },
  { word: 'unemployed', topic: 'people-in-need', definition: 'without a job', vi: 'thất nghiệp', icon: '📉',
    example: 'My uncle has been unemployed since the factory closed.', exampleVi: 'Chú tôi bị thất nghiệp từ khi nhà máy đóng cửa.',
    situations: ['The factory closed, and now 500 workers have no jobs.', 'He looks for work every day, but nobody will give him a job.', 'She lost her job last year and still can\'t find a new one.'] },
  { word: 'crime', topic: 'people-in-need', definition: 'actions that are against the law', vi: 'tội phạm', icon: '🚨',
    example: 'The police are working hard to stop crime.', exampleVi: 'Cảnh sát đang nỗ lực ngăn chặn tội phạm.',
    situations: ['Stealing bikes and breaking into houses are against the law.', 'There is more stealing in this area, so the police walk the streets at night.', 'Someone took money from the bank. The police are looking for the thief.'] },
  // Solutions
  { word: 'charity', topic: 'solutions', definition: 'an organisation that collects money to help people in need', vi: 'tổ chức từ thiện', icon: '🤝',
    example: 'She works for a charity that helps poor children.', exampleVi: 'Cô ấy làm việc cho một tổ chức từ thiện giúp đỡ trẻ em nghèo.',
    situations: ['This organisation collects money to build schools in poor villages.', 'We sold cakes at school and gave the money to a group that helps sick children.', 'The Red Cross is one of the biggest of these organisations in the world.'] },
  { word: 'volunteer', topic: 'solutions', definition: 'a person who works for free to help others', vi: 'tình nguyện viên', icon: '🙋',
    example: 'Volunteers cleaned the beach on Sunday.', exampleVi: 'Các tình nguyện viên đã dọn sạch bãi biển vào Chủ nhật.',
    situations: ['Lan helps at the animal shelter every weekend, and she gets no money for it.', 'Students in green shirts spend their summer teaching children in the mountains for free.', 'The hospital needs people who will read to sick children without pay.'] },
  { word: 'donate', topic: 'solutions', definition: 'give money or things to help people', vi: 'quyên góp', icon: '🎁',
    example: 'We donated our old books to a school in the mountains.', exampleVi: 'Chúng tôi quyên góp sách cũ cho một trường học vùng cao.',
    situations: ['We gave our old clothes to families who lost everything in the flood.', 'Dad sends money every month to help children in hospital.', 'Our class collected books and gave them to a village school.'] },
  { word: 'solar panel', topic: 'solutions', definition: 'a flat piece of equipment that makes electricity from sunlight', vi: 'tấm pin mặt trời', icon: '☀️',
    example: 'Our school has solar panels on the roof.', exampleVi: 'Trường tôi có các tấm pin mặt trời trên mái.',
    situations: ['These dark, flat things on the roof make electricity when the sun shines.', 'Ninh Thuan has large farms of these to make clean power from the sun.', 'Our house uses the sun to make electricity, so our bills are lower.'] },
  { word: 'reuse', topic: 'solutions', definition: 'use something again instead of throwing it away', vi: 'tái sử dụng', icon: '♻️',
    example: 'Reuse your plastic bags when you go shopping.', exampleVi: 'Hãy dùng lại túi ni lông khi đi mua sắm.',
    situations: ['I wash old glass jars and use them again to keep pens in.', 'Don\'t throw that box away. We can use it again for your toys.', 'Mum takes the same cloth bags to the market every week.'] },
  { word: 'campaign', topic: 'solutions', definition: 'a plan of activities to change something or to tell people about a problem', vi: 'chiến dịch', icon: '📣',
    example: 'Our school started a campaign to say no to plastic.', exampleVi: 'Trường tôi bắt đầu một chiến dịch nói không với đồ nhựa.',
    situations: ['For a month, students made posters and videos to ask people to stop using plastic straws.', 'Earth Hour asks everyone to turn off their lights for one hour.', 'The city organised many activities to tell people about clean air.'] },
];
