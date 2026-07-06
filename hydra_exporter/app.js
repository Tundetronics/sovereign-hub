let masterLedger = []; 
let procureCart = []; 
const NODE_PRICE_NGN = 50000; 

async function bootSystem() {
    try {
        const response = await fetch('hydra_ledger.json');
        masterLedger = await response.json();
        renderNodes(masterLedger.slice(0, 50));
    } catch (error) {
        console.error("Critical Failure: Ledger out of sync.", error);
    }
}

function renderNodes(nodesToDisplay) {
    const grid = document.getElementById('results-grid');
    grid.innerHTML = nodesToDisplay.map(node => `
        <div class="node-card">
            <h3 style="margin-top:0;">${node.id}</h3>
            <p style="font-size: 14px;"><strong>${node.name}</strong></p>
            <div style="margin-bottom: 10px;">
                <span class="node-tag">${node.environment}</span>
            </div>
            <button class="procure-btn" onclick="addToCart('${node.id}')">Stage for Procurement</button>
        </div>
    `).join('');
}

document.getElementById('search-bar').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const searchResults = masterLedger.filter(node => 
        node.name.toLowerCase().includes(query) || 
        node.id.toLowerCase().includes(query) ||
        node.environment.toLowerCase().includes(query)
    );
    renderNodes(searchResults.slice(0, 50));
});

function addToCart(nodeId) {
    const selectedNode = masterLedger.find(n => n.id === nodeId);
    if (!procureCart.includes(selectedNode)) {
        procureCart.push(selectedNode);
        updateCartUI();
    } else {
        alert(`[!] Node ${nodeId} is already in the ledger queue.`);
    }
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = procureCart.length;
    document.getElementById('cart-total').innerText = `Total: ₦${(procureCart.length * NODE_PRICE_NGN).toLocaleString()}`;
    
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = procureCart.map(node => `<li>${node.id} - ${node.name}</li>`).join('');
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
}

function initiatePaystack() {
    const email = document.getElementById('buyer-email').value;
    if (!email) {
        alert("Error: Email is required for artifact delivery.");
        return;
    }
    if (procureCart.length === 0) {
        alert("Error: Cart is empty.");
        return;
    }

    const totalAmountKobo = procureCart.length * NODE_PRICE_NGN * 100;

    let handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 
        email: email,
        amount: totalAmountKobo,
        currency: 'NGN',
        ref: 'HYDRA_' + Math.floor((Math.random() * 1000000000) + 1),
        
        callback: function(response){
            alert('Settlement Verified. Reference: ' + response.reference);
            triggerBackendEngine(email, response.reference);
        },
        onClose: function(){
            alert('Settlement Terminated by User.');
        }
    });
    handler.openIframe();
}

function triggerBackendEngine(email, reference) {
    console.log(`Payload ready for Backend Engine. Reference: ${reference}, Nodes: ${procureCart.map(n=>n.id).join(', ')}`);
    procureCart = [];
    updateCartUI();
    toggleCart();
}

bootSystem();
