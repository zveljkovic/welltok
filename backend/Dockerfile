FROM node:12.6-alpine

RUN apk add --no-cache git

VOLUME /home/node/backend
VOLUME /home/node/backend/node_modules

WORKDIR /home/node/backend

# Start app
CMD npm install && npm run docker-dev
