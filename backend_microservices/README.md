# BubbleBreath Microservices Architecture

This project is a fully-fledged Spring Boot microservices ecosystem featuring Service Discovery (Eureka), an API Gateway (Spring Cloud Gateway), and multi-stage Docker builds.

## Architecture Overview

```text
       [  Frontend / Client  ]
                 |
                 v
   +---------------------------+
   |       API Gateway         |  (Port: 8080)
   |       (api-gateway)       |
   +-------------+-------------+
                 |
                 | (Load Balanced HTTP Requests via OpenFeign)
                 v
   +---------------------------+
   |     Service Registry      |  (Port: 8761)
   |    (discovery-server)     |
   +-------------+-------------+
                 |
      Register / Fetch Registry
                 |
   +-------------+-------------+
   |      Microservices        |
   |   (achievment, admin,     |
   |   challenge, game,        |
   |   payment, review,        |
   |   reward, user-privileges)|
   +---------------------------+
```
All microservices register themselves dynamically on startup. The API Gateway forwards traffic securely behind the scenes without revealing the actual microservice ports/IPs.

## How Service Discovery Works

1. **Discovery Server Starts**: Eureka runs on port `8761`.
2. **Registration**: Each microservice runs and sends its IP + Port + Service Name to Eureka.
3. **Gateway Routing**: API Gateway fetches this list from Eureka every 5 seconds.
4. **Resolution**: When a request hits `/api/game/**`, the Gateway looks up `GAME-SERVICE` in the registry.
5. **Load Balancing**: The Gateway picks an instance dynamically and forwards the request via its `lb://` URI prefix.

## Environment Variables Reference

| Variable Name | Default Value | Description |
|---|---|---|
| `EUREKA_USERNAME` | `eureka` | Basic Auth username for Gateway to talk to Eureka. |
| `EUREKA_PASSWORD` | `eureka123` | Basic Auth password. |
| `EUREKA_HOST` | `localhost` | Hostname of the Eureka server (changes in Docker). |
| `INSTANCE_IP` | `localhost` | The IP to bind the microservice instance id. |

## How to Run Locally (without Docker)

1. Navigate to `discovery-server` and run `mvn spring-boot:run`. Wait for it to start.
2. Navigate to your desired backend service (e.g. `game_service`) and start it (`mvn spring-boot:run`).
3. Start the `api-gateway` (`mvn spring-boot:run`).
4. Open the Eureka dashboard at [http://localhost:8761](http://localhost:8761) (Login: `eureka` / `eureka123`).
5. Test the gateway at `http://localhost:8080/api/game/...`.

## How to Run with Docker Compose

Compile and run the entire ecosystem with Docker:

```bash
docker-compose up --build
```
*Note: Docker handles startup order automatically (`depends_on: discovery-server`). Wait about 30 seconds for all services to connect.*

## API Routes Reference

| Gateway Path | Target Service | Forwarded Route |
|---|---|---|
| `/api/achievment/**` | `ACHIEVMENT-SERVICE` (8084) | `/` (Strips `/api/achievment`) |
| `/api/admin/**` | `ADMIN-SERVICE` (8085) | `/` |
| `/api/challenge/**` | `CHALLENGE-SERVICE` (8083) | `/` |
| `/api/game/**` | `GAME-SERVICE` (8081) | `/` |
| `/api/payment/**` | `PAYMENT-SERVICE` (8086) | `/` |
| `/api/review/**` | `REVIEW-SERVICE` (8087) | `/` |
| `/api/reward/**` | `REWARD-SERVICE` (8082) | `/` |
| `/api/user-privileges/**` | `USER-PRIVILEGES` (8088) | `/` |

## How to Add a New Microservice

[ ] Ensure the service `pom.xml` inherits from `backend_microservices` parent POM.
[ ] Add Eureka, Feign, and LoadBalancer dependencies.
[ ] Add `@EnableDiscoveryClient` and `@EnableFeignClients` to the main class.
[ ] Add `application.yml` with Eureka properties (see other services).
[ ] Update `GatewayConfig.java` in `api-gateway` to define a route for the new service.
[ ] Update `docker-compose.yml` to reflect new container limits/ports.

## Monitoring Endpoints

- **Eureka Registry**: [http://localhost:8761](http://localhost:8761)
- **Gateway Health Overview**: [http://localhost:8080/health](http://localhost:8080/health)
- **Registered Microservices Raw JSON**: [http://localhost:8080/registry](http://localhost:8080/registry)
- **Gateway Routes**: [http://localhost:8080/actuator/gateway/routes](http://localhost:8080/actuator/gateway/routes)
- **Individual Service Health**: `http://localhost:{port}/actuator/health`

## Completion Checklist

✅ Files created (discovery-server, api-gateway modules).
✅ Dependencies distributed into child POMs (`eureka-client`, `openfeign`, `loadbalancer`).
✅ Environment variables abstracted into `.env.example`.
✅ Startup order and lifecycle managed by `docker-compose.yml` and `depends_on`.
✅ Configured Health metrics in gateway natively checking Eureka's registry map.
