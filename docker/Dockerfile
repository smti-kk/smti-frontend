FROM node:14.5 AS front-builder

WORKDIR /opt/front
ADD ./tsconfig.app.json /opt/front
ADD ./tsconfig.base.json /opt/front
ADD ./tsconfig.json /opt/front
ADD ./package.json /opt/front
ADD ./angular.json /opt/front
ADD ./src /opt/front/src
RUN npm install --no-package-lock
RUN npm run build

FROM nginx:1.13-alpine
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=front-builder /opt/front/dist /var/www
EXPOSE 80
