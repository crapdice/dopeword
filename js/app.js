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

const CHASE_CARDS = [
    // --- POKEMON ---
    // Starter (Dark Red)
    { category: 'pokemon', level: 'starter', name: 'Pikachu Common', grade: 'PSA 8', value: '$25', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Pikachu+Common' },
    { category: 'pokemon', level: 'starter', name: 'Bulbasaur Base', grade: 'PSA 9', value: '$45', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Bulbasaur+Base' },
    { category: 'pokemon', level: 'starter', name: 'Charmander Base', grade: 'PSA 9', value: '$45', img: 'https://placehold.co/400x560/500000/FFFFFF?text=Charmander+Base' },
    // Silver (Med-Dark Red)
    { category: 'pokemon', level: 'silver', name: 'Dark Dragonite', grade: 'PSA 9', value: '$150', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Dark+Dragonite' },
    { category: 'pokemon', level: 'silver', name: 'Gyarados Holo', grade: 'PSA 8', value: '$120', img: 'https://placehold.co/400x560/721414/FFFFFF?text=Gyarados+Holo' },
    // Gold (Red)
    { category: 'pokemon', level: 'gold', name: 'Mewtwo Lv.X', grade: 'PSA 9', value: '$400', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Mewtwo+Lv.X' },
    { category: 'pokemon', level: 'gold', name: 'Shining Magikarp', grade: 'PSA 8', value: '$550', img: 'https://placehold.co/400x560/952929/FFFFFF?text=Shining+Magikarp' },
    // Platinum (Light Red)
    { category: 'pokemon', level: 'platinum', name: 'Lugia First Ed', grade: 'PSA 9', value: '$2,500', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Lugia+1st+Ed' },
    { category: 'pokemon', level: 'platinum', name: 'Umbreon Gold Star', grade: 'PSA 9', value: '$3,800', img: 'https://placehold.co/400x560/B73D3D/FFFFFF?text=Umbreon+GS' },
    // Diamond (Bright Red)
    { category: 'pokemon', level: 'diamond', name: 'Charizard Base Holo', grade: 'PSA 9', value: '$12,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Charizard+Base' },
    { category: 'pokemon', level: 'diamond', name: 'Rayquaza Gold Star', grade: 'PSA 10', value: '$18,000', img: 'https://placehold.co/400x560/DA5252/FFFFFF?text=Rayquaza+GS' },
    // Lunar (Pinkish Red)
    { category: 'pokemon', level: 'lunar', name: 'Illustrator Pikachu', grade: 'PSA 9', value: '$500,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=Illustrator+Pika' },
    { category: 'pokemon', level: 'lunar', name: '1st Ed Charizard', grade: 'PSA 10', value: '$350,000', img: 'https://placehold.co/400x560/FF6666/FFFFFF?text=1st+Ed+Zard' },

    // --- FOOTBALL ---
    // Starter (Dark Orange)
    { category: 'football', level: 'starter', name: 'Base Rookie', grade: 'PSA 9', value: '$15', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Base+Rookie' },
    { category: 'football', level: 'starter', name: 'Veterans Common', grade: 'PSA 10', value: '$20', img: 'https://placehold.co/400x560/8B4500/FFFFFF?text=Veterans' },
    // Silver (Orange)
    { category: 'football', level: 'silver', name: 'Peyton Manning Rookie', grade: 'PSA 8', value: '$180', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Manning+RC' },
    { category: 'football', level: 'silver', name: 'Randy Moss Rookie', grade: 'PSA 9', value: '$140', img: 'https://placehold.co/400x560/A26200/FFFFFF?text=Moss+RC' },
    // Gold (Light Orange)
    { category: 'football', level: 'gold', name: 'Joe Montana Auto', grade: 'PSA 9', value: '$800', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Montana+Auto' },
    { category: 'football', level: 'gold', name: 'Jerry Rice Auto', grade: 'PSA 9', value: '$950', img: 'https://placehold.co/400x560/B97F00/FFFFFF?text=Rice+Auto' },
    // Platinum (Gold-ish)
    { category: 'football', level: 'platinum', name: 'Tom Brady Rookie', grade: 'PSA 8', value: '$4,500', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Brady+RC' },
    { category: 'football', level: 'platinum', name: 'Patrick Mahomes Auto', grade: 'PSA 10', value: '$6,000', img: 'https://placehold.co/400x560/D09C00/FFFFFF?text=Mahomes+Auto' },
    // Diamond (Gold)
    { category: 'football', level: 'diamond', name: 'Jim Brown Rookie', grade: 'PSA 8', value: '$25,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Jim+Brown+RC' },
    { category: 'football', level: 'diamond', name: 'Brady Contenders', grade: 'PSA 9', value: '$35,000', img: 'https://placehold.co/400x560/E7B900/FFFFFF?text=Brady+Contenders' },
    // Lunar (Yellow)
    { category: 'football', level: 'lunar', name: 'Brady Championship Ticket', grade: 'PSA 9', value: '$450,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Brady+Ticket' },
    { category: 'football', level: 'lunar', name: 'Mahomes 1/1 Shield', grade: 'PSA 10', value: '$800,000', img: 'https://placehold.co/400x560/FFD700/000000?text=Mahomes+Shield' },

    // --- BASEBALL ---
    // Starter (Dark Blue)
    { category: 'baseball', level: 'starter', name: 'Topps Common', grade: 'PSA 9', value: '$10', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Topps+Common' },
    { category: 'baseball', level: 'starter', name: 'Bowman Chrome Base', grade: 'PSA 10', value: '$30', img: 'https://placehold.co/400x560/000050/FFFFFF?text=Bowman+Base' },
    // Silver (Navy)
    { category: 'baseball', level: 'silver', name: 'Derek Jeter Rookie', grade: 'PSA 8', value: '$150', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Jeter+RC' },
    { category: 'baseball', level: 'silver', name: 'Griffey Jr Base', grade: 'PSA 9', value: '$120', img: 'https://placehold.co/400x560/0F216E/FFFFFF?text=Griffey+Base' },
    // Gold (Blue)
    { category: 'baseball', level: 'gold', name: 'Ichiro Rookie Auto', grade: 'PSA 10', value: '$900', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Ichiro+Auto' },
    { category: 'baseball', level: 'gold', name: 'Ohtani Rookie', grade: 'PSA 9', value: '$1,200', img: 'https://placehold.co/400x560/1D438C/FFFFFF?text=Ohtani+RC' },
    // Platinum (Light Blue)
    { category: 'baseball', level: 'platinum', name: 'Mike Trout 2011', grade: 'PSA 10', value: '$4,000', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Trout+2011' },
    { category: 'baseball', level: 'platinum', name: 'Jackie Robinson Auto', grade: 'PSA 5', value: '$6,500', img: 'https://placehold.co/400x560/2C64AA/FFFFFF?text=Jackie+Auto' },
    // Diamond (Sky Blue)
    { category: 'baseball', level: 'diamond', name: 'Mantle 1952', grade: 'PSA 5', value: '$45,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Mantle+1952' },
    { category: 'baseball', level: 'diamond', name: 'Ruth Goudey', grade: 'PSA 4', value: '$30,000', img: 'https://placehold.co/400x560/3B86C8/FFFFFF?text=Ruth+Goudey' },
    // Lunar (Pale Blue)
    { category: 'baseball', level: 'lunar', name: 'Honus Wagner T206', grade: 'PSA 2', value: '$2,500,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Wagner+T206' },
    { category: 'baseball', level: 'lunar', name: 'Mantle 1952 Mint', grade: 'PSA 9', value: '$1,200,000', img: 'https://placehold.co/400x560/4AA8E6/FFFFFF?text=Mantle+Mint' },

    // --- BASKETBALL ---
    // Starter (Dark Green)
    { category: 'basketball', level: 'starter', name: 'Hoops Base', grade: 'PSA 9', value: '$15', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Hoops+Base' },
    { category: 'basketball', level: 'starter', name: 'Prizm Base', grade: 'PSA 10', value: '$40', img: 'https://placehold.co/400x560/004d00/FFFFFF?text=Prizm+Base' },
    // Silver (Forest Green)
    { category: 'basketball', level: 'silver', name: 'Shaq Rookie', grade: 'PSA 9', value: '$200', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Shaq+RC' },
    { category: 'basketball', level: 'silver', name: 'Iverson Chrome', grade: 'PSA 9', value: '$250', img: 'https://placehold.co/400x560/0F640F/FFFFFF?text=Iverson+Chrome' },
    // Gold (Green)
    { category: 'basketball', level: 'gold', name: 'Kobe Bryant Chrome', grade: 'PSA 9', value: '$1,500', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Kobe+Chrome' },
    { category: 'basketball', level: 'gold', name: 'Durant Rookie', grade: 'PSA 10', value: '$1,200', img: 'https://placehold.co/400x560/1F7B1F/FFFFFF?text=Durant+RC' },
    // Platinum (Light Green)
    { category: 'basketball', level: 'platinum', name: 'LeBron Topps Chrome', grade: 'PSA 10', value: '$8,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=LeBron+Chrome' },
    { category: 'basketball', level: 'platinum', name: 'Curry NT Auto', grade: 'PSA 9', value: '$12,000', img: 'https://placehold.co/400x560/2E922E/FFFFFF?text=Curry+NT' },
    // Diamond (Bright Green)
    { category: 'basketball', level: 'diamond', name: 'Michael Jordan 1986', grade: 'PSA 10', value: '$250,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Jordan+86' },
    { category: 'basketball', level: 'diamond', name: 'Kobe Exquisite', grade: 'PSA 9', value: '$80,000', img: 'https://placehold.co/400x560/3EA93E/FFFFFF?text=Kobe+Exq' },
    // Lunar (Neon Green)
    { category: 'basketball', level: 'lunar', name: 'LeBron Logoman', grade: 'PSA 9', value: '$2,000,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=LeBron+Logo' },
    { category: 'basketball', level: 'lunar', name: 'Jordan RPA', grade: 'BGS 9.5', value: '$1,500,000', img: 'https://placehold.co/400x560/4DBF4D/FFFFFF?text=Jordan+RPA' }
];

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

// Logic
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
    const activeCards = CHASE_CARDS.filter(c => c.category === currentCategory && c.level === currentPack.id);

    // Fallback if no specific cards found
    const displayCards = activeCards.length > 0 ? activeCards : [{ name: 'Mystery Card', value: '???', grade: '?', img: 'https://placehold.co/400x560/333333/FFFFFF?text=Mystery' }];

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
        <button class="box-border w-full rounded-xl text-left transition focus:outline-none relative flex min-h-[56px] flex-col items-center justify-center p-1 ${activeClass}" 
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

// Mock Data for Values/Probabilities based on tier price
function renderValues() {
    // Generate mock ranges centering around the price
    const base = currentPack.price;
    const ranges = [
        { label: `$${Math.round(base * 0.5)}-${Math.round(base * 0.8)}`, perc: 40.6 },
        { label: `$${Math.round(base * 0.8)}-${Math.round(base * 1.0)}`, perc: 30.5 },
        { label: `$${Math.round(base * 1.0)}-${Math.round(base * 2.0)}`, perc: 25.3 },
        { label: `$${Math.round(base * 2.0)}-${Math.round(base * 4.0)}`, perc: 3.0 },
        { label: `$${Math.round(base * 4.0)}-${Math.round(base * 8.0)}`, perc: 0.5 },
        { label: `$${Math.round(base * 8.0)}+`, perc: 0.1 }
    ];

    valuesList.innerHTML = ranges.map(r => `
        <div class="flex items-center gap-1">
            <div class="w-28 shrink-0"><p class="font-chivoMono text-sm text-primary">${r.label}</p></div>
            <div class="grow">
                <div class="flex">
                    <div class="relative h-2 w-full overflow-hidden rounded-full bg-border-secondary">
                        <div class="h-full rounded-full bar-blue transition-all duration-500" style="width: ${r.perc}%"></div>
                    </div>
                </div>
            </div>
            <div class="w-16 shrink-0 text-right"><p class="font-chivoMono text-sm text-primary">${r.perc}%</p></div>
        </div>
    `).join('');
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

    // Reset Modal State
    packStage.classList.remove('hidden');
    revealStage.classList.add('hidden');
    ripBtn.classList.remove('hidden');
    ripBtn.textContent = `OPEN ${currentCategory.toUpperCase()} ${pack.name.toUpperCase()} ($${pack.price.toLocaleString()})`;
    ripBtn.disabled = false;

    // Render Pack in Modal
    activePackContainer.innerHTML = `
        <div class="pack-envelope" style="background: linear-gradient(135deg, ${pack.color} 0%, #000 100%);">
            <div class="pack-logo">${currentCategory.toUpperCase()}</div>
            <div class="pack-label">${pack.name}</div>
            <div class="font-chivoMono text-white mt-2">$${pack.price.toLocaleString()}</div>
        </div>
    `;

    ripModal.classList.remove('hidden');
};

function setupEventListeners() {
    closeModalBtn.addEventListener('click', () => {
        ripModal.classList.add('hidden');
    });

    ripBtn.addEventListener('click', () => {
        performRip();
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
    const randomCard = CHASE_CARDS[Math.floor(Math.random() * CHASE_CARDS.length)];

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
