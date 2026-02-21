document.addEventListener('DOMContentLoaded', () => {
    let projectDatabase = [];

    // 1. FETCH THE MASTER KEY DATABASE
    fetch('projects.json')
        .then(response => {
            if (!response.ok) throw new Error("Database not found");
            return response.json();
        })
        .then(data => {
            projectDatabase = data;
            console.log("Master Key Loaded: 10,000 Projects Ready.");
        })
        .catch(err => console.error("Database Error:", err));

    // 2. SEARCH LOGIC
    const searchInput = document.getElementById('hub-search');
    const resultsContainer = document.getElementById('search-results');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            resultsContainer.innerHTML = ""; // Clear old results

            if (query.length < 2) return;

            const filtered = projectDatabase.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            ).slice(0, 5); // Show top 5 matches

            filtered.forEach(p => {
                const div = document.createElement('div');
                div.className = 'search-item';
                div.style.padding = '15px';
                div.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
                div.innerHTML = `
                    <div style="color:var(--accent); font-weight:bold;">${p.id}: ${p.title}</div>
                    <div style="font-size:0.8rem; opacity:0.7;">${p.description}</div>
                `;
                resultsContainer.appendChild(div);
            });
        });
    }
});
