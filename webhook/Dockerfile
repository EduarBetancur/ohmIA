FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY index.js calculator.js ./

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]
