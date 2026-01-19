#!/bin/bash
set -e

# Escape dots in the IP for regex
ESCAPED_IP=$(echo "${ALLOWED_IP}" | sed 's/\./\\./g')

# Substitute in nginx config
sed -i "s|ALLOWED_IP_PLACEHOLDER|${ESCAPED_IP}|g" /etc/nginx/nginx.conf

# Start nginx
exec "$@"
