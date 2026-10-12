import type { VocabWord } from '../shared';

/** Unit 31: owners with their possessive form and wrong forms. Names only for singular, so no distractor is a real plural possessive. */
export const OWNERS = [
  { owner: 'Lan', poss: "Lan's", wrong: ['Lans', 'Lan', "Lans'"] }, { owner: 'Minh', poss: "Minh's", wrong: ['Minhs', 'Minh', "Minhs'"] },
  { owner: 'Hoa', poss: "Hoa's", wrong: ['Hoas', 'Hoa', "Hoas'"] }, { owner: 'Tuan', poss: "Tuan's", wrong: ['Tuans', 'Tuan', "Tuans'"] },
  { owner: 'Mai', poss: "Mai's", wrong: ['Mais', 'Mai', "Mais'"] }, { owner: 'Nam', poss: "Nam's", wrong: ['Nams', 'Nam', "Nams'"] },
  { owner: 'my parents', poss: "my parents'", wrong: ["my parent's", "my parents's", 'my parents'] },
  { owner: 'the girls', poss: "the girls'", wrong: ["the girl's's", "the girls's", 'the girls'] },
  { owner: 'my grandparents', poss: "my grandparents'", wrong: ["my grandparent's", "my grandparents's", 'my grandparents'] },
  { owner: 'the children', poss: "the children's", wrong: ["the childrens'", 'the childrens', 'the children'] },
  { owner: 'the women', poss: "the women's", wrong: ["the womens'", 'the womens', 'the women'] },
  { owner: 'the men', poss: "the men's", wrong: ["the mens'", 'the mens', 'the men'] },
] as const;
export const OWNED = ['bag', 'bike', 'room', 'kite', 'camera', 'umbrella', 'tablet', 'football'] as const;

/** Unit 32: personal pronoun table. */
export const PRONOUNS = [
  { subject: 'I', object: 'me', adj: 'my', pron: 'mine', objWrong: ['I', 'my', 'mine'], adjWrong: ['me', 'mine', 'I'], pronWrong: ['my', 'me', 'I'] },
  { subject: 'you', object: 'you', adj: 'your', pron: 'yours', objWrong: ['your', 'yours', "you're"], adjWrong: ['you', 'yours', "you're"], pronWrong: ['your', 'you', "your's"] },
  { subject: 'he', object: 'him', adj: 'his', pron: 'his', objWrong: ['he', 'his', "he's"], adjWrong: ['he', 'him', "he's"], pronWrong: ['him', 'he', "he's"] },
  { subject: 'she', object: 'her', adj: 'her', pron: 'hers', objWrong: ['she', 'hers', "she's"], adjWrong: ['she', 'hers', "she's"], pronWrong: ['her', 'she', "her's"] },
  { subject: 'we', object: 'us', adj: 'our', pron: 'ours', objWrong: ['we', 'our', 'ours'], adjWrong: ['us', 'ours', 'we'], pronWrong: ['our', 'us', "our's"] },
  { subject: 'they', object: 'them', adj: 'their', pron: 'theirs', objWrong: ['they', 'their', 'theirs'], adjWrong: ['them', 'theirs', "they're"], pronWrong: ['their', 'them', "their's"] },
] as const;
/** Unit 32: sentences with an object pronoun gap. */
export const OBJECT_FRAMES = [
  'Can you help ___, please?', 'Mum is waiting for ___ at the gate.', 'Our teacher gave ___ a lot of homework.', 'Grandma always tells ___ funny stories.',
  'Nam saw ___ at the cinema yesterday.', 'Please come to the party with ___.', 'The dog is running after ___!', 'Lan sent ___ a postcard from Hue.',
] as const;
/** Unit 32: things for possessive adjective and pronoun sentences. */
export const BELONGINGS = ['bike', 'pencil case', 'jacket', 'phone', 'backpack', 'skateboard', 'water bottle', 'scarf'] as const;
/** Unit 32: its (not it's) with animals and things. [sentence with ___, key] */
export const ITS_ITEMS = [
  ['The cat is washing ___ face.', 'cat'], ['The bird built ___ nest in our tree.', 'bird'], ['The dog is wagging ___ tail.', 'dog'],
  ['Our school is famous for ___ big garden.', 'school'], ['The tree has lost all ___ leaves.', 'tree'], ['The baby elephant stayed close to ___ mother.', 'elephant'],
  ['This phone is old. ___ screen is broken.', 'phone'], ['Hanoi is famous for ___ street food.', 'Hanoi'], ['The company changed ___ name.', 'company'],
  ['The horse hurt ___ leg.', 'horse'], ['The car has lost one of ___ wheels.', 'car'], ['The snake is shedding ___ skin.', 'snake'],
] as const;

/** Unit 33 Clothes and fashion. */
export const CLOTHES_WORDS: readonly VocabWord[] = [
  // Clothes
  { word: 'hoodie', topic: 'clothes', definition: 'a soft top with a hood for your head', vi: 'áo hoodie (áo nỉ có mũ)', icon: '🧥',
    example: 'I wear my hoodie when it\'s cool.', exampleVi: 'Tôi mặc áo hoodie khi trời mát.',
    situations: ['It is a soft, warm top, and you can pull the back part over your head.', 'Nam pulled the hood over his head when it started to rain.', 'It\'s a comfortable top with a pocket in front and a hood.'] },
  { word: 'sweater', topic: 'clothes', definition: 'a warm knitted top with long sleeves', vi: 'áo len', icon: '🧶',
    example: 'Grandma knitted me a red sweater.', exampleVi: 'Bà đan cho tôi một chiếc áo len đỏ.',
    situations: ['Grandma made this warm top for me with wool.', 'In winter, I wear this warm wool top over my T-shirt.', 'It is thick, made of wool and has long sleeves.'] },
  { word: 'jeans', topic: 'clothes', definition: 'trousers made of strong blue cotton', vi: 'quần bò, quần jean', icon: '👖',
    example: 'He is wearing jeans and a T-shirt.', exampleVi: 'Anh ấy mặc quần bò và áo phông.',
    situations: ['These strong blue trousers are perfect for the weekend.', 'Many people wear blue denim trousers every day.', 'My blue cotton trousers have a hole in the knee.'] },
  { word: 'tracksuit', topic: 'clothes', definition: 'a soft jacket and trousers for sport', vi: 'bộ đồ thể thao', icon: '🏃',
    example: 'We wear a tracksuit for PE.', exampleVi: 'Chúng tôi mặc đồ thể thao trong giờ thể dục.',
    situations: ['For PE, we wear a matching sports jacket and trousers.', 'The runner wears a soft jacket and trousers to warm up.', 'Our football team has a blue sports jacket and trousers.'] },
  { word: 'raincoat', topic: 'clothes', definition: 'a coat that keeps you dry in the rain', vi: 'áo mưa', icon: '🌧️',
    example: 'Take your raincoat. It\'s going to rain.', exampleVi: 'Mang áo mưa đi. Trời sắp mưa đấy.',
    situations: ['It\'s raining heavily, so put on this coat to stay dry.', 'Riding a motorbike in the rain, Dad wears a long plastic coat.', 'This coat doesn\'t let water in.'] },
  { word: 'pyjamas', topic: 'clothes', definition: 'soft clothes you wear in bed', vi: 'bộ đồ ngủ', icon: '😴',
    example: 'Put on your pyjamas and go to bed.', exampleVi: 'Mặc đồ ngủ vào rồi đi ngủ.',
    situations: ['At 9 pm, I take off my clothes and put these on for bed.', 'These soft clothes have little stars on them, and I sleep in them.', 'It\'s bedtime. Brush your teeth and change your clothes.'] },
  // Shoes and accessories
  { word: 'scarf', topic: 'shoes-accessories', definition: 'a long piece of cloth you wear around your neck', vi: 'khăn quàng cổ', icon: '🧣',
    example: 'Wear a scarf. It\'s cold.', exampleVi: 'Quàng khăn vào. Trời lạnh đấy.',
    situations: ['It\'s cold and windy, so Mai puts this round her neck.', 'This long, warm piece of wool keeps your neck warm.', 'The football fans wear long pieces of cloth around their necks in the team colours.'] },
  { word: 'gloves', topic: 'shoes-accessories', definition: 'things you wear on your hands to keep them warm', vi: 'găng tay', icon: '🧤',
    example: 'My hands are cold. Where are my gloves?', exampleVi: 'Tay tôi lạnh. Găng tay của tôi đâu rồi?',
    situations: ['My fingers are freezing. I need something warm for my hands.', 'The doctor wears thin plastic ones on her hands.', 'They have five fingers and keep your hands warm in winter.'] },
  { word: 'belt', topic: 'shoes-accessories', definition: 'a long strip you wear around your waist', vi: 'thắt lưng', icon: '🪢',
    example: 'These trousers are too big. I need a belt.', exampleVi: 'Quần này rộng quá. Tôi cần thắt lưng.',
    situations: ['My trousers keep falling down! I need something round my waist.', 'Dad wears a brown leather strip round his waist.', 'It goes through the loops on your jeans.'] },
  { word: 'sunglasses', topic: 'shoes-accessories', definition: 'dark glasses that protect your eyes from the sun', vi: 'kính râm', icon: '🕶️',
    example: 'Don\'t forget your sunglasses at the beach.', exampleVi: 'Đừng quên kính râm khi đi biển.',
    situations: ['The sun is very bright, so I wear dark glasses.', 'At the beach, everyone protects their eyes with dark lenses.', 'The film star wore dark glasses so nobody knew him.'] },
  { word: 'trainers', topic: 'shoes-accessories', definition: 'soft shoes for sport', vi: 'giày thể thao', icon: '👟',
    example: 'I need new trainers for running.', exampleVi: 'Tôi cần giày thể thao mới để chạy bộ.',
    situations: ['I wear these soft shoes when I play football or go running.', 'My sports shoes have white laces and a red logo.', 'You can\'t wear school shoes for PE. You need sports shoes.'] },
  { word: 'boots', topic: 'shoes-accessories', definition: 'strong shoes that cover your foot and part of your leg', vi: 'giày ống, bốt', icon: '👢',
    example: 'Wear boots when you walk in the mud.', exampleVi: 'Đi bốt khi đi trên bùn.',
    situations: ['The farmer wears tall rubber shoes to walk in the wet field.', 'These shoes come up to my knees and keep my legs dry in the snow.', 'In the muddy forest, we wore tall, strong shoes.'] },
  // Describing clothes
  { word: 'striped', topic: 'describing-clothes', definition: 'with lines of different colours', vi: 'có sọc', icon: '🦓',
    example: 'He is wearing a blue and white striped shirt.', exampleVi: 'Anh ấy mặc áo sơ mi sọc xanh trắng.',
    situations: ['My T-shirt has red and white lines across it, like a zebra.', 'The sailor\'s shirt has blue and white lines.', 'The football shirt has black and white lines from top to bottom.'] },
  { word: 'spotted', topic: 'describing-clothes', definition: 'with lots of round dots', vi: 'có chấm bi', icon: '🐞',
    example: 'She has a red spotted dress.', exampleVi: 'Cô ấy có chiếc váy đỏ chấm bi.',
    situations: ['My dress is red with lots of little white dots, like a ladybird.', 'The scarf is blue with small round yellow circles all over it.', 'Her socks have lots of tiny pink dots.'] },
  { word: 'tight', topic: 'describing-clothes', definition: 'too small, pressing on your body', vi: 'chật, bó', icon: '🗜️',
    example: 'These jeans are too tight. I need a bigger size.', exampleVi: 'Quần bò này chật quá. Tôi cần cỡ lớn hơn.',
    situations: ['I can\'t close the button on these trousers. They are too small.', 'My old shoes hurt my feet because they are too small now.', 'This T-shirt is so small that I can hardly move my arms.'] },
  { word: 'loose', topic: 'describing-clothes', definition: 'big and not close to your body', vi: 'rộng, thùng thình', icon: '🎈',
    example: 'I like wearing loose clothes in summer.', exampleVi: 'Tôi thích mặc đồ rộng vào mùa hè.',
    situations: ['Dad\'s T-shirt is so big on me that it looks like a dress.', 'These trousers are big and comfortable, and the air goes through them.', 'My shoes keep falling off because they are too big.'] },
  { word: 'fashionable', topic: 'describing-clothes', definition: 'popular and modern right now', vi: 'hợp thời trang', icon: '💃',
    example: 'Short jackets are fashionable this year.', exampleVi: 'Áo khoác ngắn đang hợp mốt năm nay.',
    situations: ['Everyone wants these new shoes this year. They are very popular.', 'My sister always wears the newest styles from the magazines.', 'This kind of bag is very modern and popular right now.'] },
  { word: 'comfortable', topic: 'describing-clothes', definition: 'nice and soft to wear', vi: 'thoải mái, dễ chịu', icon: '🛋️',
    example: 'These trainers are very comfortable.', exampleVi: 'Đôi giày thể thao này rất thoải mái.',
    situations: ['These shoes are so soft that I can walk all day in them.', 'I wear this soft, easy T-shirt at home.', 'The pyjamas feel nice and soft, so I sleep well.'] },
  // Clothes verbs
  { word: 'put on', topic: 'clothes-verbs', definition: 'start wearing clothes', vi: 'mặc vào, đội, đeo vào', icon: '👕',
    example: 'Put on your coat. It\'s cold outside.', exampleVi: 'Mặc áo khoác vào. Ngoài trời lạnh đấy.',
    situations: ['It\'s cold, so Nam takes his jacket and starts wearing it.', 'Before she goes out, Mai gets her hat and places it on her head.', 'The firefighter quickly gets into his special clothes.'] },
  { word: 'take off', topic: 'clothes-verbs', definition: 'remove clothes from your body', vi: 'cởi ra', icon: '👞',
    example: 'Please take off your shoes before you come in.', exampleVi: 'Vui lòng cởi giày trước khi vào nhà.',
    situations: ['In a Vietnamese home, we remove our shoes at the door.', 'It\'s hot, so Lan removes her sweater.', 'After the match, the players remove their wet shirts.'] },
  { word: 'get dressed', topic: 'clothes-verbs', definition: 'put on all your clothes', vi: 'mặc quần áo', icon: '🧑‍🎓',
    example: 'I get up, wash my face and get dressed.', exampleVi: 'Tôi thức dậy, rửa mặt và mặc quần áo.',
    situations: ['Hurry up! Take off your pyjamas and put on your school uniform.', 'Every morning, after his shower, Nam puts on his clothes.', 'The baby can\'t put on her clothes alone. Mum helps her.'] },
  { word: 'wear', topic: 'clothes-verbs', definition: 'have clothes on your body', vi: 'mặc, đội, đeo', icon: '👔',
    example: 'We wear a uniform at school.', exampleVi: 'Chúng tôi mặc đồng phục ở trường.',
    situations: ['Every day at school, we have a white shirt and blue trousers on.', 'Grandpa always has a hat on his head when he goes out.', 'At the wedding, the bride has a long white dress on.'] },
  { word: 'fit', topic: 'clothes-verbs', definition: 'be the right size for you', vi: 'vừa (kích cỡ)', icon: '📐',
    example: 'These shoes don\'t fit. They\'re too small.', exampleVi: 'Đôi giày này không vừa. Nó nhỏ quá.',
    situations: ['The trousers aren\'t too big or too small. They are the right size.', 'I can\'t wear last year\'s shoes because my feet are bigger now.', 'This jacket is perfect: the arms are exactly the right length.'] },
  { word: 'suit', topic: 'clothes-verbs', definition: 'look good on someone', vi: 'hợp với, trông đẹp khi mặc', icon: '✨',
    example: 'That colour really suits you!', exampleVi: 'Màu đó rất hợp với bạn!',
    situations: ['You look great in that green dress. The colour is perfect for you.', 'Short hair looks really good on Mai.', 'Dad looks very smart in a dark jacket. It is perfect for him.'] },
];
