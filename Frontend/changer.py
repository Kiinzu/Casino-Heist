import sys
import os
import re

if len(sys.argv) < 2:
    print("Usage: python script.py <new_url>")
    sys.exit(1)

new_url = 'http://' +  sys.argv[1]
base_path = './src/assets/Properties/'

def replace_url_in_files(base_path, new_url):
    for folder_name in os.listdir(base_path):
        folder_path = os.path.join(base_path, folder_name)
        
        description_path = os.path.join(folder_path, 'description.md')
        
        if os.path.isfile(description_path):
            with open(description_path, 'r') as file:
                content = file.read()

            # Regular expression to find URLs in the markdown links
            updated_content = re.sub(r'http://[^:]+:', f'{new_url}:', content)

            if content != updated_content:
                with open(description_path, 'w') as file:
                    file.write(updated_content)
                print(f"Replaced URL in {description_path}")
            else:
                print(f"No URL to replace in {description_path}")

replace_url_in_files(base_path, new_url)
