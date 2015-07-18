FROM nodesource/node:latest

WORKDIR /code

ADD . /code

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]
