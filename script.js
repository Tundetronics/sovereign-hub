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
