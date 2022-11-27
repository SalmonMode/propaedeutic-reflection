FROM node:alpine
WORKDIR /usr/propaedeutic-reflection
COPY package.json .
RUN npm install
COPY . .
RUN tsc
CMD ["node", "./dist/server.js"]
