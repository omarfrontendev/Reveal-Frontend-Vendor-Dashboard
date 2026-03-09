# =========================
# Stage 1: Build React app
# =========================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Optional: check files before build
RUN echo "Files in project folder:" && ls -la /app

# Build React app
RUN npm run build

# Debug: list files in /app/build to make sure it exists
RUN echo "Files in build folder:" && ls -la /app/dist

# =========================
# Stage 2: Serve with Nginx
# =========================
FROM nginx:alpine

# Copy build files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: list copied files in Nginx container for debug
RUN ls -la /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
