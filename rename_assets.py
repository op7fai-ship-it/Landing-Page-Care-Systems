import os
import shutil

# Current folder name
old_folder = "animação_000"
new_folder = "animation"

if os.path.exists(old_folder):
    # Rename folder
    if not os.path.exists(new_folder):
        os.rename(old_folder, new_folder)
        print(f"Renamed folder '{old_folder}' to '{new_folder}'")
    else:
        print(f"Target folder '{new_folder}' already exists. Using it.")
else:
    if os.path.exists(new_folder):
        print(f"Folder '{old_folder}' not found, but '{new_folder}' exists. Proceeding with file renames inside it.")
    else:
        print(f"Folder '{old_folder}' not found. Aborting.")
        exit(1)

# Rename files inside the new folder
# Expected format: animação_XXX.jpg -> frame_XXX.jpg
files = os.listdir(new_folder)
count = 0
for filename in files:
    if filename.startswith("animação_") and filename.endswith(".jpg"):
        # Extract number
        # name is like "animação_000.jpg"
        parts = filename.split('_')
        if len(parts) == 2:
            num_part = parts[1] # "000.jpg"
            new_name = f"frame_{num_part}"
            
            old_path = os.path.join(new_folder, filename)
            new_path = os.path.join(new_folder, new_name)
            
            os.rename(old_path, new_path)
            count += 1

print(f"Renamed {count} files in '{new_folder}'.")
