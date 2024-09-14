# Step 1: Build Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package*.json ./

# Remove package-lock.json and node_modules (optional cleanup step)
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app (use --configuration=production)
RUN npm run build -- --configuration production


# Step 2: Serve Angular app with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY src/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Angular app build output to Nginx's default directory
COPY --from=build /app/dist/vehicle-web/browser/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
