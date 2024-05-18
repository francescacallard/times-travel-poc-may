const data = [
  {
    id: 1,
    continent: 'Europe',
    country: 'Italy',
    image: 'italy.png',
    tripTypes: [
      {
        id: 1,
        name: 'Rural Retreat',
        itineraries: [
          {
            id: 1,
            name: 'Tuscany Countryside Escape',
            description: 'Explore the beautiful Tuscan countryside, stay in a charming villa, and enjoy local cuisine and wine.',
          },
          {
            id: 2,
            name: 'Umbria Rural Getaway',
            description: 'Discover the picturesque villages and rolling hills of Umbria, stay in a rustic farmhouse, and immerse yourself in the local culture.',
          },
        ],
      },
      {
        id: 2,
        name: 'Lake Tour',
        itineraries: [
          {
            id: 1,
            name: 'Italian Lakes Adventure',
            description: 'Visit the stunning lakes of Como, Garda, and Maggiore, enjoy boat tours, and explore the charming lakeside towns.',
          },
          {
            id: 2,
            name: 'Lake Como Relaxation',
            description: 'Relax by the serene Lake Como, stay in a luxurious resort, and indulge in spa treatments and delicious Italian cuisine.',
          },
        ],
      },
      // Add more trip types for Italy
    ],
  },
  {
    id: 2,
    continent: 'Europe',
    country: 'France',
    image: 'france.png',
    tripTypes: [
      {
        id: 1,
        name: 'Vineyard Tour',
        itineraries: [
          {
            id: 1,
            name: 'Bordeaux Wine Experience',
            description: 'Explore the renowned Bordeaux wine region, visit famous vineyards, and taste exquisite wines.',
          },
          {
            id: 2,
            name: 'Champagne Vineyard Escape',
            description: 'Discover the charming Champagne region, visit prestigious Champagne houses, and enjoy tastings and tours.',
          },
        ],
      },
      // Add more trip types for France
    ],
  },
  // Add more countries and their respective trip types and itineraries
];