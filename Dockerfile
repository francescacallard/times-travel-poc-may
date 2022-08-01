FROM node:16-alpine

WORKDIR /usr/src/app

# Copy everything to Workdir
COPY . .

# Install dev dependencies
RUN yarn --frozen-lockfile
# Build dist folder with Typescript
RUN yarn build

# Re-install only with production dependencies
ENV NODE_ENV=production
RUN yarn --frozen-lockfile

# Remove unneeded source folder
RUN rm -rf src/

CMD ["yarn", "start"]