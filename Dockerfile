FROM nodesource/node:0.12

WORKDIR /code

ADD . /code

RUN npm config set production && npm install

EXPOSE 8000

CMD [ "npm", "start" ]
