# Use official Python image
# Use an official Node.js runtime as a parent image
FROM node:24.5.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have one)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your application will listen on
EXPOSE 5173

# Define the command to run your application
CMD ["npm", "run", "dev"]

