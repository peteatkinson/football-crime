
# ------------ Dockerfile for containizing the Node.js API ------------------------ 
# * node:14.15.4-slim used for building application dependencies
# * gcr.io/distroless/nodejs:10 https://github.com/GoogleContainerTools/distroless/ used for running the application using a distroless Linux run-time image
# ---------------------------------------------------------------------------------

FROM node:14.15.4-slim as builder

# set NODE_ENV to production before production depndencies installed
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# perform an npm install to install production dependencies (dev dependencies excluded)
USER 0
RUN npm ci --production

USER 1000

# copy over the required files to run the application (node_modules not bundled)
COPY node_modules/ node_modules/
COPY build/ build/

# required the distroless Liux-based Node.js-based run-time image.  
FROM gcr.io/distroless/nodejs:10

USER 1000

# copy over from the builder stage into the final application directory
COPY --from=builder /app /app
WORKDIR /app

# start the application (distro-less image running node as entry-point, path to entry-point .js file only required)
CMD ["build/server.js"]
