FROM node:18

WORKDIR /app

COPY package.json .

COPY yarn.lock .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
  then npx yarn; \
  else npx yarn --production; \
  fi

COPY . .

ENV PORT 8000

EXPOSE $PORT

CMD ["npx", "yarn", "dev"]