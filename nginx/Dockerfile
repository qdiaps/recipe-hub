FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./frontend /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]