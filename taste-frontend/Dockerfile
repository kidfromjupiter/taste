FROM node:22-alpine3.19
# setting the build variables properly
ARG NEXT_PUBLIC_API_BASEURL
ENV NEXT_PUBLIC_API_BASEURL $NEXT_PUBLIC_API_BASEURL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 5000
CMD ["npm","start"]
