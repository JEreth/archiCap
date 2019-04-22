FROM nginx:1.13.3-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY dist/archicap .

CMD ["nginx", "-g", "daemon off;"]
