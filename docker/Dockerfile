FROM node:10.16-alpine AS front-builder
WORKDIR /opt/front
ADD ./tsconfig.app.json /opt/front
ADD ./tsconfig.json /opt/front
ADD ./package.json /opt/front
ADD ./angular.json /opt/front
ADD ./src /opt/front/src
RUN npm install
RUN npm run build

FROM harbor.cifra-k.ru/telecom_monitoring/backend:1.2.1 as back

FROM nginx:1.13-alpine
RUN mkdir -p /var/www/frontend
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=front-builder /opt/front/dist /var/www/frontend
COPY --from=back /opt/static_files /var/www/frontend/static
EXPOSE 80
