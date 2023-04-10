# Use the latest LTS version of Node.js as the base image
FROM node:lts

# Create a directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# nodemon
RUN npm install --global nodemon

# Copy the application code to the app directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]