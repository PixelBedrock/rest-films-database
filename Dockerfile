FROM node
EXPOSE 3000
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD ["node", "."]
