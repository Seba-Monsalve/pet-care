FROM node:alpine3.21 as base

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy &&  npx tsx watch ./index.ts"]
