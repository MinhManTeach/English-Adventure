import type { VocabWord } from '../shared';

/**
 * A2 Unit 10: irregular past participles with a result that is true now.
 * wrong holds three forms that are not the participle (the Past Simple when it is different).
 * The result clause never refers back to the subject, so it fits every subject.
 */
export const RESULTS: readonly { base: string; past: string; pp: string; wrong: readonly [string, string, string]; obj: string; result: string }[] = [
  { base: 'break', past: 'broke', pp: 'broken', wrong: ['broke', 'breaked', 'brokened'], obj: 'the classroom window', result: 'the room is cold' },
  { base: 'forget', past: 'forgot', pp: 'forgotten', wrong: ['forgot', 'forgetted', 'forgoten'], obj: 'the Wi-Fi password', result: 'nobody can go online' },
  { base: 'choose', past: 'chose', pp: 'chosen', wrong: ['chose', 'choosed', 'chosed'], obj: 'a name for the class team', result: 'the T-shirts can be printed now' },
  { base: 'fall', past: 'fell', pp: 'fallen', wrong: ['fell', 'falled', 'fellen'], obj: 'off the bike', result: 'the bike needs fixing' },
  { base: 'hide', past: 'hid', pp: 'hidden', wrong: ['hid', 'hided', 'hiden'], obj: 'the birthday presents', result: 'nobody can find them' },
  { base: 'throw', past: 'threw', pp: 'thrown', wrong: ['threw', 'throwed', 'threwn'], obj: 'the old shoes away', result: 'the cupboard is tidy now' },
  { base: 'grow', past: 'grew', pp: 'grown', wrong: ['grew', 'growed', 'grewn'], obj: 'a lot this year', result: 'the old uniform is too small' },
  { base: 'lend', past: 'lent', pp: 'lent', wrong: ['lended', 'lend', 'lenden'], obj: 'the bike to Nam', result: "it isn't here today" },
  { base: 'sell', past: 'sold', pp: 'sold', wrong: ['selled', 'sell', 'solden'], obj: 'the old piano', result: 'the living room looks bigger' },
  { base: 'write', past: 'wrote', pp: 'written', wrong: ['wrote', 'writed', 'writen'], obj: 'the party invitations', result: 'they can go out today' },
  { base: 'draw', past: 'drew', pp: 'drawn', wrong: ['drew', 'drawed', 'drewn'], obj: 'a map of the school', result: 'the new students won\'t get lost' },
  { base: 'eat', past: 'ate', pp: 'eaten', wrong: ['ate', 'eated', 'aten'], obj: 'all the cake', result: "there's nothing left for Dad" },
  { base: 'spend', past: 'spent', pp: 'spent', wrong: ['spended', 'spend', 'spenten'], obj: 'all the pocket money', result: "there's nothing left for the book fair" },
  { base: 'find', past: 'found', pp: 'found', wrong: ['finded', 'find', 'founded'], obj: 'the lost kitten', result: 'everyone is happy again' },
  { base: 'leave', past: 'left', pp: 'left', wrong: ['leaved', 'leave', 'leften'], obj: 'the umbrella on the bus', result: "there's no umbrella for the walk home" },
  { base: 'blow', past: 'blew', pp: 'blown', wrong: ['blew', 'blowed', 'blewn'], obj: 'up all the balloons', result: 'the party room looks great' },
  { base: 'ring', past: 'rang', pp: 'rung', wrong: ['rang', 'ringed', 'ranged'], obj: 'the school bell', result: 'everyone is going into class' },
  { base: 'take', past: 'took', pp: 'taken', wrong: ['took', 'taked', 'tooken'], obj: 'the dog for a walk', result: 'the house is quiet' },
];

/** A2 Unit 10: places someone can have been to or gone to. */
export const PLACES = [
  'Da Nang', 'the supermarket', 'Phu Quoc Island', "the dentist's", 'Japan', 'the library',
  'Ha Long Bay', 'the post office', 'Sa Pa', 'the night market', 'Singapore', 'the swimming pool',
] as const;

/** A2 Unit 10: everyday tasks for just / already / yet, with a result for just. */
export const TASKS: readonly { pp: string; obj: string; result: string }[] = [
  { pp: 'fed', obj: 'the cat', result: "it's sleeping now" },
  { pp: 'cleaned', obj: 'the whiteboard', result: "it's still wet" },
  { pp: 'done', obj: 'the washing-up', result: 'the kitchen is tidy' },
  { pp: 'sent', obj: 'the email to the teacher', result: 'the reply should come soon' },
  { pp: 'watered', obj: 'the plants', result: 'the soil is wet' },
  { pp: 'packed', obj: 'the suitcase', result: "it's by the door" },
  { pp: 'bought', obj: 'the train tickets', result: "they're on the table" },
  { pp: 'made', obj: 'the bánh mì', result: "they're still warm" },
  { pp: 'read', obj: 'the new comic', result: "it's on the sofa" },
  { pp: 'put up', obj: 'the Tết decorations', result: 'the house looks bright' },
  { pp: 'finished', obj: 'the science project', result: "it's ready to hand in" },
  { pp: 'swept', obj: 'the yard', result: 'the leaves are in a pile' },
];

/** A2 Unit 10: superlative + Present Perfect with ever. */
export const SUPERLATIVES: readonly { thing: string; pp: string }[] = [
  { thing: 'the best film', pp: 'seen' },
  { thing: 'the most delicious bánh mì', pp: 'eaten' },
  { thing: 'the funniest joke', pp: 'heard' },
  { thing: 'the most beautiful beach', pp: 'visited' },
  { thing: 'the hardest test', pp: 'done' },
  { thing: 'the longest book', pp: 'read' },
  { thing: 'the most exciting match', pp: 'watched' },
  { thing: 'the scariest ride', pp: 'been on' },
  { thing: 'the nicest present', pp: 'had' },
  { thing: 'the biggest fish', pp: 'caught' },
  { thing: 'the kindest person', pp: 'met' },
  { thing: 'the highest mountain', pp: 'climbed' },
];

/**
 * A2 Unit 11: situations that started in the past and continue now.
 * start is the Past Simple event that began each one, for When … ? and ago.
 */
export const STATES: readonly { base: string; third: string; past: string; pp: string; ing: string; obj: string; start: { base: string; past: string } }[] = [
  { base: 'live', third: 'lives', past: 'lived', pp: 'lived', ing: 'living', obj: 'in Da Nang', start: { base: 'move to Da Nang', past: 'moved to Da Nang' } },
  { base: 'know', third: 'knows', past: 'knew', pp: 'known', ing: 'knowing', obj: 'Mai', start: { base: 'meet Mai', past: 'met Mai' } },
  { base: 'have', third: 'has', past: 'had', pp: 'had', ing: 'having', obj: 'a pet parrot', start: { base: 'get the parrot', past: 'got the parrot' } },
  { base: 'learn', third: 'learns', past: 'learnt', pp: 'learnt', ing: 'learning', obj: 'the guitar', start: { base: 'start guitar lessons', past: 'started guitar lessons' } },
  { base: 'play', third: 'plays', past: 'played', pp: 'played', ing: 'playing', obj: 'volleyball', start: { base: 'join the volleyball club', past: 'joined the volleyball club' } },
  { base: 'study', third: 'studies', past: 'studied', pp: 'studied', ing: 'studying', obj: 'Japanese', start: { base: 'start the Japanese course', past: 'started the Japanese course' } },
  { base: 'collect', third: 'collects', past: 'collected', pp: 'collected', ing: 'collecting', obj: 'old coins', start: { base: 'find the first coin', past: 'found the first coin' } },
  { base: 'wear', third: 'wears', past: 'wore', pp: 'worn', ing: 'wearing', obj: 'glasses', start: { base: 'get glasses', past: 'got glasses' } },
  { base: 'keep', third: 'keeps', past: 'kept', pp: 'kept', ing: 'keeping', obj: 'a diary', start: { base: 'buy the first diary', past: 'bought the first diary' } },
  { base: 'support', third: 'supports', past: 'supported', pp: 'supported', ing: 'supporting', obj: 'Hanoi FC', start: { base: 'see Hanoi FC play for the first time', past: 'saw Hanoi FC play for the first time' } },
  { base: 'take', third: 'takes', past: 'took', pp: 'taken', ing: 'taking', obj: 'swimming lessons', start: { base: 'begin swimming lessons', past: 'began swimming lessons' } },
  { base: 'write', third: 'writes', past: 'wrote', pp: 'written', ing: 'writing', obj: 'a travel blog', start: { base: 'start the blog', past: 'started the blog' } },
  { base: 'grow', third: 'grows', past: 'grew', pp: 'grown', ing: 'growing', obj: 'vegetables on the balcony', start: { base: 'plant the first seeds', past: 'planted the first seeds' } },
  { base: 'sing', third: 'sings', past: 'sang', pp: 'sung', ing: 'singing', obj: 'in the school choir', start: { base: 'join the school choir', past: 'joined the school choir' } },
];

/** A2 Unit 11: lengths of time (for) and starting points (since), including tricky ones. */
export const FOR_PERIODS = ['three years', 'ages', 'a long time', 'six months', 'two weeks', 'a few days', 'ten minutes'] as const;
export const SINCE_POINTS = ['2020', 'last summer', 'Tết', 'Grade 6', 'January', 'the start of the school year', 'last Christmas'] as const;
/** A2 Unit 11: ages or classes for since + was/were. */
export const SINCE_AGES = ['six', 'seven', 'eight', 'nine', 'ten', 'in Grade 4', 'in Grade 5'] as const;
/** A2 Unit 11: finished times for the Past Simple. */
export const FINISHED = ['in 2019', 'last year', 'in 2021', 'in 2018'] as const;
/** A2 Unit 11: periods for ago. */
export const AGO_PERIODS = ['two years', 'six months', 'three weeks', 'a long time', 'four days'] as const;

/** A2 Unit 12: schools. */
export const SCHOOL_A2_WORDS: readonly VocabWord[] = [
  // People at school
  { word: 'head teacher', topic: 'school-people', definition: 'the person in charge of a school', vi: 'hiệu trưởng', icon: '👩‍💼',
    example: 'The head teacher gave a speech on the first day of school.', exampleVi: 'Thầy hiệu trưởng phát biểu vào ngày khai giảng.',
    situations: ['She is the boss of the whole school, and all the teachers work for her.', 'On the first day of the school year, this person speaks to all the students in the yard.', 'If you behave very badly, you may have to go to this person\'s office.'] },
  { word: 'class monitor', topic: 'school-people', definition: 'a student who helps the teacher and leads the class', vi: 'lớp trưởng', icon: '🙋',
    example: 'Lan is our class monitor this year.', exampleVi: 'Năm nay Lan là lớp trưởng của chúng tôi.',
    situations: ['The class voted for Nam, and now he helps the teacher keep the class in order.', 'When the teacher is late, this student tells everyone to sit down and be quiet.', 'Mai collects the homework from everyone and takes it to the teacher.'] },
  { word: 'librarian', topic: 'school-people', definition: 'a person who works in a library', vi: 'thủ thư', icon: '📚',
    example: 'The librarian helped me find a book about space.', exampleVi: 'Cô thủ thư giúp tôi tìm một cuốn sách về vũ trụ.',
    situations: ['She stamps the date in the book when you borrow it.', 'He asks everyone to be quiet among the bookshelves.', 'I couldn\'t find a book about dinosaurs, so I asked the woman at the library desk.'] },
  { word: 'security guard', topic: 'school-people', definition: 'a person whose job is to protect a building and the people in it', vi: 'bảo vệ', icon: '💂',
    example: 'The security guard opens the school gate at 6:30.', exampleVi: 'Chú bảo vệ mở cổng trường lúc 6 giờ 30.',
    situations: ['He sits by the school gate and checks who comes in.', 'At night this man walks around the school to make sure it is safe.', 'He closes the gate after the bell, so late students have to wait outside.'] },
  { word: 'school nurse', topic: 'school-people', definition: 'the person who looks after students who are ill or hurt at school', vi: 'nhân viên y tế trường học', icon: '🩺',
    example: 'I felt sick, so I went to the school nurse.', exampleVi: 'Tôi thấy mệt nên đã xuống phòng y tế.',
    situations: ['Minh cut his knee in PE, and she cleaned it and put a plaster on it.', 'Lan had a headache in class, so she went to see this person in the medical room.', 'She takes your temperature when you feel hot and ill at school.'] },
  { word: 'tutor', topic: 'school-people', definition: 'a teacher who teaches one student or a small group, often at home', vi: 'gia sư', icon: '🧑‍🏫',
    example: 'My tutor helps me with Maths on Tuesday evenings.', exampleVi: 'Gia sư dạy kèm Toán cho tôi vào tối thứ Ba.',
    situations: ['A university student comes to my house twice a week to help me with English.', 'Nam\'s parents pay a teacher to give him extra lessons at home before the exam.', 'She only teaches me, so she knows exactly what I find difficult.'] },
  // Places at school
  { word: 'canteen', topic: 'school-places', definition: 'a room in a school where students buy and eat meals', vi: 'căng tin', icon: '🍱',
    example: 'We have lunch in the canteen at 11:30.', exampleVi: 'Chúng tôi ăn trưa ở căng tin lúc 11 giờ 30.',
    situations: ['At lunchtime, students queue here for rice, soup and vegetables.', 'You can buy a snack and a drink in this room at break.', 'There are long tables, and everyone eats here together at noon.'] },
  { word: 'playground', topic: 'school-places', definition: 'an outdoor area where children play at school', vi: 'sân chơi, sân trường', icon: '🛝',
    example: 'The children play skipping games in the playground.', exampleVi: 'Bọn trẻ chơi nhảy dây ngoài sân trường.',
    situations: ['At break, everyone runs outside to play shuttlecock and skip.', 'The flag ceremony happens in this open area every Monday morning.', 'The younger students play tag here under the big trees.'] },
  { word: 'science lab', topic: 'school-places', definition: 'a room with special equipment for doing experiments', vi: 'phòng thí nghiệm', icon: '🧪',
    example: 'We wear safety glasses in the science lab.', exampleVi: 'Chúng tôi đeo kính bảo hộ trong phòng thí nghiệm.',
    situations: ['There are test tubes, microscopes and a sink for experiments in this room.', 'In Chemistry, we mix liquids here and watch them change colour.', 'You must not eat or drink in this room because of the chemicals.'] },
  { word: 'school hall', topic: 'school-places', definition: 'a large room where all the students meet for events', vi: 'hội trường', icon: '🎭',
    example: 'The school play is in the school hall tonight.', exampleVi: 'Vở kịch của trường diễn ở hội trường tối nay.',
    situations: ['All the classes sit together in this big room for the end-of-year show.', 'There is a stage at the front, and parents watch the concert here.', 'The head teacher gave out prizes to the best students in this large room.'] },
  { word: 'staff room', topic: 'school-places', definition: 'a room where teachers work and rest', vi: 'phòng giáo viên', icon: '☕',
    example: 'Please take these books to the staff room.', exampleVi: 'Em hãy mang những cuốn sách này lên phòng giáo viên.',
    situations: ['The teachers drink tea and mark tests here between lessons.', 'Students knock on the door of this room when they want to see a teacher.', 'Only teachers can sit and relax in this room at break.'] },
  { word: 'computer room', topic: 'school-places', definition: 'a room in a school with many computers for lessons', vi: 'phòng máy tính', icon: '🖥️',
    example: 'We have IT in the computer room.', exampleVi: 'Chúng tôi học Tin học ở phòng máy tính.',
    situations: ['Each student sits at a screen and learns to type here.', 'Our IT lessons happen in this room with forty machines.', 'We go to this room to search the internet for our project.'] },
  // Studying and exams
  { word: 'exam', topic: 'studying', definition: 'an important test of what you know', vi: 'kỳ thi, bài thi', icon: '📝',
    example: 'The end-of-term exams start next Monday.', exampleVi: 'Kỳ thi cuối kỳ bắt đầu từ thứ Hai tới.',
    situations: ['Students sit in silence for ninety minutes and answer questions on paper.', 'Everyone is nervous because this big test decides who goes to the next class.', 'Grade 9 students take this to get into high school.'] },
  { word: 'revise', topic: 'studying', definition: 'study again what you have learnt, before a test', vi: 'ôn bài', icon: '🔁',
    example: 'I need to revise for my History test.', exampleVi: 'Tôi cần ôn bài cho bài kiểm tra Lịch sử.',
    situations: ['The night before the test, Lan reads all her notes from the term again.', 'Minh goes over the vocabulary lists one more time before the English test.', 'We made flashcards to study the old lessons again for the exam.'] },
  { word: 'mark', topic: 'studying', definition: 'a number or letter that shows how good your work is', vi: 'điểm số', icon: '💯',
    example: 'I got a mark of 9 in Maths.', exampleVi: 'Tôi được 9 điểm môn Toán.',
    situations: ['The teacher wrote "8/10" in red on my test.', 'Nam was happy because he got 10 out of 10 in his English test.', 'Mum always asks me what number I got for my homework.'] },
  { word: 'cheat', topic: 'studying', definition: 'do something dishonest to get a better result in a test', vi: 'gian lận, quay cóp', icon: '🙈',
    example: "Don't cheat in the test. It's not fair.", exampleVi: 'Đừng quay cóp trong giờ kiểm tra. Như vậy không công bằng.',
    situations: ['He looked at his friend\'s answers during the test.', 'She hid notes under her desk and read them in the exam.', 'The teacher took the student\'s paper because he copied from his phone.'] },
  { word: 'school report', topic: 'studying', definition: 'a document that tells parents how a student is doing at school', vi: 'sổ liên lạc, học bạ', icon: '📄',
    example: 'My parents were proud of my school report.', exampleVi: 'Bố mẹ tôi tự hào về kết quả học tập của tôi.',
    situations: ['At the end of the term, my parents read what all my teachers wrote about me.', 'It shows my marks in every subject and says "Good behaviour".', 'Dad signed the paper from school that lists my results for the year.'] },
  { word: 'project', topic: 'studying', definition: 'a piece of work where students find out about a topic, often in a group', vi: 'dự án', icon: '🗂️',
    example: 'Our group is doing a project about rubbish in our city.', exampleVi: 'Nhóm chúng tôi đang làm dự án về rác thải trong thành phố.',
    situations: ['For three weeks, our group collected information about rivers and made a big poster.', 'We interviewed people in the market and presented what we found to the class.', 'Each team has to make a model of a green house and explain it.'] },
  // School life and rules
  { word: 'uniform', topic: 'school-life', definition: 'special clothes that all students at a school wear', vi: 'đồng phục', icon: '👔',
    example: 'Our uniform is a white shirt and blue trousers.', exampleVi: 'Đồng phục của chúng tôi là áo sơ mi trắng và quần xanh.',
    situations: ['Every student wears the same white shirt and dark trousers or skirt.', 'On Monday we must wear the clothes with the school badge on them.', 'Lan wears an áo dài as the school\'s special clothes on Mondays.'] },
  { word: 'break time', topic: 'school-life', definition: 'a short time between lessons when students can rest or play', vi: 'giờ ra chơi', icon: '🔔',
    example: 'We play football at break time.', exampleVi: 'Chúng tôi đá bóng vào giờ ra chơi.',
    situations: ['The bell rings at 9:15, and everyone has twenty minutes to play.', 'After two lessons, we go outside, eat a snack and talk.', 'We have fifteen minutes to rest between the second and third lessons.'] },
  { word: 'absent', topic: 'school-life', definition: 'not at school or class when you should be', vi: 'vắng mặt', icon: '🚫',
    example: 'Nam was absent yesterday because he was ill.', exampleVi: 'Hôm qua Nam vắng mặt vì bị ốm.',
    situations: ['Minh was ill, so he stayed at home and missed all his lessons.', 'The teacher called the names, and Mai wasn\'t there.', 'Three students didn\'t come to class today because of the flu.'] },
  { word: 'detention', topic: 'school-life', definition: 'a punishment where a student must stay at school after lessons', vi: 'phạt ở lại sau giờ học', icon: '⏰',
    example: 'He got a detention for being rude to the teacher.', exampleVi: 'Cậu ấy bị phạt ở lại vì vô lễ với giáo viên.',
    situations: ['Nam was late five times, so he had to stay at school for an hour after lessons.', 'The students who wrote on the desks had to stay behind and clean them after school.', 'She didn\'t do her homework again, so she stayed in the classroom when everyone else went home.'] },
  { word: 'school trip', topic: 'school-life', definition: 'a visit to a place with your class and teachers', vi: 'chuyến dã ngoại của trường', icon: '🚌',
    example: 'Our school trip to the Temple of Literature was great.', exampleVi: 'Chuyến tham quan Văn Miếu của trường chúng tôi rất tuyệt.',
    situations: ['Our class went by bus to a museum with our teachers.', 'In spring, all of Grade 7 visits a farm outside the city for the day.', 'The teacher gave our parents a form to sign before we went to the zoo with the class.'] },
  { word: 'put up your hand', topic: 'school-life', definition: 'lift your arm in class to ask or answer a question', vi: 'giơ tay', icon: '✋',
    example: 'Put up your hand if you know the answer.', exampleVi: 'Em nào biết câu trả lời thì giơ tay.',
    situations: ['Lan knows the answer, so she lifts her arm and waits for the teacher.', 'Don\'t shout out in class. Lift your arm first and wait.', 'The teacher said: "Who wants to read? Show me your arm!"'] },
];
