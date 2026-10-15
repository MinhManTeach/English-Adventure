import type { VocabWord } from '../shared';

/** A2 Unit 34 (id 76): so / such / such a / such an. [sentence with ___, answer] */
export const SO_SUCH_ITEMS = [
  ['The film was ___ boring that I fell asleep.', 'so'],
  ['It was ___ boring film that I fell asleep.', 'such a'],
  ['Hanoi has ___ delicious street food!', 'such'],
  ['Mai is ___ kind. She always helps everyone.', 'so'],
  ['Nam is ___ honest boy. He never tells lies.', 'such an'],
  ['The test was ___ easy that everyone passed.', 'so'],
  ['Lan and Hoa are ___ good friends.', 'such'],
  ['It was ___ hot day that we stayed inside.', 'such a'],
  ['Your puppies are ___ cute!', 'so'],
  ['Ha Long Bay is ___ amazing place.', 'such an'],
  ['We had ___ awful weather in Sa Pa that we didn\'t go out.', 'such'],
  ['Grandma tells ___ funny stories.', 'such'],
  ['The bus was ___ crowded that we couldn\'t get on.', 'so'],
  ['That was ___ easy question!', 'such an'],
  ['There was ___ much traffic that we were late.', 'so'],
  ['There were ___ many people at the flower festival that I lost my sister.', 'so'],
  ['It was ___ exciting match. Vietnam won 3–2!', 'such an'],
  ['Minh is ___ fast runner that nobody can catch him.', 'such a'],
] as const;
export const SO_SUCH = ['so', 'such', 'such a', 'such an'] as const;

/** People who agree in Unit 34 dialogues. kind picks the auxiliary: i (I), pl (plural), 3 (third person singular). */
export const RESPONDERS = [
  { text: 'I', kind: 'i' }, { text: 'we', kind: 'pl' }, { text: 'my brother', kind: '3' }, { text: 'my cousins', kind: 'pl' },
] as const;
export const SPEAKERS = [['Mai', 'Nam'], ['Minh', 'Lan'], ['Hoa', 'Tuan'], ['Linh', 'Duc']] as const;
/** A statement and its negative, the auxiliary for each kind of responder, and auxiliaries that are wrong for every responder. */
export const AGREE_ITEMS = [
  { key: 'durian', pos: 'I like durian.', neg: 'I don\'t like durian.', aux: { i: 'do', pl: 'do', 3: 'does' }, alts: ['am', 'did'] },
  { key: 'tired', pos: 'I\'m tired.', neg: 'I\'m not tired.', aux: { i: 'am', pl: 'are', 3: 'is' }, alts: ['do', 'was'] },
  { key: 'hoi-an', pos: 'I went to Hoi An last summer.', neg: 'I didn\'t go to Hoi An last summer.', aux: { i: 'did', pl: 'did', 3: 'did' }, alts: ['do', 'was', 'went'] },
  { key: 'swim', pos: 'I can swim.', neg: 'I can\'t swim.', aux: { i: 'can', pl: 'can', 3: 'can' }, alts: ['do', 'am', 'will'] },
  { key: 'film', pos: 'I\'ve seen that film.', neg: 'I haven\'t seen that film.', aux: { i: 'have', pl: 'have', 3: 'has' }, alts: ['do', 'am', 'was'] },
  { key: 'party', pos: 'I\'ll be at the party.', neg: 'I won\'t be at the party.', aux: { i: 'will', pl: 'will', 3: 'will' }, alts: ['do', 'am', 'would'] },
  { key: 'late', pos: 'I was late for school.', neg: 'I wasn\'t late for school.', aux: { i: 'was', pl: 'were', 3: 'was' }, alts: ['did', 'am', 'do'] },
  { key: 'piano', pos: 'I play the piano.', neg: 'I don\'t play the piano.', aux: { i: 'do', pl: 'do', 3: 'does' }, alts: ['am', 'did', 'play'] },
  { key: 'match', pos: 'I\'m watching the match tonight.', neg: 'I\'m not watching the match tonight.', aux: { i: 'am', pl: 'are', 3: 'is' }, alts: ['do', 'did', 'was'] },
  { key: 'trip', pos: 'I enjoyed the trip.', neg: 'I didn\'t enjoy the trip.', aux: { i: 'did', pl: 'did', 3: 'did' }, alts: ['do', 'was', 'enjoyed'] },
  { key: 'uniform', pos: 'I have to wear a uniform.', neg: 'I don\'t have to wear a uniform.', aux: { i: 'do', pl: 'do', 3: 'does' }, alts: ['am', 'did', 'was'] },
  { key: 'should', pos: 'I should eat more vegetables.', neg: 'I shouldn\'t eat so many sweets.', aux: { i: 'should', pl: 'should', 3: 'should' }, alts: ['do', 'am', 'will'] },
  { key: 'cold', pos: 'I\'ve got a cold.', neg: 'I haven\'t got a cold.', aux: { i: 'have', pl: 'have', 3: 'has' }, alts: ['did', 'am', 'got'] },
] as const;
/** Negative auxiliaries for too / either answers: I'm not either, my brother doesn't either. */
export const NEG_AUX: Record<string, string> = {
  do: 'don\'t', does: 'doesn\'t', am: '\'m not', are: 'aren\'t', is: 'isn\'t', did: 'didn\'t', can: 'can\'t',
  have: 'haven\'t', has: 'hasn\'t', will: 'won\'t', was: 'wasn\'t', were: 'weren\'t', should: 'shouldn\'t',
};

/** A2 Unit 35 (id 77): question tags. Past simple: [positive phrase, base phrase for didn't]. */
export const PAST_TAGS = [
  ['went to Da Nang last week', 'go to Da Nang last week'], ['watched the fireworks at Tết', 'watch the fireworks at Tết'],
  ['won the chess match', 'win the chess match'], ['forgot the tickets', 'forget the tickets'],
  ['cooked dinner yesterday', 'cook dinner yesterday'], ['saw the new cartoon', 'see the new cartoon'],
  ['bought a new phone', 'buy a new phone'], ['enjoyed the trip to Hue', 'enjoy the trip to Hue'],
  ['took the bus to school', 'take the bus to school'], ['called Grandma last night', 'call Grandma last night'],
  ['finished the science project', 'finish the science project'], ['lost the house keys', 'lose the house keys'],
] as const;
/** was / were + predicate. */
export const BE_PAST_TAGS = [
  'at the cinema yesterday', 'late for school this morning', 'tired after the match', 'in Hoi An last summer',
  'happy with the result', 'at home on Sunday', 'ill last week', 'busy yesterday afternoon',
  'at the lantern festival', 'scared of the storm', 'good at drawing as a child', 'in the school play last year',
] as const;
/** am / is / are + -ing phrase. */
export const CONTINUOUS_TAGS = [
  'playing football in the park', 'doing the homework now', 'watching the news', 'waiting for the bus',
  'learning Japanese this year', 'cooking dinner', 'studying for the exam', 'talking on the phone',
  'wearing a new jacket', 'feeling better today', 'staying with Grandma this week', 'practising for the concert',
] as const;
/** have / has + past participle phrase. */
export const PERFECT_TAGS = [
  'visited Hue', 'finished the homework', 'seen this film', 'been to Phu Quoc', 'eaten bún chả', 'met the new teacher',
  'read this book', 'tried durian', 'done the washing-up', 'heard the news', 'made a cake', 'lost the key',
] as const;
/** Modal + base phrase. */
export const MODAL_TAGS = [
  ['can', 'swim'], ['can', 'speak Chinese'], ['can', 'ride a horse'], ['can', 'come with us'],
  ['will', 'come to the party'], ['will', 'be at home tonight'], ['will', 'help us tomorrow'], ['will', 'remember the password'],
  ['should', 'wear a helmet'], ['should', 'see a doctor'], ['should', 'drink more water'], ['should', 'go to bed earlier'],
] as const;
export const MODAL_NEG: Record<string, string> = { can: 'can\'t', will: 'won\'t', should: 'shouldn\'t' };
export const OTHER_MODAL: Record<string, string> = { can: 'will', will: 'can', should: 'will' };
/** Special tags: [sentence start, answer, three wrong tags, rule key]. */
export const SPECIAL_TAGS = [
  ['I\'m in your team', 'aren\'t I', ['am I', 'amn\'t I', 'isn\'t I'], 'I am → aren\'t I'],
  ['Let\'s go to the night market', 'shall we', ['don\'t we', 'do we', 'aren\'t we'], 'Let\'s → shall we'],
  ['Open the window', 'will you', ['do you', 'don\'t you', 'are you'], 'imperative → will you'],
  ['Don\'t be late', 'will you', ['won\'t you', 'do you', 'aren\'t you'], 'imperative → will you'],
  ['There\'s a pharmacy near here', 'isn\'t there', ['isn\'t it', 'is there', 'doesn\'t there'], 'there is → isn\'t there'],
  ['There aren\'t any eggs left', 'are there', ['aren\'t there', 'are they', 'do there'], 'there aren\'t → are there'],
  ['Nobody called me', 'did they', ['didn\'t they', 'did nobody', 'does it'], 'nobody → positive tag with they'],
  ['Nothing is wrong', 'is it', ['isn\'t it', 'is nothing', 'isn\'t there'], 'nothing → positive tag with it'],
  ['Everyone is here', 'aren\'t they', ['are they', 'isn\'t everyone', 'don\'t they'], 'everyone → they'],
  ['Lan never eats meat', 'does she', ['doesn\'t she', 'is she', 'never she'], 'never → positive tag'],
  ['This is your helmet', 'isn\'t it', ['isn\'t this', 'is it', 'doesn\'t it'], 'this / that → it'],
  ['Those are Nam\'s shoes', 'aren\'t they', ['aren\'t those', 'are they', 'isn\'t it'], 'these / those → they'],
  ['Everything is ready', 'isn\'t it', ['aren\'t they', 'is it', 'doesn\'t it'], 'everything → it'],
] as const;

/** A2 Unit 36 (id 78): technology. */
export const TECH2_WORDS: readonly VocabWord[] = [
  // Devices
  { word: 'tablet', topic: 'devices', definition: 'a flat computer with a touch screen, bigger than a phone', vi: 'máy tính bảng', icon: '📱',
    example: 'My little brother reads e-books on his tablet.', exampleVi: 'Em trai tôi đọc sách điện tử trên máy tính bảng.',
    situations: ['It has no keyboard, but its screen is much bigger than a phone\'s.', 'Grandpa reads the news on a flat computer that he touches with his finger.', 'In some schools, students use these flat touch-screen computers instead of books.'] },
  { word: 'smartwatch', topic: 'devices', definition: 'a watch that can show messages and count your steps', vi: 'đồng hồ thông minh', icon: '⌚',
    example: 'My smartwatch says I walked 8,000 steps today.', exampleVi: 'Đồng hồ thông minh nói hôm nay tôi đã đi 8.000 bước.',
    situations: ['Mum looks at her wrist and reads my message without taking out her phone.', 'Something on Dad\'s wrist counts his steps and checks his heart.', 'It tells the time, but it can also show the weather and your messages.'] },
  { word: 'speaker', topic: 'devices', definition: 'a machine that the sound or music comes out of', vi: 'loa', icon: '🔊',
    example: 'We played music on a big speaker at the party.', exampleVi: 'Chúng tôi bật nhạc bằng chiếc loa lớn ở bữa tiệc.',
    situations: ['At the karaoke party, the music came out of a big black box.', 'Connect your phone to this box and everyone in the room can hear the song.', 'The music is too quiet from my laptop, so I use a separate box for the sound.'] },
  { word: 'remote control', topic: 'devices', definition: 'a small thing you use to change the TV channel from your sofa', vi: 'điều khiển từ xa', icon: '📺',
    example: 'Where is the remote control? I want to change the channel.', exampleVi: 'Cái điều khiển đâu rồi? Tôi muốn chuyển kênh.',
    situations: ['I want to watch cartoons, but I can\'t find the small thing with buttons for the TV.', 'Grandpa presses a button from his chair and the TV channel changes.', 'The little black thing for the air conditioner is under the sofa.'] },
  { word: 'webcam', topic: 'devices', definition: 'a small camera on a computer for video calls', vi: 'webcam, camera máy tính', icon: '📷',
    example: 'Turn on your webcam so the teacher can see you.', exampleVi: 'Bật webcam lên để cô giáo nhìn thấy em.',
    situations: ['The teacher can\'t see me in the online lesson because the camera on my laptop is broken.', 'There is a tiny camera at the top of the computer screen.', 'Put a sticker over the little camera on your laptop when you aren\'t using it.'] },
  { word: 'games console', topic: 'devices', definition: 'a machine you connect to a TV to play video games', vi: 'máy chơi game', icon: '🎮',
    example: 'Nam got a games console for his birthday.', exampleVi: 'Nam được tặng một máy chơi game vào sinh nhật.',
    situations: ['Nam connects a machine to the TV and plays racing games with two controllers.', 'Minh plays football games on the TV with this machine every weekend.', 'You need this machine and a controller to play video games on the big screen.'] },
  // Using devices
  { word: 'plug in', topic: 'using-devices', definition: 'connect a machine to the electricity', vi: 'cắm điện', icon: '🔌',
    example: 'The lamp doesn\'t work because you didn\'t plug it in.', exampleVi: 'Đèn không sáng vì bạn chưa cắm điện.',
    situations: ['The fan isn\'t working. Oh! Its cable isn\'t connected to the wall.', 'Put the end of the cable into the hole in the wall first.', 'Before you can use the kettle, connect it to the electricity.'] },
  { word: 'switch on', topic: 'using-devices', definition: 'make a machine start working', vi: 'bật', icon: '💡',
    example: 'Can you switch on the light, please?', exampleVi: 'Bạn bật đèn giúp mình nhé?',
    situations: ['It\'s dark in here. Press the button so the light starts working.', 'Lan pressed the button and the TV started.', 'It\'s hot. Please make the fan start working.'] },
  { word: 'switch off', topic: 'using-devices', definition: 'make a machine stop working', vi: 'tắt', icon: '📴',
    example: 'Switch off your phones before the exam.', exampleVi: 'Tắt điện thoại trước khi thi.',
    situations: ['Please make your phones stop working before the film starts.', 'Leaving the room? Stop the lights and the air conditioner to save electricity.', 'Dad pressed the button and the computer went black and quiet.'] },
  { word: 'charge', topic: 'using-devices', definition: 'put electricity into a battery', vi: 'sạc (pin)', icon: '🔋',
    example: 'I charge my phone every night.', exampleVi: 'Tối nào tôi cũng sạc điện thoại.',
    situations: ['My phone battery is at 5%, so I need to fill it with power.', 'My smartwatch battery is full after an hour on the cable.', 'Electric motorbikes need two hours to fill their batteries.'] },
  { word: 'install', topic: 'using-devices', definition: 'put a new program or app on a computer or phone', vi: 'cài đặt', icon: '⚙️',
    example: 'I installed a dictionary app on my phone.', exampleVi: 'Tôi đã cài một ứng dụng từ điển trên điện thoại.',
    situations: ['To use the new game, you first have to put the program on your laptop.', 'Mai added a new English app to her phone and it is ready to use now.', 'The technician put a new program on all the school computers.'] },
  { word: 'update', topic: 'using-devices', definition: 'get the newest version of an app or program', vi: 'cập nhật', icon: '🔄',
    example: 'Update the app to get the new features.', exampleVi: 'Hãy cập nhật ứng dụng để có các tính năng mới.',
    situations: ['The app already works, but a message says a newer version is ready.', 'My phone is getting the newest version of its program, so I can\'t use it for ten minutes.', 'The old version of the game has a problem. Get the latest version to fix it.'] },
  // The internet
  { word: 'username', topic: 'internet', definition: 'the name you use to log in to a website', vi: 'tên người dùng', icon: '👤',
    example: 'My username is lan_2012.', exampleVi: 'Tên người dùng của tôi là lan_2012.',
    situations: ['To log in to the game, type "minh_cool" and then your password.', 'On the website, Nam isn\'t called Nam. He\'s "superstar99".', 'You need a name for your new account. It can\'t have spaces.'] },
  { word: 'link', topic: 'internet', definition: 'words or a picture you click to go to another web page', vi: 'đường liên kết', icon: '🔗',
    example: 'The teacher sent us a link to the video.', exampleVi: 'Cô giáo gửi cho chúng tôi đường link tới video.',
    situations: ['Mai sent me some blue words in a message. When I touched them, a website opened.', 'Copy the web address and send it to your friends so they can open the page.', 'The blue, underlined words take you to a new page.'] },
  { word: 'upload', topic: 'internet', definition: 'send a file from your device to the internet', vi: 'tải lên', icon: '⬆️',
    example: 'I uploaded my project to the class website.', exampleVi: 'Tôi đã tải bài dự án lên trang web của lớp.',
    situations: ['Nam sent his video from his phone to the class website.', 'Put your homework file on the school website before Friday.', 'The arrow points up while my photos go from my laptop to the internet.'] },
  { word: 'click', topic: 'internet', definition: 'press a button on a mouse', vi: 'nhấp chuột', icon: '🖱️',
    example: 'Click the red button to start.', exampleVi: 'Nhấp vào nút đỏ để bắt đầu.',
    situations: ['Move the mouse to "Start" and press the left button once.', 'Press the mouse button twice quickly to open the folder.', 'Put the arrow on the picture and press the mouse.'] },
  { word: 'social media', topic: 'internet', definition: 'websites and apps where people share photos and messages with many people', vi: 'mạng xã hội', icon: '👥',
    example: 'My sister spends too much time on social media.', exampleVi: 'Chị tôi dành quá nhiều thời gian trên mạng xã hội.',
    situations: ['Lan shares photos of her lunch with hundreds of people on apps like Facebook.', 'Teenagers often follow famous singers on these apps and websites.', 'Don\'t put your home address on apps where everyone can see your posts.'] },
  { word: 'screenshot', topic: 'internet', definition: 'a picture of what is on your screen', vi: 'ảnh chụp màn hình', icon: '🖼️',
    example: 'I took a screenshot of my high score.', exampleVi: 'Tôi chụp màn hình điểm cao nhất của mình.',
    situations: ['Minh pressed two buttons at the same time to save a picture of his high score on the phone.', 'Send the teacher a picture of the error message on your screen.', 'Mai saved a picture of the bus timetable on her phone screen.'] },
  // Fixing and settings
  { word: 'signal', topic: 'fixing', definition: 'the waves that connect a phone to the network', vi: 'sóng (điện thoại)', icon: '📶',
    example: 'There is no signal in the mountains.', exampleVi: 'Trên núi không có sóng điện thoại.',
    situations: ['In the cave, my phone showed no bars and I couldn\'t call anyone.', 'Go near the window. You\'ll get more bars on your phone there.', 'In the lift, Dad\'s call stopped because the phone lost its connection.'] },
  { word: 'crash', topic: 'fixing', definition: 'suddenly stop working (for a computer or a program)', vi: 'bị treo, sập (máy tính)', icon: '💥',
    example: 'My computer crashed and I lost my essay.', exampleVi: 'Máy tính của tôi bị sập và tôi mất bài luận.',
    situations: ['I was in the middle of the game when the screen froze and everything closed.', 'The website stopped working because too many people tried to buy concert tickets.', 'The program suddenly closed and I lost all my work.'] },
  { word: 'repair', topic: 'fixing', definition: 'make something that is broken work again', vi: 'sửa chữa', icon: '🛠️',
    example: 'The man at the phone shop repaired my screen.', exampleVi: 'Anh ở cửa hàng điện thoại đã sửa màn hình cho tôi.',
    situations: ['My laptop was broken, but the shop made it work again in two days.', 'Uncle Tuan can make old radios work again.', 'Don\'t throw away the broken speaker. Take it to the shop so they can fix it.'] },
  { word: 'cable', topic: 'fixing', definition: 'a long wire covered in plastic that connects machines', vi: 'dây cáp', icon: '➰',
    example: 'I need a longer cable for the TV.', exampleVi: 'Tôi cần một sợi dây cáp dài hơn cho TV.',
    situations: ['There are too many wires behind the computer desk.', 'Connect the printer to the laptop with this long wire.', 'The cat bit the black wire of my phone charger.'] },
  { word: 'cracked', topic: 'fixing', definition: 'with a thin line of broken glass', vi: 'bị nứt', icon: '🪟',
    example: 'I dropped my phone and now the screen is cracked.', exampleVi: 'Tôi làm rơi điện thoại và giờ màn hình bị nứt.',
    situations: ['Nam dropped his phone, and now there are thin lines across the glass.', 'The tablet still works, but its screen has a long line from one corner to another.', 'Be careful! The glass has a thin line in it and it might break.'] },
  { word: 'volume', topic: 'fixing', definition: 'how loud a sound is', vi: 'âm lượng', icon: '🔉',
    example: 'Please turn the volume down. The baby is sleeping.', exampleVi: 'Làm ơn vặn nhỏ âm lượng. Em bé đang ngủ.',
    situations: ['I can\'t hear the video. Can you make the sound louder?', 'The music is too loud. Turn it down to 10.', 'Press the button on the side of the phone to make the sound quieter.'] },
];
