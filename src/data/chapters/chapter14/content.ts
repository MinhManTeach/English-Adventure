import type { VocabWord } from '../shared';

/** Unit 40: instructions for imperatives. */
export const INSTRUCTIONS = [
  { base: 'wash', ing: 'washing', obj: 'your hands before lunch', dont: 'run in the corridor' },
  { base: 'close', ing: 'closing', obj: 'the window, please', dont: 'touch the oven' },
  { base: 'turn', ing: 'turning', obj: 'off the light', dont: 'shout in the library' },
  { base: 'open', ing: 'opening', obj: 'your books at page ten', dont: 'eat in class' },
  { base: 'listen', ing: 'listening', obj: 'to the teacher', dont: 'swim after a big meal' },
  { base: 'write', ing: 'writing', obj: 'your name here', dont: 'forget your homework' },
  { base: 'put', ing: 'putting', obj: 'on your coat', dont: 'feed the animals' },
  { base: 'tidy', ing: 'tidying', obj: 'your room', dont: 'drop litter' },
  { base: 'brush', ing: 'brushing', obj: 'your teeth', dont: 'play with matches' },
  { base: 'look', ing: 'looking', obj: 'at the board', dont: 'cross the road here' },
  { base: 'sit', ing: 'sitting', obj: 'down, please', dont: 'be late' },
  { base: 'help', ing: 'helping', obj: 'your little sister', dont: 'worry' },
] as const;

/** Unit 40: activities for want to / would like to / enjoy -ing. */
export const ACTIONS = [
  { base: 'read', ing: 'reading', obj: 'comics' }, { base: 'play', ing: 'playing', obj: 'chess' },
  { base: 'swim', ing: 'swimming', obj: 'in the sea' }, { base: 'ride', ing: 'riding', obj: 'a horse' },
  { base: 'watch', ing: 'watching', obj: 'cartoons' }, { base: 'cook', ing: 'cooking', obj: 'dinner' },
  { base: 'draw', ing: 'drawing', obj: 'animals' }, { base: 'learn', ing: 'learning', obj: 'Japanese' },
  { base: 'fly', ing: 'flying', obj: 'kites' }, { base: 'take', ing: 'taking', obj: 'photos' },
  { base: 'bake', ing: 'baking', obj: 'cakes' }, { base: 'make', ing: 'making', obj: 'models' },
] as const;

/** Unit 41: in / on / at for place. [sentence with ___, answer] */
export const PLACE_ITEMS = [
  ['There is a picture ___ the wall.', 'on'], ['The keys are ___ my bag.', 'in'], ['Let\'s meet ___ the bus stop.', 'at'],
  ['We live ___ the second floor.', 'on'], ['Mum is ___ home today.', 'at'], ['There are no clouds ___ the sky.', 'in'],
  ['The shop is ___ the end of the street.', 'at'], ['My cousin lives ___ Da Nang.', 'in'], ['Your phone is ___ the table.', 'on'],
  ['Write your name ___ the top of the page.', 'at'], ['I read about it ___ a magazine.', 'in'], ['There\'s a spider ___ the ceiling!', 'on'],
  ['Someone is ___ the door.', 'at'], ['The fish are swimming ___ the pond.', 'in'],
] as const;
/** Unit 41: in / on / at for time. [sentence with ___, answer] */
export const TIME_ITEMS = [
  ['We have English ___ Monday.', 'on'], ['The film starts ___ seven o\'clock.', 'at'], ['My birthday is ___ July.', 'in'],
  ['I do my homework ___ the evening.', 'in'], ['Let\'s meet ___ half past four.', 'at'], ['There is a party ___ my birthday.', 'on'],
  ['My sister was born ___ 2012.', 'in'], ['Owls hunt ___ night.', 'at'], ['We give presents ___ Christmas.', 'at'],
  ['School starts ___ 5 September.', 'on'], ['It\'s very hot here ___ summer.', 'in'], ['We eat together ___ lunchtime.', 'at'],
  ['I play football ___ Saturday morning.', 'on'], ['The shop is closed ___ the afternoon.', 'in'],
] as const;
export const IN_ON_AT = ['in', 'on', 'at', 'to'] as const;
/** Unit 41: prepositions of movement, each with a direction hint and three clearly wrong choices. */
export const MOVEMENT_ITEMS = [
  ['Look left and right before you walk ___ the road. (to the other side)', 'across', ['into', 'under', 'onto']],
  ['The train went ___ a long, dark tunnel. (in one end and out the other)', 'through', ['up', 'onto', 'off']],
  ['We walked ___ the river and looked at the boats. (beside it, from one end towards the other)', 'along', ['into', 'onto', 'out of']],
  ['She climbed ___ the stairs to her bedroom. (to a higher place)', 'up', ['into', 'out of', 'through']],
  ['The ball rolled ___ the hill. (to a lower place)', 'down', ['out of', 'through', 'onto']],
  ['The cat jumped ___ the box and hid. (to the inside)', 'into', ['along', 'up', 'under']],
  ['Nam ran ___ the classroom when the bell rang. (from the inside to the outside)', 'out of', ['onto', 'up', 'under']],
  ['The horse jumped ___ the fence. (above it, to the other side)', 'over', ['under', 'into', 'through']],
  ['The boat sailed ___ the bridge. (below it)', 'under', ['over', 'up', 'onto']],
  ['The bird flew ___ the open window into the room. (in one side and out the other)', 'through', ['off', 'under', 'down']],
  ['Go ___ this street and turn left at the bank. (straight on)', 'along', ['into', 'off', 'out of']],
  ['The boy fell ___ his bike. (from the top of it to the ground)', 'off', ['up', 'along', 'across']],
  ['The cat jumped ___ the table. (to the top of it)', 'onto', ['under', 'through', 'along']],
  ['We swam ___ the lake to the island. (to the other side)', 'across', ['onto', 'off', 'out of']],
] as const;

/** Unit 42 Communication and technology. */
export const TECH_WORDS: readonly VocabWord[] = [
  // Devices
  { word: 'laptop', topic: 'devices', definition: 'a small computer you can carry', vi: 'máy tính xách tay', icon: '💻',
    example: 'I do my homework on my laptop.', exampleVi: 'Tôi làm bài tập trên máy tính xách tay.',
    situations: ['Dad opens his small computer on the train and works.', 'This computer folds closed and fits in my school bag.', 'She carries her computer to the café and writes emails there.'] },
  { word: 'screen', topic: 'devices', definition: 'the flat part of a phone, TV or computer where you see pictures', vi: 'màn hình', icon: '📱',
    example: 'My phone screen is broken.', exampleVi: 'Màn hình điện thoại của tôi bị vỡ.',
    situations: ['I dropped my phone and now the glass part has a crack.', 'The cinema has a giant one where we watch the film.', 'Don\'t sit too close to the TV. It\'s bad for your eyes.'] },
  { word: 'keyboard', topic: 'devices', definition: 'the part of a computer with keys for typing letters', vi: 'bàn phím', icon: '⌨️',
    example: 'The letter A on my keyboard doesn\'t work.', exampleVi: 'Phím chữ A trên bàn phím của tôi bị hỏng.',
    situations: ['I press the letters to type my story on the computer.', 'It has a long space bar and lots of keys.', 'Click, click, click! Mum is typing fast.'] },
  { word: 'charger', topic: 'devices', definition: 'a thing that puts power into a phone or laptop', vi: 'bộ sạc', icon: '🔌',
    example: 'Can I borrow your phone charger?', exampleVi: 'Cho mình mượn sạc điện thoại nhé?',
    situations: ['My phone is at 1%. I need to plug it in.', 'I forgot this cable, so my laptop died on holiday.', 'Plug it into the wall and connect it to your phone.'] },
  { word: 'headphones', topic: 'devices', definition: 'things you wear over your ears to listen to music', vi: 'tai nghe', icon: '🎧',
    example: 'Please use headphones on the bus.', exampleVi: 'Vui lòng dùng tai nghe trên xe buýt.',
    situations: ['I listen to music without other people hearing it.', 'He wears them over his ears while he plays video games.', 'She can\'t hear me because music is playing in her ears.'] },
  { word: 'printer', topic: 'devices', definition: 'a machine that puts words and pictures from a computer onto paper', vi: 'máy in', icon: '🖨️',
    example: 'The printer has no paper.', exampleVi: 'Máy in hết giấy rồi.',
    situations: ['I want my photo on paper, so I send it from the computer to this machine.', 'The teacher makes thirty copies of the test with this machine.', 'This machine needs ink and paper.'] },
  // Online
  { word: 'website', topic: 'online', definition: 'a place on the internet with pages of information', vi: 'trang web', icon: '🌐',
    example: 'Our school has a new website.', exampleVi: 'Trường chúng tôi có trang web mới.',
    situations: ['You can find our school timetable on the internet at this address.', 'I bought my shoes on an online shop.', 'Type the address www... and the pages open.'] },
  { word: 'password', topic: 'online', definition: 'a secret word that lets you use a computer or account', vi: 'mật khẩu', icon: '🔑',
    example: 'Never tell anyone your password.', exampleVi: 'Đừng bao giờ nói mật khẩu của bạn cho ai.',
    situations: ['You need this secret word to open your email.', 'Don\'t use 123456. Use a long, secret one.', 'I forgot the secret word and couldn\'t open my account.'] },
  { word: 'download', topic: 'online', definition: 'copy a file or app from the internet to your device', vi: 'tải xuống', icon: '⬇️',
    example: 'I downloaded a new game.', exampleVi: 'Tôi đã tải một trò chơi mới.',
    situations: ['I got the new game from the internet onto my tablet.', 'The film is copying from the internet to my phone: 80%... 90%...', 'Click the arrow to get the file onto your computer.'] },
  { word: 'search', topic: 'online', definition: 'look for information on the internet', vi: 'tìm kiếm', icon: '🔍',
    example: 'I searched for pictures of pandas.', exampleVi: 'Tôi đã tìm ảnh gấu trúc.',
    situations: ['I typed "pandas" into Google to find information.', 'Let\'s look on the internet for a good pizza place near here.', 'She used the internet to find the answer to the quiz question.'] },
  { word: 'app', topic: 'online', definition: 'a program you use on a phone or tablet', vi: 'ứng dụng', icon: '📲',
    example: 'This app helps me learn English.', exampleVi: 'Ứng dụng này giúp tôi học tiếng Anh.',
    situations: ['I have a program on my phone for learning English words.', 'Tap the little picture on your phone to open the weather program.', 'Mum uses a program on her phone to order food.'] },
  { word: 'online', topic: 'online', definition: 'on or using the internet', vi: 'trực tuyến, trên mạng', icon: '📶',
    example: 'We had online lessons last year.', exampleVi: 'Năm ngoái chúng tôi học trực tuyến.',
    situations: ['We had our lessons on the internet, from home.', 'Mum buys most things from shops on the internet.', 'My friends are all on the internet now, so let\'s play the game together.'] },
  // Communicating
  { word: 'reply', topic: 'communicating', definition: 'answer a message, letter or email', vi: 'trả lời', icon: '↩️',
    example: 'Please reply to my email soon.', exampleVi: 'Hãy trả lời email của mình sớm nhé.',
    situations: ['Lan sent me a message, so I wrote back to her.', 'I sent him a question an hour ago, but he hasn\'t answered.', 'Click this button to answer the email.'] },
  { word: 'chat', topic: 'communicating', definition: 'talk in a friendly way, often online', vi: 'trò chuyện', icon: '💬',
    example: 'I chat with my cousin online every evening.', exampleVi: 'Tối nào tôi cũng trò chuyện với em họ trên mạng.',
    situations: ['Every evening, Mai and her friends talk online for fun.', 'We talked about our weekend for hours at the café.', 'I send messages back and forth with my cousin in Australia.'] },
  { word: 'post', topic: 'communicating', definition: 'put a photo or message on a website for people to see', vi: 'đăng (bài)', icon: '📮',
    example: 'She posted a photo of her cat.', exampleVi: 'Cô ấy đã đăng ảnh con mèo của mình.',
    situations: ['I put my holiday photos online for my friends to see.', 'He wrote a message on the class page for everyone to read.', 'She put a video of her dance on the internet.'] },
  { word: 'comment', topic: 'communicating', definition: 'something you write about a post online', vi: 'bình luận', icon: '🗨️',
    example: 'My friend wrote a nice comment on my photo.', exampleVi: 'Bạn tôi viết một bình luận dễ thương dưới ảnh của tôi.',
    situations: ['Under my photo, Nam wrote "Great picture!"', 'People wrote lots of opinions under the video.', 'She wrote a few words under her friend\'s post.'] },
  { word: 'video call', topic: 'communicating', definition: 'a phone call where you can see the other person', vi: 'cuộc gọi video', icon: '📹',
    example: 'I have a video call with Grandma every Sunday.', exampleVi: 'Chủ nhật nào tôi cũng gọi video cho bà.',
    situations: ['I can see Grandma\'s face on my phone while we talk.', 'Dad is in Japan, but we can see and hear him on the laptop.', 'The class met on the screen because the school was closed.'] },
  { word: 'emoji', topic: 'communicating', definition: 'a small picture you use in a message', vi: 'biểu tượng cảm xúc', icon: '😀',
    example: 'She ended her message with a heart emoji.', exampleVi: 'Cô ấy kết thúc tin nhắn bằng một biểu tượng trái tim.',
    situations: ['I put a little smiling face at the end of my message.', 'He sent a tiny picture of a birthday cake.', 'Instead of writing "I\'m happy", she sent 😀.'] },
  // Tech problems
  { word: 'battery', topic: 'tech-problems', definition: 'the part that gives power to a phone or toy', vi: 'pin', icon: '🔋',
    example: 'My phone battery is low.', exampleVi: 'Pin điện thoại của tôi sắp hết.',
    situations: ['My phone is at 2%. It needs power soon.', 'The toy car stopped. It needs a new power part.', 'This laptop can work for ten hours without a plug.'] },
  { word: 'Wi-Fi', topic: 'tech-problems', definition: 'a way to connect to the internet without wires', vi: 'mạng Wi-Fi', icon: '📡',
    example: 'What\'s the Wi-Fi password?', exampleVi: 'Mật khẩu Wi-Fi là gì?',
    situations: ['The café lets you use the internet for free without a cable.', 'The internet at home isn\'t working. The router has a red light.', 'Can I connect to your internet? What\'s the password?'] },
  { word: 'delete', topic: 'tech-problems', definition: 'remove something from a computer or phone', vi: 'xóa', icon: '🗑️',
    example: 'I deleted the photo by mistake.', exampleVi: 'Tôi lỡ tay xóa mất bức ảnh.',
    situations: ['Oh no! I removed my homework file from the computer by mistake.', 'My phone is full, so I removed some old videos.', 'Press this button to remove the last letter you typed.'] },
  { word: 'save', topic: 'tech-problems', definition: 'keep your work on a computer so you don\'t lose it', vi: 'lưu', icon: '💾',
    example: 'Don\'t forget to save your work!', exampleVi: 'Đừng quên lưu bài làm!',
    situations: ['Before you close the document, click this so your work is kept.', 'The computer turned off and I lost everything because I didn\'t do this.', 'Press Ctrl and S to keep your file.'] },
  { word: 'log in', topic: 'tech-problems', definition: 'type your name and password to start using a website or app', vi: 'đăng nhập', icon: '🔐',
    example: 'Log in with your school email.', exampleVi: 'Đăng nhập bằng email của trường.',
    situations: ['Type your username and password to open your account.', 'I can\'t get into the game because I forgot my password.', 'Click "Sign in" and enter your email.'] },
  { word: 'virus', topic: 'tech-problems', definition: 'a bad program that can damage a computer', vi: 'vi-rút máy tính', icon: '🦠',
    example: 'Don\'t open that email. It may have a virus.', exampleVi: 'Đừng mở email đó. Có thể nó chứa vi-rút.',
    situations: ['After I opened a strange email, my computer became very slow.', 'A bad program deleted all the files on Dad\'s laptop.', 'Don\'t download games from strange websites. They can harm your computer.'] },
];
