import os

root_dir = 'frontend/src'

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(subdir, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Fix escaped backticks
            new_content = content.replace('\\`', '`')
            # Fix escaped template literals
            new_content = new_content.replace('\\${', '${')
            
            if new_content != content:
                print(f"Fixing {filepath}")
                with open(filepath, 'w') as f:
                    f.write(new_content)
