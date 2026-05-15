# define your base image
FROM node:20-alpine

# define the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Run the npm install command
RUN npm install && npm install -g npm@latest

# Copy all the files
COPY . .

# Run the start script
CMD ["npm","start"]