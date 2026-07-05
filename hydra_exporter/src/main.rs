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
    let total_nodes = 15300;
    
    let mut ledger = Vec::with_capacity(total_nodes);
    let environments = ["Micro", "Corporate", "Invisible", "Space", "Grid", "Underwater"];

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

    // --- BLOCK 053 MASTER KEYS (BIO-INFRASTRUCTURE VERTICAL) ---
    ledger[15200].name = "Personal Health-Data Privacy Sentry".to_string();
    ledger[15200].environment = "Invisible".to_string();
    ledger[15200].smart_contract_pointer = "0xIND-BIO-301".to_string();

    ledger[15233].name = "Autonomous Biomanufacturing Regulatory Sentry".to_string();
    ledger[15233].environment = "Micro".to_string();
    ledger[15233].smart_contract_pointer = "0xCOR-LAB-334".to_string();

    ledger[15299].name = "National Bio-Infrastructure Integrity Auditor".to_string();
    ledger[15299].environment = "Grid".to_string();
    ledger[15299].smart_contract_pointer = "0xGOV-BIO-300".to_string();

    let json_output = serde_json::to_string_pretty(&ledger).expect("Failed to serialize");
    let mut file = File::create("hydra_ledger.json").expect("Failed to create file");
    file.write_all(json_output.as_bytes()).expect("Failed to write");
    println!("SUCCESS: hydra_ledger.json expanded to 15,300 nodes.");
}
