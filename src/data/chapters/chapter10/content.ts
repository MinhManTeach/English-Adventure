import type { VocabWord } from '../shared';

/** Unit 28: a or an, chosen by the first sound. [sentence with ___, noun, article] */
export const A_AN_ITEMS = [
  ['I saw ___ elephant at the zoo.', 'elephant', 'an'], ['Lan wants ___ umbrella for her birthday.', 'umbrella', 'an'],
  ['We waited for ___ hour at the station.', 'hour', 'an'], ['My cousin goes to ___ university in Hanoi.', 'university', 'a'],
  ['Nam is wearing ___ school uniform.', 'uniform', 'a'], ['Can I have ___ apple, please?', 'apple', 'an'],
  ['There is ___ island in the middle of the lake.', 'island', 'an'], ['My dad is ___ engineer.', 'engineer', 'an'],
  ['She found ___ old coin in the garden.', 'old', 'an'], ['He told us ___ funny story.', 'funny', 'a'],
  ['It is ___ easy question.', 'easy', 'an'], ['We had ___ picnic by the river.', 'picnic', 'a'],
  ['My uncle drives ___ orange taxi.', 'orange', 'an'], ['There is ___ owl in the tree.', 'owl', 'an'],
  ['I need ___ eraser for my test.', 'eraser', 'an'], ['She is ___ honest girl.', 'honest', 'an'],
] as const;

/** Unit 28: first mention with a/an, second mention with the. [first sentence, noun, rest of second sentence] */
export const SECOND_MENTION = [
  ['I have a cat and a dog.', 'cat', 'is black.'], ['We stayed in a hotel near the beach.', 'hotel', 'had a big pool.'],
  ['Mum bought a cake and some juice.', 'cake', 'was delicious.'], ['There is a box on my desk.', 'box', 'is full of pens.'],
  ['I watched a film last night.', 'film', 'was very funny.'], ['A man and a woman came into the shop.', 'man', 'was wearing a hat.'],
  ['Nam has a bike and a scooter.', 'bike', 'is red.'], ['We saw a monkey at the zoo.', 'monkey', 'was eating a banana.'],
  ['My friend sent me a letter.', 'letter', 'was very long.'], ['There is a park near my house.', 'park', 'has a small lake.'],
  ['I read a book about dinosaurs.', 'book', 'had great pictures.'], ['Grandma gave me a present.', 'present', 'was a new watch.'],
] as const;

/** Unit 28: things there is only one of, or set phrases, with the. [sentence with ___, key] */
export const UNIQUE_THE = [
  ['___ sun is very hot today.', 'sun'], ['Look at ___ moon! It\'s so bright.', 'moon'], ['There are no clouds in ___ sky.', 'sky'],
  ['We swam in ___ sea all afternoon.', 'sea'], ['Mount Everest is the highest mountain in ___ world.', 'world'],
  ['I found the answer on ___ internet.', 'internet'], ['___ capital of Vietnam is Hanoi.', 'capital'],
  ['What is ___ date today?', 'date'], ['I\'ll see you at ___ end of the lesson.', 'end'], ['My classroom is on ___ top floor.', 'top floor'],
  ['___ Earth goes round the Sun.', 'earth'], ['What is ___ name of your school?', 'name'],
] as const;

/** Unit 28: no article with sports, school subjects, languages, by + transport. [sentence with ___, answer] */
export const ZERO_ARTICLE = [
  ['Nam plays ___ every Sunday.', 'football'], ['We have ___ on Monday and Wednesday.', 'Maths'], ['My sister speaks ___ very well.', 'English'],
  ['We go to the beach by ___.', 'bus'], ['I love ___. It\'s my favourite subject.', 'History'], ['They play ___ in the park after school.', 'badminton'],
  ['My grandparents speak ___ and French.', 'Vietnamese'], ['She goes to work by ___.', 'train'], ['Do you like ___? I think it\'s difficult.', 'Science'],
  ['Our team plays ___ in the sports hall.', 'basketball'], ['We travelled to Da Nang by ___.', 'plane'], ['Hoa studies ___ at the weekend.', 'Japanese'],
] as const;

/** Unit 29: ordinals 1–31 with common wrong spellings. */
export const ORDINALS = [
  [1, 'first', 'oneth'], [2, 'second', 'twoth'], [3, 'third', 'threeth'], [4, 'fourth', 'forth'], [5, 'fifth', 'fiveth'],
  [6, 'sixth', 'sixt'], [7, 'seventh', 'sevenst'], [8, 'eighth', 'eightth'], [9, 'ninth', 'nineth'], [10, 'tenth', 'tenst'],
  [11, 'eleventh', 'elevenst'], [12, 'twelfth', 'twelveth'], [13, 'thirteenth', 'thirdteenth'], [14, 'fourteenth', 'forteenth'],
  [15, 'fifteenth', 'fiveteenth'], [16, 'sixteenth', 'sixteenst'], [17, 'seventeenth', 'seventeenst'], [18, 'eighteenth', 'eightteenth'],
  [19, 'nineteenth', 'nineteenst'], [20, 'twentieth', 'twentyth'], [21, 'twenty-first', 'twenty-oneth'], [22, 'twenty-second', 'twenty-twoth'],
  [23, 'twenty-third', 'twenty-threeth'], [24, 'twenty-fourth', 'twenty-forth'], [25, 'twenty-fifth', 'twenty-fiveth'], [26, 'twenty-sixth', 'twenty-sixt'],
  [27, 'twenty-seventh', 'twenty-sevenst'], [28, 'twenty-eighth', 'twenty-eightth'], [29, 'twenty-ninth', 'twenty-nineth'], [30, 'thirtieth', 'thirtyth'],
  [31, 'thirty-first', 'thirty-oneth'],
] as const;
/** Cardinal number words used in the ordinal distractors. */
export const CARDINALS: Record<number, string> = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve',
  13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
  21: 'twenty-one', 22: 'twenty-two', 23: 'twenty-three', 24: 'twenty-four', 25: 'twenty-five', 26: 'twenty-six', 27: 'twenty-seven',
  28: 'twenty-eight', 29: 'twenty-nine', 30: 'thirty', 31: 'thirty-one',
};
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

/** Unit 29: number words that are easy to misspell. [number, correct, wrong spellings] */
export const NUMBER_WORDS = [
  [40, 'forty', ['fourty', 'fourteen']], [14, 'fourteen', ['forteen', 'forty']], [15, 'fifteen', ['fiveteen', 'fifty']],
  [50, 'fifty', ['fivety', 'fifteen']], [13, 'thirteen', ['threeteen', 'thirty']], [30, 'thirty', ['threety', 'thirteen']],
  [12, 'twelve', ['twelf', 'twenty']], [20, 'twenty', ['twoty', 'twelve']], [19, 'nineteen', ['nineten', 'ninety']],
  [90, 'ninety', ['ninty', 'nineteen']], [18, 'eighteen', ['eightteen', 'eighty']], [80, 'eighty', ['eighthy', 'eighteen']],
  [11, 'eleven', ['elevan', 'twelve']], [100, 'a hundred', ['a hundreds', 'one hundreds']], [60, 'sixty', ['sixthy', 'sixteen']],
  [70, 'seventy', ['seventhy', 'seventeen']],
] as const;
/** Unit 29: counted things for number sentences. */
export const COUNTED = [
  ['students', 'in our school'], ['people', 'at the concert'], ['books', 'in the library'], ['trees', 'in the park'],
  ['cars', 'in the car park'], ['seats', 'in the cinema'], ['fans', 'at the stadium'], ['houses', 'in our village'],
] as const;

/** Unit 30 Weather, seasons, nature and ecology. */
export const NATURE_WORDS: readonly VocabWord[] = [
  // Weather
  { word: 'foggy', topic: 'weather', definition: 'with thick grey cloud near the ground', vi: 'có sương mù', icon: '🌫️',
    example: 'It was foggy this morning, so the bus was slow.', exampleVi: 'Sáng nay có sương mù nên xe buýt đi chậm.',
    situations: ['You can\'t see the other side of the street because the air is thick and grey.', 'In Da Lat in the morning, a white cloud covers the hills and roads.', 'The driver turns on the lights because he can\'t see far.'] },
  { word: 'stormy', topic: 'weather', definition: 'with strong wind, heavy rain and often thunder', vi: 'có bão, giông', icon: '⛈️',
    example: 'Don\'t go fishing. The weather is stormy.', exampleVi: 'Đừng đi câu cá. Trời đang có bão.',
    situations: ['The wind is very strong, it is raining hard and the sea has huge waves.', 'Big trees fell down in the night because of the wind and rain.', 'The boats stay in the harbour because the sea is too dangerous.'] },
  { word: 'windy', topic: 'weather', definition: 'with a lot of wind', vi: 'nhiều gió', icon: '🌬️',
    example: 'It\'s windy today. Let\'s fly a kite!', exampleVi: 'Hôm nay trời nhiều gió. Đi thả diều thôi!',
    situations: ['My hat flew off my head and the leaves are flying everywhere.', 'It\'s a great day for flying kites on the beach.', 'The washing on the line is moving a lot, but there are no clouds.'] },
  { word: 'freezing', topic: 'weather', definition: 'very, very cold', vi: 'lạnh cóng', icon: '🥶',
    example: 'It\'s freezing outside. Wear your gloves!', exampleVi: 'Ngoài trời lạnh cóng. Đeo găng tay vào!',
    situations: ['The water in the bowl turned to ice in the night.', 'My hands and nose hurt because it is so cold.', 'It is minus five degrees and everyone is wearing thick coats.'] },
  { word: 'humid', topic: 'weather', definition: 'hot with a lot of water in the air', vi: 'nồm, ẩm ướt', icon: '💦',
    example: 'Hanoi is very humid in spring.', exampleVi: 'Hà Nội rất nồm ẩm vào mùa xuân.',
    situations: ['The walls and floor are wet, but it isn\'t raining.', 'My clothes won\'t dry and the air feels wet and heavy.', 'It is hot and sticky, and I am wet just from walking.'] },
  { word: 'cloudy', topic: 'weather', definition: 'with a lot of clouds in the sky', vi: 'nhiều mây', icon: '☁️',
    example: 'It\'s cloudy, but it isn\'t raining.', exampleVi: 'Trời nhiều mây nhưng không mưa.',
    situations: ['We can\'t see the sun because the sky is grey and white.', 'The sky is grey all day, but there is no rain.', 'There are big white and grey shapes all over the sky.'] },
  // Sky and seasons
  { word: 'rainbow', topic: 'sky-and-seasons', definition: 'a curve of colours in the sky after rain', vi: 'cầu vồng', icon: '🌈',
    example: 'After the rain, we saw a beautiful rainbow.', exampleVi: 'Sau cơn mưa, chúng tôi thấy cầu vồng tuyệt đẹp.',
    situations: ['The sun comes out after the rain and there are seven colours in the sky.', 'Look! Red, orange, yellow, green, blue and purple in a big curve!', 'You can see it when the sun shines through the rain.'] },
  { word: 'thunder', topic: 'sky-and-seasons', definition: 'the loud noise in the sky during a storm', vi: 'sấm', icon: '🔊',
    example: 'The thunder was so loud that the baby woke up.', exampleVi: 'Tiếng sấm to đến nỗi em bé thức giấc.',
    situations: ['BOOM! The loud noise in the storm made the dog hide under the bed.', 'We heard a big rumble in the sky after the flash.', 'The noise in the stormy sky was louder than a drum.'] },
  { word: 'lightning', topic: 'sky-and-seasons', definition: 'a bright flash of light in the sky during a storm', vi: 'tia chớp', icon: '⚡',
    example: 'Lightning hit the tall tree.', exampleVi: 'Tia chớp đánh trúng cái cây cao.',
    situations: ['A bright white flash lit up the dark sky for a second.', 'Don\'t stand under a tree in a storm. This can hit it!', 'First we saw the flash, then we heard the boom.'] },
  { word: 'forecast', topic: 'sky-and-seasons', definition: 'what people say the weather will be like', vi: 'dự báo thời tiết', icon: '📺',
    example: 'The forecast says it will rain tomorrow.', exampleVi: 'Dự báo nói ngày mai trời sẽ mưa.',
    situations: ['On TV, a woman says it will be sunny tomorrow.', 'Dad checks his phone to see if it will rain this weekend.', 'The radio says there will be a storm tonight.'] },
  { word: 'temperature', topic: 'sky-and-seasons', definition: 'how hot or cold something is', vi: 'nhiệt độ', icon: '🌡️',
    example: 'The temperature today is 35 degrees.', exampleVi: 'Nhiệt độ hôm nay là 35 độ.',
    situations: ['It is 38 degrees in Ho Chi Minh City today.', 'The nurse checked how hot my body was with a thermometer.', 'In Sa Pa in winter, it can be 0 degrees.'] },
  { word: 'autumn', topic: 'sky-and-seasons', definition: 'the season between summer and winter', vi: 'mùa thu', icon: '🍂',
    example: 'In autumn, the leaves turn yellow and fall.', exampleVi: 'Vào mùa thu, lá chuyển vàng và rụng.',
    situations: ['The leaves turn red and yellow and fall from the trees.', 'Summer is over, and winter hasn\'t come yet.', 'In Hanoi, the weather is cool and the sky is clear in September and October.'] },
  // Nature
  { word: 'forest', topic: 'nature', definition: 'a large area with a lot of trees', vi: 'rừng', icon: '🌲',
    example: 'Many animals live in the forest.', exampleVi: 'Nhiều loài động vật sống trong rừng.',
    situations: ['There are thousands of tall trees and you can hear birds everywhere.', 'Monkeys and tigers live among the many trees.', 'We got lost among the trees on our camping trip.'] },
  { word: 'waterfall', topic: 'nature', definition: 'water falling down from a high place', vi: 'thác nước', icon: '💧',
    example: 'Ban Gioc is a famous waterfall in Vietnam.', exampleVi: 'Bản Giốc là thác nước nổi tiếng ở Việt Nam.',
    situations: ['The river falls down from the top of the rocks with a loud noise.', 'We took photos where the water drops from a high cliff.', 'White water falls from the mountain into a pool.'] },
  { word: 'valley', topic: 'nature', definition: 'low land between hills or mountains', vi: 'thung lũng', icon: '🏞️',
    example: 'The village is in a green valley.', exampleVi: 'Ngôi làng nằm trong một thung lũng xanh.',
    situations: ['There are mountains on both sides and a river in the low land between them.', 'From the top of the hill, we looked down at the rice fields below.', 'The low, flat land between the two mountains is full of farms.'] },
  { word: 'desert', topic: 'nature', definition: 'a very dry place with lots of sand and little rain', vi: 'sa mạc', icon: '🏜️',
    example: 'Camels can live in the desert.', exampleVi: 'Lạc đà có thể sống ở sa mạc.',
    situations: ['It almost never rains here, and there is sand everywhere.', 'Camels walk across hot sand for many days.', 'There are very few plants because it is so hot and dry.'] },
  { word: 'island', topic: 'nature', definition: 'land with water all around it', vi: 'hòn đảo', icon: '🏝️',
    example: 'Phu Quoc is a big island.', exampleVi: 'Phú Quốc là một hòn đảo lớn.',
    situations: ['You need a boat or a plane to get there because there is sea all around.', 'Phu Quoc and Con Dao have water on every side.', 'We stayed on a small piece of land in the middle of the sea.'] },
  { word: 'cave', topic: 'nature', definition: 'a large hole in the side of a mountain or under the ground', vi: 'hang động', icon: '🕳️',
    example: 'Son Doong is the biggest cave in the world.', exampleVi: 'Sơn Đoòng là hang động lớn nhất thế giới.',
    situations: ['It is dark inside the mountain, and bats sleep on the rocky ceiling.', 'We used torches to walk inside the big hole in the rock.', 'Phong Nha has many of these dark places inside the mountains.'] },
  // Ecology
  { word: 'pollution', topic: 'ecology', definition: 'dirty air, water or land that can hurt living things', vi: 'ô nhiễm', icon: '🏭',
    example: 'Air pollution is a big problem in big cities.', exampleVi: 'Ô nhiễm không khí là vấn đề lớn ở các thành phố lớn.',
    situations: ['Smoke from factories and cars makes the air dirty.', 'The river is black and the fish are dying.', 'People wear masks because the air in the city is so dirty.'] },
  { word: 'recycle', topic: 'ecology', definition: 'use old things again to make new things', vi: 'tái chế', icon: '♻️',
    example: 'We recycle bottles and paper at school.', exampleVi: 'Ở trường chúng tôi tái chế chai lọ và giấy.',
    situations: ['We put old bottles in a special bin so they can become new bottles.', 'Old newspapers are made into new paper.', 'Mai turns plastic bottles into flower pots.'] },
  { word: 'litter', topic: 'ecology', definition: 'rubbish that people leave on the ground', vi: 'rác xả bừa bãi', icon: '🗑️',
    example: 'Please don\'t drop litter in the park.', exampleVi: 'Xin đừng xả rác trong công viên.',
    situations: ['There are plastic bags and cans on the beach after the holiday.', 'Someone threw a sweet wrapper on the street.', 'We picked up bottles and paper from the school yard.'] },
  { word: 'environment', topic: 'ecology', definition: 'the air, water and land where people, animals and plants live', vi: 'môi trường', icon: '🌍',
    example: 'We must protect the environment.', exampleVi: 'Chúng ta phải bảo vệ môi trường.',
    situations: ['The air, the rivers, the forests and the land around us.', 'If we cut down all the trees, animals will lose their homes.', 'Clean air and water are important for all living things.'] },
  { word: 'endangered', topic: 'ecology', definition: 'in danger of disappearing for ever', vi: 'có nguy cơ tuyệt chủng', icon: '🐼',
    example: 'The saola is an endangered animal.', exampleVi: 'Sao la là loài động vật có nguy cơ tuyệt chủng.',
    situations: ['There are only a few hundred of these tigers left in the world.', 'Soon there may be no more of these turtles at all.', 'People hunt these animals so much that very few are left.'] },
  { word: 'protect', topic: 'ecology', definition: 'keep something safe from harm', vi: 'bảo vệ', icon: '🛡️',
    example: 'Rangers protect the animals in the national park.', exampleVi: 'Kiểm lâm bảo vệ động vật trong vườn quốc gia.',
    situations: ['Rangers keep the animals in the national park safe from hunters.', 'We plant trees and keep the river clean to keep nature safe.', 'The mother bird keeps her babies safe from the cat.'] },
];
