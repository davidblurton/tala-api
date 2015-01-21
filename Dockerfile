FROM nodesource/node:latest

WORKDIR /code

ADD . /code

RUN npm install

# VOLUMES_FROM

EXPOSE 8000

CMD [ "npm", "start" ]
