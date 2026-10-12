import { CHAPTER2_LEARN_CARDS } from './chapter2Learn';
import { CHAPTER3_LEARN_CARDS } from './chapter3Learn';
import { CHAPTER4_LEARN_CARDS } from './chapter4Learn';
export interface LearnCard {
  id: string;
  unitId: number;
  title: string;
  titleVi: string;
  ruleEn: string;
  ruleVi: string;
  examples: {
    en: string;
    vi: string;
    highlight?: string;
  }[];
  tip?: {
    en: string;
    vi: string;
  };
}

export const LEARN_CARDS_DATA: Record<number, LearnCard[]> = {
  ...CHAPTER2_LEARN_CARDS,
  ...CHAPTER3_LEARN_CARDS,
  ...CHAPTER4_LEARN_CARDS,
  "1": [
    {
      "id": "u1-p2-card-1",
      "unitId": 1,
      "title": "Meet am, is and are",
      "titleVi": "Làm quen am, is và are",
      "ruleEn": "I → am. He / She / It → is. You / We / They → are.",
      "ruleVi": "Chọn am, is hoặc are theo chủ ngữ.",
      "examples": [
        {
          "en": "I am a brave explorer.",
          "vi": "Tôi là một nhà thám hiểm dũng cảm.",
          "highlight": "am"
        },
        {
          "en": "Minh is my teammate.",
          "vi": "Minh là đồng đội của tôi.",
          "highlight": "is"
        },
        {
          "en": "We are ready for the gate.",
          "vi": "Chúng tôi sẵn sàng đến cổng.",
          "highlight": "are"
        }
      ]
    },
    {
      "id": "u1-p2-card-2",
      "unitId": 1,
      "title": "Say what is not true",
      "titleVi": "Nói điều không đúng",
      "ruleEn": "Put not after am, is or are.",
      "ruleVi": "Đặt not sau am, is hoặc are để nói không.",
      "examples": [
        {
          "en": "The gate is not closed.",
          "vi": "Cánh cổng không đóng.",
          "highlight": "is not"
        },
        {
          "en": "They are not tired.",
          "vi": "Họ không mệt.",
          "highlight": "are not"
        }
      ]
    },
    {
      "id": "u1-p2-card-3",
      "unitId": 1,
      "title": "Ask with am, is and are",
      "titleVi": "Đặt câu hỏi",
      "ruleEn": "Move am, is or are before the person or thing.",
      "ruleVi": "Đưa am, is hoặc are lên trước chủ ngữ.",
      "examples": [
        {
          "en": "Are you on my team?",
          "vi": "Bạn có ở trong đội của tôi không?",
          "highlight": "Are"
        },
        {
          "en": "Is the kitten hungry?",
          "vi": "Mèo con có đói không?",
          "highlight": "Is"
        }
      ]
    },
    {
      "id": "u1-p2-card-4",
      "unitId": 1,
      "title": "Count with there is and there are",
      "titleVi": "Nói có một hoặc có nhiều",
      "ruleEn": "One thing → there is. Two or more → there are.",
      "ruleVi": "Một vật dùng there is. Hai vật trở lên dùng there are.",
      "examples": [
        {
          "en": "There is a flag above the gate.",
          "vi": "Có một lá cờ trên cổng.",
          "highlight": "There is"
        },
        {
          "en": "There are three birds in the tree.",
          "vi": "Có ba con chim trên cây.",
          "highlight": "There are"
        }
      ]
    },
    {
      "id": "u1-p2-card-5",
      "unitId": 1,
      "title": "It's means it is",
      "titleVi": "Dạng viết tắt của it is",
      "ruleEn": "It is → it's. Use it's to describe one thing or the weather.",
      "ruleVi": "It's là it is viết tắt. Nhớ dấu nháy để nói đó là hoặc thời tiết.",
      "examples": [
        {
          "en": "It's a purple kite.",
          "vi": "Đó là một chiếc diều tím.",
          "highlight": "It's"
        },
        {
          "en": "It's windy today.",
          "vi": "Hôm nay trời có gió.",
          "highlight": "It's"
        }
      ]
    },
    {
      "id": "u1-p2-card-6",
      "unitId": 1,
      "title": "Point near and far",
      "titleVi": "Chỉ vật ở gần và xa",
      "ruleEn": "This: one near. That: one far. These: many near. Those: many far.",
      "ruleVi": "This/these ở gần; that/those ở xa. This/that chỉ một vật.",
      "examples": [
        {
          "en": "This is the coin in my hand.",
          "vi": "Đây là đồng xu trong tay tôi.",
          "highlight": "This"
        },
        {
          "en": "Those are boats far away.",
          "vi": "Kia là những con thuyền ở xa.",
          "highlight": "Those"
        },
        {
          "en": "These are the books beside me.",
          "vi": "Đây là những quyển sách bên cạnh tôi.",
          "highlight": "These"
        }
      ]
    }
  ],
  "2": [
    {
      "id": "u2-p2-card-1",
      "unitId": 2,
      "title": "Daily habits",
      "titleVi": "Thói quen hằng ngày",
      "ruleEn": "I / You / We / They + base verb.",
      "ruleVi": "Với I, you, we, they, dùng động từ nguyên mẫu.",
      "examples": [
        {
          "en": "I read after breakfast.",
          "vi": "Tôi đọc sách sau bữa sáng.",
          "highlight": "read"
        },
        {
          "en": "We walk to the village library.",
          "vi": "Chúng tôi đi bộ đến thư viện làng.",
          "highlight": "walk"
        }
      ]
    },
    {
      "id": "u2-p2-card-2",
      "unitId": 2,
      "title": "He, she, it: add s",
      "titleVi": "He, she, it: thêm s",
      "ruleEn": "He / She / It + verb with s.",
      "ruleVi": "Với he, she, it, động từ thường thêm s.",
      "examples": [
        {
          "en": "She paints little stars.",
          "vi": "Cô ấy vẽ những ngôi sao nhỏ.",
          "highlight": "paints"
        },
        {
          "en": "Bao helps his grandpa.",
          "vi": "Bảo giúp ông của mình.",
          "highlight": "helps"
        }
      ]
    },
    {
      "id": "u2-p2-card-3",
      "unitId": 2,
      "title": "es and ies",
      "titleVi": "Thêm es và đổi y thành ies",
      "ruleEn": "Verbs ending ch, sh, s, x, o usually take es. Consonant + y → ies; vowel + y → s.",
      "ruleVi": "Đuôi ch, sh, s, x, o thường thêm es. Phụ âm + y đổi thành ies; nguyên âm + y thêm s.",
      "examples": [
        {
          "en": "He washes his cup.",
          "vi": "Cậu ấy rửa cốc của mình.",
          "highlight": "washes"
        },
        {
          "en": "Mai carries her lunch.",
          "vi": "Mai mang bữa trưa của mình.",
          "highlight": "carries"
        },
        {
          "en": "She plays with her puppy.",
          "vi": "Cô ấy chơi với cún con.",
          "highlight": "plays"
        }
      ]
    },
    {
      "id": "u2-p2-card-4",
      "unitId": 2,
      "title": "Don't and doesn't",
      "titleVi": "Nói không làm việc gì",
      "ruleEn": "I / You / We / They → don't. He / She / It → doesn't. Always use the base verb after them.",
      "ruleVi": "Dùng don't hoặc doesn't theo chủ ngữ. Động từ phía sau không thêm s.",
      "examples": [
        {
          "en": "We don't swim at night.",
          "vi": "Chúng tôi không bơi vào buổi tối.",
          "highlight": "don't swim"
        },
        {
          "en": "He doesn't ride to school.",
          "vi": "Cậu ấy không đạp xe đến trường.",
          "highlight": "doesn't ride"
        }
      ]
    },
    {
      "id": "u2-p2-card-5",
      "unitId": 2,
      "title": "Do and Does questions",
      "titleVi": "Hỏi về thói quen",
      "ruleEn": "Do / Does + person + base verb?",
      "ruleVi": "Đặt Do hoặc Does trước chủ ngữ. Động từ phía sau không thêm s.",
      "examples": [
        {
          "en": "Do you draw every day?",
          "vi": "Bạn có vẽ mỗi ngày không?",
          "highlight": "Do"
        },
        {
          "en": "Does your mum read comics?",
          "vi": "Mẹ bạn có đọc truyện tranh không?",
          "highlight": "Does"
        }
      ]
    },
    {
      "id": "u2-p2-card-6",
      "unitId": 2,
      "title": "Short answers",
      "titleVi": "Câu trả lời ngắn",
      "ruleEn": "Do you...? → Yes, I do. / No, I don't. Does she...? → Yes, she does. / No, she doesn't.",
      "ruleVi": "Trả lời ngắn bằng do hoặc does, theo người được hỏi.",
      "examples": [
        {
          "en": "Does Nam sing? Yes, he does.",
          "vi": "Nam có hát không? Có.",
          "highlight": "does"
        },
        {
          "en": "Do they skate? No, they don't.",
          "vi": "Họ có trượt patin không? Không.",
          "highlight": "don't"
        }
      ]
    }
  ],
  "3": [
    {
      "id": "u3-p2-card-1",
      "unitId": 3,
      "title": "Home words: house, flat, bedroom",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "Our house has a blue door.",
          "vi": "Nhà của chúng tôi có cửa màu xanh.",
          "highlight": "house"
        },
        {
          "en": "Mai lives in a flat on the third floor.",
          "vi": "Mai sống trong căn hộ ở tầng ba.",
          "highlight": "flat"
        },
        {
          "en": "My bedroom has a small bed.",
          "vi": "Phòng ngủ của tôi có một chiếc giường nhỏ.",
          "highlight": "bedroom"
        }
      ]
    },
    {
      "id": "u3-p2-card-2",
      "unitId": 3,
      "title": "Home words: bathroom, kitchen, living room",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "I wash my hands in the bathroom.",
          "vi": "Tôi rửa tay trong phòng tắm.",
          "highlight": "bathroom"
        },
        {
          "en": "Dad cooks rice in the kitchen.",
          "vi": "Bố nấu cơm trong nhà bếp.",
          "highlight": "kitchen"
        },
        {
          "en": "We sit together in the living room.",
          "vi": "Chúng tôi ngồi cùng nhau trong phòng khách.",
          "highlight": "living room"
        }
      ]
    },
    {
      "id": "u3-p2-card-3",
      "unitId": 3,
      "title": "Home words: garden, floor, wall",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "We grow yellow flowers in the garden.",
          "vi": "Chúng tôi trồng hoa vàng trong vườn.",
          "highlight": "garden"
        },
        {
          "en": "My toy car is on the floor.",
          "vi": "Xe đồ chơi của tôi ở trên sàn nhà.",
          "highlight": "floor"
        },
        {
          "en": "There is a picture on the wall.",
          "vi": "Có một bức tranh trên tường.",
          "highlight": "wall"
        }
      ]
    },
    {
      "id": "u3-p2-card-4",
      "unitId": 3,
      "title": "Home words: ceiling, bed, table",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "The ceiling is white.",
          "vi": "Trần nhà màu trắng.",
          "highlight": "ceiling"
        },
        {
          "en": "My bed has a green blanket.",
          "vi": "Giường của tôi có một chiếc chăn xanh lá.",
          "highlight": "bed"
        },
        {
          "en": "Put your bowl on the table.",
          "vi": "Đặt bát của con lên bàn.",
          "highlight": "table"
        }
      ]
    },
    {
      "id": "u3-p2-card-5",
      "unitId": 3,
      "title": "Home words: chair, sofa, cupboard",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "This wooden chair is near the table.",
          "vi": "Chiếc ghế gỗ này ở gần bàn.",
          "highlight": "chair"
        },
        {
          "en": "Grandma sits on the sofa with me.",
          "vi": "Bà ngồi trên ghế sofa cùng tôi.",
          "highlight": "sofa"
        },
        {
          "en": "The cups are in the cupboard.",
          "vi": "Những chiếc cốc ở trong tủ.",
          "highlight": "cupboard"
        }
      ]
    },
    {
      "id": "u3-p2-card-6",
      "unitId": 3,
      "title": "Home words: wardrobe, bookcase, curtain",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "My coat is in the wardrobe.",
          "vi": "Áo khoác của tôi ở trong tủ quần áo.",
          "highlight": "wardrobe"
        },
        {
          "en": "Our bookcase has ten storybooks.",
          "vi": "Kệ sách của chúng tôi có mười cuốn truyện.",
          "highlight": "bookcase"
        },
        {
          "en": "This yellow curtain covers the window.",
          "vi": "Chiếc rèm vàng này che cửa sổ.",
          "highlight": "curtain"
        }
      ]
    },
    {
      "id": "u3-p2-card-7",
      "unitId": 3,
      "title": "Home words: carpet, key",
      "titleVi": "Từ vựng ngôi nhà",
      "ruleEn": "Explore three things around your home. Read the examples, then listen.",
      "ruleVi": "Khám phá ba từ trong nhà. Đọc ví dụ rồi nghe.",
      "examples": [
        {
          "en": "Our cat sleeps on the carpet.",
          "vi": "Mèo của chúng tôi ngủ trên thảm.",
          "highlight": "carpet"
        },
        {
          "en": "I give the door key to Mum.",
          "vi": "Tôi đưa chìa khóa cửa cho mẹ.",
          "highlight": "key"
        }
      ]
    },
    {
      "id": "u3-p2-card-8",
      "unitId": 3,
      "title": "Helping at home: clean, wash, tidy",
      "titleVi": "Cùng giúp việc nhà",
      "ruleEn": "Use these action words when you help at home.",
      "ruleVi": "Dùng những từ chỉ hành động này khi giúp việc nhà.",
      "examples": [
        {
          "en": "We clean the kitchen on Sunday.",
          "vi": "Chúng tôi lau dọn nhà bếp vào Chủ nhật.",
          "highlight": "clean"
        },
        {
          "en": "I wash my hands before dinner.",
          "vi": "Tôi rửa tay trước bữa tối.",
          "highlight": "wash"
        },
        {
          "en": "We tidy our room after playing.",
          "vi": "Chúng tôi dọn phòng gọn gàng sau khi chơi.",
          "highlight": "tidy"
        }
      ]
    },
    {
      "id": "u3-p2-card-9",
      "unitId": 3,
      "title": "Helping at home: put away, dust, make the bed",
      "titleVi": "Cùng giúp việc nhà",
      "ruleEn": "Use these action words when you help at home.",
      "ruleVi": "Dùng những từ chỉ hành động này khi giúp việc nhà.",
      "examples": [
        {
          "en": "Please put away your blocks.",
          "vi": "Hãy cất những khối xếp hình đúng chỗ.",
          "highlight": "put away"
        },
        {
          "en": "I dust the table with a soft cloth.",
          "vi": "Tôi lau bụi trên bàn bằng khăn mềm.",
          "highlight": "dust"
        },
        {
          "en": "I make the bed every morning.",
          "vi": "Tôi sắp xếp chăn gối mỗi sáng.",
          "highlight": "make the bed"
        }
      ]
    },
    {
      "id": "u3-p2-card-10",
      "unitId": 3,
      "title": "Helping at home: feed, water",
      "titleVi": "Cùng giúp việc nhà",
      "ruleEn": "Use these action words when you help at home.",
      "ruleVi": "Dùng những từ chỉ hành động này khi giúp việc nhà.",
      "examples": [
        {
          "en": "We feed our rabbit after school.",
          "vi": "Chúng tôi cho thỏ ăn sau giờ học.",
          "highlight": "feed"
        },
        {
          "en": "I water the flowers with Dad.",
          "vi": "Tôi tưới hoa cùng bố.",
          "highlight": "water"
        }
      ]
    }
  ]
};
