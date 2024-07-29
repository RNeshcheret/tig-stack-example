# TIG Stack Example + NodeJs, MongoDb, ES

![Example Screenshot](./tig-grafana-1.png?raw=true "Example Screenshot")

## Start the stack with docker compose

```bash
$ docker-compose -p tig up --build -d
```

## Services and Ports

### Grafana

- URL: http://localhost:30001
- User: admin
- Password: admin

### App api

- Port: 4000
- endpoints (db, search)

## Load test with AB tool

make requests to DB

```bash
ab -n 10000 -c 100 http://localhost/db
```

make requests to ES

```bash
ab -n 10000 -c 100 http://localhost/search
```
