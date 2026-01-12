// --- UI CONTROLLER ---
// Relies on ShopService (services.js) for all data logic.
// Relies on ShopService (services.js) for all data logic.
// MOCK_ACCOUNT_DETAILS is loaded via global script (index.html)


// State
let currentPack = ShopService.getPackTiers()[0]; // Default
let currentCategory = 'fortnite'; // Fixed for now

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
// const chaseCarousel = document.getElementById('chaseCarousel'); // Accessed dynamically

// Modal Elements
const ripModal = document.getElementById('ripModal');
const closeModalBtn = document.querySelector('.close-modal');
const activePackContainer = document.getElementById('activePack');
const ripBtn = document.getElementById('ripBtn');
const packStage = document.querySelector('.pack-stage');
const revealStage = document.getElementById('revealedCard');

// Account Details Modal Elements
const accountDetailsModal = document.getElementById('accountDetailsModal');
const closeDetailsBtn = document.querySelector('.close-details-modal');

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
    updateStageVisuals(); // Ensure initial state is correct

    // Refresh 'Odds' visualizer periodically
    setInterval(() => renderValues(), 5000);
}

// --- RENDERING ---

function updateStageVisuals() {
    // Fixed Icon for Fortnite
    packIcon.textContent = '🎮';

    // Update Title
    stagePackName.textContent = "FORTNITE";

    // Update Sidebar Lists
    renderSidebarChaseCards();
}

function renderSidebarChaseCards() {
    // 1. Get Safe Preview from Service
    const displayCards = ShopService.getPreviewCards(currentCategory, currentPack.id);

    // 2. Update Header
    const headerEl = document.querySelector('.chase-header h4');
    if (headerEl) headerEl.textContent = `${currentPack.name} Chase Accounts`;

    // 3. Render
    const carouselEl = document.getElementById('chaseCarousel');
    if (!carouselEl) return;

    // Fallback UI
    const cardsToRender = displayCards.length > 0 ? displayCards : [];

    carouselEl.innerHTML = cardsToRender.map(card => `
        <div class="account-card group cursor-pointer" data-id="${card.id}">
            <div class="account-image-wrapper">
                <img src="${card.img}" alt="${card.title}">
            </div>
            
            <div class="account-details">
                <span class="account-stat-badge">${card.stats.skins} SKINS</span>
                <p class="account-title">${card.title}</p>
            </div>
            
            <div class="account-footer">
                <span class="account-value">${card.value}</span>
                <span class="account-est">Est.</span>
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

    valuesList.innerHTML = odds.slice(0, 5).map(config => {
        // Customize label for Accounts
        let label = "Common";
        if (config.minMult >= 0.8) label = "Break Even";
        if (config.minMult >= 1.0) label = "Profit";
        if (config.minMult >= 2.0) label = "Big Win";
        if (config.minMult >= 4.0) label = "Jackpot";

        const perc = config.weight;

        return `
        <div class="flex items-center gap-1">
            <div class="w-24 shrink-0"><p class="font-chivoMono text-xs text-primary">${label}</p></div>
            <div class="grow">
                <div class="flex">
                    <div class="relative h-2 w-full overflow-hidden rounded-full bg-border-secondary">
                        <div class="h-full rounded-full bar-blue transition-all duration-500" style="width: ${perc}%"></div>
                    </div>
                </div>
            </div>
            <div class="w-12 shrink-0 text-right"><p class="font-chivoMono text-xs text-primary">${perc}%</p></div>
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
    // Just force update if they click platforms, essentially doing nothing different for now
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-category]').forEach(b => {
                b.classList.remove('active-category', 'border-[#FFFFFF]', 'bg-tertiary');
                b.classList.add('border-primary');
            });
            const target = e.currentTarget;
            target.classList.remove('border-primary');
            target.classList.add('active-category', 'border-[#FFFFFF]', 'bg-tertiary');
        });
    });

    // Buy Button
    sidebarBuyBtn.addEventListener('click', () => {
        openRipModal(currentPack.id);
    });

    // Chase Card Click Listener (Delegation)
    const carouselEl = document.getElementById('chaseCarousel');
    if (carouselEl) {
        carouselEl.addEventListener('click', (e) => {
            const cardEl = e.target.closest('.account-card');
            if (cardEl) {
                // For prototype, open the *Mock* data regardless of which card is clicked
                // In production, we would fetch details by ID: ShopService.getAccount(cardEl.dataset.id)
                openAccountDetailsModal(MOCK_ACCOUNT_DETAILS);
            }
        });
    }
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

function openAccountDetailsModal(account) {
    // Populate Modal
    document.getElementById('detailHeroImg').src = account.images.main;
    document.getElementById('detailTitle').textContent = account.title;
    document.getElementById('detailLevel').textContent = account.stats.level;
    document.getElementById('detailWins').textContent = account.stats.wins;
    document.getElementById('detailPrice').textContent = `$${account.price_value}`; // Corrected Currency Symbol

    document.getElementById('detailSkinCount').textContent = account.inventory.skins.total;
    document.getElementById('detailVbucks').textContent = account.stats.vbucks;
    document.getElementById('detailPlatform').textContent = account.account_info.platform;

    // Images with Error Fallback
    const setImg = (id, src, fallbackText) => {
        const img = document.getElementById(id);
        if (!img) return;
        img.src = src;
        img.onerror = () => {
            img.src = `https://placehold.co/600x400/222222/FFFFFF?text=${fallbackText}`;
        };
    };

    setImg('detailSkinsImg', account.inventory.skins.preview_image, 'Skins+Preview');
    setImg('detailPickaxesImg', account.inventory.pickaxes.preview_image, 'Pickaxes+Preview');
    setImg('detailEmotesImg', account.inventory.emotes.preview_image, 'Emotes+Preview');
    setImg('detailGlidersImg', account.inventory.gliders.preview_image, 'Gliders+Preview');

    // Reliable Info
    const reliableInfoEl = document.getElementById('detailReliableInfo');
    if (reliableInfoEl && account.reliable_info) {
        reliableInfoEl.innerHTML = Object.entries(account.reliable_info).map(([key, value]) => {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            return `
                <div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.05);">
                    <div style="font-size: 10px; color: #a1a1aa; text-transform: uppercase;">${formattedKey}</div>
                    <div style="font-size: 14px; color: white;">${value}</div>
                </div>
            `;
        }).join('');
    }

    // Transactions
    const txHistoryEl = document.getElementById('detailTxHistory');
    txHistoryEl.innerHTML = account.transaction_history.map(tx => `
        <div class="flex justify-between text-sm text-white border-b border-white/5 pb-1 mb-1 last:border-0">
            <span class="truncate pr-2" title="${tx.service}">${tx.service}</span>
            <div class="flex gap-2 shrink-0">
                <span class="text-accent">${tx.amount}</span>
                <span class="text-tertiary">${tx.date}</span>
            </div>
        </div>
    `).join('');

    accountDetailsModal.classList.remove('hidden');
}

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
    payItemName.textContent = `Fortnite ${pack.name} Account`;
    payItemPrice.textContent = `$${pack.price.toLocaleString()}.00`;
    payBtnAmount.textContent = `$${pack.price.toLocaleString()}.00`;

    // Reset Pay Button
    const spanText = confirmPayBtn.querySelector('span:first-child');
    if (spanText) spanText.textContent = "PAY NOW";
    confirmPayBtn.disabled = false;
    confirmPayBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    // Prepare Pack (background loading)
    ripBtn.textContent = `REVEAL ACCOUNT`;
    activePackContainer.innerHTML = `
        <div class="pack-envelope" style="background: linear-gradient(135deg, ${pack.color} 0%, #000 100%);">
            <div class="pack-logo">FORTNITE</div>
            <div class="pack-label">${pack.name}</div>
            <div class="font-chivoMono text-white mt-2">$${pack.price.toLocaleString()}</div>
        </div>
    `;
};

function handlePayment() {
    // 1. Lock UI
    const spanText = confirmPayBtn.querySelector('span:first-child');
    spanText.textContent = "VERIFYING...";
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
    // For Prototype: Directly open the detailed modal after a delay
    const packEl = activePackContainer.querySelector('.pack-envelope');

    // 1. Shake Animation
    packEl.classList.add('shaking');
    ripBtn.disabled = true;
    ripBtn.textContent = "GENERATING...";

    setTimeout(() => {
        packEl.classList.remove('shaking');
        // Close Rip Modal
        ripModal.classList.add('hidden');
        // OPEN THE DETAILED MOCK MODAL INSTEAD OF THE SIMPLE REVEAL
        openAccountDetailsModal(MOCK_ACCOUNT_DETAILS);
    }, 2000);
}

function showResult(account) {
    if (!account) return;
    // DEPRECATED for prototype - now using openAccountDetailsModal
}

function setupEventListeners() {
    closeModalBtn.addEventListener('click', () => ripModal.classList.add('hidden'));

    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => accountDetailsModal.classList.add('hidden'));
    }

    ripBtn.addEventListener('click', () => performRip());

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handlePayment();
    });

    ripModal.addEventListener('click', (e) => {
        if (e.target === ripModal) ripModal.classList.add('hidden');
    });

    accountDetailsModal.addEventListener('click', (e) => {
        if (e.target === accountDetailsModal) accountDetailsModal.classList.add('hidden');
    });
}

// Start App
init();
