document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("hub-search");
    const results = document.getElementById("search-results");
    let database = [];

    console.log("Sovereign Search: Initializing...");

    // Fetch with error handling
    fetch('./projects.json')
        .then(res => {
            if (!res.ok) throw new Error("File not found");
            return res.json();
        })
        .then(data => {
            database = data;
            console.log("Sovereign Search: Database Loaded (" + data.length + " entries)");
        })
        .catch(err => console.error("Sovereign Search Error:", err));

    if (search && results) {
        search.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            results.innerHTML = "";
            
            if (query.length < 2) {
                results.style.display = "none";
                return;
            }

            const matches = database.filter(p => 
                p.title.toLowerCase().includes(query) || 
                (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
            ).slice(0, 5);

            if (matches.length > 0) {
                results.style.display = "block";
                matches.forEach(p => {
                    const div = document.createElement("div");
                    div.className = "result-item";
                    div.innerHTML = `<strong>${p.title}</strong><br><small>${p.description.substring(0, 60)}...</small>`;
                    div.onclick = () => alert("Loading Blueprint: " + p.id);
                    results.appendChild(div);
                });
            } else {
                results.style.display = "none";
            }
        });
    }
});
