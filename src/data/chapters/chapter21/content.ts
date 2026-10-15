import type { VocabWord } from '../shared';

/**
 * A2 Unit 19 (id 61): actions done to a thing, in present and past passive.
 * Every verb here is transitive only, so the active form with the thing as subject is wrong.
 * wrong = a typical wrong participle (past simple form, regularised form or base form).
 */
export const PASSIVE_ITEMS = [
  { key: 'classroom', subj: 'the classroom', plural: false, base: 'sweep', pp: 'swept', wrong: 'sweeped', tail: '', now: 'every afternoon', past: 'yesterday afternoon' },
  { key: 'letters', subj: 'the letters', plural: true, base: 'deliver', pp: 'delivered', wrong: 'deliver', tail: '', now: 'every morning', past: "at nine o'clock this morning" },
  { key: 'plants', subj: 'the plants', plural: true, base: 'water', pp: 'watered', wrong: 'water', tail: '', now: 'twice a week', past: 'last night' },
  { key: 'flag', subj: 'the flag', plural: false, base: 'raise', pp: 'raised', wrong: 'raise', tail: '', now: 'every Monday morning', past: 'last Monday morning' },
  { key: 'song', subj: 'this song', plural: false, base: 'sing', pp: 'sung', wrong: 'sang', tail: '', now: 'at every school party', past: 'at the school party last Friday' },
  { key: 'tests', subj: 'the tests', plural: true, base: 'mark', pp: 'marked', wrong: 'mark', tail: '', now: 'every weekend', past: 'last weekend' },
  { key: 'rubbish', subj: 'the rubbish', plural: false, base: 'take', pp: 'taken', wrong: 'took', tail: 'away', now: 'every Tuesday', past: 'last Tuesday' },
  { key: 'windows', subj: 'the windows', plural: true, base: 'wash', pp: 'washed', wrong: 'wash', tail: '', now: 'once a month', past: 'last month' },
  { key: 'lunch', subj: 'lunch', plural: false, base: 'serve', pp: 'served', wrong: 'serve', tail: 'in the canteen', now: "at eleven o'clock every day", past: "at eleven o'clock yesterday" },
  { key: 'class-photo', subj: 'the class photo', plural: false, base: 'take', pp: 'taken', wrong: 'took', tail: 'in front of the school', now: 'every June', past: 'last June' },
  { key: 'posters', subj: 'the posters', plural: true, base: 'put', pp: 'put', wrong: 'putted', tail: 'up on the walls', now: 'every September', past: 'last September' },
  { key: 'homework', subj: 'the homework', plural: false, base: 'give', pp: 'given', wrong: 'gave', tail: 'out', now: 'on Fridays', past: 'last Friday' },
  { key: 'money', subj: 'the money', plural: false, base: 'keep', pp: 'kept', wrong: 'keeped', tail: 'in a safe', now: 'every night', past: 'last night' },
  { key: 'bread', subj: 'the bread', plural: false, base: 'make', pp: 'made', wrong: 'make', tail: 'fresh', now: 'every morning', past: 'this morning' },
  { key: 'library-books', subj: 'the library books', plural: true, base: 'bring', pp: 'brought', wrong: 'bringed', tail: 'back', now: 'on Mondays', past: 'last Monday' },
  { key: 'emails', subj: 'the emails', plural: true, base: 'send', pp: 'sent', wrong: 'sended', tail: 'to all parents', now: 'every week', past: 'last week' },
  { key: 'meeting', subj: 'the meeting', plural: false, base: 'hold', pp: 'held', wrong: 'holded', tail: 'in the school hall', now: 'every month', past: 'last month' },
  { key: 'cakes', subj: 'the cakes', plural: true, base: 'decorate', pp: 'decorated', wrong: 'decorate', tail: 'with fresh fruit', now: 'every Saturday', past: 'last Saturday' },
] as const;

/** Unit 61: passive with by + agent. [sentence with ___ and (verb), answer, three wrong forms] */
export const BY_AGENT_ITEMS = [
  ['The Tale of Kieu ___ by Nguyen Du. (write)', 'was written', ['wrote', 'was writing', 'was wrote']],
  ['The telephone ___ by Alexander Graham Bell. (invent)', 'was invented', ['invented', 'was inventing', 'is invent']],
  ['This áo dài ___ by my grandmother in 1985. (make)', 'was made', ['made', 'was making', 'is made']],
  ['Most of our vegetables ___ by farmers near Da Lat. (grow)', 'are grown', ['grow', 'are growing', 'is grown']],
  ['The kitchen window ___ by a football yesterday. (break)', 'was broken', ['broke', 'was breaking', 'was broke']],
  ['Our school ___ by hundreds of visitors every year. (visit)', 'is visited', ['visits', 'is visiting', 'are visited']],
  ['The Long Bien Bridge ___ by French engineers more than a hundred years ago. (build)', 'was built', ['built', 'is built', 'was building']],
  ['Lucky money ___ to children by their grandparents at Tết. (give)', 'is given', ['gives', 'is gave', 'are given']],
  ['The film ___ by millions of people last year. (watch)', 'was watched', ['watched', 'is watched', 'was watching']],
  ['The school T-shirts ___ by students in our art club last term. (design)', 'were designed', ['designed', 'are designed', 'was designed']],
  ['The thief ___ by the police last night. (catch)', 'was caught', ['caught', 'was catched', 'is caught']],
  ['Phở ___ by millions of people around the world. (eat)', 'is eaten', ['eats', 'is ate', 'are eaten']],
  ['The Mona Lisa ___ by Leonardo da Vinci. (paint)', 'was painted', ['painted', 'was painting', 'is paint']],
] as const;

type ArticleItem = readonly [gap: string, answer: string, wrong: readonly [string, string]];

/** Unit 62: a / an with jobs, rates (twice a week) and What a …! */
export const A_AN_ITEMS: readonly ArticleItem[] = [
  ['My aunt looks after sick animals. She is ___.', 'a vet', ['vet', 'an vet']],
  ['Mr Hai flies planes for an airline. He is ___.', 'a pilot', ['pilot', 'an pilot']],
  ["Lan's mother is ___. She designs houses.", 'an architect', ['architect', 'a architect']],
  ['My uncle is ___. He cooks in a big hotel kitchen.', 'a chef', ['chef', 'an chef']],
  ['Her brother is ___. He repairs cars.', 'a mechanic', ['mechanic', 'an mechanic']],
  ['Mr Long is ___. He has written ten books.', 'an author', ['author', 'a author']],
  ['My uncle is ___. He repairs lights and wires.', 'an electrician', ['electrician', 'a electrician']],
  ['Mrs Thu is ___. She works at a desk in a big company.', 'an office worker', ['office worker', 'a office worker']],
  ['We go swimming twice ___.', 'a week', ['week', 'the week']],
  ['Brush your teeth two times ___.', 'a day', ['day', 'the day']],
  ['The train travels at 120 kilometres ___.', 'an hour', ['a hour', 'hour']],
  ["What ___ day! It's sunny and warm.", 'a lovely', ['lovely', 'an lovely']],
  ["What ___ idea! Let's do it.", 'a great', ['great', 'an great']],
  ["What ___ story! I couldn't stop laughing.", 'a funny', ['funny', 'an funny']],
];

/** Unit 62: no article for things in general; the for specific, known things. */
export const GENERAL_SPECIFIC_ITEMS: readonly ArticleItem[] = [
  ['___ are very clever animals. (dolphins in general)', 'Dolphins', ['The dolphins', 'Dolphin']],
  ['___ is good for your health. (fruit in general)', 'Fruit', ['The fruit', 'Fruits']],
  ['My little brother hates ___. (vegetables in general)', 'vegetables', ['the vegetables', 'vegetable']],
  ['I love ___. (music in general)', 'music', ['the music', 'musics']],
  ['___ is more important than money. (health in general)', 'Health', ['The health', 'A health']],
  ['Teenagers need a lot of ___. (sleep in general)', 'sleep', ['the sleep', 'sleeps']],
  ["I don't drink ___. (coffee in general)", 'coffee', ['the coffee', 'coffees']],
  ['___ that you made was delicious.', 'The soup', ['Soup', 'Soups']],
  ["Can you pass me ___, please? It's next to you.", 'the salt', ['salt', 'a salt']],
  ['Where are ___ I gave you yesterday?', 'the keys', ['keys', 'a keys']],
  ["Please close ___. It's cold in here.", 'the window', ['window', 'a windows']],
  ['How was ___ you watched last night?', 'the film', ['film', 'a film']],
];

/** Unit 62: place names with and without the. */
export const PLACE_NAME_ITEMS: readonly ArticleItem[] = [
  ['My cousin lives in ___.', 'Da Nang', ['the Da Nang', 'a Da Nang']],
  ['___ is the longest river in Africa.', 'The Nile', ['Nile', 'A Nile']],
  ['We took a boat trip on ___.', 'the Red River', ['Red River', 'a Red River']],
  ['Paris is the capital of ___.', 'France', ['the France', 'a France']],
  ['My uncle works in ___. He lives in New York.', 'the USA', ['USA', 'a USA']],
  ['Thousands of people climb ___ every year.', 'Mount Fansipan', ['the Mount Fansipan', 'a Mount Fansipan']],
  ['___ are the highest mountains in the world.', 'The Himalayas', ['Himalayas', 'A Himalayas']],
  ['Australia is between the Indian Ocean and ___.', 'the Pacific Ocean', ['Pacific Ocean', 'a Pacific Ocean']],
  ['___ is a beautiful lake in the middle of Hanoi.', 'Hoan Kiem Lake', ['The Hoan Kiem Lake', 'A Hoan Kiem Lake']],
  ['London is the capital of ___.', 'the United Kingdom', ['United Kingdom', 'a United Kingdom']],
  ['Lan wants to study in ___ next year.', 'Japan', ['the Japan', 'a Japan']],
  ['Ha Long Bay is in the north of ___.', 'Vietnam', ['the Vietnam', 'a Vietnam']],
  ['___ is the biggest country in South America.', 'Brazil', ['The Brazil', 'A Brazil']],
  ['Manila is the capital of ___.', 'the Philippines', ['Philippines', 'a Philippines']],
];

/** Unit 62: fixed phrases with no article, and a few with the. */
export const FIXED_PHRASE_ITEMS: readonly ArticleItem[] = [
  ["I usually go to ___ at ten o'clock.", 'bed', ['the bed', 'a bed']],
  ["We have ___ at seven o'clock every evening.", 'dinner', ['the dinner', 'a dinner']],
  ["Mum isn't at work today. She's at ___.", 'home', ['the home', 'a home']],
  ['Grandpa listens to ___ every morning.', 'the radio', ['radio', 'a radio']],
  ['My cousins go to Hue ___.', 'by train', ['by the train', 'by a train']],
  ['I always do my homework in ___.', 'the evening', ['evening', 'an evening']],
  ['Bats sleep in the day and fly ___.', 'at night', ['at the night', 'at a night']],
  ['Do you have ___ at school or at home?', 'lunch', ['the lunch', 'a lunch']],
  ['Children in Vietnam start going to ___ at the age of six.', 'school', ['the school', 'a school']],
  ['Dad goes to ___ by motorbike.', 'work', ['the work', 'a work']],
  ['They travelled from Hanoi to Ho Chi Minh City ___.', 'by plane', ['by the plane', 'by a plane']],
  ['I get up early in ___.', 'the morning', ['morning', 'a morning']],
  ["Let's go ___ at the weekend. (to buy things)", 'shopping', ['the shopping', 'a shopping']],
];

/** A2 Unit 21 (id 63): customs and traditions. */
export const CUSTOM_WORDS: readonly VocabWord[] = [
  // Festivals
  { word: 'festival', topic: 'festivals', definition: 'a special day or time when people celebrate something together', vi: 'lễ hội', icon: '🎉',
    example: 'The Mid-Autumn Festival is my favourite time of year.', exampleVi: 'Tết Trung thu là thời điểm tôi thích nhất trong năm.',
    situations: ['Every spring, our town has music, food stalls and games in the streets for three days.', 'Hue has a big one every two years with art, music and boat races.', 'People in the village celebrate the rice harvest with songs and dances every year.'] },
  { word: 'parade', topic: 'festivals', definition: 'a line of people, cars or animals moving through the streets to celebrate', vi: 'cuộc diễu hành', icon: '🎺',
    example: 'We watched the parade from the balcony.', exampleVi: 'Chúng tôi xem cuộc diễu hành từ ban công.',
    situations: ['Dancers, drummers and big colourful dragons move slowly down the main street.', 'People stand on both sides of the road and wave as the bands march past.', 'On National Day, soldiers march through the square with flags.'] },
  { word: 'fireworks', topic: 'festivals', definition: 'things that explode in the sky with bright colours and loud noises', vi: 'pháo hoa', icon: '🎆',
    example: 'At midnight, the sky was full of fireworks.', exampleVi: 'Lúc nửa đêm, bầu trời rực rỡ pháo hoa.',
    situations: ["At midnight on New Year's Eve, the sky over the river turns red, gold and green with loud bangs.", 'Bang! Pop! Bright colours fill the dark sky and everyone says "Wow!"', 'Every summer, teams from many countries light up the sky over the Han River in Da Nang.'] },
  { word: 'lantern', topic: 'festivals', definition: 'a light inside a paper or glass box, often carried at festivals', vi: 'đèn lồng', icon: '🏮',
    example: 'The children carried star-shaped lanterns.', exampleVi: 'Bọn trẻ cầm những chiếc đèn ông sao.',
    situations: ['In Hoi An, colourful paper lights hang over every street at night.', 'At the Mid-Autumn Festival, children walk around with a star-shaped light with a candle inside.', 'We made a light from red paper and bamboo and hung it outside the door.'] },
  { word: 'mooncake', topic: 'festivals', definition: 'a round sweet cake eaten at the Mid-Autumn Festival', vi: 'bánh trung thu', icon: '🥮',
    example: 'Grandma bought a box of mooncakes.', exampleVi: 'Bà mua một hộp bánh trung thu.',
    situations: ['This round cake has lotus seeds and an egg yolk inside.', 'In September, shops sell boxes of these sweet round cakes as gifts.', 'We cut the round cake into small pieces and share it while we look at the full moon.'] },
  { word: 'costume', topic: 'festivals', definition: 'special clothes you wear to look like someone or something else', vi: 'trang phục hóa trang', icon: '🦸',
    example: 'Nam wore a lion costume for the school show.', exampleVi: 'Nam mặc bộ đồ hóa trang sư tử trong buổi diễn ở trường.',
    situations: ['For the school play, Lan dresses up as a princess with a crown and a long gown.', 'At the Halloween party, my brother looked like a ghost in white clothes.', 'The dancers wear red and gold clothes that make them look like a lion.'] },
  // Celebrating
  { word: 'celebrate', topic: 'celebrating', definition: 'do something special and enjoyable for an important day or event', vi: 'ăn mừng, kỷ niệm', icon: '🥳',
    example: 'How do you celebrate your birthday?', exampleVi: 'Bạn tổ chức sinh nhật như thế nào?',
    situations: ['We won the football final, so we went out for pizza and sang songs.', 'My grandparents got married fifty years ago, so the whole family is having a big party.', 'Lan passed her exams, so her family had a special dinner.'] },
  { word: 'decorate', topic: 'celebrating', definition: 'make a place look nicer by putting pretty things in it', vi: 'trang trí', icon: '🎀',
    example: 'We decorated the classroom with flowers.', exampleVi: 'Chúng tôi trang trí lớp học bằng hoa.',
    situations: ['Before Tết, we put peach blossom, red banners and lights all around the house.', 'For the party, we hung balloons and paper chains on the walls.', 'Mum put candles and flowers on the table to make it look beautiful.'] },
  { word: 'lucky money', topic: 'celebrating', definition: 'money in a red envelope that adults give to children at Tết', vi: 'tiền lì xì', icon: '🧧',
    example: 'I got lucky money from my grandparents.', exampleVi: 'Tôi được ông bà lì xì.',
    situations: ['On the first day of Tết, Grandpa gives me a small red envelope and says "Study well!"', 'Uncle Hai puts some new notes into red envelopes for all the children in the family.', 'I am saving the money from my red envelopes to buy a new bike.'] },
  { word: 'ceremony', topic: 'celebrating', definition: 'a formal event with special actions or words, for example a wedding or a prize-giving', vi: 'nghi lễ, buổi lễ', icon: '🎖️',
    example: 'The opening ceremony starts at eight.', exampleVi: 'Lễ khai mạc bắt đầu lúc tám giờ.',
    situations: ['Every Monday morning, all the students stand in the school yard while the flag goes up.', 'At the end of the school year, the head teacher gives prizes on a stage to the best students.', 'The Olympic Games start with a big formal event with music, flags and the athletes walking in.'] },
  { word: 'feast', topic: 'celebrating', definition: 'a large special meal for many people', vi: 'bữa tiệc lớn, mâm cỗ', icon: '🍗',
    example: 'We had a big feast on the first day of Tết.', exampleVi: 'Chúng tôi có một mâm cỗ lớn vào ngày mùng Một Tết.',
    situations: ["On New Year's Eve, the table is full of sticky rice cakes, spring rolls, chicken and soup for twenty people.", 'After the wedding, three hundred guests enjoy a huge meal together.', 'The whole village cooks together and eats a big meal to give thanks for the harvest.'] },
  { word: 'wish', topic: 'celebrating', definition: 'say that you hope good things will happen to someone', vi: 'chúc', icon: '🌟',
    example: 'We wish you a happy new year!', exampleVi: 'Chúng tôi chúc bạn năm mới vui vẻ!',
    situations: ['I said to Grandma, "I hope you have a long and healthy life!"', 'Before she blew out the candles, everyone said, "Happy birthday! Good luck!"', 'On Tết morning, children say kind words about good health and luck to their grandparents.'] },
  // Family customs
  { word: 'tradition', topic: 'family-customs', definition: 'a way of doing something that people in a family or country have done for a long time', vi: 'truyền thống', icon: '📜',
    example: 'Making bánh chưng is a Tết tradition.', exampleVi: 'Gói bánh chưng là một truyền thống ngày Tết.',
    situations: ['In our family, we have made sticky rice cakes together before Tết since Great-grandma was young.', 'In Scotland, people have played bagpipes at special events for hundreds of years.', 'Every year for a century, the village has held a boat race on the river.'] },
  { word: 'ancestor', topic: 'family-customs', definition: 'a family member who lived a long time ago, before your grandparents', vi: 'tổ tiên', icon: '🪷',
    example: 'We remember our ancestors at Tết.', exampleVi: 'Chúng tôi tưởng nhớ tổ tiên vào dịp Tết.',
    situations: ['My great-great-grandparents lived in this village two hundred years ago.', 'Our family book shows the names of everyone in our family back to the 1800s.', 'On special days, we remember the people of our family who lived many, many years before us.'] },
  { word: 'generation', topic: 'family-customs', definition: 'all the people in a family or society who are about the same age', vi: 'thế hệ', icon: '👨‍👩‍👧',
    example: 'Three generations live in our house.', exampleVi: 'Ba thế hệ sống trong nhà chúng tôi.',
    situations: ['My grandparents, my parents and my brother and I live together: that makes three of these.', "Grandma's age group grew up without the internet, but mine can't imagine life without it.", 'Young people today use phones much more than their parents did at their age.'] },
  { word: 'altar', topic: 'family-customs', definition: 'a special table in a home or temple where people put flowers, fruit and incense', vi: 'bàn thờ', icon: '🕯️',
    example: 'Mum puts five kinds of fruit on the altar.', exampleVi: 'Mẹ bày mâm ngũ quả lên bàn thờ.',
    situations: ['Before Tết, we put a tray of five fruits and a vase of flowers on this special table.', 'There are photos of my great-grandparents and some incense on it in the living room.', 'In the temple, people put fruit and flowers on it and pray.'] },
  { word: 'wedding', topic: 'family-customs', definition: 'a ceremony where two people get married', vi: 'đám cưới', icon: '💒',
    example: "My cousin's wedding is in December.", exampleVi: 'Đám cưới của chị họ tôi vào tháng Mười Hai.',
    situations: ['My aunt wore a red áo dài and married her boyfriend in front of 300 guests.', 'The bride and groom cut the cake and everyone clapped.', 'We were invited to a big party on the day my uncle got married.'] },
  { word: 'anniversary', topic: 'family-customs', definition: 'the same date every year after something important happened', vi: 'ngày kỷ niệm, ngày giỗ', icon: '💐',
    example: "Today is my parents' wedding anniversary.", exampleVi: 'Hôm nay là kỷ niệm ngày cưới của bố mẹ tôi.',
    situations: ['My parents got married on 10 May 2005, so every 10 May they go out for dinner.', 'Our school opened exactly 50 years ago today, so there is a special celebration.', 'It is exactly one year since Grandpa died, so the family meets to remember him.'] },
  // Manners
  { word: 'bow', topic: 'manners', definition: 'bend your head or body forward to show respect', vi: 'cúi chào', icon: '🙇',
    example: 'In Japan, people bow when they meet.', exampleVi: 'Ở Nhật, mọi người cúi chào khi gặp nhau.',
    situations: ['In Japan, students bend forward from the waist to show respect to their teacher.', 'At the end of the show, the actors bent forward and the audience clapped.', 'He lowered his head politely in front of the old man.'] },
  { word: 'shake hands', topic: 'manners', definition: "hold someone's right hand and move it up and down when you meet", vi: 'bắt tay', icon: '🤝',
    example: 'The two players shook hands after the match.', exampleVi: 'Hai cầu thủ bắt tay nhau sau trận đấu.',
    situations: ["When Dad meets a new colleague, they hold each other's right hand and move it up and down.", 'After the match, the players from both teams did this to say "good game".', 'The two presidents smiled for the cameras with their right hands joined.'] },
  { word: 'greet', topic: 'manners', definition: 'say hello to someone when you meet them', vi: 'chào hỏi', icon: '👋',
    example: 'Always greet your teachers politely.', exampleVi: 'Luôn chào thầy cô một cách lễ phép.',
    situations: ['When I see my neighbour in the morning, I smile and say "Good morning, Mrs Hoa!"', 'Nam says "Good morning, Mr Long!" to his teacher at the school gate.', 'The hotel receptionist smiles and says "Hello, how can I help you?" to everyone who comes in.'] },
  { word: 'chopsticks', topic: 'manners', definition: 'two thin sticks that people use to eat with in Asia', vi: 'đũa', icon: '🥢',
    example: "Don't stick your chopsticks into your rice.", exampleVi: 'Đừng cắm đũa vào bát cơm.',
    situations: ['In Vietnam, we pick up our food with these two thin sticks.', "It's bad manners to leave them standing up in your bowl of rice.", 'My English friend is learning to eat noodles with them, not with a fork.'] },
  { word: 'guest', topic: 'manners', definition: 'a person you invite to your home or to an event', vi: 'khách', icon: '🧳',
    example: 'We have three guests for dinner tonight.', exampleVi: 'Tối nay nhà tôi có ba vị khách đến ăn tối.',
    situations: ["My uncle and aunt are coming to stay with us for the weekend, so I'm giving them my room.", 'There were 200 people at the party, and each one had an invitation.', 'At Tết, the first person who visits your house in the new year is very important.'] },
  { word: 'host', topic: 'manners', definition: 'a person who invites people and looks after them', vi: 'chủ nhà', icon: '🏠',
    example: 'The host offered us tea and cakes.', exampleVi: 'Chủ nhà mời chúng tôi trà và bánh.',
    situations: ['Lan invited everyone to her party and made sure they all had food and drinks.', "Mai's mother cooked for us, poured us tea and made us feel at home.", 'Our school invited students from Japan, and we looked after them during their visit.'] },
];
