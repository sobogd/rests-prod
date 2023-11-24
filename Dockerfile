FROM node:18 as build
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run html
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/front /usr/share/nginx/html

FROM node:18
EXPOSE 4000
CMD [ "npm", "run", "back" ]