FROM node:16-alpine3.14

LABEL maintainer="Kiran Rajaram <kiranrajaram@outlook.com>"

RUN mkdir /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

COPY . .

EXPOSE 7000