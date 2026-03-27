export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  maxQuantity: number;
  soldCount: number;
}

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: {
    address: string;
    city: string;
    state: string;
    venue: string;
  };
  image: string;
  featured: boolean;
  category: string;
  organizer: {
    name: string;
    email: string;
  };
  tickets: TicketTier[];
  attendeeCount: number;
  vendorCount: number;
  maxVendors: number;
  maxAttendees: number;
}

export const events: Event[] = [
  {
    id: "spring-fling-2026",
    name: "2nd Annual Spring Fling Vendor Expo",
    tagline: "Wayne County's Premier Spring Shopping Experience",
    description: "Join us for the 2nd Annual Spring Fling Vendor Expo at the beautiful Wayne County Fairgrounds! Browse unique handmade crafts, artisan goods, delicious food trucks, and discover local treasures. Perfect for the whole family with Easter-themed activities and spring decor throughout the venue. Over 100 vendors expected with something for everyone!",
    date: "April 4, 2026",
    time: "9:00 AM - 5:00 PM",
    location: {
      address: "861 Salisbury Rd",
      city: "Richmond",
      state: "Indiana",
      venue: "Wayne County Fairgrounds - First Bank Expo Hall"
    },
    image: "/images/spring-fling-expo.jpg",
    featured: true,
    category: "Vendor Expo",
    organizer: {
      name: "VendorSquare Events",
      email: "events@vendorsquare.com"
    },
    tickets: [
      {
        id: "booth-standard",
        name: "Standard Vendor Booth",
        price: 59.99,
        description: "10x10 booth space with 1 table and 2 chairs included",
        maxQuantity: 80,
        soldCount: 47
      },
      {
        id: "food-truck",
        name: "Food Truck Space",
        price: 89.99,
        description: "Premium food truck parking with electrical hookup",
        maxQuantity: 15,
        soldCount: 11
      },
      {
        id: "table-addon",
        name: "Additional Table",
        price: 24.99,
        description: "Extra 6ft table for your booth",
        maxQuantity: 50,
        soldCount: 23
      },
      {
        id: "booth-bundle",
        name: "Booth + Extra Table Bundle",
        price: 74.99,
        description: "Standard booth with an additional table included",
        maxQuantity: 40,
        soldCount: 18
      },
      {
        id: "full-bundle",
        name: "Premium Vendor Package",
        price: 120.00,
        description: "Corner booth with 2 extra tables, premium placement, and featured listing",
        maxQuantity: 10,
        soldCount: 6
      }
    ],
    attendeeCount: 342,
    vendorCount: 82,
    maxVendors: 120,
    maxAttendees: 2000
  },
  {
    id: "spring-vendor-market-2026",
    name: "Spring Vendor Market",
    tagline: "Two Days of Local Treasures in Beautiful Oregon",
    description: "Experience the magic of spring at our outdoor vendor market! Featuring local artisans, farmers, and craftspeople from across Oregon. Enjoy live music, delicious local food, and family-friendly activities. Rain or shine, under our covered pavilion areas.",
    date: "April 25-26, 2026",
    time: "9:00 AM - 5:00 PM",
    location: {
      address: "21 Peninger Road",
      city: "Central Point",
      state: "Oregon",
      venue: "Jackson County Expo"
    },
    image: "/images/spring-vendor-market.jpg",
    featured: true,
    category: "Outdoor Market",
    organizer: {
      name: "Oregon Markets Co.",
      email: "hello@oregonmarkets.com"
    },
    tickets: [
      {
        id: "booth-single",
        name: "Single Day Booth",
        price: 45.00,
        description: "10x10 outdoor booth space for one day",
        maxQuantity: 60,
        soldCount: 38
      },
      {
        id: "booth-weekend",
        name: "Weekend Booth Pass",
        price: 75.00,
        description: "10x10 outdoor booth space for both days",
        maxQuantity: 50,
        soldCount: 29
      },
      {
        id: "covered-booth",
        name: "Covered Pavilion Booth",
        price: 95.00,
        description: "Protected 10x10 space under the pavilion",
        maxQuantity: 20,
        soldCount: 18
      }
    ],
    attendeeCount: 567,
    vendorCount: 67,
    maxVendors: 100,
    maxAttendees: 3000
  },
  {
    id: "artisan-craft-fair-2026",
    name: "Midwest Artisan Craft Fair",
    tagline: "Handmade Excellence from Local Artists",
    description: "Discover unique handcrafted items from over 75 talented artisans. From pottery and jewelry to woodworking and textiles, find one-of-a-kind pieces you won't see anywhere else. Free admission for attendees!",
    date: "May 2, 2026",
    time: "10:00 AM - 6:00 PM",
    location: {
      address: "500 S Capitol Ave",
      city: "Indianapolis",
      state: "Indiana",
      venue: "Indiana State Fairgrounds"
    },
    image: "/images/spring-fling-expo.jpg",
    featured: false,
    category: "Craft Fair",
    organizer: {
      name: "Midwest Artisans Guild",
      email: "info@midwestartisans.org"
    },
    tickets: [
      {
        id: "vendor-booth",
        name: "Artisan Booth",
        price: 65.00,
        description: "8x8 booth with display table",
        maxQuantity: 75,
        soldCount: 52
      },
      {
        id: "premium-corner",
        name: "Corner Booth Premium",
        price: 95.00,
        description: "10x10 corner booth with extra visibility",
        maxQuantity: 12,
        soldCount: 10
      }
    ],
    attendeeCount: 289,
    vendorCount: 62,
    maxVendors: 87,
    maxAttendees: 1500
  },
  {
    id: "farmers-market-grand-opening",
    name: "Summer Farmers Market Grand Opening",
    tagline: "Fresh From Farm to Table",
    description: "Kick off the summer season with our grand opening celebration! Fresh produce, local honey, baked goods, and farm-fresh eggs. Meet your local farmers and support sustainable agriculture.",
    date: "May 10, 2026",
    time: "7:00 AM - 1:00 PM",
    location: {
      address: "123 Main Street",
      city: "Columbus",
      state: "Ohio",
      venue: "Downtown Columbus Market Square"
    },
    image: "/images/spring-vendor-market.jpg",
    featured: false,
    category: "Farmers Market",
    organizer: {
      name: "Columbus Farmers Coalition",
      email: "market@columbusfarmers.org"
    },
    tickets: [
      {
        id: "farm-stand",
        name: "Farm Stand Space",
        price: 35.00,
        description: "Weekly market space for the season",
        maxQuantity: 40,
        soldCount: 28
      },
      {
        id: "produce-booth",
        name: "Large Produce Booth",
        price: 55.00,
        description: "Double-wide space for larger operations",
        maxQuantity: 15,
        soldCount: 12
      }
    ],
    attendeeCount: 456,
    vendorCount: 40,
    maxVendors: 55,
    maxAttendees: 2000
  },
  {
    id: "vintage-flea-market-2026",
    name: "Vintage & Antique Flea Market",
    tagline: "Treasures from the Past",
    description: "Hunt for vintage finds, antique furniture, retro collectibles, and nostalgic treasures. Whether you're a serious collector or casual browser, you'll find something special at this curated flea market.",
    date: "May 17, 2026",
    time: "8:00 AM - 4:00 PM",
    location: {
      address: "2800 N Meridian St",
      city: "Indianapolis",
      state: "Indiana",
      venue: "Indy Antique Mall Grounds"
    },
    image: "/images/spring-fling-expo.jpg",
    featured: false,
    category: "Flea Market",
    organizer: {
      name: "Hoosier Vintage Society",
      email: "vintage@hoosiervintage.com"
    },
    tickets: [
      {
        id: "outdoor-space",
        name: "Outdoor Vendor Space",
        price: 40.00,
        description: "15x15 outdoor space",
        maxQuantity: 100,
        soldCount: 73
      },
      {
        id: "covered-space",
        name: "Covered Vendor Space",
        price: 60.00,
        description: "10x10 covered area",
        maxQuantity: 30,
        soldCount: 28
      }
    ],
    attendeeCount: 612,
    vendorCount: 101,
    maxVendors: 130,
    maxAttendees: 2500
  },
  {
    id: "food-truck-festival-2026",
    name: "Taste of the Midwest Food Festival",
    tagline: "50+ Food Trucks, One Epic Day",
    description: "The ultimate food truck festival featuring cuisines from around the world! Live music, beer garden, family activities, and of course, incredible food. Come hungry!",
    date: "May 24, 2026",
    time: "11:00 AM - 9:00 PM",
    location: {
      address: "500 E Market St",
      city: "Louisville",
      state: "Kentucky",
      venue: "Waterfront Park"
    },
    image: "/images/spring-vendor-market.jpg",
    featured: false,
    category: "Food Festival",
    organizer: {
      name: "Louisville Food Truck Association",
      email: "hello@louisvillefoodtrucks.com"
    },
    tickets: [
      {
        id: "food-truck-spot",
        name: "Food Truck Spot",
        price: 150.00,
        description: "Premium food truck location with electrical",
        maxQuantity: 50,
        soldCount: 45
      },
      {
        id: "vendor-tent",
        name: "Food Vendor Tent",
        price: 85.00,
        description: "10x10 tent space for food vendors",
        maxQuantity: 25,
        soldCount: 20
      }
    ],
    attendeeCount: 1234,
    vendorCount: 65,
    maxVendors: 75,
    maxAttendees: 5000
  },
  {
    id: "handmade-jewelry-show-2026",
    name: "Handmade Jewelry & Accessories Show",
    tagline: "Unique Pieces, Talented Makers",
    description: "A curated showcase of handmade jewelry, accessories, and wearable art. Meet the artists, learn about their craft, and find your new favorite piece. Perfect for Mother's Day shopping!",
    date: "June 7, 2026",
    time: "10:00 AM - 5:00 PM",
    location: {
      address: "1901 E Woodfield Rd",
      city: "Schaumburg",
      state: "Illinois",
      venue: "Schaumburg Convention Center"
    },
    image: "/images/spring-fling-expo.jpg",
    featured: false,
    category: "Jewelry Show",
    organizer: {
      name: "Midwest Jewelry Artists",
      email: "shows@midwestjewelry.com"
    },
    tickets: [
      {
        id: "display-booth",
        name: "Jewelry Display Booth",
        price: 75.00,
        description: "6x6 booth with display case included",
        maxQuantity: 60,
        soldCount: 41
      },
      {
        id: "premium-display",
        name: "Premium Display Booth",
        price: 125.00,
        description: "8x8 corner booth with lighting and display case",
        maxQuantity: 15,
        soldCount: 13
      }
    ],
    attendeeCount: 198,
    vendorCount: 54,
    maxVendors: 75,
    maxAttendees: 1000
  },
  {
    id: "summer-art-walk-2026",
    name: "Summer Art Walk & Sale",
    tagline: "Art Under the Stars",
    description: "Stroll through our evening art walk featuring painters, sculptors, photographers, and mixed media artists. Live demonstrations, wine tastings, and a beautiful summer evening in the park.",
    date: "June 14, 2026",
    time: "4:00 PM - 10:00 PM",
    location: {
      address: "100 Monument Circle",
      city: "Indianapolis",
      state: "Indiana",
      venue: "Monument Circle & American Legion Mall"
    },
    image: "/images/spring-vendor-market.jpg",
    featured: false,
    category: "Art Show",
    organizer: {
      name: "Indy Arts Council",
      email: "events@indyarts.org"
    },
    tickets: [
      {
        id: "artist-space",
        name: "Artist Display Space",
        price: 50.00,
        description: "10x10 outdoor display space",
        maxQuantity: 80,
        soldCount: 58
      },
      {
        id: "premium-tent",
        name: "Artist Tent Package",
        price: 85.00,
        description: "10x10 space with tent, lighting, and display easels",
        maxQuantity: 25,
        soldCount: 22
      }
    ],
    attendeeCount: 445,
    vendorCount: 80,
    maxVendors: 105,
    maxAttendees: 3000
  },
  {
    id: "pet-expo-2026",
    name: "Midwest Pet Expo & Adoption Day",
    tagline: "For the Love of Pets",
    description: "Everything for your furry, feathered, and scaly friends! Pet supplies, treats, accessories, grooming services, and rescue adoptions. Bring your pet-friendly pups for a day of fun!",
    date: "June 21, 2026",
    time: "9:00 AM - 5:00 PM",
    location: {
      address: "1 Exposition Center",
      city: "West Springfield",
      state: "Massachusetts",
      venue: "Eastern States Exposition"
    },
    image: "/images/spring-fling-expo.jpg",
    featured: false,
    category: "Pet Expo",
    organizer: {
      name: "New England Pet Events",
      email: "info@nepetevents.com"
    },
    tickets: [
      {
        id: "vendor-booth",
        name: "Vendor Booth",
        price: 80.00,
        description: "10x10 indoor booth space",
        maxQuantity: 70,
        soldCount: 55
      },
      {
        id: "rescue-booth",
        name: "Rescue Organization Booth",
        price: 25.00,
        description: "Discounted space for registered rescues",
        maxQuantity: 20,
        soldCount: 18
      }
    ],
    attendeeCount: 723,
    vendorCount: 73,
    maxVendors: 90,
    maxAttendees: 4000
  },
  {
    id: "holiday-craft-bazaar-2026",
    name: "Summer Craft & Gift Bazaar",
    tagline: "Unique Gifts for Every Occasion",
    description: "Start your holiday shopping early! Handmade gifts, home decor, seasonal items, and unique finds from talented local crafters. Gift wrapping station available!",
    date: "June 28, 2026",
    time: "10:00 AM - 6:00 PM",
    location: {
      address: "300 W Washington St",
      city: "Indianapolis",
      state: "Indiana",
      venue: "Indiana Convention Center"
    },
    image: "/images/spring-vendor-market.jpg",
    featured: false,
    category: "Craft Bazaar",
    organizer: {
      name: "Hoosier Crafters Association",
      email: "bazaar@hoosiercrafters.com"
    },
    tickets: [
      {
        id: "standard-booth",
        name: "Standard Booth",
        price: 70.00,
        description: "8x8 booth with skirted table",
        maxQuantity: 100,
        soldCount: 67
      },
      {
        id: "double-booth",
        name: "Double Booth",
        price: 120.00,
        description: "16x8 space with 2 skirted tables",
        maxQuantity: 25,
        soldCount: 19
      }
    ],
    attendeeCount: 534,
    vendorCount: 86,
    maxVendors: 125,
    maxAttendees: 2500
  }
];

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getFeaturedEvents(): Event[] {
  return events.filter(e => e.featured);
}

export function getEventsByState(state: string): Event[] {
  return events.filter(e => e.location.state.toLowerCase() === state.toLowerCase());
}

export function getEventsByCategory(category: string): Event[] {
  return events.filter(e => e.category.toLowerCase() === category.toLowerCase());
}
