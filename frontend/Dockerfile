FROM node:12.6-alpine

RUN apk add --no-cache git

VOLUME /home/node/frontend
VOLUME /home/node/frontend/node_modules

WORKDIR /home/node/frontend

# Start app
CMD npm install && npm run start
