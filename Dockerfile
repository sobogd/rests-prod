FROM node:18 as build
WORKDIR /home/node/app

COPY package.json .
COPY . .

RUN npm install
RUN npm run buildfront
RUN npm run buildback

EXPOSE 80
CMD [ "npm", "start" ]
