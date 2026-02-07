import os

files = [
    'backend/src/bookings/bookings.service.ts',
    'backend/src/mail/mail.service.ts',
    'backend/src/rooms/rooms.service.ts',
    'backend/src/upload/upload.service.ts',
    'backend/src/upload/upload.controller.ts'
]

base_dir = '/Users/mrvinsky/Desktop/kimmiy-hotel'

for f in files:
    path = os.path.join(base_dir, f)
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    
    with open(path, 'r') as file:
        content = file.read()
    
    # Replace \` with ` and \${ with ${
    new_content = content.replace('\\`', '`').replace('\\${', '${')
    
    if content != new_content:
        print(f"Fixing {f}")
        with open(path, 'w') as file:
            file.write(new_content)
    else:
        print(f"No changes for {f}")
