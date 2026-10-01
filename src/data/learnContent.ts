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
  1: [
    {
      id: 'u1-card-1',
      unitId: 1,
      title: 'The Verb "To Be" (am / is / are)',
      titleVi: 'Động Từ "To Be"',
      ruleEn: 'We use "am" with I. We use "is" with he, she, it. We use "are" with you, we, they.',
      ruleVi: 'Ta dùng "am" với I. Ta dùng "is" với he, she, it. Ta dùng "are" với you, we, they.',
      examples: [
        { en: 'I am a student.', vi: 'Tôi là một học sinh.', highlight: 'am' },
        { en: 'She is my friend.', vi: 'Cô ấy là bạn của tôi.', highlight: 'is' },
        { en: 'They are at school.', vi: 'Họ đang ở trường học.', highlight: 'are' },
      ],
      tip: {
        en: 'Short forms: I\'m, He\'s, She\'s, We\'re, They\'re.',
        vi: 'Cách viết tắt: I\'m, He\'s, She\'s, We\'re, They\'re.',
      },
    },
    {
      id: 'u1-card-2',
      unitId: 1,
      title: 'There is & There are',
      titleVi: 'Có một / Có nhiều',
      ruleEn: 'Use "There is" for ONE thing (singular). Use "There are" for TWO or MORE things (plural).',
      ruleVi: 'Dùng "There is" cho 1 đồ vật (số ít). Dùng "There are" cho 2 đồ vật trở lên (số nhiều).',
      examples: [
        { en: 'There is a computer in the room.', vi: 'Có một chiếc máy tính trong phòng.', highlight: 'There is' },
        { en: 'There are two books on the desk.', vi: 'Có hai quyển sách ở trên bàn.', highlight: 'There are' },
      ],
      tip: {
        en: 'Count nouns: 1 cat -> There is a cat. 3 cats -> There are three cats.',
        vi: 'Đếm danh từ: 1 con mèo dùng There is. Nhiều con mèo dùng There are.',
      },
    },
    {
      id: 'u1-card-3',
      unitId: 1,
      title: 'This, That, These, Those',
      titleVi: 'Đại Từ Chỉ Định',
      ruleEn: 'This (1 near) · That (1 far) · These (many near) · Those (many far)',
      ruleVi: 'This (1 cái ở gần) · That (1 cái ở xa) · These (nhiều cái ở gần) · Those (nhiều cái ở xa)',
      examples: [
        { en: 'This is my book in my hand.', vi: 'Đây là cuốn sách trong tay tôi.', highlight: 'This' },
        { en: 'That is your bag across the room.', vi: 'Kia là chiếc cặp của bạn ở bên kia phòng.', highlight: 'That' },
        { en: 'These are my shoes.', vi: 'Đây là đôi giày của tôi.', highlight: 'These' },
        { en: 'Those are their bicycles.', vi: 'Kia là những chiếc xe đạp của họ.', highlight: 'Those' },
      ],
    },
  ],
  2: [
    {
      id: 'u2-card-1',
      unitId: 2,
      title: 'Present Simple: Daily Actions',
      titleVi: 'Thì Hiện Tại Đơn: Thói Quen Hàng Ngày',
      ruleEn: 'We use the Present Simple to talk about routines and facts.',
      ruleVi: 'Ta dùng thì Hiện tại đơn để nói về thói quen và sự thật hiển nhiên.',
      examples: [
        { en: 'I walk to school every day.', vi: 'Tôi đi bộ đến trường mỗi ngày.', highlight: 'walk' },
        { en: 'We play football in the park.', vi: 'Chúng tôi chơi bóng đá ở công viên.', highlight: 'play' },
      ],
    },
    {
      id: 'u2-card-2',
      unitId: 2,
      title: 'Special Rule: He, She, It (+s / +es / +ies)',
      titleVi: 'Quy Tắc Thêm -s / -es Cho He, She, It',
      ruleEn: 'When the subject is he, she, or it, add -s to the verb. Verbs ending in -ch, -sh, -o, -x take -es.',
      ruleVi: 'Khi chủ ngữ là he, she, it, ta thêm -s vào động từ. Đuôi -ch, -sh, -o, -x thêm -es.',
      examples: [
        { en: 'She plays football.', vi: 'Cô ấy chơi bóng đá.', highlight: 'plays' },
        { en: 'He watches TV in the evening.', vi: 'Cậu ấy xem TV vào buổi tối.', highlight: 'watches' },
        { en: 'She goes to school at 7 AM.', vi: 'Cô ấy đến trường lúc 7 giờ sáng.', highlight: 'goes' },
        { en: 'He studies English.', vi: 'Cậu ấy học tiếng Anh.', highlight: 'studies' },
      ],
    },
    {
      id: 'u2-card-3',
      unitId: 2,
      title: 'Negative & Questions (Do / Does)',
      titleVi: 'Câu Phủ Định & Câu Hỏi (Do / Does)',
      ruleEn: 'Use "don\'t" with I/you/we/they. Use "doesn\'t" with he/she/it. In questions, start with Do or Does.',
      ruleVi: 'Dùng "don\'t" với I/you/we/they. Dùng "doesn\'t" với he/she/it. Trong câu hỏi, bắt đầu bằng Do hoặc Does.',
      examples: [
        { en: 'They don\'t like coffee.', vi: 'Họ không thích cà phê.', highlight: "don't" },
        { en: 'She doesn\'t drink soda.', vi: 'Cô ấy không uống nước ngọt có ga.', highlight: "doesn't" },
        { en: 'Do you play football? – Yes, I do.', vi: 'Bạn có chơi bóng đá không? – Vâng, tôi có.', highlight: 'Do' },
        { en: 'Does she study English? – Yes, she does.', vi: 'Cô ấy có học tiếng Anh không? – Vâng, có.', highlight: 'Does' },
      ],
    },
  ],
  3: [
    {
      id: 'u3-card-1',
      unitId: 3,
      title: 'Rooms in My Home',
      titleVi: 'Các Căn Phòng Trong Nhà',
      ruleEn: 'Every home has special rooms for sleeping, eating, and relaxing.',
      ruleVi: 'Mỗi ngôi nhà có các phòng để ngủ, ăn uống và nghỉ ngơi.',
      examples: [
        { en: 'Living room: where the family watches TV.', vi: 'Phòng khách: nơi gia đình xem TV.', highlight: 'living room' },
        { en: 'Kitchen: where we cook meals.', vi: 'Nhà bếp: nơi nấu nướng.', highlight: 'kitchen' },
        { en: 'Bedroom: where we sleep.', vi: 'Phòng ngủ: nơi nằm ngủ.', highlight: 'bedroom' },
        { en: 'Bathroom: where we take a shower.', vi: 'Phòng tắm: nơi tắm rửa.', highlight: 'bathroom' },
        { en: 'Garden: where flowers and trees grow.', vi: 'Vườn: nơi trồng cây và hoa.', highlight: 'garden' },
      ],
    },
    {
      id: 'u3-card-2',
      unitId: 3,
      title: 'Furniture & Parts of a Room',
      titleVi: 'Đồ Nội Thất & Bộ Phận Của Phòng',
      ruleEn: 'Learn common furniture and objects you see every day.',
      ruleVi: 'Học các từ vựng đồ nội thất và đồ vật quen thuộc trong phòng.',
      examples: [
        { en: 'Sofa and armchair: comfortable seats.', vi: 'Sofa và ghế bành: chỗ ngồi êm ái.', highlight: 'sofa' },
        { en: 'Wardrobe and cupboard: for storing clothes and dishes.', vi: 'Tủ quần áo và tủ chén.', highlight: 'wardrobe' },
        { en: 'Bookcase: holds all your favourite books.', vi: 'Kệ sách: đựng những quyển sách yêu thích.', highlight: 'bookcase' },
        { en: 'Curtains and carpet: keep the room pretty and warm.', vi: 'Rèm cửa và thảm sàn.', highlight: 'curtains' },
      ],
    },
    {
      id: 'u3-card-3',
      unitId: 3,
      title: 'Useful Household Phrases',
      titleVi: 'Các Cụm Từ Làm Việc Nhà Thường Gặp',
      ruleEn: 'Common collocations with "do", "make", and daily chores.',
      ruleVi: 'Các cụm từ quen thuộc với "do", "make" và công việc nhà.',
      examples: [
        { en: 'Make your bed every morning.', vi: 'Gấp chăn màn mỗi buổi sáng.', highlight: 'make your bed' },
        { en: 'Do the cooking / Do the housework.', vi: 'Nấu ăn / Làm việc nhà.', highlight: 'do the' },
        { en: 'Tidy your bedroom and put away your toys.', vi: 'Dọn phòng và cất đồ chơi gọn gàng.', highlight: 'tidy' },
        { en: 'Feed the pet dog and water the plants.', vi: 'Cho cún ăn và tưới cây.', highlight: 'feed' },
      ],
    },
  ],
};
