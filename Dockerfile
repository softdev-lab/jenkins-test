FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 5000
CMD ["node", "app.js"]
