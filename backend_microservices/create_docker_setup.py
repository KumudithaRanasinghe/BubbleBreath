import os

port_map = {
    "discovery-server": 8761,
    "api-gateway": 8080,
    "game_service": 8081,
    "reward_service": 8082,
    "challenge_service": 8083,
    "achievment_service": 8084,
    "admin_service": 8085,
    "payment_service": 8086,
    "review_service": 8087,
    "user_privileges": 8088
}

db_required = [
    "game_service", "reward_service", "challenge_service", 
    "achievment_service", "admin_service", "payment_service", 
    "review_service", "user_privileges"
]

# 1. Create init.sql for MySQL
with open("init.sql", "w") as f:
    for svc in db_required:
        db_name = svc.replace("-", "_") + "_db"
        f.write(f"CREATE DATABASE IF NOT EXISTS {db_name};\n")

# 2. Generate Dockerfiles
for svc, port in port_map.items():
    dockerfile_content = f"""FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
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

RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests -pl {svc} -am --batch-mode -Dmaven.wagon.http.pool=false

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
WORKDIR /app
COPY --from=builder /app/{svc}/target/*.jar app.jar
EXPOSE {port}
HEALTHCHECK --interval=30s --timeout=10s --retries=5 CMD wget -qO- http://localhost:{port}/actuator/health | grep UP || exit 1
CMD ["java", "-jar", "app.jar"]
"""
    with open(os.path.join(svc, "Dockerfile"), "w") as f:
        f.write(dockerfile_content)

# 3. Generate docker-compose.yml
compose_services = []

# Add MySQL
compose_services.append("""  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "3307:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "127.0.0.1", "-proot"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - microservices-net""")

# Add RabbitMQ
compose_services.append("""  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "check_running"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - microservices-net""")

# Add Microservices
for svc, port in port_map.items():
    env_vars = [
        f"EUREKA_USERNAME=${{EUREKA_USERNAME}}",
        f"EUREKA_PASSWORD=${{EUREKA_PASSWORD}}",
        f"EUREKA_HOST=${{EUREKA_HOST}}",
        f"INSTANCE_IP={svc}",
        "SPRING_PROFILES_ACTIVE=docker"
    ]
    
    if svc != "discovery-server":
        env_vars.append("SPRING_RABBITMQ_HOST=rabbitmq")
        
    if svc in db_required:
        db_name = svc.replace("-", "_") + "_db"
        env_vars.append(f"SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/{db_name}?createDatabaseIfNotExist=true")
        env_vars.append("SPRING_DATASOURCE_USERNAME=root")
        env_vars.append("SPRING_DATASOURCE_PASSWORD=root")
        env_vars.append("SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver")

    env_block = "\n".join([f"      - {v}" for v in env_vars])

    depends = []
    if svc != "discovery-server":
        depends.append("discovery-server")
    if svc in db_required:
        depends.append("mysql")
    if svc != "discovery-server":
        depends.append("rabbitmq")

    depends_block = ""
    if depends:
        depends_block = "\n    depends_on:"
        for dep in depends:
            depends_block += f"\n      {dep}:\n        condition: service_healthy"

    compose_services.append(f"""  {svc}:
    build:
      context: .
      dockerfile: {svc}/Dockerfile
      network: host
    container_name: {svc}
    ports:
      - "{port}:{port}"
    environment:
{env_block}{depends_block}
    networks:
      - microservices-net""")

compose_content = f"""version: '3.8'

services:

{chr(10).join(compose_services)}

networks:
  microservices-net:
    driver: bridge

volumes:
  mysql_data:
"""

with open("docker-compose.yml", "w") as f:
    f.write(compose_content)

# 4. Generate .env files
env_content = """EUREKA_USERNAME=eureka
EUREKA_PASSWORD=eureka123
EUREKA_HOST=discovery-server
INSTANCE_IP=localhost
"""
with open(".env.example", "w") as f:
    f.write(env_content)
with open(".env", "w") as f:
    f.write(env_content)
