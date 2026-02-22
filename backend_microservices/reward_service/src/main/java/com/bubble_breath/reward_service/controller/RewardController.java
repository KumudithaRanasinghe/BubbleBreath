package com.bubble_breath.reward_service.controller;

import com.bubble_breath.reward_service.dto.request.RewardRequest;
import com.bubble_breath.reward_service.dto.request.RewardUpdateRequest;
import com.bubble_breath.reward_service.dto.response.RewardResponse;
import com.bubble_breath.reward_service.entity.RewardType;
import com.bubble_breath.reward_service.service.RewardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("Reward")
@RestController
@CrossOrigin
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @PostMapping
    public ResponseEntity<RewardResponse> save(@Valid @RequestBody RewardRequest request) {
        RewardResponse save = rewardService.save(request);
        return ResponseEntity.ok(save);
    }

    @PutMapping
    public ResponseEntity<RewardResponse> update(@Valid @RequestBody RewardUpdateRequest request) {
        RewardResponse updated = rewardService.update(request);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("{id}")
    public ResponseEntity<RewardResponse> getById(@PathVariable("id") UUID id) {
        RewardResponse get = rewardService.getById(id);
        if (get == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(get);
    }

    @GetMapping
    public ResponseEntity<List<RewardResponse>> getAll() {
        List<RewardResponse> getAll = rewardService.getAll();
        return ResponseEntity.ok(getAll);
    }

    @GetMapping("game/{gameId}")
    public ResponseEntity<List<RewardResponse>> getByGameId(@PathVariable("gameId") UUID gameId) {
        List<RewardResponse> rewards = rewardService.getByGameId(gameId);
        return ResponseEntity.ok(rewards);
    }

    @GetMapping("type/{rewardType}")
    public ResponseEntity<List<RewardResponse>> getByRewardType(@PathVariable("rewardType") RewardType rewardType) {
        List<RewardResponse> rewards = rewardService.getByRewardType(rewardType);
        return ResponseEntity.ok(rewards);
    }

    @GetMapping("game/{gameId}/type/{rewardType}")
    public ResponseEntity<List<RewardResponse>> getByGameIdAndRewardType(
            @PathVariable("gameId") UUID gameId,
            @PathVariable("rewardType") RewardType rewardType) {
        List<RewardResponse> rewards = rewardService.getByGameIdAndRewardType(gameId, rewardType);
        return ResponseEntity.ok(rewards);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Integer> delete(@PathVariable("id") UUID id) {
        int deleted = rewardService.delete(id);
        if (deleted == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(deleted);
    }
}