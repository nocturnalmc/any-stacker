# pull the Node.js Docker image
FROM node:lts-alpine

# update the package index
RUN apk update
RUN apk add --no-cache tzdata
RUN apk add --no-cache nano

# set timezone data
ENV TZ=Asia/Kuala_Lumpur

# create app directory
WORKDIR /usr/src/app

# bundle app source
COPY . .

# install node_modules
RUN npm run install-prod

# build client React JS
RUN npm run build-client

# prune image for production
RUN npm run prune-prod

# app run on port 5005
EXPOSE 5005

# run the server
CMD ["npm", "start"]
