import { Question } from '../../types';

export const HOME_WORDS = [
  {
    "word": "house",
    "definition": "a home in its own building",
    "vi": "ngôi nhà",
    "example": "Our house has a blue door.",
    "exampleVi": "Nhà của chúng tôi có cửa màu xanh.",
    "icon": "🏠",
    "topic": "home-types"
  },
  {
    "word": "flat",
    "definition": "a home inside a building with other homes",
    "vi": "căn hộ",
    "example": "Mai lives in a flat on the third floor.",
    "exampleVi": "Mai sống trong căn hộ ở tầng ba.",
    "icon": "🏢",
    "topic": "home-types"
  },
  {
    "word": "bedroom",
    "definition": "the room where you sleep",
    "vi": "phòng ngủ",
    "example": "My bedroom has a small bed.",
    "exampleVi": "Phòng ngủ của tôi có một chiếc giường nhỏ.",
    "icon": "🛏️",
    "topic": "home-rooms"
  },
  {
    "word": "bathroom",
    "definition": "the room with a bath or shower",
    "vi": "phòng tắm",
    "example": "I wash my hands in the bathroom.",
    "exampleVi": "Tôi rửa tay trong phòng tắm.",
    "icon": "🚿",
    "topic": "home-rooms"
  },
  {
    "word": "kitchen",
    "definition": "the room where you cook food",
    "vi": "nhà bếp",
    "example": "Dad cooks rice in the kitchen.",
    "exampleVi": "Bố nấu cơm trong nhà bếp.",
    "icon": "🍳",
    "topic": "home-rooms"
  },
  {
    "word": "living room",
    "definition": "the room where the family sits and relaxes",
    "vi": "phòng khách",
    "example": "We sit together in the living room.",
    "exampleVi": "Chúng tôi ngồi cùng nhau trong phòng khách.",
    "icon": "🛋️",
    "topic": "home-rooms"
  },
  {
    "word": "garden",
    "definition": "the place outside where flowers and plants grow",
    "vi": "vườn",
    "example": "We grow yellow flowers in the garden.",
    "exampleVi": "Chúng tôi trồng hoa vàng trong vườn.",
    "icon": "🌻",
    "topic": "home-rooms"
  },
  {
    "word": "floor",
    "definition": "the part of a room under your feet",
    "vi": "sàn nhà",
    "example": "My toy car is on the floor.",
    "exampleVi": "Xe đồ chơi của tôi ở trên sàn nhà.",
    "icon": "👣",
    "topic": "home-parts"
  },
  {
    "word": "wall",
    "definition": "the side of a room where you can hang a picture",
    "vi": "tường",
    "example": "There is a picture on the wall.",
    "exampleVi": "Có một bức tranh trên tường.",
    "icon": "🖼️",
    "topic": "home-parts"
  },
  {
    "word": "ceiling",
    "definition": "the top of a room above your head",
    "vi": "trần nhà",
    "example": "The ceiling is white.",
    "exampleVi": "Trần nhà màu trắng.",
    "icon": "💡",
    "topic": "home-parts"
  },
  {
    "word": "bed",
    "definition": "the piece of furniture you sleep in",
    "vi": "giường",
    "example": "My bed has a green blanket.",
    "exampleVi": "Giường của tôi có một chiếc chăn xanh lá.",
    "icon": "🛏️",
    "topic": "home-furniture"
  },
  {
    "word": "table",
    "definition": "the piece of furniture where you put plates to eat",
    "vi": "bàn",
    "example": "Put your bowl on the table.",
    "exampleVi": "Đặt bát của con lên bàn.",
    "icon": "🍽️",
    "topic": "home-furniture"
  },
  {
    "word": "chair",
    "definition": "a seat for one person with a back",
    "vi": "ghế",
    "example": "This wooden chair is near the table.",
    "exampleVi": "Chiếc ghế gỗ này ở gần bàn.",
    "icon": "🪑",
    "topic": "home-furniture"
  },
  {
    "word": "sofa",
    "definition": "a long soft seat for two or more people",
    "vi": "ghế sofa",
    "example": "Grandma sits on the sofa with me.",
    "exampleVi": "Bà ngồi trên ghế sofa cùng tôi.",
    "icon": "🛋️",
    "topic": "home-furniture"
  },
  {
    "word": "cupboard",
    "definition": "the furniture where we keep cups and plates",
    "vi": "tủ đựng chén bát",
    "example": "The cups are in the cupboard.",
    "exampleVi": "Những chiếc cốc ở trong tủ.",
    "icon": "🗄️",
    "topic": "home-furniture"
  },
  {
    "word": "wardrobe",
    "definition": "the furniture where we hang our clothes",
    "vi": "tủ quần áo",
    "example": "My coat is in the wardrobe.",
    "exampleVi": "Áo khoác của tôi ở trong tủ quần áo.",
    "icon": "👕",
    "topic": "home-furniture"
  },
  {
    "word": "bookcase",
    "definition": "the furniture with shelves for books",
    "vi": "kệ sách",
    "example": "Our bookcase has ten storybooks.",
    "exampleVi": "Kệ sách của chúng tôi có mười cuốn truyện.",
    "icon": "📚",
    "topic": "home-furniture"
  },
  {
    "word": "curtain",
    "definition": "the cloth you hang beside a window",
    "vi": "rèm cửa",
    "example": "This yellow curtain covers the window.",
    "exampleVi": "Chiếc rèm vàng này che cửa sổ.",
    "icon": "🪟",
    "topic": "home-parts"
  },
  {
    "word": "carpet",
    "definition": "the soft thing that covers a floor",
    "vi": "thảm",
    "example": "Our cat sleeps on the carpet.",
    "exampleVi": "Mèo của chúng tôi ngủ trên thảm.",
    "icon": "🧶",
    "topic": "home-parts"
  },
  {
    "word": "key",
    "definition": "the small metal thing you use to open a locked door",
    "vi": "chìa khóa",
    "example": "I give the door key to Mum.",
    "exampleVi": "Tôi đưa chìa khóa cửa cho mẹ.",
    "icon": "🔑",
    "topic": "home-parts"
  }
];

export const HOME_ACTIONS = [
  {
    "word": "clean",
    "definition": "make something not dirty",
    "vi": "lau dọn",
    "example": "We clean the kitchen on Sunday.",
    "exampleVi": "Chúng tôi lau dọn nhà bếp vào Chủ nhật."
  },
  {
    "word": "wash",
    "definition": "use water to make something clean",
    "vi": "rửa",
    "example": "I wash my hands before dinner.",
    "exampleVi": "Tôi rửa tay trước bữa tối."
  },
  {
    "word": "tidy",
    "definition": "make a room neat",
    "vi": "dọn gọn",
    "example": "We tidy our room after playing.",
    "exampleVi": "Chúng tôi dọn phòng gọn gàng sau khi chơi."
  },
  {
    "word": "put away",
    "definition": "move things back to their proper place",
    "vi": "cất đúng chỗ",
    "example": "Please put away your blocks.",
    "exampleVi": "Hãy cất những khối xếp hình đúng chỗ."
  },
  {
    "word": "dust",
    "definition": "remove dust from furniture with a cloth",
    "vi": "lau bụi",
    "example": "I dust the table with a soft cloth.",
    "exampleVi": "Tôi lau bụi trên bàn bằng khăn mềm."
  },
  {
    "word": "make the bed",
    "definition": "put the blanket and pillows neatly on the bed",
    "vi": "sắp xếp chăn gối",
    "example": "I make the bed every morning.",
    "exampleVi": "Tôi sắp xếp chăn gối mỗi sáng."
  },
  {
    "word": "feed",
    "definition": "give food to an animal",
    "vi": "cho ăn",
    "example": "We feed our rabbit after school.",
    "exampleVi": "Chúng tôi cho thỏ ăn sau giờ học."
  },
  {
    "word": "water",
    "definition": "give water to a plant",
    "vi": "tưới",
    "example": "I water the flowers with Dad.",
    "exampleVi": "Tôi tưới hoa cùng bố."
  }
];

export const UNIT_01_EXPANSION: Question[] = [
  {
    "id": "A1-U01-P2-001",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "it-is",
    "type": "multiple-choice",
    "question": "Look at my new kite. ___ orange.",
    "answer": "It's",
    "explanation": {
      "en": "It's means it is. A kite is one thing.",
      "vi": "It's là it is. Một chiếc diều dùng it."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "It's",
      "Its",
      "There are",
      "They are"
    ]
  },
  {
    "id": "A1-U01-P2-002",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "it-is",
    "type": "sentence-builder",
    "question": "Describe the weather. Build the sentence:",
    "answer": "It's sunny today",
    "explanation": {
      "en": "It's is short for it is.",
      "vi": "It's là dạng viết tắt của it is."
    },
    "difficulty": 1,
    "xp": 15,
    "words": [
      "It's",
      "sunny",
      "today"
    ],
    "audioText": "It's sunny today."
  },
  {
    "id": "A1-U01-P2-003",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "it-is",
    "type": "error-hunter",
    "question": "Its a red robot. Correct the sentence.",
    "answer": "It's a red robot.",
    "explanation": {
      "en": "Use an apostrophe in it's when you mean it is.",
      "vi": "Dùng dấu nháy trong it's khi muốn nói it is."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "It's a red robot.",
      "Its a red robot.",
      "It are a red robot.",
      "They is a red robot."
    ],
    "correctSentence": "It's a red robot."
  },
  {
    "id": "A1-U01-P2-004",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "verb-to-be",
    "type": "fill-gap",
    "question": "My little brother and I ___ ready for the picnic.",
    "answer": "are",
    "explanation": {
      "en": "My brother and I means we, so use are.",
      "vi": "My brother and I tương đương we, nên dùng are."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "are",
      "am",
      "is",
      "be"
    ],
    "audioText": "My little brother and I are ready for the picnic."
  },
  {
    "id": "A1-U01-P2-005",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "there-is-there-are",
    "type": "error-hunter",
    "question": "There is two stars on my badge. Correct the sentence.",
    "answer": "There are two stars on my badge.",
    "explanation": {
      "en": "Two stars are plural: there are.",
      "vi": "Hai ngôi sao là số nhiều: there are."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "There are two stars on my badge.",
      "There am two stars on my badge.",
      "There is two stars on my badge.",
      "There be two stars on my badge."
    ],
    "correctSentence": "There are two stars on my badge."
  },
  {
    "id": "A1-U01-P2-006",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "demonstratives",
    "type": "fill-gap",
    "question": "Look at the two boats far away. ___ are blue.",
    "answer": "Those",
    "explanation": {
      "en": "Those points to more than one thing far away.",
      "vi": "Those chỉ nhiều vật ở xa."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "Those",
      "These",
      "This",
      "That"
    ],
    "audioText": "Look at the two boats far away. Those are blue."
  },
  {
    "id": "A1-U01-P2-007",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "verb-to-be-negative",
    "type": "sentence-builder",
    "question": "Build the sentence about the quiet cat:",
    "answer": "The cat is not hungry",
    "explanation": {
      "en": "Put not after is to make a negative sentence.",
      "vi": "Đặt not sau is để tạo câu phủ định."
    },
    "difficulty": 1,
    "xp": 15,
    "words": [
      "The",
      "cat",
      "is",
      "not",
      "hungry"
    ],
    "audioText": "The cat is not hungry."
  },
  {
    "id": "A1-U01-P2-008",
    "level": "A1",
    "unit": 1,
    "skill": "grammar",
    "topic": "verb-to-be-questions",
    "type": "multiple-choice",
    "question": "___ the puppies under the tree?",
    "answer": "Are",
    "explanation": {
      "en": "Puppies is plural. Begin the question with Are.",
      "vi": "Puppies là số nhiều. Bắt đầu câu hỏi bằng Are."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "Are",
      "Is",
      "Am",
      "Does"
    ]
  }
];

export const UNIT_02_EXPANSION: Question[] = [
  {
    "id": "A1-U02-P2-001",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-3rd-person",
    "type": "fill-gap",
    "question": "Linh ___ her toy cars on Saturdays.",
    "answer": "washes",
    "explanation": {
      "en": "After she or Linh, wash becomes washes.",
      "vi": "Với she hoặc Linh, wash thêm es thành washes."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "washes",
      "wash",
      "washing",
      "washs"
    ],
    "audioText": "Linh washes her toy cars on Saturdays."
  },
  {
    "id": "A1-U02-P2-002",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-3rd-person",
    "type": "multiple-choice",
    "question": "My cousin ___ a small bag to school.",
    "answer": "carries",
    "explanation": {
      "en": "A consonant before y changes y to ies: carry → carries.",
      "vi": "Động từ tận cùng phụ âm + y đổi y thành ies."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "carries",
      "carry",
      "carrys",
      "carrying"
    ]
  },
  {
    "id": "A1-U02-P2-003",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-negative",
    "type": "error-hunter",
    "question": "Hoa doesn't walks to school. Correct the sentence.",
    "answer": "Hoa doesn't walk to school.",
    "explanation": {
      "en": "After doesn't, use the base verb walk.",
      "vi": "Sau doesn't, dùng động từ nguyên mẫu walk."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "Hoa doesn't walk to school.",
      "Hoa don't walks to school.",
      "Hoa doesn't walking to school.",
      "Hoa not walks to school."
    ],
    "correctSentence": "Hoa doesn't walk to school."
  },
  {
    "id": "A1-U02-P2-004",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-questions",
    "type": "sentence-builder",
    "question": "Ask about a daily habit:",
    "answer": "Does your sister read comics ?",
    "explanation": {
      "en": "Does + subject + base verb asks about he or she.",
      "vi": "Does + chủ ngữ + động từ nguyên mẫu dùng hỏi về he hoặc she."
    },
    "difficulty": 1,
    "xp": 15,
    "words": [
      "Does",
      "your",
      "sister",
      "read",
      "comics",
      "?"
    ],
    "audioText": "Does your sister read comics ?."
  },
  {
    "id": "A1-U02-P2-005",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-negative",
    "type": "fill-gap",
    "question": "We ___ play games before our homework.",
    "answer": "don't",
    "explanation": {
      "en": "We uses don't + base verb.",
      "vi": "We dùng don't + động từ nguyên mẫu."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "don't",
      "doesn't",
      "is not",
      "not"
    ],
    "audioText": "We don't play games before our homework."
  },
  {
    "id": "A1-U02-P2-006",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-questions",
    "type": "multiple-choice",
    "question": "Does Bao help at home? Yes, he ___.",
    "answer": "does",
    "explanation": {
      "en": "A question with Does has the short answer Yes, he does.",
      "vi": "Câu hỏi với Does có câu trả lời ngắn Yes, he does."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "does",
      "do",
      "is",
      "helps"
    ]
  },
  {
    "id": "A1-U02-P2-007",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-affirmative",
    "type": "sentence-builder",
    "question": "Build a sentence about a routine:",
    "answer": "We draw after lunch",
    "explanation": {
      "en": "We uses the base verb draw.",
      "vi": "We dùng động từ nguyên mẫu draw."
    },
    "difficulty": 1,
    "xp": 15,
    "words": [
      "We",
      "draw",
      "after",
      "lunch"
    ],
    "audioText": "We draw after lunch."
  },
  {
    "id": "A1-U02-P2-008",
    "level": "A1",
    "unit": 2,
    "skill": "grammar",
    "topic": "present-simple-questions",
    "type": "error-hunter",
    "question": "Do your dad cook dinner? Correct the question.",
    "answer": "Does your dad cook dinner?",
    "explanation": {
      "en": "Your dad means he: use Does and the base verb cook.",
      "vi": "Your dad tương đương he: dùng Does và cook."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "Does your dad cook dinner?",
      "Does your dad cooks dinner?",
      "Do your dad cooks dinner?",
      "Is your dad cook dinner?"
    ],
    "correctSentence": "Does your dad cook dinner?"
  }
];

export const UNIT_03_EXPANSION: Question[] = [
  {
    "id": "A1-U03-P2-001",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-types",
    "type": "multiple-choice",
    "question": "Find the word: a home in its own building.",
    "answer": "house",
    "explanation": {
      "en": "House means a home in its own building.",
      "vi": "house: ngôi nhà."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "house",
      "kitchen",
      "living room",
      "garden"
    ],
    "imageIcon": "🏠"
  },
  {
    "id": "A1-U03-P2-002",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-types",
    "type": "multiple-choice",
    "question": "Find the word: a home inside a building with other homes.",
    "answer": "flat",
    "explanation": {
      "en": "Flat means a home inside a building with other homes.",
      "vi": "flat: căn hộ."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "flat",
      "floor",
      "wall",
      "ceiling"
    ],
    "imageIcon": "🏢"
  },
  {
    "id": "A1-U03-P2-003",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-rooms",
    "type": "matching",
    "question": "Find the word: the room where you sleep.",
    "answer": "bedroom",
    "explanation": {
      "en": "Bedroom means the room where you sleep.",
      "vi": "bedroom: phòng ngủ."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "bedroom",
      "bed",
      "table",
      "chair"
    ],
    "imageIcon": "🛏️"
  },
  {
    "id": "A1-U03-P2-004",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-rooms",
    "type": "matching",
    "question": "Find the word: the room with a bath or shower.",
    "answer": "bathroom",
    "explanation": {
      "en": "Bathroom means the room with a bath or shower.",
      "vi": "bathroom: phòng tắm."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "bathroom",
      "sofa",
      "cupboard",
      "wardrobe"
    ],
    "imageIcon": "🚿"
  },
  {
    "id": "A1-U03-P2-005",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-rooms",
    "type": "matching",
    "question": "Find the word: the room where you cook food.",
    "answer": "kitchen",
    "explanation": {
      "en": "Kitchen means the room where you cook food.",
      "vi": "kitchen: nhà bếp."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "kitchen",
      "house",
      "flat",
      "bedroom"
    ],
    "imageIcon": "🍳"
  },
  {
    "id": "A1-U03-P2-006",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-rooms",
    "type": "matching",
    "question": "Find the word: the room where the family sits and relaxes.",
    "answer": "living room",
    "explanation": {
      "en": "Living room means the room where the family sits and relaxes.",
      "vi": "living room: phòng khách."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "living room",
      "bathroom",
      "kitchen",
      "garden"
    ],
    "imageIcon": "🛋️"
  },
  {
    "id": "A1-U03-P2-007",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-rooms",
    "type": "matching",
    "question": "Find the word: the place outside where flowers and plants grow.",
    "answer": "garden",
    "explanation": {
      "en": "Garden means the place outside where flowers and plants grow.",
      "vi": "garden: vườn."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "garden",
      "floor",
      "wall",
      "ceiling"
    ],
    "imageIcon": "🌻"
  },
  {
    "id": "A1-U03-P2-008",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the part of a room under your feet.",
    "answer": "floor",
    "explanation": {
      "en": "Floor means the part of a room under your feet.",
      "vi": "floor: sàn nhà."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "floor",
      "bed",
      "table",
      "chair"
    ],
    "imageIcon": "👣"
  },
  {
    "id": "A1-U03-P2-009",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the side of a room where you can hang a picture.",
    "answer": "wall",
    "explanation": {
      "en": "Wall means the side of a room where you can hang a picture.",
      "vi": "wall: tường."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "wall",
      "sofa",
      "cupboard",
      "wardrobe"
    ],
    "imageIcon": "🖼️"
  },
  {
    "id": "A1-U03-P2-010",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the top of a room above your head.",
    "answer": "ceiling",
    "explanation": {
      "en": "Ceiling means the top of a room above your head.",
      "vi": "ceiling: trần nhà."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "ceiling",
      "house",
      "flat",
      "bedroom"
    ],
    "imageIcon": "💡"
  },
  {
    "id": "A1-U03-P2-011",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: the piece of furniture you sleep in.",
    "answer": "bed",
    "explanation": {
      "en": "Bed means the piece of furniture you sleep in.",
      "vi": "bed: giường."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "bed",
      "bathroom",
      "kitchen",
      "living room"
    ],
    "imageIcon": "🛏️"
  },
  {
    "id": "A1-U03-P2-012",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: the piece of furniture where you put plates to eat.",
    "answer": "table",
    "explanation": {
      "en": "Table means the piece of furniture where you put plates to eat.",
      "vi": "table: bàn."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "table",
      "garden",
      "floor",
      "wall"
    ],
    "imageIcon": "🍽️"
  },
  {
    "id": "A1-U03-P2-013",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: a seat for one person with a back.",
    "answer": "chair",
    "explanation": {
      "en": "Chair means a seat for one person with a back.",
      "vi": "chair: ghế."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "chair",
      "ceiling",
      "bed",
      "table"
    ],
    "imageIcon": "🪑"
  },
  {
    "id": "A1-U03-P2-014",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: a long soft seat for two or more people.",
    "answer": "sofa",
    "explanation": {
      "en": "Sofa means a long soft seat for two or more people.",
      "vi": "sofa: ghế sofa."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "sofa",
      "chair",
      "cupboard",
      "wardrobe"
    ],
    "imageIcon": "🛋️"
  },
  {
    "id": "A1-U03-P2-015",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: the furniture where we keep cups and plates.",
    "answer": "cupboard",
    "explanation": {
      "en": "Cupboard means the furniture where we keep cups and plates.",
      "vi": "cupboard: tủ đựng chén bát."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "cupboard",
      "house",
      "flat",
      "bedroom"
    ],
    "imageIcon": "🗄️"
  },
  {
    "id": "A1-U03-P2-016",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: the furniture where we hang our clothes.",
    "answer": "wardrobe",
    "explanation": {
      "en": "Wardrobe means the furniture where we hang our clothes.",
      "vi": "wardrobe: tủ quần áo."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "wardrobe",
      "bathroom",
      "kitchen",
      "living room"
    ],
    "imageIcon": "👕"
  },
  {
    "id": "A1-U03-P2-017",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-furniture",
    "type": "matching",
    "question": "Find the word: the furniture with shelves for books.",
    "answer": "bookcase",
    "explanation": {
      "en": "Bookcase means the furniture with shelves for books.",
      "vi": "bookcase: kệ sách."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "bookcase",
      "garden",
      "floor",
      "wall"
    ],
    "imageIcon": "📚"
  },
  {
    "id": "A1-U03-P2-018",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the cloth you hang beside a window.",
    "answer": "curtain",
    "explanation": {
      "en": "Curtain means the cloth you hang beside a window.",
      "vi": "curtain: rèm cửa."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "curtain",
      "ceiling",
      "bed",
      "table"
    ],
    "imageIcon": "🪟"
  },
  {
    "id": "A1-U03-P2-019",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the soft thing that covers a floor.",
    "answer": "carpet",
    "explanation": {
      "en": "Carpet means the soft thing that covers a floor.",
      "vi": "carpet: thảm."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "carpet",
      "chair",
      "sofa",
      "cupboard"
    ],
    "imageIcon": "🧶"
  },
  {
    "id": "A1-U03-P2-020",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-parts",
    "type": "multiple-choice",
    "question": "Find the word: the small metal thing you use to open a locked door.",
    "answer": "key",
    "explanation": {
      "en": "Key means the small metal thing you use to open a locked door.",
      "vi": "key: chìa khóa."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "key",
      "house",
      "flat",
      "bedroom"
    ],
    "imageIcon": "🔑"
  },
  {
    "id": "A1-U03-P2-021",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"make something not dirty\"?",
    "answer": "clean",
    "explanation": {
      "en": "Clean means make something not dirty.",
      "vi": "clean: lau dọn."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "clean",
      "wash",
      "tidy",
      "put away"
    ]
  },
  {
    "id": "A1-U03-P2-022",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"use water to make something clean\"?",
    "answer": "wash",
    "explanation": {
      "en": "Wash means use water to make something clean.",
      "vi": "wash: rửa."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "wash",
      "clean",
      "tidy",
      "put away"
    ]
  },
  {
    "id": "A1-U03-P2-023",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"make a room neat\"?",
    "answer": "tidy",
    "explanation": {
      "en": "Tidy means make a room neat.",
      "vi": "tidy: dọn gọn."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "tidy",
      "clean",
      "wash",
      "put away"
    ]
  },
  {
    "id": "A1-U03-P2-024",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"move things back to their proper place\"?",
    "answer": "put away",
    "explanation": {
      "en": "Put away means move things back to their proper place.",
      "vi": "put away: cất đúng chỗ."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "put away",
      "clean",
      "wash",
      "tidy"
    ]
  },
  {
    "id": "A1-U03-P2-025",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"remove dust from furniture with a cloth\"?",
    "answer": "dust",
    "explanation": {
      "en": "Dust means remove dust from furniture with a cloth.",
      "vi": "dust: lau bụi."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "dust",
      "clean",
      "wash",
      "tidy"
    ]
  },
  {
    "id": "A1-U03-P2-026",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"put the blanket and pillows neatly on the bed\"?",
    "answer": "make the bed",
    "explanation": {
      "en": "Make the bed means put the blanket and pillows neatly on the bed.",
      "vi": "make the bed: sắp xếp chăn gối."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "make the bed",
      "clean",
      "wash",
      "tidy"
    ]
  },
  {
    "id": "A1-U03-P2-027",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"give food to an animal\"?",
    "answer": "feed",
    "explanation": {
      "en": "Feed means give food to an animal.",
      "vi": "feed: cho ăn."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "feed",
      "clean",
      "wash",
      "tidy"
    ]
  },
  {
    "id": "A1-U03-P2-028",
    "level": "A1",
    "unit": 3,
    "skill": "vocabulary",
    "topic": "home-chores",
    "type": "multiple-choice",
    "question": "Which action means \"give water to a plant\"?",
    "answer": "water",
    "explanation": {
      "en": "Water means give water to a plant.",
      "vi": "water: tưới."
    },
    "difficulty": 1,
    "xp": 10,
    "options": [
      "water",
      "clean",
      "wash",
      "tidy"
    ]
  }
];