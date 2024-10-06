# Use the official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app source to the container
COPY . .

# Expose port 3000 (React's default development server port)
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
