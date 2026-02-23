import os
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

for service in services:
    pom_path = os.path.join(base_dir, service, "pom.xml")
    if os.path.exists(pom_path):
        with open(pom_path, "r") as f:
            content = f.read()

        # Remove entire maven-compiler-plugin block
        content = re.sub(
            r'<plugin>\s*<groupId>org\.apache\.maven\.plugins</groupId>\s*<artifactId>maven-compiler-plugin</artifactId>.*?</plugin>',
            '',
            content,
            flags=re.DOTALL
        )
        with open(pom_path, "w") as f:
            f.write(content)
