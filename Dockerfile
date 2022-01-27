FROM node:17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]