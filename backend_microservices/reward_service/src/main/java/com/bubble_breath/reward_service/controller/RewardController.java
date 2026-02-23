package com.bubble_breath.reward_service.controller;

import com.bubble_breath.reward_service.dto.RewardDto;
import com.bubble_breath.reward_service.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/Reward")
@RequiredArgsConstructor
public class RewardController {

    private final RewardService rewardService;

    @PostMapping
    public ResponseEntity<RewardDto> createReward(@RequestBody RewardDto rewardDto) {
        return new ResponseEntity<>(rewardService.createReward(rewardDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RewardDto>> getAllRewards() {
        return ResponseEntity.ok(rewardService.getAllRewards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RewardDto> getRewardById(@PathVariable UUID id) {
        return ResponseEntity.ok(rewardService.getRewardById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RewardDto> updateReward(@PathVariable UUID id, @RequestBody RewardDto rewardDto) {
        return ResponseEntity.ok(rewardService.updateReward(id, rewardDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable UUID id) {
        rewardService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}
