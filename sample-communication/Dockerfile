FROM node:16-alpine as preparation

WORKDIR /app
COPY ./package.json .

# Create temporary package.json where version is set to 0.0.0
# – this way the cache of the build step won't be invalidated
# if only the version changed.

RUN ["node", "-e", "\
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));\
fs.writeFileSync('package.json', JSON.stringify({ ...pkg, version: '0.0.0' }));\
"]

FROM node:16-alpine as builder

WORKDIR /app
COPY --from=preparation /app/package.json  .
COPY ./yarn.lock .
RUN yarn
COPY . .

ENV NODE_ENV production
RUN yarn build 
RUN yarn

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/dist  .
COPY --from=builder /app/package.json ./
RUN apk --no-cache add curl

USER node
EXPOSE 3000
CMD ["node", "main"]