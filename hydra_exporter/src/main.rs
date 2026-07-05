use serde::Serialize;
use std::fs::File;
use std::io::Write;

#[derive(Serialize)]
struct Node {
    id: String,
    name: String,
    environment: String,
    status: String,
    smart_contract_pointer: String,
}

fn main() {
    let total_nodes = 13700;
    let mut ledger: Vec<Node> = Vec::with_capacity(total_nodes);
    let environments = ["Micro", "Underground", "Invisible", "Space", "Earth", "Underwater"];

    for i in 1..=total_nodes {
        let env = environments[i % 6]; 
        ledger.push(Node {
            id: format!("ATL-{:06}", i),
            name: format!("Autonomous {} Sentry Node", env), 
            environment: env.to_string(),
            status: "Ready-for-Settlement".to_string(),
            smart_contract_pointer: format!("0x{:04X}-{}-{}", i, env.to_uppercase(), i % 1000),
        });
    }

    // --- OVERRIDES: INJECT MASTER KEY PROOFS ---
    // Legacy blocks omitted for brevity in compilation script, keeping latest anchors
    ledger[13499].name = "National Infrastructure Self-Funding Auditor".to_string();
    
    // Block 036 Master Keys
    ledger[13500].name = "Personal Decentralized Yield-Stacking Agent".to_string();
    ledger[13533].name = "Autonomous Cross-Entity Resource-Swapping Sentry".to_string();
    ledger[13599].name = "National Infrastructure Yield-Diversification Auditor".to_string();

    // Block 037 Master Keys
    ledger[13600].name = "Personal Sovereign Identity-Credentialing Node".to_string();
    ledger[13600].environment = "Invisible".to_string();
    ledger[13600].smart_contract_pointer = "0xIND-IDY-701".to_string();

    ledger[13633].name = "Autonomous Inter-Entity Settlement Auditor".to_string();
    ledger[13633].environment = "Invisible".to_string();
    ledger[13633].smart_contract_pointer = "0xCOR-PAY-734".to_string();

    ledger[13699].name = "National Ledger-Integrity Compliance Sentry".to_string();
    ledger[13699].environment = "Invisible".to_string();
    ledger[13699].smart_contract_pointer = "0xGOV-LED-700".to_string();

    let json_output = serde_json::to_string_pretty(&ledger).expect("Failed to serialize");
    let mut file = File::create("hydra_ledger.json").expect("Failed to create file");
    file.write_all(json_output.as_bytes()).expect("Failed to write");
    println!("SUCCESS: hydra_ledger.json generated locally.");
}
