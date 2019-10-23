FROM node:10.16-alpine AS front-builder
WORKDIR /opt/front
ADD ./tsconfig.app.json /opt/front
ADD ./tsconfig.json /opt/front
ADD ./package.json /opt/front
ADD ./angular.json /opt/front
ADD ./src /opt/front/src
RUN npm install
RUN npm run build

FROM nginx:1.13-alpine
RUN mkdir -p /var/www/frontend
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./docker/entrypoint.sh /opt/entrypoint.sh
COPY --from=front-builder /opt/front/dist /var/www/frontend
ENTRYPOINT /opt/entrypoint.sh
EXPOSE 80
