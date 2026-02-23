FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
# We run from root context so we copy everything to build the reactor
COPY pom.xml .
COPY discovery-server ./discovery-server
COPY api-gateway ./api-gateway
COPY achievment_service ./achievment_service
COPY admin_service ./admin_service
COPY challenge_service ./challenge_service
COPY game_service ./game_service
COPY payment_service ./payment_service
COPY review_service ./review_service
COPY reward_service ./reward_service
COPY user_privileges ./user_privileges

RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests -pl review_service -am --batch-mode -Dmaven.wagon.http.pool=false

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
WORKDIR /app
COPY --from=builder /app/review_service/target/*.jar app.jar
EXPOSE 8087
HEALTHCHECK --interval=30s --timeout=10s --retries=5 CMD wget -qO- http://localhost:8087/actuator/health | grep UP || exit 1
CMD ["java", "-jar", "app.jar"]
