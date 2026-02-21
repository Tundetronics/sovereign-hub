document.addEventListener("DOMContentLoaded", function() {
    let projectDatabase = [];

    // 1. CLEAR LOGIC: Fetch the database relative to the root
    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            projectDatabase = data;
            console.log("Master Key Synced: " + data.length + " projects.");
        })
        .catch(err => console.error("Database Link Failure:", err));

    // 2. SEARCH TARGETING
    const searchInput = document.getElementById('hub-search');
    const resultsContainer = document.getElementById('search-results');

    if (searchInput && resultsContainer) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            resultsContainer.innerHTML = ""; 

            if (query.length < 2) {
                resultsContainer.style.display = "none";
                return;
            }

            const filtered = projectDatabase.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.tags.some(t => t.toLowerCase().includes(query))
            ).slice(0, 5);

            if (filtered.length > 0) {
                resultsContainer.style.display = "block";
                filtered.forEach(p => {
                    const div = document.createElement('div');
                    div.style.cssText = "padding:15px; border-bottom:1px solid #333; cursor:pointer; background:#111; color:#fff;";
                    div.innerHTML = `<strong>${p.id}</strong>: ${p.title}<br><small style='opacity:0.6'>${p.description}</small>`;
                    resultsContainer.appendChild(div);
                });
            } else {
                resultsContainer.style.display = "none";
            }
        });
    }
});
