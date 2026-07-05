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
    let total_nodes = 13500;
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
    ledger[11999].name = "EOL Solar Array Wing-Lock Sentry".to_string();
    ledger[12499].name = "National Reservoir Leak-Detection Sentry".to_string();
    ledger[12999].name = "National Currency Stabilization Audit Node".to_string();
    
    // Block 035 Master Keys
    ledger[13400].name = "Personal Wealth Compounding Engine".to_string();
    ledger[13400].environment = "Invisible".to_string();
    ledger[13400].smart_contract_pointer = "0xIND-CMP-501".to_string();

    ledger[13433].name = "Autonomous CAPEX-Recycling Sentry".to_string();
    ledger[13433].environment = "Invisible".to_string();
    ledger[13433].smart_contract_pointer = "0xCOR-CAP-534".to_string();

    ledger[13499].name = "National Infrastructure Self-Funding Auditor".to_string();
    ledger[13499].environment = "Invisible".to_string();
    ledger[13499].smart_contract_pointer = "0xGOV-SFN-500".to_string();

    let json_output = serde_json::to_string_pretty(&ledger).expect("Failed to serialize");
    let mut file = File::create("hydra_ledger.json").expect("Failed to create file");
    file.write_all(json_output.as_bytes()).expect("Failed to write");
    println!("SUCCESS: hydra_ledger.json generated locally.");
}
