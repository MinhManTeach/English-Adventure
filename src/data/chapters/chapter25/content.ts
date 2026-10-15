import type { VocabWord } from '../shared';

/**
 * A2 Unit 31 (id 73): first conditional situations.
 * `result` follows will; `noResult` follows won't. Neither contains a possessive, so any subject fits.
 */
export const FIRST_CONDITIONS = [
  { base: 'study', third: 'studies', past: 'studied', obj: 'for the exam', result: 'get a good mark', noResult: 'fail the exam' },
  { base: 'miss', third: 'misses', past: 'missed', obj: 'the school bus', result: 'be late for class', noResult: 'arrive on time' },
  { base: 'eat', third: 'eats', past: 'ate', obj: 'too much ice cream', result: 'get a sore throat', noResult: 'feel well tomorrow' },
  { base: 'go', third: 'goes', past: 'went', obj: 'to Da Lat in December', result: 'need a warm jacket', noResult: 'feel hot' },
  { base: 'take', third: 'takes', past: 'took', obj: 'the train to Hue', result: 'see the countryside', noResult: 'get stuck in traffic' },
  { base: 'save', third: 'saves', past: 'saved', obj: 'the lucky money from Tết', result: 'buy a new bike', noResult: 'need to ask Mum for money' },
  { base: 'practise', third: 'practises', past: 'practised', obj: 'the piano every day', result: 'play well at the concert', noResult: 'make many mistakes' },
  { base: 'leave', third: 'leaves', past: 'left', obj: 'home now', result: 'catch the ferry', noResult: 'miss the ferry' },
  { base: 'forget', third: 'forgets', past: 'forgot', obj: 'the umbrella', result: 'get wet', noResult: 'stay dry' },
  { base: 'drink', third: 'drinks', past: 'drank', obj: 'more water', result: 'feel better', noResult: 'get a headache' },
  { base: 'watch', third: 'watches', past: 'watched', obj: 'the late match tonight', result: 'be tired tomorrow', noResult: 'get enough sleep' },
  { base: 'visit', third: 'visits', past: 'visited', obj: 'Ha Long Bay', result: 'go on a boat trip', noResult: 'be bored' },
  { base: 'finish', third: 'finishes', past: 'finished', obj: 'the project today', result: 'have a free weekend', noResult: 'have to work at the weekend' },
  { base: 'wear', third: 'wears', past: 'wore', obj: 'a helmet', result: 'be safe on the motorbike', noResult: 'get a fine' },
] as const;

/** Unless = if ... not. The whole result (with will or won't) follows the pronoun. */
export const UNLESS_ITEMS = [
  { base: 'hurry', third: 'hurries', obj: '', result: 'will miss the bus' },
  { base: 'wear', third: 'wears', obj: 'a coat', result: 'will feel cold in Sa Pa' },
  { base: 'take', third: 'takes', obj: 'an umbrella', result: 'will get wet' },
  { base: 'set', third: 'sets', obj: 'an alarm', result: 'will get up late' },
  { base: 'revise', third: 'revises', obj: 'for the test', result: "won't pass" },
  { base: 'leave', third: 'leaves', obj: 'now', result: 'will be late for the concert' },
  { base: 'drink', third: 'drinks', obj: 'enough water', result: 'will get a headache' },
  { base: 'ask', third: 'asks', obj: 'for directions', result: 'will get lost in the Old Quarter' },
  { base: 'charge', third: 'charges', obj: 'the phone', result: "won't be able to call home" },
  { base: 'book', third: 'books', obj: 'the tickets early', result: "won't get a seat on the train" },
  { base: 'practise', third: 'practises', obj: 'every day', result: "won't improve" },
  { base: 'tidy', third: 'tidies', obj: 'the room', result: "won't find anything" },
] as const;

/** If + present simple, then a modal (can / might / may / should / must) + base verb. [gap with ___, base answer] */
export const MODAL_ITEMS = [
  ['If it rains on Saturday, we might ___ the picnic. (cancel)', 'cancel'],
  ['If you finish your homework, you can ___ cartoons. (watch)', 'watch'],
  ['If Lan feels ill tomorrow, she may ___ at home. (stay)', 'stay'],
  ['If you have a fever, you should ___ a doctor. (see)', 'see'],
  ['If the shop is closed, we can ___ online. (order)', 'order'],
  ['If Minh gets the job, he might ___ to Ho Chi Minh City. (move)', 'move'],
  ['If you borrow my bike, you must ___ it back by six. (bring)', 'bring'],
  ['If the water is too cold, the children may not ___ in the sea. (swim)', 'swim'],
  ['If you want to get fit, you should ___ to school. (cycle)', 'cycle'],
  ['If we are lucky, we might ___ dolphins on the boat trip. (see)', 'see'],
  ['If Grandma comes for Tết, she can ___ in my room. (sleep)', 'sleep'],
  ['If you are tired, you should ___ a short break. (take)', 'take'],
] as const;

/** If + present simple, then an imperative. [gap with ___, answer, base verb] */
export const IMPERATIVE_ITEMS = [
  ['If you see Mai, ___ her to call me. (tell)', 'tell'],
  ['If you feel sick, ___ the teacher. (tell)', 'tell'],
  ['If you get lost, ___ a police officer for help. (ask)', 'ask'],
  ['If the baby is sleeping, ___ quiet. (be)', 'be'],
  ['If you are cold, ___ my jacket. (borrow)', 'borrow'],
  ['If it starts to rain, ___ the washing inside. (bring)', 'bring'],
  ['If you go to the market, ___ some mangoes. (buy)', 'buy'],
  ['If you have a question, ___ your hand. (put up)', 'put up'],
  ['If the phone rings, ___ it, please. (answer)', 'answer'],
  ['If you finish early, ___ your answers again. (check)', 'check'],
  ['If you arrive before me, ___ at the gate. (wait)', 'wait'],
  ['If you visit Hoi An, ___ the lanterns at night. (see)', 'see'],
] as const;

/** A2 Unit 32 (id 74): imaginary situations for the second conditional. */
export const IMAGINARY = [
  { base: 'have', third: 'has', past: 'had', obj: 'a lot of free time', result: 'learn to play the guitar', noResult: 'feel bored' },
  { base: 'live', third: 'lives', past: 'lived', obj: 'near the beach', result: 'go swimming every day', noResult: 'need a swimming pool' },
  { base: 'win', third: 'wins', past: 'won', obj: 'the lottery', result: 'travel around the world', noResult: 'work any more' },
  { base: 'know', third: 'knows', past: 'knew', obj: 'the answer', result: 'tell the teacher', noResult: 'stay quiet' },
  { base: 'speak', third: 'speaks', past: 'spoke', obj: 'Japanese', result: 'work in Tokyo', noResult: 'need a dictionary in Tokyo' },
  { base: 'find', third: 'finds', past: 'found', obj: 'a wallet in the street', result: 'take it to the police', noResult: 'keep it' },
  { base: 'meet', third: 'meets', past: 'met', obj: 'a famous singer', result: 'ask for an autograph', noResult: 'be too shy to speak' },
  { base: 'own', third: 'owns', past: 'owned', obj: 'a robot', result: 'never wash the dishes again', noResult: 'do any housework' },
  { base: 'get', third: 'gets', past: 'got', obj: 'lost in a big city', result: 'ask a police officer for help', noResult: 'panic' },
  { base: 'see', third: 'sees', past: 'saw', obj: 'a ghost', result: 'run away', noResult: 'stay in the house' },
  { base: 'run', third: 'runs', past: 'ran', obj: 'the school', result: 'give everyone a day off', noResult: 'give any homework' },
  { base: 'go', third: 'goes', past: 'went', obj: 'to the moon', result: 'take lots of photos', noResult: 'want to come back' },
  { base: 'eat', third: 'eats', past: 'ate', obj: 'only junk food', result: 'feel ill', noResult: 'stay healthy' },
  { base: 'build', third: 'builds', past: 'built', obj: 'a time machine', result: 'visit the dinosaurs', noResult: 'stay at home' },
] as const;

/** If + subject + were + state, then would + result. Never offer "was": it is also used informally. */
export const WERE_STATES = [
  ['taller', 'join the basketball team'], ['older', 'drive a car'], ['rich', 'help poor families'],
  ['a bird', 'fly over the mountains'], ['free tonight', 'come to the party'], ['a teacher', 'give fun homework'],
  ['in Hanoi', 'visit the Old Quarter'], ['better at Maths', 'enter the competition'], ['a famous footballer', 'play for Vietnam'],
  ['braver', 'try the zip line'], ['on holiday', 'go to the beach'], ['the president of the school club', 'start a film night'],
] as const;

/** Real (first) or imaginary (second) conditional: [gap with ___, answer will | would, clue] */
export const REAL_OR_UNREAL = [
  ['If it rains tomorrow, we ___ stay at home.', 'will', 'a real plan'],
  ['If I had a billion dong, I ___ buy an island.', 'would', 'imaginary'],
  ['If you heat ice, it ___ melt.', 'will', 'a real result'],
  ['If dogs could talk, they ___ tell us lots of secrets.', 'would', 'impossible'],
  ['If Nam gets up early, he ___ have time for breakfast.', 'will', 'a real possibility'],
  ['If I were a cat, I ___ sleep all day.', 'would', 'imaginary'],
  ['If we miss this bus, we ___ take the next one.', 'will', 'a real possibility'],
  ['If people lived on Mars, they ___ need special houses.', 'would', 'imaginary'],
  ['If you water the plants, they ___ grow quickly.', 'will', 'a real result'],
  ['If Lan lived in Australia, she ___ see kangaroos every day.', 'would', 'imaginary: she lives in Vietnam'],
  ['If the shop is open, I ___ buy some bread.', 'will', 'a real plan'],
  ['If my grandpa were young again, he ___ learn to surf.', 'would', 'impossible'],
  ['If you press this button, the machine ___ start.', 'will', 'a real result'],
  ['If I could fly, I ___ visit my cousins in Canada every weekend.', 'would', 'impossible'],
] as const;

/** A2 Unit 33 (id 75): health and fitness. */
export const HEALTH_WORDS: readonly VocabWord[] = [
  // Illness
  { word: 'headache', topic: 'illness', definition: 'a pain in your head', vi: 'đau đầu', icon: '🤕',
    example: 'I have a headache because the music is too loud.', exampleVi: 'Tôi bị đau đầu vì nhạc to quá.',
    situations: ['After three hours of computer games, the top of Nam\'s head hurts.', 'The noise at the party was so loud that the inside of my head was hurting.', 'She feels a pain above her eyes, so she lies down in a dark room.'] },
  { word: 'sore throat', topic: 'illness', definition: 'a pain in your throat that makes it hard to swallow', vi: 'đau họng', icon: '🗣️',
    example: 'Drink warm water with honey if you have a sore throat.', exampleVi: 'Uống nước ấm với mật ong nếu bạn bị đau họng.',
    situations: ['It hurts when Lan swallows her food, and her voice is quiet.', 'After singing karaoke all night, Minh can hardly talk.', 'Grandma makes me hot lemon and honey because it hurts inside my neck.'] },
  { word: 'cough', topic: 'illness', definition: 'push air out of your chest with a loud noise', vi: 'ho', icon: '😷',
    example: 'Cover your mouth when you cough.', exampleVi: 'Hãy che miệng khi ho.',
    situations: ['Nam keeps making a loud, dry noise from his chest during the lesson.', 'The smoke made everyone go "hm-hm-HM!" again and again.', 'The doctor gave me some syrup to stop the noise from my chest at night.'] },
  { word: 'fever', topic: 'illness', definition: 'a body temperature that is higher than normal', vi: 'sốt', icon: '🌡️',
    example: 'The baby has a fever of 39 degrees.', exampleVi: 'Em bé bị sốt 39 độ.',
    situations: ['Mum touches my forehead. It\'s very hot, and the thermometer says 38.5.', 'Lan feels hot and cold at the same time, and her temperature is high.', 'Your body is hotter than normal, so you must stay in bed.'] },
  { word: 'stomach ache', topic: 'illness', definition: 'a pain in your tummy', vi: 'đau bụng', icon: '🤢',
    example: 'I ate too much and now I have a stomach ache.', exampleVi: 'Tôi ăn quá nhiều nên giờ bị đau bụng.',
    situations: ['Minh ate five bánh chưng at Tết, and now his tummy hurts.', 'After the old seafood, Mai held her tummy and lay on the sofa.', 'The middle of my body hurts after eating too fast.'] },
  { word: 'sneeze', topic: 'illness', definition: 'suddenly blow air out of your nose with a loud noise', vi: 'hắt hơi', icon: '🤧',
    example: 'The dust makes me sneeze.', exampleVi: 'Bụi làm tôi hắt hơi.',
    situations: ['"Achoo!" Flowers always make my nose do this in spring.', 'Pepper got into Nam\'s nose and he went "Achoo!" three times.', 'When the cat sits near me, my nose suddenly shoots air out, "Achoo!"'] },
  // Injuries
  { word: 'hurt', topic: 'injuries', definition: 'feel pain, or cause pain to a part of your body', vi: 'đau, làm đau', icon: '😣',
    example: 'I fell off my bike and hurt my knee.', exampleVi: 'Tôi ngã xe đạp và bị đau đầu gối.',
    situations: ['Ouch! I fell on the stairs, and now my knee is painful.', 'Be careful with that knife or you will cause yourself pain.', 'My legs are painful after the long walk up Fansipan.'] },
  { word: 'bandage', topic: 'injuries', definition: 'a long piece of cloth you put around an injury', vi: 'băng (gạc)', icon: '🩹',
    example: 'The nurse put a bandage round my ankle.', exampleVi: 'Cô y tá quấn băng quanh mắt cá chân tôi.',
    situations: ['The nurse wrapped a long white cloth around my arm again and again.', 'Nam\'s ankle is hurt, so the coach wrapped it in a long piece of cloth.', 'In the green box on the wall there is a roll of cloth for wrapping round a hurt leg.'] },
  { word: 'plaster', topic: 'injuries', definition: 'a small sticky strip you put over a small cut', vi: 'băng dán cá nhân', icon: '🩹',
    example: 'I cut my finger, so I put a plaster on it.', exampleVi: 'Tôi bị đứt tay nên dán một miếng băng cá nhân.',
    situations: ['Lan cut her finger with paper, so she stuck a tiny strip on it.', 'The little sticky strip on my knee has pictures of cartoon cats.', 'For a small cut, you only need a sticky strip, not a big cloth.'] },
  { word: 'bruise', topic: 'injuries', definition: 'a blue or purple mark on your skin after you hit something', vi: 'vết bầm tím', icon: '🟣',
    example: 'I have a big bruise on my leg from the football match.', exampleVi: 'Tôi có một vết bầm lớn ở chân sau trận bóng.',
    situations: ['I hit my leg on the table, and the next day there was a purple mark.', 'After the football match, Minh\'s leg had a dark blue mark but no cut.', 'The fruit fell on the floor and now it has a soft brown mark.'] },
  { word: 'ambulance', topic: 'injuries', definition: 'a vehicle that takes hurt or very ill people to hospital', vi: 'xe cứu thương', icon: '🚑',
    example: 'Call an ambulance! A man has fallen off his motorbike.', exampleVi: 'Gọi xe cứu thương đi! Một người đàn ông bị ngã xe máy.',
    situations: ['A white van with a loud siren is driving fast to the hospital.', 'In Vietnam, you phone 115 and this vehicle comes to help.', 'The cars move to the side of the road to let the vehicle with the flashing lights pass.'] },
  { word: 'first aid', topic: 'injuries', definition: 'simple help you give to a hurt person before a doctor comes', vi: 'sơ cứu', icon: '⛑️',
    example: 'Every teacher at our school learns first aid.', exampleVi: 'Mọi giáo viên ở trường tôi đều học sơ cứu.',
    situations: ['Before the doctor came, Mr Hung helped the boy and stopped the blood.', 'At the scout camp we learned how to help a person with a cut or a burn before the doctor arrives.', 'There is a green box with a white cross on the wall of the gym.'] },
  // At the doctor's
  { word: 'medicine', topic: 'doctor', definition: 'something you take to get better when you are ill', vi: 'thuốc', icon: '💊',
    example: 'Take this medicine three times a day.', exampleVi: 'Uống thuốc này ba lần một ngày.',
    situations: ['The doctor gave me some pills to take after every meal.', 'Lan doesn\'t like the taste of her cough syrup, but it helps.', 'Keep these pills and syrups away from small children.'] },
  { word: 'pharmacy', topic: 'doctor', definition: 'a shop where you buy medicine', vi: 'hiệu thuốc', icon: '🏥',
    example: 'There is a pharmacy next to the bakery.', exampleVi: 'Có một hiệu thuốc cạnh tiệm bánh.',
    situations: ['Mum went to the shop with the green cross to buy cough syrup.', 'You can buy plasters and pills at this shop on the corner.', 'The doctor wrote a paper, and we took it to this shop to get the medicine.'] },
  { word: 'appointment', topic: 'doctor', definition: 'a time you arrange to see a doctor or dentist', vi: 'cuộc hẹn (khám bệnh)', icon: '📅',
    example: 'I have an appointment with the dentist at 3 pm.', exampleVi: 'Tôi có hẹn với nha sĩ lúc 3 giờ chiều.',
    situations: ['Mum called the clinic to arrange a time for me to see the doctor on Friday.', 'I can\'t come to the café at three. I\'m seeing the dentist then.', 'The receptionist wrote "Tuesday, 9:30, Dr Lan" on a card for me.'] },
  { word: 'patient', topic: 'doctor', definition: 'a person who is getting help from a doctor or a nurse', vi: 'bệnh nhân', icon: '🛏️',
    example: 'The doctor sees thirty patients every morning.', exampleVi: 'Mỗi sáng bác sĩ khám cho ba mươi bệnh nhân.',
    situations: ['The man in bed number 5 at the hospital is waiting for the nurse.', 'Ten sick people are sitting in the waiting room to see the doctor.', 'The nurse asks the sick boy, "How are you feeling today?"'] },
  { word: 'recover', topic: 'doctor', definition: 'become healthy again after an illness or injury', vi: 'hồi phục', icon: '💪',
    example: 'Grandpa recovered quickly after the operation.', exampleVi: 'Ông hồi phục nhanh sau ca phẫu thuật.',
    situations: ['Nam was ill for a week, but now he feels well and is back at school.', 'After her broken leg, it took Mai two months to walk normally again.', 'Rest and drink lots of water and you will be well again soon.'] },
  { word: 'check-up', topic: 'doctor', definition: 'a visit to a doctor or dentist to see if you are healthy', vi: 'buổi khám sức khỏe định kỳ', icon: '🩺',
    example: 'I go to the dentist for a check-up twice a year.', exampleVi: 'Tôi đi nha sĩ khám định kỳ hai lần một năm.',
    situations: ['I\'m not ill, but the doctor looks at my eyes, ears and heart once a year.', 'Every September, the school nurse measures all the students and checks their eyes.', 'My teeth don\'t hurt, but I see the dentist every six months just to be sure.'] },
  // Fitness
  { word: 'diet', topic: 'fitness', definition: 'the kind of food that you usually eat', vi: 'chế độ ăn', icon: '🥗',
    example: 'A healthy diet has lots of fruit and vegetables.', exampleVi: 'Chế độ ăn lành mạnh có nhiều rau quả.',
    situations: ['Lan usually eats rice, fish, vegetables and fruit, and very few sweets.', 'The doctor says Grandpa must eat less salt and more vegetables.', 'Athletes think carefully about all the food they eat every day.'] },
  { word: 'work out', topic: 'fitness', definition: 'do exercise to make your body strong', vi: 'tập thể dục', icon: '🏋️',
    example: 'My dad works out at the gym three times a week.', exampleVi: 'Bố tôi tập thể dục ở phòng gym ba lần một tuần.',
    situations: ['Every morning, my uncle lifts weights and runs on a machine at the gym.', 'Mai does push-ups and sit-ups in her room to get stronger.', 'The football team does exercises together twice a week.'] },
  { word: 'stretch', topic: 'fitness', definition: 'make your arms or legs as long as possible to warm up', vi: 'duỗi người, giãn cơ', icon: '🤸',
    example: 'Always stretch before you run.', exampleVi: 'Luôn giãn cơ trước khi chạy.',
    situations: ['Before the race, we reach up high and then touch our toes slowly.', 'Minh wakes up, puts his arms up high and makes his body long.', 'The yoga teacher tells us to pull our legs gently to make them longer.'] },
  { word: 'energy', topic: 'fitness', definition: 'the power your body needs to move and work', vi: 'năng lượng', icon: '⚡',
    example: 'Bananas give you lots of energy.', exampleVi: 'Chuối cung cấp nhiều năng lượng.',
    situations: ['After a good breakfast, Nam feels ready to run all morning.', 'I\'m so tired that I can\'t move. I need some food!', 'The little children run and jump all day and never get tired.'] },
  { word: 'muscle', topic: 'fitness', definition: 'a part inside your body that helps you move', vi: 'cơ bắp', icon: '💪',
    example: 'Swimming makes your arm muscles strong.', exampleVi: 'Bơi lội giúp cơ tay khỏe.',
    situations: ['The weightlifter\'s arms are big and very strong.', 'After the long run, the backs of my legs feel tight and tired.', 'Lifting heavy boxes makes the parts inside your arms stronger.'] },
  { word: 'sweat', topic: 'fitness', definition: 'water that comes out of your skin when you are hot', vi: 'mồ hôi; đổ mồ hôi', icon: '💦',
    example: 'It was so hot that I was covered in sweat.', exampleVi: 'Trời nóng đến mức tôi ướt đẫm mồ hôi.',
    situations: ['After the game in the sun, Minh\'s T-shirt was wet all over.', 'Water is running down my face because the gym is so hot.', 'In Ho Chi Minh City in April, your skin gets wet just from walking.'] },
];
