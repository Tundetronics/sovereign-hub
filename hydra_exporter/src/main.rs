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
    let total_nodes = 14000;
    
    // CORRECTION: Using Type Inference. No angle brackets to get stripped.
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

    // Block 040 Master Keys
    ledger[13900].name = "Personal Predictive-Liquidity Buffer Agent".to_string();
    ledger[13900].environment = "Invisible".to_string();
    ledger[13900].smart_contract_pointer = "0xIND-BUF-001".to_string();

    ledger[13933].name = "Autonomous Cross-Batch Liquidity-Bridge Sentry".to_string();
    ledger[13933].environment = "Corporate".to_string();
    ledger[13933].smart_contract_pointer = "0xCOR-BRG-034".to_string();

    ledger[13999].name = "National Temporal Resource-Allocation Auditor".to_string();
    ledger[13999].environment = "Grid".to_string();
    ledger[13999].smart_contract_pointer = "0xGOV-TMP-000".to_string();

    let json_output = serde_json::to_string_pretty(&ledger).expect("Failed to serialize");
    let mut file = File::create("hydra_ledger.json").expect("Failed to create file");
    file.write_all(json_output.as_bytes()).expect("Failed to write");
    println!("SUCCESS: hydra_ledger.json aligned with UI.");
}
