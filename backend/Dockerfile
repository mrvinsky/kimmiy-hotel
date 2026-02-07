FROM node:20-alpine

WORKDIR /app

# Install dependencies separately for layer caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
