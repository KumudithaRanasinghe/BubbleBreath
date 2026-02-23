import os

services_ports = {
    "game_service": 8081,
    "reward_service": 8082,
    "challenge_service": 8083,
    "achievment_service": 8084,
    "admin_service": 8085,
    "payment_service": 8086,
    "review_service": 8087,
    "user_privileges": 8088
}

base_dir = "."

for service, port in services_ports.items():
    service_path = os.path.join(base_dir, service)
    if not os.path.exists(service_path):
        continue
                
    # 3. application.yml
    resources_dir = os.path.join(service_path, "src/main/resources")
    os.makedirs(resources_dir, exist_ok=True)
    app_yml_path = os.path.join(resources_dir, "application.yml")
    
    service_name_upper = service.replace('_', '-').upper()
    
    yml_content = f"""server:
  port: {port}

spring:
  application:
    name: {service_name_upper}

eureka:
  client:
    service-url:
      defaultZone: http://${{EUREKA_USERNAME:eureka}}:${{EUREKA_PASSWORD:eureka123}}@${{EUREKA_HOST:localhost}}:8761/eureka/
    registry-fetch-interval-seconds: 5
  instance:
    prefer-ip-address: true
    ip-address: ${{INSTANCE_IP:localhost}}
    instance-id: ${{spring.application.name}}:${{spring.application.instance_id:${{random.value}}}}
    lease-renewal-interval-in-seconds: 10
    lease-expiration-duration-in-seconds: 30

management:
  endpoints:
    web:
      exposure:
        include: health, info
  endpoint:
    health:
      show-details: always
"""
    with open(app_yml_path, "w") as f:
        f.write(yml_content)
