FROM postgres:10.6

RUN mkdir -p /docker-entrypoint-initdb.d
COPY  init.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init.sh
