import { WeddingEvent } from "./types";
import haldiImg from "./assets/images/haldi_illustration_1782213082788.jpg";
import janvasamImg from "./assets/images/janvasam_vector_1782217158160.jpg";
import sangeetImg from "./assets/images/sangeet_illustration_1782213098674.jpg";
import kalyanamImg from "./assets/images/kalyanam_illustration_1782213114192.jpg";
import receptionImg from "./assets/images/reception_vector_1782217191724.jpg";

export const BRIDE_NAME = "Shriya";
export const GROOM_NAME = "Subramanian";
export const VENUE_NAME = "Muhurat Resort";
export const VENUE_LOCATION = "Raipur, Chhattisgarh";
export const WEDDING_DATES = "August 30 & 31, 2026";

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "August 30, 2026",
    time: "10:00 AM Onwards",
    venue: "Poolside Lawn, Muhurat Resort",
    description: "Apply turmeric all over the Bride and Groom, for 'purification' of course. Jump into the pool afterwards for extra effect!",
    themeColor: "from-amber-100 via-amber-200/40 to-yellow-50",
    image: haldiImg,
    details: [
      "Turmeric Paste Application",
      "Marigold Petals Shower",
      "Dress Code: Vibrant Warm Pastels",
      "Tap the clay pot in the corner to splash marigolds!"
    ],
    dressTheme: "Vibrant Warm Pastels",
    iconName: "Flower",
    funActiveEffect: "marigold"
  },
  {
    id: "janavasam",
    title: "Janavasam followed by engagement ceremony",
    date: "August 30, 2026",
    time: "3:30 PM Onwards",
    venue: "Resort Entrance & Central Courtyard, Muhurat Resort",
    description: "Welcome the Groom and his family as they arrives in a grand manner, followed by another mini engagement, because twice is always nice",
    themeColor: "from-wedding-crimson/5 via-wedding-peach/25 to-wedding-plum/5",
    image: janvasamImg,
    details: [
      "Janavasam: Traditional Vintage Car Procession & Dhol Beats (3:30 PM)",
      "Engagement: Ring Exchange & Family Promises Ceremony (5:00 PM)",
      "Dress Code: Ethnic Sarees & Classic Veshtis"
    ],
    dressTheme: "Ethnic Sarees & Classic Veshtis",
    iconName: "Sparkles",
    funActiveEffect: "stars"
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    date: "August 30, 2026",
    time: "7:00 PM Onwards",
    venue: "Royal Grand Ballroom, Muhurat Resort",
    description: "Get ready to dance, dance, and dance. Show off your coordination (or lack of) and let yourself loose to make room for the dinner afterwards",
    themeColor: "from-wedding-plum via-indigo-950/70 to-wedding-plum",
    image: sangeetImg,
    details: [
      "Family Dance Performances",
      "Live DJ & Dashing Dance Floor",
      "Sumptuous Cocktail and Dinner Spread",
      "Dress Code: Shimmer, Sparkle, & Glamour!"
    ],
    dressTheme: "Shimmer, Sparkle, & Glamour!",
    iconName: "Music",
    funActiveEffect: "notes"
  },
  {
    id: "kalyanam",
    title: "Muhurtham",
    date: "August 31, 2026",
    time: "9:30 AM Onwards",
    venue: "Main Temple Mandap, Muhurat Resort",
    description: "A traditional Tamil wedding, to unite the Bride and Groom. No take backs after this",
    themeColor: "from-wedding-crimson via-orange-950/70 to-wedding-crimson",
    image: kalyanamImg,
    details: [
      "Kasi Yaatra: The traditional mock-pilgrimage where the groom is humorously stopped and persuaded to choose marriage life.",
      "Oonjal (Swing Ceremony): The couple sits on a decorated floral swing while ladies sing traditional songs and sway them gently to ward off negative vibes.",
      "Tying of the Sacred Mangalsutra (Mangalyam Dharnam)",
      "Saptapadi: Seven steps around the holy fire marking the marital vows",
      "Traditional South Indian feast served on fresh banana leaves",
      "Tap to ring the wedding temple bells!",
    ],
    dressTheme: "Your Best Authentic Traditional Attire",
    iconName: "Heart",
    funActiveEffect: "rice"
  },
  {
    id: "reception",
    title: "Reception",
    date: "August 31, 2026",
    time: "6:30 PM Onwards",
    venue: "Resort Palace Lawns, Muhurat Resort",
    description: "Come dressed your sharpest best, take photos, and wish the Bride and Groom a (very) happy future together",
    themeColor: "from-wedding-plum via-purple-950/80 to-wedding-plum",
    image: receptionImg,
    details: [
      "Greeting the Newlywed Couple",
      "Live Orchestral Melodies",
      "Multi-cuisine Gourmet Dining",
      "Dress Code: Royal Formals / Tuxedos / Sherwanis"
    ],
    dressTheme: "Royal Formals, Tuxedos, Sherwanis, Sarees or Lahengas",
    iconName: "Gift",
    funActiveEffect: "bubbles"
  }
];
