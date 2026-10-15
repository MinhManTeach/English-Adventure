import type { VocabWord } from '../shared';

/** [sentence with ___ and an optional (hint), answer, three wrong options] */
export type GapLine = readonly [string, string, readonly [string, string, string]];

/** Unit 58: present continuous for fixed arrangements. */
export const ARRANGEMENT_ITEMS: readonly GapLine[] = [
  ['I ___ Lan at the cinema at seven tonight. (meet)', 'am meeting', ['am meet', 'meeting', 'is meeting']],
  ['We ___ to Phu Quoc next Saturday. We\'ve got our tickets. (fly)', 'are flying', ['are fly', 'flying', 'is flying']],
  ['My aunt ___ us on Sunday. She\'s bringing her new baby. (visit)', 'is visiting', ['is visit', 'visiting', 'are visiting']],
  ['___ you doing anything special this weekend?', 'Are', ['Do', 'Is', 'Will']],
  ['What time ___ Minh having his piano lesson tomorrow?', 'is', ['does', 'are', 'has']],
  ['I ___ to the party tonight. I have to study. (not go)', 'am not going', ['am not go', 'not going', 'isn\'t going']],
  ['The Year 9 students ___ a play at the end of term. (perform)', 'are performing', ['are perform', 'performing', 'is performing']],
  ['Dad ___ his new job next Monday. (start)', 'is starting', ['is start', 'starting', 'are starting']],
  ['Where ___ having your birthday party? (you)', 'are you', ['you are', 'do you', 'is you']],
  ['Mai and her mum ___ shopping for Tết clothes tomorrow. (go)', 'are going', ['are go', 'going', 'is going']],
  ['Sorry, I can\'t play tomorrow. I ___ my grandparents in Nam Dinh. (visit)', 'am visiting', ['am visit', 'visiting', 'is visiting']],
  ['Nam ___ football this afternoon. He has hurt his leg. (not play)', 'isn\'t playing', ['isn\'t play', 'not playing', 'aren\'t playing']],
];

/** Unit 58: present simple for timetables and schedules. */
export const TIMETABLE_ITEMS: readonly GapLine[] = [
  ['The train to Hanoi ___ at 6.15 tomorrow morning. (leave)', 'leaves', ['leave', 'is leave', 'leaving']],
  ['The film ___ at 8 pm, so let\'s meet at 7.30. (start)', 'starts', ['start', 'is start', 'starting']],
  ['Our summer holiday ___ on 31 May this year. (begin)', 'begins', ['begin', 'is begin', 'beginning']],
  ['What time ___ the museum open on Sunday?', 'does', ['do', 'is', 'are']],
  ['The night bus ___ in Hue at 10 pm. (arrive)', 'arrives', ['arrive', 'is arrive', 'arriving']],
  ['The shops ___ until 10 pm during the festival. (not close)', 'don\'t close', ['doesn\'t close', 'not close', 'aren\'t close']],
  ['When ___ the next boat to Cat Ba leave?', 'does', ['do', 'is', 'are']],
  ['The concert ___ at ten o\'clock, so we can get home early. (finish)', 'finishes', ['finish', 'is finish', 'finishing']],
  ['My flight ___ in Singapore for two hours. (stop)', 'stops', ['stop', 'is stop', 'stopping']],
  ['The new term ___ until 5 September. (not start)', 'doesn\'t start', ['don\'t start', 'not start', 'isn\'t start']],
  ['___ the swimming pool close early on Saturdays?', 'Does', ['Do', 'Is', 'Are']],
  ['The plane ___ off at 13.40. Don\'t be late! (take)', 'takes', ['take', 'is take', 'taking']],
];

/** Unit 58: when / as soon as / before / after / until + present simple for the future. */
export const TIME_CLAUSE_ITEMS: readonly GapLine[] = [
  ['I\'ll call you when I ___ home. (get)', 'get', ['will get', 'gets', 'got']],
  ['As soon as Lan ___ the results, she\'ll tell us. (know)', 'knows', ['will know', 'know', 'knowing']],
  ['We won\'t start dinner until Dad ___ back. (come)', 'comes', ['will come', 'come', 'came']],
  ['Before you ___ the house, turn off the lights. (leave)', 'leave', ['will leave', 'leaves', 'left']],
  ['When I ___ older, I\'ll be a pilot. (be)', 'am', ['will be', 'be', 'was']],
  ['I\'ll lend you this book when I ___ it. (finish)', 'finish', ['will finish', 'finishes', 'finishing']],
  ['Nam will text us as soon as his train ___. (arrive)', 'arrives', ['will arrive', 'arrive', 'arriving']],
  ['Wait here until I ___ you. (call)', 'call', ['will call', 'calls', 'calling']],
  ['Mai will feel better when she ___ some sleep. (get)', 'gets', ['will get', 'get', 'got']],
  ['Don\'t open your presents before Grandma ___. (arrive)', 'arrives', ['will arrive', 'arrive', 'arrived']],
  ['When we ___ in Da Lat, we\'ll visit the flower gardens. (be)', 'are', ['will be', 'is', 'were']],
  ['I\'ll do the washing-up after the film ___. (finish)', 'finishes', ['will finish', 'finish', 'finishing']],
];

/** Unit 59: should / shouldn't for advice. */
export const SHOULD_ITEMS: readonly GapLine[] = [
  ['You look tired. You ___ go to bed early tonight. (advice)', 'should', ['should to', 'shoulds', 'are should']],
  ['You ___ eat so many sweets. They\'re bad for your teeth. (advice)', 'shouldn\'t', ['shouldn\'t to', 'don\'t should', 'not should']],
  ['___ I tell the teacher about the problem? (ask for advice)', 'Should', ['Am', 'Does', 'Have']],
  ['Lan ___ wear a coat. It\'s very cold outside. (advice)', 'should', ['shoulds', 'should to', 'is should']],
  ['You ___ swim right after a big meal. (advice)', 'shouldn\'t', ['shouldn\'t to', 'don\'t should', 'not should']],
  ['What do you think I ___ buy for Mum\'s birthday? (ask for advice)', 'should', ['should to', 'shoulds', 'am should']],
  ['Minh ___ spend so much time on his phone. (advice)', 'shouldn\'t', ['shouldn\'t to', 'doesn\'t should', 'not should']],
  ['We ___ leave now, or we\'ll miss the bus. (advice)', 'should', ['should to', 'shoulds', 'are should']],
  ['You ___ drink more water when it\'s hot. (advice)', 'should', ['should to', 'shoulds', 'are should']],
  ['People ___ drop litter on the beach. (advice)', 'shouldn\'t', ['shouldn\'t to', 'don\'t should', 'not should']],
  ['___ we bring some food to the class party? (ask for advice)', 'Should', ['Are', 'Does', 'Have']],
  ['Your English is good, but you ___ read more books in English. (advice)', 'should', ['should to', 'shoulds', 'are should']],
];

/** Unit 59: mustn't (not allowed) or don't have to (not necessary). */
export const MUSTNT_ITEMS: readonly GapLine[] = [
  ['You ___ use your phone in the exam room. (it\'s against the rules)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
  ['We ___ wear a uniform on Saturdays. (it isn\'t necessary)', 'don\'t have to', ['don\'t have', 'mustn\'t', 'doesn\'t have to']],
  ['Lan ___ get up early tomorrow. It\'s a holiday! (it isn\'t necessary)', 'doesn\'t have to', ['doesn\'t has to', 'mustn\'t', 'don\'t have to']],
  ['You ___ swim here. The water is dangerous. (it isn\'t allowed)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
  ['Passengers ___ smoke on the plane. (it\'s against the law)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
  ['You ___ bring food. There will be lots at the party. (it isn\'t necessary)', 'don\'t have to', ['don\'t have', 'mustn\'t', 'doesn\'t have to']],
  ['Minh ___ do the washing-up today. His sister is doing it. (it isn\'t necessary)', 'doesn\'t have to', ['doesn\'t has to', 'mustn\'t', 'don\'t have to']],
  ['You ___ tell anyone my password! (it\'s very important not to)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
  ['Students ___ run in the corridors. (it\'s a school rule)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
  ['We ___ pay to enter the museum on Sundays. It\'s free. (it isn\'t necessary)', 'don\'t have to', ['don\'t have', 'mustn\'t', 'doesn\'t have to']],
  ['Nam ___ wear glasses. His eyes are fine. (it isn\'t necessary)', 'doesn\'t have to', ['doesn\'t has to', 'mustn\'t', 'don\'t have to']],
  ['You ___ cross the road when the light is red. (it isn\'t allowed)', 'mustn\'t', ['mustn\'t to', 'don\'t have to', 'don\'t must']],
];

/** Unit 59: had to / didn't have to / could / couldn't. */
export const PAST_MODAL_ITEMS: readonly GapLine[] = [
  ['Yesterday I ___ get up at five to catch the early bus. (it was necessary)', 'had to', ['had', 'must', 'have to']],
  ['We ___ go to school last Monday. It was a holiday. (it wasn\'t necessary)', 'didn\'t have to', ['didn\'t had to', 'mustn\'t', 'don\'t have to']],
  ['When she was five, Mai ___ already read and write. (ability)', 'could', ['could to', 'can', 'cans']],
  ['I ___ find my keys this morning, so I was late. (no ability)', 'couldn\'t', ['couldn\'t to', 'can\'t', 'didn\'t could']],
  ['___ your grandmother use a computer when she was young? (ability)', 'Could', ['Can', 'Was', 'Has']],
  ['Lan ___ wear a uniform at her old school. (it was a rule)', 'had to', ['had', 'must', 'has to']],
  ['___ Nam have to stay late at school yesterday?', 'Did', ['Does', 'Had', 'Was']],
  ['The test was easy, so we ___ study much. (it wasn\'t necessary)', 'didn\'t have to', ['didn\'t had to', 'mustn\'t', 'don\'t have to']],
  ['My grandfather ___ read until he was ten. (no ability)', 'couldn\'t', ['couldn\'t to', 'can\'t', 'didn\'t could']],
  ['In the past, many children ___ walk a long way to school. (it was necessary)', 'had to', ['had', 'must', 'have to']],
  ['It was so noisy that I ___ hear the teacher. (no ability)', 'couldn\'t', ['couldn\'t to', 'can\'t', 'didn\'t could']],
  ['When I lived near the beach, I ___ swim every day. (it was possible)', 'could', ['could to', 'can', 'cans']],
];

/** Unit 60 Shopping. */
export const SHOP_WORDS: readonly VocabWord[] = [
  // Shops
  { word: 'chemist\'s', topic: 'shops', definition: 'a shop that sells medicine and things for washing', vi: 'hiệu thuốc', icon: '💊',
    example: 'I bought some medicine at the chemist\'s.', exampleVi: 'Tôi mua thuốc ở hiệu thuốc.',
    situations: ['I have a headache, so I need to buy some tablets.', 'Mum gives the doctor\'s note to the woman behind the counter and gets the medicine.', 'You can buy plasters, toothpaste and cough sweets here.'] },
  { word: 'butcher\'s', topic: 'shops', definition: 'a shop that sells meat', vi: 'hàng thịt', icon: '🥩',
    example: 'Mum buys fresh chicken at the butcher\'s.', exampleVi: 'Mẹ mua thịt gà tươi ở hàng thịt.',
    situations: ['We need some pork and beef for the Tết dinner.', 'A man with a big knife cuts the meat you want.', 'You can buy sausages, chicken and lamb in this shop.'] },
  { word: 'bookshop', topic: 'shops', definition: 'a shop that sells books', vi: 'hiệu sách', icon: '📚',
    example: 'There\'s a new bookshop on Trang Tien Street.', exampleVi: 'Có một hiệu sách mới trên phố Tràng Tiền.',
    situations: ['I want to buy a new novel and a dictionary.', 'This shop has shelves of stories, comics and maps for sale.', 'Before the new school year, we buy our textbooks here.'] },
  { word: 'florist\'s', topic: 'shops', definition: 'a shop that sells flowers', vi: 'cửa hàng hoa', icon: '💐',
    example: 'Dad bought roses at the florist\'s for Mum.', exampleVi: 'Bố mua hoa hồng ở cửa hàng hoa để tặng mẹ.',
    situations: ['It\'s Teachers\' Day, so I want to buy a bunch of roses for my teacher.', 'The shop smells wonderful, with lilies and roses everywhere.', 'They sell beautiful branches of peach blossom before Tết.'] },
  { word: 'department store', topic: 'shops', definition: 'one very big shop that sells many different kinds of things on different floors', vi: 'cửa hàng bách hóa', icon: '🏬',
    example: 'You can buy clothes, toys and pans in a department store.', exampleVi: 'Bạn có thể mua quần áo, đồ chơi và xoong nồi ở cửa hàng bách hóa.',
    situations: ['It\'s one huge shop: clothes on the first floor, toys on the second and kitchen things on the third.', 'In this one big store, you take the escalator to the perfume and handbag section.', 'This single store sells everything from shoes to TVs.'] },
  { word: 'shopping centre', topic: 'shops', definition: 'a large building with lots of different shops, cafés and sometimes a cinema', vi: 'trung tâm mua sắm', icon: '🛍️',
    example: 'We met our friends at the shopping centre.', exampleVi: 'Chúng tôi gặp bạn bè ở trung tâm mua sắm.',
    situations: ['This building has fifty different shops, a food court and a cinema.', 'On rainy weekends we walk around a big building full of different shops.', 'In this big building, you can buy shoes in one shop and then eat noodles in a café next door.'] },
  // Money
  { word: 'cash', topic: 'money', definition: 'money in coins and notes', vi: 'tiền mặt', icon: '💵',
    example: 'Can I pay in cash?', exampleVi: 'Tôi trả bằng tiền mặt được không?',
    situations: ['I don\'t have a card, so I pay with notes and coins.', 'The street food seller only takes paper money, not cards.', 'Grandma always keeps some notes and coins in her purse.'] },
  { word: 'change', topic: 'money', definition: 'the money you get back when you give more than the price', vi: 'tiền thừa (tiền trả lại)', icon: '🪙',
    example: 'Here\'s your change: 5,000 dong.', exampleVi: 'Tiền thừa của bạn đây: 5.000 đồng.',
    situations: ['The drink costs 15,000 dong. I give 20,000, so I get 5,000 back.', 'After I paid, the shop assistant gave me back some coins.', 'Don\'t forget the money the seller gives back to you!'] },
  { word: 'price', topic: 'money', definition: 'how much money you must pay for something', vi: 'giá', icon: '🏷️',
    example: 'What\'s the price of this T-shirt?', exampleVi: 'Chiếc áo phông này giá bao nhiêu?',
    situations: ['The label on the shoes says 500,000 dong.', 'How much is this bag? I can\'t see the label.', 'Phones are expensive. I looked at the number on the label and said, "Wow!"'] },
  { word: 'credit card', topic: 'money', definition: 'a small plastic card you use to pay for things', vi: 'thẻ tín dụng', icon: '💳',
    example: 'Dad paid for the TV by credit card.', exampleVi: 'Bố trả tiền ti vi bằng thẻ tín dụng.',
    situations: ['Mum doesn\'t have any notes, so she pays with a small plastic card.', 'He puts a plastic card into the machine and types his PIN.', 'You can\'t buy things online with coins. You need one of these.'] },
  { word: 'discount', topic: 'money', definition: 'an amount taken off the usual price', vi: 'sự giảm giá', icon: '🔖',
    example: 'Students get a 10% discount at this café.', exampleVi: 'Học sinh được giảm giá 10% ở quán cà phê này.',
    situations: ['Show your student card and you pay 20% less.', 'Today everything is 30% off the normal price.', 'If you buy two, the shop takes 50,000 dong off the price.'] },
  { word: 'wallet', topic: 'money', definition: 'a small flat case for carrying money and cards', vi: 'ví', icon: '👛',
    example: 'I left my wallet at home, so I couldn\'t pay.', exampleVi: 'Tôi để quên ví ở nhà nên không trả tiền được.',
    situations: ['Dad keeps his money and cards in this small leather thing in his pocket.', 'He opened it and took out a 50,000 dong note.', 'Someone stole it from his back pocket on the busy street.'] },
  // In the shop
  { word: 'trolley', topic: 'in-the-shop', definition: 'a large metal basket on wheels that you push in a supermarket', vi: 'xe đẩy hàng', icon: '🛒',
    example: 'We filled the trolley with food for Tết.', exampleVi: 'Chúng tôi chất đầy xe đẩy thực phẩm cho Tết.',
    situations: ['We have lots to buy, so I push a big one with four wheels.', 'My little brother loves sitting in it while Mum pushes it around the supermarket.', 'Everything is too heavy to carry, so we put it all in this and push.'] },
  { word: 'basket', topic: 'in-the-shop', definition: 'a small container with a handle that you carry in a shop', vi: 'giỏ (đựng hàng)', icon: '🧺',
    example: 'I only need a few things, so I\'ll take a basket.', exampleVi: 'Tôi chỉ cần vài thứ nên sẽ lấy một cái giỏ.',
    situations: ['I only need milk and bread, so I carry a small one in my hand.', 'Take one from the pile at the door and carry your shopping in it.', 'It has a handle, and it\'s full of fruit from the market.'] },
  { word: 'checkout', topic: 'in-the-shop', definition: 'the place in a supermarket where you pay', vi: 'quầy thanh toán', icon: '🧾',
    example: 'There was a long queue at the checkout.', exampleVi: 'Có một hàng dài ở quầy thanh toán.',
    situations: ['When you have all your shopping, you go here to pay.', 'The cashier scans the food and tells you the total here.', '"Number 3 is open now. Please come this way to pay."'] },
  { word: 'changing room', topic: 'in-the-shop', definition: 'a small room in a shop where you try on clothes', vi: 'phòng thử đồ', icon: '🚪',
    example: 'You can try the dress on in the changing room.', exampleVi: 'Bạn có thể thử váy trong phòng thử đồ.',
    situations: ['I want to try on these jeans. Where can I go?', 'There\'s a mirror and a curtain in this tiny room in the clothes shop.', '"Only three items at a time, please, when you go in to try them on."'] },
  { word: 'shelf', topic: 'in-the-shop', definition: 'a long flat board where things are put in a shop or a cupboard', vi: 'kệ hàng', icon: '🗄️',
    example: 'The rice is on the top shelf.', exampleVi: 'Gạo ở trên kệ trên cùng.',
    situations: ['The shop assistant is putting tins of fish on it, one next to the other.', 'I can\'t reach the cereal. It\'s on the highest one.', 'The milk is on the bottom one, near the floor.'] },
  { word: 'size', topic: 'in-the-shop', definition: 'how big or small clothes or shoes are', vi: 'cỡ, kích cỡ', icon: '📏',
    example: 'Do you have these trainers in a bigger size?', exampleVi: 'Bạn có đôi giày thể thao này cỡ lớn hơn không?',
    situations: ['These shoes are too small. Do you have a 38?', 'Is this T-shirt small, medium or large?', 'The jacket is too big for me. I need an S, not an L.'] },
  // Shopping actions
  { word: 'afford', topic: 'shopping-actions', definition: 'have enough money to buy something', vi: 'đủ tiền (để mua)', icon: '✅',
    example: 'I can\'t afford a new phone.', exampleVi: 'Tôi không đủ tiền mua điện thoại mới.',
    situations: ['The bike costs 5 million dong, and I only have 2 million. I can\'t buy it.', 'Now that Dad has a better job, we have enough money for a holiday in Phu Quoc.', 'It\'s too expensive for me. I don\'t have enough money for it.'] },
  { word: 'spend', topic: 'shopping-actions', definition: 'use money to buy things', vi: 'tiêu (tiền)', icon: '💸',
    example: 'I spent all my pocket money on comics.', exampleVi: 'Tôi đã tiêu hết tiền tiêu vặt vào truyện tranh.',
    situations: ['I had 100,000 dong, but now I have nothing. I bought snacks and a toy.', 'How much money did you use at the market today?', 'Minh used all his lucky money on a new game.'] },
  { word: 'save up', topic: 'shopping-actions', definition: 'keep money so that you can buy something later', vi: 'để dành (tiền)', icon: '🐷',
    example: 'I\'m saving up for a new bike.', exampleVi: 'Tôi đang để dành tiền mua xe đạp mới.',
    situations: ['Every week Lan puts some of her pocket money in a piggy bank to buy a guitar.', 'I don\'t spend my lucky money. I keep it for a new phone.', 'He keeps a little money every month because he wants a laptop next year.'] },
  { word: 'take back', topic: 'shopping-actions', definition: 'return something to the shop because there is a problem with it', vi: 'mang trả lại', icon: '↩️',
    example: 'The shirt was too small, so I took it back.', exampleVi: 'Chiếc áo quá chật nên tôi mang trả lại.',
    situations: ['The toy didn\'t work, so I went to the shop again with it and the receipt.', 'These shoes hurt my feet. Can I return them to the shop?', 'The headphones are broken. Let\'s return them to the shop tomorrow.'] },
  { word: 'deliver', topic: 'shopping-actions', definition: 'bring things to someone\'s house or office', vi: 'giao (hàng)', icon: '🚚',
    example: 'The shop will deliver the fridge on Monday.', exampleVi: 'Cửa hàng sẽ giao tủ lạnh vào thứ Hai.',
    situations: ['I ordered a book online, and a man on a motorbike brought it to my house.', 'The pizza place brings the food to your door in thirty minutes.', 'We bought a big sofa, and the shop is bringing it to our flat tomorrow.'] },
  { word: 'window-shopping', topic: 'shopping-actions', definition: 'looking at things in shop windows without buying anything', vi: 'đi ngắm đồ (không mua)', icon: '👀',
    example: 'We went window-shopping in the city centre.', exampleVi: 'Chúng tôi đi ngắm đồ ở trung tâm thành phố.',
    situations: ['We have no money today, so we\'re just looking at the clothes in the shop windows.', 'Mai and I walked along the shopping streets for hours, but we didn\'t buy anything.', 'On Sunday afternoons, we walk past the shops and look in the windows just for fun.'] },
];
