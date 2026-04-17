const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const DESTINATION_DB = {
    'rome': {
        desc: "The Eternal City, where millennia of history, art, and vibrant street life collide.",
        highlights: ["Colosseum & Roman Forum", "Vatican Museums", "Trastevere Food Tour"],
        restaurants: ["Da Enzo al 29", "Pierluigi Seafood", "Ristorante All'Oro", "Roscioli Salumeria", "Armando al Pantheon", "Bonci Pizzarium", "Antico Arco", "La Pergola"],
        beaches: ["Ostia Lido", "Fregene Beach", "Santa Marinella", "Anzio Coast", "Sperlonga"],
        activities: [
            "Morning walk to the Trevi Fountain and Pantheon.",
            "Explore the ancient ruins of the Roman Forum.",
            "Guided tour of the Colosseum.",
            "Visit the Vatican Museums and Sistine Chapel.",
            "Leisurely afternoon in the Villa Borghese gardens.",
            "Food tasting journey through the Jewish Ghetto.",
            "Climb the Spanish Steps for sunset views.",
            "Authentic pasta making class in a local home.",
            "Walk across the Tiber to explore the Castel Sant'Angelo."
        ]
    },
    'paris': {
        desc: "The City of Light, synonymous with art, fashion, gastronomy, and romance.",
        highlights: ["Eiffel Tower Summit", "Louvre Museum Treasures", "Seine River Cruise"],
        restaurants: ["Le Jules Verne", "Josephine Chez Dumonet", "La Fontaine de Mars", "Benoit", "Septime", "L'As du Fallafel", "Chez L'Ami Jean", "Le Comptoir du Relais"],
        beaches: ["Paris Plages (Seasonal)", "Deauville (Day Trip)", "Étretat (Scenic)", "Honfleur Shoreline", "Trouville-sur-Mer"],
        activities: [
            "Breakfast with fresh croissants at a Montmartre café.",
            "Ascend the Eiffel Tower for panoramic city views.",
            "Deep dive into the Louvre's massive art collection.",
            "Stroll along the Seine River and browse the bouquinistes.",
            "Explore the Bohemian charm of Le Marais.",
            "Evening Seine River cruise with dinner.",
            "Visit the Musée d'Orsay for Impressionist masterpieces.",
            "Walk through the Luxembourg Gardens.",
            "Enjoy a macaron tasting at a world-famous pâtisserie."
        ]
    },
    'tokyo': {
        desc: "A futuristic metropolis where neon skyscrapers meet tranquil ancient temples.",
        highlights: ["Senso-ji Temple", "Shibuya Crossing", "Tsukiji Outer Market"],
        restaurants: ["Rokurinsha Ramen", "ESqUISSE Ginza", "Fushikino Kaiseki", "Jade Room", "Narisawa", "Sushi Dai", "Kanda Matsuya", "Ippudo Roppongi"],
        beaches: ["Shichirigahama", "Isshiki Beach", "Onjuku Beach", "Zushi Beach", "Yuigahama"],
        activities: [
            "Early morning visit to Senso-ji Temple in Asakusa.",
            "Experience the organized chaos of Shibuya Crossing.",
            "Fresh sushi breakfast at Tsukiji Outer Market.",
            "Explore the high-tech district of Akihabara.",
            "Quiet walk through the Meiji Shrine forest.",
            "Evening neon walk through Shinjuku's Omoide Yokocho.",
            "Visit the Ghibli Museum (requires booking).",
            "Shop for fashion in the trendy Harajuku district.",
            "View the city from the Tokyo Skytree."
        ]
    },
    'london': {
        desc: "A world capital of culture, history, and finance on the banks of the Thames.",
        highlights: ["Tower of London", "The British Museum", "London Eye"],
        restaurants: ["Dishoom Shoreditch", "Hawksmoor Steakhouse", "The River Cafe", "Sushisamba", "The Ledbury", "St. John", "Sketch London", "Padella"],
        beaches: ["Brighton Beach (Day Trip)", "Southend-on-Sea", "Whitstable", "Margate Sands", "Camber Sands"],
        activities: [
            "Witness the Changing of the Guard at Buckingham Palace.",
            "Explore the dark history of the Tower of London.",
            "Wander through the British Museum's world treasures.",
            "Take a flight on the London Eye at sunset.",
            "Enjoy a traditional Afternoon Tea in Mayfair.",
            "Stroll through the vibrant Camden Market.",
            "Walk across Tower Bridge for iconic photos.",
            "Explore the South Bank and Tate Modern.",
            "Catch a world-class show in the West End."
        ]
    },
    'andhra': {
        desc: "The 'Rice Bowl of India', rich in heritage, stunning coastlines, and sacred temples.",
        highlights: ["Tirumala Temple", "Araku Valley", "Vishakhapatnam Beaches"],
        restaurants: ["The Shack (Vizag)", "Bamboo Bay", "D Cabana", "Venkatadri Vantillu", "Raju Gari Dhaba", "Vista @ The Park", "Dakshin", "Flying Spaghetti Monster"],
        beaches: ["Rishikonda Beach", "RK Beach", "Yarada Beach", "Suryalanka Beach", "Bheemili Beach", "Tenneti Park Beach", "Mangamaripeta Beach", "Lawson's Bay Beach"],
        activities: [
            "Pilgrimage visit to the sacred Tirumala Venkateswara Temple.",
            "Scenic train ride through the tunnels to Araku Valley.",
            "Relax on the golden sands of RK Beach in Vizag.",
            "Explore the ancient Borra Caves' limestone formations.",
            "Visit the Buddhist heritage sites at Amaravati.",
            "Tour the historic Chandragiri Fort.",
            "Boat ride in the Coringa Wildlife Sanctuary.",
            "Spice tour and coffee tasting in the Paderu agency area.",
            "Wander through the massive Belum Caves."
        ]
    }
};

// Explicit mappings for common aliases
const ALIAS_MAP = {
    'vizag': 'andhra',
    'visakhapatnam': 'andhra',
    'nyc': 'new york',
    'new york city': 'new york',
    'new york': 'new york'
};

const INTEREST_POOLS = {
    'history': [
        "Guided walking tour of the historic district and old town.",
        "Visit the national historical museum and ancient monuments.",
        "Tour of an iconic archaeological site and its ruins.",
        "Explore a preserved historic estate or local castle.",
        "Visit a significant memorial or heritage landmark."
    ],
    'food': [
        "Hands-on cooking class with a professional local chef.",
        "Gourmet food tour through the city's best markets.",
        "Wine or local beverage tasting session at a historic cellar.",
        "Experience a premium dinner at a renowned local spot.",
        "Visit a traditional artisanal food workshop (cheese, bread, or sweets)."
    ],
    'nature': [
        "Scenic hike through a local nature reserve or national park.",
        "Visit a breathtaking lookout point for photography and views.",
        "Relaxing afternoon in a world-class botanical garden.",
        "Guided wildlife observation or nature sanctuary tour.",
        "Guided boat tour or kayaking session on a local lake or river."
    ],
    'adventure': [
        "High-adrenaline experience (zip-lining or rock climbing).",
        "Off-road 4x4 or ATV excursion through rugged terrain.",
        "Exciting water sports session (surfing or rafting).",
        "Mountain bike exploration of local wilderness trails.",
        "Exploring hidden caves or underground natural formations."
    ],
    'art': [
        "Tour of local contemporary and classical art galleries.",
        "Street art walking tour discover murals in trendy districts.",
        "Participate in a local craft workshop (pottery or painting).",
        "Attend a live performing arts event or theatrical show.",
        "Curated architecture and photography walk through the city."
    ],
    'nightlife': [
        "Experience a live performance at an iconic music venue.",
        "Evening guided stroll through vibrant night markets.",
        "Explore the city's best cocktail bars and nightlife districts.",
        "Sunset or night boat cruise with city skyline views.",
        "Late-night visit to an illuminated historic landmark."
    ],
    'wellness': [
        "Relaxing day at a premium spa or local thermal baths.",
        "Guided yoga or meditation session in a tranquil setting.",
        "Slow, mindful 'forest bathing' walk in a natural area.",
        "Visit an organic, farm-to-table café for a healthy meal.",
        "Attend a wellness or rejuvenation workshop."
    ],
    'beach': [
        "Spend a relaxing morning on the pristine sun-kissed sands.",
        "Enjoy fresh seafood and chilled drinks by the ocean.",
        "Take a scenic coastal walk to discover hidden coves.",
        "Witness a beautiful sunset from a premier beach club.",
        "Engage in light water sports such as paddleboarding or beach volleyball."
    ]
};

const GENERIC_ACTIVITIES = [
    "Explore the local old town and hidden alleyways.",
    "Visit the most popular museum to learn about the local culture.",
    "Enjoy a traditional meal at a family-run restaurant.",
    "Hike to a nearby viewpoint for a panoramic look at the area.",
    "Shop at the local artisan market for unique souvenirs.",
    "Relax in the most beautiful public park or garden.",
    "Attend a local music or dance performance.",
    "Take a guided street food tour to taste authentic flavors.",
    "Discover the local architecture on a walking tour.",
    "Visit a historic place of worship with stunning interiors."
];

const generateMockItinerary = (destination, days, budget, travelers, interests) => {
    const searchDest = destination.toLowerCase();
    const destKey = ALIAS_MAP[searchDest] || Object.keys(DESTINATION_DB).find(k => searchDest.includes(k)) || null;
    
    const destInfo = DESTINATION_DB[destKey] || {
        desc: `Experience the unique charm and culture of ${destination}.`,
        highlights: [`${destination} Landmarks`, "Local Perspectives", "Hidden Gems"],
        activities: GENERIC_ACTIVITIES,
        restaurants: [`${destination} Bistro`, `Grand ${destination} Kitchen`, `${destination} Garden`, `${destination} Hub`, `${destination} Treats`],
        beaches: [`${destination} Coast`, `${destination} Bay`, `${destination} Sands`, `${destination} Shore`, `${destination} Cove`]
    };

    // Strict trip-wide memory
    const usedEntities = new Set();
    const getUnique = (list) => {
        const available = list.filter(item => !usedEntities.has(item));
        const pick = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : list[Math.floor(Math.random() * list.length)];
        usedEntities.add(pick);
        return pick;
    };

    // User interest parsing
    const userInterests = (interests || '').toLowerCase();
    let interestActivities = [];
    Object.keys(INTEREST_POOLS).forEach(cat => {
        if (userInterests.includes(cat)) {
            interestActivities = [...interestActivities, ...INTEREST_POOLS[cat]];
        }
    });

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
    
    // Build prioritized pool for the whole trip
    let activityPool = shuffle([...interestActivities, ...destInfo.activities]);

    return {
        destinationDetails: {
            description: destInfo.desc + ` Perfectly suited for ${travelers} on a ${budget} journey focusing on ${interests || 'discovery'}.`,
            highlights: destInfo.highlights,
            imageKeywords: `${destination}, travel, ${interests || 'scenery'}`
        },
        tripOverview: `A breathtaking ${days}-day journey through ${destination}. This ${budget} exploration is tailored for ${travelers} with a focus on ${interests || 'local culture and hidden gems'}.`,
        dailyItinerary: Array.from({ length: parseInt(days) || 3 }, (_, i) => {
            // Pick 3 unique activities for this specific day
            const dayInterests = interestActivities.length > 0 ? shuffle(interestActivities) : [];
            
            let morning = getUnique(dayInterests.length > 0 ? dayInterests : activityPool);
            let lunch = getUnique(activityPool);
            let evening = getUnique(activityPool);

            // Contextual upgrades based on interests
            if (userInterests.includes('food')) {
                lunch = `Lunch at the famous **${getUnique(destInfo.restaurants)}** for authentic flavors.`;
            }
            if (userInterests.includes('beach')) {
                // Try to make one of the slots a beach stop
                if (Math.random() > 0.5) {
                    morning = `Morning relaxation at **${getUnique(destInfo.beaches)}** with crystal clear water.`;
                } else {
                    evening = `Cocktails and sunset views at **${getUnique(destInfo.beaches)}**.`;
                }
            }

            return {
                day: i + 1,
                activities: [
                    { time: "09:00 AM", description: morning },
                    { time: "01:30 PM", description: lunch },
                    { time: "07:30 PM", description: evening }
                ]
            };
        }),
        tips: [
            "Always keep a local map and some currency handy.",
            "Respect local customs and dress codes.",
            "Try the street food for an authentic experience."
        ],
        isMock: true
    };
};

app.post('/api/plan-trip', async (req, res) => {
    console.log('Received generation request for:', req.body.destination);
    try {
        const { destination, days, budget, travelers, interests } = req.body;
        
        const prompt = `Create a detailed travel itinerary for a ${days}-day trip to ${destination}. 
        The traveler is a ${travelers} on a ${budget} budget, interested in ${interests}.
        
        Return ONLY a JSON object with this exact structure:
        {
            "destinationDetails": {
                "description": "2-3 alluring sentences about the destination",
                "highlights": ["Top attraction 1", "Top attraction 2", "Top attraction 3"],
                "imageKeywords": "comma separated keywords for high quality travel photography of this specific place"
            },
            "tripOverview": "string",
            "dailyItinerary": [
                {
                    "day": number,
                    "activities": [
                        { "time": "string", "description": "string" }
                    ]
                }
            ],
            "tips": ["string"]
        }`;

        const response = await axios.post(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        const text = response.data.candidates[0].content.parts[0].text;
        console.log('Gemini raw response snippet:', text.substring(0, 200) + '...');
        
        // Extract JSON from potential markdown code blocks
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const jsonContent = jsonMatch ? jsonMatch[0] : text;
        
        try {
            const jsonResponse = JSON.parse(jsonContent);
            console.log('Successfully parsed JSON');
            res.json(jsonResponse);
        } catch (parseError) {
            console.error('JSON Parse Error. Raw content:', jsonContent);
            throw new Error('Invalid JSON format from AI');
        }
    } catch (error) {
        const isQuotaExceeded = 
            (error.response && error.response.status === 429) ||
            (error.response?.data?.error?.code === 429) ||
            (JSON.stringify(error.response?.data).toLowerCase().includes('quota'));

        if (isQuotaExceeded) {
            console.error('Gemini API Quota Exceeded. Triggering Fallback.');
            const mockData = generateMockItinerary(
                req.body.destination, 
                req.body.days, 
                req.body.budget, 
                req.body.travelers, 
                req.body.interests
            );
            return res.json(mockData);
        }
        
        console.error('Error generating itinerary:', error.response ? JSON.stringify(error.response.data) : error.message);
        res.status(500).json({ error: 'Failed to generate itinerary. Please try again.' });
    }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

