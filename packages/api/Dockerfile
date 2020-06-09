### BASE ###
FROM node:12-buster-slim AS base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /app

### BUILDER ###
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./
COPY configs/tsconfig-base.json ./configs/
COPY packages/api/*.json ./packages/api/

RUN yarn install --production --pure-lockfile --ignore-scripts
RUN cp -RL packages/api/node_modules/ /tmp/node_modules/

# Install all dependencies
RUN yarn install --pure-lockfile --ignore-scripts

# Copy source files
COPY packages/api/ ./packages/api/

# Build
RUN yarn --cwd ./packages/api/ generate
RUN yarn --cwd ./packages/api/ build

### RUNNER ###
FROM base

# Copy runtime dependencies
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/packages/api/node_modules/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=builder /app/packages/api/node_modules/.prisma/client/ ./node_modules/.prisma/client/

# Copy runtime project
COPY --from=builder /app/packages/api/dist/src/ ./src/
COPY packages/api/scripts/ ./scripts/
COPY packages/api/*.json ./

# Allow node user to create config
RUN mkdir -p ./configs
RUN chown node ./configs

USER node

CMD ["yarn", "start:prod"]