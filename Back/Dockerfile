FROM node:alpine

RUN mkdir -p /var/punch
WORKDIR /var/punch

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn compile

CMD [ "start" ]
ENTRYPOINT [ "yarn" ]