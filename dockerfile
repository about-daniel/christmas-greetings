FROM node:18-alpine

WORKDIR /app

COPY ./dist /app

EXPOSE 3000

CMD ["npm", "run", "dev"]