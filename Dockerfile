FROM node:18
WORKDIR /home/node/app

COPY package.json .
COPY . .

RUN npm install
RUN npm run deploy

EXPOSE 80
CMD [ "npm", "start" ]
