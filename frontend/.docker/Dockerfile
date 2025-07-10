FROM nginx:1.25.5

COPY app-dist /usr/share/nginx/html
COPY .docker/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html