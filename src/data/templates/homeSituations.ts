/** Four authored task situations for each of the 28 taught home words. */
export const HOME_SITUATIONS: Record<string, readonly string[]> = {
  "house": [
    "Our home is one building. It has a garden.",
    "There is a blue door on our home. It is one building.",
    "Our home has a kitchen and a bedroom. It is not a flat.",
    "We play outside our home in the garden. Our home is one building."
  ],
  "flat": [
    "Our home is on the third floor. Other families live in the building.",
    "Mai lives above another family in the same building.",
    "There are many homes in our building. Our home is one of them.",
    "We go upstairs to our home. Other homes are on the floors below."
  ],
  "bedroom": [
    "I sleep here at night. My bed is in this room.",
    "My blanket and pillows are in this room.",
    "I put clothes beside my bed in this room.",
    "We put the bed and wardrobe in this room."
  ],
  "bathroom": [
    "I wash my hands here before dinner. This room has a shower.",
    "There is water in the bath in this room.",
    "The shower is in this room.",
    "We clean the bath in this room."
  ],
  "kitchen": [
    "Dad cooks rice here. This is a room.",
    "We wash the dishes in this room after dinner.",
    "Mum puts clean cups in this room. It is a room for cooking.",
    "There is food on the table in this room. We eat dinner here."
  ],
  "living room": [
    "Our family sits together here on the sofa.",
    "We watch TV together on the sofa in this room.",
    "Grandma reads with us on the sofa in this room.",
    "We put a sofa in this room for our family to sit together."
  ],
  "garden": [
    "The flowers grow here outside our home.",
    "Dad waters plants here outside the house.",
    "Our rabbit plays beside the flowers outside.",
    "We grow yellow flowers here beside our house."
  ],
  "floor": [
    "My feet are on this part of the room.",
    "The toy car is below the table, under our feet.",
    "We clean this part of the room under the chairs.",
    "The carpet covers this part of the room."
  ],
  "wall": [
    "We hang a picture on the side of the room.",
    "The window is in this side of the room.",
    "We paint the side of the room blue.",
    "There is a picture beside the door on this side of the room."
  ],
  "ceiling": [
    "This part of the room is above my head.",
    "We look up at the white top of the room.",
    "The walls are blue, but the top of the room is white.",
    "We paint the top of the room above the bed."
  ],
  "bed": [
    "I sleep in this piece of furniture.",
    "We put a blanket and pillows on this furniture.",
    "My green blanket covers this furniture.",
    "I make this furniture neat every morning with the pillows."
  ],
  "table": [
    "We put plates on this furniture for dinner.",
    "Dad puts the bowls on this furniture for our meal.",
    "We sit around this furniture to eat.",
    "I wash this furniture after dinner. The plates are on it."
  ],
  "chair": [
    "This seat is for one person. It has a back.",
    "I sit on a seat with a back beside the table.",
    "We put four seats with backs around the table.",
    "Grandpa sits on a wooden seat for one person."
  ],
  "sofa": [
    "Two children sit on this long soft seat.",
    "Grandma and I sit together on this soft seat.",
    "Our family watches TV on a long seat.",
    "We put a long soft seat in the living room."
  ],
  "cupboard": [
    "We keep cups and plates inside this furniture.",
    "Mum puts the clean bowls inside this furniture.",
    "Open this furniture to find the cups for dinner.",
    "The plates are inside this furniture in the kitchen."
  ],
  "wardrobe": [
    "My coat hangs inside this furniture.",
    "We keep our clothes inside this furniture.",
    "I open this furniture to find my coat. The clothes hang inside.",
    "Mum puts a coat beside my clothes inside this furniture."
  ],
  "bookcase": [
    "Ten storybooks are on the shelves of this furniture.",
    "I put my books on the shelves of this furniture.",
    "We find a storybook on this furniture with shelves.",
    "Dad puts more books on the shelves beside my storybooks."
  ],
  "curtain": [
    "This cloth hangs beside the window.",
    "We cover the window with this yellow cloth.",
    "Mum hangs a cloth beside the bedroom window.",
    "The yellow cloth by our window is not a carpet."
  ],
  "carpet": [
    "This soft thing covers the floor.",
    "Our cat sleeps on a soft cover on the floor.",
    "We put a soft cover under the table on the floor.",
    "My feet are on a soft cover over the floor."
  ],
  "key": [
    "I use this small metal thing to open a locked door.",
    "Mum gives me a small metal thing for the locked door.",
    "The door is locked. I need the small metal thing that opens it.",
    "Dad opens the locked door with a small metal thing."
  ],
  "clean": [
    "The kitchen is dirty. We make it not dirty.",
    "The table is dirty after dinner. We make it not dirty.",
    "There is dirt on the floor. We make the floor not dirty.",
    "Our bedroom is dirty. We make it not dirty."
  ],
  "wash": [
    "My hands are dirty. I use water to make them clean.",
    "The dishes are dirty. We use water to make them clean.",
    "The cup is dirty. I use water to make it clean.",
    "Our clothes are dirty. We use water to make them clean."
  ],
  "tidy": [
    "The room is not neat. We make it neat.",
    "The bedroom is not neat after playing. We make it neat.",
    "Our living room is not neat. We make it neat.",
    "Our toys are all over the room. We make the room neat."
  ],
  "put away": [
    "The blocks are out. Move them back to their place.",
    "The books are on the floor. Move them back to their place.",
    "The toys are on the table. Move them back to their place.",
    "The clothes are on the bed. Move them back to their place."
  ],
  "dust": [
    "Use a cloth to remove dust from the table.",
    "Use a soft cloth to remove dust from the bookcase.",
    "There is dust on the chair. Remove it with a cloth.",
    "Use a cloth to remove dust from the cupboard."
  ],
  "make the bed": [
    "The blanket and pillows are not neat. Put them neatly on the bed.",
    "In the morning, put the pillows and blanket neatly on the bed.",
    "The pillows are on the floor. Put them neatly on the bed with the blanket.",
    "Help Mum put the blanket and pillows neatly on the bed."
  ],
  "feed": [
    "The rabbit needs food. Give it some food.",
    "Our cat needs food. Give it some food.",
    "Help Dad give food to the rabbit.",
    "Give the cat food after school."
  ],
  "water": [
    "The flowers need water. Give them some water.",
    "The plants in our garden need water. Give them some water.",
    "Help Dad give water to the flowers.",
    "Give the plants water in the morning."
  ]
};

/** Natural responses aligned with each authored situation, using the same taught target. */
export const HOME_RESPONSES: Record<string, readonly string[]> = {
  "house": [
    "Our house has a garden.",
    "Our house has a blue door.",
    "Our house has a kitchen and a bedroom.",
    "We play outside our house."
  ],
  "flat": [
    "Our flat is on the third floor.",
    "Mai lives in a flat.",
    "Our home is a flat in a building with other homes.",
    "Our flat is above other homes."
  ],
  "bedroom": [
    "I sleep in my bedroom.",
    "The blanket and pillows are in my bedroom.",
    "I put clothes in my bedroom.",
    "We put the bed and wardrobe in the bedroom."
  ],
  "bathroom": [
    "I wash my hands in the bathroom.",
    "There is water in the bath in the bathroom.",
    "The shower is in the bathroom.",
    "We clean the bath in the bathroom."
  ],
  "kitchen": [
    "Dad cooks rice in the kitchen.",
    "We wash the dishes in the kitchen.",
    "Mum puts clean cups in the kitchen.",
    "We eat dinner in the kitchen."
  ],
  "living room": [
    "Our family sits together in the living room.",
    "We watch TV in the living room.",
    "Grandma reads with us in the living room.",
    "We put a sofa in the living room."
  ],
  "garden": [
    "The flowers grow in the garden.",
    "Dad waters plants in the garden.",
    "Our rabbit plays in the garden.",
    "We grow yellow flowers in the garden."
  ],
  "floor": [
    "My feet are on the floor.",
    "The toy car is on the floor.",
    "We clean the floor under the chairs.",
    "The carpet covers the floor."
  ],
  "wall": [
    "We hang a picture on the wall.",
    "The window is in the wall.",
    "We paint the wall blue.",
    "There is a picture on the wall beside the door."
  ],
  "ceiling": [
    "The ceiling is above my head.",
    "We look up at the ceiling.",
    "The ceiling is white.",
    "We paint the ceiling above the bed."
  ],
  "bed": [
    "I sleep in my bed.",
    "We put a blanket and pillows on the bed.",
    "My green blanket covers the bed.",
    "I make my bed neat every morning."
  ],
  "table": [
    "We put plates on the table.",
    "Dad puts the bowls on the table.",
    "We sit around the table to eat.",
    "I wash the table after dinner."
  ],
  "chair": [
    "This chair is a seat for one person.",
    "I sit on a chair beside the table.",
    "We put four chairs around the table.",
    "Grandpa sits on a wooden chair."
  ],
  "sofa": [
    "Two children sit on the sofa.",
    "Grandma and I sit on the sofa.",
    "Our family watches TV on the sofa.",
    "We put a sofa in the living room."
  ],
  "cupboard": [
    "We keep cups and plates in the cupboard.",
    "Mum puts the clean bowls in the cupboard.",
    "Open the cupboard to find the cups.",
    "The plates are in the cupboard."
  ],
  "wardrobe": [
    "My coat hangs in the wardrobe.",
    "We keep our clothes in the wardrobe.",
    "I open the wardrobe to find my coat.",
    "Mum puts a coat in the wardrobe."
  ],
  "bookcase": [
    "Our bookcase has ten storybooks.",
    "I put my books on the bookcase.",
    "We find a storybook on the bookcase.",
    "Dad puts more books on the bookcase."
  ],
  "curtain": [
    "The curtain hangs beside the window.",
    "We cover the window with a curtain.",
    "Mum hangs a curtain beside the window.",
    "The yellow curtain is by our window."
  ],
  "carpet": [
    "The carpet covers the floor.",
    "Our cat sleeps on the carpet.",
    "We put a carpet under the table.",
    "My feet are on the carpet."
  ],
  "key": [
    "I use a key to open the locked door.",
    "Mum gives me the door key.",
    "I need the door key.",
    "Dad opens the locked door with a key."
  ],
  "clean": [
    "We clean the kitchen.",
    "We clean the table after dinner.",
    "We clean the floor.",
    "We clean our bedroom."
  ],
  "wash": [
    "I wash my hands.",
    "We wash the dishes.",
    "I wash the cup.",
    "We wash our clothes."
  ],
  "tidy": [
    "We tidy our room.",
    "We tidy our bedroom after playing.",
    "We tidy our living room.",
    "We tidy our room after playing with toys."
  ],
  "put away": [
    "Please put away the blocks.",
    "Please put away the books.",
    "Please put away the toys.",
    "Please put away the clothes."
  ],
  "dust": [
    "I dust the table with a cloth.",
    "I dust the bookcase with a soft cloth.",
    "I dust the chair with a cloth.",
    "I dust the cupboard with a cloth."
  ],
  "make the bed": [
    "I make the bed with the blanket and pillows.",
    "I make the bed every morning.",
    "I make the bed with the pillows and blanket.",
    "I help Mum make the bed."
  ],
  "feed": [
    "We feed the rabbit.",
    "We feed our cat.",
    "We help Dad feed the rabbit.",
    "We feed the cat after school."
  ],
  "water": [
    "I water the flowers.",
    "I water the plants in our garden.",
    "I help Dad water the flowers.",
    "I water the plants in the morning."
  ]
};
