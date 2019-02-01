FROM node:alpine

COPY . .
COPY package.json .
RUN yarn && yarn compile
# RUN yarn init
CMD ["start"]
WORKDIR /var/punch
ENTRYPOINT [ "yarn" ]