FROM node:lts-slim

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]