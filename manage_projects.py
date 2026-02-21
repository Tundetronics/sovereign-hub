import json
import os
from datetime import datetime

# --- CONFIGURATION ---
DB_FILE = "projects.json"

def load_data():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

def add_entry():
    data = load_data()
    print("\n--- SOVEREIGN COMMAND: MASTER ENTRY (v4.0) ---")
    print("Select Entry Type:")
    print("1: Standard AI Project (The Master Key)")
    print("2: Research Paper (The Nexus)")
    print("3: Strategic Case Study (The Results)")
    
    choice = input("Select (1-3): ")
    type_map = {"1": "Project", "2": "Research", "3": "Case Study"}
    entry_type = type_map.get(choice, "Project")

    title = input(f"[{entry_type}] Title: ")
    category = input("Category/Industry: ")
    description = input("Description/Result: ")
    
    new_entry = {
        "id": f"SOV-{len(data) + 1:03d}",
        "type": entry_type,
        "title": title,
        "category": category,
        "description": description,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "is_research": (choice == "2")
    }
    
    data.append(new_entry)
    save_data(data)
    print(f"\nSUCCESS: {entry_type} added to the Sovereign Estate.")

def sync_to_hub():
    print("\nSynchronizing Estate with GitHub...")
    os.system("git add .")
    os.system('git commit -m "DATA: Master Synchronization (Projects/Research/Cases)"')
    os.system("git push origin main")
    print("\nDEPLOYMENT COMPLETE: Your changes are live.")

if __name__ == "__main__":
    while True:
        print("\n--- SOVEREIGN MASTER MANAGER ---")
        print("1. Add New Entry")
        print("2. Sync to Global Hub")
        print("3. Exit")
        cmd = input("Command > ")
        
        if cmd == "1":
            add_entry()
        elif cmd == "2":
            sync_to_hub()
        elif cmd == "3":
            break
