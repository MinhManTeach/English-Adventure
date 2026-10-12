import type { VocabWord } from '../shared';

/** Unit 25: things people have (possession, family, appearance, illness). */
export const POSSESSIONS = [
  'a bike', 'a pet rabbit', 'two sisters', 'a new phone', 'blue eyes', 'long hair', 'a big garden', 'a cold',
  'a lot of homework', 'a tablet', 'a guitar', 'three cousins', 'a camera', 'short hair', 'a red scooter', 'a headache',
] as const;

/** Unit 26: Wh-questions with exactly one fitting question word. [question with ___, answer, wh-word] */
export const WH_ITEMS = [
  ['___ do you live? In Hue.', 'Where'], ['___ is your birthday? On 5 May.', 'When'], ['___ is your teacher? Mr Tuan.', 'Who'],
  ['___ are you crying? Because I lost my dog.', 'Why'], ['___ do you go to school? By bus.', 'How'], ['___ old is your sister? She\'s twelve.', 'How'],
  ['___ is your favourite colour? Green.', 'What'], ['___ bag is this? It\'s Lan\'s.', 'Whose'], ['___ T-shirt do you want, the red one or the blue one?', 'Which'],
  ['___ time does the film start? At eight.', 'What'], ['___ often do you swim? Twice a week.', 'How'], ['___ many brothers have you got? Two.', 'How'],
  ['___ did you go last summer? To Da Lat.', 'Where'], ['___ did you meet at the party? My cousin.', 'Who'], ['___ much is this book? 50,000 dong.', 'How'],
  ['___ are you late? Because the bus was late.', 'Why'], ['___ does the shop open? At nine o\'clock.', 'When'], ['___ does this word mean?', 'What'],
  ['___ shoes are these? They\'re Nam\'s.', 'Whose'], ['___ is the weather like today? It\'s sunny.', 'What'], ['___ long is the film? Two hours.', 'How'],
  ['___ way is the station, left or right?', 'Which'], ['___ is your best friend? Mai.', 'Who'], ['___ do you keep your passport? In the drawer.', 'Where'],
] as const;
export const WH_WORDS = ['What', 'Where', 'When', 'Who', 'Why', 'How', 'Whose', 'Which'] as const;

/** Unit 26: be predicates for question tags. */
export const TAG_PREDICATES = ['happy', 'tired', 'at home', 'ready', 'hungry', 'in the team', 'late', 'busy', 'from Hanoi', 'good at Maths'] as const;

/** Unit 27 Character and appearance. */
export const PEOPLE_WORDS: readonly VocabWord[] = [
  // Hair and face
  { word: 'curly', topic: 'hair-face', definition: 'with lots of round curls', vi: 'xoăn', icon: '🌀',
    example: 'My sister has curly hair.', exampleVi: 'Chị tôi có mái tóc xoăn.',
    situations: ['Her hair goes round and round like little springs.', 'His hair isn\'t straight at all. It has lots of round shapes.', 'The baby has hair with lots of small rings.'] },
  { word: 'straight', topic: 'hair-face', definition: 'not curly or wavy', vi: 'thẳng', icon: '📏',
    example: 'Lan has long, straight black hair.', exampleVi: 'Lan có mái tóc đen dài và thẳng.',
    situations: ['Her hair goes down smoothly with no curls at all.', 'He brushes his hair and it hangs flat with no waves.', 'Mai\'s long black hair is like a smooth line.'] },
  { word: 'blond', topic: 'hair-face', definition: 'pale yellow (for hair)', vi: 'vàng hoe (tóc)', icon: '👱',
    example: 'The boy from Sweden has blond hair.', exampleVi: 'Cậu bé đến từ Thụy Điển có tóc vàng.',
    situations: ['His hair is light yellow, like sand.', 'The girl\'s hair is the colour of straw.', 'Many children in Norway have light yellow hair.'] },
  { word: 'bald', topic: 'hair-face', definition: 'with little or no hair on the head', vi: 'hói', icon: '👨‍🦲',
    example: 'My grandpa is bald.', exampleVi: 'Ông tôi bị hói.',
    situations: ['Grandpa has no hair on top of his head.', 'The sun shines on the man\'s head because there is no hair there.', 'He shaved off all his hair, so his head is smooth.'] },
  { word: 'beard', topic: 'hair-face', definition: 'hair that grows on a man\'s chin and cheeks', vi: 'râu quai nón', icon: '🧔',
    example: 'Santa has a long white beard.', exampleVi: 'Ông già Noel có bộ râu dài trắng.',
    situations: ['My uncle has hair on his chin and cheeks.', 'Santa Claus has long white hair on his face.', 'Dad stopped shaving, so now his chin is hairy.'] },
  { word: 'freckles', topic: 'hair-face', definition: 'small brown spots on the skin', vi: 'tàn nhang', icon: '🟤',
    example: 'She has freckles on her nose.', exampleVi: 'Cô ấy có tàn nhang trên mũi.',
    situations: ['The girl has lots of tiny brown dots on her nose and cheeks.', 'In summer, small brown spots appear on his face.', 'Her face has little brown marks from the sun.'] },
  // Appearance
  { word: 'tall', topic: 'appearance', definition: 'higher than most people', vi: 'cao', icon: '🦒',
    example: 'My brother is very tall. He\'s 1.85 metres.', exampleVi: 'Anh tôi rất cao. Anh ấy cao 1,85 mét.',
    situations: ['Nam is 1.80 metres and he can touch the top of the door.', 'The basketball player has to bend down to go through doors.', 'She is the highest person in our class.'] },
  { word: 'slim', topic: 'appearance', definition: 'thin in a nice way', vi: 'mảnh khảnh, thon thả', icon: '🧍‍♀️',
    example: 'The dancer is tall and slim.', exampleVi: 'Vũ công cao và mảnh khảnh.',
    situations: ['The model is thin and looks very healthy.', 'He runs every day and has a thin, healthy body.', 'The ballet dancer has a light, thin body.'] },
  { word: 'handsome', topic: 'appearance', definition: 'good-looking (usually for a man)', vi: 'đẹp trai', icon: '🤵',
    example: 'The actor is very handsome.', exampleVi: 'Nam diễn viên rất đẹp trai.',
    situations: ['Everyone says the young prince in the film looks great.', 'The singer is a good-looking man with a nice smile.', 'My cousin is a very good-looking young man.'] },
  { word: 'pretty', topic: 'appearance', definition: 'nice to look at (usually for a girl or woman)', vi: 'xinh xắn', icon: '🌸',
    example: 'Your little sister is so pretty!', exampleVi: 'Em gái bạn xinh quá!',
    situations: ['The little girl has big eyes and a lovely smile.', 'The bride looks lovely in her white dress.', 'Everyone says Mai\'s baby daughter looks lovely.'] },
  { word: 'middle-aged', topic: 'appearance', definition: 'about 45 to 60 years old', vi: 'trung niên', icon: '🧑‍🦳',
    example: 'Our teacher is a middle-aged woman.', exampleVi: 'Cô giáo chúng tôi là một phụ nữ trung niên.',
    situations: ['My aunt is fifty years old and has a few grey hairs.', 'The man is not young and not old. He is about fifty.', 'My parents are both in their fifties.'] },
  { word: 'cute', topic: 'appearance', definition: 'small and nice to look at', vi: 'dễ thương', icon: '🐣',
    example: 'What a cute puppy!', exampleVi: 'Chú cún dễ thương quá!',
    situations: ['The little kitten has a tiny nose and big round eyes.', 'Look at the baby panda! I want to hug it!', 'My baby cousin has chubby cheeks and a tiny smile.'] },
  // Good character
  { word: 'generous', topic: 'good-character', definition: 'happy to give things and share', vi: 'hào phóng', icon: '🎁',
    example: 'My aunt is very generous. She always buys us presents.', exampleVi: 'Cô tôi rất hào phóng. Cô luôn mua quà cho chúng tôi.',
    situations: ['Minh gives half of his lunch to anyone who is hungry.', 'Grandpa always gives money to people who need it.', 'She shares her toys and sweets with everyone.'] },
  { word: 'honest', topic: 'good-character', definition: 'always telling the truth', vi: 'trung thực', icon: '🤝',
    example: 'Lan is honest. She never tells lies.', exampleVi: 'Lan trung thực. Bạn ấy không bao giờ nói dối.',
    situations: ['Nam found a wallet and gave it back to the owner.', 'She broke the window and told the teacher the truth.', 'He never lies, even when the truth is hard.'] },
  { word: 'clever', topic: 'good-character', definition: 'able to learn and understand things quickly', vi: 'thông minh', icon: '🧠',
    example: 'Hoa is very clever. She solves puzzles quickly.', exampleVi: 'Hoa rất thông minh. Bạn ấy giải đố rất nhanh.',
    situations: ['Minh learns new things very fast and always gets top marks.', 'She can solve difficult Maths problems in one minute.', 'My little brother understood the game rules immediately.'] },
  { word: 'funny', topic: 'good-character', definition: 'making people laugh', vi: 'hài hước', icon: '😂',
    example: 'My dad is really funny.', exampleVi: 'Bố tôi rất hài hước.',
    situations: ['Nam tells jokes and everyone laughs.', 'Our teacher makes silly faces and the class can\'t stop laughing.', 'My cousin always says things that make me laugh.'] },
  { word: 'brave', topic: 'good-character', definition: 'not afraid of danger', vi: 'dũng cảm', icon: '🦁',
    example: 'The firefighter was very brave.', exampleVi: 'Người lính cứu hỏa rất dũng cảm.',
    situations: ['The girl jumped into the river to save a puppy.', 'He isn\'t afraid of the dark or of big dogs.', 'The firefighter ran into the burning house to help a family.'] },
  { word: 'hard-working', topic: 'good-character', definition: 'working a lot and doing your best', vi: 'chăm chỉ', icon: '📚',
    example: 'Our class is very hard-working.', exampleVi: 'Lớp chúng tôi rất chăm chỉ.',
    situations: ['Mai studies every evening and always finishes her homework.', 'The farmer works from early morning until night.', 'He practises the piano for two hours every day.'] },
  // Difficult character
  { word: 'shy', topic: 'difficult-character', definition: 'nervous about talking to people you don\'t know', vi: 'nhút nhát', icon: '🙈',
    example: 'The new boy is shy. He doesn\'t talk much.', exampleVi: 'Cậu bạn mới nhút nhát. Bạn ấy ít nói.',
    situations: ['At the party, Hoa stands in the corner and doesn\'t talk to new people.', 'His face goes red when the teacher asks him a question.', 'She hides behind her mum when visitors come.'] },
  { word: 'rude', topic: 'difficult-character', definition: 'not polite', vi: 'thô lỗ', icon: '😤',
    example: 'It is rude to talk with your mouth full.', exampleVi: 'Nói khi miệng đầy thức ăn là bất lịch sự.',
    situations: ['He never says please or thank you, and he shouts at the waiter.', 'She pushed past the old man without saying sorry.', 'The boy laughed at his teacher and didn\'t listen.'] },
  { word: 'selfish', topic: 'difficult-character', definition: 'thinking only about yourself', vi: 'ích kỷ', icon: '🙅',
    example: 'Don\'t be selfish. Share your toys!', exampleVi: 'Đừng ích kỷ. Hãy chia sẻ đồ chơi!',
    situations: ['Nam eats all the cake and doesn\'t leave any for his sister.', 'She only thinks about what she wants and never helps others.', 'He takes the best seat every time and never shares.'] },
  { word: 'bossy', topic: 'difficult-character', definition: 'always telling other people what to do', vi: 'hách dịch', icon: '👉',
    example: 'My big sister is so bossy!', exampleVi: 'Chị tôi hách dịch quá!',
    situations: ['Lan always tells everyone in the group what to do and how to do it.', '"Sit here! Do this! Don\'t touch that!" he says to his friends all the time.', 'She gives orders to her brothers all day.'] },
  { word: 'lazy', topic: 'difficult-character', definition: 'not wanting to work or do anything', vi: 'lười biếng', icon: '🦥',
    example: 'He is too lazy to tidy his room.', exampleVi: 'Bạn ấy lười đến mức không dọn phòng.',
    situations: ['My brother lies on the sofa all weekend and never helps.', 'She never does her homework because she doesn\'t want to try.', 'He stays in bed until noon and does nothing all day.'] },
  { word: 'impatient', topic: 'difficult-character', definition: 'not able to wait calmly', vi: 'thiếu kiên nhẫn', icon: '⏳',
    example: 'Don\'t be impatient. The bus will come soon.', exampleVi: 'Đừng sốt ruột. Xe buýt sẽ đến sớm thôi.',
    situations: ['Nam waits for one minute and then starts shouting, "Where is the bus?"', 'She hates waiting in queues and keeps looking at her watch.', '"Hurry up! I can\'t wait any longer!" he says after two seconds.'] },
];
