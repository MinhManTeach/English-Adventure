import type { VocabWord } from '../shared';

/**
 * Unit 43 (A2 Unit 1): routines with a tricky he/she spelling. Each verb keeps its own natural time phrase
 * and two misspelt third-person forms.
 */
export const ROUTINES = [
  { base: 'watch', third: 'watches', obj: 'the news', time: 'every evening', wrong: ['watchs', 'watchies'] },
  { base: 'study', third: 'studies', obj: 'Maths with a tutor', time: 'on Saturdays', wrong: ['studys', 'studyes'] },
  { base: 'fix', third: 'fixes', obj: 'old bikes', time: 'at weekends', wrong: ['fixs', 'fixies'] },
  { base: 'go', third: 'goes', obj: 'swimming', time: 'twice a week', wrong: ['gos', 'goies'] },
  { base: 'do', third: 'does', obj: 'karate', time: 'on Sundays', wrong: ['dos', 'doies'] },
  { base: 'have', third: 'has', obj: 'a shower', time: 'before bed', wrong: ['haves', 'hass'] },
  { base: 'catch', third: 'catches', obj: 'the early bus', time: 'every morning', wrong: ['catchs', 'catchies'] },
  { base: 'carry', third: 'carries', obj: 'a heavy school bag', time: 'every day', wrong: ['carrys', 'carryes'] },
  { base: 'tidy', third: 'tidies', obj: 'the living room', time: 'after dinner', wrong: ['tidys', 'tidyes'] },
  { base: 'finish', third: 'finishes', obj: 'homework early', time: 'on Fridays', wrong: ['finishs', 'finishies'] },
  { base: 'play', third: 'plays', obj: 'the guitar', time: 'after school', wrong: ['plaies', 'playes'] },
  { base: 'buy', third: 'buys', obj: 'bread at the bakery', time: 'every morning', wrong: ['buies', 'buyes'] },
  { base: 'worry', third: 'worries', obj: 'about tests', time: 'all the time', wrong: ['worrys', 'worryes'] },
  { base: 'relax', third: 'relaxes', obj: 'in the garden', time: 'on Sunday afternoons', wrong: ['relaxs', 'relaxies'] },
  { base: 'wash', third: 'washes', obj: 'the family car', time: 'once a month', wrong: ['washs', 'washies'] },
  { base: 'fly', third: 'flies', obj: 'a kite on the beach', time: 'in summer', wrong: ['flys', 'flyes'] },
] as const;

/** Unit 43: frequency adverbs, and states that go with be. */
export const ADVERBS = ['always', 'usually', 'often', 'sometimes', 'never'] as const;
export const BE_STATES = [
  'late for school', 'tired on Monday mornings', 'hungry after PE', 'busy at weekends', 'nervous before tests',
  'happy at Tết', 'at home on Sunday evenings', 'quiet in class', 'in bed before ten', 'sleepy after lunch',
  'cold in the winter', 'kind to new students',
] as const;

/** Unit 43: there is / there are. plural = countable plural noun; otherwise uncountable. */
export const THERE_ITEMS = [
  { noun: 'milk', plural: false, place: 'in the fridge' }, { noun: 'eggs', plural: true, place: 'in the fridge' },
  { noun: 'rice', plural: false, place: 'in the rice cooker' }, { noun: 'students', plural: true, place: 'in the library' },
  { noun: 'water', plural: false, place: 'in the bottle' }, { noun: 'chairs', plural: true, place: 'in the classroom' },
  { noun: 'bread', plural: false, place: 'on the table' }, { noun: 'books', plural: true, place: 'on the shelf' },
  { noun: 'traffic', plural: false, place: 'on the road' }, { noun: 'shops', plural: true, place: 'near my house' },
  { noun: 'homework', plural: false, place: 'for tomorrow' }, { noun: 'tourists', plural: true, place: 'in Hoi An today' },
  { noun: 'money', plural: false, place: 'in my wallet' }, { noun: 'trees', plural: true, place: 'in the schoolyard' },
  { noun: 'information', plural: false, place: 'on the website' }, { noun: 'posters', plural: true, place: 'on the wall' },
  { noun: 'juice', plural: false, place: 'in the jug' }, { noun: 'bananas', plural: true, place: 'in the basket' },
  { noun: 'furniture', plural: false, place: 'in the new flat' }, { noun: 'buses', plural: true, place: 'to the airport' },
] as const;

/** Unit 44: -ing spelling with two misspellings each. */
export const ING_VERBS = [
  { base: 'lie', ing: 'lying', obj: 'on the sofa', wrong: ['lieing', 'liing'] },
  { base: 'swim', ing: 'swimming', obj: 'in the pool', wrong: ['swiming', 'swimeing'] },
  { base: 'write', ing: 'writing', obj: 'an email', wrong: ['writeing', 'writting'] },
  { base: 'get', ing: 'getting', obj: 'ready for school', wrong: ['geting', 'getteing'] },
  { base: 'make', ing: 'making', obj: 'spring rolls', wrong: ['makeing', 'makking'] },
  { base: 'sit', ing: 'sitting', obj: 'next to the window', wrong: ['siting', 'sitteing'] },
  { base: 'plan', ing: 'planning', obj: 'a trip to Da Lat', wrong: ['planing', 'planeing'] },
  { base: 'dance', ing: 'dancing', obj: 'to K-pop music', wrong: ['danceing', 'dansing'] },
  { base: 'run', ing: 'running', obj: 'in the park', wrong: ['runing', 'runeing'] },
  { base: 'shop', ing: 'shopping', obj: 'at Ben Thanh Market', wrong: ['shoping', 'shopeing'] },
  { base: 'come', ing: 'coming', obj: 'home by bus', wrong: ['comeing', 'comming'] },
  { base: 'have', ing: 'having', obj: 'breakfast', wrong: ['haveing', 'havving'] },
  { base: 'take', ing: 'taking', obj: 'photos of the lake', wrong: ['takeing', 'takking'] },
  { base: 'study', ing: 'studying', obj: 'for the exam', wrong: ['studing', 'studiing'] },
  { base: 'chat', ing: 'chatting', obj: 'with friends online', wrong: ['chating', 'chateing'] },
  { base: 'ride', ing: 'riding', obj: 'a bike to school', wrong: ['rideing', 'ridding'] },
] as const;
export const NOW_WORDS = ['now', 'at the moment', 'right now'] as const;

/** Unit 44: a usual habit and a temporary change, using the same verb. */
export const TEMPORARY = [
  { base: 'have', third: 'has', ing: 'having', usual: 'lunch at school', temp: 'lunch at home', marker: 'this week' },
  { base: 'go', third: 'goes', ing: 'going', usual: 'to school by bike', temp: 'to school by bus', marker: 'this week' },
  { base: 'sleep', third: 'sleeps', ing: 'sleeping', usual: 'in the bedroom', temp: 'on the sofa', marker: 'this week' },
  { base: 'stay', third: 'stays', ing: 'staying', usual: 'at home in the summer', temp: 'with Grandma in Hue', marker: 'this month' },
  { base: 'wear', third: 'wears', ing: 'wearing', usual: 'a school uniform', temp: 'sports clothes', marker: 'this week' },
  { base: 'study', third: 'studies', ing: 'studying', usual: 'in the library', temp: 'at home', marker: 'these days' },
  { base: 'eat', third: 'eats', ing: 'eating', usual: 'a lot of meat', temp: 'only vegetables', marker: 'this week' },
  { base: 'play', third: 'plays', ing: 'playing', usual: 'football after school', temp: 'badminton after school', marker: 'this term' },
  { base: 'watch', third: 'watches', ing: 'watching', usual: 'cartoons in the evening', temp: 'the World Cup in the evening', marker: 'this month' },
  { base: 'drink', third: 'drinks', ing: 'drinking', usual: 'milk tea', temp: 'only water', marker: 'these days' },
  { base: 'read', third: 'reads', ing: 'reading', usual: 'comics', temp: 'a long novel', marker: 'at the moment' },
  { base: 'get up', third: 'gets up', ing: 'getting up', usual: 'at seven', temp: 'at five', marker: 'this week' },
  { base: 'learn', third: 'learns', ing: 'learning', usual: 'the piano', temp: 'the guitar', marker: 'this year' },
  { base: 'walk', third: 'walks', ing: 'walking', usual: 'to the market', temp: 'to the supermarket', marker: 'these days' },
] as const;

/** Unit 44: state verbs that stay in the simple form. */
export const STATE_VERBS = [
  { base: 'own', third: 'owns', ing: 'owning', obj: 'two bikes', vi: 'sở hữu' },
  { base: 'belong', third: 'belongs', ing: 'belonging', obj: 'to the school chess club', vi: 'thuộc về' },
  { base: 'agree', third: 'agrees', ing: 'agreeing', obj: 'with the teacher', vi: 'đồng ý' },
  { base: 'recognise', third: 'recognises', ing: 'recognising', obj: 'that song', vi: 'nhận ra' },
  { base: 'deserve', third: 'deserves', ing: 'deserving', obj: 'a prize', vi: 'xứng đáng' },
  { base: 'hear', third: 'hears', ing: 'hearing', obj: 'the rain on the roof', vi: 'nghe thấy' },
  { base: 'know', third: 'knows', ing: 'knowing', obj: 'the way to the station', vi: 'biết' },
  { base: 'understand', third: 'understands', ing: 'understanding', obj: 'the new lesson', vi: 'hiểu' },
  { base: 'want', third: 'wants', ing: 'wanting', obj: 'a pet rabbit', vi: 'muốn' },
  { base: 'need', third: 'needs', ing: 'needing', obj: 'help with this exercise', vi: 'cần' },
  { base: 'prefer', third: 'prefers', ing: 'preferring', obj: 'green tea to coffee', vi: 'thích hơn' },
  { base: 'remember', third: 'remembers', ing: 'remembering', obj: 'the name of our first teacher', vi: 'nhớ' },
] as const;

/**
 * Unit 44: verbs with a state meaning (simple) and an action meaning (continuous).
 * [sentence with ___, answer, three wrong choices, meaning note]
 */
export const TWO_MEANINGS = [
  ['I ___ this film is boring.', 'think', ['am thinking', 'thinks', 'thinking'], 'think = have an opinion (state)'],
  ['Shh! Dad ___ about the problem right now.', 'is thinking', ['thinks', 'think', 'is think'], 'think about = use your mind now (action)'],
  ['Nam ___ a big family.', 'has', ['is having', 'have', 'having'], 'have = own, possess (state)'],
  ['Nam can\'t come to the phone. He ___ a shower.', 'is having', ['has', 'have', 'is have'], 'have a shower = an activity (action)'],
  ['This soup ___ delicious.', 'tastes', ['is tasting', 'taste', 'tasting'], 'taste = have a flavour (state)'],
  ['Look! Mum ___ the soup to check the salt.', 'is tasting', ['tastes', 'taste', 'is taste'], 'taste = try the flavour now (action)'],
  ['Oh, I ___ what you mean now.', 'see', ['am seeing', 'sees', 'seeing'], 'see = understand (state)'],
  ['Right now, Lan ___ about her trip to Da Nang.', 'is thinking', ['thinks', 'think', 'thinking'], 'think about = use your mind now (action)'],
  ['We ___ a great time at the beach right now!', 'are having', ['have', 'has', 'are have'], 'have a good time = an experience now (action)'],
  ['Grandpa ___ two cats and a dog.', 'has', ['is having', 'have', 'are having'], 'have = own, possess (state)'],
  ['What do you ___ of my new haircut?', 'think', ['thinking', 'thinks', 'thought of'], 'think of = have an opinion (state)'],
  ['The children ___ lunch in the canteen at the moment.', 'are having', ['have', 'has', 'are have'], 'have lunch = eat, an activity (action)'],
  ['These flowers ___ wonderful.', 'smell', ['are smelling', 'smells', 'smelling'], 'smell = have a smell (state)'],
  ['My grandparents ___ that Tết is the best time of the year.', 'think', ['are thinking', 'thinks', 'thinking'], 'think = have an opinion (state)'],
] as const;

/** Unit 45 (A2 Unit 3) Family and friends. */
export const FAMILY_FRIENDS_WORDS: readonly VocabWord[] = [
  // Family relations
  { word: 'twin', topic: 'family-relations', definition: 'one of two children born to the same mother at the same time', vi: 'anh/chị/em sinh đôi', icon: '👯',
    example: 'Mai and Lan are twins, so they have the same birthday.', exampleVi: 'Mai và Lan là chị em sinh đôi nên có cùng ngày sinh nhật.',
    situations: ['Nam and his brother were born on the same day, ten minutes apart.', 'People often mix up Hoa and her sister because they look exactly the same and are the same age.', 'Mrs Thu had two babies at the same time last year.'] },
  { word: 'only child', topic: 'family-relations', definition: 'a child who has no brothers or sisters', vi: 'con một', icon: '🧒',
    example: 'I am an only child, so I sometimes feel lonely at home.', exampleVi: 'Tôi là con một nên đôi khi thấy cô đơn ở nhà.',
    situations: ['Minh has no brothers or sisters.', 'Lan\'s parents have just one child: Lan.', 'When I was small, I had no brother or sister to play with at home.'] },
  { word: 'stepfather', topic: 'family-relations', definition: 'the man who is married to your mother but is not your real father', vi: 'bố dượng', icon: '👨',
    example: 'My stepfather is very kind to me and my mum.', exampleVi: 'Bố dượng tôi rất tốt với tôi và mẹ.',
    situations: ['After my parents divorced, Mum married Mr Quang. Now he lives with us.', 'Ha\'s mum has a new husband, and Ha calls him "Uncle Tung".', 'He isn\'t my real dad, but he married my mum when I was five.'] },
  { word: 'stepsister', topic: 'family-relations', definition: 'the daughter of your stepfather or stepmother', vi: 'chị/em gái kế (con riêng của bố dượng hoặc mẹ kế)', icon: '👧',
    example: 'My stepsister and I share a bedroom.', exampleVi: 'Tôi và em gái kế ở chung một phòng.',
    situations: ['Dad married again, and his new wife has a daughter called Linh. Now Linh lives with us.', 'She isn\'t my real sister. Her mum is married to my dad.', 'When my mum married Mr Bao, his daughter became part of our family.'] },
  { word: 'great-grandmother', topic: 'family-relations', definition: 'the mother of your grandmother or grandfather', vi: 'cụ bà', icon: '👵',
    example: 'My great-grandmother is ninety-five years old.', exampleVi: 'Cụ bà của tôi đã chín mươi lăm tuổi.',
    situations: ['Grandma\'s mother is still alive. She is 96!', 'At Tết, we visit Grandpa\'s mother. She is the oldest person in our family.', 'In the old photo, a woman is holding my grandma as a baby. She is Grandma\'s mum.'] },
  { word: 'generation', topic: 'family-relations', definition: 'all the people in a family or society born at about the same time', vi: 'thế hệ', icon: '👪',
    example: 'Three generations live in our house: my grandparents, my parents and us.', exampleVi: 'Ba thế hệ sống trong nhà tôi: ông bà, bố mẹ và chúng tôi.',
    situations: ['Grandparents are one age group, parents are the next, and children are the next.', 'Young people today use phones much more than people of my parents\' age.', 'My grandparents, my parents and I all live in one house, so there are three age groups at home.'] },
  // Life events
  { word: 'be born', topic: 'life-events', definition: 'start your life and come into the world', vi: 'được sinh ra', icon: '👶',
    example: 'I was born in Hai Phong in 2012.', exampleVi: 'Tôi sinh ra ở Hải Phòng năm 2012.',
    situations: ['My little brother arrived in the world on 3 May at six in the morning.', 'Grandpa started his life in a small village near Hue in 1950.', 'The baby came into the world at the hospital last night.'] },
  { word: 'grow up', topic: 'life-events', definition: 'change from a child into an adult', vi: 'lớn lên', icon: '🌱',
    example: 'My mum grew up in a small village in Nam Dinh.', exampleVi: 'Mẹ tôi lớn lên ở một ngôi làng nhỏ ở Nam Định.',
    situations: ['Dad spent his childhood in Can Tho and became an adult there.', 'Nam was a small boy in Da Nang, and now he is a young man.', 'Children change so fast! Your son is taller than you now.'] },
  { word: 'get married', topic: 'life-events', definition: 'become husband and wife', vi: 'kết hôn', icon: '💍',
    example: 'My aunt got married last spring.', exampleVi: 'Dì tôi kết hôn vào mùa xuân năm ngoái.',
    situations: ['My cousin and her boyfriend became husband and wife last Sunday.', 'My parents met at university and became husband and wife two years later.', 'Ms Hoa isn\'t single any more. She has a husband now.'] },
  { word: 'wedding', topic: 'life-events', definition: 'the ceremony and party when two people become husband and wife', vi: 'đám cưới', icon: '💒',
    example: 'We went to my cousin\'s wedding in Ha Noi.', exampleVi: 'Chúng tôi đi dự đám cưới của anh họ ở Hà Nội.',
    situations: ['The bride wore a red áo dài, and there were three hundred guests at the party.', 'There was a big party with music, flowers and a beautiful cake for the new husband and wife.', 'We gave the happy couple some money in a red envelope at their big celebration.'] },
  { word: 'anniversary', topic: 'life-events', definition: 'the same date each year when something important happened', vi: 'ngày kỷ niệm', icon: '🎉',
    example: 'My parents go out for dinner on their wedding anniversary.', exampleVi: 'Bố mẹ tôi đi ăn tối vào ngày kỷ niệm cưới.',
    situations: ['Every year on the day they first met, my parents have a special dinner.', 'Our school opened on 5 September 1990, so every 5 September we have a party.', 'It\'s exactly ten years since Grandpa opened his shop. Let\'s celebrate today!'] },
  { word: 'move house', topic: 'life-events', definition: 'go to live in a different home', vi: 'chuyển nhà', icon: '🚚',
    example: 'We moved house last year, so I changed schools.', exampleVi: 'Năm ngoái nhà tôi chuyển nhà nên tôi chuyển trường.',
    situations: ['We packed everything into boxes and went to live in a new flat in District 7.', 'Our old flat was too small, so last month we went to live in a bigger one.', 'A big truck took all our furniture to our new home.'] },
  // Family verbs
  { word: 'look after', topic: 'family-verbs', definition: 'take care of someone or something', vi: 'chăm sóc', icon: '🤲',
    example: 'I look after my little sister when Mum is at work.', exampleVi: 'Tôi trông em gái khi mẹ đi làm.',
    situations: ['When Mum is busy, Lan gives her baby brother his milk and plays with him.', 'Can you feed my cat and give it water while I\'m on holiday?', 'Grandma is ill, so Dad stays with her and takes her to the doctor.'] },
  { word: 'take after', topic: 'family-verbs', definition: 'look or behave like an older member of your family', vi: 'giống (người lớn trong gia đình)', icon: '🧬',
    example: 'Minh takes after his dad. They are both tall and quiet.', exampleVi: 'Minh giống bố. Cả hai đều cao và ít nói.',
    situations: ['Nam is very good at music, just like his grandfather was.', 'Hoa has her mother\'s big brown eyes and kind smile.', 'Everyone says my little brother is exactly like Dad: he loves football and talks a lot.'] },
  { word: 'get together', topic: 'family-verbs', definition: 'meet as a group, usually for fun', vi: 'tụ họp', icon: '🫂',
    example: 'Our whole family gets together at Tết.', exampleVi: 'Cả đại gia đình tôi tụ họp vào dịp Tết.',
    situations: ['Every Sunday, all my cousins meet at Grandma\'s house for lunch.', 'At New Year, all our relatives come to one house to eat and talk.', 'My mum\'s old classmates meet once a year to have dinner together.'] },
  { word: 'argue', topic: 'family-verbs', definition: 'speak angrily to someone because you do not agree', vi: 'cãi nhau', icon: '😠',
    example: 'My brother and I sometimes argue about the TV.', exampleVi: 'Anh trai và tôi thỉnh thoảng cãi nhau vì cái ti vi.',
    situations: ['Lan and her sister are shouting because they both want the bigger room.', 'My parents don\'t agree about where to go on holiday, and they are talking in angry voices.', 'The two boys said angry words to each other about the football score.'] },
  { word: 'apologise', topic: 'family-verbs', definition: 'say that you are sorry', vi: 'xin lỗi', icon: '🙏',
    example: 'Nam apologised for breaking my pen.', exampleVi: 'Nam đã xin lỗi vì làm gãy bút của tôi.',
    situations: ['I broke Mai\'s ruler, so I said, "I\'m really sorry."', 'Minh was late, so he told the teacher he was sorry.', 'After shouting at me, my brother came to my room and said sorry.'] },
  { word: 'support', topic: 'family-verbs', definition: 'help and encourage someone', vi: 'ủng hộ, động viên', icon: '🤝',
    example: 'My parents always support me when I have exams.', exampleVi: 'Bố mẹ luôn động viên tôi mỗi khi tôi đi thi.',
    situations: ['Before my exam, my whole family said, "You can do it! We believe in you."', 'When I wanted to join the art club, Dad helped me and said it was a great idea.', 'My friends came to every match and cheered for me.'] },
  // People around us
  { word: 'penfriend', topic: 'people-around-us', definition: 'a friend in another place who you write to', vi: 'bạn qua thư', icon: '✉️',
    example: 'I have a penfriend in Australia. We write emails every week.', exampleVi: 'Tôi có một người bạn qua thư ở Úc. Chúng tôi viết email mỗi tuần.',
    situations: ['I write emails to a girl in Japan every week, but we have never met.', 'Our class writes letters to a school in England, and one boy there always writes back to me.', 'Tom lives in Canada. We send each other messages and photos, but we have never seen each other.'] },
  { word: 'stranger', topic: 'people-around-us', definition: 'a person you do not know', vi: 'người lạ', icon: '🕵️',
    example: 'Don\'t get into a car with a stranger.', exampleVi: 'Đừng lên xe của người lạ.',
    situations: ['A man I have never seen before asked me for my home address.', 'Mum always says, "Don\'t open the door to people you don\'t know."', 'A woman I didn\'t know sat next to me on the bus and started talking.'] },
  { word: 'guest', topic: 'people-around-us', definition: 'a person you invite to your home or to a party', vi: 'khách', icon: '🛎️',
    example: 'We had ten guests at my birthday party.', exampleVi: 'Bữa tiệc sinh nhật của tôi có mười vị khách.',
    situations: ['Twenty people came to our house for my sister\'s party because we invited them.', 'Aunt Hoa is staying in our spare room for a week, so we cook special food for her.', 'At Tết, many visitors come to our house, and we offer them tea and sweets.'] },
  { word: 'host', topic: 'people-around-us', definition: 'a person who invites people and takes care of them at a party or in their home', vi: 'chủ nhà, người tổ chức', icon: '🏠',
    example: 'Lan was a great host. She made food for everyone at her party.', exampleVi: 'Lan là một chủ nhà tuyệt vời. Bạn ấy nấu đồ ăn cho mọi người ở bữa tiệc.',
    situations: ['Lan invited everyone to her party, and now she is giving them drinks and food.', 'When I stayed with a family in Singapore, Mrs Tan cooked for me and showed me the city.', 'At his party, Minh opened the door and welcomed each person with a smile.'] },
  { word: 'teammate', topic: 'people-around-us', definition: 'a person in the same team as you', vi: 'đồng đội', icon: '⚽',
    example: 'My teammates and I won the school football cup.', exampleVi: 'Tôi và các đồng đội đã giành cúp bóng đá của trường.',
    situations: ['Nam and I play in the same football team.', 'Hoa passed the ball to me, and I scored. We play for the same school team.', 'There are five of us in the basketball team, and we practise together every day.'] },
  { word: 'member', topic: 'people-around-us', definition: 'a person who belongs to a group or club', vi: 'thành viên', icon: '🪪',
    example: 'Mai is a member of the school drama club.', exampleVi: 'Mai là thành viên câu lạc bộ kịch của trường.',
    situations: ['Mai joined the school chess club last month, and she goes every Friday.', 'Only people with a club card can use this swimming pool.', 'Our English club has thirty students, and Minh is one of them.'] },
];
