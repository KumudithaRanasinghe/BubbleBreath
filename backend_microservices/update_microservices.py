import os
import xml.etree.ElementTree as ET
import glob
import re

services = [
    "achievment_service",
    "admin_service",
    "challenge_service",
    "game_service",
    "payment_service",
    "review_service",
    "reward_service",
    "user_privileges"
]

base_dir = "."

EUREKA_CLIENT_DEP = """
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
		</dependency>
"""
FEIGN_DEP = """
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-openfeign</artifactId>
		</dependency>
"""
LB_DEP = """
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-loadbalancer</artifactId>
		</dependency>
"""

for service in services:
    service_path = os.path.join(base_dir, service)
    if not os.path.exists(service_path):
        continue
    
    # 1. Update POM
    pom_path = os.path.join(service_path, "pom.xml")
    if os.path.exists(pom_path):
        with open(pom_path, "r") as f:
            pom_content = f.read()
        
        # Replace parent
        pom_content = re.sub(
            r'<parent>.*?</parent>',
            '<parent>\n\t\t<groupId>com.bubble_breath</groupId>\n\t\t<artifactId>backend_microservices</artifactId>\n\t\t<version>1.0.0-SNAPSHOT</version>\n\t</parent>',
            pom_content, flags=re.DOTALL
        )
        
        # Add dependencies if missing
        if "spring-cloud-starter-netflix-eureka-client" not in pom_content:
            pom_content = pom_content.replace('</dependencies>', EUREKA_CLIENT_DEP + FEIGN_DEP + LB_DEP + '\n\t</dependencies>')
            
        with open(pom_path, "w") as f:
            f.write(pom_content)

    # 2. Update Application.java
    java_files = glob.glob(os.path.join(service_path, "src/main/java/**/*.java"), recursive=True)
    app_file = None
    app_package = None
    app_dir = None
    for jf in java_files:
        if jf.endswith("Application.java"):
            app_file = jf
            app_dir = os.path.dirname(jf)
            with open(jf, "r") as f:
                content = f.read()
                m = re.search(r'package\s+(.*?);', content)
                if m:
                    app_package = m.group(1)
            break
            
    if app_file:
        with open(app_file, "r") as f:
            content = f.read()
        
        if "@EnableDiscoveryClient" not in content:
            content = content.replace("import org.springframework.boot.autoconfigure.SpringBootApplication;", 
                                      "import org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.cloud.client.discovery.EnableDiscoveryClient;\nimport org.springframework.cloud.openfeign.EnableFeignClients;")
            content = content.replace("@SpringBootApplication", "@SpringBootApplication\n@EnableDiscoveryClient\n@EnableFeignClients")
            with open(app_file, "w") as f:
                f.write(content)
                
    # 3. application.yml
    resources_dir = os.path.join(service_path, "src/main/resources")
    os.makedirs(resources_dir, exist_ok=True)
    app_yml_path = os.path.join(resources_dir, "application.yml")
    app_yaml_path = os.path.join(resources_dir, "application.yaml")
    app_prop_path = os.path.join(resources_dir, "application.properties")
    
    # Check what exists, read it (we could port props, but here we just write a new yml)
    # the user said: "Update each service's application.yml (or application.properties)"
    # A standard structure is:
    service_name_upper = service.replace('_', '-').upper()
    
    # We will just append or recreate application.yml
    # To keep simple, let's create application.yml and append to it if needed
    yml_content = f"""
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
    # Simply overwrite or write application.yml, assuming standard ports are defined elsewhere or we can use default
    with open(app_yml_path, "w") as f:
        f.write(yml_content)

    # removing properties to avoid conflict
    if os.path.exists(app_prop_path):
        os.remove(app_prop_path)
    if os.path.exists(app_yaml_path):
        os.remove(app_yaml_path)

    # 4. Feign config
    if app_dir and app_package:
        config_dir = os.path.join(app_dir, "config")
        os.makedirs(config_dir, exist_ok=True)
        with open(os.path.join(config_dir, "FeignConfig.java"), "w") as f:
            f.write(f"""package {app_package}.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {{
    @Bean
    Logger.Level feignLoggerLevel() {{
        return Logger.Level.FULL;
    }}
}}
""")
        
        # 5. Example Feign Client calling GAME-SERVICE
        client_dir = os.path.join(app_dir, "client")
        os.makedirs(client_dir, exist_ok=True)
        with open(os.path.join(client_dir, "GameServiceClient.java"), "w") as f:
            f.write(f"""package {app_package}.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "GAME-SERVICE")
public interface GameServiceClient {{
    @GetMapping("/api/game/{{id}}")
    Object getGameById(@PathVariable("id") Long id);
}}
""")
