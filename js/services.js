// --- DATA CONFIGURATION ---
const PACK_TIERS = [
    { id: 'starter', name: 'Starter', price: 25, color: '#333333', odds: '10-30 Skins | Low V-Bucks' },
    { id: 'silver', name: 'Silver', price: 50, color: '#C0C0C0', odds: '30-80 Skins | Mid V-Bucks' },
    { id: 'gold', name: 'Gold', price: 100, color: '#FFD700', odds: '80-150 Skins | High V-Bucks' },
    { id: 'platinum', name: 'Platinum', price: 500, color: '#E5E4E2', odds: '150+ Skins | Rare Exclusives' },
    { id: 'diamond', name: 'Diamond', price: 1000, color: '#B9F2FF', odds: 'OG Skins (Black Knight / Renegade)' },
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
const INTERNAL_INVENTORY = [];

// Rare Skins Database for Title Generation
const RARE_SKINS = [
    'Black Knight', 'Renegade Raider', 'Aerial Assault Trooper', 'Galaxy', 'IKONIK',
    'Ghoul Trooper (OG)', 'Skull Trooper (OG)', 'The Reaper', 'Sparkle Specialist',
    'Travis Scott', 'Wildcat', 'Wonder', 'Honor Guard'
];

const COMMON_SKINS = [
    'Aura', 'Crystal', 'Dynamo', 'Soccer Skin', 'Fishstick', 'Peely',
    'Drift', 'Midas', 'Jules', 'Brite Bomber'
];

function generateAccount(pack, valueMultiplier) {
    const isHighTier = pack.price >= 500;
    const isJackpot = valueMultiplier > 8.0;

    // 1. Generate Stats based on Pack Level & Luck
    let baseSkins = 10;
    if (pack.id === 'silver') baseSkins = 30;
    if (pack.id === 'gold') baseSkins = 80;
    if (pack.id === 'platinum') baseSkins = 150;
    if (pack.id === 'diamond') baseSkins = 200;

    // Apply Random Variance
    const skinCount = Math.floor(baseSkins * valueMultiplier * (0.8 + Math.random() * 0.4));
    const vbucks = Math.floor(Math.random() * 50) * 100 + (isHighTier ? 1000 : 0);
    const level = Math.floor(Math.random() * 2000) + 100;
    const wins = Math.floor(Math.random() * 500);

    // 2. Select Main "Hero" Skin for Title
    let mainSkin = COMMON_SKINS[Math.floor(Math.random() * COMMON_SKINS.length)];
    let badges = [];

    // High Tier Logic
    if (isHighTier || isJackpot || valueMultiplier > 2.0) {
        if (Math.random() > 0.5 || pack.id === 'diamond') {
            mainSkin = RARE_SKINS[Math.floor(Math.random() * RARE_SKINS.length)];
            badges.push('OG');
        } else {
            mainSkin = `Stack of ${skinCount} Skins`;
            badges.push('STACKED');
        }
    }

    // 3. Generate Title
    const title = `${skinCount} Skins + ${mainSkin}`;

    // 4. Calculate Market Value (Mock)
    const rawValue = Math.floor(pack.price * valueMultiplier);

    // 5. Image (Use placeholder for now, would be skin render)
    // Dynamic text color based on rarity
    let bg = '333333'; // Common (Grey)
    if (valueMultiplier >= 1.5) bg = '0078FF'; // Rare (Blue)
    if (valueMultiplier >= 3.0) bg = 'A335EE'; // Epic (Purple)
    if (valueMultiplier >= 8.0) bg = 'FFD700'; // Legendary (Gold)

    if (pack.id === 'diamond' || pack.id === 'lunar') {
        bg = isJackpot ? 'E0115F' : 'FFae00'; // Exotic / Mythic
    }

    const fg = 'FFFFFF';
    const text = mainSkin.replace(/ /g, '+');
    const img = 'assets/skins.png';

    return {
        id: crypto.randomUUID(),
        title: title,
        name: title, // Backwards compatibility for UI
        category: 'fortnite',
        level: pack.id,
        price_label: `$${rawValue.toLocaleString()}`,
        value: `$${rawValue.toLocaleString()}`, // Backwards compatibility
        raw_value: rawValue,
        img: img,
        stats: {
            skins: skinCount,
            vbucks: vbucks,
            level: level,
            wins: wins,
            main_skin: mainSkin
        },
        badges: badges,
        platform: ['PC', 'PSN', 'XBOX'],
        email_access: true
    };
}

// Seed Database
function seedDatabase() {
    // Generate inventory for Fortnite only
    PACK_TIERS.forEach(pack => {
        // Generate distribution based on ODDS_CONFIG
        ODDS_CONFIG.forEach((config) => {
            // Number of items to generate per bucket
            // We scale this up slightly for better variety
            const count = Math.ceil(config.weight / 2);

            for (let i = 0; i < count; i++) {
                const multiplier = config.minMult + Math.random() * (config.maxMult - config.minMult);
                const account = generateAccount(pack, multiplier);
                INTERNAL_INVENTORY.push(account);
            }
        });
    });
    console.log(`[Server] Database Seeded with ${INTERNAL_INVENTORY.length} Fortnite Accounts.`);
}

seedDatabase();

// --- PUBLIC API (MOCK) ---
class ShopService {

    static getPackTiers() {
        return PACK_TIERS;
    }

    static getOdds() {
        return ODDS_CONFIG;
    }

    // Returns "Safe View" for UI
    static getPreviewCards(category, level) {
        // Filter
        let matches = INTERNAL_INVENTORY.filter(c => c.category === 'fortnite' && c.level === level);

        // Sort by Value (Best First)
        matches.sort((a, b) => b.raw_value - a.raw_value);

        // Return Top 6
        return matches.slice(0, 6);
    }

    static openPack(category, level) {
        const pack = PACK_TIERS.find(p => p.id === level);
        if (!pack) throw new Error("Invalid Pack Level");

        const pool = INTERNAL_INVENTORY.filter(c => c.category === 'fortnite' && c.level === level);

        // Weighted RNG
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

        // Filter by Bucket
        const basePrice = pack.price;
        const bucketCards = pool.filter(c => {
            const min = basePrice * selectedBucket.minMult;
            const max = selectedBucket.maxMult > 1000 ? Infinity : basePrice * selectedBucket.maxMult;
            return c.raw_value >= min && c.raw_value <= max;
        });

        // Fallback
        const finalPool = bucketCards.length > 0 ? bucketCards : pool;
        const winner = finalPool[Math.floor(Math.random() * finalPool.length)];

        return {
            ...winner,
            tx_id: crypto.randomUUID(),
            timestamp: new Date().toISOString()
        };
    }
}

// Expose to Global Scope explicitly for Modules
window.ShopService = ShopService;
