FROM node:18

WORKDIR /app

COPY package*.json ./

ENV HOST=0.0.0.0
ENV PORT=3000

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
