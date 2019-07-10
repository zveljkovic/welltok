#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER welltok_test WITH PASSWORD 'welltok_test';
	CREATE DATABASE welltok_test;
	GRANT ALL PRIVILEGES ON DATABASE welltok_test TO welltok_test;
EOSQL
