// Data Configuration - Verified from Live Site
const PACK_TIERS = [
    { id: 'starter', name: 'Starter', price: 25, color: '#333333', odds: 'Top Hit: $400+' },
    { id: 'silver', name: 'Silver', price: 50, color: '#C0C0C0', odds: 'Top Hit: $800+' },
    { id: 'gold', name: 'Gold', price: 100, color: '#FFD700', odds: 'Top Hit: $2,500+' },
    { id: 'platinum', name: 'Platinum', price: 500, color: '#E5E4E2', odds: 'Top Hit: $10,000+' },
    { id: 'diamond', name: 'Diamond', price: 1000, color: '#B9F2FF', odds: 'Top Hit: $25,000+' },
    { id: 'lunar', name: 'Lunar', price: 2500, color: '#FF4444', odds: 'Top Hit: $75,000+' }
];

// App State
let currentPack = PACK_TIERS[0]; // Default to Starter
let currentCategory = 'pokemon';

const CHASE_CARDS = [];

// Helper to generate cards
function generateCards(category, level, price) {
    const cards = [];
    const ranges = [
        { min: 0.5, max: 0.8, count: 8 },  // 40% - Loss
        { min: 0.8, max: 1.0, count: 6 },  // 30% - Break Even
        { min: 1.1, max: 1.8, count: 4 },  // 20% - Small Win
        { min: 2.0, max: 3.5, count: 1 },  // 5% - Big Win
        { min: 4.0, max: 8.0, count: 1 }   // 5% - Jackpot
    ];

    const icons = { 'pokemon': 'Poke', 'football': 'NFL', 'baseball': 'MLB', 'basketball': 'NBA' };

    ranges.forEach((range, rIdx) => {
        for (let i = 0; i < range.count; i++) {
            const val = Math.round(price * (range.min + Math.random() * (range.max - range.min)));
            const isHit = range.min >= 1.0;
            const name = isHit
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} ${level.charAt(0).toUpperCase() + level.slice(1)} Hit #${rIdx}-${i}`
                : `${category.charAt(0).toUpperCase() + category.slice(1)} Common #${rIdx}-${i}`;

            cards.push({
                category,
                level,
                name: name,
                grade: isHit ? (range.min > 2 ? 'PSA 10' : 'PSA 9') : 'Raw',
                value: `$${val.toLocaleString()}`,
                img: `https://placehold.co/400x560/${isHit ? 'FFD700' : '333333'}/FFFFFF?text=${icons[category]}+${isHit ? 'HIT' : 'Base'}`
            });
        }
    });
    return cards;
}

// Populate Database
PACK_TIERS.forEach(pack => {
    ['pokemon', 'football', 'baseball', 'basketball'].forEach(cat => {
        CHASE_CARDS.push(...generateCards(cat, pack.id, pack.price));
    });
});

// DOM Elements
const levelSelectGrid = document.getElementById('levelSelectGrid');
const valuesList = document.getElementById('valuesList');
const selectedLevelName = document.getElementById('selectedLevelName');
const avgValue = document.getElementById('avgValue');
const sidebarBuyBtn = document.getElementById('sidebarBuyBtn');
const buyBtnPrice = document.getElementById('buyBtnPrice');

const stagePackName = document.getElementById('stagePackName');
const stageTierName = document.getElementById('stageTierName');
const packFront = document.getElementById('packFront');
const packIcon = document.getElementById('packIcon');
const stageContainer = document.getElementById('mainStage');
const pack3d = document.getElementById('pack3d');

// Modal Elements
const ripModal = document.getElementById('ripModal');
const closeModalBtn = document.querySelector('.close-modal');
const activePackContainer = document.getElementById('activePack');
const ripBtn = document.getElementById('ripBtn');
const packStage = document.querySelector('.pack-stage');
const revealStage = document.getElementById('revealedCard');

// Payment Elements
const paymentStage = document.getElementById('paymentStage');
const paymentForm = document.getElementById('paymentForm');
const confirmPayBtn = document.getElementById('confirmPayBtn');
const payItemName = document.getElementById('payItemName');
const payItemPrice = document.getElementById('payItemPrice');
const payBtnAmount = document.getElementById('payBtnAmount');

// Logic
const ODDS_CONFIG = [
    { minMult: 0.5, maxMult: 0.8, weight: 40.6 },
    { minMult: 0.8, maxMult: 1.0, weight: 30.5 },
    { minMult: 1.0, maxMult: 2.0, weight: 25.3 },
    { minMult: 2.0, maxMult: 4.0, weight: 3.0 },
    { minMult: 4.0, maxMult: 8.0, weight: 0.5 },
    { minMult: 8.0, maxMult: 9999, weight: 0.1 }
];

function parseValue(valStr) {
    return parseInt(valStr.replace(/[^0-9]/g, ''), 10);
}

function updateStageVisuals() {
    // Update Icons
    const icons = {
        'pokemon': '⚡',
        'football': '🏈',
        'baseball': '⚾',
        'basketball': '🏀'
    };
    packIcon.textContent = icons[currentCategory] || '⚡';

    // Update Title
    stagePackName.textContent = currentCategory.toUpperCase();

    // Update Chase Cards for this category
    renderChaseCards();
}

const chaseHeader = document.querySelector('.chase-header');
const chaseSubtext = document.querySelector('.chase-subtext');

function renderChaseCards() {
    // Update Header
    const headerEl = document.querySelector('h4.font-barlow');
    if (headerEl) {
        headerEl.textContent = `${currentPack.name} Chase Cards`;
    }

    // Filter by BOTH Category AND Level
    let activeCards = CHASE_CARDS.filter(c => c.category === currentCategory && c.level === currentPack.id);

    // SORT DESCENDING BY VALUE (High -> Low)
    activeCards.sort((a, b) => parseValue(b.value) - parseValue(a.value));

    // SLICE TOP 6 (Show only the best hits)
    const topHits = activeCards.slice(0, 6);

    // Fallback if no specific cards found (which shouldn't happen with 480 cards)
    const displayCards = topHits.length > 0 ? topHits : [{ name: 'Mystery Card', value: '???', grade: '?', img: 'https://placehold.co/400x560/333333/FFFFFF?text=Mystery' }];

    chaseCarousel.innerHTML = displayCards.map(card => `
        <div class="flex max-w-[95px] flex-1 flex-col self-stretch transition-transform duration-200 md:max-w-[158px] chase-card-shim">
            <div class="flex flex-1 flex-col">
                <div class="relative h-[161px] w-[95px] cursor-pointer overflow-hidden md:h-[258px] md:w-[158px]" role="button">
                    <img src="${card.img}" alt="${card.name}" class="absolute inset-0 h-full w-full object-contain transition-all duration-500 opacity-100 blur-0">
                </div>
                <div class="text-left">
                    <p class="mt-4 line-clamp-3 font-chivoMono text-xs font-normal text-tertiary">${card.name}</p>
                </div>
            </div>
            <div class="mt-2 flex flex-1 flex-row items-center">
                <span class="font-chivoMono text-sm font-normal text-primary">${card.value}</span>
                <span class="ml-1 font-chivoMono text-sm font-normal text-tertiary">est.</span>
            </div>
        </div>
    `).join('');
}

// Initialization
function init() {
    renderLevelSelect();
    renderValues();
    renderChaseCards();
    setupSidebarInteractions();
    setupEventListeners();
    setupStageInteractions();
    // Start periodic probability updates simulation
    setInterval(updateProbabilities, 5000);
}

function setupStageInteractions() {
    // 3D Tilt Effect on Mouse Move
    stageContainer.addEventListener('mousemove', (e) => {
        const rect = stageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on cursor position relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        pack3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    stageContainer.addEventListener('mouseleave', () => {
        pack3d.style.transform = 'rotateX(0) rotateY(0)';
    });
}

function setupSidebarInteractions() {
    // Category Buttons
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            document.querySelectorAll('[data-category]').forEach(b => {
                b.classList.remove('active-category', 'border-[#FFFFFF]', 'bg-tertiary');
                b.classList.add('border-primary');
            });
            // Add active to current
            const target = e.currentTarget;
            target.classList.remove('border-primary');
            target.classList.add('active-category', 'border-[#FFFFFF]', 'bg-tertiary');

            // Update State
            currentCategory = target.dataset.category;
            updateStageVisuals();
        });
    });

    // Buy Button
    sidebarBuyBtn.addEventListener('click', () => {
        openRipModal(currentPack.id);
    });
}

// Rendering Level Select Buttons
function renderLevelSelect() {
    levelSelectGrid.innerHTML = PACK_TIERS.map(pack => {
        const isActive = currentPack.id === pack.id;
        // Use new gradient border class for active state
        const activeClass = isActive
            ? `gradient-border-active gradient-active-${pack.id}`
            : 'border border-primary hover:border-[#FFFFFF]';

        return `
        <button class="btn-pack-select box-border w-full rounded-xl text-left transition focus:outline-none relative flex min-h-[56px] flex-col items-center justify-center p-1 ${activeClass}" 
                onclick="selectPack('${pack.id}')">
            <p class="font-chivoMono text-base capitalize leading-none text-primary">${pack.name}</p>
            <p class="font-chivoMono text-sm font-normal leading-none text-primary">
                <span>$${pack.price.toLocaleString()}</span>
            </p>
        </button>
        `;
    }).join('');
}

function selectPack(id) {
    currentPack = PACK_TIERS.find(p => p.id === id);
    selectedLevelName.textContent = currentPack.name;
    stageTierName.textContent = currentPack.name.toUpperCase();
    avgValue.textContent = currentPack.price.toLocaleString();
    buyBtnPrice.textContent = currentPack.price.toLocaleString();

    // Animate price change
    buyBtnPrice.style.opacity = '0.5';
    setTimeout(() => buyBtnPrice.style.opacity = '1', 200);

    renderLevelSelect(); // Re-render to update active border state
    renderValues(); // Update values bars based on tier
    renderChaseCards(); // Update Chase Cards based on new tier
}

// Data for Values/Probabilities based on tier price
function renderValues() {
    const base = currentPack.price;

    valuesList.innerHTML = ODDS_CONFIG.map(config => {
        const minVal = Math.round(base * config.minMult);
        const maxVal = config.maxMult > 1000 ? '' : `-$${Math.round(base * config.maxMult)}`;
        const label = `$${minVal}${maxVal}`;
        const perc = config.weight;

        return `
        <div class="flex items-center gap-1">
            <div class="w-28 shrink-0"><p class="font-chivoMono text-sm text-primary">${label}</p></div>
            <div class="grow">
                <div class="flex">
                    <div class="relative h-2 w-full overflow-hidden rounded-full bg-border-secondary">
                        <div class="h-full rounded-full bar-blue transition-all duration-500" style="width: ${perc}%"></div>
                    </div>
                </div>
            </div>
            <div class="w-16 shrink-0 text-right"><p class="font-chivoMono text-sm text-primary">${perc}%</p></div>
        </div>
        `;
    }).join('');
}

function updateProbabilities() {
    // Simulate slight fluctuation
    renderValues();
}

// Modal Logic
window.openRipModal = (packId) => {
    const pack = PACK_TIERS.find(p => p.id === packId);
    if (!pack) return;

    currentPack = pack;

    // Reset Modal State -> Show Payment First
    ripModal.classList.remove('hidden');

    // 1. Show Payment
    paymentStage.classList.remove('hidden');

    // 2. Hide others
    packStage.classList.add('hidden');
    revealStage.classList.add('hidden');
    ripBtn.classList.add('hidden');

    // 3. Populate Payment Info
    payItemName.textContent = `${currentCategory.toUpperCase()} ${pack.name}`;
    payItemPrice.textContent = `$${pack.price.toLocaleString()}.00`;
    payBtnAmount.textContent = `$${pack.price.toLocaleString()}.00`;

    // Reset Button State
    const spanText = confirmPayBtn.querySelector('span:first-child');
    if (spanText) spanText.textContent = "PAY NOW";
    confirmPayBtn.disabled = false;
    confirmPayBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Prepare Pack Stage (for later)
    ripBtn.textContent = `OPEN PACK`;
    activePackContainer.innerHTML = `
        <div class="pack-envelope" style="background: linear-gradient(135deg, ${pack.color} 0%, #000 100%);">
            <div class="pack-logo">${currentCategory.toUpperCase()}</div>
            <div class="pack-label">${pack.name}</div>
            <div class="font-chivoMono text-white mt-2">$${pack.price.toLocaleString()}</div>
        </div>
    `;
};

function handlePayment() {
    // Simulate Processing
    const spanText = confirmPayBtn.querySelector('span:first-child');
    spanText.textContent = "PROCESSING...";
    confirmPayBtn.disabled = true;
    confirmPayBtn.classList.add('opacity-50', 'cursor-not-allowed');

    setTimeout(() => {
        // Success! Transition to Pack
        paymentStage.classList.add('hidden');
        packStage.classList.remove('hidden');
        ripBtn.classList.remove('hidden');
        ripBtn.disabled = false;
    }, 1500);
}

function setupEventListeners() {
    closeModalBtn.addEventListener('click', () => {
        ripModal.classList.add('hidden');
    });

    ripBtn.addEventListener('click', () => {
        performRip();
    });

    // Payment Form Submit
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handlePayment();
    });

    ripModal.addEventListener('click', (e) => {
        if (e.target === ripModal) ripModal.classList.add('hidden');
    });
}

function performRip() {
    const packEl = activePackContainer.querySelector('.pack-envelope');

    // 1. Shake Animation
    packEl.classList.add('shaking');
    ripBtn.disabled = true;
    ripBtn.textContent = "OPENING...";

    // 2. Delay for suspense
    setTimeout(() => {
        packEl.classList.remove('shaking');
        showResult();
    }, 2000);
}

function showResult() {
    // 1. Filter valid cards for this Pack (Category + Tier)
    const validCards = CHASE_CARDS.filter(c => c.category === currentCategory && c.level === currentPack.id);
    const pool = validCards.length > 0 ? validCards : CHASE_CARDS.filter(c => c.category === currentCategory);

    // 2. Determine Winning Value Bucket via Weighted RNG
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

    // Fallback if floating point weirdness misses the last bucket
    if (!selectedBucket) selectedBucket = ODDS_CONFIG[ODDS_CONFIG.length - 1];

    // 3. Filter Pool for cards in this Value Bucket
    const basePrice = currentPack.price;
    const bucketCards = pool.filter(c => {
        const val = parseValue(c.value);
        const min = basePrice * selectedBucket.minMult;
        // Specific check for top tier (infinity)
        const max = selectedBucket.maxMult > 1000 ? Infinity : basePrice * selectedBucket.maxMult;
        return val >= min && val <= max;
    });

    // 4. Select Winner (Fallback to any card in pool if bucket is empty)
    const finalPool = bucketCards.length > 0 ? bucketCards : pool;
    const randomCard = finalPool[Math.floor(Math.random() * finalPool.length)];

    document.getElementById('cardResultImg').src = randomCard.img;
    document.getElementById('cardResultName').textContent = randomCard.name;
    document.getElementById('cardGrade').textContent = randomCard.grade;
    document.getElementById('cardValue').textContent = randomCard.value;
    document.getElementById('sellValue').textContent = "Sell for $0.00"; // Mock

    packStage.classList.add('hidden');
    ripBtn.classList.add('hidden');
    revealStage.classList.remove('hidden');
}

// Start
init();
