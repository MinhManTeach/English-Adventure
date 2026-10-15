import type { VocabWord } from '../shared';

/** [sentence with ___ and an optional (hint), answer, three wrong options] */
export type GapLine = readonly [string, string, readonly [string, string, string]];

/** Unit 55: will for predictions, opinions, promises and refusals; there will be. */
export const WILL_ITEMS: readonly GapLine[] = [
  ['I think Vietnam ___ the match tonight. (win)', 'will win', ['will wins', 'will to win', 'wins will']],
  ['I\'m sure you ___ the exam. You studied so hard! (pass)', 'will pass', ['will passing', 'will to pass', 'will passed']],
  ['I don\'t think it ___ cold in Ho Chi Minh City next week. (be)', 'will be', ['will is', 'will being', 'wills be']],
  ['In 2050, there ___ more electric cars on the roads. (be)', 'will be', ['will are', 'will have', 'are will']],
  ['Will Lan ___ to the party on Saturday? (come)', 'come', ['comes', 'coming', 'to come']],
  ['Don\'t worry. I ___ your birthday this year. (not forget)', 'won\'t forget', ['won\'t to forget', 'willn\'t forget', 'won\'t forgot']],
  ['Maybe people ___ on Mars one day. (live)', 'will live', ['will living', 'will lives', 'will to live']],
  ['How old ___ you be on your next birthday?', 'will', ['are', 'do', 'have']],
  ['The new bridge over the Han River ___ ready until next year. (not be)', 'won\'t be', ['isn\'t be', 'won\'t is', 'doesn\'t be']],
  ['I hope it ___ sunny for our school trip to Ha Long Bay. (be)', 'will be', ['will is', 'is will', 'will been']],
  ['Who do you think ___ the singing contest? (win)', 'will win', ['will wins', 'wins will', 'will winning']],
  ['Nam is ill, so he ___ to school tomorrow. (not go)', 'won\'t go', ['won\'t goes', 'willn\'t go', 'won\'t going']],
];

/** Unit 55: probably / definitely with will and won't. [sentence, answer] */
export const ADVERB_ITEMS: readonly (readonly [string, string])[] = [
  ['Mai is always late. She ___ miss the bus again. (probably)', 'will probably'],
  ['It\'s very cloudy. We ___ go to the beach today. (probably not)', 'probably won\'t'],
  ['Our team has trained every day. We ___ win the cup this year. (definitely)', 'will definitely'],
  ['Don\'t wait for me. I ___ finish my homework before nine. (definitely not)', 'definitely won\'t'],
  ['My parents ___ buy a new car next year. (probably)', 'will probably'],
  ['Minh has a cold. He ___ come to football practice. (probably not)', 'probably won\'t'],
  ['I ___ call you as soon as I hear the news. (definitely)', 'will definitely'],
  ['Grandpa hates smartphones. He ___ buy one! (definitely not)', 'definitely won\'t'],
  ['The shops ___ be very busy before Tết. (probably)', 'will probably'],
  ['Mr Long\'s tests are always hard. The next test ___ be easy. (probably not)', 'probably won\'t'],
  ['Lan studies every day. She ___ get good marks. (definitely)', 'will definitely'],
  ['The trip is too short. We ___ have time to visit Hue. (definitely not)', 'definitely won\'t'],
];
export const ADVERB_WRONG: Record<string, readonly [string, string, string]> = {
  'will probably': ['probably wills', 'will probably to', 'probably will to'],
  'probably won\'t': ['won\'t probably', 'probably don\'t', 'probably not will'],
  'will definitely': ['definitely wills', 'will definitely to', 'definitely will to'],
  'definitely won\'t': ['won\'t definitely', 'definitely don\'t', 'definitely not will'],
};

/** Unit 55: be going to for plans and for predictions from what we can see now. */
export const GOING_TO_ITEMS: readonly GapLine[] = [
  ['My cousins ___ going to visit us during Tết.', 'are', ['is', 'will', 'do']],
  ['___ you going to watch the match tonight?', 'Are', ['Do', 'Will', 'Is']],
  ['I ___ going to eat any more cake. I\'m full!', 'am not', ['don\'t', 'won\'t', 'isn\'t']],
  ['What ___ Nam going to do after the exam?', 'is', ['does', 'are', 'will']],
  ['Look at those black clouds. It ___ rain. (going to)', 'is going to', ['going to', 'is going', 'will going to']],
  ['Be careful! You ___ drop those eggs! (going to)', 'are going to', ['is going to', 'going to', 'are going']],
  ['We have saved enough money. We ___ buy a new fridge. (going to)', 'are going to', ['are going', 'is going to', 'are go to']],
  ['Lan has bought some paint. She ___ paint her bedroom. (going to)', 'is going to', ['are going to', 'is go to', 'going to']],
  ['There ___ a big concert in the park on Sunday. (going to)', 'is going to be', ['are going to be', 'is going to', 'is going be']],
  ['Where ___ going to stay in Da Nang? (you)', 'are you', ['you are', 'do you', 'is you']],
  ['Mum and Dad ___ going to sell the house. They love it!', 'aren\'t', ['isn\'t', 'don\'t', 'won\'t']],
  ['Minh is going to ___ a doctor when he grows up.', 'be', ['being', 'is', 'to be']],
];

/** Unit 56: reflexive pronouns, by myself and each other. */
export const REFLEXIVE_ITEMS: readonly GapLine[] = [
  ['Be careful with that knife. Don\'t cut ___!', 'yourself', ['you', 'yours', 'your']],
  ['Lan made this dress ___. Nobody helped her.', 'herself', ['sheself', 'her', 'hers']],
  ['The children enjoyed ___ at the water park.', 'themselves', ['themself', 'them', 'theirs']],
  ['I taught ___ to play the guitar from videos online.', 'myself', ['meself', 'me', 'mine']],
  ['Minh hurt ___ when he fell off his bike.', 'himself', ['hisself', 'him', 'his']],
  ['We painted the classroom ___. It took all weekend.', 'ourselves', ['ourself', 'us', 'ours']],
  ['Nam and Mai are best friends. They text ___ every evening. (each one texts the other)', 'each other', ['theirselves', 'themselves', 'them each']],
  ['The cat is washing ___ in the sun.', 'itself', ['itsself', 'it', 'its']],
  ['Help ___ to some more rice, children!', 'yourselves', ['yourselfs', 'yourself', 'yours']],
  ['My grandfather lives by ___ in a small house in Hue. (alone)', 'himself', ['hisself', 'him', 'his']],
  ['Did you do this homework by ___, Mai? (without help)', 'yourself', ['yourselfs', 'you', 'yourselves']],
  ['Lan and her sister looked at ___ and laughed. (each looked at the other)', 'each other', ['theirselves', 'themselves', 'herself']],
];

/** Unit 56: possessive pronouns, of mine, whose / who's, its / it's. */
export const POSSESSIVE_PRONOUN_ITEMS: readonly GapLine[] = [
  ['This isn\'t my umbrella. ___ is blue.', 'Mine', ['Mines', 'My', 'Me']],
  ['Is this pencil case ___, Nam?', 'yours', ['your\'s', 'your', 'you']],
  ['Whose bike is this? It\'s ___. It belongs to Mai.', 'hers', ['her\'s', 'her', 'she']],
  ['Our flat is small, but ___ is very big. (the Nguyen family\'s flat)', 'theirs', ['their\'s', 'their', 'them']],
  ['Lan is a friend of ___. We sit together in class.', 'mine', ['mines', 'me', 'my']],
  ['___ phone is ringing? (who does it belong to)', 'Whose', ['Who\'s', 'Who', 'Whom']],
  ['___ coming to the cinema with us tonight? (who is)', 'Who\'s', ['Whose', 'Who', 'Whom']],
  ['That isn\'t Minh\'s jacket. ___ is black.', 'His', ['His\'', 'He', 'Him']],
  ['The red house is ___. We moved there last year.', 'ours', ['our\'s', 'our', 'us']],
  ['Mr Long is a neighbour of ___. He lives next door to us.', 'ours', ['ourselves', 'us', 'our']],
  ['The dog is wagging ___ tail.', 'its', ['it\'s', 'it', 'itself']],
  ['Your answer is right, but ___ is wrong. (my answer)', 'mine', ['mines', 'my', 'me']],
];

/** Unit 56: possessive 's and s', including irregular plurals. */
export const POSSESSIVE_S_ITEMS: readonly GapLine[] = [
  ['This is my ___ house. She lives in Hai Phong. (aunt)', 'aunt\'s', ['aunts', 'aunts\'', 'aunt']],
  ['The ___ changing room is on the left. (boys)', 'boys\'', ['boys\'s', 'boy\'s', 'boys']],
  ['The ___ toilets are next to the library. (women)', 'women\'s', ['womens\'', 'womens', 'woman\'s']],
  ['Where are the ___ coats? (children)', 'children\'s', ['childrens\'', 'childrens', 'child\'s']],
  ['My ___ friends are coming for dinner. (parents)', 'parents\'', ['parents\'s', 'parent\'s', 'parents']],
  ['___ birthday is on 8 March. (my sister)', 'My sister\'s', ['My sisters', 'My sister', 'Mine sister\'s']],
  ['I\'m staying at my ___ house this weekend. (grandparents)', 'grandparents\'', ['grandparents\'s', 'grandparent\'s', 'grandparents']],
  ['The ___ names are on the board. (students)', 'students\'', ['students\'s', 'student\'s', 'students']],
  ['Is this ___ bag? (the new girl)', 'the new girl\'s', ['the new girls', 'the new girl', 'the new girl her']],
  ['The ___ food is in the kitchen. We have two dogs. (dogs)', 'dogs\'', ['dogs\'s', 'dog\'s', 'dogs']],
  ['My ___ name is Hoa. (best friend)', 'best friend\'s', ['best friends', 'best friend', 'best friend her']],
  ['The ___ clothes are on the second floor. (men)', 'men\'s', ['mens\'', 'mens', 'man\'s']],
];

/** Unit 57 Work. */
export const WORK_WORDS: readonly VocabWord[] = [
  // Jobs
  { word: 'pilot', topic: 'jobs', definition: 'a person who flies a plane', vi: 'phi công', icon: '👨‍✈️',
    example: 'My uncle is a pilot for a Vietnamese airline.', exampleVi: 'Chú tôi là phi công của một hãng hàng không Việt Nam.',
    situations: ['He sits at the front of the plane and flies it to Singapore.', 'Before take-off, she says: "Good morning, this is your captain speaking."', 'She works in the sky and lands at a different airport every day.'] },
  { word: 'receptionist', topic: 'jobs', definition: 'a person who welcomes visitors and answers the phone in a hotel or office', vi: 'lễ tân', icon: '🛎️',
    example: 'The receptionist gave us the key to our room.', exampleVi: 'Nhân viên lễ tân đưa chúng tôi chìa khóa phòng.',
    situations: ['When we arrived at the hotel, a smiling woman at the front desk gave us our key.', 'He answers the office phone and says, "Good morning, how can I help you?"', 'At the dentist\'s, she writes your name in the book and asks you to wait.'] },
  { word: 'hairdresser', topic: 'jobs', definition: 'a person whose job is to cut and style hair', vi: 'thợ làm tóc', icon: '💇',
    example: 'My mum goes to the hairdresser before Tết.', exampleVi: 'Mẹ tôi đi làm tóc trước Tết.',
    situations: ['She washes, cuts and dries people\'s hair all day.', 'Before the wedding, my sister went to a salon, and a man made her hair look beautiful.', 'He uses scissors, a comb and a hairdryer at work.'] },
  { word: 'plumber', topic: 'jobs', definition: 'a person who repairs water pipes, taps and toilets', vi: 'thợ sửa ống nước', icon: '🔧',
    example: 'The kitchen tap is broken, so we called a plumber.', exampleVi: 'Vòi nước trong bếp bị hỏng nên nhà tôi gọi thợ sửa ống nước.',
    situations: ['Water is coming out of the pipe under the sink! We need someone to fix it.', 'The toilet doesn\'t flush. Mum is phoning a man to repair it.', 'He came with his tools and repaired the shower in our bathroom.'] },
  { word: 'accountant', topic: 'jobs', definition: 'a person whose job is to keep and check the money records of a company', vi: 'kế toán', icon: '🧮',
    example: 'My aunt works as an accountant for a big company.', exampleVi: 'Dì tôi làm kế toán cho một công ty lớn.',
    situations: ['She works with numbers all day and checks how much money the company spends.', 'At the end of the year, he checks all the money the shop made and paid.', 'She uses a calculator and spreadsheets to keep the company\'s money records.'] },
  { word: 'tour guide', topic: 'jobs', definition: 'a person who shows tourists around a place and tells them about it', vi: 'hướng dẫn viên du lịch', icon: '🚩',
    example: 'Our tour guide told us about the history of Hue.', exampleVi: 'Hướng dẫn viên kể cho chúng tôi nghe về lịch sử Huế.',
    situations: ['She walks in front of the tourists with a small flag and talks about the old temple.', 'He takes visitors around Hoi An and tells them stories about the old town.', '"Follow me, everyone! On your left is the Imperial City."'] },
  // Workplace
  { word: 'factory', topic: 'workplace', definition: 'a building where people use machines to make things', vi: 'nhà máy', icon: '🏭',
    example: 'My dad works in a shoe factory.', exampleVi: 'Bố tôi làm việc ở một nhà máy giày.',
    situations: ['Hundreds of workers and big machines make cars in this building.', 'This is where they make the biscuits before they go to the shops.', 'Every day, thousands of T-shirts come out of this building.'] },
  { word: 'company', topic: 'workplace', definition: 'a business that sells things or services', vi: 'công ty', icon: '🏢',
    example: 'She works for a computer company in Da Nang.', exampleVi: 'Cô ấy làm việc cho một công ty máy tính ở Đà Nẵng.',
    situations: ['It is a big business that sells milk all over Viet Nam.', 'My aunt started her own small business that sells phone cases online.', 'This business has 200 workers and offices in three cities.'] },
  { word: 'colleague', topic: 'workplace', definition: 'a person you work with', vi: 'đồng nghiệp', icon: '🤝',
    example: 'Mum is having lunch with her colleagues.', exampleVi: 'Mẹ đang ăn trưa cùng các đồng nghiệp.',
    situations: ['Dad and Mr Long work in the same office, and they often have lunch together.', 'Ms Hoa teaches at the same school as my mum. They work together.', 'On her first day, the people in her new office welcomed her with a cake.'] },
  { word: 'manager', topic: 'workplace', definition: 'a person who is in charge of a shop, office or team of workers', vi: 'người quản lý', icon: '👔',
    example: 'I\'d like to speak to the manager, please.', exampleVi: 'Tôi muốn nói chuyện với người quản lý.',
    situations: ['She is in charge of the hotel and tells the other workers what to do.', 'The customer wasn\'t happy, so he asked to speak to the person in charge of the shop.', 'He decides who works on which day at the restaurant.'] },
  { word: 'employee', topic: 'workplace', definition: 'a person who is paid to work for a company or a person', vi: 'nhân viên', icon: '🪪',
    example: 'The company has fifty employees.', exampleVi: 'Công ty có năm mươi nhân viên.',
    situations: ['The bakery has ten workers, and the owner pays each of them every month.', 'He works for the bank and gets a salary from it every month.', 'The company pays these people, and they must follow its rules.'] },
  { word: 'meeting', topic: 'workplace', definition: 'a time when people come together to talk about something', vi: 'cuộc họp', icon: '📋',
    example: 'Dad has a meeting at nine o\'clock.', exampleVi: 'Bố có cuộc họp lúc chín giờ.',
    situations: ['All the teachers sit around a table after school to talk about the exams.', 'Mum can\'t answer the phone now. She is in a room, talking with her team.', 'At 3 pm, everyone in the office will come together to discuss a new plan.'] },
  // Working life
  { word: 'earn', topic: 'working-life', definition: 'get money for the work you do', vi: 'kiếm (tiền)', icon: '💵',
    example: 'She earns ten million dong a month.', exampleVi: 'Cô ấy kiếm được mười triệu đồng một tháng.',
    situations: ['He gets 200,000 dong for a day of work at the café.', 'My sister walks the neighbours\' dogs and gets some money for it.', 'Doctors usually get a lot of money for their work.'] },
  { word: 'full-time', topic: 'working-life', definition: 'working all the normal hours of the week', vi: 'toàn thời gian', icon: '🕘',
    example: 'My mum has a full-time job at a hospital.', exampleVi: 'Mẹ tôi làm việc toàn thời gian ở bệnh viện.',
    situations: ['Dad works from 8 am to 5 pm, Monday to Friday.', 'She doesn\'t work just a few hours. She works the whole week.', 'After university, he got a job that is forty hours a week.'] },
  { word: 'day off', topic: 'working-life', definition: 'a day when you do not have to go to work', vi: 'ngày nghỉ', icon: '🏖️',
    example: 'Tomorrow is my day off, so I can sleep late.', exampleVi: 'Ngày mai tôi được nghỉ làm nên có thể ngủ dậy muộn.',
    situations: ['Mum doesn\'t work on Wednesday, so she\'s taking us to the zoo.', 'The doctor works every day this week except Thursday.', 'His boss let him stay at home on his birthday.'] },
  { word: 'career', topic: 'working-life', definition: 'the jobs you do during your working life', vi: 'sự nghiệp', icon: '📈',
    example: 'She wants a career in medicine.', exampleVi: 'Cô ấy muốn theo nghề y.',
    situations: ['My grandfather was a teacher for forty years and loved every year of it.', 'Lan wants to work in fashion for her whole life.', 'He started as a waiter and later became the owner of five restaurants.'] },
  { word: 'experience', topic: 'working-life', definition: 'knowledge and skill you get from doing a job', vi: 'kinh nghiệm', icon: '🧰',
    example: 'She has ten years\' experience as a nurse.', exampleVi: 'Cô ấy có mười năm kinh nghiệm làm y tá.',
    situations: ['He has worked as a cook for twenty years, so he knows a lot about it.', 'The job advert says: "You must have worked in a shop before."', 'She is new, so she doesn\'t know much about the job yet.'] },
  { word: 'apply for', topic: 'working-life', definition: 'ask in writing for a job or a place at a school', vi: 'nộp đơn xin', icon: '📝',
    example: 'My brother is applying for a job at a hotel.', exampleVi: 'Anh trai tôi đang nộp đơn xin việc ở một khách sạn.',
    situations: ['Nam saw a job advert online and sent his CV and a letter.', 'She filled in a form because she wants a place at the university.', 'He wrote an email to the company to ask for the job.'] },
  // Describing jobs
  { word: 'well-paid', topic: 'describing-jobs', definition: 'giving you a lot of money for your work', vi: 'được trả lương cao', icon: '💰',
    example: 'Pilots usually have well-paid jobs.', exampleVi: 'Phi công thường có công việc lương cao.',
    situations: ['Her new job gives her lots of money every month.', 'Doctors and lawyers often get a big salary.', 'He loves his job because the money is very good.'] },
  { word: 'stressful', topic: 'describing-jobs', definition: 'making you feel worried and under pressure', vi: 'căng thẳng', icon: '😰',
    example: 'Working in a busy hospital is stressful.', exampleVi: 'Làm việc ở một bệnh viện đông người thật căng thẳng.',
    situations: ['She has too much work and is always worried about it.', 'Firefighters often have to make quick decisions in dangerous situations.', 'He works long hours and can\'t sleep because he thinks about work all night.'] },
  { word: 'creative', topic: 'describing-jobs', definition: 'good at thinking of new ideas and making new things', vi: 'sáng tạo', icon: '🎨',
    example: 'Designers need to be creative.', exampleVi: 'Nhà thiết kế cần phải sáng tạo.',
    situations: ['She always has new ideas for posters and pictures.', 'He writes songs and makes up new stories all the time.', 'This job needs someone who can think of new and unusual ideas.'] },
  { word: 'organised', topic: 'describing-jobs', definition: 'planning things well and keeping things in order', vi: 'ngăn nắp, có tổ chức', icon: '🗂️',
    example: 'Mai is very organised. She plans everything.', exampleVi: 'Mai rất ngăn nắp, có tổ chức. Bạn ấy lên kế hoạch cho mọi việc.',
    situations: ['Her desk is always tidy and she keeps all her papers in the right folders.', 'He writes a plan for every day and never forgets a meeting.', 'She plans the school trip carefully, with times, lists and tickets ready.'] },
  { word: 'patient', topic: 'describing-jobs', definition: 'able to wait or stay calm without getting angry', vi: 'kiên nhẫn', icon: '🧘',
    example: 'Teachers of young children must be patient.', exampleVi: 'Giáo viên dạy trẻ nhỏ phải kiên nhẫn.',
    situations: ['The little boy asked the same question ten times, and the teacher calmly answered again.', 'He waited for two hours and didn\'t get angry.', 'She explains the maths problem slowly again and again, and never shouts.'] },
  { word: 'responsible', topic: 'describing-jobs', definition: 'doing your work carefully so that people can trust you', vi: 'có trách nhiệm', icon: '🛡️',
    example: 'Nam is responsible. He always does what he promises.', exampleVi: 'Nam là người có trách nhiệm. Bạn ấy luôn làm những gì đã hứa.',
    situations: ['Mrs Lan trusts her son to look after his little sister while she is at work.', 'He always finishes his work on time and does what he promises.', 'If she makes a mistake at work, she says so and fixes it.'] },
];
