# Base image: lightweight Node.js
FROM node:20-alpine

# Working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (production mode)
RUN npm install --production

# Copy the rest of the project
COPY . .

# Expose the port your service will run on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
