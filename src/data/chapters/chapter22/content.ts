import type { VocabWord } from '../shared';

/** [context key, sentence with ___, answer, two wrong choices] */
type NounItem = readonly [key: string, gap: string, answer: string, wrong: readonly [string, string]];

/** A2 Unit 22 (id 64): uncountable nouns that are countable in Vietnamese have no plural and no a/an. */
export const NO_PLURAL_ITEMS: readonly NounItem[] = [
  ['advice', 'My teacher gave me some useful ___ before the exam.', 'advice', ['advices', 'an advice']],
  ['information', 'You can find more ___ on the school website.', 'information', ['informations', 'an information']],
  ['news', 'I have some good ___ for you!', 'news', ['newses', 'a news']],
  ['homework', 'We have a lot of ___ tonight.', 'homework', ['homeworks', 'a homework']],
  ['furniture', 'We bought some new ___ for the living room.', 'furniture', ['furnitures', 'a furniture']],
  ['luggage', 'Please put all your ___ on the trolley.', 'luggage', ['luggages', 'a luggage']],
  ['traffic', 'There was a lot of ___ on the way to school.', 'traffic', ['traffics', 'a traffic']],
  ['weather', 'We had ___ in Da Lat last week.', 'lovely weather', ['lovely weathers', 'a lovely weather']],
  ['equipment', 'The sports centre has a lot of new ___.', 'equipment', ['equipments', 'an equipment']],
  ['music', 'I often listen to ___ on the bus.', 'music', ['musics', 'a music']],
  ['bread', 'Can you buy some ___ at the bakery?', 'bread', ['breads', 'a bread']],
  ['rice', 'We eat ___ with almost every meal.', 'rice', ['rices', 'a rice']],
  ['hair', 'My grandmother has ___.', 'long white hair', ['long white hairs', 'a long white hair']],
  ['work', 'Dad has a lot of ___ to do today.', 'work', ['works', 'a work']],
  ['rubbish', "Please don't leave any ___ on the beach.", 'rubbish', ['rubbishes', 'a rubbish']],
];

/** Unit 64: uncountable nouns take a singular verb. */
export const SINGULAR_VERB_ITEMS: readonly NounItem[] = [
  ['advice', 'Your advice ___ always very helpful.', 'is', ['are', 'were']],
  ['information', 'The information on this map ___ wrong.', 'is', ['are', 'were']],
  ['news', "The news ___ on TV at seven o'clock every evening.", 'is', ['are', 'were']],
  ['homework', 'Our Maths homework ___ really difficult today.', 'is', ['are', 'were']],
  ['furniture', "The furniture in Grandma's house ___ very old.", 'is', ['are', 'were']],
  ['luggage', 'Your luggage ___ too heavy for the plane.', 'is', ['are', 'were']],
  ['traffic', 'The traffic in Ho Chi Minh City ___ terrible at rush hour.', 'is', ['are', 'were']],
  ['weather', 'The weather ___ getting colder every day.', 'is', ['are', 'were']],
  ['money', 'The money in the box ___ for our class trip.', 'is', ['are', 'were']],
  ['equipment', 'All the sports equipment ___ in the store room.', 'is', ['are', 'were']],
  ['music', 'The music at the party last night ___ too loud.', 'was', ['were', 'are']],
  ['bread', 'This bread ___ still warm from the oven.', 'is', ['are', 'were']],
  ['rice', 'The rice ___ ready. Come and eat!', 'is', ['are', 'were']],
  ['hair', "Mai's hair ___ long and straight.", 'is', ['are', 'were']],
  ['rubbish', 'The rubbish on the beach yesterday ___ terrible.', 'was', ['were', 'are']],
];

/** Unit 64: counting uncountable nouns with a piece of, a slice of, a bowl of … */
export const PARTITIVE_ITEMS: readonly NounItem[] = [
  ['advice', 'Let me give you ___ advice: never share your password.', 'a piece of', ['an', 'a few']],
  ['information', 'Here is ___ useful information about the trip.', 'a piece of', ['an', 'a few']],
  ['furniture', 'A sofa is a big ___ furniture.', 'piece of', ['pieces of', 'one of']],
  ['luggage', 'You can take only one ___ luggage on this bus.', 'piece of', ['pieces of', 'piece']],
  ['bread', 'I had two ___ bread with butter for breakfast.', 'slices of', ['slice of', 'slices']],
  ['rice', 'Nam was so hungry that he ate three ___ rice.', 'bowls of', ['bowl of', 'bowls']],
  ['water', "Can I have ___ water, please? I'm thirsty.", 'a glass of', ['an', 'a few']],
  ['milk', 'Mum bought two ___ milk at the supermarket.', 'cartons of', ['carton of', 'cartons']],
  ['paper', 'Write your answer on ___ paper.', 'a piece of', ['a pieces of', 'an']],
  ['cake', 'Would you like another ___ cake?', 'slice of', ['slices of', 'slice']],
  ['chocolate', 'My brother ate a whole ___ chocolate!', 'bar of', ['bars of', 'bar']],
  ['tea', 'Grandpa drinks three ___ green tea every day.', 'cups of', ['cup of', 'cups']],
  ['honey', 'There is ___ honey in the cupboard.', 'a jar of', ['a jars of', 'an']],
];

/** Unit 64: nouns that are always plural, and irregular plurals. */
export const PLURAL_NOUN_ITEMS: readonly NounItem[] = [
  ['jeans', 'My new jeans ___ too long.', 'are', ['is', 'was']],
  ['trousers', 'I need ___ new trousers for school.', 'a pair of', ['a', 'a piece of']],
  ['glasses', "Grandma can't read without her ___.", 'glasses', ['glass', 'a glass']],
  ['scissors', 'Can I borrow your ___? I need to cut this paper.', 'scissors', ['scissor', 'a scissors']],
  ['shorts', 'These shorts ___ really comfortable.', 'are', ['is', 'was']],
  ['pyjamas', 'Where ___ my pyjamas?', 'are', ['is', 'was']],
  ['clothes', 'Your clothes ___ on the bed.', 'are', ['is', 'was']],
  ['people', 'The people in my village ___ very friendly.', 'are', ['is', 'was']],
  ['children', 'The children ___ playing in the school yard.', 'are', ['is', 'was']],
  ['teeth', 'Brush your ___ twice a day.', 'teeth', ['tooths', 'teeths']],
  ['sunglasses', 'I bought ___ sunglasses for the beach.', 'a pair of', ['a', 'an']],
  ['mice', 'There are two ___ in the kitchen!', 'mice', ['mouses', 'mices']],
  ['feet', 'My ___ hurt after the long walk.', 'feet', ['foots', 'feets']],
];

/** Unit 65 (A2 Unit 23): plural countable nouns and uncountable nouns, each with a place where both make sense. */
export const COUNT_NOUNS = [
  { noun: 'chairs', place: 'in the classroom' }, { noun: 'buses', place: 'on this road' }, { noun: 'trees', place: 'in our street' },
  { noun: 'eggs', place: 'in the fridge' }, { noun: 'students', place: 'in the library' }, { noun: 'cars', place: 'in the car park' },
  { noun: 'books', place: 'on the shelf' }, { noun: 'bins', place: 'in the park' }, { noun: 'people', place: 'at the bus stop' },
  { noun: 'tourists', place: 'in the old town' }, { noun: 'apples', place: 'in the basket' }, { noun: 'plates', place: 'on the table' },
] as const;
export const MASS_NOUNS = [
  { noun: 'traffic', place: 'in the city centre' }, { noun: 'sugar', place: 'in my coffee' }, { noun: 'milk', place: 'in the jug' },
  { noun: 'homework', place: 'this week' }, { noun: 'noise', place: 'in the classroom' }, { noun: 'rice', place: 'in the pot' },
  { noun: 'water', place: 'in the bottle' }, { noun: 'rubbish', place: 'on the beach' }, { noun: 'furniture', place: 'in the living room' },
  { noun: 'salt', place: 'in the soup' }, { noun: 'money', place: 'in my wallet' }, { noun: 'light', place: 'in this room' },
] as const;

/** A2 Unit 24 (id 66): fashion. */
export const FASHION_WORDS: readonly VocabWord[] = [
  // Materials
  { word: 'cotton', topic: 'materials', definition: 'a soft natural material made from a plant, used for T-shirts', vi: 'vải bông, cotton', icon: '🌱',
    example: 'This T-shirt is made of cotton.', exampleVi: 'Chiếc áo phông này làm bằng vải cotton.',
    situations: ['This T-shirt is soft and cool, and the material comes from a white, fluffy plant.', 'In hot weather, clothes made from this light plant material are the most comfortable.', 'The label on my school shirt says it is made from this plant material, so it is easy to wash.'] },
  { word: 'wool', topic: 'materials', definition: 'a warm material made from the hair of sheep', vi: 'len', icon: '🧶',
    example: 'Grandma knitted me a wool hat.', exampleVi: 'Bà đan cho tôi một chiếc mũ len.',
    situations: ['This warm winter hat is made from the hair of sheep.', 'Grandma knits thick sweaters with it for the cold winter in Sa Pa.', 'In spring, farmers cut the thick coats off their sheep and sell them to make warm clothes.'] },
  { word: 'leather', topic: 'materials', definition: 'a strong material made from the skin of an animal, used for shoes and bags', vi: 'da thuộc', icon: '👞',
    example: 'Dad wears leather shoes to work.', exampleVi: 'Bố đi giày da khi đi làm.',
    situations: ["Dad's brown work shoes are made from animal skin.", 'This handbag is strong and expensive because it is made of cow skin.', 'Motorbike riders often wear a thick black jacket made from animal skin.'] },
  { word: 'silk', topic: 'materials', definition: 'a smooth, shiny material made by small insects', vi: 'lụa', icon: '🎎',
    example: 'Her áo dài is made of silk.', exampleVi: 'Chiếc áo dài của cô ấy làm bằng lụa.',
    situations: ['This scarf is very smooth and shiny, and it was made by tiny worms.', 'Van Phuc village near Hanoi is famous for making this soft, shiny material.', "The bride's áo dài was light, smooth and very shiny."] },
  { word: 'denim', topic: 'materials', definition: 'a thick, strong cotton material, usually blue, used for jeans', vi: 'vải bò, vải denim', icon: '👖',
    example: 'I love my old denim jacket.', exampleVi: 'Tôi rất thích chiếc áo khoác bò cũ của mình.',
    situations: ['My jeans and my blue jacket are both made of this thick, strong material.', 'This tough blue material is used to make jeans.', 'Workers in America wore trousers of this tough blue material in the 1800s.'] },
  { word: 'gold', topic: 'materials', definition: 'a valuable yellow metal used to make jewellery', vi: 'vàng', icon: '🥇',
    example: 'She wears a gold necklace.', exampleVi: 'Cô ấy đeo một sợi dây chuyền vàng.',
    situations: ["Grandma's ring is yellow, shiny and very expensive.", 'On the God of Wealth Day, many Vietnamese people buy this yellow metal for good luck.', 'The bride wore earrings and bracelets made of this expensive yellow metal.'] },
  // Patterns and styles
  { word: 'checked', topic: 'patterns-styles', definition: 'with a pattern of squares', vi: 'kẻ ô, kẻ ca-rô', icon: '🏁',
    example: "He's wearing a red and black checked shirt.", exampleVi: 'Anh ấy đang mặc áo sơ mi kẻ ca-rô đỏ đen.',
    situations: ['His shirt has a pattern of small red and white squares.', 'The tablecloth looks like a chessboard, with black and white squares.', 'Scottish kilts often have a pattern of coloured squares and lines.'] },
  { word: 'plain', topic: 'patterns-styles', definition: 'with no pattern, all one colour', vi: 'trơn, không họa tiết', icon: '⬜',
    example: 'I prefer plain T-shirts.', exampleVi: 'Tôi thích áo phông trơn hơn.',
    situations: ['My school shirt is all white, with no pictures, lines or spots.', 'She wants a dress in one colour only, with no flowers on it.', 'This black bag has no pattern at all.'] },
  { word: 'flowery', topic: 'patterns-styles', definition: 'with a pattern of flowers', vi: 'có họa tiết hoa', icon: '🌸',
    example: 'Mum bought a flowery dress for the summer.', exampleVi: 'Mẹ mua một chiếc váy hoa cho mùa hè.',
    situations: ['Her summer dress is covered in pink roses and yellow daisies.', "Grandma's blouse has small red and blue blossoms all over it.", "My aunt's áo dài has a pattern of white lotus flowers on it."] },
  { word: 'baggy', topic: 'patterns-styles', definition: 'very big and loose', vi: 'rộng thùng thình', icon: '🩳',
    example: 'Teenagers love baggy jeans.', exampleVi: 'Tuổi teen rất thích quần jeans ống rộng.',
    situations: ['These trousers are so big that I could fit two of me inside!', 'His T-shirt is three sizes too big and hangs down to his knees.', 'Hip-hop dancers often wear very wide, loose trousers.'] },
  { word: 'smart', topic: 'patterns-styles', definition: 'neat and right for an important event', vi: 'lịch sự, chỉnh tề', icon: '🤵',
    example: 'You look smart in that suit.', exampleVi: 'Trông bạn rất lịch sự trong bộ vest đó.',
    situations: ['For the job interview, Dad wore a dark suit, a white shirt and a tie.', 'Lan wore her best dress and shiny shoes for the prize-giving.', 'Everyone has to wear a jacket and tie at this expensive restaurant.'] },
  { word: 'casual', topic: 'patterns-styles', definition: 'comfortable and relaxed, not for special events', vi: 'thường ngày, giản dị', icon: '👟',
    example: 'At the weekend I wear casual clothes.', exampleVi: 'Cuối tuần tôi mặc quần áo thường ngày.',
    situations: ['On Saturdays I just wear jeans, a T-shirt and trainers.', 'Today there is no uniform at school, so we can wear our relaxed everyday clothes.', 'For the beach party, wear shorts and flip-flops. Nothing formal!'] },
  // Accessories
  { word: 'necklace', topic: 'accessories', definition: 'a piece of jewellery you wear around your neck', vi: 'vòng cổ, dây chuyền', icon: '📿',
    example: 'Grandma gave me a silver necklace.', exampleVi: 'Bà tặng tôi một sợi dây chuyền bạc.',
    situations: ['She wears a thin silver chain with a small heart around her neck.', "Mai's mother wears pearls around her neck at weddings.", 'The baby got a little gold chain for his neck as a present.'] },
  { word: 'earrings', topic: 'accessories', definition: 'pieces of jewellery you wear on your ears', vi: 'khuyên tai, bông tai', icon: '💎',
    example: 'Lan is wearing star-shaped earrings.', exampleVi: 'Lan đang đeo đôi bông tai hình ngôi sao.',
    situations: ['She has small pearls hanging from both ears.', 'My sister had her ears pierced and now she wears tiny gold stars in them.', 'He lost one of the little silver rings from his ear.'] },
  { word: 'bracelet', topic: 'accessories', definition: 'a piece of jewellery you wear around your wrist', vi: 'vòng tay', icon: '💍',
    example: 'She made a bracelet from coloured beads.', exampleVi: 'Cô ấy làm một chiếc vòng tay từ những hạt cườm nhiều màu.',
    situations: ['She wears a chain of colourful beads around her wrist.', 'Best friends sometimes make these from coloured string and wear them on their arm, just above the hand.', 'Grandma has a jade circle that she always wears on her left wrist.'] },
  { word: 'handbag', topic: 'accessories', definition: 'a small bag that women carry for their money, phone and keys', vi: 'túi xách', icon: '👜',
    example: 'Mum keeps her keys in her handbag.', exampleVi: 'Mẹ để chìa khóa trong túi xách.',
    situations: ['Mum carries her phone, wallet and keys in it on her shoulder.', 'My aunt has a small red one that goes with her shoes.', 'She opened it and took out her lipstick and a mirror.'] },
  { word: 'tie', topic: 'accessories', definition: 'a long piece of cloth men wear around the neck with a shirt', vi: 'cà vạt', icon: '👔',
    example: 'Dad wears a tie to work.', exampleVi: 'Bố đeo cà vạt khi đi làm.',
    situations: ['Dad puts this long, narrow piece of cloth under his shirt collar before work.', 'The boys in our school wear a red one with their white shirts on Mondays.', 'He made a knot in the long piece of cloth at his neck before the wedding.'] },
  { word: 'cap', topic: 'accessories', definition: 'a soft hat with a hard part at the front to keep the sun out of your eyes', vi: 'mũ lưỡi trai', icon: '🧢',
    example: 'Nam wears his cap backwards.', exampleVi: 'Nam đội mũ lưỡi trai ngược ra sau.',
    situations: ['The baseball player wears a soft hat with a peak to keep the sun out of his eyes.', 'Nam always wears his favourite soft hat backwards.', 'Our school gives every student a yellow soft hat with a peak for school trips.'] },
  // The fashion world
  { word: 'outfit', topic: 'fashion-world', definition: 'a set of clothes worn together', vi: 'bộ trang phục', icon: '👗',
    example: 'I love your outfit! Where did you buy it?', exampleVi: 'Mình thích bộ đồ của bạn quá! Bạn mua ở đâu thế?',
    situations: ['For the party, Lan put on her new white top, blue skirt and silver shoes: everything she was wearing was new.', 'I need to plan all the clothes I will wear for the school trip tomorrow, from my hat to my shoes.', 'The singer changed her clothes five times during the concert, each time from head to toe.'] },
  { word: 'brand', topic: 'fashion-world', definition: 'the name of a company that makes a product', vi: 'nhãn hiệu, thương hiệu', icon: '🏷️',
    example: 'Which brand of trainers do you like?', exampleVi: 'Bạn thích giày thể thao của hãng nào?',
    situations: ['Nike and Adidas are famous names for sports clothes.', "These trainers have the company's name and logo on the side.", 'Some people only buy clothes from expensive, famous companies.'] },
  { word: 'fashion show', topic: 'fashion-world', definition: 'an event where models walk and show new clothes', vi: 'buổi trình diễn thời trang', icon: '✨',
    example: 'We watched a fashion show in Ho Chi Minh City.', exampleVi: 'Chúng tôi đã xem một buổi trình diễn thời trang ở Thành phố Hồ Chí Minh.',
    situations: ['There is a long stage, loud music and lots of photographers. Everyone is watching the new summer clothes.', 'Designers in Paris show their new spring clothes to journalists at this event.', 'Our school had an event where students walked on a stage in clothes made from recycled bags.'] },
  { word: 'model', topic: 'fashion-world', definition: 'a person whose job is to wear clothes for photos or shows', vi: 'người mẫu', icon: '📸',
    example: 'She wants to be a model when she grows up.', exampleVi: 'Cô ấy muốn trở thành người mẫu khi lớn lên.',
    situations: ['Her job is to wear new clothes and smile for photographers.', "He is very tall and gets paid to walk on stage wearing designers' newest jackets.", 'Her face is in all the magazine adverts for the new perfume.'] },
  { word: 'dress up', topic: 'fashion-world', definition: 'put on special or nice clothes', vi: 'ăn diện, mặc đẹp', icon: '🎭',
    example: 'We dress up for Tết.', exampleVi: 'Chúng tôi diện quần áo đẹp vào dịp Tết.',
    situations: ['On the first day of Tết, everyone in my family puts on their best new clothes.', 'For Halloween, the children put on costumes and became witches and ghosts.', 'Mum put on her nicest dress and high heels for the wedding.'] },
  { word: 'match', topic: 'fashion-world', definition: 'look good together, for example colours or clothes', vi: 'hợp với, ăn nhập với', icon: '🎨',
    example: 'Your bag matches your shoes.', exampleVi: 'Túi của bạn hợp với giày đấy.',
    situations: ['Her red bag and her red shoes look great together.', 'Does this green tie look good with my blue shirt?', "I can't wear these socks together: one is yellow and one is pink!"] },
];
