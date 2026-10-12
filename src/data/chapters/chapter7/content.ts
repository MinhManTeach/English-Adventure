import type { VocabWord } from '../shared';

/** Unit 19: abilities (can / could). */
export const ABILITIES = [
  { base: 'swim', third: 'swims', ing: 'swimming', object: 'very fast' },
  { base: 'ride', third: 'rides', ing: 'riding', object: 'a bike' },
  { base: 'speak', third: 'speaks', ing: 'speaking', object: 'French' },
  { base: 'play', third: 'plays', ing: 'playing', object: 'the guitar' },
  { base: 'read', third: 'reads', ing: 'reading', object: 'music' },
  { base: 'cook', third: 'cooks', ing: 'cooking', object: 'fried rice' },
  { base: 'draw', third: 'draws', ing: 'drawing', object: 'horses' },
  { base: 'climb', third: 'climbs', ing: 'climbing', object: 'trees' },
  { base: 'skate', third: 'skates', ing: 'skating', object: 'backwards' },
  { base: 'count', third: 'counts', ing: 'counting', object: 'to a hundred' },
  { base: 'touch', third: 'touches', ing: 'touching', object: 'the ceiling' },
  { base: 'write', third: 'writes', ing: 'writing', object: 'with both hands' },
  { base: 'juggle', third: 'juggles', ing: 'juggling', object: 'three balls' },
  { base: 'type', third: 'types', ing: 'typing', object: 'without looking' },
] as const;

/** Unit 19: polite requests. */
export const REQUESTS = [
  { base: 'open', object: 'the window' }, { base: 'close', object: 'the door' }, { base: 'help', object: 'me with this box' },
  { base: 'pass', object: 'me the salt' }, { base: 'lend', object: 'me a pen' }, { base: 'turn', object: 'the music down' },
  { base: 'show', object: 'me the way' }, { base: 'say', object: 'that again' }, { base: 'carry', object: 'my bag' },
  { base: 'wait', object: 'for me' }, { base: 'switch', object: 'on the light' }, { base: 'spell', object: 'your name' },
] as const;

/** Unit 19: possible future events (may / may not). */
export const POSSIBILITIES = [
  { base: 'see', object: 'a film' }, { base: 'visit', object: 'the museum' }, { base: 'come', object: 'to the party' },
  { base: 'win', object: 'the match' }, { base: 'be', object: 'late' }, { base: 'go', object: 'to the beach' },
  { base: 'buy', object: 'a new phone' }, { base: 'need', object: 'an umbrella' }, { base: 'move', object: 'to Da Nang' },
  { base: 'join', object: 'the club' }, { base: 'stay', object: 'at home' }, { base: 'finish', object: 'the project' },
] as const;

/** Unit 20: duties with neutral objects. */
export const DUTIES = [
  { base: 'wear', third: 'wears', object: 'a uniform' }, { base: 'get', third: 'gets', object: 'up early' },
  { base: 'take', third: 'takes', object: 'the bus' }, { base: 'walk', third: 'walks', object: 'the dog' },
  { base: 'tidy', third: 'tidies', object: 'the classroom' }, { base: 'study', third: 'studies', object: 'for the test' },
  { base: 'wait', third: 'waits', object: 'outside' }, { base: 'pay', third: 'pays', object: 'for the tickets' },
  { base: 'clean', third: 'cleans', object: 'the board' }, { base: 'water', third: 'waters', object: 'the plants' },
  { base: 'feed', third: 'feeds', object: 'the fish' }, { base: 'finish', third: 'finishes', object: 'the project' },
] as const;

/** Unit 20: situations with exactly one fitting modal. */
export const MUSTNT = [
  { situation: 'The sign says "No phones in the exam".', action: 'use your phone' },
  { situation: 'The sign says "Don\'t feed the animals".', action: 'give the monkeys food' },
  { situation: 'The library has a "Silence" sign.', action: 'talk loudly' },
  { situation: 'The traffic light is red.', action: 'cross the road' },
  { situation: 'The sign says "No swimming".', action: 'swim in this lake' },
  { situation: 'The sign says "Keep off the grass".', action: 'walk on the grass' },
  { situation: 'The museum says "No photos".', action: 'take pictures here' },
  { situation: 'The rule is "No running in the corridor".', action: 'run in the corridor' },
  { situation: 'The pool rule says "No diving".', action: 'dive into the pool' },
  { situation: 'The sign says "No parking".', action: 'park your car here' },
] as const;
export const NOT_NECESSARY = [
  { situation: 'It\'s Sunday.', action: 'get up early' },
  { situation: 'The museum is free.', action: 'pay for a ticket' },
  { situation: 'We have lots of bread at home.', action: 'buy any bread' },
  { situation: 'It\'s a holiday tomorrow.', action: 'go to school' },
  { situation: 'Dad will drive us.', action: 'take the bus' },
  { situation: 'The test is next month.', action: 'study tonight' },
  { situation: 'The party is casual.', action: 'wear smart clothes' },
  { situation: 'Your homework is already finished.', action: 'do it again' },
  { situation: 'The shop delivers for free.', action: 'carry the boxes home' },
  { situation: 'There is a lift.', action: 'use the stairs' },
] as const;

/** Unit 21 Rules. */
export const RULE_WORDS: readonly VocabWord[] = [
  // Things
  { word: 'helmet', topic: 'rule-things', definition: 'a hard hat that keeps your head safe', vi: 'mũ bảo hiểm', icon: '⛑️',
    example: 'You must wear a helmet on a motorbike.', exampleVi: 'Bạn phải đội mũ bảo hiểm khi đi xe máy.',
    situations: ['Put this hard hat on before you ride your bike.', 'Builders wear one so falling things don\'t hurt their heads.', 'Dad gives me this before we get on the motorbike.'] },
  { word: 'seat belt', topic: 'rule-things', definition: 'a belt in a car that keeps you in your seat', vi: 'dây an toàn', icon: '🚗',
    example: 'Put on your seat belt, please.', exampleVi: 'Hãy thắt dây an toàn.',
    situations: ['In the car, Mum says, "Click it across your body before we go."', 'On the plane, you fasten it around your waist.', 'It holds you in the car seat if the car stops suddenly.'] },
  { word: 'traffic lights', topic: 'rule-things', definition: 'red, yellow and green lights that control cars', vi: 'đèn giao thông', icon: '🚦',
    example: 'Stop when the traffic lights are red.', exampleVi: 'Dừng lại khi đèn giao thông đỏ.',
    situations: ['The light turns green, so the cars can go.', 'At the crossroads, the red light tells drivers to stop.', 'They change from red to yellow to green.'] },
  { word: 'notice', topic: 'rule-things', definition: 'a piece of paper on a wall that gives information', vi: 'thông báo', icon: '📌',
    example: 'Read the notice on the classroom door.', exampleVi: 'Hãy đọc thông báo trên cửa lớp.',
    situations: ['A paper on the board says the school trip is on Friday.', 'There is a sign on the wall: "The pool is closed today."', 'The teacher puts a message on the wall about the new timetable.'] },
  { word: 'jewellery', topic: 'rule-things', definition: 'rings, necklaces and earrings', vi: 'trang sức', icon: '💍',
    example: 'You can\'t wear jewellery in PE.', exampleVi: 'Bạn không được đeo trang sức trong giờ Thể dục.',
    situations: ['Mai takes off her ring and earrings before the match.', 'Grandma has a gold necklace and a silver bracelet.', 'The shop sells beautiful rings and earrings.'] },
  { word: 'make-up', topic: 'rule-things', definition: 'colours that people put on their face', vi: 'đồ trang điểm', icon: '💄',
    example: 'Students can\'t wear make-up at our school.', exampleVi: 'Học sinh trường tôi không được trang điểm.',
    situations: ['The actor puts lipstick and colour on her face before the show.', 'My sister paints her lips red for the party.', 'The clown has a white face and a big red nose painted on.'] },
  // Life
  { word: 'law', topic: 'rule-life', definition: 'an official rule for everyone in a country', vi: 'luật pháp', icon: '⚖️',
    example: 'It is against the law to drive without a licence.', exampleVi: 'Lái xe không có bằng là vi phạm pháp luật.',
    situations: ['The government says everyone in the country must wear a helmet on a motorbike.', 'If you steal, the police will arrest you because you broke this official rule.', 'Every person in the country has to follow this rule from the government.'] },
  { word: 'police officer', topic: 'rule-life', definition: 'a person whose job is to make people follow the law', vi: 'cảnh sát', icon: '👮',
    example: 'The police officer helped the lost child.', exampleVi: 'Chú cảnh sát đã giúp em bé bị lạc.',
    situations: ['A man in uniform stops a driver who is going too fast.', 'She catches a thief and takes him to the station.', 'He stands at the crossroads and helps cars move safely.'] },
  { word: 'litter', topic: 'rule-life', definition: 'rubbish that people drop on the ground', vi: 'rác xả bừa bãi', icon: '🗑️',
    example: 'Please don\'t drop litter in the park.', exampleVi: 'Xin đừng xả rác trong công viên.',
    situations: ['There are plastic bottles and sweet papers all over the beach.', 'After the festival, the street is full of paper cups and bags.', 'Our class picks up rubbish from the school yard.'] },
  { word: 'school uniform', topic: 'rule-life', definition: 'special clothes that all students wear at school', vi: 'đồng phục học sinh', icon: '👔',
    example: 'Our school uniform is a white shirt and blue trousers.', exampleVi: 'Đồng phục trường tôi là áo sơ mi trắng và quần xanh.',
    situations: ['All the students wear the same white shirt and red scarf.', 'On Monday everyone must wear the school\'s special clothes.', 'Nam\'s mum irons his white shirt and blue trousers for school.'] },
  { word: 'road', topic: 'rule-life', definition: 'a hard way where cars, buses and bikes travel', vi: 'con đường', icon: '🛣️',
    example: 'Look both ways before you cross the road.', exampleVi: 'Nhìn hai bên trước khi sang đường.',
    situations: ['Cars, motorbikes and buses drive here.', 'Children must look left and right before they walk across it.', 'It goes from our village to the city, and trucks use it every day.'] },
  { word: 'driver', topic: 'rule-life', definition: 'a person who drives a car, bus or taxi', vi: 'tài xế', icon: '🚕',
    example: 'The bus driver stops at every bus stop.', exampleVi: 'Tài xế xe buýt dừng ở mọi trạm.',
    situations: ['Mr Tuan takes people around the city in his taxi.', 'The person at the wheel of the bus says good morning.', 'She is behind the wheel of the car and must follow the traffic rules.'] },
  // Actions
  { word: 'allow', topic: 'rule-actions', definition: 'say that someone can do something', vi: 'cho phép', icon: '✅',
    example: 'Our teacher allows us to use dictionaries.', exampleVi: 'Cô giáo cho phép chúng tôi dùng từ điển.',
    situations: ['Mum says yes, I can stay up late tonight.', 'The rules say students can bring water into the classroom.', 'The park says dogs can come in.'] },
  { word: 'throw away', topic: 'rule-actions', definition: 'put something in the bin because you don\'t want it', vi: 'vứt đi', icon: '🚮',
    example: 'Don\'t throw away plastic bottles. Recycle them!', exampleVi: 'Đừng vứt chai nhựa. Hãy tái chế!',
    situations: ['The banana is old and brown, so I put it in the bin.', 'Mum puts the broken cup in the rubbish.', 'I don\'t need these old papers any more, so they go in the bin.'] },
  { word: 'park', topic: 'rule-actions', definition: 'leave a car or bike in a place for some time', vi: 'đỗ xe', icon: '🅿️',
    example: 'You can\'t park in front of the gate.', exampleVi: 'Bạn không được đỗ xe trước cổng.',
    situations: ['Dad stops the car in the space and turns off the engine.', 'We leave our bikes outside the school for the day.', 'Mum looks for a space for the car near the market.'] },
  { word: 'arrest', topic: 'rule-actions', definition: 'when the police take someone away because they broke the law', vi: 'bắt giữ', icon: '🚓',
    example: 'The police arrested the thief.', exampleVi: 'Cảnh sát đã bắt tên trộm.',
    situations: ['The police catch the man who stole the bike and take him to the station.', 'A thief takes a bag, and police officers stop him and take him away.', 'The officer puts handcuffs on the robber.'] },
  { word: 'enter', topic: 'rule-actions', definition: 'go into a place', vi: 'đi vào', icon: '🚪',
    example: 'Please knock before you enter the office.', exampleVi: 'Hãy gõ cửa trước khi vào văn phòng.',
    situations: ['The sign says "Staff only. Do not go in".', 'We walk into the museum through the big door.', 'You must show a ticket to go into the stadium.'] },
  { word: 'fight', topic: 'rule-actions', definition: 'hit or try to hurt each other', vi: 'đánh nhau', icon: '🥊',
    example: 'Students must never fight at school.', exampleVi: 'Học sinh không bao giờ được đánh nhau ở trường.',
    situations: ['Two boys push and hit each other in the playground.', 'The cats are angry and scratch each other.', 'The teacher stops two students who are hitting each other.'] },
  // Adjectives
  { word: 'careful', topic: 'rule-adjectives', definition: 'thinking about what you do so you don\'t make mistakes or get hurt', vi: 'cẩn thận', icon: '👀',
    example: 'Be careful with that knife!', exampleVi: 'Cẩn thận với con dao đó!',
    situations: ['Lan holds the hot soup with both hands and walks slowly.', 'He looks left and right twice before crossing the road.', 'Minh checks every answer before he gives his test to the teacher.'] },
  { word: 'dangerous', topic: 'rule-adjectives', definition: 'can hurt you', vi: 'nguy hiểm', icon: '⚠️',
    example: 'It is dangerous to swim here.', exampleVi: 'Bơi ở đây rất nguy hiểm.',
    situations: ['There are sharks and strong waves in this sea.', 'The ice on the lake is very thin and may break.', 'This snake has poison, so stay away!'] },
  { word: 'necessary', topic: 'rule-adjectives', definition: 'needed, you must have or do it', vi: 'cần thiết', icon: '❗',
    example: 'A passport is necessary to travel abroad.', exampleVi: 'Hộ chiếu là cần thiết để đi nước ngoài.',
    situations: ['You can\'t fly to Japan without a passport. You need one.', 'Plants need water to live. Without it, they die.', 'You must have a ticket to get on the train.'] },
  { word: 'noisy', topic: 'rule-adjectives', definition: 'making a lot of loud sounds', vi: 'ồn ào', icon: '📢',
    example: 'The classroom is very noisy before the lesson.', exampleVi: 'Lớp học rất ồn trước giờ học.',
    situations: ['The children shout, laugh and bang the desks.', 'The street has loud motorbikes and car horns all day.', 'The neighbours play loud music and sing until midnight.'] },
  { word: 'polite', topic: 'rule-adjectives', definition: 'saying please and thank you, with good manners', vi: 'lịch sự', icon: '🙇',
    example: 'It is polite to say thank you.', exampleVi: 'Nói cảm ơn là lịch sự.',
    situations: ['Nam always says "please" and "thank you" to the shop assistant.', 'She opens the door for the old lady and says "After you".', 'He says "Excuse me" before he asks a question.'] },
  { word: 'quiet', topic: 'rule-adjectives', definition: 'making very little sound', vi: 'yên tĩnh', icon: '🤫',
    example: 'Please be quiet in the library.', exampleVi: 'Hãy giữ yên lặng trong thư viện.',
    situations: ['In the library, nobody talks and you can hear a pin drop.', 'The baby is sleeping, so we whisper.', 'At night the village has no sounds at all.'] },
];
