# Use the latest LTS version of Node.js as the base image
FROM node:lts as build

# Create a directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code to the app directory
COPY . .

# Build the React app
RUN npm run build

# --- Stage 2 ---

# Use a smaller, secure base image for production
FROM node:alpine

# Create app directory
WORKDIR /app

# Install serve for serving built React app
RUN npm install -g serve

# Copy over the 'build' folder from the builder stage
COPY --from=build /app/build ./build

# Expose port 5000 for the application
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
