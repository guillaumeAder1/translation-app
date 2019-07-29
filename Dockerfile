FROM node:6.11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN yarn

# Bundle app source
COPY . .

EXPOSE 3000 5000