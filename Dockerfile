FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]