FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port for WhatsApp Web bridge REST API
EXPOSE 8000

# Default command (will be overridden in docker-compose.yml)
CMD ["npm", "run", "start:daemon"]
