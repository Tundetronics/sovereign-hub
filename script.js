document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('input[type="text"]') || document.getElementById('hub-search');
    const resultsContainer = document.getElementById('search-results');
    let projectDatabase = [];

    console.log("Sovereign Engine Initializing...");

    // 1. Load Database
    fetch('./projects.json')
        .then(res => res.json())
        .then(data => {
            projectDatabase = data;
            console.log("Database Loaded Successfully: " + data.length + " entries.");
        })
        .catch(err => console.error("CRITICAL: Database Load Failed", err));

    // 2. Search Execution
    if (searchInput && resultsContainer) {
        searchInput.placeholder = "Search 10,000 Projects..."; // Visual confirmation
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            resultsContainer.innerHTML = "";
            
            if (query.length < 2) return;

            const matches = projectDatabase.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.tags.some(t => t.toLowerCase().includes(query))
            ).slice(0, 5);

            matches.forEach(p => {
                const item = document.createElement('div');
                item.style.cssText = "padding: 15px; background: #111; border-bottom: 1px solid #333; color: #fff; cursor: pointer;";
                item.innerHTML = `<strong>${p.id}</strong>: ${p.title}`;
                resultsContainer.appendChild(item);
            });
        });
    } else {
        console.error("CRITICAL: Search elements not found in HTML.");
    }
});
