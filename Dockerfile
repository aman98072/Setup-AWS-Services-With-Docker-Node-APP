# Use the official Node.js image as the base image
FROM node

# Set the working directory inside the container to /myapp
WORKDIR /myapp

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Run npm update to update dependencies
RUN npm update

# Copy the current directory contents (from the host machine) to the working directory in the container
COPY . .

# Make port 8001 available to the world outside this container
EXPOSE 8001

# Run the command 'npm start' to start the application
CMD ["npm", "start"]
