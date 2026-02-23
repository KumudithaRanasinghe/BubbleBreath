package com.app.gateway.controller;

import com.netflix.discovery.EurekaClient;
import com.netflix.discovery.shared.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class RegistrationController {

    @Autowired
    @Lazy
    private EurekaClient eurekaClient;

    @GetMapping("/registry")
    public ResponseEntity<Map<String, Object>> getRegistry() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> registeredServices = new ArrayList<>();

        if (eurekaClient.getApplications() != null) {
            for (Application app : eurekaClient.getApplications().getRegisteredApplications()) {
                Map<String, Object> serviceInfo = new HashMap<>();
                serviceInfo.put("serviceName", app.getName());

                List<Map<String, Object>> instances = app.getInstances().stream().map(instance -> {
                    Map<String, Object> instInfo = new HashMap<>();
                    instInfo.put("instanceId", instance.getInstanceId());
                    instInfo.put("ipAddress", instance.getIPAddr());
                    instInfo.put("port", instance.getPort());
                    instInfo.put("status", instance.getStatus().name());
                    instInfo.put("lastUpdated", instance.getLastUpdatedTimestamp());
                    return instInfo;
                }).collect(Collectors.toList());

                serviceInfo.put("instances", instances);
                registeredServices.add(serviceInfo);
            }
        }

        response.put("registeredServices", registeredServices);
        return ResponseEntity.ok(response);
    }
}
