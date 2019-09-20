

FROM node:10

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

#test by ugi
#COPY index.html /usr/share/nginx/html

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

CMD npm run dev


EXPOSE 8083
