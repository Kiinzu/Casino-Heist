#!/bin/bash

# Step 1: Run docker-compose up in detached mode
echo "Starting Docker containers..."
docker-compose up -d

# Step 2: Ask for domain name input
read -p "Enter your domain name: " domain_name

# Steo 3: Building the Frontend and moving it to the correct directory
cd ./Frontend
./install.sh
cp -r ./dist/* /var/www/$domain_name/html
cd ..

# Step 4: Get the IP address of the 'react-casino-heist_web' container
container_id=$(docker ps --filter "ancestor=react-casino-heist_web" --format "{{.ID}}")

if [ -z "$container_id" ]; then
    echo "No running container found with image 'react-casino-heist_web'."
    exit 1
fi

echo "Container ID found: $container_id"

# Step 5: Get the IP address of the selected container
container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' "$container_id")

if [ -z "$container_ip" ]; then
    echo "Failed to get container IP. Make sure the container is running."
    exit 1
fi

echo "Container IP for $container_name: $container_ip"

# Step 6: Create the NGINX configuration file
nginx_config_path="/etc/nginx/sites-available/$domain_name"

cat > "$nginx_config_path" <<EOL
server {
    root /var/www/${domain_name}/html;
    index index.html index.htm index.nginx-debian.html;

    server_name ${domain_name} www.${domain_name};

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://${container_ip}:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/${domain_name}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain_name}/privkey.pem;

    error_page 404 /index.html;
}

server {
    if (\$host = www.${domain_name}) {
        return 301 https://\$host\$request_uri;
    }
    if (\$host = ${domain_name}) {
        return 301 https://\$host\$request_uri;
    }

    listen 80;
    listen [::]:80;
    server_name ${domain_name} www.${domain_name};
    return 404;
}
EOL

# Step 7: Create symlink to enable the site
ln -s "$nginx_config_path" /etc/nginx/sites-enabled/

# Step 8: Test NGINX configuration
nginx -t
if [ $? -ne 0 ]; then
    echo "NGINX configuration test failed. Please check the config."
    exit 1
fi

# Step 9: Restart NGINX service
echo "Restarting NGINX..."
sudo service nginx restart #IF YOU ARE ON VPS PLEASE REMOVE THE SUDO, SOMETIME IT CAUSES ERROR, OR YOU CAN RESTART NGINX URSELF

echo "Deployment completed successfully!"
