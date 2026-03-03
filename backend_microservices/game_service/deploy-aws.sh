#!/bin/bash

# Game Service Deployment Script for AWS EC2
# This script sets up the Game Service on an AWS EC2 instance

set -e

echo "========================================="
echo "Game Service AWS Deployment Script"
echo "========================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}Please don't run this script as root${NC}"
    exit 1
fi

# Detect package manager
if command -v apt-get &> /dev/null; then
    PKG_MANAGER="apt"
elif command -v yum &> /dev/null; then
    PKG_MANAGER="yum"
else
    echo -e "${RED}Unsupported OS: neither apt nor yum found${NC}"
    exit 1
fi
echo -e "${GREEN}Detected package manager: $PKG_MANAGER${NC}"

# 1. Update system
echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
if [ "$PKG_MANAGER" = "apt" ]; then
    sudo apt-get update -y
else
    sudo yum update -y
fi

# 2. Install Docker
echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}Docker already installed${NC}"
else
    if [ "$PKG_MANAGER" = "apt" ]; then
        sudo apt-get install -y docker.io
    else
        sudo yum install -y docker
    fi
fi

# 3. Start Docker service
echo -e "${YELLOW}Step 3: Starting Docker service...${NC}"
sudo systemctl start docker
sudo systemctl enable docker

# 4. Add user to docker group
echo -e "${YELLOW}Step 4: Adding user to docker group...${NC}"
sudo usermod -a -G docker $USER

# 5. Install Docker Compose
echo -e "${YELLOW}Step 5: Installing Docker Compose...${NC}"
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo -e "${GREEN}Docker Compose already installed${NC}"
else
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 6. Create app directory
echo -e "${YELLOW}Step 6: Creating application directory...${NC}"
mkdir -p ~/game-service
cd ~/game-service

# 7. Configure AWS ECR login
echo -e "${YELLOW}Step 7: Configuring AWS ECR login...${NC}"
read -p "Enter your AWS region (default: us-east-1): " AWS_REGION
AWS_REGION=${AWS_REGION:-us-east-1}

read -p "Enter your AWS Account ID: " AWS_ACCOUNT_ID

aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# 8. Create .env file
echo -e "${YELLOW}Step 8: Creating environment configuration...${NC}"
cat > .env << EOF
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/game_service?createDatabaseIfNotExist=true
SPRING_DATASOURCE_USERNAME=kumuditha
SPRING_DATASOURCE_PASSWORD=kumuditha1234
SERVER_PORT=8003
SPRING_JPA_HIBERNATE_DDL_AUTO=update
LOG_LEVEL=INFO
EOF

# 9. Create docker-compose file for AWS
echo -e "${YELLOW}Step 9: Creating docker-compose configuration...${NC}"
cat > docker-compose.yml << EOF
services:
  mysql:
    image: mysql:8.0
    container_name: game-service-mysql
    environment:
      MYSQL_ROOT_PASSWORD: kumuditha1234
      MYSQL_DATABASE: game_service
      MYSQL_USER: kumuditha
      MYSQL_PASSWORD: kumuditha1234
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - bubble-breath-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  game-service:
    image: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/bubble-breath-game-service:latest
    container_name: game-service-app
    env_file: .env
    ports:
      - "8003:8003"
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - bubble-breath-network
    restart: always
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8003/api/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  mysql_data:
    driver: local

networks:
  bubble-breath-network:
    driver: bridge
EOF

# 10. Clean up old containers if they exist
echo -e "${YELLOW}Step 10: Cleaning up old containers...${NC}"
docker compose down 2>/dev/null || true
docker rm -f game-service game-service-app game-service-mysql game-service-mysql-db 2>/dev/null || true

# 11. Start services
echo -e "${YELLOW}Step 11: Starting services...${NC}"
docker compose up -d

# 12. Wait for service to start
echo -e "${YELLOW}Step 12: Waiting for services to start...${NC}"
sleep 30

# 13. Check service status
echo -e "${YELLOW}Step 13: Checking service status...${NC}"
if curl -f http://localhost:8003/api/actuator/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Game Service is running successfully!${NC}"
    echo -e "${GREEN}✓ API available at: http://localhost:8003/api${NC}"
    echo -e "${GREEN}✓ Swagger UI: http://localhost:8003/api/swagger-ui.html${NC}"
else
    echo -e "${RED}✗ Game Service failed to start${NC}"
    echo "Checking logs:"
    docker compose logs game-service 2>/dev/null || docker compose logs
    exit 1
fi

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"

