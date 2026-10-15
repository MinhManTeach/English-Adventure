import type { VocabWord } from '../shared';

/** A short past action (singular subject) that interrupts a longer one. wrong is a made-up past form. */
interface Interruption { subject: string; base: string; past: string; third: string; wrong: string; tail: string }

/**
 * A2 Unit 7: a longer past action with a moment it was in progress and a short action that fits it.
 * Objects avoid possessives so any subject can do the action.
 */
export const SCENES: readonly { base: string; ing: string; obj: string; moment: string; cut: Interruption }[] = [
  { base: 'cook', ing: 'cooking', obj: 'dinner', moment: 'at 7 pm yesterday', cut: { subject: 'the lights', base: 'go', past: 'went', third: 'goes', wrong: 'goed', tail: ' out' } },
  { base: 'walk', ing: 'walking', obj: 'home from school', moment: 'at 5 pm yesterday', cut: { subject: 'it', base: 'start', past: 'started', third: 'starts', wrong: 'startted', tail: ' to rain' } },
  { base: 'revise', ing: 'revising', obj: 'for the English test', moment: 'at 9 pm last night', cut: { subject: 'the phone', base: 'ring', past: 'rang', third: 'rings', wrong: 'ringed', tail: '' } },
  { base: 'cycle', ing: 'cycling', obj: 'along the river', moment: 'at 6 am last Sunday', cut: { subject: 'a dog', base: 'run', past: 'ran', third: 'runs', wrong: 'runned', tail: ' into the road' } },
  { base: 'make', ing: 'making', obj: 'bánh chưng with Grandma', moment: 'at this time last week', cut: { subject: 'a neighbour', base: 'knock', past: 'knocked', third: 'knocks', wrong: 'knockked', tail: ' on the door' } },
  { base: 'decorate', ing: 'decorating', obj: 'the house for Tết', moment: 'at 10 am yesterday', cut: { subject: 'the ladder', base: 'fall', past: 'fell', third: 'falls', wrong: 'falled', tail: ' over' } },
  { base: 'wait', ing: 'waiting', obj: 'at the bus stop', moment: 'at 7 am yesterday', cut: { subject: 'a motorbike', base: 'splash', past: 'splashed', third: 'splashes', wrong: 'splasht', tail: ' water everywhere' } },
  { base: 'swim', ing: 'swimming', obj: 'in the sea at Nha Trang', moment: 'at 4 pm last Saturday', cut: { subject: 'a jellyfish', base: 'sting', past: 'stung', third: 'stings', wrong: 'stinged', tail: ' someone nearby' } },
  { base: 'play', ing: 'playing', obj: 'badminton in the yard', moment: 'at 5 pm last Friday', cut: { subject: 'the shuttlecock', base: 'land', past: 'landed', third: 'lands', wrong: 'landded', tail: ' on the roof' } },
  { base: 'watch', ing: 'watching', obj: 'a football match on TV', moment: 'at 8 pm last night', cut: { subject: 'the TV', base: 'break', past: 'broke', third: 'breaks', wrong: 'breaked', tail: ' down' } },
  { base: 'take', ing: 'taking', obj: 'photos in Hoi An', moment: 'at noon yesterday', cut: { subject: 'a tourist', base: 'ask', past: 'asked', third: 'asks', wrong: 'askt', tail: ' for directions' } },
  { base: 'do', ing: 'doing', obj: 'a Maths exercise', moment: 'at 9 am yesterday', cut: { subject: 'the teacher', base: 'come', past: 'came', third: 'comes', wrong: 'comed', tail: ' in' } },
  { base: 'chat', ing: 'chatting', obj: 'online with friends', moment: 'at 9 pm yesterday', cut: { subject: 'the Wi-Fi', base: 'stop', past: 'stopped', third: 'stops', wrong: 'stoped', tail: ' working' } },
  { base: 'sleep', ing: 'sleeping', obj: 'on the sofa', moment: 'at 2 pm yesterday', cut: { subject: 'a loud noise', base: 'wake', past: 'woke', third: 'wakes', wrong: 'woked', tail: ' everyone up' } },
  { base: 'have', ing: 'having', obj: 'a picnic in the park', moment: 'at 11 am last Sunday', cut: { subject: 'a storm', base: 'begin', past: 'began', third: 'begins', wrong: 'beginned', tail: '' } },
  { base: 'sit', ing: 'sitting', obj: 'in a café', moment: 'at 3 pm last Saturday', cut: { subject: 'a famous singer', base: 'walk', past: 'walked', third: 'walks', wrong: 'walkt', tail: ' in' } },
];

/** A2 Unit 7: -ing spelling inside the past continuous. wrong holds two misspellings. */
export const SPELLING: readonly { base: string; ing: string; wrong: readonly [string, string]; obj: string; moment: string }[] = [
  { base: 'lie', ing: 'lying', wrong: ['lieing', 'lyeing'], obj: 'on the beach in Vung Tau', moment: 'at noon yesterday' },
  { base: 'sit', ing: 'sitting', wrong: ['siting', 'seating'], obj: 'under a mango tree', moment: 'at 3 pm yesterday' },
  { base: 'swim', ing: 'swimming', wrong: ['swiming', 'swimeing'], obj: 'in the pool', moment: 'at 4 pm last Sunday' },
  { base: 'run', ing: 'running', wrong: ['runing', 'runeing'], obj: 'around the lake', moment: 'at 6 am yesterday' },
  { base: 'write', ing: 'writing', wrong: ['writeing', 'writting'], obj: 'a postcard to Grandma', moment: 'at 8 pm last night' },
  { base: 'make', ing: 'making', wrong: ['makeing', 'makking'], obj: 'a paper lantern', moment: 'at this time yesterday' },
  { base: 'dance', ing: 'dancing', wrong: ['danceing', 'dansing'], obj: "at Mai's party", moment: 'at 9 pm last Saturday' },
  { base: 'shop', ing: 'shopping', wrong: ['shoping', 'shopeing'], obj: 'at Ben Thanh Market', moment: 'at 10 am yesterday' },
  { base: 'jog', ing: 'jogging', wrong: ['joging', 'jogeing'], obj: 'in the park', moment: 'at 5:30 am yesterday' },
  { base: 'ride', ing: 'riding', wrong: ['rideing', 'ridding'], obj: 'a horse in Da Lat', moment: 'at 2 pm last Monday' },
  { base: 'study', ing: 'studying', wrong: ['studing', 'studiing'], obj: 'in the library', moment: 'at 4 pm yesterday' },
  { base: 'skate', ing: 'skating', wrong: ['skateing', 'skatting'], obj: 'at the ice rink', moment: 'at 7 pm last Friday' },
  { base: 'chat', ing: 'chatting', wrong: ['chating', 'chateing'], obj: 'with a new classmate', moment: 'at break time yesterday' },
  { base: 'get', ing: 'getting', wrong: ['geting', 'getteing'], obj: 'ready for school', moment: 'at 6:30 am yesterday' },
];

/** A2 Unit 7: while + clause or during + noun. main is a Past Simple phrase that fits any subject. */
export const WHILE_DURING: readonly { main: string; noun: string; ing: string }[] = [
  { main: 'fell asleep', noun: 'the film', ing: 'watching the film' },
  { main: 'took lots of photos', noun: 'the trip to Ha Long Bay', ing: 'sailing around Ha Long Bay' },
  { main: 'lost a shoe', noun: 'the race', ing: 'running the race' },
  { main: 'felt sick', noun: 'the boat trip', ing: 'sailing to the island' },
  { main: 'met an old friend', noun: 'the Mid-Autumn Festival', ing: 'walking around the festival' },
  { main: 'laughed a lot', noun: 'the comedy show', ing: 'watching the comedy show' },
  { main: 'heard a strange noise', noun: 'the night', ing: 'camping in the forest' },
  { main: 'broke a glass', noun: 'the washing-up', ing: 'washing up after dinner' },
  { main: 'learnt a lot', noun: 'the school trip to the museum', ing: 'visiting the museum' },
  { main: 'got very wet', noun: 'the storm', ing: 'walking home in the storm' },
  { main: 'ate too much', noun: 'the Tết holiday', ing: "staying at Grandma's house" },
  { main: 'made a silly mistake', noun: 'the exam', ing: 'doing the exam' },
];

/** A2 Unit 8: verbs followed by to + base verb. Each verb is one that cannot take -ing. */
export const VERB_TO: readonly { verb: string; base: string; ing: string; obj: string }[] = [
  { verb: 'decided', base: 'join', ing: 'joining', obj: 'the school chess club' },
  { verb: 'promised', base: 'help', ing: 'helping', obj: 'Mum with the shopping' },
  { verb: 'refused', base: 'eat', ing: 'eating', obj: 'the cold soup' },
  { verb: 'agreed', base: 'lend', ing: 'lending', obj: 'Nam a pen' },
  { verb: 'managed', base: 'finish', ing: 'finishing', obj: 'the project on time' },
  { verb: 'offered', base: 'carry', ing: 'carrying', obj: 'the heavy bags' },
  { verb: 'hoped', base: 'win', ing: 'winning', obj: 'the singing contest' },
  { verb: 'planned', base: 'visit', ing: 'visiting', obj: 'Hue in the summer' },
  { verb: 'chose', base: 'study', ing: 'studying', obj: 'Japanese' },
  { verb: 'pretended', base: 'be', ing: 'being', obj: 'asleep' },
  { verb: "couldn't afford", base: 'buy', ing: 'buying', obj: 'the new phone' },
  { verb: 'seemed', base: 'be', ing: 'being', obj: 'very tired' },
];

/** A2 Unit 8: verbs followed by -ing. Each verb is one that cannot take to + base verb. */
export const VERB_ING: readonly { verb: string; base: string; ing: string; obj: string }[] = [
  { verb: 'avoided', base: 'eat', ing: 'eating', obj: 'fast food before the race' },
  { verb: 'finished', base: 'paint', ing: 'painting', obj: 'the poster' },
  { verb: 'practised', base: 'speak', ing: 'speaking', obj: 'English with a tourist' },
  { verb: 'kept', base: 'ask', ing: 'asking', obj: 'the same question' },
  { verb: 'suggested', base: 'go', ing: 'going', obj: 'to the night market' },
  { verb: 'imagined', base: 'live', ing: 'living', obj: 'on the moon' },
  { verb: 'gave up', base: 'eat', ing: 'eating', obj: 'sweets' },
  { verb: "couldn't stand", base: 'wait', ing: 'waiting', obj: 'in long queues' },
  { verb: 'missed', base: 'play', ing: 'playing', obj: 'with friends in the village' },
  { verb: 'felt like', base: 'have', ing: 'having', obj: 'an ice cream' },
  { verb: 'spent the afternoon', base: 'make', ing: 'making', obj: 'a kite' },
  { verb: 'kept on', base: 'practise', ing: 'practising', obj: 'the same song' },
];

/** A2 Unit 8: a preposition (after an adjective or a verb phrase) followed by -ing. be: the head needs was/were. */
export const PREP_ING: readonly { head: string; be: boolean; base: string; ing: string; obj: string }[] = [
  { head: 'afraid of', be: true, base: 'swim', ing: 'swimming', obj: 'in deep water' },
  { head: 'interested in', be: true, base: 'learn', ing: 'learning', obj: 'about robots' },
  { head: 'tired of', be: true, base: 'wait', ing: 'waiting', obj: 'for the bus' },
  { head: 'excited about', be: true, base: 'go', ing: 'going', obj: 'to Phu Quoc' },
  { head: 'worried about', be: true, base: 'fail', ing: 'failing', obj: 'the test' },
  { head: 'good at', be: true, base: 'solve', ing: 'solving', obj: 'Maths problems' },
  { head: 'washed the dishes before', be: false, base: 'watch', ing: 'watching', obj: 'TV' },
  { head: 'left without', be: false, base: 'say', ing: 'saying', obj: 'goodbye' },
  { head: 'had a shower after', be: false, base: 'play', ing: 'playing', obj: 'football' },
  { head: 'drank water instead of', be: false, base: 'buy', ing: 'buying', obj: 'a fizzy drink' },
  { head: 'thanked the teacher for', be: false, base: 'explain', ing: 'explaining', obj: 'the lesson again' },
  { head: 'learnt new words by', be: false, base: 'watch', ing: 'watching', obj: 'cartoons in English' },
];

/** A2 Unit 8: verb + object + to + base verb. The object comes from the subject pool. */
export const OBJECT_TO: readonly { teller: string; verb: string; base: string; ing: string; obj: string }[] = [
  { teller: 'The teacher', verb: 'told', base: 'be', ing: 'being', obj: 'quiet in the library' },
  { teller: 'Mum', verb: 'asked', base: 'buy', ing: 'buying', obj: 'some eggs' },
  { teller: 'Dad', verb: 'wanted', base: 'help', ing: 'helping', obj: 'in the garden' },
  { teller: 'The coach', verb: 'reminded', base: 'drink', ing: 'drinking', obj: 'plenty of water' },
  { teller: 'Grandma', verb: 'taught', base: 'make', ing: 'making', obj: 'spring rolls' },
  { teller: 'The parents', verb: 'allowed', base: 'stay', ing: 'staying', obj: "up late on New Year's Eve" },
  { teller: 'Mai', verb: 'invited', base: 'come', ing: 'coming', obj: 'to her birthday party' },
  { teller: 'The doctor', verb: 'advised', base: 'rest', ing: 'resting', obj: 'for a few days' },
  { teller: 'The head teacher', verb: 'encouraged', base: 'enter', ing: 'entering', obj: 'the science competition' },
  { teller: 'The guide', verb: 'warned', base: 'stay', ing: 'staying', obj: 'away from the edge' },
  { teller: 'The bus driver', verb: 'told', base: 'sit', ing: 'sitting', obj: 'down' },
  { teller: 'Our neighbour', verb: 'asked', base: 'feed', ing: 'feeding', obj: 'the cat at the weekend' },
];
/** Object forms of the shared subject pool. */
export const OBJECT_FORM: Record<string, string> = {
  I: 'me', you: 'you', we: 'us', 'the children': 'the children', 'your sister': 'your sister', 'your brother': 'your brother',
  Lan: 'Lan', Minh: 'Minh', he: 'him', she: 'her', they: 'them',
};

/** A2 Unit 8: -ing form as the subject. Every verb has a past form different from its base. */
export const ING_SUBJECT: readonly { ing: string; base: string; third: string; past: string; rest: string }[] = [
  { ing: 'Eating', base: 'Eat', third: 'Eats', past: 'Ate', rest: 'vegetables every day keeps you healthy.' },
  { ing: 'Learning', base: 'Learn', third: 'Learns', past: 'Learnt', rest: 'a new language takes time.' },
  { ing: 'Riding', base: 'Ride', third: 'Rides', past: 'Rode', rest: 'a bike to school is good exercise.' },
  { ing: 'Swimming', base: 'Swim', third: 'Swims', past: 'Swam', rest: 'in the sea is dangerous when the waves are big.' },
  { ing: 'Making', base: 'Make', third: 'Makes', past: 'Made', rest: 'new friends is easy for Lan.' },
  { ing: 'Drinking', base: 'Drink', third: 'Drinks', past: 'Drank', rest: 'enough water is important in hot weather.' },
  { ing: 'Getting', base: 'Get', third: 'Gets', past: 'Got', rest: 'up early is hard in winter.' },
  { ing: 'Speaking', base: 'Speak', third: 'Speaks', past: 'Spoke', rest: 'English with tourists helps me a lot.' },
  { ing: 'Writing', base: 'Write', third: 'Writes', past: 'Wrote', rest: 'a diary helps you remember things.' },
  { ing: 'Taking', base: 'Take', third: 'Takes', past: 'Took', rest: 'photos of food is popular online.' },
  { ing: 'Growing', base: 'Grow', third: 'Grows', past: 'Grew', rest: 'vegetables at home saves money.' },
  { ing: 'Sleeping', base: 'Sleep', third: 'Sleeps', past: 'Slept', rest: 'eight hours a night is good for teenagers.' },
  { ing: 'Flying', base: 'Fly', third: 'Flies', past: 'Flew', rest: 'a kite on the beach is great fun.' },
];

/** A2 Unit 8: adjective (or too / enough) + to + base verb. [sentence with ___, base verb, -ing form] */
export const ADJ_TO: readonly (readonly [string, string, string])[] = [
  ["It's important ___ enough water.", 'drink', 'drinking'],
  ["It's dangerous ___ near the river alone.", 'play', 'playing'],
  ["It isn't easy ___ a new language.", 'learn', 'learning'],
  ["It's polite ___ thank you.", 'say', 'saying'],
  ['We were happy ___ our old teacher again.', 'see', 'seeing'],
  ['I was surprised ___ Lan at the airport.', 'meet', 'meeting'],
  ['Mai is ready ___ her presentation.', 'give', 'giving'],
  ["It's too cold ___ in the sea today.", 'swim', 'swimming'],
  ["Minh isn't old enough ___ a motorbike.", 'ride', 'riding'],
  ['This box is too heavy ___ up the stairs.', 'carry', 'carrying'],
  ['Nam was sad ___ goodbye to his friends.', 'say', 'saying'],
  ["It's necessary ___ a ticket before you get on the train.", 'buy', 'buying'],
  ['The question was too difficult ___ in one minute.', 'answer', 'answering'],
];

/** A2 Unit 9: sport. */
export const SPORT_WORDS: readonly VocabWord[] = [
  // People in sport
  { word: 'captain', topic: 'sport-people', definition: 'the leader of a team', vi: 'đội trưởng', icon: '©️',
    example: 'Minh is the captain of our football team.', exampleVi: 'Minh là đội trưởng đội bóng của chúng tôi.',
    situations: ['She wears a special armband and leads the other players onto the pitch.', 'Before the match, he talks to his teammates and chooses who takes the penalty.', 'The players voted for Lan to lead the volleyball team this year.'] },
  { word: 'coach', topic: 'sport-people', definition: 'a person who trains a player or a team', vi: 'huấn luyện viên', icon: '📋',
    example: 'Our coach makes us run ten laps before training.', exampleVi: 'Huấn luyện viên bắt chúng tôi chạy mười vòng trước buổi tập.',
    situations: ['He stands next to the pitch and shouts advice to his players.', 'Every afternoon she shows the young swimmers how to move their arms better.', 'After the match, this person explains what the team did wrong.'] },
  { word: 'referee', topic: 'sport-people', definition: 'the person who makes sure players follow the rules in a match', vi: 'trọng tài', icon: '🟨',
    example: 'The referee showed the player a yellow card.', exampleVi: 'Trọng tài rút thẻ vàng cho cầu thủ đó.',
    situations: ['He blows the whistle when a player breaks the rules.', 'She decided it was a penalty, and the fans of the other team were angry.', 'This person in black stops the match when someone is hurt.'] },
  { word: 'fan', topic: 'sport-people', definition: 'a person who loves and supports a team or a player', vi: 'người hâm mộ', icon: '📣',
    example: 'Thousands of fans came to watch the final.', exampleVi: 'Hàng nghìn người hâm mộ đến xem trận chung kết.',
    situations: ['Nam paints his face red and yellow and sings for his favourite team.', 'She has posters of her favourite badminton player all over her bedroom wall.', 'Thousands of people in the same shirts waited outside the stadium to see the players.'] },
  { word: 'opponent', topic: 'sport-people', definition: 'the person or team you play against', vi: 'đối thủ', icon: '🤺',
    example: 'Her opponent in the final was very fast.', exampleVi: 'Đối thủ của cô ấy trong trận chung kết rất nhanh.',
    situations: ['In the chess final, Mai shook hands with the boy she had to play against.', 'Our team from Hue played against a strong team from Can Tho.', 'He watched videos of the other player to learn how she plays.'] },
  { word: 'champion', topic: 'sport-people', definition: 'a person or team that has won a competition', vi: 'nhà vô địch', icon: '🏆',
    example: 'Lan is the school table tennis champion.', exampleVi: 'Lan là nhà vô địch bóng bàn của trường.',
    situations: ['She won every match in the tournament and lifted the cup.', 'Our team finished first in the whole city this year.', 'He has won the national swimming competition three times.'] },
  // Places for sport
  { word: 'court', topic: 'sport-places', definition: 'a flat area with lines where you play tennis, badminton or basketball', vi: 'sân (quần vợt, cầu lông, bóng rổ)', icon: '🎾',
    example: 'The badminton court is next to the gym.', exampleVi: 'Sân cầu lông ở cạnh phòng tập.',
    situations: ['There is a net across the middle, and we hit the shuttlecock over it.', 'The basketball players run from one end to the other and throw the ball into the basket.', 'They play tennis on this area with white lines.'] },
  { word: 'pitch', topic: 'sport-places', definition: 'a large area of grass where you play football', vi: 'sân cỏ (bóng đá)', icon: '⚽',
    example: 'The players walked onto the pitch.', exampleVi: 'Các cầu thủ bước ra sân.',
    situations: ['Twenty-two players run on this big area of green grass.', 'The rain made the grass very muddy, so the football match stopped.', 'There is a goal at each end of it.'] },
  { word: 'track', topic: 'sport-places', definition: 'a path, often in a circle, for running races', vi: 'đường chạy', icon: '🏃',
    example: 'We ran four laps of the track.', exampleVi: 'Chúng tôi chạy bốn vòng đường chạy.',
    situations: ['The runners stand in lanes on this red oval and wait for the start.', 'One lap of it at our school is 400 metres.', 'The athletes ran round and round it in the 5,000-metre race.'] },
  { word: 'swimming pool', topic: 'sport-places', definition: 'a large hole filled with water for swimming', vi: 'bể bơi', icon: '🏊',
    example: 'The swimming pool opens at 6 am.', exampleVi: 'Bể bơi mở cửa lúc 6 giờ sáng.',
    situations: ['You need goggles and a swimming cap to go in the water here.', 'The water is 2 metres deep at one end and very shallow at the other.', 'Swimmers dive in and race from one end to the other.'] },
  { word: 'ice rink', topic: 'sport-places', definition: 'a large flat area of ice where you go skating', vi: 'sân trượt băng', icon: '⛸️',
    example: 'There is an ice rink in the shopping centre.', exampleVi: 'Có một sân trượt băng trong trung tâm thương mại.',
    situations: ['It is very cold inside, and people skate round and round.', 'Lan fell over three times because the floor was so slippery.', 'Ice hockey players play their matches here.'] },
  { word: 'golf course', topic: 'sport-places', definition: 'a very large area of grass where people play golf', vi: 'sân gôn', icon: '⛳',
    example: 'My uncle plays on a golf course near Da Lat.', exampleVi: 'Chú tôi chơi trên một sân gôn gần Đà Lạt.',
    situations: ['Players walk for hours and hit a small white ball into eighteen holes.', 'There are little flags in the holes on this huge area of grass.', 'Dad carries his clubs from hole to hole here.'] },
  // Equipment
  { word: 'racket', topic: 'sport-equipment', definition: 'a thing with strings and a handle for hitting a ball or shuttlecock', vi: 'cái vợt', icon: '🏸',
    example: 'I need a new badminton racket.', exampleVi: 'Tôi cần một cây vợt cầu lông mới.',
    situations: ['Mai hits the shuttlecock with it, and one of its strings has broken.', 'You hold its handle when you play tennis.', 'In table tennis this thing is small and made of wood.'] },
  { word: 'bat', topic: 'sport-equipment', definition: 'a piece of wood for hitting the ball in baseball or cricket', vi: 'gậy (bóng chày, cricket)', icon: '🏏',
    example: 'He hit the ball with the bat and ran.', exampleVi: 'Anh ấy đánh bóng bằng gậy rồi chạy.',
    situations: ['In baseball, you swing this long piece of wood and hit the ball very far.', 'Cricket players hold this flat piece of wood.', 'The ball flew over the fence after he swung this hard.'] },
  { word: 'helmet', topic: 'sport-equipment', definition: 'a hard hat that keeps your head safe', vi: 'mũ bảo hiểm', icon: '⛑️',
    example: 'Always wear a helmet when you ride a bike.', exampleVi: 'Luôn đội mũ bảo hiểm khi đi xe đạp.',
    situations: ['Minh fell off his bike, but his head was OK because he was wearing this.', 'Cyclists and skateboarders wear it on their heads.', 'Nobody is allowed on a motorbike in Vietnam without one.'] },
  { word: 'goggles', topic: 'sport-equipment', definition: 'special glasses that protect your eyes in water or snow', vi: 'kính bơi, kính bảo hộ', icon: '🥽',
    example: "I can't see under the water without my goggles.", exampleVi: 'Tôi không nhìn được dưới nước nếu không có kính bơi.',
    situations: ['The water in the pool hurts my eyes, so I wear these.', 'Skiers wear these over their eyes because the snow is very bright.', 'She put these over her eyes and dived into the pool.'] },
  { word: 'net', topic: 'sport-equipment', definition: 'a long piece of material with holes, across a court or in a goal', vi: 'lưới', icon: '🥅',
    example: 'The ball hit the net and fell on our side.', exampleVi: 'Quả bóng chạm lưới rồi rơi xuống phần sân của chúng tôi.',
    situations: ['In volleyball you must hit the ball over this.', 'The football went past the goalkeeper and into this at the back of the goal.', 'The shuttlecock was too low and didn\'t go over it.'] },
  { word: 'trainers', topic: 'sport-equipment', definition: 'soft shoes that you wear for sport', vi: 'giày thể thao', icon: '👟',
    example: 'Put on your trainers for PE.', exampleVi: 'Hãy đi giày thể thao cho giờ thể dục.',
    situations: ['You can\'t run on the track in school shoes. Wear these.', 'Nam bought a new pair of these for jogging.', 'My running shoes are old and they have holes in them.'] },
  // Competing
  { word: 'score', topic: 'competing', definition: 'get a point or a goal in a game', vi: 'ghi bàn, ghi điểm', icon: '🎯',
    example: 'Minh scored two goals in the second half.', exampleVi: 'Minh ghi hai bàn trong hiệp hai.',
    situations: ['Lan kicked the ball past the goalkeeper and into the net.', 'He threw the ball into the basket and got two more points for his team.', 'Our team got three goals in the match.'] },
  { word: 'beat', topic: 'competing', definition: 'win against another person or team', vi: 'đánh bại, thắng', icon: '🥊',
    example: 'Our class beat Class 8B 3–1.', exampleVi: 'Lớp chúng tôi thắng lớp 8B với tỉ số 3–1.',
    situations: ['We played against the strongest team in the city, and we won!', 'Mai played chess against her dad and won for the first time.', 'Vietnam won against Thailand in the final.'] },
  { word: 'draw', topic: 'competing', definition: 'finish a game with the same score as the other team', vi: 'hòa', icon: '🤝',
    example: 'The two teams drew 2–2.', exampleVi: 'Hai đội hòa nhau 2–2.',
    situations: ['The match ended 1–1, so nobody won.', 'After ninety minutes, both teams had the same score: 0–0.', 'Neither player won the chess game. It was equal at the end.'] },
  { word: 'cheer', topic: 'competing', definition: 'shout loudly to support a team or player', vi: 'cổ vũ', icon: '🙌',
    example: 'We cheered when our team scored.', exampleVi: 'Chúng tôi reo hò cổ vũ khi đội nhà ghi bàn.',
    situations: ['The fans shouted "Go, Vietnam, go!" for the whole match.', 'All the students clapped and shouted loudly when Lan crossed the finish line.', 'We waved flags and shouted to support our school team.'] },
  { word: 'medal', topic: 'competing', definition: 'a round piece of metal that you get for winning or doing well', vi: 'huy chương', icon: '🏅',
    example: 'She won a gold medal in the 100 metres.', exampleVi: 'Cô ấy giành huy chương vàng nội dung 100 mét.',
    situations: ['The three fastest runners got gold, silver and bronze ones to wear around their necks.', 'He finished second and got a silver one.', 'The swimmer wore it round her neck and smiled for the photo.'] },
  { word: 'tournament', topic: 'competing', definition: 'a competition with many matches between teams or players', vi: 'giải đấu', icon: '🗓️',
    example: 'Sixteen schools are taking part in the football tournament.', exampleVi: 'Mười sáu trường tham gia giải bóng đá.',
    situations: ['Thirty-two players played many matches over five days, and the last two met in the final.', 'Our school organises a badminton competition with many rounds every spring.', 'Teams from all over Asia played match after match to win the cup.'] },
];
