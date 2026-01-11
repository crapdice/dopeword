// --- DATA CONFIGURATION ---
const PACK_TIERS = [
    { id: 'starter', name: 'Starter', price: 25, color: '#333333', odds: 'Top Hit: $400+' },
    { id: 'silver', name: 'Silver', price: 50, color: '#C0C0C0', odds: 'Top Hit: $800+' },
    { id: 'gold', name: 'Gold', price: 100, color: '#FFD700', odds: 'Top Hit: $2,500+' },
    { id: 'platinum', name: 'Platinum', price: 500, color: '#E5E4E2', odds: 'Top Hit: $10,000+' },
    { id: 'diamond', name: 'Diamond', price: 1000, color: '#B9F2FF', odds: 'Top Hit: $25,000+' },
    { id: 'lunar', name: 'Lunar', price: 2500, color: '#FF4444', odds: 'Top Hit: $75,000+' }
];

const ODDS_CONFIG = [
    { minMult: 0.5, maxMult: 0.8, weight: 40.6 },
    { minMult: 0.8, maxMult: 1.0, weight: 30.5 },
    { minMult: 1.0, maxMult: 2.0, weight: 25.3 },
    { minMult: 2.0, maxMult: 4.0, weight: 3.0 },
    { minMult: 4.0, maxMult: 8.0, weight: 0.5 },
    { minMult: 8.0, maxMult: 9999, weight: 0.1 }
];

// --- INTERNAL INVENTORY (SERVER SIDE SIMULATION) ---
// In a real app, this array would NOT exist on the client.
// It would live in a secure database (Postgres/Mongo).
const INTERNAL_INVENTORY = [];

// Helper to seed the mock database
function seedDatabase() {
    const ranges = [
        { min: 0.5, max: 0.8, count: 8 },  // 40% - Loss
        { min: 0.8, max: 1.0, count: 6 },  // 30% - Break Even
        { min: 1.1, max: 1.8, count: 4 },  // 20% - Small Win
        { min: 2.0, max: 3.5, count: 1 },  // 5% - Big Win
        { min: 4.0, max: 8.0, count: 1 }   // 5% - Jackpot
    ];

    const icons = { 'pokemon': 'Poke', 'football': 'NFL', 'baseball': 'MLB', 'basketball': 'NBA' };

    PACK_TIERS.forEach(pack => {
        ['pokemon', 'football', 'baseball', 'basketball'].forEach(category => {
            ranges.forEach((range, rIdx) => {
                for (let i = 0; i < range.count; i++) {
                    const val = Math.round(pack.price * (range.min + Math.random() * (range.max - range.min)));
                    const isHit = range.min >= 1.0;
                    const name = isHit
                        ? `${category.charAt(0).toUpperCase() + category.slice(1)} ${pack.id.charAt(0).toUpperCase() + pack.id.slice(1)} Hit #${rIdx}-${i}`
                        : `${category.charAt(0).toUpperCase() + category.slice(1)} Common #${rIdx}-${i}`;

                    INTERNAL_INVENTORY.push({
                        id: crypto.randomUUID(),
                        category,
                        level: pack.id,
                        name: name,
                        grade: isHit ? (range.min > 2 ? 'PSA 10' : 'PSA 9') : 'Raw',
                        value: `$${val.toLocaleString()}`,
                        raw_value: val, // Integer for math
                        img: `https://placehold.co/400x560/${isHit ? 'FFD700' : '333333'}/FFFFFF?text=${icons[category]}+${isHit ? 'HIT' : 'Base'}`
                    });
                }
            });
        });
    });
    console.log(`[Server] Database Seeded with ${INTERNAL_INVENTORY.length} items.`);
}

seedDatabase();

// --- PUBLIC API (MOCK) ---
class ShopService {

    // GET /api/config
    static getPackTiers() {
        return PACK_TIERS;
    }

    // GET /api/odds
    static getOdds() {
        return ODDS_CONFIG;
    }

    // GET /api/chase-cards
    // Returns a "Safe View" of top hits for display only.
    static getPreviewCards(category, level) {
        // Filter from the "hidden" inventory
        const matches = INTERNAL_INVENTORY.filter(c => c.category === category && c.level === level);

        // Sort by Value Descending
        matches.sort((a, b) => b.raw_value - a.raw_value);

        // Return top 6
        return matches.slice(0, 6);
    }

    // POST /api/open-pack
    // Securely selects a card on the "server"
    static openPack(category, level) {
        // 1. Validate Request
        const pack = PACK_TIERS.find(p => p.id === level);
        if (!pack) throw new Error("Invalid Pack Level");

        // 2. Get Eligible Pool from Inventory
        // In a real DB, we would query `SELECT * FROM items WHERE category = ? AND level = ? AND sold = false`
        const pool = INTERNAL_INVENTORY.filter(c => c.category === category && c.level === level);

        // 3. RNG Logic (Weighted)
        const rand = Math.random() * 100;
        let cumulative = 0;
        let selectedBucket = null;

        for (const config of ODDS_CONFIG) {
            cumulative += config.weight;
            if (rand <= cumulative) {
                selectedBucket = config;
                break;
            }
        }
        if (!selectedBucket) selectedBucket = ODDS_CONFIG[ODDS_CONFIG.length - 1];

        // 4. Filter Pool by Bucket
        const basePrice = pack.price;
        const bucketCards = pool.filter(c => {
            const min = basePrice * selectedBucket.minMult;
            const max = selectedBucket.maxMult > 1000 ? Infinity : basePrice * selectedBucket.maxMult;
            return c.raw_value >= min && c.raw_value <= max;
        });

        // 5. Select Winner
        // Fallback to general pool if bucket is empty (rare edge case in small datasets)
        const finalPool = bucketCards.length > 0 ? bucketCards : pool;
        const winner = finalPool[Math.floor(Math.random() * finalPool.length)];

        // 6. Return Data
        return {
            ...winner,
            tx_id: crypto.randomUUID(), // Mock Transaction ID
            timestamp: new Date().toISOString()
        };
    }
}
