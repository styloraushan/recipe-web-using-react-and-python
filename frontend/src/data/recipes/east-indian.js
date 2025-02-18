import { Recipe } from '../../types';


  export const eastIndianRecipes = [
  {
    id: 'e1',
    title: 'Machher Jhol',
    hindiTitle: 'मछली झोल',
    region: 'East',
    category: 'Main Course',
    ingredients: [
      'Fish',
      'Potato',
      'Turmeric',
      'Mustard Oil',
      'Cumin Seeds',
      'Green Chilies',
      'Tomato'
    ],
    instructions: [
      'Marinate fish with turmeric and salt',
      'Heat mustard oil and fry fish until golden',
      'In the same oil, add cumin seeds and fry potatoes',
      'Add tomatoes and spices to make the gravy',
      'Add fish back and simmer until done'
    ],
    cookingTime: 40,
    difficulty: 'medium',
    servings: 4,
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&q=80',
    description: 'Bengali-style fish curry with light spices',
    culturalNote: 'A staple in Bengali households, traditionally served with rice'
  },
  {
    id: 'e2',
    title: 'Litti Chokha',
    hindiTitle: 'लिट्टी चोखा',
    region: 'East',
    category: 'Main Course',
    ingredients: [
      'Wheat Flour',
      'Sattu',
      'Mustard Oil',
      'Brinjal',
      'Potato',
      'Tomato',
      'Spices'
    ],
    instructions: [
      'Make dough with wheat flour and water',
      'Prepare sattu filling with spices',
      'Stuff the dough balls with filling',
      'Bake littis in tandoor or oven',
      'Roast vegetables for chokha',
      'Mash vegetables with spices'
    ],
    cookingTime: 60,
    difficulty: 'hard',
    servings: 4,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80',
    description: 'Whole wheat dumplings with roasted vegetable mash',
    culturalNote: 'A traditional Bihari dish, popular street food in Eastern India'
  },
  {
    id: 'e3',
    title: 'Rasgulla',
    hindiTitle: 'रसगुल्ला',
    region: 'East',
    category: 'Dessert',
    ingredients: [
      'Paneer',
      'Sugar',
      'Cardamom',
      'Rose Water'
    ],
    instructions: [
      'Knead fresh paneer until smooth',
      'Shape into small balls',
      'Prepare sugar syrup with cardamom',
      'Cook paneer balls in syrup',
      'Add rose water and cool'
    ],
    cookingTime: 40,
    difficulty: 'medium',
    servings: 6,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
    description: 'Soft cheese balls in sweet syrup',
    culturalNote: 'A beloved Bengali sweet, now popular throughout India'
  }
];