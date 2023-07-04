FROM node:18

WORKDIR /usr/src/application

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
# npm i @babel/plugin-proposal-private-property-in-object
RUN npm i @babel/plugin-proposal-private-property-in-object

CMD ["npm", "start"]