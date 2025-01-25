# Production Dockerfile - optimized for size
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

FROM alpine:3.19
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
ENV NODE_ENV=production
ARG BUILD_DATE
ARG GIT_SHA
RUN echo '{"date":"'${BUILD_DATE}'","gitSha":"'${GIT_SHA}'"}' > /app/build-info.json
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.revision="${GIT_SHA}"
EXPOSE 8181
CMD ["node", "src/index.js"] 