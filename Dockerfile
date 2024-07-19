# Use the official Node.js image as the base image
FROM node

# Set the working directory inside the container to /myapp
WORKDIR /myapp

# Copy the current directory contents (from the host machine) to the working directory in the container
COPY . .

# Install any dependencies specified in package.json
RUN npm install

# Make port 3002 available to the world outside this container
EXPOSE 3002

# Run the command 'npm start' to start the application
CMD ["npm", "start"] 
