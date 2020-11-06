FROM node:latest
WORKDIR /usr/src/covidMap

COPY . .
RUN npm install --silent

EXPOSE 3000
CMD ["npm", "start"]