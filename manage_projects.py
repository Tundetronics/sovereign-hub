import json
import os

DB_FILE = "projects.json"

def load_projects():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_projects(projects):
    with open(DB_FILE, "w") as f:
        json.dump(projects, f, indent=4)

def add_project():
    print("\n--- ADD NEW AI PROJECT ---")
    title = input("Project Title: ")
    category = input("Category (e.g., Automation, Finance, Wellness): ")
    desc = input("Brief Description: ")
    
    projects = load_projects()
    new_id = f"AI-{len(projects) + 1:03d}"
    
    projects.append({
        "id": new_id,
        "title": title,
        "category": category,
        "description": desc
    })
    
    save_projects(projects)
    print(f"\nSUCCESS: Project {new_id} added to the Master Key.")

def sync_to_cloud():
    print("\nPushing updates to GitHub...")
    os.system("git add projects.json")
    os.system('git commit -m "DATA: Updated Project Inventory"')
    os.system("git push origin main")
    print("SYNC COMPLETE: Changes are now live on the Sovereign Hub.")

if __name__ == "__main__":
    while True:
        print("\n1. Add Project\n2. Sync to Website\n3. Exit")
        choice = input("Select an option: ")
        
        if choice == "1":
            add_project()
        elif choice == "2":
            sync_to_cloud()
        elif choice == "3":
            break