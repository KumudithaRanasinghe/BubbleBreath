package com.bubble_breath.admin_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "GAME-SERVICE")
public interface GameServiceClient {
    @GetMapping("/api/game/{id}")
    Object getGameById(@PathVariable("id") Long id);
}
