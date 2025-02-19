FROM node:21

WORKDIR /usr/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]