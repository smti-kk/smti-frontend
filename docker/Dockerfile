FROM node:8 AS front-builder
WORKDIR /opt/front
ADD ./package.json /opt/front
# ADD ./package-lock.json /opt/front
RUN npm install
# ADD ./tsconfig.json /opt/front
# ADD ./tslint.json /opt/front
# ADD ./.angular-cli.json /opt/front
ADD ./src /opt/front/src
RUN npm run build

FROM nginx:1.13-alpine
RUN mkdir -p /var/www/frontend
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./docker/entrypoint.sh /opt/entrypoint.sh
COPY --from=front-builder /opt/front/dist /var/www/frontend
ENTRYPOINT /opt/entrypoint.sh
EXPOSE 80
