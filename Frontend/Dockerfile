# Use official Node.js image to build the React app
FROM node:18-alpine as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
