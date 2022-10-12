Exmaple Nestjs MicroService with k8s via TCP socket

How to start project

build local image first

```
docker build -t local-nest-backend sample-backend

docker build -t local-nest-analytics sample-analytics

docker build -t local-nest-communication sample-communication
```

start service & load balancer

```
kubectl apply -f k8s
```