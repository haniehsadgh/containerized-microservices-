FROM node:14
WORKDIR /usr/src/app
RUN npm install express
RUN npm install passport
RUN npm install passport-local
RUN npm install express-session
RUN npm install connect-flash
RUN npm install body-parser
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
