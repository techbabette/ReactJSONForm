FROM node:20-alpine AS build

COPY package.json /var/www/html/
COPY package-lock.json /var/www/html/
WORKDIR /var/www/html
RUN yarn install

COPY . /var/www/html/
RUN yarn run build

FROM nginx:stable-alpine3.20-perl
COPY entrypoint.sh /usr/entrypoint.sh
RUN chmod +x /usr/entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.template.conf
COPY --from=build /var/www/html/dist /var/www/html

ENTRYPOINT ["/usr/entrypoint.sh"]