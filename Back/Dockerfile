FROM node:alpine

COPY . .
RUN yarn && yarn compile
# RUN yarn init
CMD ["start"]
WORKDIR /var/punch
ENTRYPOINT [ "yarn" ]