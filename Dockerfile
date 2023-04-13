# Use the latest LTS version of Node.js as the base image
FROM node:lts

# RUN apk add --no-cache git

# Create a directory for the application
WORKDIR /app

# Copy the package.json and package-lock.json files to the app directory.
COPY package*.json ./

# Install dependencies
RUN npm install

# nodemon
RUN npm install --global nodemon

RUN npm install -g sonarqube-scanner

# Copy the application code to the app directory
COPY . .

# Expose port 5001 for the application
EXPOSE 5001

# Start the application
CMD ["npm", "run","server:prod"]
