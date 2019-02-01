FROM node:alpine

WORKDIR /var/punch

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn compile

CMD [ "start" ]
ENTRYPOINT [ "yarn" ]