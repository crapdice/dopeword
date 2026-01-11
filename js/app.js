// --- UI CONTROLLER ---
// Relies on ShopService (services.js) for all data logic.

// State
let currentPack = ShopService.getPackTiers()[0]; // Default
let currentCategory = 'pokemon';

// DOM Elements
const levelSelectGrid = document.getElementById('levelSelectGrid');
const valuesList = document.getElementById('valuesList');
const selectedLevelName = document.getElementById('selectedLevelName');
const avgValue = document.getElementById('avgValue');
const sidebarBuyBtn = document.getElementById('sidebarBuyBtn');
const buyBtnPrice = document.getElementById('buyBtnPrice');

const stagePackName = document.getElementById('stagePackName');
const stageTierName = document.getElementById('stageTierName');
const packIcon = document.getElementById('packIcon');
const stageContainer = document.getElementById('mainStage');
const pack3d = document.getElementById('pack3d');
const chaseCarousel = document.getElementById('chaseCarousel'); // Ensure this ID exists in HTML or use querySelector

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

// --- INITIALIZATION ---
function init() {
    renderLevelSelect();
    renderValues();
    renderSidebarChaseCards();
    setupSidebarInteractions();
    setupEventListeners();
    setupStageInteractions();

    // Refresh 'Odds' visualizer periodically
    setInterval(() => renderValues(), 5000);
}

// --- RENDERING ---

function updateStageVisuals() {
    // Update Icons
    const icons = { 'pokemon': '⚡', 'football': '🏈', 'baseball': '⚾', 'basketball': '🏀' };
    packIcon.textContent = icons[currentCategory] || '⚡';

    // Update Title
    stagePackName.textContent = currentCategory.toUpperCase();

    // Update Sidebar Lists
    renderSidebarChaseCards();
}

function renderSidebarChaseCards() {
    // 1. Get Safe Preview from Service
    const displayCards = ShopService.getPreviewCards(currentCategory, currentPack.id);

    // 2. Update Header
    const headerEl = document.querySelector('.chase-header h4');
    if (headerEl) headerEl.textContent = `${currentPack.name} Chase Cards`;

    // 3. Render
    const carouselEl = document.getElementById('chaseCarousel');
    if (!carouselEl) return;

    // Fallback UI
    const cardsToRender = displayCards.length > 0 ? displayCards : [{ name: 'Mystery Card', value: '???', img: 'https://placehold.co/400x560/333333/FFFFFF?text=Mystery' }];

    carouselEl.innerHTML = cardsToRender.map(card => `
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

function renderLevelSelect() {
    const packs = ShopService.getPackTiers();
    levelSelectGrid.innerHTML = packs.map(pack => {
        const isActive = currentPack.id === pack.id;
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

function renderValues() {
    const odds = ShopService.getOdds();
    const base = currentPack.price;

    valuesList.innerHTML = odds.map(config => {
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

// --- INTERACTIONS ---

function selectPack(id) {
    const packs = ShopService.getPackTiers();
    currentPack = packs.find(p => p.id === id);

    // Update Text
    selectedLevelName.textContent = currentPack.name;
    stageTierName.textContent = currentPack.name.toUpperCase();
    avgValue.textContent = currentPack.price.toLocaleString();
    buyBtnPrice.textContent = currentPack.price.toLocaleString();

    // Animate price change
    buyBtnPrice.style.opacity = '0.5';
    setTimeout(() => buyBtnPrice.style.opacity = '1', 200);

    // Refresh UI
    renderLevelSelect();
    renderValues();
    renderSidebarChaseCards();
}

function setupSidebarInteractions() {
    // Category Buttons
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-category]').forEach(b => {
                b.classList.remove('active-category', 'border-[#FFFFFF]', 'bg-tertiary');
                b.classList.add('border-primary');
            });
            const target = e.currentTarget;
            target.classList.remove('border-primary');
            target.classList.add('active-category', 'border-[#FFFFFF]', 'bg-tertiary');

            currentCategory = target.dataset.category;
            updateStageVisuals();
        });
    });

    // Buy Button
    sidebarBuyBtn.addEventListener('click', () => {
        openRipModal(currentPack.id);
    });
}

function setupStageInteractions() {
    stageContainer.addEventListener('mousemove', (e) => {
        const rect = stageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        pack3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    stageContainer.addEventListener('mouseleave', () => pack3d.style.transform = 'rotateX(0) rotateY(0)');
}

// --- MODAL & CHECKOUT FLOW ---

window.openRipModal = (packId) => {
    const packs = ShopService.getPackTiers();
    const pack = packs.find(p => p.id === packId);
    if (!pack) return;

    currentPack = pack;

    // Reset UI State -> Payment First
    ripModal.classList.remove('hidden');
    paymentStage.classList.remove('hidden');
    packStage.classList.add('hidden');
    revealStage.classList.add('hidden');
    ripBtn.classList.add('hidden');

    // Populate Payment
    payItemName.textContent = `${currentCategory.toUpperCase()} ${pack.name}`;
    payItemPrice.textContent = `$${pack.price.toLocaleString()}.00`;
    payBtnAmount.textContent = `$${pack.price.toLocaleString()}.00`;

    // Reset Pay Button
    const spanText = confirmPayBtn.querySelector('span:first-child');
    if (spanText) spanText.textContent = "PAY NOW";
    confirmPayBtn.disabled = false;
    confirmPayBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Prepare Pack (background loading)
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
    // 1. Lock UI
    const spanText = confirmPayBtn.querySelector('span:first-child');
    spanText.textContent = "PROCESSING...";
    confirmPayBtn.disabled = true;
    confirmPayBtn.classList.add('opacity-50', 'cursor-not-allowed');

    // 2. Simulate Server Latency (1.5s)
    setTimeout(() => {
        transitionToPack();
    }, 1500);
}

function transitionToPack() {
    paymentStage.classList.add('hidden');
    packStage.classList.remove('hidden');
    ripBtn.classList.remove('hidden');
    ripBtn.disabled = false;
}

function performRip() {
    const packEl = activePackContainer.querySelector('.pack-envelope');

    // 1. Shake Animation
    packEl.classList.add('shaking');
    ripBtn.disabled = true;
    ripBtn.textContent = "OPENING...";

    // 2. Call Service (This is where we would POST to server)
    // We do this concurrently with the animation so data is ready when shake ends
    const resultCard = ShopService.openPack(currentCategory, currentPack.id);

    // 3. Wait for animation (2s)
    setTimeout(() => {
        packEl.classList.remove('shaking');
        showResult(resultCard);
    }, 2000);
}

function showResult(card) {
    if (!card) return; // Error handling

    // Render Result
    document.getElementById('cardResultImg').src = card.img;
    document.getElementById('cardResultName').textContent = card.name;
    document.getElementById('cardGrade').textContent = card.grade;
    document.getElementById('cardValue').textContent = card.value;
    document.getElementById('sellValue').textContent = "Sell for $0.00"; // Mock

    // Switch Views
    packStage.classList.add('hidden');
    ripBtn.classList.add('hidden');
    revealStage.classList.remove('hidden');
}

function setupEventListeners() {
    closeModalBtn.addEventListener('click', () => ripModal.classList.add('hidden'));
    ripBtn.addEventListener('click', () => performRip());

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handlePayment();
    });

    ripModal.addEventListener('click', (e) => {
        if (e.target === ripModal) ripModal.classList.add('hidden');
    });
}

// Start App
init();
