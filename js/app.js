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
    const headerEl = document.getElementById('chaseSectionTitle');
    if (headerEl) headerEl.textContent = `${currentPack.name} Chase Accounts`;

    // 3. Render
    const carouselEl = document.getElementById('chaseCarousel');
    const template = document.getElementById('chase-card-template');
    if (!carouselEl || !template) return;

    carouselEl.innerHTML = ''; // Clear previous

    const cardsToRender = displayCards.length > 0 ? displayCards : [];

    cardsToRender.forEach(card => {
        const clone = template.content.cloneNode(true);
        const cardRoot = clone.querySelector('.account-card');
        cardRoot.dataset.id = card.id;

        const img = clone.querySelector('.chase-card-img');
        img.src = card.img;
        img.alt = card.title;

        clone.querySelector('.account-stat-badge').textContent = `${card.stats.skins} SKINS`;
        clone.querySelector('.account-title').textContent = card.title;
        clone.querySelector('.account-value').textContent = card.value;

        carouselEl.appendChild(clone);
    });
}

function renderLevelSelect() {
    const packs = ShopService.getPackTiers();
    const template = document.getElementById('level-select-template');

    if (!levelSelectGrid || !template) return;
    levelSelectGrid.innerHTML = '';

    packs.forEach(pack => {
        const clone = template.content.cloneNode(true);
        const btn = clone.querySelector('button');

        const isActive = currentPack.id === pack.id;
        const activeClass = isActive
            ? `gradient-border-active gradient-active-${pack.id}`
            : 'border border-primary hover:border-[#FFFFFF]';

        // Add classes (preserving existing ones)
        const customClasses = activeClass.split(' ');
        btn.classList.add(...customClasses);

        // Event Listener
        btn.onclick = () => selectPack(pack.id);

        clone.querySelector('.pack-name').textContent = pack.name;
        clone.querySelector('.pack-price').textContent = `$${pack.price.toLocaleString()}`;

        levelSelectGrid.appendChild(clone);
    });
}

function renderValues() {
    const odds = ShopService.getOdds();
    const template = document.getElementById('value-bar-template');

    if (!valuesList || !template) return;
    valuesList.innerHTML = '';

    odds.slice(0, 5).forEach(config => {
        // Customize label for Accounts
        let label = "Common";
        if (config.minMult >= 0.8) label = "Break Even";
        if (config.minMult >= 1.0) label = "Profit";
        if (config.minMult >= 2.0) label = "Big Win";
        if (config.minMult >= 4.0) label = "Jackpot";

        const perc = config.weight;
        const clone = template.content.cloneNode(true);

        clone.querySelector('.label-text').textContent = label;
        clone.querySelector('.bar-fill').style.width = `${perc}%`;
        clone.querySelector('.percent-text').textContent = `${perc}%`;

        valuesList.appendChild(clone);
    });
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
    const infoTemplate = document.getElementById('app-info-row-template');

    if (reliableInfoEl && infoTemplate && account.reliable_info) {
        reliableInfoEl.innerHTML = '';
        Object.entries(account.reliable_info).forEach(([key, value]) => {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const clone = infoTemplate.content.cloneNode(true);

            clone.querySelector('.ac-info-label').textContent = formattedKey;
            clone.querySelector('.ac-info-val').textContent = value;

            reliableInfoEl.appendChild(clone);
        });
    }

    // Transactions
    const txHistoryEl = document.getElementById('detailTxHistory');
    const historyTemplate = document.getElementById('app-history-row-template');

    if (txHistoryEl && historyTemplate) {
        txHistoryEl.innerHTML = '';
        account.transaction_history.forEach(tx => {
            const clone = historyTemplate.content.cloneNode(true);

            const svc = clone.querySelector('.service-name');
            svc.textContent = tx.service;
            svc.title = tx.service;

            clone.querySelector('.amount-text').textContent = tx.amount;
            clone.querySelector('.date-text').textContent = tx.date;

            txHistoryEl.appendChild(clone);
        });
    }

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
