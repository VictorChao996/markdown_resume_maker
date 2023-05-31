FROM node:18-bullseye-slim as build

# 在 contaianer 中創建 backend directory
WORKDIR /backend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Bundle app source
COPY . .

# 開啟 container 的 port 3000 for node app
EXPOSE 3003

CMD ["node", "index.js"]
