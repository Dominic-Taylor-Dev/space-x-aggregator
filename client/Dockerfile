# This code is significantly borrowed from Sid Palas Docker course: https://github.com/sidpalas/devops-directive-docker-course/blob/9ff3c7225ae8fc2b7f4efb5a1914ee645661a053/06-building-container-images/api-node/Dockerfile.9
# It also takes some content from: https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f

# Pin specific version for stability
# Use slim for reduced image size
FROM node:18.16-alpine AS base

# Specify working directory other than /
WORKDIR /usr/src/client

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as production-preview

ENV NODE_PATH=./dist

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]