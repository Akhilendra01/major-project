# ---------- Stage 1: Build the Vite frontend ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app for production
RUN npm run build

# ---------- Stage 2: Serve with Apache ----------
FROM httpd:2.4

# Remove default Apache web files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy built files from builder stage to Apache web directory
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Optional: Copy a custom Apache config if needed (uncomment if you have one)
# COPY ./apache.conf /usr/local/apache2/conf/httpd.conf

# Expose HTTP port
EXPOSE 80

# Start Apache in the foreground
CMD ["httpd-foreground"]
