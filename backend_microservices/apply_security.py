import os
import re
import glob
import shutil

services = [
    "achievment_service",
    "challenge_service",
    "payment_service",
    "review_service",
    "reward_service",
    "user_privileges"
]

base_dir = "."

JJWT_DEPS = """
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-api</artifactId>
			<version>0.11.5</version>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-impl</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-jackson</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
"""

# Base files from game_service
GAME_SERVICE_CONFIG_DIR = os.path.join(base_dir, "game_service/src/main/java/com/bubble_breath/game_service/configuration")

for service in services:
    service_path = os.path.join(base_dir, service)
    if not os.path.exists(service_path):
        continue
    
    # 1. Update POM
    pom_path = os.path.join(service_path, "pom.xml")
    if os.path.exists(pom_path):
        with open(pom_path, "r") as f:
            pom_content = f.read()
        
        # Add dependencies if missing
        if "spring-boot-starter-security" not in pom_content:
            pom_content = pom_content.replace('</dependencies>', JJWT_DEPS + '\n\t</dependencies>')
        elif "jjwt-api" not in pom_content: # has security but no jjwt
            JJWT_ONLY = JJWT_DEPS.replace('''		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>''', '')
            pom_content = pom_content.replace('</dependencies>', JJWT_ONLY + '\n\t</dependencies>')
            
        with open(pom_path, "w") as f:
            f.write(pom_content)

    # 2. Add Security Config
    java_files = glob.glob(os.path.join(service_path, "src/main/java/**/*.java"), recursive=True)
    app_package = None
    app_dir = None
    for jf in java_files:
        if jf.endswith("Application.java"):
            app_dir = os.path.dirname(jf)
            with open(jf, "r") as f:
                content = f.read()
                m = re.search(r'package\s+(.*?);', content)
                if m:
                    app_package = m.group(1)
            break
            
    if app_dir and app_package:
        config_dir = os.path.join(app_dir, "configuration")
        os.makedirs(config_dir, exist_ok=True)
        
        # Read game_service config
        files_to_copy = ["JwtService.java", "JwtAuthenticationFilter.java", "SecurityConfig.java"]
        for fname in files_to_copy:
            src = os.path.join(GAME_SERVICE_CONFIG_DIR, fname)
            if not os.path.exists(src):
                print(f"Warning: {src} not found")
                continue
                
            dest = os.path.join(config_dir, fname)
            with open(src, "r") as f:
                content = f.read()
                
            # Replace package
            content = content.replace("package com.bubble_breath.game_service.configuration;", f"package {app_package}.configuration;")
            
            # For SecurityConfig, we might need a basic structure that denies all by default, or replicates game_service
            if fname == "SecurityConfig.java":
                # replace `/api/Game` with the current service base path maybe?
                # Actually, the user's `game_service` SecurityConfig has specific logic.
                # Let's generalize it: /api/xxx/** matches the folder name 
                # Service folder name generally correlates: e.g. review_service -> /api/Review
                # "game_service" -> "/api/Game"
                # "review_service" -> "/api/Review"
                # "achievment_service" -> "/api/Achievment"
                api_name = ""
                parts = service.split("_")
                if len(parts) > 0:
                    api_name = parts[0].capitalize()
                    
                content = content.replace('"/api/Game"', f'"/api/{api_name}"')
                content = content.replace('"/api/Game/**"', f'"/api/{api_name}/**"')
                # Since we don't know the exact endpoints, let's just make it a blanket rule or 
                # keep the structure matching /api/ServiceName. We will replace "/api/Category" too...
                content = content.replace('"/api/Category/**", "/api/Category"', '""')
                content = content.replace('"/api/Category"', '""')
                
            with open(dest, "w") as f:
                f.write(content)
