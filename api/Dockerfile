# Stage 1
FROM node:12.13.0-alpine as buildStage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build


# Stage 2
FROM node:12.13.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=buildStage /app/dist ./
COPY ormconfig.js ./
COPY .env ./

EXPOSE 4000

CMD [ "node", "index.js" ]