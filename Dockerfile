FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python3

RUN npm install

COPY . .

EXPOSE 4000
CMD [ "node", "server.js" ]