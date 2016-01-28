FROM nodesource/node:5

WORKDIR /code

ADD . /code

RUN npm config set production && npm install

EXPOSE 8000

CMD [ "npm", "start" ]
