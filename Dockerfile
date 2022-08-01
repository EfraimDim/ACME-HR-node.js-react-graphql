FROM node:14.17.3

WORKDIR /app/frontend

COPY ["./frontend/package.json", "./frontend/yarn.lock", "./"]

RUN yarn install

WORKDIR /app/backend

COPY ["./backend/package.json", "./backend/package-lock.json", "./"]

RUN npm install

WORKDIR /app

COPY . .

EXPOSE 5000

WORKDIR /app/frontend

CMD ["yarn", "start"]
