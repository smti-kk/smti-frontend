FROM node:10.16 AS front-builder

ADD ./.ssh /root/.ssh
RUN chmod 700 /root/.ssh; chown -R root:root /root/.ssh; ls -alh /root/.ssh; eval $(ssh-agent); ssh-add /root/.ssh/id_rsa; git ls-remote -h -t ssh://git@git.cifra-k.ru:1022/dev/frontend-codestyle.git

WORKDIR /opt/front
ADD ./tsconfig.app.json /opt/front
ADD ./tsconfig.json /opt/front
ADD ./package.json /opt/front
ADD ./angular.json /opt/front
ADD ./src /opt/front/src
RUN npm install
RUN npm run build

FROM nginx:1.13-alpine
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=front-builder /opt/front/dist /var/www
EXPOSE 80
