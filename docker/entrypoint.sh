#!/bin/sh
INDEX=/var/www/frontend/index.html

if [[ ! -z $API_BASE_URL ]]; then
   CONFIG="{\"API_BASE_URL\": \"$API_BASE_URL\"}"
   sed -i -- "s/process.env={}/process.env=$CONFIG/g" $INDEX
fi

nginx -g "daemon off;"
