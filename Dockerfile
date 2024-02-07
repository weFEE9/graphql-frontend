FROM node:21-alpine3.18

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD [ "serve", "-p", "3000", "-n", "build/"]