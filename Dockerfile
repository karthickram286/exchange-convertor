FROM node:12

WORKDIR /app

COPY package*.json  ./

RUN npm install

COPY . .

RUN npm run build

ENV JWT_PRIVATE_KEY=anyfin

EXPOSE 5000

CMD [ "npm", "run", "server" ]