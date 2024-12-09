#!/bin/sh

sed "s|\${BACKEND_API}|${BACKEND_API}|g" /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

nginx -g "daemon off;"

