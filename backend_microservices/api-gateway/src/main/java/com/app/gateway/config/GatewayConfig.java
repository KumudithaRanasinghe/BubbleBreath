package com.app.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("achievment-service-route", r -> r.path("/api/achievment/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://ACHIEVMENT-SERVICE"))
                .route("admin-service-route", r -> r.path("/api/admin/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://ADMIN-SERVICE"))
                .route("challenge-service-route", r -> r.path("/api/challenge/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://CHALLENGE-SERVICE"))
                .route("game-service-route", r -> r.path("/api/game/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://GAME-SERVICE"))
                .route("payment-service-route", r -> r.path("/api/payment/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://PAYMENT-SERVICE"))
                .route("review-service-route", r -> r.path("/api/review/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://REVIEW-SERVICE"))
                .route("reward-service-route", r -> r.path("/api/reward/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://REWARD-SERVICE"))
                .route("user-privileges-route", r -> r.path("/api/user-privileges/**")
                        .filters(f -> f.stripPrefix(1)
                                .addRequestHeader("X-Gateway-Source", "api-gateway")
                                .circuitBreaker(c -> c.setName("circuitBreaker").setFallbackUri("forward:/fallback")))
                        .uri("lb://USER-PRIVILEGES"))
                .build();
    }
}
