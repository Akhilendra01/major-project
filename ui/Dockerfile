# ---------- Stage 1: Build the Vite frontend ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

FROM httpd:2.4

# Remove default Apache web files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy built files from builder stage
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80