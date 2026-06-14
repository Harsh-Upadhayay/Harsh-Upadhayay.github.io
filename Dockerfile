FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY v1.html /usr/share/nginx/html/v1.html
COPY v2.html /usr/share/nginx/html/v2.html
COPY v3.html /usr/share/nginx/html/v3.html
COPY v4.html /usr/share/nginx/html/v4.html
COPY v5.html /usr/share/nginx/html/v5.html
COPY v6.html /usr/share/nginx/html/v6.html
COPY v7.html /usr/share/nginx/html/v7.html
COPY v8.html /usr/share/nginx/html/v8.html
COPY v9.html /usr/share/nginx/html/v9.html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health >/dev/null 2>&1 || exit 1
