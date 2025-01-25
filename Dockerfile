FROM node:20-alpine
WORKDIR /app
ENV PATH /usr/local/bin:$PATH
COPY package*.json ./
RUN npm ci

COPY src ./src
ENV NODE_ENV=production
ARG BUILD_DATE
ARG GIT_SHA
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${GIT_SHA}"
EXPOSE 8181
CMD ["node", "src/index.js"] 