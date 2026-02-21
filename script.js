document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("hub-search");
    const results = document.getElementById("search-results");
    let data = [];

    // PROOF OF LIFE
    console.log("Sovereign Engine v1.0 Live");

    fetch("./projects.json")
        .then(r => r.json())
        .then(j => { data = j; console.log("Database Ready: " + data.length); })
        .catch(e => alert("Search Error: Database not found. Check projects.json location."));

    if(search && results) {
        search.addEventListener("input", (e) => {
            const val = e.target.value.toLowerCase();
            results.innerHTML = "";
            if(val.length < 2) { results.style.display = "none"; return; }
            
            const filtered = data.filter(p => p.title.toLowerCase().includes(val)).slice(0,5);
            if(filtered.length > 0) {
                results.style.display = "block";
                filtered.forEach(p => {
                    const d = document.createElement("div");
                    d.className = "search-item";
                    d.innerHTML = `<strong>${p.title}</strong>`;
                    results.appendChild(d);
                });
            }
        });
    }
});
