// Product catalogue for Kadha. Sample data — replace with real products, prices and notes.
const PRODUCTS = [
  {
    id: "velvet-haze",
    name: "Velvet Haze",
    type: "Eau de Parfum",
    family: "Amber",
    gender: "Unisex",
    moods: ["evening", "romantic"],
    image: "images/velvet-haze.png",
    badge: "Bestseller",
    hook: "A midnight dance, a silk scarf left behind, and smoke that still remembers.",
    story: [
      "It was the last song of the night. The band had slowed, the lamps had dimmed to amber, and somewhere between the second and third turn she laughed and the room went soft around the edges.",
      "Velvet Haze is that moment, bottled — warm saffron and pink pepper drifting into a heart of rose and oud, settling into a slow, smoky trail of amber and musk that lingers long after the music stops."
    ],
    notes: {
      top: ["Saffron", "Pink pepper"],
      heart: ["Damask rose", "Oud"],
      base: ["Amber", "White musk", "Incense"]
    },
    profile: { longevity: 5, projection: 4 },
    season: "Autumn · Winter",
    time: "Evening",
    sizes: [
      { ml: 10, price: 899 },
      { ml: 50, price: 2999 },
      { ml: 100, price: 4799 }
    ],
    rating: 4.8,
    reviews: 126
  },
  {
    id: "autumn-letters",
    name: "Autumn Letters",
    type: "Eau de Parfum",
    family: "Woody",
    gender: "Unisex",
    moods: ["calm", "evening"],
    image: "images/autumn-letters.png",
    badge: "New",
    hook: "Fallen leaves, an old wooden bench, and a letter you never sent.",
    story: [
      "Every autumn he walked to the same bench beneath the same tree, carrying the same unopened letter. The leaves fell around him in copper and rust, and the wood beneath his hands was warm from the afternoon sun.",
      "Autumn Letters opens with crisp cardamom and bergamot, warms into a heart of cinnamon bark and dry leaves, and rests on cedar, vetiver and a whisper of tobacco — the scent of things left unsaid."
    ],
    notes: {
      top: ["Cardamom", "Bergamot"],
      heart: ["Cinnamon bark", "Dry leaves", "Clove"],
      base: ["Cedarwood", "Vetiver", "Tobacco"]
    },
    profile: { longevity: 4, projection: 3 },
    season: "Autumn",
    time: "Day · Evening",
    sizes: [
      { ml: 10, price: 849 },
      { ml: 50, price: 2799 },
      { ml: 100, price: 4499 }
    ],
    rating: 4.7,
    reviews: 84
  },
  {
    id: "moss-and-memory",
    name: "Moss & Memory",
    type: "Eau de Toilette",
    family: "Green",
    gender: "Unisex",
    moods: ["fresh", "calm"],
    image: "images/moss-and-memory.png",
    hook: "A grandmother's garden after the rain, where the stones grew soft and green.",
    story: [
      "Behind the old house was a garden no one tended anymore. Moss had covered the stone path, tiny wildflowers pushed up between the cracks, and after every rain the air smelled cool, green and alive.",
      "Moss & Memory captures that quiet corner — bright galbanum and green leaves over a heart of oakmoss and wild chamomile, resting on soft patchouli and damp earth."
    ],
    notes: {
      top: ["Galbanum", "Green leaves"],
      heart: ["Oakmoss", "Wild chamomile"],
      base: ["Patchouli", "Petrichor", "Musk"]
    },
    profile: { longevity: 3, projection: 3 },
    season: "Spring · Monsoon",
    time: "Day",
    sizes: [
      { ml: 10, price: 699 },
      { ml: 50, price: 2299 },
      { ml: 100, price: 3699 }
    ],
    rating: 4.6,
    reviews: 58
  },
  {
    id: "monsoon-canopy",
    name: "Monsoon Canopy",
    type: "Eau de Parfum",
    family: "Fresh",
    gender: "Men",
    moods: ["fresh", "calm"],
    image: "images/monsoon-canopy.png",
    badge: "Bestseller",
    hook: "The first rain over the Western Ghats — wet leaves, wild ginger and a forest breathing again.",
    story: [
      "When the monsoon arrives in the hills, the whole forest seems to exhale. Water drips from leaves as big as umbrellas, wild ginger blooms along the trail, and the earth smells deeper and darker than it did the day before.",
      "Monsoon Canopy opens with a rush of green mandarin and fresh ginger, flows into a heart of banana leaf and cardamom, and grounds itself in vetiver, sandalwood and the unmistakable scent of rain on soil."
    ],
    notes: {
      top: ["Green mandarin", "Wild ginger"],
      heart: ["Banana leaf", "Cardamom"],
      base: ["Vetiver", "Sandalwood", "Petrichor"]
    },
    profile: { longevity: 4, projection: 4 },
    season: "Monsoon · Summer",
    time: "Day",
    sizes: [
      { ml: 10, price: 849 },
      { ml: 50, price: 2899 },
      { ml: 100, price: 4599 }
    ],
    rating: 4.9,
    reviews: 203
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    type: "Eau de Parfum",
    family: "Citrus",
    gender: "Women",
    moods: ["romantic", "festive"],
    image: "images/golden-hour.png",
    hook: "Sunlight on silk, dried oranges on the windowsill, and a promise made at dusk.",
    story: [
      "It was the hour when everything turns gold — the curtains, the dust in the air, the oranges drying on the sill. She tied a ribbon around a small bottle and wrote a single line on the card: \"For every evening like this one.\"",
      "Golden Hour is radiant and warm: sun-dried blood orange and neroli give way to jasmine sambac and orange blossom, then melt into vanilla, tonka bean and soft sandalwood."
    ],
    notes: {
      top: ["Blood orange", "Neroli"],
      heart: ["Jasmine sambac", "Orange blossom"],
      base: ["Vanilla", "Tonka bean", "Sandalwood"]
    },
    profile: { longevity: 4, projection: 3 },
    season: "All seasons",
    time: "Day · Evening",
    sizes: [
      { ml: 10, price: 799 },
      { ml: 50, price: 2699 },
      { ml: 100, price: 4299 }
    ],
    rating: 4.8,
    reviews: 147
  }
];

const MOODS = {
  romantic: "Romantic",
  fresh: "Fresh Morning",
  evening: "Evening Out",
  festive: "Festive",
  calm: "Calm & Quiet"
};

const FAMILIES = ["Amber", "Woody", "Green", "Fresh", "Citrus"];
const GENDERS = ["Women", "Men", "Unisex"];

// Fragrance-finder quiz. Each answer adds points to the products it lists.
const QUIZ = [
  {
    q: "Where does your story begin?",
    a: [
      { label: "A candlelit room after midnight", score: ["velvet-haze"] },
      { label: "A forest trail in the rain", score: ["monsoon-canopy", "moss-and-memory"] },
      { label: "A quiet bench under falling leaves", score: ["autumn-letters"] },
      { label: "A sunlit window at dusk", score: ["golden-hour"] }
    ]
  },
  {
    q: "Pick a texture.",
    a: [
      { label: "Velvet", score: ["velvet-haze", "golden-hour"] },
      { label: "Old wood", score: ["autumn-letters"] },
      { label: "Soft moss", score: ["moss-and-memory"] },
      { label: "Cool leaves", score: ["monsoon-canopy"] }
    ]
  },
  {
    q: "When will you wear it most?",
    a: [
      { label: "Evenings out", score: ["velvet-haze", "autumn-letters"] },
      { label: "Every day", score: ["moss-and-memory", "monsoon-canopy"] },
      { label: "Special occasions", score: ["golden-hour", "velvet-haze"] },
      { label: "Slow weekends", score: ["autumn-letters", "moss-and-memory"] }
    ]
  }
];
