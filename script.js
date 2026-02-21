const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const searchInput = document.getElementById('project-search');
const resultsGrid = document.getElementById('results-grid');

// Theme Logic
toggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

// Search Engine Logic
let allProjects = [];
fetch('projects.json')
    .then(res => res.json())
    .then(data => {
        allProjects = data;
        render(allProjects);
    });

function render(data) {
    resultsGrid.innerHTML = data.map(p => `
        <div class="project-card-mini">
            <h3>${p.title}</h3>
            <p style="font-size:0.8rem; opacity:0.7;">${p.description}</p>
        </div>
    `).join('');
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allProjects.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    render(filtered);
});
// --- FLASH OFFER ENGINE ---
const offers = [
    { title: "Limited Offer", body: "Get 40% off 'The Profit Architect' Vol. 1-3 bundle this week.", link: "#store" },
    { title: "AI Audit", body: "3 Slots remaining for the February AI Efficiency Audit.", link: "https://wa.me/2348165409044" }
];

function showFlashOffer() {
    const container = document.createElement('div');
    container.id = 'flash-container';
    document.body.appendChild(container);

    let current = 0;
    
    function cycleOffer() {
        container.innerHTML = `
            <div class="flash-bubble" id="sov-bubble">
                <span class="flash-close" onclick="document.getElementById('sov-bubble').classList.remove('active')">&times;</span>
                <h4>${offers[current].title}</h4>
                <p>${offers[current].body}</p>
                <a href="${offers[current].link}" class="btn-apple" style="padding: 8px 15px; font-size: 0.75rem; text-align:center;">Claim Offer</a>
            </div>
        `;
        
        setTimeout(() => {
            const b = document.getElementById('sov-bubble');
            if(b) b.classList.add('active');
        }, 100);

        setTimeout(() => {
            const b = document.getElementById('sov-bubble');
            if(b) b.classList.remove('active');
            current = (current + 1) % offers.length;
            setTimeout(cycleOffer, 15000); // Wait 15 seconds before next offer
        }, 8000); // Stay visible for 8 seconds
    }

    setTimeout(cycleOffer, 5000); // Initial start after 5 seconds
}

window.addEventListener('load', showFlashOffer);
