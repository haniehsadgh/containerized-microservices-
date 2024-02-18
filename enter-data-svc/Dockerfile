# Use the official Node.js 14 image.
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies by running npm install in the container
RUN npm install

# Bundle app source by copying all files from your project into the container
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime. Here we will use node server.js to start your server
CMD ["node", "app.js"]

