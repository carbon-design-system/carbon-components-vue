FROM docker.io/nginx:stable-alpine
ENV NGINX_PORT=8080
COPY storybook-static /usr/share/nginx/html
COPY ce/nginx-default-cfg/*.template /etc/nginx/templates/
