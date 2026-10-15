import type { VocabWord } from '../shared';

/**
 * A gap item: [sentence with ___ (and an optional verb hint in brackets at the end), answer, three wrong choices,
 * optional extra wrong sentence shown first in repair tasks].
 */
export type GapPoolItem = readonly [gap: string, answer: string, wrong: readonly [string, string, string], extraError?: string];

/** Unit 79: defining relative clauses with who / which / that (never offering a second correct pronoun). */
export const WHO_WHICH_THAT: readonly GapPoolItem[] = [
  ['A vet is a doctor ___ looks after sick animals.', 'who', ['which', 'where', 'whose']],
  ['Is this the bus ___ goes to Hoi An?', 'that', ['what', 'where', 'who']],
  ['The cake ___ Mum made for Tết was delicious.', 'which', ['who', 'what', 'where'], 'The cake which Mum made it for Tết was delicious.'],
  ['The girl ___ sits next to me is from Hue.', 'who', ['which', 'what', 'whose']],
  ['I can\'t find the book ___ Lan lent me.', 'that', ['what', 'who', 'where'], 'I can\'t find the book that Lan lent me it.'],
  ['The students ___ won the science competition were in Grade 8.', 'who', ['which', 'what', 'where']],
  ['We stayed in a hotel ___ had a swimming pool on the roof.', 'which', ['who', 'where', 'what']],
  ['The man ___ we met at the market was very friendly.', 'who', ['which', 'what', 'where'], 'The man who we met him at the market was very friendly.'],
  ['Pho is a dish ___ many tourists love.', 'that', ['who', 'what', 'where'], 'Pho is a dish that many tourists love it.'],
  ['Do you know the boy ___ is talking to Minh?', 'who', ['which', 'what', 'whose']],
  ['The phone ___ Dad bought for me has a great camera.', 'which', ['who', 'what', 'whose'], 'The phone which Dad bought it for me has a great camera.'],
  ['The people ___ live next door have three cats.', 'who', ['which', 'what', 'where']],
  ['This is the song ___ always makes me happy.', 'that', ['what', 'who', 'where']],
  ['A dictionary is a book ___ tells you what words mean.', 'which', ['who', 'where', 'whose']],
  ['The teacher ___ we like best is Ms Hoa.', 'who', ['which', 'what', 'whose'], 'The teacher who we like her best is Ms Hoa.'],
  ['Everything ___ she said was true.', 'that', ['what', 'who', 'where'], 'Everything that she said it was true.'],
];

/** Unit 79: whose (possession), where (place) and when (time). */
export const WHOSE_WHERE_WHEN: readonly GapPoolItem[] = [
  ['That\'s the boy ___ dog bit the postman.', 'whose', ['who', 'who\'s', 'which']],
  ['Sa Pa is a town ___ you can see rice terraces everywhere.', 'where', ['which', 'when', 'whose']],
  ['Tết is the time ___ families get together.', 'when', ['where', 'whose', 'what']],
  ['I have a friend ___ mother is a famous chef.', 'whose', ['who', 'who\'s', 'what']],
  ['This is the hospital ___ I was born.', 'where', ['which', 'when', 'who']],
  ['Do you remember the day ___ we first met?', 'when', ['where', 'whose', 'what']],
  ['The library is a place ___ you can read books for free.', 'where', ['which', 'when', 'whose']],
  ['We visited a village ___ people make conical hats.', 'where', ['which', 'who', 'when']],
  ['Mr Tuan is the neighbour ___ car is always parked outside our gate.', 'whose', ['who', 'which', 'who\'s']],
  ['Summer is the season ___ we go to the beach.', 'when', ['where', 'which', 'whose']],
  ['The girl ___ bike was stolen called the police.', 'whose', ['who', 'which', 'who\'s']],
  ['Da Nang is the city ___ my cousins live.', 'where', ['which', 'when', 'whose']],
  ['2020 was the year ___ we moved to Hanoi.', 'when', ['where', 'which', 'whose']],
  ['I met a writer ___ books are popular with teenagers.', 'whose', ['who', 'which', 'who\'s']],
  ['The kitchen is the room ___ we have breakfast.', 'where', ['which', 'when', 'whose']],
  ['Saturday is the day ___ I can sleep late.', 'when', ['where', 'which', 'whose']],
];

/** Unit 79: non-defining relative clauses with commas; that is never possible here. */
export const NON_DEFINING: readonly GapPoolItem[] = [
  ['My grandmother, ___ lives in Hue, is 80 years old.', 'who', ['that', 'which', 'whose']],
  ['Ha Long Bay, ___ is in the north of Viet Nam, is famous for its islands.', 'which', ['that', 'who', 'where']],
  ['Mr Nam, ___ son is in my class, is a doctor.', 'whose', ['that', 'who', 'which']],
  ['Phu Quoc, ___ we spent our summer holiday, has beautiful beaches.', 'where', ['that', 'which', 'who']],
  ['Our English teacher, ___ comes from Australia, plays the guitar.', 'who', ['that', 'which', 'whose']],
  ['The Mekong, ___ flows through six countries, is a very long river.', 'which', ['that', 'who', 'where']],
  ['Minh, ___ birthday is in May, is having a party.', 'whose', ['that', 'who', 'which']],
  ['Hanoi, ___ my parents grew up, is the capital of Viet Nam.', 'where', ['that', 'which', 'who']],
  ['My phone, ___ I bought last year, is already slow.', 'which', ['that', 'who', 'what']],
  ['Lan\'s brother, ___ is a nurse, often works at night.', 'who', ['that', 'which', 'whose']],
  ['Hoan Kiem Lake, ___ is in the centre of Hanoi, has a famous red bridge.', 'which', ['that', 'where', 'who']],
  ['Ms Mai, ___ students all love her lessons, teaches History.', 'whose', ['that', 'who', 'which']],
];

/** Unit 80: had + past participle, mostly irregular verbs. */
export const HAD_DONE: readonly GapPoolItem[] = [
  ['When we arrived at the cinema, the film ___. (begin)', 'had begun', ['has begun', 'had began', 'had begin']],
  ['Nam couldn\'t pay because he ___ his wallet at home. (leave)', 'had left', ['has left', 'had leave', 'had leaved']],
  ['By the time Mum got home, we ___ all the cake. (eat)', 'had eaten', ['have eaten', 'had ate', 'had eat']],
  ['Lan was sad because her best friend ___ to another city. (move)', 'had moved', ['has moved', 'had move', 'had moving']],
  ['When I woke up, my parents ___ to work. (go)', 'had gone', ['have gone', 'had went', 'had go']],
  ['The streets were wet because it ___ all night. (rain)', 'had rained', ['has rained', 'had rain', 'had raining']],
  ['I recognised the film because I ___ it before. (see)', 'had seen', ['have seen', 'had saw', 'had see']],
  ['Mai was tired because she ___ ten kilometres. (run)', 'had run', ['has run', 'had ran', 'had running']],
  ['When Minh opened the box, he saw that someone ___ his chocolates. (take)', 'had taken', ['has taken', 'had took', 'had take']],
  ['Grandpa was happy because we ___ him a long letter. (write)', 'had written', ['have written', 'had wrote', 'had write']],
  ['The vase was on the floor in pieces. The cat ___ it. (break)', 'had broken', ['has broken', 'had broke', 'had break']],
  ['I didn\'t need a map because I ___ there many times before. (be)', 'had been', ['have been', 'had was', 'had be']],
  ['When we reached the top of the mountain, the sun ___. (rise)', 'had risen', ['has risen', 'had rose', 'had rise']],
  ['Nobody answered the phone because everyone ___ asleep. (fall)', 'had fallen', ['has fallen', 'had fell', 'had fall']],
  ['Linh felt better because she ___ a lot of water. (drink)', 'had drunk', ['has drunk', 'had drank', 'had drink']],
  ['The kids were excited because their uncle ___ them a puppy. (give)', 'had given', ['has given', 'had gave', 'had give']],
];

/** Unit 80: hadn't + past participle and had never ... before. */
export const HAD_NOT: readonly GapPoolItem[] = [
  ['Minh was nervous. He ___ on a plane before. (never / fly)', 'had never flown', ['has never flown', 'had never flew', 'had never fly']],
  ['I ___ my homework, so the teacher was angry. (not finish)', 'hadn\'t finished', ['haven\'t finished', 'hadn\'t finish', 'didn\'t finished']],
  ['Lan ___ snow before her trip to Sa Pa. (never / see)', 'had never seen', ['has never seen', 'had never saw', 'had never see']],
  ['We were hungry because we ___ breakfast. (not have)', 'hadn\'t had', ['haven\'t had', 'hadn\'t have', 'didn\'t had']],
  ['The test was hard because I ___ enough. (not study)', 'hadn\'t studied', ['haven\'t studied', 'hadn\'t study', 'didn\'t studied']],
  ['Nam ___ durian before, so he tried a small piece. (never / eat)', 'had never eaten', ['has never eaten', 'had never ate', 'had never eat']],
  ['Mai was surprised because she ___ about the party. (not hear)', 'hadn\'t heard', ['haven\'t heard', 'hadn\'t hear', 'didn\'t heard']],
  ['When I got to school, I realised I ___ my lunch box. (not bring)', 'hadn\'t brought', ['haven\'t brought', 'hadn\'t bringed', 'didn\'t brought']],
  ['Dad got lost because he ___ to Can Tho before. (never / drive)', 'had never driven', ['has never driven', 'had never drove', 'had never drive']],
  ['The plants were dry because we ___ them for a week. (not water)', 'hadn\'t watered', ['haven\'t watered', 'hadn\'t water', 'didn\'t watered']],
  ['Hoa felt nervous. She ___ a speech in English before. (never / give)', 'had never given', ['has never given', 'had never gave', 'had never give']],
  ['The shop ___ yet, so we waited outside. (not open)', 'hadn\'t opened', ['haven\'t opened', 'hadn\'t open', 'didn\'t opened']],
];

/** Unit 80: questions in the past perfect. */
export const HAD_QUESTIONS: readonly GapPoolItem[] = [
  ['___ you ever been to Hue before you moved there?', 'Had', ['Have', 'Did', 'Do']],
  ['___ Lan finished her homework when her friends called?', 'Had', ['Has', 'Did', 'Was']],
  ['Had the film ___ when you arrived? (start)', 'started', ['start', 'starts', 'starting']],
  ['When I called Mai, ___ she already left school?', 'had', ['has', 'did', 'was']],
  ['Had they ___ dinner before the guests arrived? (eat)', 'eaten', ['ate', 'eat', 'eating']],
  ['___ your brother learned to swim before he joined the club?', 'Had', ['Has', 'Did', 'Was']],
  ['Had you ___ Mr Long before the meeting? (meet)', 'met', ['meet', 'meeting', 'meets']],
  ['Had you ___ about the test before Lan told you? (hear)', 'heard', ['hear', 'hearing', 'hears']],
  ['___ the rain stopped by the time you left?', 'Had', ['Has', 'Did', 'Was']],
  ['How long ___ they known each other before they became a team?', 'had', ['have', 'did', 'were']],
  ['Had Nam ever ___ a horse before his trip to Mongolia? (ride)', 'ridden', ['rode', 'ride', 'riding']],
  ['___ your parents visited Phu Quoc before last summer?', 'Had', ['Have', 'Did', 'Were']],
];

/** Unit 80: past simple and past perfect together in one story. */
export const PAST_SEQUENCE: readonly GapPoolItem[] = [
  ['When I ___ home, my brother had already eaten dinner. (get)', 'got', ['have got', 'get', 'gets']],
  ['The film had already started when we ___ the cinema. (reach)', 'reached', ['have reached', 'reach', 'reaches']],
  ['Lan ___ the dress because she had seen it online. (recognise)', 'recognised', ['has recognised', 'recognises', 'recognise']],
  ['After Nam had finished his homework, he ___ football. (play)', 'played', ['has played', 'plays', 'play']],
  ['We ___ late because we had missed the bus. (be)', 'were', ['have been', 'are', 'was']],
  ['Mai ___ the answer because she had read the book. (know)', 'knew', ['has known', 'knows', 'knowed']],
  ['The teacher was angry because nobody ___ the homework. (do)', 'had done', ['has done', 'had did', 'do']],
  ['When Dad got to the shop, it ___. (close)', 'had closed', ['has closed', 'closes', 'had close']],
  ['By the time the police arrived, the thief ___ away. (run)', 'had run', ['has run', 'had ran', 'runs']],
  ['Minh ___ very happy when he heard that he had passed the exam. (feel)', 'felt', ['has felt', 'feels', 'feeled']],
  ['Before Lan moved to Hanoi, she ___ in Hai Phong for ten years. (live)', 'had lived', ['has lived', 'lives', 'had live']],
  ['The kitchen ___ wonderful because Mum had cooked pho. (smell)', 'smelled', ['has smelled', 'smells', 'smelling']],
];

/** Unit 81 Nature (A2): landscapes, water, sky and weather, plants and animals. */
export const NATURE_WORDS: readonly VocabWord[] = [
  // Landscapes
  { word: 'cliff', topic: 'landscapes', definition: 'a high, steep wall of rock, often next to the sea', vi: 'vách đá', icon: '🧗',
    example: 'Don\'t stand too close to the edge of the cliff.', exampleVi: 'Đừng đứng quá gần mép vách đá.',
    situations: ['The rock wall goes straight down to the sea, a hundred metres below.', 'Climbers use ropes to go up this tall, steep wall of rock.', 'Sea birds make their homes on the high, steep rocks above the waves.'] },
  { word: 'volcano', topic: 'landscapes', definition: 'a mountain that can send out fire, hot rock and smoke', vi: 'núi lửa', icon: '🌋',
    example: 'The volcano erupted and hot lava ran down its sides.', exampleVi: 'Núi lửa phun trào và dung nham nóng chảy xuống sườn núi.',
    situations: ['Smoke and red-hot rock came out of the top of the mountain.', 'Thousands of years ago, fire and hot rock came out of this mountain on Ly Son Island.', 'The ground shook and grey ash fell on the town near the burning mountain.'] },
  { word: 'coast', topic: 'landscapes', definition: 'the land next to the sea', vi: 'bờ biển', icon: '🏖️',
    example: 'We drove along the coast from Da Nang to Hoi An.', exampleVi: 'Chúng tôi lái xe dọc bờ biển từ Đà Nẵng đến Hội An.',
    situations: ['Viet Nam has more than 3,000 kilometres of land next to the sea.', 'Many fishing villages are on the land beside the sea in central Viet Nam.', 'The road follows the edge of the land where it meets the sea.'] },
  { word: 'hill', topic: 'landscapes', definition: 'a high area of land, smaller than a mountain', vi: 'ngọn đồi', icon: '⛰️',
    example: 'We walked up the hill to see the view.', exampleVi: 'Chúng tôi đi bộ lên đồi để ngắm cảnh.',
    situations: ['Da Lat has many small, green high places covered with pine trees.', 'It isn\'t a mountain, but it\'s hard to ride a bike up it.', 'Children roll down the grassy slope behind the school.'] },
  { word: 'field', topic: 'landscapes', definition: 'an area of land used for growing crops or keeping animals', vi: 'cánh đồng', icon: '🌾',
    example: 'The rice fields turn yellow before the harvest.', exampleVi: 'Những cánh đồng lúa chuyển màu vàng trước mùa gặt.',
    situations: ['Farmers plant rice in this flat, open land near the village.', 'The cows are eating grass in the open land behind the farm.', 'After the harvest, children fly kites on the wide, flat farmland.'] },
  { word: 'rainforest', topic: 'landscapes', definition: 'a thick forest in a hot place where it rains a lot', vi: 'rừng mưa nhiệt đới', icon: '🌴',
    example: 'Many animals live in the rainforest.', exampleVi: 'Nhiều loài động vật sống trong rừng mưa nhiệt đới.',
    situations: ['In Cuc Phuong, the trees are very tall, it rains a lot and it is hot all year.', 'The Amazon is the biggest hot, wet forest in the world.', 'Monkeys and colourful birds live among the thick trees in this hot, wet place.'] },
  // Water
  { word: 'stream', topic: 'water', definition: 'a small, narrow river', vi: 'con suối', icon: '🏞️',
    example: 'We drank cold water from a mountain stream.', exampleVi: 'Chúng tôi uống nước mát từ một con suối trên núi.',
    situations: ['A little river runs down the hill behind the village.', 'The water is so narrow here that you can jump over it.', 'We sat on the rocks and put our feet in the cold, running water of the tiny river.'] },
  { word: 'pond', topic: 'water', definition: 'a small area of still water', vi: 'cái ao', icon: '🐸',
    example: 'There are fish and frogs in our pond.', exampleVi: 'Có cá và ếch trong ao nhà tôi.',
    situations: ['Grandma keeps ducks and fish in the small pool of water behind her house.', 'Frogs sing every night near the little area of still water in the garden.', 'Lotus flowers grow in the small, still water next to the pagoda.'] },
  { word: 'ocean', topic: 'water', definition: 'a very large area of sea', vi: 'đại dương', icon: '🐋',
    example: 'The Pacific Ocean is the biggest ocean in the world.', exampleVi: 'Thái Bình Dương là đại dương lớn nhất thế giới.',
    situations: ['Whales swim thousands of kilometres across this huge sea.', 'The plane flew for ten hours over water with no land at all.', 'The Pacific is the largest one on Earth.'] },
  { word: 'bay', topic: 'water', definition: 'a part of the sea that has land around it on several sides', vi: 'vịnh', icon: '⛵',
    example: 'Ha Long Bay has nearly 2,000 islands.', exampleVi: 'Vịnh Hạ Long có gần 2.000 hòn đảo.',
    situations: ['Ha Long is famous for this curved area of sea with many islands.', 'The boats are safe here because land protects this part of the sea on three sides.', 'Nha Trang has a beautiful one with calm water and a long, curved beach.'] },
  { word: 'wave', topic: 'water', definition: 'a line of moving water on the sea', vi: 'con sóng', icon: '🏄',
    example: 'The waves were too big for swimming.', exampleVi: 'Sóng quá lớn để bơi.',
    situations: ['The water rises and crashes onto the beach again and again.', 'Surfers wait for a big one to come towards the beach.', 'The wind was strong, so the sea water rose up very high and hit the boat.'] },
  { word: 'riverbank', topic: 'water', definition: 'the land along the side of a river', vi: 'bờ sông', icon: '🎣',
    example: 'We had a picnic on the riverbank.', exampleVi: 'Chúng tôi đi dã ngoại trên bờ sông.',
    situations: ['People in Hue sit on the grass beside the Perfume River and watch the boats.', 'The old man is fishing from the land at the side of the river.', 'After the flood, the grass along the edge of the river was covered in mud.'] },
  // Sky and weather
  { word: 'breeze', topic: 'sky-and-weather', definition: 'a light, gentle wind', vi: 'làn gió nhẹ', icon: '🍃',
    example: 'A cool breeze came from the sea.', exampleVi: 'Một làn gió mát thổi từ biển vào.',
    situations: ['It isn\'t windy, but there\'s a soft, cool wind from the lake.', 'The leaves are moving a little in the gentle wind.', 'In the evening, a light wind makes the hot day feel nicer.'] },
  { word: 'shower', topic: 'sky-and-weather', definition: 'a short period of rain', vi: 'cơn mưa rào', icon: '🌦️',
    example: 'There will be showers this afternoon.', exampleVi: 'Chiều nay sẽ có mưa rào.',
    situations: ['It rained for ten minutes, and then the sun came out again.', 'In Ho Chi Minh City, short, heavy rain falls most afternoons in the rainy season.', 'Take an umbrella. The forecast says there will be a little rain for a short time.'] },
  { word: 'frost', topic: 'sky-and-weather', definition: 'thin white ice on the ground when it is very cold', vi: 'sương giá', icon: '❄️',
    example: 'There was frost on the grass in Sa Pa this morning.', exampleVi: 'Sáng nay có sương giá trên cỏ ở Sa Pa.',
    situations: ['On cold winter mornings in Mau Son, the grass is white with thin ice.', 'The car windows were covered with a thin layer of ice.', 'It was below zero last night, so the leaves were white and crunchy.'] },
  { word: 'heatwave', topic: 'sky-and-weather', definition: 'a period of very hot weather', vi: 'đợt nắng nóng', icon: '🥵',
    example: 'During the heatwave, it was 40°C in Hanoi.', exampleVi: 'Trong đợt nắng nóng, Hà Nội lên tới 40°C.',
    situations: ['It was over 40°C every day for two weeks.', 'The weather has been extremely hot all week, so people stay inside.', 'Old people and babies need extra water during these very hot days.'] },
  { word: 'sunrise', topic: 'sky-and-weather', definition: 'the time in the morning when the sun appears', vi: 'bình minh', icon: '🌅',
    example: 'We got up early to watch the sunrise.', exampleVi: 'Chúng tôi dậy sớm để ngắm bình minh.',
    situations: ['At 5 am, the sky over the sea turned pink as the sun came up.', 'Farmers start work very early, when the sun first appears.', 'We climbed Fansipan in the dark to see the sun come up.'] },
  { word: 'sunset', topic: 'sky-and-weather', definition: 'the time in the evening when the sun goes down', vi: 'hoàng hôn', icon: '🌇',
    example: 'The sunset over the river was beautiful.', exampleVi: 'Hoàng hôn trên sông rất đẹp.',
    situations: ['In the evening, the sky turned orange as the sun went down behind the hills.', 'Tourists wait on the beach in Phu Quoc to see the sun go down.', 'We must be home before dark, so we leave the park when the sun is going down.'] },
  // Plants and animals
  { word: 'root', topic: 'plants-and-animals', definition: 'the part of a plant that grows under the ground', vi: 'rễ cây', icon: '🪴',
    example: 'The roots of this tree are very deep.', exampleVi: 'Rễ của cái cây này rất sâu.',
    situations: ['This part of the plant is under the soil and takes in water.', 'Before you plant the young tree, put its underground part deep into the soil.', 'Trees hold the soil on hills because these parts go deep into the ground.'] },
  { word: 'branch', topic: 'plants-and-animals', definition: 'a part of a tree that grows out from the trunk', vi: 'cành cây', icon: '🌳',
    example: 'A bird is sitting on a branch.', exampleVi: 'Một con chim đang đậu trên cành cây.',
    situations: ['The monkey is swinging from one arm of the tree to another.', 'Leaves and fruit grow on these parts of the tree.', 'The strong wind broke a big arm off the mango tree.'] },
  { word: 'seed', topic: 'plants-and-animals', definition: 'a small thing from which a new plant grows', vi: 'hạt giống', icon: '🌰',
    example: 'Plant the seeds in spring.', exampleVi: 'Hãy gieo hạt vào mùa xuân.',
    situations: ['There are lots of small black ones inside a watermelon.', 'Put this tiny thing in the soil, give it water, and a plant will grow.', 'Farmers buy little bags of these to grow vegetables.'] },
  { word: 'insect', topic: 'plants-and-animals', definition: 'a very small animal with six legs, like an ant or a bee', vi: 'côn trùng', icon: '🐞',
    example: 'Bees and butterflies are insects.', exampleVi: 'Ong và bướm là côn trùng.',
    situations: ['Ants, bees and butterflies are all this kind of small animal.', 'It has six legs and two wings, and it is flying around the lamp.', 'Mosquitoes are a kind of tiny six-legged animal that can make people ill.'] },
  { word: 'nest', topic: 'plants-and-animals', definition: 'a home that a bird makes from sticks and grass', vi: 'tổ chim', icon: '🪺',
    example: 'There are three eggs in the nest.', exampleVi: 'Có ba quả trứng trong tổ.',
    situations: ['The bird is carrying small sticks to build a home for its eggs.', 'Look! There are baby birds in that round home in the tree.', 'Swallows build these little homes under the roofs of houses.'] },
  { word: 'wildlife', topic: 'plants-and-animals', definition: 'animals and plants that live free in nature', vi: 'thế giới hoang dã', icon: '🦌',
    example: 'Cat Tien National Park is full of wildlife.', exampleVi: 'Vườn quốc gia Cát Tiên có rất nhiều động thực vật hoang dã.',
    situations: ['In the national park, you can see deer, monkeys and wild birds.', 'This TV programme is about animals that live free in nature, not in zoos.', 'The park protects all the wild animals and plants that live there.'] },
];
