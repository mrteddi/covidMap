FROM node:latest
WORKDIR /usr/src/covidMap

COPY . .
RUN npm install --silent

EXPOSE 5000
CMD ["npm", "start"]