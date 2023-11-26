FROM node:18 as build
WORKDIR /home/node/app

COPY package.json .
COPY . .

RUN npm install
RUN npm run buildfront
RUN npm run buildback


FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/front /usr/share/nginx/html

EXPOSE 80
CMD [ "npm", "start" ]
