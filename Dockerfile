FROM node:10

# the Docker Node image includes a non-root node user that you can
# use to avoid running your application container as root

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory of the application to /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

# Copy you application code to working application directory on the container:
COPY . .

# Copy the permissions from your application directory to the directory on the container
COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD [ "npm", "start" ]