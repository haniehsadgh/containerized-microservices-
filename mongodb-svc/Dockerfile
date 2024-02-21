FROM node:latest
WORKDIR /app
COPY package*.json app.js ./
RUN npm install
RUN npm install mongodb
RUN npm install mongoose
COPY . .

CMD ["npm", "start"]
