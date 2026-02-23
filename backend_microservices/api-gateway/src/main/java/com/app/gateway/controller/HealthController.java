package com.app.gateway.controller;

import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HealthController {

    @Autowired
    @Lazy
    private EurekaClient eurekaClient;

    private static final String[] SERVICES = {
        "ACHIEVMENT-SERVICE",
        "ADMIN-SERVICE",
        "CHALLENGE-SERVICE",
        "GAME-SERVICE",
        "PAYMENT-SERVICE",
        "REVIEW-SERVICE",
        "REWARD-SERVICE",
        "USER-PRIVILEGES"
    };

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("gateway", "UP");
        response.put("timestamp", Instant.now().toString());

        Map<String, String> servicesStatus = new HashMap<>();
        for (String serviceName : SERVICES) {
            String status = "DOWN";
            try {
                Application application = eurekaClient.getApplication(serviceName);
                if (application != null && !application.getInstances().isEmpty()) {
                    status = "UP";
                }
            } catch (Exception e) {
                // Ignore exception and keep status as DOWN
            }
            servicesStatus.put(serviceName, status);
        }

        response.put("services", servicesStatus);
        return ResponseEntity.ok(response);
    }
}
