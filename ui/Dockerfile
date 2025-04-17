# ---------- Stage 1: Build the Vite frontend ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# ---------- Stage 2: Serve with Apache HTTP Server ----------
FROM httpd:2.4

# Remove default Apache web files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy built files from builder stage to Apache's web root
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Optional: Add .htaccess to support SPA routing (uncomment if needed)
COPY public/.htaccess /usr/local/apache2/htdocs/

# Expose port 80 for HTTP
EXPOSE 80

# Start Apache in foreground
CMD ["httpd-foreground"]
