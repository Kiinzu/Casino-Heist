import sys
import os

if len(sys.argv) < 2:
    print("Usage: python script.py <new_url>")
    sys.exit(1)

new_url = sys.argv[1]  
base_path = './src/assets/Properties/'

def replace_url_in_files(base_path, old_url, new_url):
    for folder_name in os.listdir(base_path):
        folder_path = os.path.join(base_path, folder_name)
        
        description_path = os.path.join(folder_path, 'description.md')
        
        if os.path.isfile(description_path):
            with open(description_path, 'r') as file:
                content = file.read()
            if old_url in content:
                content = content.replace(old_url, new_url)
                with open(description_path, 'w') as file:
                    file.write(content)
                print(f"Replaced URL in {description_path}")
            else:
                print(f"No URL to replace in {description_path}")

# Run the function with the provided URL
# Change the middle one, default 127.0.0.1
replace_url_in_files(base_path, "http://103.222.223.109", new_url)
